const { Schema, model } = require("mongoose");

const BusinessSchema = new Schema({
  name: { type: String, required: true, trim: true },
  dba: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  CNPJ: { type: Number, maxLength: 14, required: true, trim: true  },
  phone: { type: Number, required: true, trim: true},
  role: {
    type: String,
    enum: ["ADMIN", "BUSINESS"], 
    required: true,
    default: "BUSINESS",
  },
  image: { type: String, default: "/" }
});

const BusinessModel = model("Business", BusinessSchema);

module.exports = BusinessModel;
