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
  CNPJ: { type: String, maxLength: 14, trim: true },
  phone: { type: Number, required: true, trim: true },
  role: {
    type: String,
    enum: ["BUSINESS", "CUSTOMER"],
    default: "BUSINESS",
  },
  address: { type: String, required: true },
  profileAvatarUrl: {
    type: String,
    trim: true,
    default: "/",
  },
  isDeleted: { type: Boolean, default: false },
  deletedDate: { type: Date },
  resetPassword: { type: String, default: "" },
});

const BusinessModel = model("Business", BusinessSchema);

module.exports = BusinessModel;
