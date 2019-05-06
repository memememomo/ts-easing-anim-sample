// https://gist.github.com/gre/1650294
// https://infosmith.biz/blog/it/p5js-easing

export const easeIn = p => t => Math.pow(t, p);
export const easeOut = p => t => 1 - Math.abs(Math.pow(t - 1, p));
export const easeInOut = p => t =>
  t < 0.5 ? easeIn(p)(t * 2) / 2 : easeOut(p)(t * 2 - 1) / 2 + 0.5;

export const linear = easeInOut(1);
export const easeInQuad = easeIn(2);
export const easeOutQuad = easeOut(2);
export const easeInOutQuad = easeInOut(2);
export const easeInCubic = easeIn(3);
export const easeOutCubic = easeOut(3);
export const easeInOutCubic = easeInOut(3);
export const easeInQuart = easeIn(4);
export const easeOutQuart = easeOut(4);
export const easeInOutQuart = easeInOut(4);
export const easeInQuint = easeIn(5);
export const easeOutQuint = easeOut(5);
export const easeInOutQuint = easeInOut(5);
export const easeInElastic = t => (0.04 - 0.04 / t) * Math.sin(25 * t) + 1;
export const easeOutElastic = t => ((0.04 * t) / --t) * Math.sin(25 * t);
export const easeInOutElastic = t =>
  (t -= 0.5) < 0
    ? (0.02 + 0.01 / t) * Math.sin(50 * t)
    : (0.02 - 0.01 / t) * Math.sin(50 * t) + 1;

type Point = {
  x?: number;
  y?: number;
  sizeX?: number;
  sizeY?: number;
};

type Easing = (t: number) => number;

const lerp = (t0: number, t1: number, rate: number) => {
  return t0 + (t1 - t0) * rate;
};

export class Tween {
  startPoint: Point;
  destPoint: Point;
  duration: number;
  easingFunc: Easing;
  startTime: number;
  isMove: boolean;
  delayTime: number;

  constructor(private point: Point) {
    this.startPoint = {
      x: point.x,
      y: point.y,
      sizeX: point.sizeX,
      sizeY: point.sizeY
    };
    this.easingFunc = linear;
    this.isMove = false;
    this.delayTime = 0;
  }

  to(to: Point, duration: number) {
    this.destPoint = to;
    this.duration = duration;
  }

  easing(e: Easing) {
    this.easingFunc = e;
  }

  delay(d: number) {
    this.delayTime = d;
  }

  start() {
    this.startTime = Date.now();
    this.isMove = true;
  }

  update() {
    if (!this.isMove) {
      return;
    }

    const diffTime = Date.now() - this.startTime - this.delayTime;

    if (diffTime < 0) {
      return;
    }

    const rate = this.easingFunc(diffTime / this.duration);

    if (this.destPoint.x != null) {
      this.point.x = lerp(this.startPoint.x, this.destPoint.x, rate);
    }

    if (this.destPoint.y != null) {
      this.point.y = lerp(this.startPoint.y, this.destPoint.y, rate);
    }

    if (this.destPoint.sizeX != null) {
      this.point.sizeX = lerp(
        this.startPoint.sizeX,
        this.destPoint.sizeX,
        rate
      );
    }

    if (this.destPoint.sizeY != null) {
      this.point.sizeY = lerp(
        this.startPoint.sizeY,
        this.destPoint.sizeY,
        rate
      );
    }

    if (diffTime >= this.duration) {
      this.isMove = false;
    }
  }
}
