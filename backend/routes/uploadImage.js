import express from "express";
import { uploadImage } from "../controllers/imageUploadController.js";

const router = express.Router();

//set profilePicture

router.patch("/profilePicture", upload.single("image"), uploadImage);

export default router;
