import {
  initialPropertiesTable,
  updatePropertiesTable,
} from "../components/properties-table-list.js";
import {
  initialPropertiesList,
  updatePropertiesList,
} from "../components/properties-list.js";
import {
  initialPropertiesCarousel,
  updatePropertiesCarousel,
} from "../components/properties-carousel.js";
import { initPopup } from "../components/popup.js";
import checkIfAdmin from "../utils/check-if-admin.js";

let propertiesArr, originalPropertiesArr, displayNow, isAdmin;
let homeDisplayList, homeDisplayTable, homeDisplayCarousel;
let propertiesList, propertiesCarousel, propertiesTable;

window.addEventListener("load", () => {
  propertiesArr = JSON.parse(localStorage.getItem("props") || "[]");
  originalPropertiesArr = [...propertiesArr];
  isAdmin = checkIfAdmin();
  initialPropertiesList(propertiesArr, isAdmin, deleteProperty, showPopup);
  initialPropertiesCarousel(propertiesArr);
  initialPropertiesTable(propertiesArr);
  initializeElements();
  initializeBtns();
});

const initializeElements = () => {
  homeDisplayList = document.getElementById("homeDisplayList");
  homeDisplayGallery = document.getElementById("homeDisplayGallery");
  homeDisplayCarousel = document.getElementById("homeDisplayCarousel");
  homeDisplayTable = document.getElementById("homeDisplayTable");
  propertiesGallery = document.getElementById("propertiesGallery");
  propertiesTable = document.getElementById("propertiesTable");
  propertiesList = document.getElementById("propertiesList");
  propertiesCarousel = document.getElementById("propertiesCarousel");
  displayNow = propertiesList;
  displaySwitch(displayNow);
};

const initializeBtns = () => {
  homeDisplayList.addEventListener("click", () =>
    displaySwitch(propertiesList)
  );
  homeDisplayGallery.addEventListener("click", () =>
    displaySwitch(propertiesGallery)
  );
  homeDisplayTable.addEventListener("click", () =>
    displaySwitch(propertiesTable)
  );
  homeDisplayCarousel.addEventListener("click", () =>
    displaySwitch(propertiesCarousel)
  );
  document
    .getElementById("homeDisplaySortASC")
    .addEventListener("click", () => sortProperties());
  document
    .getElementById("homeDisplaySortDESC")
    .addEventListener("click", () => sortProperties(false));
  document
    .getElementById("homeDisplaySearch")
    .addEventListener("input", (ev) => searchProperties(ev.target.value));
};

const displaySwitch = (toDisplay) => {
  if (displayNow !== null) {
    displayNow.classList.remove("d-block");
    displayNow.classList.add("d-none");
  }
  if (toDisplay !== null) {
    toDisplay.classList.remove("d-none");
    toDisplay.classList.add("d-block");
    displayNow = toDisplay;
  }
};

const updateDisplays = () => {
  updatePropertiesList(propertiesArr);
  updatePropertiesCarousel(propertiesArr);
  updatePropertiesTable(propertiesArr);
};

const saveToLocalStorage = (arrToSave) => {
  localStorage.setItem("props", JSON.stringify(arrToSave));
};

const deleteProperty = (id) => {
  id = +id;
  originalPropertiesArr = originalPropertiesArr.filter(
    (item) => item.id !== id
  );
  saveToLocalStorage(originalPropertiesArr);
  propertiesArr = propertiesArr.filter((item) => item.id !== id);
  updateDisplays();
};

const editProperty = () => {
  saveToLocalStorage(originalPropertiesArr);
  updateDisplays();
};

const sortProperties = (asc = true) => {
  propertiesArr.sort((a, b) =>
    asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
  updateDisplays();
};

const searchProperties = (value) => {
  propertiesArr = originalPropertiesArr.filter((item) =>
    new RegExp(`^${value}`, "i").test(item.name)
  );
  updateDisplays();
};

const showPopup = (id) => {
  const selectedProperty = propertiesArr.find((item) => item.id === +id);
  if (!selectedProperty) {
    return;
  }
  initPopup(selectedProperty, editProperty);
};

const showNewPopup = () => {
  initPopup(undefined, addNewProperty);
};

const addNewProperty = (newProperty) => {
  originalPropertiesArr = [...originalPropertiesArr, newProperty];
  let nextId = +newProperty.id + 1;
  localStorage.setItem("nextid", nextId + "");
  propertiesArr = [...originalPropertiesArr];
  editProperty();
};

export { showNewPopup };
