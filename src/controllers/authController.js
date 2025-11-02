import User from "../models/user.js";
import { comparePassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { email, password } = req.body;
  try {
    const user = await User.findOne({
        where: {
            email,
        },
    })
    if (!user){
        return res.status(404).json({message: "User not found"})
    }
    const isPasswordMatch = comparePassword(password, user.password);
    if(!isPasswordMatch){
        return res.status(401).json({message: "password tidak valid"})
    }
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
            fullname: user.fullName,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d"}
    );
    res.status(200).json({message: "login success", token})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const register = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    const user = await User.create({
      fullName,
      username,
      email,
      password,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};