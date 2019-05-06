import * as p5 from "p5";

export class Ellipse {
  constructor(
    private p: p5,
    public x: number,
    public y: number,
    public sizeX: number,
    public sizeY: number
  ) {}

  draw() {
    this.p.push();
    this.p.ellipse(this.x, this.y, this.sizeX, this.sizeY);
    this.p.pop();
  }
}
