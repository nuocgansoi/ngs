import React from 'react';
import CanvasTmp from './CanvasTmp';

export default class BallDrop extends CanvasTmp {
  g = 10 * 3846;  // gia tốc rơi tự do, m -> pixel

  time = 0;

  balls = [];

  lockWindowScroll = true;

  state = {
    autoClick: false,
    bounce: true,
    loop: false,
  };

  componentDidMount() {
    super.componentDidMount();

    this.refs.canvas.onclick = this.onClick;
    this.refs.canvas.addEventListener('mousemove', this.onHover, false);
    this.refs.canvas.addEventListener('touchmove', this.touchMove, false);
  }

  onHover = (e) => {
    if (this.state.autoClick) {
      this.onClick();
    }
  };

  touchMove(e) {
    super.touchMove(e);
    if (this.state.autoClick) {
      this.onClick();
    }
  };

  renderButtons() {
    return (
      <React.Fragment>
        {/*Clear*/}
        <div
          onClick={this.clear}
          className="btn btn-sm btn-outline-danger"
        >
          <i className="fa fa-trash mr-1"/>
          <span>Clear</span>
        </div>

        {/*Auto click*/}
        <div
          onClick={this.toggle('autoClick')}
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

        {/*Bounce*/}
        <div
          onClick={this.toggle('bounce')}
          className="btn btn-sm btn-outline-info"
        >
          <i
            className={
              'fa mr-1 ' +
              (this.state.bounce ? 'fa-check-square' : 'fa-square')
            }
          />
          <span>Bounce</span>
        </div>

        {/*Loop*/}
        <div
          onClick={this.toggle('loop')}
          className="btn btn-sm btn-outline-info"
        >
          <i
            className={
              'fa mr-1 ' +
              (this.state.loop ? 'fa-check-square' : 'fa-square')
            }
          />
          <span>Loop</span>
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

  toggle = (stateName) => () => {
    const value = this.state[stateName];

    this.setState({
      [stateName]: !value,
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
    }
  };

  dropping = ball => {
    ball.t += 1;

    if (this.state.loop) {
      if (ball.v === 0) {
        ball.v += 1 / 2 * ball.radius / 25;
      }
    } else {
      //  Trọng lực
      ball.v += 1 / 2 * ball.radius / 25;
    }

    ball.y += ball.v;

    if (this.state.bounce) {
      //  Wrap y
      ball.y = ball.y < ball.radius ? ball.radius : ball.y;
      ball.y = (ball.y > this.props.height - ball.radius) ? this.props.height - ball.radius : ball.y;
    }

    if (!this.state.loop) {
      //  Ma sát
      ball.v *= .995;
    }

    //  Chạm trên | dưới
    if (this.state.bounce) {
      if (
        ball.y <= ball.radius ||
        ball.y >= this.props.height - ball.radius
      ) {
        ball.t = 0;
        ball.v *= -1;
      }
    } else {
      //  Khi bật loop
      if (this.state.loop) {
        if (ball.y >= this.props.height + ball.radius) {
          ball.y = -ball.radius;
          ball.t = 0;
        }
      }
    }

    return ball;
  };

  onClick = () => {
    if (!this.mouse) return;

    const ball = {
      x: this.mouse.x - this.offset.x,
      y: this.mouse.y - this.offset.y,
      radius: Math.round(Math.random() * 20),
      color: this.randomColor(),
      t: 0,
      v: 0,
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
