import P5 from 'p5';

const defaultSketch = (height: number, width: number) => ((p: P5) => {
  p.setup = () => {
    p.createCanvas(width, height);
  };
  p.draw = () => {
    p.background(220);
    p.ellipse(50, 50, 80, 80);
  };
});

export default defaultSketch;
