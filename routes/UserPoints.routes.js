const router = require("express").Router();

const userPointsModel = require("../models/Points.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");
const isAdmin = require("../middlewares/isAdmin");















module.exports = router;
