const router = require("express").Router();

const DiscountModel = require("../models/Discount.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");
const isAdmin = require("../middlewares/isAdmin");

router.post(
  "/create-discount",
  isAuthenticated,
  attachCurrentBusiness,
  isAdmin,
  async (req, res) => {

    try {
      const loggedInUser = req.currentUser;
      const createDiscount = await DiscountModel.create({
        ...req.body,
        businessId: loggedInUser._id,
      });

      return res.status(201).json(createDiscount);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

router.get(
  "/my-discount",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    console.log(req.headers);

    try {
      const loggedInUser = req.currentUser;
      const discountGoals = await DiscountModel.find({
        businessId: loggedInUser._id,
      });

      return res.status(200).json(discountGoals);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

router.get(
  "/my-discount/:id",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    try {
      const loggedInUser = req.currentUser;

      const { id } = req.params;

      const foundDiscountGoal = await DiscountModel.findOne({ _id: req.params.id });

      return res.status(200).json(foundDiscountGoal);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

router.delete(
  "/delete-discount",
  isAuthenticated,
  attachCurrentBusiness,
  isAdmin,
  async (req, res) => {
    const loggedInUser = req.currentUser;

    await DiscountModel.findOneAndUpdate(
      { businessId: loggedInUser._id },
      { isDeleted: true, deletedDate: Date.now() },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ msg: "Okay" });
  }
);

module.exports = router;
