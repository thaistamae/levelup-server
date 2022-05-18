const router = require("express").Router();

const PromotionModel = require("../models/Promotion.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");
const isAdmin = require("../middlewares/isAdmin");

router.post(
  "/create-promotion",
  isAuthenticated,
  attachCurrentBusiness,
  isAdmin,
  async (req, res) => {
    try {
      const loggedInBusiness = req.currentUser;
      const createPromotion = await PromotionModel.create({
        ...req.body,
        businessId: loggedInBusiness._id,
      });

      return res.status(201).json(createPromotion);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

router.get(
  "/my-promotions",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    console.log(req.headers);

    try {
      const loggedInBusiness = req.currentUser;
      const businessGoals = await PromotionModel.find({
        businessId: loggedInBusiness._id,
      });

      return res.status(200).json(businessGoals);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

router.get(
  "/my-promotion/:id",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    try {
      const loggedInBusiness = req.currentUser;

      const { id } = req.params;

      const foundGoal = await PromotionModel.findOne({ _id: req.params.id });

      return res.status(200).json(foundGoal);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

router.delete(
  "/delete-promotion",
  isAuthenticated,
  attachCurrentBusiness,
  isAdmin,
  async (req, res) => {
    const loggedInBusiness = req.currentUser;

    await PromotionModel.findOneAndUpdate(
      { businessId: loggedInBusiness._id },
      { isDeleted: true, deletedDate: Date.now() },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ msg: "Ok" });
  }
);

module.exports = router;
