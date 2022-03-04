const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const UserPointsSchema = new Schema({
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business"},
    pointId: { type: mongoose.Schema.Types.ObjectId, ref: "Points"},
    customerEmail: {type: String, required: true},
    pointsInThisPromotion: { type: Number, required: true },
    deadline: { type: Date, min: Date.now, default: null },
    goal: { type: String, required: true },  

});

const UserPointsModel = model("UserPoints", UserPointsSchema);

module.exports = UserPointsModel;