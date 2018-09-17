import React from 'react';
import CanvasTmp from './CanvasTmp';

const DURATION = 300;

export default class ProgressBarCircle extends CanvasTmp {
  frameCount = 0;
  percent = 0;
  color = {
    r: 250,
    g: 0,
    b: 0,
    change: {
      color: 'r',
      up: true,
    },
  };

  drawLeft = (ctx) => {
    const {width} = this.props;
    const {color} = this;

    ctx.beginPath();
    ctx.arc(width / 2, width / 2, width / 2, Math.PI / 2, 1.5 * Math.PI);
    ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
    ctx.fill();
  };

  drawRight = (ctx) => {
    const {width} = this.props;
    const {color} = this;

    const startAngle = (this.frameCount % DURATION / DURATION) * 2 * Math.PI;

    ctx.beginPath();
    if (startAngle > Math.PI) {
      ctx.arc(width / 2, width / 2, width / 2, startAngle - Math.PI / 2, startAngle + Math.PI / 2);
      ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
    } else {
      ctx.arc(width / 2, width / 2, width / 2, startAngle + Math.PI / 2, startAngle - Math.PI / 2);
      ctx.fillStyle = 'white';
    }
    ctx.fill();
  };

  drawCenter = (ctx) => {
    const {width} = this.props;

    ctx.beginPath();
    ctx.arc(width / 2, width / 2, width / 2 - 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  };

  drawPercent = (ctx) => {
    const {width} = this.props;
    const {color} = this;

    this.percent = this.calcPercent();

    ctx.font = '30px Arial';
    ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
    ctx.textAlign = 'center';
    ctx.fillText(this.percent + '%', width / 2, width / 2);
  };

  draw() {
    this.frameCount++;

    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawLeft(ctx);
    this.drawRight(ctx);
    this.drawCenter(ctx);
    this.drawPercent(ctx);

    this.changeColor();
    requestAnimationFrame(this.draw);

    return null;
  }

  changeColor = () => {
    let {r, g, b, change} = this.color;
    switch (change.color) {
      case 'r':
        r += change.up ? 1 : -1;
        if (r > 250) {
          r = 250;
          change = {
            color: 'b',
            up: false,
          };
        } else if (r < 0) {
          r = 0;
          change = {
            color: 'b',
            up: true,
          };
        }
        break;
      case 'g':
        g += change.up ? 1 : -1;
        if (g > 250) {
          g = 250;
          change = {
            color: 'r',
            up: false,
          };
        } else if (g < 0) {
          g = 0;
          change = {
            color: 'r',
            up: true,
          };
        }
        break;
      case 'b':
        b += change.up ? 1 : -1;
        if (b > 250) {
          b = 250;
          change = {
            color: 'g',
            up: false,
          };
        } else if (b < 0) {
          b = 0;
          change = {
            color: 'g',
            up: true,
          };
        }
        break;
      default:
        break;
    }

    this.color = {
      r,
      g,
      b,
      change,
    };
  };

  calcPercent = () => {
    return Math.round((this.frameCount % DURATION) / DURATION * 100);
  };
}
