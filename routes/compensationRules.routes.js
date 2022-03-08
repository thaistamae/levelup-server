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
      
      {/*result.map((currentDate) => {
        if(currentDate.launch < new Date().toLocaleDateString()){
          const index = result.indexOf(currentDate);
          result.splice(index, 1);
        }
      })*/}  

      try {
        const loggedInUser = req.currentUser;
        const createRule = await CompensationRulesModel.create({
          ...req.body,
          businessId: loggedInUser._id,
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
        const loggedInUser = req.currentUser;
        const addOptionalRule = await CompensationRulesModel.findOneAndUpdate(
            {businessId: loggedInUser._id},
            {...req.body, additionDate: Date.now() },
            //ver se conseguimos colocar mais campos de adicionar regras
            {new: true, runValidators: true }
        );
  
        return res
          .status(200)
          .json(addOptionalRule);
  
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
