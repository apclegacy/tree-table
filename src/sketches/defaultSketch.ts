import { Image, p5 } from 'p5';

// import addScreenPosition from '@/helpers/addScreenPosition';

import earthTextureImage from '@/assets/sketches/earth-texture.jpg';

// this is a function which is called with height and width and returns
// another function with the parameter p as P5 (callback).
// This is the Sketch Function which is called by the new P5 instance.
// Use everything processing related with p.
const defaultSketch = (height: number, width: number) => ((p: p5) => {
  let earthTexture: Image;
  let easyCam : any;

  p.preload = () => {
    earthTexture = p.loadImage(earthTextureImage);
  };

  p.setup = () => {
    p.createCanvas(width, height, p.WEBGL);
    // 0.25 is 1080p
    p.pixelDensity(0.25);
    easyCam = p.createEasyCam({ distance: 1500 });

    document.oncontextmenu = () => false;
  };

  p.draw = () => {
    p.ambientLight(89, 93, 64, 0.5);
    const easyCamVector = (easyCam as any).getPosition(500);
    p.pointLight(200, 255, 200, easyCamVector[0], easyCamVector[1], easyCamVector[2]);
    p.texture(earthTexture);
    p.push();
    p.rotateY(3);
    p.sphere(500, 20, 20);
    p.pop();
    p.noStroke();
  };
});

export default defaultSketch;
