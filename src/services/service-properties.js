let propertiesArr = [];
let originalPropertiesArr = [];

function loadPropertiesFromLocalStorage() {
  const storedProperties = localStorage.getItem("props");
  if (storedProperties) {
    propertiesArr = JSON.parse(storedProperties);
    originalPropertiesArr = propertiesArr.slice();
  }
}

function deleteProperty(id) {
  id = +id;
  originalPropertiesArr = originalPropertiesArr.filter(
    (item) => item.id !== id
  );
  savePropertiesToLocalStorage(originalPropertiesArr);
  propertiesArr = propertiesArr.filter((item) => item.id !== id);
}

function savePropertiesToLocalStorage(properties) {
  localStorage.setItem("props", JSON.stringify(properties));
}

window.addEventListener("load", loadPropertiesFromLocalStorage);

export { deleteProperty, propertiesArr, originalPropertiesArr };
