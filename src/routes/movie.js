import express from "express";
import { addMovie, getMovies } from "../controllers/movieController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const movieRoute = express.Router();

movieRoute.post("/", verifyToken, addMovie);
movieRoute.get("/", verifyToken, getMovies);

export default movieRoute;
