import { p5 } from 'p5';

import setupEarth from './setupEarth';
import setupPointsOfInterest from './setupPointsOfInterest';

// import addScreenPosition from '@/helpers/addScreenPosition';

const defaultSketch = (height: number, width: number) => ((p: p5) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let easyCam: any;

  // 1080p in dev and 4k in build
  const resolution = process.env.NODE_ENV === 'development' ? 0.25 : 1;

  const viewDistance = 1300;
  const earthRadius = 400;
  const cloudOffset = 5; // distance from globe to clouds

  p.setup = () => {
    // init
    p.createCanvas(width, height, p.WEBGL);
    p.setAttributes('antialias', true);
    // set resolution
    p.pixelDensity(resolution);
    // perspective
    p.perspective(p.PI / 3.5,
      width / height,
      viewDistance - (earthRadius + cloudOffset),
      viewDistance);
    // no right click
    document.oncontextmenu = () => false;

    // camera
    easyCam = p.createEasyCam({ distance: viewDistance });
    easyCam.setDistanceMin(viewDistance);
    easyCam.setDistanceMax(viewDistance);
  };

  // setup objects
  const { drawEarth } = setupEarth(p, earthRadius, cloudOffset);
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
