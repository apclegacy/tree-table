import { p5, Image } from 'p5';

// textures
import earthTextureSrc from '@/assets/sketches/earth-texture-night.jpg';
import cloudTextureSrc from '@/assets/sketches/cloud-texture.png';

let earthTexture: Image;
let cloudTexture: Image;

const earth = (p: p5, earthRadius: number) => {
  p.preload = () => {
    earthTexture = p.loadImage(earthTextureSrc);
    cloudTexture = p.loadImage(cloudTextureSrc);
  };

  let rotation = 1;
  const drawEarth = () => {
    // earth rotation
    p.rotateY(rotation);
    rotation += 0.0003;

    // initial position
    p.rotateY(105);

    // globe
    p.push();
    // rotate the earth so that texture matches coordinates
    p.texture(earthTexture);
    p.rotateY(4.7);
    p.sphere(earthRadius, 50, 50);
    p.pop();

    // clouds

    p.push();
    p.texture(cloudTexture);
    p.rotateY(4.7);
    p.sphere(earthRadius + 5);
    p.pop();
  };

  return {
    drawEarth,
  };
};

export default earth;
