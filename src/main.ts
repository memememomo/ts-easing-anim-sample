import * as p5 from "p5";
import { Ellipse } from "./ellipse";
import { easeInOutElastic, Tween } from "./easing";

const sketch = (p: p5) => {
  let ellipsePos: Ellipse;
  let ellipseSize: Ellipse;
  let posEasing: Tween;
  let sizeEasing: Tween;

  p.preload = () => {
    ellipsePos = new Ellipse(p, 100, 100, 100, 100);
    ellipseSize = new Ellipse(p, 300, 300, 100, 100);

    posEasing = new Tween(ellipsePos);
    posEasing.to({ x: 600, y: 600 }, 2000);
    posEasing.easing(easeInOutElastic);

    sizeEasing = new Tween(ellipseSize);
    sizeEasing.to({ sizeX: 300, sizeY: 300 }, 2000);
    sizeEasing.easing(easeInOutElastic);
  };

  p.setup = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.mouseClicked = () => {
    posEasing.start();
    sizeEasing.start();
  };

  p.draw = () => {
    p.background(100);

    posEasing.update();
    sizeEasing.update();

    ellipsePos.draw();
    ellipseSize.draw();
  };
};

const sketchP = new p5(sketch);
