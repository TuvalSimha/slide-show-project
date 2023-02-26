let propertiesArr;
let carouselDiv;
let showIdx = 0;
let animationInProgress = false;

const initialPropertiesCarousel = (propertiesArrFromHomePage) => {
  carouselDiv = document.getElementById("home-page-properties-carousel");
  initializeBtns();
  updatePropertiesCarousel(propertiesArrFromHomePage);
};

const updatePropertiesCarousel = (propertiesArrFromHomePage) => {
  showIdx = 0;
  animationInProgress = false;
  propertiesArr = propertiesArrFromHomePage;
  createCarousel();
};

const initializeBtns = () => {
  document.getElementById("back-carousel-btn").addEventListener("click", () => {
    if (animationInProgress) return;
    animateCarousel(-1);
  });

  document.getElementById("next-carousel-btn").addEventListener("click", () => {
    if (animationInProgress) return;
    animateCarousel(1);
  });
};

const createItem = (name, img) => {
  return `
    <img src="${img}" alt="${name}" class="opacity-0" />
  `;
};

const createCarousel = () => {
  const innerHTML = propertiesArr
    .map((property) => createItem(property.name, property.imgUrl))
    .join("");
  carouselDiv.innerHTML = innerHTML;
  carouselDiv.querySelector("img").classList.remove("opacity-0");
};

const animateCarousel = (direction) => {
  const currentIdx = showIdx;
  const nextIdx =
    (showIdx + direction + propertiesArr.length) % propertiesArr.length;
  showIdx = nextIdx;
  const currentImg = carouselDiv.querySelector(
    `.img-container > img:nth-child(${currentIdx + 1})`
  );
  const nextImg = carouselDiv.querySelector(
    `.img-container > img:nth-child(${nextIdx + 1})`
  );
  currentImg.classList.add("fade-out");
  nextImg.classList.remove("opacity-0");
  nextImg.classList.add("fade-in");
  animationInProgress = true;
  currentImg.addEventListener(
    "animationend",
    () => {
      currentImg.classList.remove("fade-out");
      currentImg.classList.add("opacity-0");
      nextImg.classList.remove("fade-in");
      animationInProgress = false;
    },
    { once: true }
  );
};

export { initialPropertiesCarousel, updatePropertiesCarousel };
