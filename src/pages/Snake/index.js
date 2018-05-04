import React from 'react';
import Console from './Console';
import {
  BASE_SPEED,
  KEY_A,
  KEY_D,
  KEY_R,
  KEY_S,
  KEY_SPACE,
  KEY_W,
  KEYS,
  MAX_SPEED,
  POINT_H,
  POINT_W,
  REDIRECT_LIST,
  REM,
  STATUS_LIVE,
  STATUS_OVER,
  STATUS_PAUSE,
  STATUS_WIN,
} from './constants';
import Guide from './Guide';

export default class extends React.Component {
  static defaultProps = {
    width: 30,
    height: 20,
    speed: BASE_SPEED,
  };

  constructor(props) {
    super(props);

    this.yard = {
      width: props.width,
      height: props.height,
    };
    this.maxPoint = props.width * props.height;
    this.speed = props.speed;

    const pieces = [
      {x: 4, y: 0},
      {x: 3, y: 0},
      {x: 2, y: 0},
      {x: 1, y: 0},
      {x: 0, y: 0},
    ];
    this.state = {
      yardStyle: {
        width: this.yard.width * POINT_W + 'rem',
        height: this.yard.height * POINT_H + 'rem',
      },
      direction: {x: 1, y: 0},
      pieces,
      status: STATUS_PAUSE,
      food: this.randomFood(pieces),
    };
    this.initialState = {...this.state};
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);

    const wrapper = this.refs.yardWrapper;
    const wrapperWidth = wrapper.offsetWidth;
    const realYardW = this.yard.width * POINT_W * REM;

