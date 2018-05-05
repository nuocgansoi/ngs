import React from 'react';
import {TYPE_BOTTOM, TYPE_LEFT, TYPE_RIGHT, TYPE_TOP} from '../constants';
import Point from './Point';

const types = {
  [TYPE_TOP]: [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 1},
  ],
  [TYPE_LEFT]: [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 1},
  ],
  [TYPE_RIGHT]: [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 1},
  ],
  [TYPE_BOTTOM]: [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: 1, y: 1},
  ],
};

export default class extends React.Component {
  renderPoints = (points) => points.map((point, index) => (
    <Point x={point.x} y={point.y} key={index}/>
  ));

  render() {
    const {type, color, className = '', ...props} = this.props;
    const points = types[type];

    if (!points) return null;

    return (
      <div className={'block bo ' + className} data-color={color || ''} {...props}>
        {this.renderPoints(points)}
      </div>
    );
  }
}
