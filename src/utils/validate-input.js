const validate = (regex, value, min, max) => {
  let errorMsg = "";
  if (value.length < min || value.length > max) {
    if (value.length < min) {
      errorMsg +=
        "Text Is Too Short - please enter at least " + min + " characters.";
    }
    if (value.length > max) {
      errorMsg +=
        " Text Is Too Long - please enter no more than " + max + " characters.";
    }
  } else if (!regex.test(value)) {
    errorMsg = " Text Is Invalid - please enter a valid text.";
  }
  return errorMsg;
};

export default validate;
