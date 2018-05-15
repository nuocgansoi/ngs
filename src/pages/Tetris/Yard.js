import React from 'react';
import Point from './blocks/Point';
import {POINT_SIZE} from './constants';
import {getBlockColor} from './functions';

export default class Yard extends React.Component {
  static defaultProps = {
    points: [],
    currentBlock: {},
    nextBlock: {},
    transform: '',
    width: 0,
    height: 0,
  };

  renderPoints = () => {
    const {points} = this.props;

    return points.map((point, index) => {
      return (
        <Point
          key={index}
          data-color={point.color}
          style={{
            bottom: point.y * POINT_SIZE + 'px',
            left: point.x * POINT_SIZE + 'px',
          }}
        />
      );
    });
  };

  renderCurrentBlock = () => {
    const {currentBlock: block} = this.props;
    const {Component} = block;
    const color = getBlockColor(block);

    return (
      <Component
        type={block.type}
        color={color}
        style={{
          bottom: block.y * POINT_SIZE + 'px',
          left: block.x * POINT_SIZE + 'px',
          zIndex: 9,
        }}
      />
    );
  };

  renderNextBlock = () => {
    const {nextBlock: block} = this.props;
    const {Component} = block;
    const color = getBlockColor(block);

    return (
      <Component
        type={block.type}
        color={color}
        style={{
          bottom: block.y * POINT_SIZE + 'px',
          left: block.x * POINT_SIZE + 'px',
        }}
      />
    );
  };

  style = () => {
    const {transform, width: sizeW, height: sizeH} = this.props;
    const width = sizeW * POINT_SIZE + 'px';
    const height = sizeH * POINT_SIZE + 'px';

    return {
      width,
      height,
      transform,
    };
  };

  render() {
    return (
      <div className="yard" style={this.style()}>
        {this.renderPoints()}
        {this.renderCurrentBlock()}
        {this.renderNextBlock()}
      </div>
    );
  }
}
