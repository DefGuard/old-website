import { animate } from "motion";
import { ColorsRGB } from "../shared/constants";

const linkButtons = document.querySelectorAll("a.link-button");

linkButtons.forEach((element) => {
  element.addEventListener("mouseover", () => {
    animate(element, {
      backgroundColor: ColorsRGB.White,
    });
    const textChild = element.firstElementChild;
    if (textChild) {
      animate(textChild, {
        color: ColorsRGB.DfgBlue,
      });
    }
  });
  element.addEventListener("mouseout", () => {
    animate(element, {
      backgroundColor: ColorsRGB.DfgBlue,
    });
    const textChild = element.firstElementChild;
    if (textChild) {
      animate(textChild, {
        color: ColorsRGB.White,
      });
    }
  });
});
