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



module.exports = router;
