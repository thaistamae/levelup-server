const router = require("express").Router();

const businessController = require("../controllers/businessController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");

router.post("/signup", async (req, res) => {
  businessController.signUp(req.body, res);
});

router.post("/login", async (req, res) => {
  businessController.login(req.body, res);
});

router.get("/profile", isAuthenticated, attachCurrentBusiness, (req, res) => {
  businessController.showBusinessProfile(req, res);
});

router.patch(
  "/profile/update",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    businessController.updateProfile(req, res);
  }
);

router.delete(
  "/delete-business",
  isAuthenticated,
  attachCurrentBusiness,
  async (req, res) => {
    businessController.deleteProfile(req, res);
  }
);

module.exports = router;
