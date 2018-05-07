import React from 'react';
import {TYPE_4, TYPE_2, TYPE_3, TYPE_1} from '../constants';
import Point from './Point';

export default class BI extends React.Component {
  static types = {
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
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 3, y: 0},
    ],
    [TYPE_4]: [
      {x: 0, y: 0},
      {x: 0, y: 1},
      {x: 0, y: 2},
      {x: 0, y: 3},
    ],
  };

  static size = {
    width: 4,
    height: 4,
  };

  renderPoints = (points) => points.map((point, index) => (
    <Point x={point.x} y={point.y} key={index}/>
  ));

  render() {
    const {type, color, className = '', ...props} = this.props;
    const points = BI.types[type];

    if (!points) return null;

    return (
      <div className={'block bi ' + className} data-color={color || ''} {...props}>
        {this.renderPoints(points)}
      </div>
    );
  }
}
