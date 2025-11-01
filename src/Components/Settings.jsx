import { React, useState, useEffect } from "react";
import "../Styles/Settings.css";
import { useAuth } from "../Context/AuthContext.jsx";
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import axios from "axios";

const Settings = () => {
  /*Access to current user information--------------- */
  const { user, profile, setProfile } = useAuth();
  /*state to store new images when user changes their profile picture-------------- */
  const [image, setImage] = useState(null);
  /* The editable version of user inputs should the user choose to change their information.*/
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    weight: "",
    height: "",
    age: "",
    goal: "",
    gender: "",
    activityLevel: "",
    photoURL: "",
  });

  // Load data from AuthContext or Firestore into formData
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        weight: profile.weight || "",
        height: profile.height || "",
        age: profile.age || "",
        goal: profile.goal || "",
        gender: profile.gender || "",
        activityLevel: profile.activityLevel || "",
        photoURL: profile.photoURL || "",
      });
    }
  }, [profile]);

  //FUNCTIONALITY/ FUNCTIONS-----------------------------------------
  const handleImageChange = (e) => {
    const file = e.target.files?.[0]; //get the first selected file
    setImage(file); //Call setImage and store slected file in react state
    setPreview(URL.createObjectURL(file)); //preview before upload
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first"); //If No image is selected return message
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "unsigned_preset"); // my preset name

    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwnsz5sga/image/upload",
        formData
      );
      console.log("Uploaded Image URL:", response.data.secure_url);

      // Save this URL to Firestore as the user's profile picture
      await updateDoc(doc(db, "users", user.uid), {
        photoURL: response.data.secure_url,
      });

      setProfile((prev) => ({ ...prev, photoURL: response.data.secure_url }));

      alert("Image uploaded successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Image upload failed!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // which input changed and its new value
    setFormData((prev) => ({ ...prev, [name]: value })); // update only that field
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    try {
      // 1) write to Firestore (source of truth)
      await updateDoc(userRef, { ...formData });

      // 2) update context immediately so the UI reflects changes
      setProfile((prev) => ({ ...(prev || {}), ...formData }));

      setProfile((prev) => ({ ...prev, ...formData }));
      alert("Details Updated successfully!");
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
  };

  useEffect(() => {
    if (formData?.photoURL) {
      setPreview(formData.photoURL);
    }
  }, [formData]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return; /*if there's no user logged in return nothing; */

      try {
        /*create a reference of a firestore document, Collection "Users" with the uid "user.uid"*/
        const docRef = doc(db, "users", user.uid);

        /*getDoc gets the actual data from the reference */
        const docSnap = await getDoc(docRef);

        /*if document exists call setUserProfile and save user's info in react state */
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetchingProfile");
      }
    };
    fetchProfile();
  }, [user]);

  return (
    <section className="settings-wrapper">
      <div className="settings-container">
        <div className="settings-left">
          <div className="image-placeholder">
            <div className="image-sec">
              <img src={preview} alt={user?.displayName} />
            </div>
          </div>
          <h1>{formData?.firstName + " " + formData?.lastName}</h1>
          <p>Change profile picture</p>

          <input
            className="uploadImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button className="uploadBtn" onClick={handleUpload}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/*-------RIGHT COLUMN---------------------------------------------------------------------------*/}
        <div className="settings-right">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveProfile();
            }}
          >
            <div className="form-content">
              <h1>Personal Information</h1>

              {/*----------------Name Fields--------------------- */}
              <div className="form-row">
                <div className="input-group">
                  <label>First Name:</label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder={formData?.firstName}
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>Last Name:</label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder={formData?.lastName}
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/*----------------Email Field--------------------- */}
              <div className="form-row">
                <div className="input-group full-width">
                  <label>Email:</label>
                  <input
                    name="email"
                    type="text"
                    placeholder={user?.email}
                    readOnly
                  />
                </div>
              </div>

              {/*----------------Goal & Activity--------------------- */}
              <div className="form-row">
                <div className="input-group">
                  <label>Weight Goal</label>
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{profile?.goal || "Select goal"}</option>
                    <option value="lose">Lose Weight</option>
                    <option value="gain">Gain Muscle</option>
                    <option value="maintain">Maintain</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Weekly Exercise</label>
                  <select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      {profile?.activityLevel || "Select activity"}
                    </option>
                    <option value="N/A">No exercise</option>
                    <option value="light">1-3 Days</option>
                    <option value="medium">3-5 Days</option>
                    <option value="heavy">6-7 Days</option>
                  </select>
                </div>
              </div>

              {/*----------------Weight & Height--------------------- */}
              <div className="form-row">
                <div className="input-group">
                  <label>Current Weight</label>
                  <input
                    name="weight"
                    type="text"
                    placeholder={
                      profile?.weight ? profile.weight + " kg" : "kg"
                    }
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>Current Height</label>
                  <input
                    name="height"
                    type="text"
                    placeholder={
                      profile?.height ? profile.height + " cm" : "cm"
                    }
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/*----------------Age & Gender--------------------- */}
              <div className="form-row">
                <div className="input-group">
                  <label>Current Age</label>
                  <input
                    name="age"
                    type="text"
                    placeholder={profile?.age ? profile.age + " yrs" : "years"}
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      {profile?.gender || "Select gender"}
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <button type="submit">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Settings;
