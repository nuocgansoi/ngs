import React from 'react';
import {offset} from '../../helper';

export default class TheEye extends React.Component {
  static defaultProps = {
    width: 200,
    height: 100,
  };

  eye = null;
  eyeCenter = {x: 0, y: 0};
  mouse = null;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove, false);

    this.eye = this.refs.eye;
    const eyeOffset = offset(this.eye);
    this.eyeOffset = {
      x: eyeOffset.offsetLeft,
      y: eyeOffset.offsetTop,
    };
    this.eyeCenter = {
      x: eyeOffset.offsetLeft + this.props.width / 2,
      y: eyeOffset.offsetTop + this.props.height / 2,
    };

    requestAnimationFrame(this.drawPupil);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove, false);
  }

  onMouseMove = (e) => {
    this.mouse = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  // TODO:: draw Eye Pupil
  drawPupil = () => {
    const {width, height} = this.props;
    const ctx = this.eye.getContext('2d');
    ctx.clearRect(0, 0, this.eye.width, this.eye.height);

    let xO = width / 2;
    let yO = height / 2;

    //  Vẽ Pupil
    const pupilRadius = height * .6;
    const pupilStartAngle = 0;
    const pupilEndAngle = 2 * Math.PI;

    // Default
    if (!this.mouse) {
      ctx.beginPath();
      ctx.arc(xO, yO, pupilRadius, pupilStartAngle, pupilEndAngle);
      ctx.fillStyle = 'green';
      ctx.fill();
      ctx.stroke();

      requestAnimationFrame(this.drawPupil);

      return null;
    }

    // On mouse move
    const xM = this.mouse.x - this.eyeOffset.x;
    const yM = this.mouse.y - this.eyeOffset.y;

    let moveY = 0;
    let moveX = 0;
    const rangeY = yM - yO;
    const rangeX = xM - xO;
    const onBottom = yM > height;
    const onTop = yM < 0;
    const onLeft = xM < 0;
    const onRight = xM > width;

    if (!onTop && !onBottom && !onLeft && !onRight) { //  Inside Eye
      moveX = rangeX;
      moveY = rangeY;
    } else {  //  Outside Eye
      moveX = (onRight ? 1 : -1) * width / 2;
      moveY = (onBottom ? 1 : -1) * height / 2;


      //----------------------------------------------------------------------------------------------------------------
      // Phương trình đường chéo
      // (d1): y = h/w * x <=> x = w/h * y;
      // (d2): y = - h/w * x + h <=> x = (h - y) * w/h;
      //----------------------------------------------------------------------------------------------------------------

      const xMd1 = (width / height) * yM;
      const xMd2 = (height - yM) * width / height;
      const yMd1 = (height / width) * xM;
      const yMd2 = -(height / width) * xM + height;

      // Chuột ở dưới hoặc trên
      if (
        (yM > height && xM < xMd1 && xM > xMd2)
        || (yM < 0 && xM > xMd1 && xM < xMd2)
      ) {
        moveX = (Math.abs(rangeX) * height / 2) / Math.abs(rangeY);
        if (rangeX < 0) {
          moveX = -moveX;
        }
      }

      // Chuột ở trái hoặc phải
      if (
        (xM < 0 && yM > yMd1 && yM < yMd2)
        || (xM > width && yM < yMd1 && yM > yMd2)
      ) {
        moveY = (Math.abs(rangeY) * width / 2) / Math.abs(rangeX);
        if (rangeY < 0) {
          moveY = -moveY;
        }
      }
    }

    ctx.beginPath();
    ctx.arc(xO + moveX, yO + moveY, pupilRadius, pupilStartAngle, pupilEndAngle);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.stroke();

    requestAnimationFrame(this.drawPupil);

    return null;
  };

  render() {
    const {width, height} = this.props;

    return (
      <div className="theEye d-flex justify-content-center">
        <canvas
          id="eye"
          ref="eye"
          width={`${width}px`}
          height={`${height}px`}
          style={{
            display: 'block',
            border: '1px solid #333',
          }}
        />
      </div>
    );
  }
};
