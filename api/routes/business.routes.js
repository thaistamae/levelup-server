const router = require("express").Router();

const businessController = require("../controllers/businessController");

router.post("/signup", async (req)  => {
     businessController.signUp(req.body)
});

router.post("/login", businessController.login);

router.get("/profile", businessController.showBusinessProfile);

router.patch("/profile/update", businessController.updateProfile);

router.delete("/delete-business", businessController.deleteProfile);

module.exports = router;
