import multer from "multer";

// store files in memory, then send buffer to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
