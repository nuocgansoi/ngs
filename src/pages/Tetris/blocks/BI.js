import {TYPE_1, TYPE_2, TYPE_3, TYPE_4} from '../constants';
import Block from './Block';

export default class BI extends Block {
  static get types() {
    return {
      [TYPE_1]: [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 0, y: 2},
        {x: 0, y: 3},
      ],
      [TYPE_2]: [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 3, y: 0},
      ],
      [TYPE_3]: [
        {x: 0, y: 0},
        {x: 0, y: 1},
        {x: 0, y: 2},
        {x: 0, y: 3},
      ],
      [TYPE_4]: [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 3, y: 0},
      ],
    };
  };

  static get size() {
    return {
      width: 4,
      height: 4,
    };
  }
}
