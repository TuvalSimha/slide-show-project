import validateEmail from "../utils/validate-email-input.js";
import validatePassword from "../utils/validate-password-input.js";

const loginEmailInput = document.querySelector("#login-input-email");
const loginPasswordInput = document.querySelector("#login-input-password");
const loginBtn = document.querySelector("#login-btn");
const emailAlert = document.getElementById("login-alert-email");
const passwordAlert = document.getElementById("login-alert-password");

function handleInput() {
  const { value: emailValue } = loginEmailInput;
  const { value: passwordValue } = loginPasswordInput;

  const emailErrors = validateEmail(emailValue);
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

  const passwordErrors = validatePassword(passwordValue);
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
  const emailErrors = validateEmail(loginEmailInput.value);
  if (emailErrors.length) {
    return;
  }

  const passwordErrors = validatePassword(loginPasswordInput.value);
  if (passwordErrors.length) {
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const authenticatedUser = users.find(({ email, password }) => {
    return (
      email === loginEmailInput.value && password === loginPasswordInput.value
    );
  });

  if (!authenticatedUser) {
    console.log("invalid email and/or password");
    return;
  }

  const { id, name, isAdmin } = authenticatedUser;
  const token = { id, name, email: loginEmailInput.value, isAdmin };
  localStorage.setItem("token", JSON.stringify(token));
  location.reload();
});
