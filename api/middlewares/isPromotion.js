const PromotionModel = require("../models/Promotion.model");

module.exports = async (req, res, next) => {
  try {
    const loggedInBusiness = req.currentUser;

    const promotion = await PromotionModel.findOne({
      _id: req.params.promotionId,
    });

    if (!loggedInBusiness._id === promotion.businessId) {
      return res
        .status(401)
        .json({ msg: "You do not have access to this goal." });
    }
    req.currentPromotion = promotion;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
