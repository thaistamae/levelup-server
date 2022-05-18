const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const PromotionSchema = new Schema({
  creditSystem: { type: Number, required: true, enum: [1, 1.5, 2] },
  launch: { type: Date, min: Date.now, default: null },
  deadline: { type: Date, min: Date.now, default: null },
  service: { type: String, required: true, unique: true },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  isDeleted: { type: Boolean, default: false },
  deletedDate: { type: Date },
});

const PromotionModel = model("Promotion", PromotionSchema);

module.exports = PromotionModel;
