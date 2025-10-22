import express from "express";
import {
  signUp,
  login,
  updateUser,
  fetchProfile,
} from "../controllers/userController.js";

const router = express.Router();

//signup a user
router.post("/signup", signUp);

//login a user
router.post("/login", login);

//fetch user info
router.get("/", fetchProfile);

//update user info
router.patch("/profile/:id", updateUser);

export default router;
