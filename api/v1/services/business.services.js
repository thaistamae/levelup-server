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
  console.log(req.password, user.passwordHash)
  console.log(await bcrypt.compare(req.password, user.passwordHash))
  if (await bcrypt.compare(req.password, user.passwordHash)) {
    generateTokenByJwt(user);
    return statusServices.successStatus(res).json(msgsHelpers.successMsg);
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
  await BusinessModel.findOneAndUpdate(
    { _id: loggedInBusiness._id },
    { ...req.body },
    { new: true, runValidators: true }
  );
};

const isDuplicateKeyError = async () => {
  return err.code === 11000;
};

const softDeleteBusinessProfile = async () => {
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
