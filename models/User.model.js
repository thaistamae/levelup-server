/*const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  birthDate: { type: Date, required: true },
  CPF: { type: Number, maxLength: 11, required: true, trim: true  },
  phone: { type: Number, required: true, trim: true},
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
    default: "USER",
  },
  image: { type: String, default: "/" }

});

const UserModel = model("User", UserSchema);

module.exports = UserModel; */
