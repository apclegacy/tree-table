import P5 from 'p5';

// this is a function which is called with height and width and returns
// another function with the parameter p as P5 (callback).
// This is the Sketch Function which is called by the new P5 instance.
// Use everything processing related with p.
const defaultSketch = (height: number, width: number) => ((p: P5) => {
  p.setup = () => {
    p.createCanvas(width, height);
    p.pixelDensity(0.25);
  };
  p.draw = () => {
    p.background(20);
    p.ellipse(0, 50, 80, 80);
  };
});

export default defaultSketch;
