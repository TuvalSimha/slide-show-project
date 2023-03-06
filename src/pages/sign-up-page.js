import PAGES from "../pages/page-routes.js";
import { handlePageChange } from "../pages/router.js";
import validateEmail from "../utils/validate-email-input.js";
import validatePassword from "../utils/validate-password-input.js";
import validateName from "../utils/validate-name-input.js";
import User from "../models/user-class.js";
import showToast from "../services/Toast.js";

const inputName = document.getElementById("register-input-name");
const inputEmail = document.getElementById("register-input-email");
const inputPassword = document.getElementById("register-input-password");
const btnRegister = document.querySelector("#register-btn");

let nameOk = false;
let emailOk = false;
let passwordOk = false;

window.addEventListener("load", () => {
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

inputName.addEventListener("input", () => {
  checkNameInput();
});

inputEmail.addEventListener("input", () => {
  checkEmailInput();
});

inputPassword.addEventListener("input", () => {
  checkPasswordInput();
});

const checkNameInput = () => {
  let errorArr = validateName(inputName.value);
  if (errorArr.length === 0) {
    inputName.classList.remove("is-invalid");
    document.getElementById("register-alert-name").classList.add("d-none");
    nameOk = true;
  } else {
    inputName.classList.add("is-invalid");
    document.getElementById("register-alert-name").classList.remove("d-none");
    document.getElementById("register-alert-name").innerHTML =
      errorArr.join("<br>");
    nameOk = false;
  }
  checkIfCanEnableBtn();
};

const checkEmailInput = () => {
  let errorArr = validateEmail(inputEmail.value);
  if (errorArr.length === 0) {
    inputEmail.classList.remove("is-invalid");
    document.getElementById("register-alert-email").classList.add("d-none");
    emailOk = true;
  } else {
    inputEmail.classList.add("is-invalid");
    document.getElementById("register-alert-email").classList.remove("d-none");
    document.getElementById("register-alert-email").innerHTML =
      errorArr.join("<br>");
    emailOk = false;
  }
  checkIfCanEnableBtn();
};

const checkPasswordInput = () => {
  let errorArr = validatePassword(inputPassword.value);
  if (errorArr.length === 0) {
    inputPassword.classList.remove("is-invalid");
    document.getElementById("register-alert-password").classList.add("d-none");
    passwordOk = true;
  } else {
    inputPassword.classList.add("is-invalid");
    document
      .getElementById("register-alert-password")
      .classList.remove("d-none");
    document.getElementById("register-alert-password").innerHTML =
      errorArr.join("<br>");
    passwordOk = false;
  }
  checkIfCanEnableBtn();
};

const checkIfCanEnableBtn = () =>
  (btnRegister.disabled = !(nameOk && emailOk && passwordOk));

btnRegister.addEventListener("click", () => {
  if (!(nameOk && emailOk && passwordOk)) {
    return;
  }
  let users = localStorage.getItem("users");
  let nextUserId = localStorage.getItem("nextUserId");
  nextUserId = +nextUserId;
  let newUser = new User(
    nextUserId++,
    inputName.value,
    inputEmail.value,
    inputPassword.value
  );
  console.log(newUser);
  localStorage.setItem("nextUserId", nextUserId + "");
  if (!users) {
    users = [newUser];
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    users = JSON.parse(users);
    for (let user of users) {
      if (user.email === inputEmail.value) {
        showToast("Email already exists", false);
        return;
      }
    }
    users = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(users));
  }
  handlePageChange(PAGES.LOGIN);
});
