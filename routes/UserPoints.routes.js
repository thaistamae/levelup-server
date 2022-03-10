const router = require("express").Router();

const UserPointsModel = require("../models/UserPoints.model");

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");

router.post(
  "/create-card",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    console.log(req.body);

    try {
      const loggedInUser = req.currentUser;

      const userPoints = await UserPointsModel.create({
        ...req.body,
        businessId: loggedInUser._id,
      });

      return res.status(201).json(userPoints);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

router.get(
  "/user-points",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    console.log(req.headers);

    try {
      const loggedInUser = req.currentUser;
      const finduserPoints = await UserPointsModel.find({
        businessId: loggedInUser._id,
      });

      return res.status(200).json(finduserPoints);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

router.patch(
  "/add-points/:userPointsId",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    try {
      if (req.body.points === 0 || req.body.points === "") {
        return res.status(400).json({ msg: "points is invalid." });
      }
      const userPointsToUpdate = await UserPointsModel.findOne({
        _id: req.params.userPointsId,
      });

      const updateUserPoints = await UserPointsModel.findOneAndUpdate(
        { _id: req.params.userPointsId },
        {
          pointsAccumulated:
            userPointsToUpdate.pointsAccumulated + Number(req.body.points),
        },
        { new: true, runValidators: true }
      );

      return res.status(200).json(updateUserPoints);
    } catch (err) {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json(err.message ? err.message : err);
      }

      res.status(500).json(err);
    }
  }
);

router.patch(
  "/credit-points/:userPointsId",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    try {
      const userPointsToCredit = await UserPointsModel.findOne({
        _id: req.params.userPointsId,
      });

      if (userPointsToCredit.pointsAccumulated - Number(req.body.number) >= 0) {
        const creditUserPoints = await UserPointsModel.findOneAndUpdate(
          { _id: req.params.userPointsId },
          {
            pointsAccumulated:
              userPointsToCredit.pointsAccumulated - Number(req.body.number),
          },
          { new: true, runValidators: true }
        );

        return res.status(200).json(creditUserPoints);
      } else {
        return res
          .status(401)
          .json({
            msg: "o cliente não possui pontos suficientes para creditar",
          });
      }
    } catch (err) {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json(err.message ? err.message : err);
      }

      res.status(500).json(err);
    }
  }
);

module.exports = router;
