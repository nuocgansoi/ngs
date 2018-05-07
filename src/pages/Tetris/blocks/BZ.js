import React from 'react';
import {TYPE_1, TYPE_2, TYPE_3, TYPE_4} from '../constants';
import Point from './Point';

export default class BZ extends React.Component {
  static types = {
    [TYPE_1]: [
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 0, y: 1},
      {x: 1, y: 1},
    ],
    [TYPE_2]: [
      {x: 0, y: 0},
      {x: 0, y: 1},
      {x: 1, y: 1},
      {x: 1, y: 2},
    ],
    [TYPE_3]: [
      {x: 0, y: 0},
      {x: 0, y: 1},
      {x: 1, y: 1},
      {x: 1, y: 2},
    ],
    [TYPE_4]: [
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 0, y: 1},
      {x: 1, y: 1},
    ],
  };

  static size = {
    width: 3,
    height: 3,
  };

  renderPoints = (points) => points.map((point, index) => (
    <Point x={point.x} y={point.y} key={index}/>
  ));

  render() {
    const {type, color, className = '', ...props} = this.props;
    const points = BZ.types[type];

    if (!points) return null;

    return (
      <div className={'block bz ' + className} data-color={color || ''} {...props}>
        {this.renderPoints(points)}
      </div>
    );
  }
}
