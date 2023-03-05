let propertiesArr;
let tableDiv;
const initialPropertiesTable = (propertiesArrFromHomePage) => {
  tableDiv = document.getElementById("table-properties-list");
  updatePropertiesTable(propertiesArrFromHomePage);
};

const updatePropertiesTable = (propertiesArrFromHomePage) => {
  propertiesArr = propertiesArrFromHomePage;
  createTable();
};

const createRecord = (name, description, price, img) => {
  return `
  <tr>
  <td>${name}</td>
  <td>${description ? description : ""}</td>
  <td>${price ? price + "$" : ""}</td>
  <td>          <img
  src="${img ? img : "../public/assets/imgs/missing-image.png"}"
  class="img-fluid"
  alt="${name}"
/>
</td>
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
