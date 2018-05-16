import React from 'react';
import {Controller} from '../../components/Console';
import {
  KEY_A,
  KEY_D,
  KEY_P,
  KEY_R,
  KEY_S,
  KEY_SPACE,
  KEY_W,
  KEYS,
  POINT_SIZE,
  STATUS_OVER,
  STATUS_PAUSE,
  STATUS_RUN,
  TYPE_1,
  TYPE_4,
} from './constants';
import {getRelativePoints, getScoreString, randomBlock} from './functions';
import Yard from './Yard';

const MIN_DURATION = 100;

export default class extends React.Component {
  constructor(props) {
    super(props);

    const points = [];

    this.state = {
      width: 13,
      height: 20,
      yardTransform: '',
      status: STATUS_RUN,
      score: 0,
      points,
    };
    this.state.currentBlock = this.newBlock();
    this.state.nextBlock = this.newBlock();

    this.duration = this.getDuration(this.state.score);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
    this.resizeYard();
    this.run();
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  resizeYard = () => {
    const wrapper = this.refs.yardWrapper;
    const wrapperWidth = wrapper.offsetWidth;
    const realYardW = this.state.width * POINT_SIZE;

    if (realYardW > wrapperWidth) {
      const scale = wrapperWidth / realYardW;
      wrapper.style.height = wrapper.offsetHeight * scale + 'px';
      const translate = -((1 - scale) / 2 / scale) * 100;
      this.setState({
        yardTransform: `scale(${scale}) translate(${translate}%, ${translate}%)`,
      });
    }
  };

  controls = {
    canMove: () => {
      const {status} = this.state;
      return status === STATUS_RUN;
    },
    up: () => {
      if (!this.controls.canMove()) return null;

      const {currentBlock, points} = this.state;
      let type = currentBlock.type + 1;
      type = type > TYPE_4 ? TYPE_1 : type;

      const wantBlock = {...currentBlock, type};
      const relativePoints = getRelativePoints(wantBlock);

      let toLeft = 0;
      let toRight = 0;
      relativePoints.forEach(point => {
        if (point.x > this.state.width - 1) {
          toLeft += 1;
        } else if (point.x < 0) {
          toRight += 1;
        }
      });
      wantBlock.x += -toLeft + toRight;

      if (this.shouldStop(wantBlock, points)) return null;

      this.setState({currentBlock: wantBlock});
    },
    left: () => {
      if (!this.controls.canMove()) return null;

      const {currentBlock, points} = this.state;
      const wantBlock = {...currentBlock, x: currentBlock.x - 1};
      if (this.shouldStop(wantBlock, points)) return null;

      this.setState({currentBlock: wantBlock});
    },
    right: () => {
      if (!this.controls.canMove()) return null;

      const {currentBlock, points} = this.state;
      const wantBlock = {...currentBlock, x: currentBlock.x + 1};
      if (this.shouldStop(wantBlock, points)) return null;

      this.setState({currentBlock: wantBlock});
    },
    down: () => {
      if (!this.controls.canMove()) return null;

      const {currentBlock, points} = this.state;
      const wantBlock = {...currentBlock, y: currentBlock.y - 1};
      if (this.shouldStop(wantBlock, points)) return null;

      this.setState({currentBlock: wantBlock});
    },
    fastDown: () => {
      if (!this.controls.canMove()) return null;

      const {currentBlock, points} = this.state;
      let y = currentBlock.y;
      while (!this.shouldStop({...currentBlock, y}, points)) {
        y--;
      }
      y++;

      this.setState({currentBlock: {...currentBlock, y}});
    },
    pauseOrResume: () => {
      if (this.state.status === STATUS_PAUSE) {
        this.setState({status: STATUS_RUN}, this.setTimeout);
      } else if (this.state.status === STATUS_RUN) {
        this.setState({status: STATUS_PAUSE}, this.clearTimeout);
      }
    },
    restart: () => {
      window.location.reload();
      console.log('restart');
    },
  };

  setTimeout = () => {
    this.timeout = setTimeout(this.run, this.duration);
  };

  clearTimeout = () => {
    clearTimeout(this.timeout);
  };

  onKeyDown = (e) => {
    const {status} = this.state;
    if (status === STATUS_OVER) return;

    const {keyCode} = e;

    if (KEYS.includes(keyCode)) e.preventDefault();

    if (status === STATUS_PAUSE && keyCode !== KEY_P) return;

    switch (keyCode) {
      case KEY_W:
        return this.controls.up();
      case KEY_A:
        return this.controls.left();
      case KEY_S:
        return this.controls.down();
      case KEY_D:
        return this.controls.right();
      case KEY_SPACE:
        this.controls.fastDown();
        return;
      case KEY_P:
        this.controls.pauseOrResume();
        return;
      case KEY_R:
        this.controls.restart();
        return;
      default:
        return;
    }
  };

  run = () => {
    let {currentBlock, nextBlock, points, score, height} = this.state;
    const wantBlock = {...currentBlock, y: currentBlock.y - 1};
    const state = {};
    const stop = this.shouldStop(wantBlock, points);

    if (!stop) {  //  Run normal
      state.currentBlock = wantBlock;
    } else {  //  Add current block to static list, make new block
      //  Check DIE
      let gameOver = false;
      const currentRelativePoints = getRelativePoints(wantBlock);
      currentRelativePoints.every(point => {
        if (point.y > height - 1) {
          gameOver = true;
        }

        return !gameOver;
      });

      if (gameOver) {
        alert('Game Over');
        this.controls.restart();

        return false;
      }

      //  Add current to points, generate new block
      const checkAddScore = this.checkAddScore([
        ...points,
        ...getRelativePoints(currentBlock),
      ]);
      state.points = checkAddScore.points;
      state.currentBlock = {...nextBlock, y: nextBlock.y - 1};
      state.nextBlock = this.newBlock();

      //  When eat the rows, grow up score, update duration
      if (checkAddScore.count) {
        state.score = score + checkAddScore.count * 2 - 1;

        this.duration = this.getDuration(state.score);
      }
    }

    this.setState(state, this.setTimeout);

    return true;
  };

  getDuration = (score) => {
    if (!score) return 500;

    if (this.duration <= MIN_DURATION) return MIN_DURATION;

    let duration = 500 - Math.floor(score / 10) * 50;

    return duration > MIN_DURATION ? duration : MIN_DURATION;
  };

  checkAddScore = (points) => {
    //  Remove row when eat
    const rows = {};
    points.forEach(point => {
      rows[point.y] = rows[point.y] || [];
      rows[point.y] = [...rows[point.y], point];
    });

    let count = 0;

    //  From top to bottom to keep row
    Object.keys(rows).reverse().map(rowIndex => {
      if (rows[rowIndex].length === this.state.width) {
        count++;

        //  Remove point if it in removed row
        const rowString = JSON.stringify(rows[rowIndex]);
        points = points.filter(point => !rowString.includes(JSON.stringify(point)));

        // Pull down if point is above of removed row
        points = points.map(point => {
          if (point.y > rowIndex) {
            point.y -= 1;
          }

          return point;
        });
      }

      return null;
    });

    return {points, count};
  };

  shouldStop = (wantBlock, points) => {
    //  Check accident with border of screen
    if (
      wantBlock.y < 0
      || wantBlock.x < 0
      || wantBlock.x + wantBlock.Component.getCurrentWidth(wantBlock.type) > this.state.width
    ) return true;

    //  Check accident with other points
    let stop = false;
    const currentRelativePoints = getRelativePoints(wantBlock);
    points.every(point => {
      currentRelativePoints.every(cRPoint => {
        if (point.x === cRPoint.x && point.y === cRPoint.y) {
          stop = true;
        }

        return !stop;
      });

      return !stop;
    });

    return stop;
  };

  newBlock = () => {
    const block = randomBlock();

    return {
      ...block,
      x: Math.floor(Math.random() * (this.state.width - block.Component.size.width)),
      y: this.state.height,
    };
  };

  renderHeader = () => {
    const {score} = this.state;

    return (
      <div className="d-flex justify-content-between">
        <div className="speed">
          Speed: {1000 - this.duration}
        </div>

        <div className="score">
          Score: {getScoreString(score)}
        </div>
      </div>
    );
  };

  render() {
    const {points, currentBlock, nextBlock, yardTransform, width, height, status} = this.state;
    const pauseOrResume = status === STATUS_PAUSE ? 'Resume' : 'Pause';

    return (
      <div id="tetris" className="container">
        <h3>Tetris</h3>

        <div className="yardWrapper" ref="yardWrapper">
          {this.renderHeader()}
          <Yard
            points={points}
            currentBlock={currentBlock}
            nextBlock={nextBlock}
            transform={yardTransform}
            width={width}
            height={height}
          />
        </div>

        <div className="console">
          <div className="top d-flex justify-content-end">
            <div className="button3" onClick={this.controls.pauseOrResume}>
              {pauseOrResume}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <Controller controls={this.controls}/>

            <div className="right">
              <div className="button2" onClick={this.controls.fastDown}>
                <i className="fab fa-accessible-icon fa-2x"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
