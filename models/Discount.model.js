/*const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const DiscountSchema = new Schema({
  minimumAmount: { type: Number, required: true },
  amountGoal: { type: Number, required: true },
  launch: { type: Date, min: Date.now, default: null },
  deadline: { type: Date, min: Date.now, default: null },
  service: { type: String, required: true },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  isDeleted: { type: Boolean, default: false },
  deletedDate: { type: Date },
});

const DiscountModel = model("Discount", DiscountSchema);

module.exports = DiscountModel;
*/