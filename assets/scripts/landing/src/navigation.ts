import { autoUpdate, computePosition, offset } from "@floating-ui/dom";

const hamburgerHandler = () => {
  const mobileNavElement = document.getElementById("mobile-nav");
  mobileNavElement?.classList.remove("hidden");
};

const mobileNavCloseHandler = () => {
  const mobileNavElement = document.getElementById("mobile-nav");
  mobileNavElement?.classList.add("hidden");
};

const floatingSocials = () => {
  const navElement = document.querySelector('body>nav');
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
    const navHeight = navElement.clientHeight;
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
          middleware: [offset(15)], 
        }).then( ({x,y}) => {
          Object.assign(floatingElement.style, {
            left: `${x - window.scrollX}px`,
            top: `${y - window.scrollY}px`
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
        const targetElement = document.getElementById(targetElementId);
        if(targetElement) {
          const {x, y} = targetElement.getBoundingClientRect();
          const top = y + window.scrollY;
          const left = x + window.scrollX;
          window.scrollTo({left: left, top: top - navHeight});
          floatingElement.classList.remove('open');
        }
      })
    }
  }
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
};

export default main;
