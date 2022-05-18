const router = require("express").Router();

const businessController = require("../controllers/businessController");

router.post("/signup", async(req, res)  => {
     businessController.signUp(req.body, res)
});

router.post("/login", async(req, res) => {
     businessController.login(req.body, res)
});

router.get("/profile", businessController.showBusinessProfile);

router.patch("/profile/update", businessController.updateProfile);

router.delete("/delete-business", businessController.deleteProfile);

module.exports = router;
