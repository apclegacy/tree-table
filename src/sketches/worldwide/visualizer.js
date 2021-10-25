const visualizer = (p) => {

// render cylinder
const drawCylinder = (startPoint, endPoint, c, radius = 5) => { 
    p.push();
    p.fill(c);

    let v1 = copyVector(startPoint).sub(copyVector(endPoint));
    let dist = startPoint.dist(endPoint);

    let rho = p.sqrt(p.pow(v1.x, 2)+p.pow(v1.y, 2)+p.pow(v1.z, 2));
    let phi = p.acos(v1.z/rho);
    let the = p.atan2(v1.y, v1.x);

    v1.mult(-0.5);
    let v2 = copyVector(startPoint);

    p.translate(v2.x, v2.y, v2.z);
    p.translate(v1.x, v1.y, v1.z);
    p.rotateZ(the);
    p.rotateY(phi);
    p.rotateX(p.PI / 2.0);

    p.cylinder(radius, dist, 7, 1);
    //cone(4, 70);
    p.pop();
}

const copyVector = (vec) => {
    return p.createVector(vec.x, vec.y, vec.z);
}

const drawCoordinates = () => {
    p.push();
    let size = 20;
    p.stroke(p.color(255, 0, 0));
    p.line(0, size, 0, 0, 0, 0);
    p.stroke(p.color(0, 255, 0));
    p.line(0, 0, 0, size, 0, 0);
    p.stroke(color(0, 0, 255));
    p.line(0, 0, 0, 0, 0, size);

    p.pop();
}
return {
    drawCylinder,
    drawCoordinates,
    copyVector,
}
}

export default visualizer