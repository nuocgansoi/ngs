import React from 'react';
import CanvasTmp from './CanvasTmp';

export default class BallDrop extends CanvasTmp {
  g = 10 * 3846;  // gia tốc rơi tự do, m -> pixel

  time = 0;

  balls = [];

  state = {
    autoClick: false,
  };

  componentDidMount() {
    super.componentDidMount();

    this.refs.canvas.onclick = this.onClick;
    this.refs.canvas.addEventListener('mousemove', this.onHover, false);
  }

  onHover = (e) => {
    if (this.state.autoClick) {
      this.onClick();
    }
  };

  renderButtons() {
    return (
      <React.Fragment>
        <div
          onClick={this.clear}
          className="btn btn-sm btn-outline-danger mr-2"
        >
          <i className="fa fa-trash mr-1"/>
          <span>Clear</span>
        </div>
        <div
          onClick={this.toggleAutoClick}
          className="btn btn-sm btn-outline-info"
        >
          <i
            className={
              'fa mr-1 ' +
              (this.state.autoClick ? 'fa-check-square' : 'fa-square')
            }
          />
          <span>Auto Click</span>
        </div>
      </React.Fragment>
    );
  }

  draw() {
    this.time++;
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.balls.length) {
      this.balls.forEach(this.drawBall(ctx));
    } else {
      ctx.fillStyle = this.randomColor();
      ctx.font = '30px Comic Sans MS';
      ctx.textAlign = 'center';
      ctx.fillText('Click somewhere', this.props.width / 2, this.props.height / 2);
    }

    requestAnimationFrame(this.draw);
    return null;
  }

  clear = () => {
    this.balls = [];
  };

  toggleAutoClick = () => {
    this.setState({
      autoClick: !this.state.autoClick,
    });
  };

  drawBall = ctx => (ball, index) => {
    ball = this.dropping(ball, index);
    if (ball.y > this.props.height + ball.radius) {
      this.balls.splice(index, 1);
    } else {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ball.t++;
    }
  };

  dropping = ball => {
    const time = ball.t / 500;
    ball.x = ball.x0;
    ball.y = ball.y0 +
      ball.v0 * time +
      1 / 2 * this.g * Math.pow(time, 2);

    //  Chạm đất
    if (ball.y >= this.props.height - ball.radius) {
      ball.y0 = ball.y;
      ball.t = 0;
      ball.v0 = -(ball.v0 + this.g * time);

      if (ball.v0 < -400) {
        ball.v0 += 400;
      } else {
        ball.v0 = 0;
      }
    }

    return ball;
  };

  onClick = () => {
    if (!this.mouse) return;

    const ball = {
      x0: this.mouse.x - this.offset.x,
      y0: this.mouse.y - this.offset.y,
      radius: Math.round(Math.random() * 20),
      v0: 0,
      t: 0,
      color: this.randomColor(),
    };

    this.balls.push(ball);
  };

  randomColor = () => {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    const a = Math.random();
    return `rgba(${r},${g},${b},${a})`;
  };
}
