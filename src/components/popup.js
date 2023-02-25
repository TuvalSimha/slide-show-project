// Import functions
import Property from "../models/property-class.js";
import getNextId from "../utils/get-next-id.js";

// Define global variables
let selectedProperty;
let editProperty;
const editPropertiesPopupImgDisplay = document.getElementById(
  "editPropertiesPopupImgDisplay"
);
const editPropertiesPopupName = document.getElementById(
  "editPropertiesPopupName"
);
const editPropertiesPopupDescription = document.getElementById(
  "editPropertiesPopupDescription"
);
const editPropertiesPopupPrice = document.getElementById(
  "editPropertiesPopupPrice"
);
const editPropertiesPopupImg = document.getElementById(
  "editPropertiesPopupImg"
);
const editPropertiesPopup = document.getElementById("editPropertiesPopup");

// Initialize popup
const initPopup = (selectedPropertyFromHomePage, editPropertyFromHomePage) => {
  // Set the selected property data to HTML
  selectedProperty =
    selectedPropertyFromHomePage || new Property(getNextId(), "", 0, "", "");
  editProperty = editPropertyFromHomePage;
  editPropertiesPopupImgDisplay.src = selectedProperty.imgUrl;
  editPropertiesPopupName.value = selectedProperty.name;
  editPropertiesPopupDescription.value = selectedProperty.description;
  editPropertiesPopupPrice.value = selectedProperty.price;
  editPropertiesPopupImg.value = selectedProperty.imgUrl;
  showPopup();
};

// Show/hide popup
const showPopup = () => {
  editPropertiesPopup.classList.remove("d-none");
};
const hidePopup = () => {
  editPropertiesPopup.classList.add("d-none");
};

// Add event listeners
window.addEventListener("load", () => {
  editPropertiesPopup.addEventListener("click", (ev) => {
    if (
      ![
        "editPropertiesPopup",
        "editPropertiesPopupCancelBtn",
        "editPropertiesPopupCancelBtnIcon",
      ].includes(ev.target.id)
    ) {
      return;
    }
    hidePopup();
  });
  document
    .getElementById("editPropertiesPopupSaveBtn")
    .addEventListener("click", () => {
      selectedProperty.name = editPropertiesPopupName.value;
      selectedProperty.description = editPropertiesPopupDescription.value;
      selectedProperty.price = editPropertiesPopupPrice.value;
      selectedProperty.imgUrl = editPropertiesPopupImg.value;
      editProperty(selectedProperty);
      hidePopup();
    });
  editPropertiesPopupImg.addEventListener("input", () => {
    editPropertiesPopupImgDisplay.src = editPropertiesPopupImg.value;
  });
});

// Export functions
export { initPopup, showPopup, hidePopup };
