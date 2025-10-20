import express from "express";

const router = express.Router();

//signup a user
router.post("/signup", () => {});

//login a user
router.post("/login", () => {});

//fetch user infor
router.get("/:id,", () => {});

//update user info
router.patch("/:id", () => {});

export default router;
