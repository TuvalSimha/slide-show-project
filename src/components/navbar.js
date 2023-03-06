// Import functions
import checkIfAdmin from "../utils/check-if-admin.js";
import checkIfConnected from "../utils/check-if-connected.js";
import getNextId from "../utils/get-next-id.js";

// Define global variables
let nextId;
let isAdmin;
let isConnected;
let showPopup;
let navAddNewPropertyLink;
const navBeforeLogin = document.getElementById("navBeforeLogin");
const navAfterLogin = document.getElementById("navAfterLogin");

// Initialize navbar
const initializeNavbar = (showPopupFromApp) => {
  // Get the next ID, check if the user is an admin, and check if the user is connected
  nextId = getNextId();
  isAdmin = checkIfAdmin();
  isConnected = checkIfConnected();

  // If the user is connected, show the after-login navbar and hide the before-login navbar
  if (isConnected) {
    navBeforeLogin.classList.add("d-none");
    navAfterLogin.classList.remove("d-none");
  }

  // Set the showPopup function from the app
  showPopup = showPopupFromApp;

  // Add an event listener to the Add New Property link in the navbar
  navAddNewPropertyLink = document.getElementById("nav-add-new-property-link");
  if (!isAdmin) {
    navAddNewPropertyLink.classList.add("d-none");
  }
  if (isAdmin) {
    navAddNewPropertyLink.classList.remove("d-none");
  }
  navAddNewPropertyLink.addEventListener("click", showPopup);
};

// Export the initializeNavbar function
export default initializeNavbar;
