import { p5, Vector } from 'p5';

const pointOfInterests = (p: p5, earthRadius: number) => {
  // zurich
  const latZ = p.radians(47.3769);
  const lonZ = p.radians(8.5417);

  const zurich = p.createVector(0, 0, 0);
  zurich.x = earthRadius * Math.cos(latZ) * Math.cos(lonZ);
  zurich.z = earthRadius * Math.cos(latZ) * Math.sin(lonZ);
  zurich.y = earthRadius * Math.sin(-latZ);

  const drawPOI = (position: Vector) => {
    p.push();
    p.translate(position.x, position.y, position.z);
    (p as any).emissiveMaterial(0, 255, 117);
    p.sphere(earthRadius / 40, earthRadius / 40, 40);
    p.pop();
  };

  const drawPointOfInterests = () => {
    drawPOI(zurich);
  };
  return {
    drawPointOfInterests,
  };
};

export default pointOfInterests;
