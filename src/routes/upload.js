import express from "express";
import { uploadSingle } from "../controllers/uploadController.js";
import { upload } from "../utils/multer.js";

const uploadRoute = express.Router();

uploadRoute.post("/", upload.single("file"), uploadSingle);
export default uploadRoute;