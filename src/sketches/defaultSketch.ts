/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import { Vector, Geometry, p5 } from 'p5';

import addScreenPosition from '@/helpers/addScreenPosition';

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
  // create a POI for zurich
  const r = 400;
  let zurich : Vector;

  p.preload = () => {
    globe = p.loadModel(globeModel);
    landmass = p.loadModel(landmassModel);
  };

  p.setup = () => {
    p.createCanvas(width, height, p.WEBGL);
    // 0.25 is 1080p
    // p.pixelDensity(0.25);
    easyCam = p.createEasyCam({ distance: 1500 });

    p.translate(p.windowWidth / 2, p.windowHeight / 2);

    document.oncontextmenu = () => false;

    // create a POI for zurich
    addScreenPosition(p);

    zurich = p.createVector(0, 0, 0);

    const latZ = p.radians(47.3769);
    const lonZ = p.radians(8.5417);

    zurich.x = r * Math.cos(latZ) * Math.cos(lonZ);
    zurich.y = r * Math.cos(latZ) * Math.sin(lonZ);
    zurich.z = r * Math.sin(latZ);
  };

  p.draw = () => {
    p.background(0);

    const tZurich = p.screenPosition(-zurich.x, zurich.y, zurich.z);

    easyCam.beginHUD();
    p.fill(255, 100, 100);
    p.translate(tZurich.x + p.windowWidth / 2, tZurich.y + p.windowHeight / 2);
    p.sphere(10);
    // p.circle(tZurich.x + p.windowWidth / 2, tZurich.y + p.windowHeight / 2, 20);
    p.noStroke();
    easyCam.endHUD();
    // console.log(tZurich);
    earth();
  };

  const earth = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const easyCamVector = (easyCam as any).getPosition();

    // p.pointLight(40, 50, 40, easyCamVector[0], easyCamVector[1], easyCamVector[2]);

    // p.scale(90); // Scaled to make model fit into

    // p.spotLight(position, richtung = position * -1, winkel)

    /* p.spotLight(255, 250, 255,
      easyCamVector[0] * 4, easyCamVector[1] * 4, easyCamVector[2] * 4,
      -easyCamVector[0], -easyCamVector[1], -easyCamVector[2], Math.PI / 8);

    p.spotLight(80, 200, 80,
      1000, 1000, 1000,
      -1000, -1000, -1000, Math.PI / 8);

    p.spotLight(250, 250, 250,
      -1000, -1000, -1000,
      1000, 1000, 1000, Math.PI / 8);

    p.shininess(30); */

    // p.lightFalloff(0.5, 0, 0);

    // p.specularMaterial(219, 205, 166);
    // p.model(landmass);
    p.noStroke();
    p.fill(0, 120, 255);
    p.sphere(r, 50, 50);
  };
});

export default defaultSketch;
