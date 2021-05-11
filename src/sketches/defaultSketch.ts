/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import { Geometry, p5 } from 'p5';

// import addScreenPosition from '@/helpers/addScreenPosition';

import globeModel from '@/assets/sketches/obj/sphere.obj';
import landmassModel from '@/assets/sketches/obj/countries.obj';

// this is a function which is called with height and width and returns
// another function with the parameter p as P5 (callback).
// This is the Sketch Function which is called by the new P5 instance.
// Use everything processing related with p.
const defaultSketch = (height: number, width: number) => ((p: p5) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let easyCam : any;
  let globe : Geometry;
  let landmass : Geometry;

  p.preload = () => {
    globe = p.loadModel(globeModel);
    landmass = p.loadModel(landmassModel);
  };

  p.setup = () => {
    p.createCanvas(width, height, p.WEBGL);
    // 0.25 is 1080p
    p.pixelDensity(0.25);
    easyCam = p.createEasyCam({ distance: 800 });

    document.oncontextmenu = () => false;
  };

  p.draw = () => {
    p.background(0);
    show3d();
  };

  const show3d = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const easyCamVector = (easyCam as any).getPosition();

    // p.pointLight(40, 50, 40, easyCamVector[0], easyCamVector[1], easyCamVector[2]);

    p.scale(90); // Scaled to make model fit into

    // p.spotLight(position, richtung = position * -1, winkel)

    p.spotLight(255, 250, 255,
      easyCamVector[0] * 4, easyCamVector[1] * 4, easyCamVector[2] * 4,
      -easyCamVector[0], -easyCamVector[1], -easyCamVector[2], Math.PI / 8);

    p.spotLight(80, 200, 80,
      1000, 1000, 1000,
      -1000, -1000, -1000, Math.PI / 8);

    p.spotLight(250, 250, 250,
      -1000, -1000, -1000,
      1000, 1000, 1000, Math.PI / 8);

    p.shininess(30);

    // p.lightFalloff(0.5, 0, 0);

    p.specularMaterial(46, 126, 97); // For effect
    p.model(globe);
    p.specularMaterial(219, 205, 166);
    p.model(landmass);
    p.noStroke();
  };
});

export default defaultSketch;
