import { p5 } from 'p5';

import setupEarth from './setupEarth';
import setupPointsOfInterest from './setupPointsOfInterest';

// import addScreenPosition from '@/helpers/addScreenPosition';

const defaultSketch = (height: number, width: number) => ((p: p5) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let easyCam: any;

  const viewDistance = 1500;
  const earthRadius = 600;

  p.setup = () => {
    // init
    p.createCanvas(width, height, p.WEBGL);
    p.pixelDensity(0.25); // 0.25 is 1080p
    p.setAttributes('antialias', true);
    document.oncontextmenu = () => false;

    // camera
    easyCam = p.createEasyCam({ distance: viewDistance });
    easyCam.setDistanceMin(viewDistance);
    easyCam.setDistanceMax(viewDistance);
  };

  // setup objects
  const { drawEarth } = setupEarth(p, earthRadius);
  const { drawPointsOfInterest } = setupPointsOfInterest(p, earthRadius);

  p.draw = () => {
    p.background(0);
    p.noStroke();

    // draw objects
    drawEarth();
    drawPointsOfInterest();
  };
});

export default defaultSketch;
