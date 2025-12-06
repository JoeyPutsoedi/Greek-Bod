import { React, useState, useEffect } from "react";
import "../Styles/Settings.css";

import useUserStore from "../Context/userStore.jsx";

const Settings = () => {
  /*Access to current user information--------------- */
  const user = useUserStore((state) => state.user);
  const updateInfo = useUserStore((state) => state.updateUserInfo);
  const uploadImg = useUserStore((state) => state.uploadImage);

  /*state to store new images when user changes their profile picture-------------- */
  const [image, setImage] = useState(null);
  /* The editable version of user inputs should the user choose to change their information.*/
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentWeight: "",
    startingWeight: "",
    targetWeight: "",
    height: "",
    age: "",
    goal: "",
    gender: "",
    activityLevel: "",
    photoURL: "",
  });

  // Load data userStore
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        currentWeight: user?.currentWeight || "",
        startingWeight: user?.startingWeight || "",
        targetWeight: user?.targetWeight || "",
        height: user?.height || "",
        age: user?.age || "",
        goal: user?.goal || "",
        gender: user?.gender || "",
        activityLevel: user?.activityLevel || "",
        photoURL: user?.photoURL || "",
      });
    }
  }, [user]);

  //FUNCTIONALITY/ FUNCTIONS-----------------------------------------
  const handleImageChange = (e) => {
    const file = e.target.files?.[0]; //get the first selected file
    setImage(file); //Call setImage and store slected file in react state
    setPreview(URL.createObjectURL(file)); //preview before upload
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first"); //If No image is selected return message
    const imageFormData = new FormData();
    imageFormData.append("image", image);

    try {
      setLoading(true);
      const response = await uploadImg(user._id, imageFormData);
      console.log("Uploaded Image URL:", response);

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
    try {
      await updateInfo(user._id, formData);
      alert("Details Updated successfully!");
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
  };

  return (
    <section className="settings-wrapper">
      <div className="settings-container">
        <div className="settings-left">
          <div className="image-placeholder">
            <div className="image-sec">
              <img src={preview || user?.photoURL} alt={user?.displayName} />
            </div>
          </div>
          <h1>{user?.firstName + " " + user?.lastName}</h1>
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
                    placeholder={user?.firstName}
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>Last Name:</label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder={user?.lastName}
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
                    <option value="">{user?.goal || "Select goal"}</option>
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
                      {user?.activityLevel || "Select activity"}
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
                  <label>Starting Weight</label>
                  <input
                    name="startingWeight"
                    type="text"
                    placeholder={
                      user?.startingWeight ? user?.startingWeight + " kg" : "kg"
                    }
                    readOnly
                  />
                </div>

                <div className="input-group">
                  <label>Current Weight</label>
                  <input
                    name="currentWeight"
                    type="text"
                    placeholder={
                      user?.currentWeight ? user?.currentWeight + " kg" : "kg"
                    }
                    value={formData.currentWeight}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label>Target Weight</label>
                  <input
                    name="targetWeight"
                    type="text"
                    placeholder={
                      user?.targetWeight ? user?.targetWeight + " kg" : "kg"
                    }
                    value={formData.targetWeight}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>Current Height</label>
                  <input
                    name="height"
                    type="text"
                    placeholder={user?.height ? user?.height + " cm" : "cm"}
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
                    placeholder={user?.age ? user?.age + " yrs" : "years"}
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
                    <option value="">{user?.gender || "Select gender"}</option>
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
