import {TYPE_1, TYPE_2, TYPE_3, TYPE_4} from '../constants';
import Block from './Block';

export default class BL extends Block {
  static get types() {
    return {
      [TYPE_1]: [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 1},
        {x: 0, y: 2},
      ],
      [TYPE_2]: [
        {x: 2, y: 0},
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 1},
      ],
      [TYPE_3]: [
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 0, y: 2},
        {x: 1, y: 2},
      ],
      [TYPE_4]: [
        {x: 0, y: 0},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 0, y: 1},
      ],
    };
  };

  static get size() {
    return {
      width: 3,
      height: 3,
    };
  }
}
