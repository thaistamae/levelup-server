const router = require("express").Router();

const PointsModel = require("../models/Points.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");
const isAdmin = require("../middlewares/isAdmin");

router.post(
  "/create-points",
  isAuthenticated,
  attachCurrentBusiness,
  isAdmin,
  async (req, res) => {

    try {
      const loggedInUser = req.currentUser;
      const createPoints = await PointsModel.create({
        ...req.body,
        businessId: loggedInUser._id,
      });

      return res.status(201).json(createPoints);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

router.get(
  "/my-points",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    console.log(req.headers);

    try {
      const loggedInUser = req.currentUser;
      const businessGoals = await PointsModel.find({
        businessId: loggedInUser._id,
      });

      return res.status(200).json(businessGoals);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

router.get(
  "/my-points/:id",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    try {
      const loggedInUser = req.currentUser;

      const { id } = req.params;

      const foundGoal = await PointsModel.findOne({ _id: req.params.id });

      return res.status(200).json(foundGoal);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

router.delete(
  "/delete-points",
  isAuthenticated,
  attachCurrentBusiness,
  isAdmin,
  async (req, res) => {
    const loggedInUser = req.currentUser;

    await PointsModel.findOneAndUpdate(
      { businessId: loggedInUser._id },
      { isDeleted: true, deletedDate: Date.now() },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ msg: "Okay" });
  }
);

module.exports = router;
