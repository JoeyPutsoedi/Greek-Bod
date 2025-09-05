import defaultImg from "../assets/images/default.jpg";
import { React, useState, useEffect } from "react";
import "../Styles/Settings.css";
import { useAuth } from "../Context/AuthContext";
import { db, storage } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Settings = () => {
  /*Access to current user information--------------- */
  const { user, profile } = useAuth();
  /*state to store user first & last names--------------- */
  const [userProfile, setUserProfile] = useState(null);
  /*state to store new images when user changes their profile picture-------------- */
  const [newImage, setNewImage] = useState(null);
  /* The editable version of user inputs should the user choose to change their information.*/
  const [formData, setFormData] = useState({
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    email: userProfile?.email || "",
    weight: userProfile?.weight || "",
    height: userProfile?.height || "",
    age: userProfile?.age || "",
    goal: userProfile?.goal || "",
  });

  //FUNCTIONALITY/ FUNCTIONS-----------------------------------------
  const handleImageChange = (e) => {
    const file = e.target.files?.[0]; //get the first selected file
    if (file) setNewImage(file); //Call setNewImage and store slected file in react state
  };

  const handleSaveImage = async () => {
    if (newImage || !user) return; //if no user is logged or no file is selcted return nothing

    // 1) Create a Storage path unique to this user
    const imageRef = ref(storage, `profileImages/${user.uid}`);

    // 2) Upload the raw bytes to that path
    await uploadBytes(imageRef, newImage);

    // 3) Get a public URL for the uploaded file
    const photoURL = await getDownloadURL(imageRef);

    // 4) Save that URL on the user document in Firestore
    const userRef = doc(db, "Users", user.uid);
    await updateDoc(userRef, { photoURL });

    // 5) Reflect the change immediately in local UI state
    setUserProfile((prev) => ({ prev, photoURL }));
    console.log("image saved succesfully.");
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // which input changed and its new value
    setFormData((prev) => ({ ...prev, [name]: value })); // update only that field
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    const userRef = doc(db, "Users", user.uid);

    try {
      // 1) write to Firestore (source of truth)
      await updateDoc(userRef, { ...formData });

      // 2) update context immediately so the UI reflects changes
      setUserProfile((prev) => ({ ...(prev || {}), ...formData }));

      // optional: show success toast
      // toast.success("Profile saved");
    } catch (err) {
      console.error("Failed to save profile:", err);
      // optional: revert optimistic update or show error toast
    }

    // await updateDoc(userRef, {
    //   firstName: formData.firstName,
    //   lastName: formData.lastName,
    //   email: formData.email,
    //   weight: formData.weight,
    //   height: formData.height,
    //   age: formData.age,
    //   goal: formData.goal,
    // });

    // // keep on-screen profile in sync with what we saved
    // setUserProfile((prev) => ({ ...prev, ...formData }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return; /*if there's no user logged in return nothing; */

      try {
        /*create a reference of a firestore document, Collection "Users" with the uid "user.uid"*/
        const docRef = doc(db, "Users", user.uid);

        /*getDoc gets the actual data from the reference */
        const docSnap = await getDoc(docRef);

        /*if document exists call setUserProfile and save user's info in react state */
        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetchingProfile");
      }
    };
    fetchProfile();
  }, [user]);

  return (
    <section className="settingCont">
      {/*Left Column-------------------------------------------------*/}
      <div className="imageSett">
        <div className="imgSet">
          {/*Header For User Name-------------------------------------------------*/}
          <h1> {userProfile?.firstName + " " + userProfile?.lastName}</h1>
          <div className="imgPLH">
            {/* Image Section--------------------------------------- */}
            <div className="imagePlaceholder">
              <img src={userProfile?.photoURL} alt={user?.displayName} />
            </div>
          </div>
          {/*Buttons Section-------------------------------------------------*/}
          <div className="saveImg">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {/* <button htmlFor="imgPicker ">Change Image</button> */}
            <button onClick={handleSaveImage}>Save Changes</button>
          </div>
        </div>
      </div>
      {/*Right Column-------------------------------------------------*/}
      <div className="editInfo">
        <h1>User Information: </h1>
        <div className="formSett">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveProfile();
            }}
          >
            <div className="leftForm">
              <label htmlFor="">First Name</label>
              <br />
              <input
                name="firstName"
                type="text"
                placeholder={userProfile?.firstName}
                value={formData.firstName}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="">Last Name</label>
              <br />
              <input
                name="lastName"
                type="text"
                placeholder={userProfile?.lastName}
                value={formData.lastName}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="">Email</label>
              <br />
              <input
                name="email"
                type="text"
                placeholder={user?.email}
                readOnly
              />
              <br />
              <label htmlFor=""> Weight Goal</label>
              <br />
              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                required
              >
                <option value="lose">{profile?.goal}</option>
                <option value="lose">Lose Weight</option>
                <option value="gain">Gain Muscle</option>
                <option value="maintain">Maintain </option>
              </select>
              <br />
            </div>
            {/*Right Column-------------------------------------------------*/}
            <div className="rightForm">
              <label htmlFor="">Current Weight</label>
              <br />
              <input
                name="weight"
                type="text"
                placeholder={profile?.weight + "  kg"}
                value={formData.weight}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="">Current Height</label>
              <br />
              <input
                name="height"
                type="text"
                placeholder={profile?.height + "  cm"}
                value={formData.height}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="">Current Age</label>
              <br />
              <input
                name="age"
                type="text"
                placeholder={profile?.age + "  yrs"}
                value={formData.age}
                onChange={handleChange}
              />
              <br />
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Settings;
