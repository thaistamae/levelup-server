const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const BusinessModel = require("../models/Business.model");

const nodemailer = require("nodemailer");

//Configura o nodemailer para envio de emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const salt_rounds = 10;

//Rota de recuperação de senha que recebe o email do usuario solicitante
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    //Busca o usuario
    let user = await BusinessModel.findOne({ email });

    //Se não encontrar, responde com erro
    if (!user) {
      return res.status(400).json({ msg: "Usuário não encontrado" });
    }

    //Gera o token temporario
    const temporaryToken = jwt.sign(
      { _id: user._id },
      process.env.SIGN_SECRET_RESET_PASSWORD,
      {
        expiresIn: "30m",
      }
    );

    //salva o token no campo "resetPassword"
    if (user.role === "CUSTOMER") {
      await BusinessModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { resetPassword: temporaryToken } }
      );
    }

    //salva o token no campo "resetPassword"
    if (user.role === "BUSINESS") {
      await BusinessModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { resetPassword: temporaryToken } }
      );
    }

    //Configura o assunto e corpo do email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Redefinir senha",
      html: `<p>Clique no link para redefinir sua senha:<p><a href=https://levelup.netlify.app/new-password/${temporaryToken}>LINK</a>`,
    };

    //Dispara o email para o usuário
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
    //Verifica a existência do token
    if (!req.params.token) {
      return res.status(400).json({ msg: "Token incorreto ou expirado!" });
    }

    //Verifica se o token é valido e não esta expirado
    jwt.verify(
      req.params.token,
      process.env.SIGN_SECRET_RESET_PASSWORD,
      (err) => {
        if (err) {
          return res.status(400).json({ msg: "Token incorreto ou expirado!" });
        }
      }
    );

    //Busca o usuario pelo token de recuperacao
    let user = await BusinessModel.findOne({ resetPassword: req.params.token });

    //Se nao encontrar, busca o business pelo token de recuperao
    if (!user) {
      user = await BusinessModel.findOne({ resetPassword: req.params.token });
    }

    //Caso não exista, responde com erro
    if (!user) {
      return res.status(400).json({ msg: "Token incorreto ou expirado!" });
    }

    //Extrai a nova senha do usuario
    const { newPassword } = req.body;

    //Verifica se a senha existe e se atende todos os requisitos
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

    //Gera o salt
    const salt = await bcrypt.genSalt(salt_rounds);

    //Criptografa a senha
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    //encontra business, salva a nova senha e limpa o campo de resetPassword
    if (user.role === "BUSINESS") {
      await BusinessModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { passwordHash: hashedPassword, resetPassword: "" } }
      );
    }

    if (user.role === "CUSTOMER") {
      await BusinessModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { passwordHash: hashedPassword, resetPassword: "" } }
      );
    }

    res.status(200).json({ message: "Senha redefinida com sucesso" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;