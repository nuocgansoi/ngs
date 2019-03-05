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

export const randomColor = () => {
  return {
    r: Math.round(Math.random() * 255),
    g: Math.round(Math.random() * 255),
    b: Math.round(Math.random() * 255),
    a: Math.random(),
  };
};
