import React from 'react';
import {offset} from '../../helper.js';

export default class CanvasTmp extends React.Component {
  static defaultProps = {
    width: 300,
    height: 150,
  };

  name = 'theCanvas';

  mouse = null;

  mouseDown = null;

  mouseUp = null;

  lockWindowScroll = false;

  canvas = null;

  offset = {
    x: 0,
    y: 0,
  };

  constructor(props) {
    super(props);

    this.draw = this.draw.bind(this);

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.touchMove = this.touchMove.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
  }

  componentDidMount() {
    this.canvas = this.refs.canvas;

    //  Mobile touch event listeners
    this.canvas.addEventListener('touchmove', this.touchMove, false);
    this.canvas.addEventListener('touchstart', this.touchStart, false);
    this.canvas.addEventListener('touchend', this.touchEnd, false);

    //  Mouse event listeners
    // use "document" to allow mouse move out of canvas
    document.addEventListener('mousemove', this.onMouseMove, false);
    document.addEventListener('mouseup', this.onMouseUp, false);
    this.canvas.addEventListener('mousedown', this.onMouseDown, false);

    const canvasOffset = offset(this.canvas);
    this.offset.x = canvasOffset.offsetLeft;
    this.offset.y = canvasOffset.offsetTop;

    requestAnimationFrame(this.draw);
  }


  //------------------------------------------------------------------------------
  //  Mouse
  //------------------------------------------------------------------------------

  onMouseMove(e) {
    this.mouse = {
      x: e.clientX + window.pageXOffset,
      y: e.clientY + window.pageYOffset,
    };
  };

  onMouseDown(e) {
    this.mouseDown = {
      x: e.clientX + window.pageXOffset,
      y: e.clientY + window.pageYOffset,
    };
  };

  onMouseUp(e) {
    this.mouseUp = {
      x: e.clientX + window.pageXOffset,
      y: e.clientY + window.pageYOffset,
    };
  };


  //------------------------------------------------------------------------------
  //  Mobile touches
  //------------------------------------------------------------------------------

  touchMove(e) {
    //  Lock window scroll
    if (this.lockWindowScroll) {
      e.preventDefault();
    }

    const touches = e.changedTouches;
    const touch = touches[0];
    this.mouse = {
      x: touch.clientX + window.pageXOffset,
      y: touch.clientY + window.pageYOffset,
    };
  };

  touchStart(e) {
    const touches = e.changedTouches;
    const touch = touches[0];
    this.mouseDown = {
      x: touch.clientX + window.pageXOffset,
      y: touch.clientY + window.pageYOffset,
    };
  };

  touchEnd(e) {
    const touches = e.changedTouches;
    const touch = touches[0];
    this.mouseUp = {
      x: touch.clientX + window.pageXOffset,
      y: touch.clientY + window.pageYOffset,
    };
  };


  //------------------------------------------------------------------------------
  //  Draw canvas
  //------------------------------------------------------------------------------

  draw() {
  }

  clearCanvas = () => {
    this.canvas
    .getContext('2d')
    .clearRect(0, 0, this.canvas.width, this.canvas.height);
  };


  //------------------------------------------------------------------------------
  //  Renders
  //------------------------------------------------------------------------------

  renderButtons() { return null; }

  render() {
    const {width, height} = this.props;

    return (
      <div>
        <div className="d-flex flex-wrap justify-content-center mb-2">
          {this.renderButtons()}
        </div>
        <div className={this.name}>
          <canvas
            ref="canvas"
            width={width}
            height={height}
            style={{
              display: 'block',
              border: '1px solid #333',
              margin: '0 auto',
            }}
          />
        </div>
      </div>
    );
  }
}
