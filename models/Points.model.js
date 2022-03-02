const { Schema, model } = require("mongoose");

const PointsSchema = new Schema({
    //
  

});

const PointsModel = model("Points", PointsSchema);

module.exports = PointsModel;
