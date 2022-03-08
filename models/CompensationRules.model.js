const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

function oneYearFromNow(){
    return new Date(new Date().setFullYear(new Date().getFullYear() + 1))
}

const CompensationRulesSchema = new Schema({
    launch: { type: Date, min: Date.now() },
    expirationDate: { type: Date, default: oneYearFromNow()},
    rules: {type: String, required: true},
    optionalAddition: {type: String},
    additionDate: { type: Date },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" }
    
});

const CompensationRulesModel = model("CompensationRules", CompensationRulesSchema);

module.exports = CompensationRulesModel;

