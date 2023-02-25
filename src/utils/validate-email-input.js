import validate from "../utils/validate-input.js";

const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
const EMAIL_MIN_LENGTH = 5;
const EMAIL_MAX_LENGTH = 255;

const validateEmail = (value) => {
  const errorMsg = validate(
    EMAIL_REGEX,
    value,
    EMAIL_MIN_LENGTH,
    EMAIL_MAX_LENGTH
  );
  return errorMsg ? `email is ${errorMsg}` : "";
};

export default validateEmail;
