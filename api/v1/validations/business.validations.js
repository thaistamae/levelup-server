const dataHelpers = require("../helpers/data.helpers");

const validatePasswordRequirements = async (password) => {
  return !password || !password.match(dataHelpers.passwordRequirements);
};

module.exports = {
  validatePasswordRequirements,
};
