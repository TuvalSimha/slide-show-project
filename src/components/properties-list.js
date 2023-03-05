let propertiesArr;
let listDiv;
let isAdmin;
let deleteProperty;
let showPopup;
//this function will transfer data from homepage to this page
const initialPropertiesList = (
  propertiesArrFromHomePage,
  isAdminParam,
  deletePropertyFromHomePage,
  showPopupFromHomePage
) => {
  listDiv = document.getElementById("home-page-properties-list");
  isAdmin = isAdminParam;
  deleteProperty = deletePropertyFromHomePage;
  showPopup = showPopupFromHomePage;
  updatePropertiesList(propertiesArrFromHomePage);
};

const updatePropertiesList = (propertiesArrFromHomePage) => {
  /*
    this function will get data from homepage and create new list.
    if the list already exists it will remove the old one and
    create new one
  */
  propertiesArr = propertiesArrFromHomePage;
  createList();
};

const createItem = (name, description, price, img, id) => {
  const adminBtns = `
    <div class="btn-group">
  <button
  id="propertyListEditBtn-${id}"
    type="button"
    class="btn btn-sm btn-outline-secondary"
  >
    Edit
  </button>
  <button
    type="button"
    class="btn btn-sm btn-outline-secondary"
    id="propertyListDeleteBtn-${id}"
   >
      Delete
   </button>
    </div>
  `;
  return `
  <div class="card">
  <img src="${
    img ? img : "../public/assets/imgs/missing-image.png"
  }" class="card-img-top" alt="${name ? name : "Missing image"}/>
  <div class="card-body">
    <h5 class="card-title">${name ? name : ""}</h5>
    <p class="card-text">${description ? description : ""}</p>
    <h5 class="card-title text-center">Price: ${price ? price + "$" : ""}</h5>
    <a href="#!" class="btn btn-primary">Call us for the best price!</a>
    ${!isAdmin ? adminBtns : ""}
  </div>
</div>
  `;
};

const getIdFromClick = (ev) => {
  let idFromId = ev.target.id.split("-");
  if (!ev.target.id) {
    idFromId = ev.target.parentElement.id.split("-");
  }
  return idFromId[1];
};

const handleDeleteBtnClick = (ev) => {
  deleteProperty(getIdFromClick(ev));
};

const handleEditBtnClick = (ev) => {
  showPopup(getIdFromClick(ev));
};

const clearEventListeners = (idKeyword, handleFunction) => {
  let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}-']`);
  for (let btn of btnsBefore) {
    btn.removeEventListener("click", handleFunction);
  }
};

const createList = () => {
  let innerStr = "";
  clearEventListeners("propertyListDeleteBtn", handleDeleteBtnClick);
  clearEventListeners("propertyListEditBtn", handleEditBtnClick);

  for (let property of propertiesArr) {
    innerStr += createItem(
      property.name,
      property.description,
      property.price,
      property.imgUrl,
      property.id
    );
  }
  listDiv.innerHTML = innerStr;
  createBtnEventListener("propertyListDeleteBtn", handleDeleteBtnClick);
  createBtnEventListener("propertyListEditBtn", handleEditBtnClick);
};

const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}-']`);
  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

export { initialPropertiesList, updatePropertiesList };
