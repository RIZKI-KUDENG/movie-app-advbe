import User from "../models/user.js";
import { comparePassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/nodemailer.js";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    const existing = await User.findOne({
      where: {
        email,
      },
    });
    if (existing) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }
    const verificationToken = uuidv4();
    const user = await User.create({
      fullName,
      username,
      email,
      password,
      verificationToken,
      isVerified: false,
    });
    await sendVerificationEmail(email, verificationToken);
    res.status(201).json({
      message: "Akun berhasil dibuat silahkan cek email untuk verifikasi",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({
      where: {
        verificationToken: token,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();
    res.status(200).json({ message: "Email berhasil di verifikasi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Akun belum diverifikasi. Cek email Anda." });
    }
    const isPasswordMatch = comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "password tidak valid" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        fullname: user.fullName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ message: "login success", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
