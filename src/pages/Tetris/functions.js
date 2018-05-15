import {BI, BJ, BL, BO, BS, BT, BZ} from './blocks';
import {BLOCK_LIST, COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5, COLOR_6, COLOR_7, TYPE_1} from './constants';

export const getBlockColor = (block) => {
  switch (block.Component) {
    case BI:
      return COLOR_1;
    case BJ:
      return COLOR_2;
    case BL:
      return COLOR_3;
    case BO:
      return COLOR_4;
    case BS:
      return COLOR_5;
    case BT:
      return COLOR_6;
    case BZ:
    default:
      return COLOR_7;
  }
};

export const randomBlock = () => {
  return {
    Component: BLOCK_LIST[Math.floor(Math.random() * BLOCK_LIST.length)],
    type: TYPE_1,
  };
};

export const getRelativePoints = (block) => {
  const relativePoints = [];
  const absolutePoints = block.Component.types[block.type];
  absolutePoints.forEach(point => {
    relativePoints.push({
      x: block.x + point.x,
      y: block.y + point.y,
      color: getBlockColor(block),
    });
  });

  return relativePoints;
};

export const getScoreString = (score) => {
  if (score > 1000) return score;

  score = '' + score;
  const missing = 4 - score.length;
  for (let i = 0; i < missing; i++) {
    score = '0' + score;
  }

  return score;
};
