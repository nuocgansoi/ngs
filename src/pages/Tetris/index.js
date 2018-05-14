import React from 'react';
import {Controller} from '../../components/Console';
import {BI, BJ, BL, BO, BS, BT, BZ} from './blocks';
import Point from './blocks/Point';
import {
  COLOR_1,
  COLOR_2,
  COLOR_3,
  COLOR_4,
  COLOR_5,
  COLOR_6,
  COLOR_7,
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

const BLOCK_LIST = [BT, BI, BS, BZ, BL, BJ, BO];

const MIN_DURATION = 100;

export default class extends React.Component {
  constructor(props) {
    super(props);

    const points = [];

    //  TODO:: remove after test
    for (let i = 0; i < 10 - 1; i++) {
      points.push({x: i, y: 0, color: 'green'});
      points.push({x: i, y: 1, color: 'red'});
    }
    points.push({x: 2, y: 2, color: 'red'});
    points.push({x: 3, y: 2, color: 'red'});
    points.push({x: 3, y: 3, color: 'red'});

    this.state = {
      width: 10,
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
    up: () => {
      const {currentBlock, points} = this.state;
      let type = currentBlock.type + 1;
      type = type > TYPE_4 ? TYPE_1 : type;

      const wantBlock = {...currentBlock, type};
      const relativePoints = this.getRelativePoints(wantBlock);

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
      const {currentBlock, points} = this.state;
      const wantBlock = {...currentBlock, x: currentBlock.x - 1};
      if (this.shouldStop(wantBlock, points)) return null;

      this.setState({currentBlock: wantBlock});
    },
    right: () => {
      const {currentBlock, points} = this.state;
      const wantBlock = {...currentBlock, x: currentBlock.x + 1};
      if (this.shouldStop(wantBlock, points)) return null;

      this.setState({currentBlock: wantBlock});
    },
    down: () => {
      const {currentBlock, points} = this.state;
      const wantBlock = {...currentBlock, y: currentBlock.y - 1};
      if (this.shouldStop(wantBlock, points)) return null;

      this.setState({currentBlock: wantBlock});
    },
    fastDown: () => {
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
    let {currentBlock, nextBlock, points, score} = this.state;
    const wantBlock = {...currentBlock, y: currentBlock.y - 1};
    const state = {};
    const stop = this.shouldStop(wantBlock, points);

    if (!stop) {  //  Run normal
      state.currentBlock = wantBlock;
    } else {  //  Add current block to static list, make new block
      //  Check DIE
      let gameOver = false;
      const currentRelativePoints = this.getRelativePoints(wantBlock);
      currentRelativePoints.every(point => {
        if (point.y > this.state.height - 1) {
          gameOver = true;
        }

        return !gameOver;
      });

      if (gameOver) {
        console.log('game over');
        this.controls.restart();

        return false;
      }

      //  Add current to points, generate new block
      const checkAddScore = this.checkAddScore([
        ...points,
        ...this.getRelativePoints(currentBlock),
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
    const currentRelativePoints = this.getRelativePoints(wantBlock);
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

  //  Get position of points in block with Yard
  getRelativePoints = (block) => {
    const relativePoints = [];
    const absolutePoints = block.Component.types[block.type];
    absolutePoints.forEach(point => {
      relativePoints.push({
        x: block.x + point.x,
        y: block.y + point.y,
        color: this.getBlockColor(block),
      });
    });

    return relativePoints;
  };

  randomBlock = () => {
    return {
      Component: BLOCK_LIST[Math.floor(Math.random() * BLOCK_LIST.length)],
      type: TYPE_1,
    };
  };

  newBlock = () => {
    const block = this.randomBlock();

    return {
      ...block,
      x: Math.floor(Math.random() * (this.state.width - block.Component.size.width)),
      y: this.state.height,
    };
  };


  //--------------------------------------------------------------------------------------------------------------------
  //  Render Blocks |
  //-----------------

  getBlockColor = (block) => {
    switch (block.Component) {
      case BI:
        return COLOR_1;
      case BJ:
        return COLOR_2;
      case BL:
        return COLOR_3;
      case BO:
        return COLOR_4;
      case BS:
        return COLOR_5;
      case BT:
        return COLOR_6;
      case BZ:
      default:
        return COLOR_7;
    }
  };

  renderPoints = () => {
    const {points} = this.state;

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

  renderNextBlock = () => {
    const {nextBlock: block} = this.state;
    const {Component} = block;
    const color = this.getBlockColor(block);

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

  renderCurrentBlock = () => {
    const {currentBlock: block} = this.state;
    const {Component} = block;
    const color = this.getBlockColor(block);

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


  //--------------------------------------------------------------------------------------------------------------------
  //  Render Header |
  //-----------------

  getScoreString = (score) => {
    if (score > 1000) return score;

    score = '' + score;
    const missing = 4 - score.length;
    for (let i = 0; i < missing; i++) {
      score = '0' + score;
    }

    return score;
  };

  renderHeader = () => {
    const {score} = this.state;

    return (
      <div className="d-flex justify-content-between">
        <div className="speed">
          Speed: {1000 - this.duration}
        </div>

        <div className="score">
          Score: {this.getScoreString(score)}
        </div>
      </div>
    );
  };

  renderYard = () => {
    const {yardTransform: transform} = this.state;
    const width = this.state.width * POINT_SIZE + 'px';
    const height = this.state.height * POINT_SIZE + 'px';

    return (
      <div className="yard" style={{
        width,
        height,
        transform,
      }}>
        {this.renderPoints()}
        {this.renderCurrentBlock()}
        {this.renderNextBlock()}
      </div>
    );
  };

  render() {
    return (
      <div id="tetris" className="container">
        <h3>Tetris</h3>

        <div className="yardWrapper" ref="yardWrapper">
          {this.renderHeader()}
          {this.renderYard()}
        </div>

        <div className="console">
          <Controller controls={this.controls}/>
        </div>
      </div>
    );
  }
}
