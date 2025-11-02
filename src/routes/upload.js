import express from "express";
import { uploadSingle } from "../controllers/uploadController.js";
import { upload } from "../utils/multer.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const uploadRoute = express.Router();

uploadRoute.post("/", verifyToken, upload.single("file"), uploadSingle);
export default uploadRoute;