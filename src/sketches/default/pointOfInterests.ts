import { p5, Vector } from 'p5';

const pointOfInterests = (p: p5, earthRadius: number) => {
  // get Positional Vector around earth from lat and lon
  const getVector = (lat: number, lon: number): Vector => {
    // p5 3d axis are weird so z and y had to be switched
    const latRad = p.radians(lat);
    // somehow lon has to be inverted. dunno why
    const lonRad = p.radians(lon * -1);
    return p.createVector(
      earthRadius * Math.cos(latRad) * Math.cos(lonRad),
      earthRadius * Math.sin(-latRad),
      earthRadius * Math.cos(latRad) * Math.sin(lonRad),
    );
  };

  // point of interests
  const zurich = getVector(47.376888, 8.541694);
  const cdmx = getVector(19.432608, -99.133209);
  const london = getVector(51.507351, -0.127758);
  const newYork = getVector(40.712776, -74.005974);

  // draw Point Of Interest
  const drawPOI = (position: Vector) => {
    p.push();
    p.translate(position.x, position.y, position.z);
    p.emissiveMaterial(0, 255, 117);
    p.sphere(earthRadius / 40, earthRadius / 40, 40);
    p.pop();
  };

  const drawPointOfInterests = () => {
    drawPOI(zurich);
    drawPOI(cdmx);
    drawPOI(london);
    drawPOI(newYork);
  };
  return {
    drawPointOfInterests,
  };
};

export default pointOfInterests;
