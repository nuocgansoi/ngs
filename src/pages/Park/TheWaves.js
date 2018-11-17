import CanvasTmp from './CanvasTmp.js';

const MARGIN_X = 20;
const MARGIN_Y = 20;
export default class TheWaves extends CanvasTmp {
  name = 'theWaves';
  waves = [];
  frameCount = 0;

  constructor(props) {
    super(props);


    let {width, height} = this.props;
    this.rowCount = Math.ceil(height / 10);
    this.columnCount = Math.ceil(width / 10);
  }

  componentDidMount() {
    super.componentDidMount();

    this.canvas.addEventListener('click', this.randomDirection);

    let i;  // row key
    let j;  // column key
    for (i = 0; i < this.rowCount; i++) {
      for (j = 0; j < this.columnCount; j++) {
        const x = i * MARGIN_X;
        const y = j * MARGIN_Y;
        this.waves.push({
          start: {x, y},
          end: this.getEndPoint({x, y}),
        });
      }
    }
  }

  directionRightToLeft = (start) => this.frameCount / 50 + Math.PI * start.x / this.props.width;

  directionLeftToRight = (start) => -this.frameCount / 50 + Math.PI * start.x / this.props.width;

  directionBottomToTop = (start) => this.frameCount / 50 + Math.PI * start.y / this.props.height;

  directionTopToBottom = (start) => -this.frameCount / 50 + Math.PI * start.y / this.props.height;

  direction = this.directionRightToLeft;

  directions = [
    this.directionLeftToRight,
    this.directionRightToLeft,
    this.directionBottomToTop,
    this.directionTopToBottom,
  ];

  randomDirection = () => {
    let random = this.directions[Math.round(Math.random() * (this.directions.length - 1))];
    if (this.direction === random) {
      return this.direction = this.randomDirection();
    }

    return this.direction = random;
  };

  getEndPoint = (start) => {
    return {
      x: start.x + MARGIN_X / 10 + Math.abs(Math.sin(this.direction(start))) * MARGIN_X / 1.5,
      y: start.y + MARGIN_Y / 10 + Math.abs(Math.sin(this.direction(start))) * MARGIN_Y / 1.5,
    };
  };

  draw() {
    this.frameCount++;
    // if (this.frameCount % 50 !== 0) {
    //   requestAnimationFrame(this.draw);
    //
    //   return null;
    // }

    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.waves.forEach((wave, index) => {
      ctx.beginPath();
      ctx.moveTo(wave.start.x, wave.start.y);
      ctx.lineTo(wave.end.x, wave.end.y);
      ctx.stroke();
      this.waves[index] = {
        ...wave,
        end: this.getEndPoint(wave.start),
      };
    });

    requestAnimationFrame(this.draw);

    return null;
  }
}
