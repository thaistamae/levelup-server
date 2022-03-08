const PointsModel = require("../models/Points.model");

module.exports = async (req, res, next) => {
  try {
    const loggedInUser = req.currentUser;

    const point = await PointsModel.findOne({ _id: req.params.pointId });

    if (!loggedInUser._id === point.businessId) {
      return res
        .status(401)
        .json({ msg: "You do not have access to this goal." });
    }
    req.currentPoint = point;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};