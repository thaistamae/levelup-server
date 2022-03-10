/*const router = require("express").Router();

const UserDiscountModel = require("../models/UserDiscount.model");

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");

router.post(
  "/create-discountlog",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    console.log(req.body);

    try {
      const loggedInUser = req.currentUser;

      const userExpenses = await UserDiscountModel.create({
        ...req.body,
        businessId: loggedInUser._id,
      });

      return res.status(201).json(userExpenses);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

router.get(
  "/user-discount",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    console.log(req.headers);

    try {
      const loggedInUser = req.currentUser;
      const finduserDiscount = await UserDiscountModel.find({
        businessId: loggedInUser._id,
      });

      return res.status(200).json(finduserDiscount);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

/*router.patch(
  "/add-points/:userPointsId",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    try {
      if (req.body.points === 0 || req.body.points === "") {
        return res.status(400).json({ msg: "points is invalid." });
      }
      const userPointsToUpdate = await UserDiscountModel.findOne({
        _id: req.params.userPointsId,
      });

      const updateUserPoints = await UserDiscountModel.findOneAndUpdate(
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
      const userPointsToCredit = await UserDiscountModel.findOne({
        _id: req.params.userPointsId,
      });

      if (userPointsToCredit.pointsAccumulated - Number(req.body.number) >= 0) {
        const creditUserPoints = await UserDiscountModel.findOneAndUpdate(
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
*/