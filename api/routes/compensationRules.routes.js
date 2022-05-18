const router = require("express").Router();

const CompensationRulesModel = require("../models/CompensationRules.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");
const isAdmin = require("../middlewares/isAdmin");

router.post(
  "/create-rule",
  isAuthenticated,
  attachCurrentBusiness,
  isAdmin,
  async (req, res) => {
    {
      /*result.map((currentDate) => {
        if(currentDate.launch < new Date().toLocaleDateString()){
          const index = result.indexOf(currentDate);
          result.splice(index, 1);
        }
      })*/
    }

    try {
      const loggedInBusiness = req.currentUser;
      const createRule = await CompensationRulesModel.create({
        ...req.body,
        businessId: loggedInBusiness._id,
      });

      return res.status(201).json(createRule);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

router.patch(
  "/add-optional",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    try {
      if (!req.body.optionalAddition) {
        return res
          .status(400)
          .json({ msg: "Gentileza fornecer campo correto" });
      }
      const loggedInBusiness = req.currentUser;
      const addOptionalRule = await CompensationRulesModel.findOneAndUpdate(
        { businessId: loggedInBusiness._id },
        { $push: { optionalAddition: { ...req.body } } },
        { new: true, runValidators: true }
      );

      return res.status(200).json(addOptionalRule);
    } catch (err) {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json(err.message ? err.message : err);
      }

      res.status(500).json(err);
    }
  }
);

router.get(
  "/compensation",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    try {
      const loggedInBusiness = req.currentUser;
      const compensationRule = await CompensationRulesModel.find({
        businessId: loggedInBusiness._id,
      });

      return res.status(200).json(compensationRule);
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
