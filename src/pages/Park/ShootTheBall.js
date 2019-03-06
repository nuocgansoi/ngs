import React from 'react';
import {randomColor} from '../../helper';
import CanvasTmp from './CanvasTmp';

export default class ShootTheBall extends CanvasTmp {
  name = 'ShootTheBall';

  lockWindowScroll = true;

  balls = [];

  state = {
    clearCanvas: true,
    gravitation: true,
    friction: true,
  };

  draw() {
    if (this.state.clearCanvas) {
      this.clearCanvas();
    }

    const ctx = this.canvas.getContext('2d');

    if (this.mouse && this.mouseDown && this.state.clearCanvas) {
      ctx.beginPath();
      ctx.moveTo(this.mouseDown.x - this.offset.x, this.mouseDown.y - this.offset.y);
      ctx.lineTo(this.mouse.x - this.offset.x, this.mouse.y - this.offset.y);
      ctx.stroke();
    }

    if (!this.balls.length) {
      ctx.fillStyle = 'Black';
      ctx.font = '20px Comic Sans MS';
      ctx.textAlign = 'center';
      ctx.fillText('Click, move & release to shoot the ball', this.props.width / 2, this.props.height / 2);
    }

    this.balls.forEach(ball => {
      ctx.beginPath();
      ctx.fillStyle = ball.color;
      ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
      ctx.fill();

      this.moveTheBall(ball);
    });

    requestAnimationFrame(this.draw);
    return null;
  }


  //------------------------------------------------------------------------------
  //  Mouse handles
  //------------------------------------------------------------------------------

  onMouseUp(e) {
    super.onMouseUp(e);

    this.makeBall();

    this.mouseDown = null;
    this.mouseUp = null;
  };


  //------------------------------------------------------------------------------
  //  Touch handle
  //------------------------------------------------------------------------------

  touchEnd(e) {
    super.touchEnd(e);

    this.makeBall();

    this.mouse = null;
    this.mouseDown = null;
    this.mouseUp = null;
  };


  //------------------------------------------------------------------------------
  //  Ball functions
  //------------------------------------------------------------------------------

  makeBall = () => {
    if (!this.mouseUp || !this.mouseDown) return;

    if (this.mouseDown.x !== this.mouseUp.x) {
      const color = randomColor();
      const ball = {
        x: this.mouseUp.x - this.offset.x,
        y: this.mouseUp.y - this.offset.y,
        radius: 5 + Math.round(20 * Math.random()),
        color: `rgba(${color.r},${color.g},${color.b},${color.a})`,
        jump: {
          x: (this.mouseDown.x - this.mouseUp.x) / 20,
          y: (this.mouseDown.y - this.mouseUp.y) / 20,
        },
        time: 0,
      };

      this.balls.push(ball);
    }
  };

  moveTheBall = ball => {
    ball.time += 1;

    //  Thêm trọng lực
    if (this.state.gravitation) {
      ball.jump.y += 1 / 2 * ball.radius / 25;
    }

    ball.x += ball.jump.x;
    ball.y += ball.jump.y;

    //  Wrap x
    ball.x = ball.x < ball.radius ? ball.radius : ball.x;
    ball.x = ball.x > this.props.width - ball.radius ? this.props.width - ball.radius : ball.x;
    //  Wrap y
    ball.y = ball.y < ball.radius ? ball.radius : ball.y;
    ball.y = ball.y > this.props.height - ball.radius ? this.props.height - ball.radius : ball.y;

    if (this.state.friction) {
      ball.jump.x *= .995;
      ball.jump.y *= .995;
    }

    //  Chuyển hướng khi chạm trái || phải
    if (
      ball.x <= ball.radius ||
      ball.x >= this.props.width - ball.radius
    ) {
      ball.jump.x *= -1;
    }

    //  Chuyển hướng khi chạm trần || sàn
    if (
      ball.y <= ball.radius ||
      ball.y >= this.props.height - ball.radius
    ) {
      ball.jump.y *= -1;
      // ball.jump.y = -jumpY;
      ball.time = 0;
    }

    return ball;
  };

  clear = () => {
    this.balls = [];
    this.clearCanvas();
  };

  toggleGravitation = () => {
    this.setState({gravitation: !this.state.gravitation});
  };

  toggleFriction = () => {
    this.setState({friction: !this.state.friction});
  };

  toggleClearCanvas = () => {
    this.setState({clearCanvas: !this.state.clearCanvas});
  };


  //------------------------------------------------------------------------------
  //  Renders
  //------------------------------------------------------------------------------

  renderButtons() {
    const {clearCanvas, gravitation, friction} = this.state;

    return (
      <React.Fragment>
        {/*Clear button*/}
        <div
          onClick={this.clear}
          className="btn btn-sm btn-outline-danger"
        >
          <i className="fa fa-trash mr-2"/>
          <span>Clear</span>
        </div>

        {/*Toggle gravitation button*/}
        <div
          onClick={this.toggleGravitation}
          className="btn btn-sm btn-outline-info"
        >
          <i
            className={
              'fa mr-2 ' +
              (gravitation ? ' fa-check-square' : 'fa-square')
            }
          />
          <span>Trọng lực</span>
        </div>

        {/*Toggle friction button*/}
        <div
          onClick={this.toggleFriction}
          className="btn btn-sm btn-outline-info"
        >
          <i
            className={
              'fa mr-2 ' +
              (friction ? ' fa-check-square' : 'fa-square')
            }
          />
          <span>Ma sát</span>
        </div>

        {/*Clear canvas*/}
        <div
          onClick={this.toggleClearCanvas}
          className="btn btn-sm btn-outline-info"
        >
          <i
            className={
              'fa mr-2 ' +
              (clearCanvas ? ' fa-check-square' : 'fa-square')
            }
          />
          <span>Clear Canvas</span>
        </div>
      </React.Fragment>
    );
  }
}
