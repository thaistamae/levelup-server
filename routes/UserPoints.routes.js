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
        businessId: loggedInUser._id
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
      const finduserPoints = await PointsModel.find({
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
  "/:pointId/add-points/:userPointsId",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    try {
      const currentPoint = req.currentPoint;
      const userPointsToUpdate = await UserPointsModel.findOne({
        _id: req.params.userPointsId,
      });

      const updateUserPoints = await UserPointsModel.updateOne(
        { _id: req.params.userPointsId },
        {
          pointsAccumulated:
            userPointsToUpdate.pointsAccumulated +
            Number(currentPoint.creditSystem),  
        },
        { new: true, runValidators: true }
      );

      return res
        .status(200)
        .json(
          `Você adicionou ${currentPoint.creditSystem} ponto(s) para o cliente ${userPointsToUpdate.customerEmail}.`
        );
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
  "/:pointId/credit-points/:userPointsId",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    try {
      const currentPoint = req.currentPoint;
      const userPointsToCredit = await UserPointsModel.findOne({
        _id: req.params.userPointsId,
      });

      const creditUserPoints = await UserPointsModel.updateOne(
        { _id: req.params.userPointsId },
        {
          pointsAccumulated:
            userPointsToCredit.pointsAccumulated -
            req.body,
        },
        { new: true, runValidators: true }
      );

      return res
        .status(200)
        .json(
         `Você creditou ${req.body}, do cliente ${userPointsToCredit.customerEmail}`
        );

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
