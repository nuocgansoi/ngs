import React from 'react';
import CanvasTmp from './CanvasTmp.js';

export default class TheMovingBall extends CanvasTmp {
  name = 'theMovingBall';
  destination = null;
  ball = {
    x: this.props.width / 2,
    y: this.props.height / 2,
    radius: this.props.height / 20,
  };

  componentDidMount() {
    super.componentDidMount();

    this.canvas.addEventListener('click', this.onClick, false);

    this.randomMove();
  }

  componentWillUnmount() {
    this.clearRandomMove();
  }

  onClick = (e) => {
    this.clearRandomMove();
    this.destination = {
      x: e.offsetX,
      y: e.offsetY,
    };
    this.randomMove();
  };

  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //  Default frame
    if (!this.destination) {
      ctx.beginPath();
      ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'green';
      ctx.fill();

      requestAnimationFrame(this.draw);

      return null;
    }

    const oldBall = {...this.ball};
    this.ball.x += (this.destination.x - this.ball.x) * .1;
    this.ball.y += (this.destination.y - this.ball.y) * .1;

    ctx.beginPath();
    ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(oldBall.x - (this.ball.x - oldBall.x) * 5, oldBall.y - (this.ball.y - oldBall.y) * 5);
    ctx.lineTo(this.ball.x, this.ball.y);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.stroke();

    requestAnimationFrame(this.draw);

    return null;
  }

  randomMove = () => {
    this.randomMoveTimeout = setTimeout(() => {
      this.destination = {
        x: Math.random() * this.props.width,
        y: Math.random() * this.props.height,
      };

      this.randomMove();
    }, 1000);
  };

  clearRandomMove = () => {
    clearTimeout(this.randomMoveTimeout);
  };
}
