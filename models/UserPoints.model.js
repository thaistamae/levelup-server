const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const UserPointsSchema = new Schema({
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business"},
    pointId: { type: mongoose.Schema.Types.ObjectId, ref: "Points"},
    customerEmail: {type: String, required: true},
    pointsInThisPromotion: { type: Number, required: true }, 

});

const UserPointsModel = model("UserPoints", UserPointsSchema);

module.exports = UserPointsModel;