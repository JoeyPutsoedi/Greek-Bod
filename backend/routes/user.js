import express from "express";
import {
  createUser,
  deleteUser,
  fetchUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

//create a user
router.post("/signIn", createUser);

//update user details
router.patch("/user/:id", updateUser);

//delete user account
router.delete("/user/:id", deleteUser);

//fetch user
router.get("/user/:id", fetchUser);

export default router;
