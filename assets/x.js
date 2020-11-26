let menu = document.querySelector(".menu");
let repoTabLink = document.getElementsByClassName("repo-tab-link-mobile");
let repoTab = document.querySelector(".repo-tab-mobile");
let repoTabMobile = document.querySelector(".repo-tab-mobile_");
let icon = document.querySelector(".UnderlineNav-octicon");
let mobileMenu = document.querySelector(".mobile-menu");

menu.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
