let propertiesArr;
let tableDiv;
let isAdmin;
const initialPropertiesTable = (propertiesArrFromHomePage, isAdminParam) => {
  tableDiv = document.getElementById("table-properties-list");
  updatePropertiesTable(propertiesArrFromHomePage);
  isAdmin = isAdminParam;
};

const updatePropertiesTable = (propertiesArrFromHomePage) => {
  propertiesArr = propertiesArrFromHomePage;
  createTable();
};

const createRecord = (name, description, price, img, id) => {
  const deleteOption = `
  <td>
<a
  type="button"
  class="btn btn-sm btn-danger"
  id="propertyListDeleteBtn-${id}"
 >
    Delete
 </a>
</td>
`;
  return `
  <tr>
  <td>${name}</td>
  <td>${description ? description : ""}</td>
  <td>${price ? price + "$" : ""}</td>
  <td> 
  <img
  src="${img ? img : "../public/assets/imgs/missing-image.png"}"
  class="img-fluid"
  alt="${name}"
  />
  </td>
  ${isAdmin ? deleteOption : "<td>Only admin can delete properties</td>"}
  </tr>
  `;
};

const createTable = () => {
  let innerStr = "";
  for (let property of propertiesArr) {
    innerStr += createRecord(
      property.name,
      property.description,
      property.price,
      property.imgUrl
    );
  }
  tableDiv.innerHTML = innerStr;
};

export { initialPropertiesTable, updatePropertiesTable };
