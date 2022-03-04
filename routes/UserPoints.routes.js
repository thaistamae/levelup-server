const router = require("express").Router();

const UserPointsModel = require("../models/UserPoints.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const isAdmin = require("../middlewares/isAdmin");















module.exports = router;
