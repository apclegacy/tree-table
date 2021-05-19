/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import {
  p5, Image,
} from 'p5';

import imageTexture from '@/assets/sketches/earth-texture-night.jpg';

import pointOfInterests from './pointOfInterests';

// import addScreenPosition from '@/helpers/addScreenPosition';

const defaultSketch = (height: number, width: number) => ((p: p5) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let easyCam: any;

  // earth
  const earthRadius = 600;
  let earthTexture: Image;

  // point of interests
  const { drawPointOfInterests } = pointOfInterests(p, earthRadius);

  p.preload = () => {
    earthTexture = p.loadImage(imageTexture);
  };

  p.setup = () => {
    // init
    p.createCanvas(width, height, p.WEBGL);
    p.pixelDensity(0.25); // 0.25 is 1080p
    p.setAttributes('antialias', true);
    document.oncontextmenu = () => false;

    // camera
    easyCam = p.createEasyCam({ distance: 1500 });
  };

  p.draw = () => {
    p.background(0);
    drawEarth();
    drawPointOfInterests();
  };

  let rotation = 1;
  const drawEarth = () => {
    p.noStroke();
    p.texture(earthTexture);

    p.rotateY(rotation);
    rotation += 0.001;

    p.push();
    // rotate the earth so that texture matches coordinates
    p.rotateY(-89.8);
    p.sphere(earthRadius, 50, 50);
    p.pop();
  };
});

export default defaultSketch;
