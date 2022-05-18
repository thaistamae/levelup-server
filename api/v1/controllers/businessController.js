const businessServices = require("../services/business.services");
const statusServices = require("../services/status.services");
const businessValidations = require("../validations/business.validations");
const msgsHelpers = require("../helpers/msgs.helpers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");

const signUp = async (req, res) => {
  if (await businessServices.findBusinessByEmail(req.email)) {
    return statusServices
      .badRequestStatus(res)
      .json(msgsHelpers.emailAlreadyRegisteredMsg);
  }

  if (await businessValidations.validatePasswordRequirements(req.password)) {
    return statusServices
      .badRequestStatus(res)
      .json(msgsHelpers.invalidPasswordRequirementsMsg);
  }

  businessServices.createUser(req);
  statusServices.createdStatus(res).json(msgsHelpers.successMsg);
};

const login = async (req, res) => {
  if (!await businessServices.findBusinessByEmail(req.email)) {
    return statusServices
      .badRequestStatus(res)
      .json(msgsHelpers.invalidEmailMsg);
  }
  businessServices.generateToken(req, res)
};

const showBusinessProfile = async (res) => {
  try {
    if (
      isAuthenticated &&
      attachCurrentBusiness &&
      businessServices.loggedInBusiness
    ) {
      return statusServices
        .successStatus(res)
        .json(businessServices.loggedInBusiness);
    } else {
      return statusServices
        .notFoundStatus(res)
        .json(msgsHelpers.invalidUserMsg);
    }
  } catch (err) {
    return statusServices.internalServerErrorStatus(res).json({
      msg: JSON.stringify(err),
    });
  }
};

const updateProfile = async (res) => {
  try {
    if (isAuthenticated && attachCurrentBusiness) {
      businessServices.updatedBusiness;
      return statusServices
        .successStatus(res)
        .json(businessServices.updatedBusiness);
    }
  } catch (err) {
    if (businessServices.isDuplicateKeyError) {
      return statusServices
        .badRequestStatus(res)
        .json(err.message ? err.message : err);
    }
    return statusServices.internalServerErrorStatus(res).json({
      msg: JSON.stringify(err),
    });
  }
};

const deleteProfile = async (res) => {
  try {
    if (isAuthenticated && attachCurrentBusiness) {
      businessServices.softDeleteBusinessProfile;
      return statusServices.successStatus(res).json(msgsHelpers.successMsg);
    }
  } catch (err) {
    return statusServices.internalServerErrorStatus(res).json({
      msg: JSON.stringify(err),
    });
  }
};

module.exports = {
  signUp,
  login,
  showBusinessProfile,
  updateProfile,
  deleteProfile,
};
