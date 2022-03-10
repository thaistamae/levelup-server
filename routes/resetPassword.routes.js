const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const BusinessModel = require("../models/Business.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const salt_rounds = 10;

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    let user = await BusinessModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Usuário não encontrado" });
    }

    const temporaryToken = jwt.sign(
      { _id: user._id },
      process.env.SIGN_SECRET_RESET_PASSWORD,
      {
        expiresIn: "30m",
      }
    );

    if (user.role === "CUSTOMER") {
      await BusinessModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { resetPassword: temporaryToken } }
      );
    }

    if (user.role === "BUSINESS") {
      await BusinessModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { resetPassword: temporaryToken } }
      );
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Redefinir senha",
      html: `<p>Clique no link para redefinir sua senha:<p><a href=https://levelup.netlify.app/new-password/${temporaryToken}>LINK</a>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Erro no envio do e-mail" });
      }
      res.status(200).json({ message: "E-mail enviado com sucesso" });
    });
} catch (err) {
    console.error(err);
  }
});

router.put("/reset-password/:token", async (req, res) => {
  try {
    if (!req.params.token) {
      return res.status(400).json({ msg: "Token incorreto ou expirado!" });
    }

    jwt.verify(
      req.params.token,
      process.env.SIGN_SECRET_RESET_PASSWORD,
      (err) => {
        if (err) {
          return res.status(400).json({ msg: "Token incorreto ou expirado!" });
        }
      }
    );

    let user = await BusinessModel.findOne({ resetPassword: req.params.token });

    if (!user) {
      user = await BusinessModel.findOne({ resetPassword: req.params.token });
    }

    if (!user) {
      return res.status(400).json({ msg: "Token incorreto ou expirado!" });
    }

    const { newPassword } = req.body;

    if (
      !newPassword ||
      !newPassword.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
      )
    ) {
      return res.status(400).json({
        msg: "Password is required and must have at least 8 characters, uppercase and lowercase letters, numbers and special characters.",
      });
    }

    const salt = await bcrypt.genSalt(salt_rounds);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

      await BusinessModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { passwordHash: hashedPassword, resetPassword: "" } }
      );

    res.status(200).json({ message: "Senha redefinida com sucesso" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;