let propertiesArr;
let galleryDiv;
const initialPropertiesGallery = (propertiesArrFromHomePage) => {
  galleryDiv = document.getElementById("home-page-properties-gallery");
  updatePropertiesGallery(propertiesArrFromHomePage);
};

const updatePropertiesGallery = (propertiesArrFromHomePage) => {
  propertiesArr = propertiesArrFromHomePage;
  createGallery();
};

const createCard = (name, description, price, img) => {
  return `

  `;
};

const createGallery = () => {
  let innerStr = "";
  for (let property of propertiesArr) {
    innerStr += createCard(
      property.name,
      property.description,
      property.price,
      property.imgUrl
    );
  }
  galleryDiv.innerHTML = innerStr;
};

export { initialPropertiesGallery, updatePropertiesGallery };
