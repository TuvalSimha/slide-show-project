var tabs = document.querySelectorAll(".tabs_wrap ul li");
var bikeList = document.querySelectorAll(".bike-list");
var females = document.querySelectorAll(".female");
var all = document.querySelectorAll(".item_wrap");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    var tabval = tab.getAttribute("data-tabs");

    all.forEach((item) => {
      item.style.display = "none";
    });

    if (tabval == "bike-list") {
      bikeList.forEach((bike) => {
        bike.style.display = "block";
      });
    }
    if (tabval == "female") {
      females.forEach((female) => {
        female.style.display = "block";
      });
    } else {
      all.forEach((item) => {
        item.style.display = "block";
      });
    }
  });
});
