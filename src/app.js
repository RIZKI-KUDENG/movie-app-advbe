import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import route from "./routes/index.js";
app.use(route);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});