import express from "express";
import authRoute from "./auth.js";
import movieRoute from "./movie.js";
const route = express.Router();

route.use("/auth", authRoute);
route.use("/movies", movieRoute);
export default route;
