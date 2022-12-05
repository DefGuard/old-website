import { animate } from "motion";
import { ColorsRGB } from "../shared/constants";

const githubButtons = document.querySelectorAll("button.github");

githubButtons.forEach((element) => {
  element.addEventListener("mouseover", () => {
    animate(element, {
      backgroundColor: ColorsRGB.White,
    });
    const spanChild = element.firstElementChild;
    const iconPath = element.lastElementChild.firstElementChild;
    if (spanChild) {
      animate(spanChild, {
        color: ColorsRGB.DfgBlue,
      });
    }
    if (iconPath) {
      animate(iconPath, {
        fill: ColorsRGB.Black,
      });
    }
  });
  element.addEventListener("mouseout", () => {
    animate(element, {
      backgroundColor: ColorsRGB.DfgBlue,
    });
    const spanChild = element.firstElementChild;
    const iconPath = element.lastElementChild.firstElementChild;
    if (spanChild) {
      animate(spanChild, {
        color: ColorsRGB.White,
      });
    }
    if (iconPath) {
      animate(iconPath, {
        fill: ColorsRGB.White,
      });
    }
  });
});
