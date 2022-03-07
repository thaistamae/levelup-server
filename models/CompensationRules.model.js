const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

//precisamos arrumar essa questão da data
let today = new Date(Date.now);
let expire = new Date();
let expirationDate = Date.parse(expire.setYear(today.getFullYear() + 2))

const CompensationRulesSchema = new Schema({
    launch: { type: Date, min: new Date() },
    expirationDate: { type: Date, default: {expirationDate}},
    rules: {type: String, required: true},
    optionalAddition: {type: String},
    additionDate: { type: Date },
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    
})

const CompensationRulesModel = model("CompensationRules", CompensationRulesSchema);

module.exports = CompensationRulesModel;