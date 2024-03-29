const setSocialPosition = () => {
  const socialsElement = document.getElementById("floating-socials");
  const headerElement = document.querySelector("#source>.content>.header");
  if (!socialsElement || !headerElement) {
    return;
  }
  const { right } = headerElement.getBoundingClientRect();
  socialsElement.style.left = `${right + 187}px`;
};

const main = () => {
  setSocialPosition();
  window.onresize = setSocialPosition;
};

export default main;
