import User from "../models/userModel.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await User.findById(id);

    const imageUrl = await uploadToCloudinary(req.file.buffer);

    const image = new Image({
      profile: profile,
      imageUrl,
    });

    await image.save();
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
