export const hideElement = (element: HTMLElement) => {
  const isHidden = element.classList.contains('hidden');
  if(!isHidden) {
    element.classList.add('hidden');
  }
}

export const toggleVisibility = (element: HTMLElement): boolean => {
  const isVisible = !element.classList.contains('hidden');
  if(isVisible) {
    element.classList.add('hidden');
  } else {
    element.classList.remove('hidden');
  }
  return !isVisible;
}