    if (realYardW > wrapperWidth) {
      const scale = wrapperWidth / realYardW;
      wrapper.style.height = wrapper.offsetHeight * scale + 'px';
      const translate = -((1 - scale) / 2 / scale) * 100;
      this.setState({
        yardStyle: {
          ...this.state.yardStyle,
          transform: `scale(${scale}) translate(${translate}%, ${translate}%)`,
        },
      }, () => {
        this.initialState = {...this.state};
      });
    }
  }

  snake = {
    pauseOrResume: () => {
      if (this.state.status === STATUS_LIVE) { //  Pause
        clearTimeout(this.timeout);
        this.timeout = null;
        this.setState({status: STATUS_PAUSE});
      } else {  //  Resume
        this.timeout = setTimeout(this.run, this.speed);
        this.setState({status: STATUS_LIVE});
      }
    },
    restart: () => {
      this.setState({...this.initialState});
      this.speed = this.props.speed;
    },
    up: () => {
      this.redirect(KEY_W);
    },
    down: () => {
      this.redirect(KEY_S);
    },
    left: () => {
      this.redirect(KEY_A);
    },
    right: () => {
      this.redirect(KEY_D);
    },
  };

  randomFood = (pieces) => {
    const x = Math.floor(Math.random() * (this.yard.width));
    const y = Math.floor(Math.random() * (this.yard.height));

    if (pieces.length === this.maxPoint) {
      alert('WIN!!!');
      this.setState({status: STATUS_WIN});
      return null;
    }

    let item;
    for (let i in pieces) {
      item = pieces[i];
      if (item.x === x && item.y === y) {
        return this.randomFood(pieces);
      }
    }

    return {x, y};
  };

  onKeyDown = (e) => {
    const {status} = this.state;
    if (status === STATUS_WIN || status === STATUS_OVER) return;

    const {keyCode} = e;
    //console.log(keyCode);

    if (KEYS.includes(keyCode)) e.preventDefault();

    if (REDIRECT_LIST.includes(keyCode)) {
      this.redirect(keyCode);
      return null;
    }

    switch (keyCode) {
      case KEY_SPACE:
        this.snake.pauseOrResume();
        return;
      case KEY_R:
        this.snake.restart();
        return;
      default:
        return;
    }
  };

  redirect = (keyCode) => {
    if (!this.timeout) return;

    const {direction} = this.state;

    let list = [
      {key: KEY_W, direction: {x: 0, y: -1}},
      {key: KEY_S, direction: {x: 0, y: 1}},
      {key: KEY_A, direction: {x: -1, y: 0}},
      {key: KEY_D, direction: {x: 1, y: 0}},
    ];

    list = list.filter(item => {
      return direction.x ? item.direction.x !== -direction.x : item.direction.y !== -direction.y;
    });

    const selected = list.find(item => item.key === keyCode);
    if (!selected) return null;

    clearTimeout(this.timeout);
    this.setState({direction: selected.direction}, this.run);
  };

  upSpeed = () => {
    if (this.speed > MAX_SPEED) {
      this.speed = Math.round(.75 * this.speed);
      this.speed = this.speed > MAX_SPEED ? this.speed : MAX_SPEED;
    }
  };

  run = () => {
    let {status, direction, pieces, food} = this.state;
    if (status !== STATUS_LIVE) {
      return null;
    }

    let head = pieces[0];

    head = {
      x: head.x + direction.x,
      y: head.y + direction.y,
    };

    if (head.x >= this.yard.width) {
      head.x = head.x - this.yard.width;
    } else if (head.x < 0) {
      head.x = this.yard.width - 1;
    }

    if (head.y >= this.yard.height) {
      head.y = head.y - this.yard.height;
    } else if (head.y < 0) {
      head.y = this.yard.height - 1;
    }

    //  Check eat the food
    const eatFood = head.x === food.x && head.y === food.y;
    if (eatFood) {
      if ((pieces.length + 1) % 5 === 0) {
        this.upSpeed();
      }
    } else {
      pieces = pieces.slice(0, -1);
    }

    this.checkDie(pieces, head);

    //  If you still live continue
    pieces = [
      head,
      ...pieces,
    ];

    if (eatFood) {
      food = this.randomFood(pieces);
    }

    this.setState({pieces, food}, () => {
      this.timeout = setTimeout(this.run, this.speed);
    });
  };

  checkDie = (pieces, head) => {
    pieces.forEach(item => {
      if (item.x === head.x && item.y === head.y) {
        alert('GAME OVER!!!');

        return this.setState({status: STATUS_OVER});
      }
    });
  };

  renderPiece = (item, index) => {
    const {length} = this.state.pieces;
    const isHead = index === 0;

    const className = 'piece' + (isHead ? ' head' : '');
    const transform = `scale(${1 - index / length / 4})`;
    const opacity = `${1 - index / length / 1.5}`;

    return (
      <div
        key={index}
        className={className}
        style={{
          opacity,
          transform,
          top: item.y * POINT_H + 'rem',
          left: item.x * POINT_W + 'rem',
        }}>
        {
          isHead && (
            <React.Fragment>
              <div className="leftHorn" style={{
                animationDuration: this.speed + 'ms',
              }}/>
              <div className="rightHorn" style={{
                animationDuration: this.speed + 'ms',
              }}/>
            </React.Fragment>
          )
        }
      </div>
    );
  };

  renderFood = () => {
    const {food} = this.state;

    return food && (
      <div className="food" style={{
        top: food.y * POINT_H + 'rem',
        left: food.x * POINT_W + 'rem',
      }}/>
    );
  };

  render() {
    const {pieces, yardStyle, status} = this.state;

    return (
      <div id="snake" className="container">
        <div className="d-flex justify-content-between mb-3">
          <div>speed: {Math.round(10 * 1000 / this.speed) / 10}</div>
          <div>point: {pieces.length}</div>
        </div>

        <div ref="yardWrapper">
          <div id="yard" style={yardStyle} ref="yard">
            <div className="snake">
              {pieces.map(this.renderPiece)}
            </div>

            {this.renderFood()}
          </div>
        </div>

        <Guide className="guide d-none d-md-block py-3"/>
        <Console snake={this.snake} status={status}/>
      </div>
    );
  }
}
