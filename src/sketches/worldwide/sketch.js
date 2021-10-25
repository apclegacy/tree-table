import { projectDd } from './projectDrawDown.js'
import interactionHandler  from './interactionHandler.js'
import addScreenPositionFunction from './addScreenPositionFunction.js'
import utils from './utils.js'
import visualizer from './visualizer.js'

const worldWideSketch = (height, width, parent) => ((p) => {

    let trackedDevices = []

    const textureGuiTriangleAmountDisplay = p.loadImage(require('../../assets/sketches/worldwide/imgs/guiElements/trianlge_amount_display.png'));

    const { handleTouch, handleEnd, handleMove, listenMessages } = interactionHandler(p, trackedDevices, textureGuiTriangleAmountDisplay);

    const { updateCummulativePercentage, updatePercentage, projectDrawDown, activeSector, resetProjectDrawdown, setAllProjectDrawdown } = projectDd();

    const { toCartesian } = utils(p)
    const { drawCylinder } = visualizer(p)

    let earthImg, sky, cloudImg;
    let cloudEnabled = true;

    let theta = 0.001
    let r = 400
    let easycam
    let pOI = []
    let pOI2 = []

    // let socket = io()

    let tPS, tPE // testPointStart , testPointEnd of Spike 
    let canvas

    let threeDviewFlag = true
    let vectorMapFlag = false
    let pOIFlag = false
    let flatMapFlag = false
    let myFont
    let tableControl
    let bckColor = [10, 10, 10, 255]
    let seaColor = [100, 120, 255, 255];

    let zurich
    let cdmx
    // apply rotations of the textured p.sphere for accurate UV projection of the earth map
    let rMX = -90 /* -90 */
    let rMY = 90 /* 90 */
    let rMZ = 0

    let easycamIntialized = false
    let touchX = 0,
        touchY = 0 

    let earthMap
    let screenPointsEarth = []
    let pointsEarth = []

    let futureCitiesTable
    let futureCitiesData
    let cities

    // setting variables for loading geoTIFF data
    let co2
    let refrst

    let colorBlue

    // these variables are the array lists of objects containing data points extracted form the
    // simplified geoTIFF image(s)
    // remember always to declare arrays as empty using square brackets: "let yourArrayName = []"
    let pntsFromTIFF_co2 = []
    let pntsFromTIFF_refrst = []

    let flagCO2Data = true
    let flagRfrsData = false

    let flagDataVisStyleCO2 = true
    let flagDataVisStyleRfrst = true

    /*  full screen */
    let elem = document.documentElement

    p.preload = () => {
        earthImg = p.loadImage(require('../../assets/sketches/worldwide/imgs/earth_3d_noclouds_mono5-hires.jpg'))
        cloudImg = p.loadImage(require('../../assets/sketches/worldwide/imgs/clouds_min.png'));
        earthMap = p.loadTable(require('../../assets/sketches/worldwide/maps/earth.csv'), '', '')
        loadData(require('../../assets/sketches/worldwide/data/future_cities.csv'))
        
        co2 = p.loadImage(require('../../assets/sketches/worldwide/data/co2_emissions.png'))
        refrst = p.loadImage(require('../../assets/sketches/worldwide/data/geodata_ref_potential.png'))
        // futureCitiesTable = p.loadTable('assets/data/future_cities.csv','','')

        /* food = p.loadImage('../icons/food.svg');
        energy = p.loadImage('../icons/energy.svg');
        buildings = p.loadImage('../icons/buildings.svg');
        industry = p.loadImage('../icons/industry.svg');
        landsinks = p.loadImage('../icons/landsinks.svg');
        transportation = p.loadImage('../icons/transportation.svg'); */

        /* socket.on('connected', function (data) {
            console.log('new client connected id:' + data.id)
        }) */

        myFont = p.loadFont(require('../../assets/sketches/worldwide/SUIGBI__.TTF'))
    }

    p.setup = () => {
        canvas = p.createCanvas(width, height, p.WEBGL)
        canvas.parent(parent)
        p.pixelDensity(0.25)
        p.noStroke()
        p.textFont(myFont)
        p.imageMode(p.CENTER);
        document.getElementById("restart").addEventListener("click", () => {
            resetProjectDrawdown()
        });

        document.getElementById('allTo100').addEventListener("click", () => {
            setAllProjectDrawdown();
        });

        colorBlue = p.color(0, 0, 255);

        // resizing / downscaling the resolution of the image-data
        co2.resize(p.windowWidth / 12, p.windowHeight / 12)
        refrst.resize(p.windowWidth / 8, p.windowHeight / 8)

        if (!easycamIntialized) {
            easycam = p.createEasyCam({
                distance: 1500,
                center: [0, 0, 0]
            })
            easycam.setDistanceMin(100)
            easycam.setDistanceMax(r * 60)
            easycamIntialized = true
        }
        // Attaching  Touch Listeners to body and P5 JS Canvas
        document.body.addEventListener('touchstart', handleTouch, false)
        document.getElementById('defaultCanvas0').addEventListener('touchstart', handleTouch, false)
        document.getElementById('defaultCanvas0').addEventListener('touchend', handleEnd, false)
        document.getElementById('defaultCanvas0').addEventListener('touchmove', handleMove, false)

        updateCummulativePercentage();

        let fov = p.PI / 3
        let near = 200
        let far = 80000

        addScreenPositionFunction(p)

        // CREATING A RANDOM ARRAY OF POINTS AROUND THE GLOBE
        //  replace with csv real points or Points of Interest

        cities = futureCitiesData.getColumn(0)
        let futCities = futureCitiesData.getColumn(2)
        let curr_lat = futureCitiesData.getColumn(27)
        let curr_lon = futureCitiesData.getColumn(28)
        let fut_lat = futureCitiesData.getColumn(29)
        let fut_lon = futureCitiesData.getColumn(30)

        console.log(cities.length + " total rows in table")

        for (let i = 0; i < cities.length; i++) {
            // geo coordinates
            // replace the random locations with the projects
            if (i > 0) {
                pOI.push(toCartesian(curr_lat[i], curr_lon[i], r));
                pOI2.push(toCartesian(curr_lat[i], curr_lon[i], r + 25));
            }
        }
        tPS = p.createVector()
        tPE = p.createVector()

        // SETTING RANDOM LOCATION FOR INTERACTIVE 3D POINT(S) EXAMPLE
        let lat = 47.3769;
        let lon = 8.5417;

        let latZ = 47.3769;
        let lonZ = 8.5417;

        let latMX = 19.4969
        let lonMX = -99.7233

        zurich = toCartesian(lat, lon, r);
        cdmx = toCartesian(latMX, lonMX, r);
        tPS = toCartesian(lat, lon, r);
        tPE = toCartesian(lat, lon, r + 50);

        //let testPoint = screenPosition(-tPS.x, tPS.y, tPS.z)
        listenMessages()

        // here we are calling the function dataFromTIFFtoArray
        // which you can find on the file sketch_extend.js inside the same js folder
        // this function reads each pixel and passes its x y location to a custom
        // data point object, which converts the x y to 3D point in an spheric system
        // the points contain x y location in 2D geo system(lon lat) as well as 3D xyz
        // as well as a value, which is just the brightness of each pixel
        // once the pixel is handeld an object is created and pushed into the list in the draw we access
        // this list and iterate through each of the data points in order to visualize them or interact
        // from co2
        dataFromTIFFtoArray(co2, pntsFromTIFF_co2, 5.0)
        // from rfrst
        dataFromTIFFtoArray(refrst, pntsFromTIFF_refrst, 1.0)

        // tableControl = new CenterControl(320,475)
        updatePercentage();
    }

    p.draw = () => {
        p.background(bckColor)

        document.getElementById("frameRateDisplay").innerText = p.frameRate();

        let user = p.createVector(p.mouseX, p.mouseY)
        show3D()
        if(flagCO2Data){
            visualizeDataFromTIFF(pntsFromTIFF_co2,flagDataVisStyleCO2, p.color(50,140, 255, 100), 'co2')
        }
        if(flagRfrsData){
            visualizeDataFromTIFF(pntsFromTIFF_refrst,flagDataVisStyleRfrst, p.color(0,255,100), 'reforestation')
        }

        show2d()
        showPointsOfInterest(cities.length - 2)
        showCityCylinders();

        showFlatMap(pointsEarth, p.color(0, 255, 0))
        showVectorMap(pointsEarth, screenPointsEarth, p.color(255, 255, 255))
        easycam.setCenter([0, 0, 0], 0.0);

    }

    /**
     * Displays cylinder for each pointOfInterest
     */
    function showCityCylinders() {
        if (pOIFlag) {
            for (let i = 0; i < cities.length - 1; i++) {
                drawCylinder(pOI[i], pOI2[i], p.color(0, 255, 0));
            }
        }
    }

    /*function showFlatPointsOfInterest() {
        for (let i = 0; i < cities.length; i++) {
            let lR = 400
            let lLat = asin(pOI[i].z / lR)
            let lLong = atan2(pOI[i].y, -pOI[i].x)
            lLat = lLat * 90 / p.PI * 10 // scaling
            lLong = lLong * 180 / p.PI * 10 // scaling
            //drawLine(lLong, lLat, 0, lLong, lLat, 50, colorBlue)
        }
    }*/

    // function touchMoved() {
    //   return false;
    // }

    function show3D() {
        if (threeDviewFlag) {
            p.ambientLight(60, 60, 60)
            let v1 = easycam.getPosition(500)
            p.pointLight(255, 255, 255, v1[0], v1[1] + 300, v1[2])
            p.pointLight(250, 250, 250, v1[0], v1[1] + 1000, v1[2])
            p.texture(earthImg)
            p.noStroke()
            // rotating earth in order to match coordinate system location
            p.push()
            p.rotateX(p.radians(rMX))
            p.rotateY(p.radians(rMY))
            p.rotateZ(p.radians(rMZ))
            // fill(0,0,100)
            // drawing EARTH Polygon
            p.sphere(r, 20, 20)
            p.pop()

            if (cloudEnabled) {
                p.push();
                p.rotateX(p.millis() * 0.00002);
                p.texture(cloudImg);
                p.sphere(r + 5, 20, 20);
                p.pop();
            }
        }
    }

    function show2d() {
        let testPoint = p.screenPosition(tPS.x, tPS.y, tPS.z)
        let testPoint2 = p.screenPosition(tPE.x, tPE.y, tPE.z)
        let user = p.createVector(p.mouseX - p.windowWidth / 2, p.mouseY - p.windowHeight / 2)
        // in case the touch display or device is available use the touchX instead
        if (p.isTouch) {
            user = p.createVector(touchX - p.windowWidth / 2, touchY - p.windowHeight / 2)
        }
        // console.log(user.x , user.y)
        let testPoint2Ref = p.createVector(testPoint2.x, testPoint2.y)
        easycam.beginHUD()

        if (p.isTouch) {
            p.fill(0, 0, 255, 100)
            p.circle(touchX, touchY, 50)
        }
        p.fill(255, 0, 0)
        p.stroke(255, 0, 0)
        p.strokeWeight(0.5)
        //line(-testPoint.x + p.windowWidth / 2, testPoint.y + p.windowHeight / 2, -testPoint2.x + p.windowWidth / 2, testPoint2.y + p.windowHeight / 2)

        if(trackedDevices.length>0){
            trackedDevices.forEach( element => {
                element.calculateRange()
            })
            trackedDevices.forEach(element =>{
                if(element.inRange){
                    element.show()
                }
            })
        }
        easycam.endHUD()
    }

    // this function creates an HTML div element assigns the class trackedDivs to it, passes the uniqueId as id and adds some text inside
    function createHTML(id) {
        let testDiv = document.createElement("div") // creating a new div
        testDiv.className = "trackedDivs"
        testDiv.innerHTML = "I'm a new div"
        testDiv.id = id
        document.body.appendChild(testDiv)
    }
    // this function update the position and labesl of the tracked devices
    function updateHTML(x_pos, y_pos, tracked_id) {
        let trackedDivs = document.getElementsByClassName("trackedDivs")
        Array.prototype.forEach.call(trackedDivs, function (element) {
            if (element.id == tracked_id) {
                element.style.left = x_pos + 'px';
                element.style.top = y_pos + 'px';
            }
        })
    }
    // this function destroys the html elements which are not used anymore, to avoid accumulating appended children
    function destroyHTML(tracked_id) {
        // should remove the HTML elements from past tracked devices that are not in use any more
        let trackedDivs = document.getElementsByClassName("trackedDivs")
        Array.prototype.forEach.call(trackedDivs, function (element) {
            if (element.id == tracked_id) {
                // search for a function to actually remove an element from HTML
                element.remove()
            }
        })
    }

    function windowResized() {
        resizeCanvas(p.windowWidth, p.windowHeight, true)
        if (easycamIntialized) {
            easycam.setViewport([0, 0, p.windowWidth, p.windowHeight])
        }
        resize()
    }

    let deltas = []
    let calcDeltasOnce = false

    function showVectorMap(mapPoints, screenMapPoints, farbe) {
        if (vectorMapFlag) {
            let step = 12
            for (let i = 0; i < screenMapPoints.length - step; i = i + step) {
                let screenPoint = screenPosition(-mapPoints[i].x, mapPoints[i].y, mapPoints[i].z)
                let screen2DVector = createVector(screenPoint.x, screenPoint.y)
                screenMapPoints[i] = screen2DVector
            }
            // strokeWeight(1)
            easycam.beginHUD()
            // beginShape()
            stroke(farbe)
            // fill(255,10)
            strokeWeight(1.0)
            noFill()
            let shaped = false
            let indexError = 0
            let indexR = 0
            let indexG = 0
            let indexB = 0
            for (let i = 0; i < screenMapPoints.length - step; i = i + step) {
                if (i > step) {
                    let fixI = i
                    if (!calcDeltasOnce) {
                        deltas[i] = dist(mapPoints[i].x, mapPoints[i].y, mapPoints[i].z, mapPoints[i - step].x, mapPoints[i - step].y, mapPoints[i - step].z)
                    }
                    if (deltas[i] < 10.25 + step && !shaped) {
                        beginShape()
                        shaped = true
                        vertex(screenMapPoints[i].x + p.windowWidth / 2, screenMapPoints[i].y + p.windowHeight / 2)
                    } else {
                        if (shaped && deltas[fixI] < 10.25 + step) {
                            vertex(screenMapPoints[i].x + p.windowWidth / 2, screenMapPoints[i].y + p.windowHeight / 2)
                        } else {
                            if (deltas[fixI] > 10.25 + step) {
                                endShape()
                                shaped = false
                                indexError++
                            }
                        }
                    }
                }
            }
            calcDeltasOnce = true
            easycam.endHUD()
        }
    }

    function showFlatMap(mapPoints, farbe) {
        if (flatMapFlag) {
            let step = 15
            let lastLat
            let lastLong
            let scaleX = 5
            let scaleY = 10
            for (let i = 0; i < mapPoints.length - step; i = i + step) {
                let lR = 400
                let lLat = asin(mapPoints[i].z / lR)
                let lLong = atan2(mapPoints[i].y, -mapPoints[i].x)
                lLat = lLat * 90 / p.PI * scaleY // scaling
                lLong = lLong * 180 / p.PI * scaleX // scaling
                // mapping longitude from -180 - 180º to the other way around
                if (lLong <= -55) {
                    lLong = map(lLong, -(180 * scaleX), 0, 0, (180 * scaleX))
                } else {
                    lLong = map(lLong, 0, (180 * scaleX), -(180 * scaleX), 0)
                }
                if (i > 0) {
                    let delta = fastDist(lLong, lLat, 0, lastLong, lastLat, 0)
                    if (delta < (4000)) {
                        drawLine(lLong, lLat, 0, lastLong, lastLat, 0, colorBlue)
                    }
                }
                lastLat = lLat
                lastLong = lLong

            }
            drawLine((180 * scaleX), -400, 0, -(180 * scaleX), 400, 0, colorBlue)
            // meridian or longitude 0
            drawLine(-110, -400, 0, -110, 400, 0, colorBlue)
            // equator or latitude 0
            drawLine(-(180 * scaleX), 0, 0, (180 * scaleX), 0, 0, colorBlue)
        }
    }

    function fastDist(ax, ay, az, bx, by, bz) {
        return (bx - ax) * (bx - ax) + (by - ay) * (by - ay) + (bz - az) * (bz - az);
    }

    // rename this function - show Points Of Interest
    function showPointsOfInterest(amount) {
        if (pOIFlag) {
            let testPoints = []
            // the screenPoisition() function projects coordinates from 3D space into the 2D projections of the Screen
            let tZurich = screenPosition(zurich.x, zurich.y, zurich.z)
            let tCDMX = screenPosition(cdmx.x, cdmx.y, cdmx.z)
            for (let i = 0; i < amount; i++) {
                testPoints[i] = screenPosition(pOI[i].x, pOI[i].y, pOI[i].z)
            }
            let user = createVector(p.mouseX - p.windowWidth / 2, p.mouseY - p.windowHeight / 2)
            // in case the touch display or device is available use the touchX instead
            if (isTouch) {
                user = createVector(touchX - p.windowWidth / 2, touchY - p.windowHeight / 2)
            }
            // similar to pushMatrix()
            easycam.beginHUD()
            for (let i = 0; i < amount; i++) {
                if (user.dist(testPoints[i]) < 10) {
                    fill(255, 180, 255)
                    p.noStroke()
                    circle(testPoints[i].x + p.windowWidth / 2, testPoints[i].y + p.windowHeight / 2, 15)
                    let lat = Math.asin(pOI[i].z / r)
                    let lon = Math.atan2(pOI[i].y, -pOI[i].x)
                    lat = lat * 180 / Math.p.PI
                    lon = lon * 180 / Math.p.PI
                    textSize(12)
                    let latLon = 'lat : ' + lat.toFixed(3) + ' , lon : ' + lon.toFixed(3);
                    text(cities[i + 1] + " , " + latLon, testPoints[i].x + p.windowWidth / 2 + 10, testPoints[i].y + p.windowHeight / 2 + 5)
                } else {
                    fill(200, 180, 200)
                    p.noStroke()
                    circle(testPoints[i].x + p.windowWidth / 2, testPoints[i].y + p.windowHeight / 2, 2)
                }
            }
            fill(255, 100, 100)
            if (user.dist(tZurich) < 25) {
                let lat = Math.asin(zurich.z / r)
                let lon = Math.atan2(zurich.y, zurich.x)
                lat = lat * 180 / p.PI
                lon = lon * 180 / p.PI
                textSize(16)
                let latLon = 'ZURICH, LAT : ' + lat.toFixed(3) + ' , LON : ' + lon.toFixed(3) + ' , Z pos : ' + tZurich.z
                if (p.mouseX > p.windowWidth / 2) {
                    text(latLon, tZurich.x + p.windowWidth / 2 - 240, tZurich.y + p.windowHeight / 2 + 25)
                } else {
                    text(latLon, tZurich.x + p.windowWidth / 2 + 20, tZurich.y + p.windowHeight / 2 + 25)
                }
                circle(tZurich.x + p.windowWidth / 2, tZurich.y + p.windowHeight / 2, 25)
            } else {
                circle(tZurich.x + p.windowWidth / 2, tZurich.y + p.windowHeight / 2, 15)
            }
            fill(100, 100, 255)
            circle(tCDMX.x + p.windowWidth / 2, tCDMX.y + p.windowHeight / 2, 5)
            // popMatrix()
            easycam.endHUD()
        }
    }

    function loadData(path) {
        futureCitiesData = p.loadTable(path, '', '')

        // int entriesCount =0;
        // for (TableRow row : futureCities.rows()) {
        //   String city = row.getString("current_city");
        //   float longitude = row.getFloat("Longitude");
        //   float latitude = row.getFloat("Latitude");

        //   String futureCity = row.getString("future_city_1_source");

        //   float longFut = row.getFloat("future_long");
        //   float latFut = row.getFloat("future_lat");

        //   if (city.length()>0) {
        //     // println(city, longitude, latitude );
        //     cities.add(city);
        //     geoCoords.add(new PVector(longitude, latitude));

        //     futCities.add(futureCity);
        //     futGeoCoords.add(new PVector(longFut, latFut));
        //   }
        // }
        // pOIs = new PointOfInterest[cities.size()];
        // multiplePOI();
    }
    function dataFromTIFFtoArray(_img,  _pntsFromTIFF, _scale) {
        _img.loadPixels()
        let step = 2;
        console.log(_img.width , _img.height)
        for(let x = 0; x < _img.width; x+=step) {
          for(let y = 0; y < _img.height; y+=step) {
            let [r, g, b] = _img.get(x, y)
        //     // let c = _img.pixels[i*4]
      
            let brghtnss = ( r + g + b ) / 3 
        //     // let x = i % _img.width
        //     // let y = (i-x)/_img.width
  
            //     // mapping values from x y - longitude and latitude
            let lon = p.map(x,0, _img.width,-180,180);
            let lat = p.map(y,0, _img.height,90,-90);
  
            //console.log(`${lat}:${lon}`);
  
            // log data on the console
            // console.log(lon , lat , r , g , b, brghtnss)
            // creating datapoint object and pushing it to the arraylist in case
            _pntsFromTIFF.push(new DataPointGeoTIFF(lat, lon, brghtnss, _scale ))
          }
        }
        _img.updatePixels()
  
      }
      // function iterates through the objects inside the corresponding array 
      // and calls the function display(...) from each object
      function visualizeDataFromTIFF(_pntsFromTIFF, _visFlag, _c, type){
        _pntsFromTIFF.forEach(element => {
            element.display(_visFlag,_c, type)
        })
      }
      // a class to store each Pixel as data point
      class DataPointGeoTIFF {
  
        // parameters: lon lat are location values in degrees,  _value corresponds to brightness, and scale the factor affecting the size in the visualization
        constructor(_lat, _lon,  _value,  _scale){
            this.lon = _lon
            this.lat = _lat
            // value stands for the actual color of the pixel, the function brightness() extracts
            // the 'whiteness' of the pixel
            this.value = _value
            this.loc3D = p.createVector(0,0,0)
            this.scale = _scale
            this.radius = 400 + 5
  
            //this.pointWeight = map(this.value,0,255,1.2,8) *map(this.value,0,255,1.2,8) * this.scale;
  
  
            this.loc3D = toCartesian(this.lat, this.lon, this.radius);
            this.updateValue();
        }
  
        updateValue() {
            this.pointWeight = p.map(this.value, 0, 255, 0, 30) * 5 * p.abs(p.cummulativePercentage / 100 - 1);
            this.loc3Dend = toCartesian(this.lat, this.lon, this.radius + this.pointWeight);
        }
  
        // first parameter is a boolean for the visualization style and second one is the display color
        display(visStyle,c, type = 'co2'){
          if(this.value>0){
  
              if (type === 'co2') {
                  this.updateValue();
              }
  
            if(visStyle){
                //drawLineFromVector(this.loc3D, this.loc3Dend, c, 1);
                drawCylinder(this.loc3D, this.loc3Dend, c, p.map(this.value, 0, 255, 2, 5));
                //drawLine(this.loc3D.x, this.loc3D.y, this.loc3D.z, this.loc3Dend.x, this.loc3Dend.y, this.loc3Dend.z, c);
            }else{
              p.strokeWeight(pointWeight)
              p.stroke(c)
              p.point(-this.loc3D.x,this.loc3D.y,this.loc3D.z)
            }
          }else{
            // do something else  when the value (brightness is 0 or black or no information)
          }
        }
  
      } 
}
);
export default worldWideSketch;