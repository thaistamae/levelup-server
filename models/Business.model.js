const { Schema, model } = require("mongoose");

const BusinessSchema = new Schema({
  name: { type: String, required: true, trim: true },
  dba: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  CNPJ: { type: String, maxLength: 14, trim: true  },
  birthDate: { type: Date },
  phone: { type: Number, required: true, trim: true },
  role: {
    type: String,
    enum: ["BUSINESS", "CUSTOMER"], 
    /*required: true,*/
    default: "BUSINESS",
  },
  address: new Schema({
    street: {type: String, required: true},
    number: {type: Number, required: true},
    neighborhood: {type: String, required: true},
    city: { type: String, required: true},
    state: {type: String, required: true},
    zipcode: {type: String, maxLength: 8, required: true}
  }),
  image: { type: String, default: "/" },
  isDeleted: {type: Boolean, default: false},
  deletedDate: {type: Date}
});


const BusinessModel = model("Business", BusinessSchema);

module.exports = BusinessModel;
