const { Schema, model } = require("mongoose");


const PointsSchema = new Schema({
    creditSystem: { type: Number, required: true, enum: [ 1, 1.5, 2] }, // 1 serviço = 2ponts
    offerType: { type: Number, required: true }, // 10pts = premio
    goal: { type: String, required: true }, // premio conquistado
    launch: { type: Date, min: Date.now, default: null }, 
    deadline: { type: Date, min: Date.now, default: null },
    service: { type: String, required: true},
    businessId: { type: mongoose.Schema.Types.ObjectID, ref: "Business"}

});

const PointsModel = model("Points", PointsSchema);

module.exports = PointsModel;
