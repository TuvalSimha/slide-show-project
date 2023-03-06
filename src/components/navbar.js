import checkIfAdmin from "../utils/check-if-admin.js";
import checkIfConnected from "../utils/check-if-connected.js";
import getNextId from "../utils/get-next-id.js";

let nextId;
let isAdmin;
let isConnected;
let showPopup;
let navAddNewPropertyLink;
const navBeforeLogin = document.getElementById("navBeforeLogin");
const navAfterLogin = document.getElementById("navAfterLogin");

const initializeNavbar = (showPopupFromApp) => {
  nextId = getNextId();
  isAdmin = checkIfAdmin();
  isConnected = checkIfConnected();
  if (isConnected) {
    navBeforeLogin.classList.add("d-none");
    navAfterLogin.classList.remove("d-none");
  }
  showPopup = showPopupFromApp;
  navAddNewPropertyLink = document.getElementById("nav-add-new-property-link");
  if (!isAdmin) {
    navAddNewPropertyLink.classList.add("d-none");
  }
  if (isAdmin) {
    navAddNewPropertyLink.classList.remove("d-none");
  }
  navAddNewPropertyLink.addEventListener("click", showPopup);
};
export default initializeNavbar;
