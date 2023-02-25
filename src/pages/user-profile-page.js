import validateEmail from "../utils/validate-email-input.js";
import validatePassword from "../utils/validate-password-input.js";
import validateName from "../utils/validate-name-input.js";
import showToast from "../services/toast.js";

const inputName = document.getElementById("profile-input-name");
const inputEmail = document.getElementById("profile-input-email");
const inputPassword = document.getElementById("profile-input-password");
const btnProfile = document.querySelector("#profile-btn");

let nameOk = false;
let emailOk = false;
let passwordOk = false;

const checkInput = (inputElement, validateFn, alertElement) => {
  const errorArr = validateFn(inputElement.value);
  if (errorArr.length === 0) {
    inputElement.classList.remove("is-invalid");
    alertElement.classList.add("d-none");
    return true;
  } else {
    inputElement.classList.add("is-invalid");
    alertElement.classList.remove("d-none");
    alertElement.innerHTML = errorArr.join("<br>");
    return false;
  }
};

const checkNameInput = () => {
  nameOk = checkInput(
    inputName,
    validateName,
    document.getElementById("profile-alert-name")
  );
};

const checkEmailInput = () => {
  emailOk = checkInput(
    inputEmail,
    validateEmail,
    document.getElementById("profile-alert-email")
  );
};

const checkPasswordInput = () => {
  passwordOk = checkInput(
    inputPassword,
    validatePassword,
    document.getElementById("profile-alert-password")
  );
};

const checkIfCanEnableBtn = () => {
  btnProfile.disabled = !(nameOk && emailOk && passwordOk);
};

const saveChanges = () => {
  if (!(nameOk && emailOk && passwordOk)) {
    return;
  }
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const token = JSON.parse(localStorage.getItem("token")) || {};
  const userEmail = users.find((item) => item.email === inputEmail.value);
  const user = users.find((item) => item.id === token.id);
  if (userEmail && user.id !== userEmail.id) {
    showToast("The email already taken", false);
    return;
  }
  if (user) {
    user.name = token.name = inputName.value;
    user.email = token.email = inputEmail.value;
    user.password = inputPassword.value;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("token", JSON.stringify(token));
    showToast("Saved");
  }
  setTimeout(() => {
    location.reload();
  }, 3000);
};

window.addEventListener("load", () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const token = JSON.parse(localStorage.getItem("token")) || {};
  const user = users.find((item) => item.id === token.id);
  if (user) {
    inputName.value = user.name;
    inputEmail.value = user.email;
    inputPassword.value = user.password;
  }
  if (inputName.value !== "") {
    checkNameInput();
  }
  if (inputEmail.value !== "") {
    checkEmailInput();
  }
  if (inputPassword.value !== "") {
    checkPasswordInput();
  }
});

inputName.addEventListener("input", checkNameInput);

inputEmail.addEventListener("input", checkEmailInput);

inputPassword.addEventListener("input", checkPasswordInput);

btnProfile.addEventListener("click", saveChanges);
