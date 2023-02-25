import validate from "../utils/validate-input.js";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,}$/;
const PASSWORD_MIN_LENGTH = 5;
const PASSWORD_MAX_LENGTH = 255;

const validatePassword = (value) => {
  const errorMsg = validate(
    PASSWORD_REGEX,
    value,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH
  );
  return errorMsg ? `password is ${errorMsg}` : "";
};

export default validatePassword;
