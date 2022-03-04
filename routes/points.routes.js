const router = require("express").Router();

const PointsModel = require("../models/Points.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");
const isAdmin = require("../middlewares/isAdmin");

// Crud (CREATE) - HTTP POST
// Criar uma nova oferta
router.post("/create-points", isAuthenticated, attachCurrentBusiness, isAdmin, async (req, res) => {
  // Requisições do tipo POST tem uma propriedade especial chamada body, que carrega a informação enviada pelo cliente
  const loggedInUser = req.currentUser.user;
  try {
      const loggedInUser = req.currentUser;
      const createPoints = await PointsModel.create(
          {...req.body, businessId: loggedInUser._id});
          //console.log(loggedInUser._id)
    
      return res.status(201).json(createPoints);
    
    } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// cRud (READ) - HTTP GET
// Buscar dados do usuário
router.get("/my-points", isAuthenticated, attachCurrentBusiness, async (req, res) => {
  console.log(req.headers);

  try {
    // Buscar o usuário logado que está disponível através do middleware attachCurrentUser  
    const loggedInUser = req.currentUser  
    const businessGoals = await PointsModel.find(
        { businessId: loggedInUser._id }
      );
  
      return res.status(200).json(businessGoals);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });
  
  router.get("/my-points/:id", isAuthenticated, attachCurrentBusiness, async (req, res) => {
    try {
      const loggedInUser = req.currentUser;
  
      const foundGoal = await BusinessModel.findOne({ _id: req.params.id });
      isOwner(foundGoal.owner, loggedInUser._id);
  
      return res.status(200).json(foundGoal);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });
  

router.delete("/delete-points", isAuthenticated, attachCurrentBusiness, isAdmin, async (req, res) => {
    const loggedInUser = req.currentUser;
    
    await PointsModel.findOneAndUpdate(
      { _id: loggedInUser._id },
      { isDeleted: true, deletedDate: Date.now() },
      { new: true, runValidators: true }
    );
  
    return res.status(200).json({ msg: "Okay" });
});
    
  module.exports = router;
