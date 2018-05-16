export const offset = (el) => {
  let offsetTop = 0;
  let offsetLeft = 0;

  if (!el) return offsetTop;

  while (el) {
    offsetTop += el.offsetTop;
    offsetLeft += el.offsetLeft;
    el = el.offsetParent;
  }

  return {
    offsetTop,
    offsetLeft,
  };
};
