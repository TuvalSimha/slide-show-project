import PAGES from "../pages/page-routes.js";

const PAGE_LINKS = {
  [PAGES.HOME]: document.getElementById(PAGES.HOME),
  [PAGES.ABOUT]: document.getElementById(PAGES.ABOUT),
  [PAGES.LOGIN]: document.getElementById(PAGES.LOGIN),
  [PAGES.REGISTER]: document.getElementById(PAGES.REGISTER),
  [PAGES.BIKES]: document.getElementById(PAGES.BIKES),
  [PAGES.PROFILE]: document.getElementById(PAGES.PROFILE),
  [PAGES.PAGE404]: document.getElementById(PAGES.PAGE404),
};

function hideAllPages() {
  Object.values(PAGE_LINKS).forEach((link) => {
    link.classList.remove("d-block");
    link.classList.add("d-none");
  });
}

function showPage(page) {
  PAGE_LINKS[page].classList.remove("d-none");
  PAGE_LINKS[page].classList.add("d-block");
}

function handlePageChange(pageToDisplay) {
  hideAllPages();
  showPage(pageToDisplay);
}

export { handlePageChange };
