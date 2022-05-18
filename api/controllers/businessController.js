const businessServices = require("../services/business.services");
const statusServices = require("../services/status.services");
const msgsHelpers = require("../helpers/msgs.helpers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentBusiness = require("../middlewares/attachCurrentBusiness");

const {
  validatePasswordRequirements,
} = require("../validations/business.validations");

const signUp = async (req) => {
  try {
    if (businessServices.findBusinessByEmail(req.email)) {
      return statusServices.badRequestStatus.json(
        msgsHelpers.emailAlreadyRegisteredMsg
      );
    }
    if (validatePasswordRequirements) {
      return statusServices.badRequestStatus.json(
        msgsHelpers.invalidPasswordRequirementsMsg
      );
    }
    businessServices.createUser;
    statusServices.createdStatus.json(msgsHelpers.successMsg);
  } catch (err) {
    return statusServices.internalServerErrorStatus.json({
      msg: JSON.stringify(err),
    });
  }
};

const login = async () => {
  try {
    if (!businessServices.findBusinessByEmail) {
      return statusServices.badRequestStatus.json(msgsHelpers.invalidEmailMsg);
    }
    if (businessServices.generateToken) {
      return statusServices.successStatus.json(msgsHelpers.successMsg);
    } else {
      return statusServices.unauthorizedStatus.json(
        msgsHelpers.invalidPasswordOrEmailMsg
      );
    }
  } catch (err) {
    return statusServices.internalServerErrorStatus.json({
      msg: JSON.stringify(err),
    });
  }
};

const showBusinessProfile = async () => {
  try {
    if (
      isAuthenticated &&
      attachCurrentBusiness &&
      businessServices.loggedInBusiness
    ) {
      return statusServices.successStatus.json(
        businessServices.loggedInBusiness
      );
    } else {
      return statusServices.notFoundStatus.json(msgsHelpers.invalidUserMsg);
    }
  } catch (err) {
    return statusServices.internalServerErrorStatus.json({
      msg: JSON.stringify(err),
    });
  }
};

const updateProfile = async () => {
  try {
    if (isAuthenticated && attachCurrentBusiness) {
      businessServices.updatedBusiness;
      return statusServices.successStatus.json(
        businessServices.updatedBusiness
      );
    }
  } catch (err) {
    if (businessServices.isDuplicateKeyError) {
      return statusServices.badRequestStatus.json(
        err.message ? err.message : err
      );
    }
    return statusServices.internalServerErrorStatus.json({
      msg: JSON.stringify(err),
    });
  }
};

const deleteProfile = async () => {
  try {
    if (isAuthenticated && attachCurrentBusiness) {
      businessServices.softDeleteBusinessProfile;
      return statusServices.successStatus.json(msgsHelpers.successMsg);
    }
  } catch (err) {
    return statusServices.internalServerErrorStatus.json({
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
