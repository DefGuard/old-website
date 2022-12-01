const hamburgerHandler = () => {
  const mobileNavElement = document.getElementById("mobile-nav");
  mobileNavElement?.classList.remove("hidden");
};

const mobileNavCloseHandler = () => {
  const mobileNavElement = document.getElementById("mobile-nav");
  mobileNavElement?.classList.add("hidden");
};

const main = () => {
  const hamburgerElement = document.querySelector("#hamburger > button");
  const mobileNavCloseElement = document.getElementById("mobile-nav-close");
  hamburgerElement?.addEventListener("click", hamburgerHandler);
  mobileNavCloseElement?.addEventListener("click", mobileNavCloseHandler);
};

export default main;
