const bcrypt = require("bcryptjs");
const generateTokenByJwt = require("../../../config/jwt.config");
const statusServices = require("./status.services");
const BusinessModel = require("../models/Business.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");
const dataHelpers = require("../helpers/data.helpers");
const msgsHelpers = require("../helpers/msgs.helpers")

const findBusinessByEmail = async (email) => {
  return await BusinessModel.findOne({ email });
};

const saltCryptographyRules = bcrypt.genSalt(dataHelpers.saltRounds);

const encryptedPassword = async (password) => {
  return bcrypt.hash(password, await saltCryptographyRules);
};

const createUser = async (req) => {
  await BusinessModel.create({
    ...req,
    passwordHash: await encryptedPassword(req.password),
  });
};

const generateToken = async (req, res) => {
  
  const user = await findBusinessByEmail(req.email);
  if (await bcrypt.compare(req.password, user.passwordHash)) {
    const token = generateTokenByJwt(user);
    return statusServices.successStatus(res).json({
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
        role: user.role,
      },
      token,
    });
  } else {
    return statusServices
      .unauthorizedStatus(res)
      .json(msgsHelpers.invalidPasswordOrEmailMsg);
  }
};

const loggedInBusiness = async (req) => {
  return req.currentUser;
};

const updatedBusiness = async (req) => {
  const loggedInBusiness = req.currentUser;
  await BusinessModel.findOneAndUpdate(
    { _id: loggedInBusiness._id },
    { ...req.body },
    { new: true, runValidators: true }
  );
};

const isDuplicateKeyError = async () => {
  return err.code === 11000;
};

const softDeleteBusinessProfile = async (req) => {
  const loggedInBusiness = req.currentUser;
  await BusinessModel.findOneAndUpdate(
    { _id: loggedInBusiness._id },
    { isDeleted: true, deletedDate: Date.now() },
    { new: true, runValidators: true }
  );
};

module.exports = {
  findBusinessByEmail,
  createUser,
  generateToken,
  loggedInBusiness,
  updatedBusiness,
  isDuplicateKeyError,
  softDeleteBusinessProfile,
};
