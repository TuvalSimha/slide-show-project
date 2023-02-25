import validate from "../utils/validate-input.js";

const NAME_REGEX = /^[A-Z][a-z0-9-\s]{0,}$/;
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 255;

const validateName = (value) => {
  const errorMsg = validate(
    NAME_REGEX,
    value,
    NAME_MIN_LENGTH,
    NAME_MAX_LENGTH
  );
  return errorMsg ? `Name is ${errorMsg}` : "";
};

export default validateName;
