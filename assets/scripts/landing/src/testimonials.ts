import Glide from '@glidejs/glide';
const main = () => {
  new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 2,
    gap: 24,
    breakpoints: {
      1105: {
        perView: 1
      }
    }
  }).mount();
}

export default main;
