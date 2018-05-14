import React from 'react';
import {TYPE_1, TYPE_2, TYPE_3, TYPE_4} from '../constants';
import Point from './Point';

export default class Block extends React.Component {
  static defaultProps = {
    color: '',
    type: '',
  };

  static get types() {
    return {
      [TYPE_1]: [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: 1, y: 1},
      ],
      [TYPE_2]: [
        {x: 1, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 1, y: 2},
      ],
      [TYPE_3]: [
        {x: 1, y: 0},
        {x: 2, y: 1},
        {x: 1, y: 1},
        {x: 1, y: 2},
      ],
      [TYPE_4]: [
        {x: 1, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
      ],
    };
  };

  static get size() {
    return {
      width: 4,
      height: 4,
    };
  }

  static getPoints(type) {
    return this.types[type] || [];
  };

  static getCurrentWidth(type) {
    const points = this.getPoints(type);

    let maxXPosition = 0;
    points.map(point => {
      if (point.x > maxXPosition) maxXPosition = point.x;

      return null;
    });

    return maxXPosition + 1;
  };

  renderPoints = (points) => points.map((point, index) => {
    return <Point x={point.x} y={point.y} key={index} data-color={this.props.color || ''}/>;
  });

  render() {
    const {type, className = '', ...props} = this.props;
    const points = this.constructor.getPoints(type);

    if (!points) return null;

    return (
      <div className={`block ${this.constructor.name.toLowerCase()} ` + className} {...props}>
        {this.renderPoints(points)}
      </div>
    );
  }
}
