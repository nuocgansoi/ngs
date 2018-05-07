import React from 'react';
import {Controller} from '../../components/Console';
import {BI, BJ, BL, BO, BS, BT, BZ} from './blocks';
import {
  COLOR_1,
  COLOR_2,
  COLOR_3,
  COLOR_4,
  COLOR_5,
  COLOR_6,
  COLOR_7,
  KEY_P,
  KEY_R,
  KEY_SPACE,
  KEYS,
  POINT_SIZE,
  REDIRECT_LIST,
  STATUS_OVER,
  STATUS_PAUSE,
  STATUS_RUN,
  TYPE_1,
  TYPE_2,
} from './constants';

const blockList = [BT, BI, BS, BZ, BL, BJ, BO];

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 20,
      height: 20,
      yardTransform: '',
      status: STATUS_RUN,
      blocks: [
        {Component: BL, type: TYPE_1, x: 0, y: 0},
        {Component: BS, type: TYPE_2, x: 1, y: 0},
      ],
      currentBlock: {Component: BT, type: TYPE_1, x: 6, y: 10},
    };

    this.duration = 100;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
    this.resizeYard();
    this.run();
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
      console.log('up');
    },
    left: () => {
      const {currentBlock} = this.state;
      const x = currentBlock.x - 1;
      if (x < 0) {
        return null;
      }

      this.clearTimeout();

      this.setState({});
      console.log('left');
    },
    right: () => {
      console.log('right');

    },
    down: () => {
      console.log('down');

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
    //console.log(keyCode);

    if (KEYS.includes(keyCode)) e.preventDefault();

    if (REDIRECT_LIST.includes(keyCode)) {
      //this.redirect(keyCode);
      return null;
    }

    switch (keyCode) {
      case KEY_SPACE:
        this.controls.pauseOrResume();
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
    let {currentBlock, blocks} = this.state;
    const wantBlock = {...currentBlock, y: currentBlock.y - 1};
    const state = {};
    const stop = this.shouldStop(wantBlock, blocks);

    if (!stop) {  //  Run normal
      state.currentBlock = wantBlock;
    } else {  //  Add current block to static list, make new block
      //  Check DIE
      let gameOver = false;
      const currentRelativePoints = this.getRelativePoints(wantBlock);
      currentRelativePoints.every(point => {
        if (point.y > this.state.height - 1) {
          gameOver = true;
          return false;
        }

        return true;
      });

      if (gameOver) {
        console.log('game over');
        this.controls.restart();

        return false;
      }

      state.blocks = [
        ...blocks,
        currentBlock,
      ];
      state.currentBlock = this.newBlock();
    }

    this.setState(state, this.setTimeout);

    return true;
  };

  shouldStop = (currentBlock, blocks) => {
    //  Check accident with border of screen
    if (currentBlock.y < 0 || currentBlock.x < 0 || currentBlock.x > this.state.width - 1) return true;

    //  Check accident with other blocks
    let stop = false;
    const currentRelativePointsString = JSON.stringify(this.getRelativePoints(currentBlock));
    blocks.every(block => {
      const absolutePoints = block.Component.types[block.type];
      absolutePoints.every(point => {
        const relativePointString = JSON.stringify({
          x: block.x + point.x,
          y: block.y + point.y,
        });

        if (currentRelativePointsString.includes(relativePointString)) {
          stop = true;
          return false;
        }

        return true;
      });

      return !stop;
    });

    return stop;
  };

  getRelativePoints = (block) => {
    const relativePoints = [];
    const absolutePoints = block.Component.types[block.type];
    absolutePoints.forEach(point => {
      relativePoints.push({
        x: block.x + point.x,
        y: block.y + point.y,
      });
    });

    return relativePoints;
  };

  newBlock = () => {
    const Component = blockList[Math.floor(Math.random() * blockList.length)]

    return {
      Component,
      type: TYPE_1,
      x: Math.floor(Math.random() * (this.state.width - Component.size.width)),
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

  renderBlocks = () => {
    const {blocks} = this.state;

    return blocks.map((block, index) => {
      const {Component} = block;
      const color = this.getBlockColor(block);

      return (
        <Component
          type={block.type}
          color={color}
          key={index}
          style={{
            bottom: block.y * POINT_SIZE + 'px',
            left: block.x * POINT_SIZE + 'px',
          }}
        />
      );
    });
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
        }}
      />
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
        {this.renderBlocks()}
        {this.renderCurrentBlock()}
      </div>
    );
  };

  render() {
    return (
      <div id="tetris" className="container">
        <h3>Tetris</h3>

        <div ref="yardWrapper">
          {this.renderYard()}
        </div>

        <div className="console">
          <Controller controls={this.controls}/>
        </div>
      </div>
    );
  }
}
