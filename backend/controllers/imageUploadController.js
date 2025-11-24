import User from "../models/userModel.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  const { id } = req.params;

  try {
    //check if file exists
    if (!req.file) {
      return res.status(400).json({ error: "No image file provded" });
    }
    //find user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const imageUrl = await uploadToCloudinary(req.file.buffer);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { photoURL: imageUrl },
      { new: true }
    );

    res.status(200).json({
      message: "Image uploaded successfully",
      photoURL: imageUrl,
      user: updatedUser,
    });
  } catch (error) {
    console.error("upload error details:", error);
    console.log("failed to upload image");
    res.status(500).json({ error: error.message });
  }
};
