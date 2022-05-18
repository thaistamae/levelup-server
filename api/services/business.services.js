const bcrypt = require("bcryptjs");
const generateTokenByJwt = require("../../config/jwt.config");
const BusinessModel = require("../models/Business.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");
const dataHelpers = require("../helpers/data.helpers");

const findBusinessByEmail = async (email) => {
  return await BusinessModel.findOne({ email: email });
};

const saltCryptographyRules = bcrypt.genSalt(dataHelpers.saltRounds);

const encryptedPassword = async (password) => {
  return bcrypt.hash(password, saltCryptographyRules);
}


const createUser = async () => {
  await BusinessModel.create({
    ...req.body,
    passwordHash: encryptedPassword,
  });
};

const generateToken = async () => {
  if (await bcrypt.compare(password, findBusinessByEmail.passwordHash)) {
    const token = generateTokenByJwt(findBusinessByEmail);
  }
};

const loggedInBusiness = async (req) => {
  return req.currentUser
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
  softDeleteBusinessProfile
};
