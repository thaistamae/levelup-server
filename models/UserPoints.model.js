const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const UserPointsSchema = new Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  customerEmail: { type: String, required: true },
  pointsInThisPromotion: { type: Number, required: true },
});

const UserPointsModel = model("UserPoints", UserPointsSchema);

module.exports = UserPointsModel;
