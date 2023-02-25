const validate = (regex, value, min, max) => {
  let errorMsg = "";
  if (value.length < min || value.length > max) {
    if (value.length < min) {
      errorMsg += "Text is too short. ";
    }
    if (value.length > max) {
      errorMsg += "Text is too long. ";
    }
  } else if (!regex.test(value)) {
    errorMsg = "Text invalid";
  }
  return errorMsg;
};

export default validate;
