const { Schema, model } = require("mongoose");

const userPointsSchema = new Schema({

    //________________________//

});

const userPointsModel = model("Points", userPointsSchema);

module.exports = userPointsModel;
