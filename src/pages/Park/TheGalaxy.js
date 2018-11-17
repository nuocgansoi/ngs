import CanvasTmp from './CanvasTmp.js';

export default class TheGalaxy extends CanvasTmp {
  name = 'theGalaxy';
  randomPoints = [];
  frameCount = 0;

  static defaultProps = {
    ...CanvasTmp.defaultProps,
    number: 50,
  };

  componentDidMount() {
    super.componentDidMount();

    this.refs.canvas.addEventListener('mousemove', this.onHover, false);
    this.refs.canvas.addEventListener('mouseout', () => {
      this.mouseHover = null;
    }, false);
  }

  onHover = (e) => {
    const viewPortOffset = this.refs.canvas.getBoundingClientRect();
    this.mouseHover = {
      x: e.clientX - viewPortOffset.left,
      y: e.clientY - viewPortOffset.top,
    };
  };

  draw() {
    if (++this.frameCount % 1 !== 0) {
      requestAnimationFrame(this.draw);

      return null;
    }

    // if (!this.mouse) {
    //   requestAnimationFrame(this.draw);
    //
    //   return null;
    // }

    const {width, height, number} = this.props;
    const maxDist = height / 5;

    if (!this.randomPoints.length) {
      for (let i = 0; i < number; i++) {
        this.randomPoints.push({
          x: Math.round(Math.random() * width),
          y: Math.round(Math.random() * height),
          a: {  // Hướng di chuyển
            x: .25 + Math.round(Math.random() * 10) / 10,
            y: .25 + Math.round(Math.random() * 10) / 10,
          },
        });
      }
    }

    //  Setup, clear old frame
    const ctx = this.canvas.getContext('2d');
    this.canvas.style.backgroundColor = '#000';
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //  Draw
    let p, i, dist;
    const lastIndex = this.randomPoints.length - 1;
    this.randomPoints.forEach((point, index) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
      ctx.lineWidth = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fill();

      //  Line to another points
      for (i = index + 1; i <= lastIndex; i++) {
        p = this.randomPoints[i];
        //  Dist between point and another
        dist = Math.sqrt(Math.pow(p.x - point.x, 2) + Math.pow(p.y - point.y, 2));
        if (dist <= maxDist) {
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineWidth = (maxDist - dist) / maxDist * 3;
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${dist / maxDist})`;
          ctx.stroke();
        }
      }

      //  Chuyển hướng nếu va tường
      const wantX = point.x + point.a.x;
      if (wantX > width || wantX < 0) {
        point.a.x = -point.a.x;
      }

      const wantY = point.y + point.a.y;
      if (wantY > height || wantY < 0) {
        point.a.y = -point.a.y;
      }

      const nextPoint = {
        ...point,
        x: point.x + point.a.x,
        y: point.y + point.a.y,
      };
      if (this.mouseHover) {
        //  Khoảng cách đến vị trí con trỏ chuột
        const mouseDist = Math.sqrt(
          Math.pow(this.mouseHover.x - point.x, 2)
          + Math.pow(this.mouseHover.y - point.y, 2),
        );

        //  Trong phạm vi
        if (mouseDist <= maxDist) {
          //  Tăng tốc
          nextPoint.x += nextPoint.a.x;
          nextPoint.y += nextPoint.a.y;

          const nextMouseDist = Math.sqrt(
            Math.pow(this.mouseHover.x - nextPoint.x, 2)
            + Math.pow(this.mouseHover.y - nextPoint.y, 2),
          );

          //  Giữ lại nếu tới biên
          if (nextMouseDist > mouseDist && nextMouseDist >= maxDist) {
            nextPoint.x = point.x;
            nextPoint.y = point.y;
          }
        }
      }

      this.randomPoints[index] = {
        ...nextPoint,
      };
    });

    requestAnimationFrame(this.draw);

    return null;
  }
}
