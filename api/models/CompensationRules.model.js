const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

function oneYearFromNow() {
  return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
}

const CompensationRulesSchema = new Schema({
  launch: { type: Date, min: Date.now() },
  expirationDate: { type: Date, default: oneYearFromNow() },
  rules: { type: String, required: true },
  optionalAddition: [
    new Schema({
      addition: { type: String },
      additionDate: { type: Date, default: Date.now },
    }),
  ],
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    unique: true,
  },
});

const CompensationRulesModel = model(
  "CompensationRules",
  CompensationRulesSchema
);

module.exports = CompensationRulesModel;
