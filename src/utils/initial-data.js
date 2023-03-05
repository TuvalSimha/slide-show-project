import Property from "../models/property-class.js";

let id = 1;
let nextUserId = 1;

const createData = () => {
  let propertiesArr = [
    new Property(
      id++,
      "Trek Domane AL 2",
      900,
      `This is a versatile and comfortable road bike that's great for long rides. It has an aluminum frame, carbon fork, and a Shimano Claris groupset.`,
      "./assets/imgs/1.jpg"
    ),
    new Property(
      id++,
      "Cannondale Synapse Carbon 105",
      2500,
      `The Cannondale Synapse is a popular endurance road bike with a carbon fiber frame, Shimano 105 groupset, and disc brakes. It's great for riders who want a comfortable ride without sacrificing speed.`,
      "./assets/imgs/2.jpg"
    ),
    new Property(
      id++,
      "Giant Defy Advanced Pro 1",
      3500,
      `The Giant Defy is a high-end endurance road bike that's great for long rides and races. It has a carbon fiber frame, Shimano Ultegra groupset, and disc brakes.`,
      "./assets/imgs/3.jpg"
    ),
    new Property(
      id++,
      "Specialized Allez Sprint Comp Disc",
      2000,
      `The Specialized Allez Sprint is a lightweight and agile road bike that's great for racing. It has an aluminum frame, carbon fork, and Shimano 105 groupset.`,
      "./assets/imgs/4.jpg"
    ),
    new Property(
      id++,
      "Pinarello Dogma F12",
      12000,
      `The Pinarello Dogma F12 is a high-end race bike that's used by many professional cyclists. It has a carbon fiber frame, Shimano Dura-Ace groupset, and disc brakes.`,
      "./assets/imgs/5.jpg"
    ),
    new Property(
      id++,
      "BMC Teammachine SLR01 Four",
      8000,
      `The BMC Teammachine is a lightweight and fast road bike that's great for racing. It has a carbon fiber frame, Shimano Dura-Ace groupset, and disc brakes.`,
      "./assets/imgs/6.jpg"
    ),
  ];
  return propertiesArr;
};

const setInitialData = () => {
  let properties = localStorage.getItem("props");
  if (properties) {
    return;
  }
  localStorage.setItem("props", JSON.stringify(createData()));
  localStorage.setItem("nextid", id + "");
  localStorage.setItem("nextUserId", nextUserId + "");
};

setInitialData();
