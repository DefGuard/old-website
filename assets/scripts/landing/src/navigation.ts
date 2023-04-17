import { autoUpdate, computePosition, hide, offset } from "@floating-ui/dom";
import { hideElement, toggleVisibility } from "./utils/visibility";

const navElement = document.querySelector('body>nav') as HTMLElement;
const mobileNavElement = document.getElementById('mobile-nav') as HTMLElement;

const hamburgerHandler = () => {
  const mobileNavElement = document.getElementById("mobile-nav");
  mobileNavElement?.classList.remove("hidden");
  document.body.classList.add('lock-scroll');
};

const mobileNavCloseHandler = () => {
  const mobileNavElement = document.getElementById("mobile-nav");
  mobileNavElement?.classList.add("hidden");
  document.body.classList.remove('lock-scroll');
};

const scrollToFeature = (featuredId: string) => {
  const targetElement = document.getElementById(featuredId);
  const navHeight = navElement.clientHeight;
  if(targetElement) {
    const {x, y} = targetElement.getBoundingClientRect();
    const top = y + window.scrollY;
    const left = x + window.scrollX;
    window.scrollTo({left: left, top: top - navHeight});
  }
}

const floatingSocials = () => {
  
  const featuresNavElement = document.getElementById("features-desktop");
  const floatingElement = document.getElementById("floating-features");

  const handleClickOutside = (ev: MouseEvent) => {
      if(floatingElement.classList.contains('open')) {
        const contains = floatingElement.contains(ev.target);
        if(!contains) {
          floatingElement.classList.remove('open');
        }
      }
  }

  if(featuresNavElement && floatingElement && navElement) {
    let cleanup = null;
    featuresNavElement.addEventListener('click', () => {
      const isOpen = floatingElement.classList.contains('open');
      if(isOpen) {
        document.removeEventListener('mousedown', handleClickOutside);
        if(cleanup) {
          cleanup();
        }
      } else {
        floatingElement.classList.add('open');
        cleanup = autoUpdate(featuresNavElement, floatingElement, () => {
        computePosition(featuresNavElement, floatingElement, {
          placement: 'bottom-start',
          middleware: [offset(15), hide()], 
        }).then( ({x,y, middlewareData}) => {
          const {referenceHidden} = middlewareData.hide;
          Object.assign(floatingElement.style, {
            left: `${x - window.scrollX}px`,
            top: `${y - window.scrollY}px`,
            visibility: referenceHidden ? 'hidden' : 'visible',
          });
        })
        });
        document.addEventListener('mousedown', handleClickOutside);
      }
    });
    // Make elements clickable
    const listElements = [].slice.call(floatingElement.children) as HTMLElement[];
    for(const link of listElements) {
      link.addEventListener('click', function (this) {
        const targetElementId = this.getAttribute('data-value');
        scrollToFeature(targetElementId);
        floatingElement.classList.remove('open');
      })
    }
  }
}

const featuresMobileNav = () => {
  const featuresExpandControlElement = document.getElementById('features-expand-control');
  const featuresExpandElement = document.getElementById('features-expand');
  if(featuresExpandControlElement && featuresExpandElement) {
    featuresExpandControlElement.addEventListener('click', () => {
      const isVisible = toggleVisibility(featuresExpandElement);
      if(isVisible) {
        featuresExpandControlElement.classList.add('active')
      } else {
        featuresExpandControlElement.classList.remove('active');
      }
    })
  }
  const featureElements = document.querySelectorAll('#features-expand > .feature');
  featureElements.forEach((featureElement) => {
    featureElement.addEventListener('click', () => {
      const featureId = featureElement.getAttribute('data-value') as string;
      scrollToFeature(featureId);
      mobileNavCloseHandler();
      hideElement(featuresExpandElement);
      featuresExpandControlElement.classList.remove('active');
    });
  });
}

const logoClickHandler = () => {
  window.scrollTo({
    left: 0,
    top: 0
  });
}

const main = () => {
  const hamburgerElement = document.querySelector("#hamburger > button");
  const mobileNavCloseElement = document.getElementById("mobile-nav-close");
  const navLogoElement = document.getElementById("nav-logo");
  navLogoElement?.addEventListener("click", logoClickHandler);
  hamburgerElement?.addEventListener("click", hamburgerHandler);
  mobileNavCloseElement?.addEventListener("click", mobileNavCloseHandler);
  floatingSocials();
  featuresMobileNav();
};

export default main;
