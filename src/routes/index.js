import express from "express";
import authRoute from "./auth.js";
import movieRoute from "./movie.js";
import uploadRoute from "./upload.js";
const route = express.Router();

route.use("/auth", authRoute);
route.use("/movies", movieRoute);
route.use("/upload", uploadRoute);
export default route;
