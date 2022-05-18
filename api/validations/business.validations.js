const dataHelpers = require("../helpers/data.helpers");

const validatePasswordRequirements = async (req) => {
  const { password } = req.body;
  !password.match(dataHelpers.passwordRequirements);
};

module.exports = {
  validatePasswordRequirements,
};
