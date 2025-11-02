import Movie from "../models/movie.js";
import { Op } from "sequelize";


export const getMovies = async (req, res) => {
  const { genre, page = 1, sortBy = "id", search, kategori } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;
  const where = {};
  if (kategori) where.kategori = kategori;
  if (genre) where.genre = genre;
  if (search) where.title = { [Op.like]: `%${search}%` };
  const order = [[sortBy, "ASC"]];
  try {
    const movies = await Movie.findAll({
      where,
      order,
      limit,
      offset,
    });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const addMovie = async (req, res) => {
  try {
    const { title, deskripsi, genre, kategori, image, rating } = req.body;
    const movie = await Movie.create({
      title,
      deskripsi,
      genre,
      kategori,
      rating,
      image,
    });
    res.status(201).json({ message: "Movie added successfully", movie });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}