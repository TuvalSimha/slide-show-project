import validateEmail from "../utils/validate-email-input.js";
import validatePassword from "../utils/validate-password-input.js";

let loginEmailInput = document.querySelector("#login-input-email");
let loginPasswordInput = document.querySelector("#login-input-password");
let loginBtn = document.querySelector("#login-btn");
let emailAlert = document.getElementById("login-alert-email");
let passwordAlert = document.getElementById("login-alert-password");

function handleInput() {
  let { value: emailValue } = loginEmailInput;
  let { value: passwordValue } = loginPasswordInput;

  let emailErrors = validateEmail(emailValue);
  if (!emailErrors) {
    return;
  }

  if (emailErrors.length === 0) {
    loginEmailInput.classList.remove("is-invalid");
    emailAlert.classList.add("d-none");
  } else {
    loginEmailInput.classList.add("is-invalid");
    emailAlert.classList.remove("d-none");
    emailAlert.innerHTML = emailErrors.join("<br>");
  }

  let passwordErrors = validatePassword(passwordValue);
  if (!passwordErrors) {
    return;
  }

  if (passwordErrors.length === 0) {
    loginPasswordInput.classList.remove("is-invalid");
    passwordAlert.classList.add("d-none");
  } else {
    loginPasswordInput.classList.add("is-invalid");
    passwordAlert.classList.remove("d-none");
    passwordAlert.innerHTML = passwordErrors.join("<br>");
  }
}

loginEmailInput.addEventListener("input", handleInput);
loginPasswordInput.addEventListener("input", handleInput);

loginBtn.addEventListener("click", () => {
  let emailErrors = validateEmail(loginEmailInput.value);
  if (emailErrors.length) {
    return;
  }

  let passwordErrors = validatePassword(loginPasswordInput.value);
  if (passwordErrors.length) {
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  console.log("users", users);
  let authenticatedUser = users.find(({ email, password }) => {
    return (
      email === loginEmailInput.value && password === loginPasswordInput.value
    );
  });

  if (!authenticatedUser) {
    console.log("invalid email and/or password");
    return;
  }

  let { id, name, isAdmin } = authenticatedUser;
  let token = { id, name, email: loginEmailInput.value, isAdmin };
  localStorage.setItem("token", JSON.stringify(token));
  location.reload();
});
