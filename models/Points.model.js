const { Schema, model } = require("mongoose");


const PointsSchema = new Schema({
    creditSystem: { type: Number, required: true, enum: [ 1, 1.5, 2] },
    offerType: { type: Number, required: true },
    goal: { type: String, required: true },
    launch: { type: Date, min: Date.now, default: undefined }, 
    deadline: { type: Date, min: Date.now, default: undefined },
    service: { type: String, required: true},
    businessId: { type: mongoose.Schema.Types.ObjectID, ref: "Business"}

});

const PointsModel = model("Points", PointsSchema);

module.exports = PointsModel;
