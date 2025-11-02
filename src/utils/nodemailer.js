import nodemailer from "nodemailer";
export const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const verificationLink = `http://localhost:3000/auth/verify-email?token=${token}`;
    await transporter.sendMail({
      from: `"Movie App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Harap Verifikasi Email Anda",
      html: `
      <h2>Verifikasi Email Anda</h2>
      <p>Klik link di bawah ini untuk mengaktifkan akun Anda:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `,
    });
  } catch (error) {
    console.error("Error saat mengirim email:", error);
    throw new Error("Failed to send verification email");
  }
};