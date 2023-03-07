import PAGES from "../pages/page-routes.js";
import { handlePageChange } from "./router.js";
import validateEmail from "../utils/validate-email-input.js";
import validatePassword from "../utils/validate-password-input.js";
import validateName from "../utils/validate-name-input.js";
import User from "../models/user-class.js";

const inputName = document.getElementById("register-input-name");
const inputEmail = document.getElementById("register-input-email");
const inputPassword = document.getElementById("register-input-password");
const btnRegister = document.querySelector("#register-btn");

const checkIfCanEnableBtn = () => {
  const { value: name } = inputName;
  const { value: email } = inputEmail;
  const { value: password } = inputPassword;
  btnRegister.disabled = !(
    validateName(name).length === 0 &&
    validateEmail(email).length === 0 &&
    validatePassword(password).length === 0
  );
};

const handleInput = (inputField, validationFn, alertElemId) => {
  inputField.addEventListener("input", () => {
    const errorArr = validationFn(inputField.value);
    if (errorArr.length === 0) {
      inputField.classList.remove("is-invalid");
      document.getElementById(alertElemId).classList.add("d-none");
    } else {
      inputField.classList.add("is-invalid");
      const alertElem = document.getElementById(alertElemId);
      alertElem.classList.remove("d-none");
      alertElem.innerHTML = errorArr.join("<br>");
    }
    checkIfCanEnableBtn();
  });
};

handleInput(inputName, validateName, "register-alert-name");
handleInput(inputEmail, validateEmail, "register-alert-email");
handleInput(inputPassword, validatePassword, "register-alert-password");

btnRegister.addEventListener("click", () => {
  if (btnRegister.disabled) {
    return;
  }
  let users = localStorage.getItem("users");
  let nextUserId = localStorage.getItem("nextUserId");
  nextUserId = +nextUserId;
  const newUser = new User(
    nextUserId++,
    inputName.value,
    inputEmail.value,
    inputPassword.value
  );
  localStorage.setItem("nextUserId", nextUserId + "");
  if (!users) {
    //the first user
    users = [newUser];
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    //we have users
    users = JSON.parse(users);
    for (let user of users) {
      if (user.email === inputEmail.value) {
        alert("Email already exists");
        return;
      }
    }
    users = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(users));
  }
  handlePageChange(PAGES.LOGIN);
});
