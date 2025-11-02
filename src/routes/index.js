import express from "express";
import authRoute from "./auth.js";
const route = express.Router();

route.use("/auth", authRoute);
export default route;
