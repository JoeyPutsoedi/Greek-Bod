import "../Styles/DashboardUpload.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
const DashboardUpload = () => {
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [result, setResult] = useState();
  const { user, profile, setProfile } = useAuth();
  const [formData, setFormData] = useState({
    photoScan: "",
  });

  //if profile exists set FormData to the photo in firestore
  //this is import for if we want to display the picture the user scanned somewhere else in the page
  useEffect(() => {
    if (profile) {
      setFormData({
        photoScan: profile.photoScan || "",
      });
    }
  }, [profile]);

  //Function for when user upload an image to scan
  const imageChange = (e) => {
    const file = e.target.files?.[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  //Function that uploads image to cloudinary for storing
  const uploadImage = async () => {
    if (!image) return alert("please select an image first");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "unsigned_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwnsz5sga/image/upload",
        formData
      );
      console.log("Uploaded Image URL:", response.data.secure_url);

      await updateDoc(doc(db, "users", user.uid), {
        photoScan: response.data.secure_url,
      });

      //in User profile in fire store, set the url from cloudinary to photoScan value
      setProfile((prev) => ({ ...prev, photoScan: response.data.secure_url }));

      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Image upload failed!");
    }
  };

  const handleScan = async () => {
    if (!image) {
      alert("Please upload an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    try {
      const res = await fetch("http://localhost:5000/api/scan", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      console.log("Spoonacular analysis:", json);
    } catch (error) {
      alert("Failed to retrieve food data");
    }
  };

  //RETURN--------------------------------------------
  return (
    <div className="uploadCont">
      <div className="uploadBox">
        <div className="uLeft">
          <div className="uImgPLH">
            <img src={preview} alt="Upload Image" />
          </div>
        </div>
        <div className="uRight">
          <h1>
            Upload your meal
            <br />
            find Out Calories
          </h1>
          <div className="uploadFunc">
            <input type="file" accept="image/*" onChange={imageChange} />
            <button id="uploadBtn" onClick={uploadImage}>
              Upload image
            </button>
            <button onClick={handleScan}> Scan</button>
          </div>
          <div className="uploadStats">
            <h2>Analysis</h2>
            <ul>
              <li>Name: {result?.nutrition?.category?.name || "  Unknown"}</li>
              <li>
                Calories:{result?.nutrition?.calories?.value || "  unknown"}kcal
              </li>
              <li>
                Protein: {result?.nutrition?.protein?.value || "  unknown"} g
              </li>
              <li>Fat: {result?.nutrition?.fat?.value || "  unknown"} g</li>
              <li>Carbs: {result?.nutrition?.carbs?.value || "  unknown"} g</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUpload;
