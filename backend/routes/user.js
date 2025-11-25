import express from "express";
import {
  signUp,
  login,
  updateUser,
  fetchProfile,
} from "../controllers/userController.js";
import { uploadImage } from "../controllers/imageUploadController.js";
import upload from "../config/multer.js";
import { updateMealStatus } from "../controllers/mealStatusController.js";
const router = express.Router();

//signup a user
router.post("/signup", signUp);

//login a user
router.post("/login", login);

//fetch user info
router.get("/profile/:id", fetchProfile);

//update user info
router.patch("/profile/:id", updateUser);

//upload image
router.patch("/profilePicture/:id", upload.single("image"), uploadImage);

//update meals status
router.patch("/mealStatus/:id", updateMealStatus);
export default router;
