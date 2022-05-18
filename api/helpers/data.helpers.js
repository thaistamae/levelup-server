const passwordRequirements =
  "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/";
const saltRounds = 10;

module.exports = {
  passwordRequirements,
  saltRounds,
};
