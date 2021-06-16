/**
 little helper functions
 */
const utils = (p) => {

const getRandomColor = () => {
    let rgb1 = Math.floor((Math.random() * 255) + 200)
    let rgb2 = Math.floor((Math.random() * 255) + 200)
    let rgb3 = Math.floor((Math.random() * 255) + 200)
    return "rgb("+rgb1 +","+rgb2 + ","+rgb3 +")"
}

const calcTo3DVector = (lat, lon, radius) => {
    let x = -((radius) * Math.sin(lat) * Math.cos(lon))
    let z = ((radius) * Math.sin(lat) * Math.sin(lon))
    let y = ((radius) * Math.cos(lat))
    return p.createVector(x, y, z);
}

const toCartesian = (lat, lon, radius) => {
    let x = radius * Math.cos(radians(lat)) * Math.cos(radians(lon))
    let y = radius * Math.cos(radians(lat)) * Math.sin(radians(lon))
    let z = radius * Math.sin(radians(lat))
    return p.createVector(-x,y,z);
}

const horizontalToCartesian = (lat, lon, radius) => {
    // returns cartesian coordinates (relative of earth center) based of longitude and latitude
    let phi = radians(90 - lat)
    let theta = radians(lon + 180)
    return calcTo3DVector(phi, theta, radius);
}

//Number utils
const radians = (degrees) => {
    let radians = degrees * (Math.PI / 180)
    return radians
}
return {
    getRandomColor,
    calcTo3DVector,
    toCartesian,
    horizontalToCartesian,
    radians,
}
}

export default utils
