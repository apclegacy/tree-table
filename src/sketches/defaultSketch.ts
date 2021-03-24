import { p5 } from 'p5';

import addScreenPosition from '@/helpers/addScreenPosition';

// this is a function which is called with height and width and returns
// another function with the parameter p as P5 (callback).
// This is the Sketch Function which is called by the new P5 instance.
// Use everything processing related with p.
const defaultSketch = (height: number, width: number) => ((p: p5) => {
  p.setup = () => {
    p.createCanvas(width, height, p.WEBGL);
    document.oncontextmenu = () => false;
    p.createEasyCam();
    addScreenPosition(p);
  };
  p.draw = () => {
    p.background(220);
    p.lights();
    p.box(200);
  };
});

export default defaultSketch;
