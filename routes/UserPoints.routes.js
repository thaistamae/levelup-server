const router = require("express").Router();

const UserPointsModel = require("../models/UserPoints.model");

const PointsModel = require("../models/Points.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");
const isPoint = require("../middlewares/isPoint");

router.post(
  "/:pointId/create-card",
  isAuthenticated,
  attachCurrentBusiness,
  isPoint,
  async (req, res) => {
    console.log(req.body);

    try {
      const currentPoint = req.currentPoint;

      const userPoints = await UserPointsModel.create({
        ...req.body,
        pointId: req.params.pointId,
        deadline: currentPoint.deadline,
        goal: currentPoint.goal,
      });

      return res.status(201).json(userPoints);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

router.patch(
  "/:pointId/add-points/:userPointsId",
  isAuthenticated,
  attachCurrentBusiness,
  isPoint,
  async (req, res) => {
    try {
      const currentPoint = req.currentPoint;
      const userPointsToUpdate = await UserPointsModel.findOne({
        _id: req.params.userPointsId,
      });

      const updateUserPoints = await UserPointsModel.updateOne(
        { _id: req.params.userPointsId },
        {
          pointsInThisPromotion:
            userPointsToUpdate.pointsInThisPromotion +
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
  isPoint,
  async (req, res) => {
    try {
      const currentPoint = req.currentPoint;
      const userPointsToCredit = await UserPointsModel.findOne({
        _id: req.params.userPointsId,
      });

      if (
        userPointsToCredit.pointsInThisPromotion >=
        Number(currentPoint.offerType)
      ) {
        const creditUserPoints = await UserPointsModel.updateOne(
          { _id: req.params.userPointsId },
          {
            pointsInThisPromotion:
              userPointsToCredit.pointsInThisPromotion -
              Number(currentPoint.offerType),
          },
          { new: true, runValidators: true }
        );

        return res
          .status(200)
          .json(
            `Você creditou ${currentPoint.offerType}, do cliente ${userPointsToCredit.customerEmail}`
          );
      } else {
        return res.json({
          msg: "O cliente não possui pontos suficientes para creditar.",
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
