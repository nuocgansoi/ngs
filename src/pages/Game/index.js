import React from 'react';
import Guide from './Guide';

const UNIT_W = 1;
const UNIT_H = 1;
const REM = 16;

const KEY_W = 87;
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;
const REDIRECT_LIST = [KEY_W, KEY_S, KEY_A, KEY_D];

const KEY_SPACE = 32;

const STATUS_LIVE = 1;
const STATUS_OVER = 2;
const STATUS_WIN = 3;

const BASE_SPEED = 500;
const MAX_SPEED = 100;

class Game extends React.Component {
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

    this.state = {
      yardStyle: {
        width: this.yard.width * UNIT_W + 'rem',
        height: this.yard.height * UNIT_H + 'rem',
      },
      direction: {x: 1, y: 0},
      pieces: [
        {x: 4, y: 0},
        {x: 3, y: 0},
        {x: 2, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 0},
      ],
      status: STATUS_LIVE,
      food: null,
    };

  }

  componentDidMount() {
    this.randomFood(this.state.pieces);
    document.addEventListener('keydown', this.onKeyDown, false);


    const wrapperWidth = this.refs.yardWrapper.offsetWidth;
    const realYardW = this.yard.width * UNIT_W * REM;

    if (realYardW > wrapperWidth) {
      const scale = wrapperWidth / realYardW;
      const translate = -((1 - scale) / 2 / scale) * 100;
      this.setState({
        yardStyle: {
          ...this.state.yardStyle,
          transform: `scale(${scale}) translate(${translate}%, ${translate}%)`,
        },
      });
    }
  }

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

    return this.setState({food: {x, y}});
  };

  onKeyDown = (e) => {
    const {keyCode} = e;
    //console.log(keyCode);

    if (REDIRECT_LIST.includes(keyCode)) {
      this.redirect(keyCode);
    }

    if (keyCode === KEY_SPACE) {
      this.togglePause();
    }
  };

  togglePause = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    } else {
      this.timeout = setTimeout(this.run, this.speed);
    }
  };

  redirect = (keyCode) => {
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
      pieces.pop();
    }

    this.checkDie(pieces, head);

    //  If you still live continue
    pieces = [
      head,
      ...pieces,
    ];

    if (eatFood) {
      this.randomFood(pieces);
    }

    this.setState({pieces}, () => {
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
          top: item.y * UNIT_H + 'rem',
          left: item.x * UNIT_W + 'rem',
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
        top: food.y * UNIT_H + 'rem',
        left: food.x * UNIT_W + 'rem',
      }}/>
    );
  };

  render() {
    const {pieces, yardStyle} = this.state;

    return (
      <div id="game" className="container">
        <div className="d-flex mb-3">
          <div className="col-2">
            <table>
              <tbody>
              <tr>
                <td>point:</td>
                <td>{pieces.length}</td>
              </tr>
              <tr>
                <td>speed:</td>
                <td>{Math.round(10 * 1000 / this.speed) / 10}</td>
              </tr>
              </tbody>
            </table>
          </div>

          <Guide className="guide col"/>
        </div>

        <div ref="yardWrapper">
          <div id="yard" style={yardStyle} ref="yard">
            <div className="snake">
              {pieces.map(this.renderPiece)}
            </div>

            {this.renderFood()}
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
