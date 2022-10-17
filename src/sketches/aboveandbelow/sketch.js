import Osc from '@/modules/Osc'
import addScreenPositionFunction from './addScreenPosition'

const aboveAndBelowSketch = (height, width, parent) => ((p) => {


  let toSize = 150;
  let oSize = 20;
  let hideCursor = false;
  let useSmoothRotation = true;
  let useSmoothPosition = true;
  let canvas;
  let table;
  let space;
  let numEntries;
  let tNow;
  let tPred;
  let sNow;
  let sPred;
  let aNow;
  let tPot;
  let sPot;
  let aPred;
  let aPot;
  let posT;
  let posS;
  let posA;
  let rotationS;
  let rotationT;
  let rotationI;
  let positionX;
  let positionY;
  let positionXi;
  let positionYi;
  let id;
  let ppmS;
  let ppmT;
  let CoordXs;
  let CoordYs;
  let CoordXt;
  let CoordYt;
  let CoordXa;
  let CoordYa;
  let circleS = false;
  let circleT = false;
  let circleA = false;
  let textI = false;
  let coordinates;
  let latLong;
  let ppm;
  let temp;
  let scale;
  let backgroundimage;
  let info1;
  let info2;
  let info3;
  let info4;
  let info;
  let biomes;
  let id1 = 1; //info
  let id2 = 2; //tree
  let id3 = 3; //soil

  //trackt welche tracker (tracker id) welche funktion des Programms hat. 
  let trackerAllocation = {
  //  info: undefined,
    tree: undefined,
    soil: undefined
  }


  // let socket = io() 
  let trackedDevices = []
  let myFont

  let touchX =0, touchY = 0

  /*  full screen */
  let elem = document.documentElement
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen()
    }
  }


  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen()
    }
  } 


  function init(){

  }
  let touchCount = 0
  let ongoingTouches = []
  let isTouch = false
  function handleTouch(evt){
    isTouch=true
    touchCount++
    let touches = evt.changedTouches;
    // console.log("touch started at : " + evt.touches[0].clientX + " , " + evt.touches[0].clientY)
    touchX = evt.touches[0].clientX
    touchY = evt.touches[0].clientY
  }

  function handleEnd(evt) {
    isTouch=false
    // console.log("touch ended at : " + evt.changedTouches[0].pageX + " , " + evt.changedTouches[0].pageY )
    touchX = evt.changedTouches[0].pageX
    touchY = evt.changedTouches[0].pageY
  }

  function handleMove(evt) {
    // console.log("touch moved at : " + evt.changedTouches[0].pageX + " , " + evt.changedTouches[0].pageY )
    touchX = evt.changedTouches[0].pageX
    touchY = evt.changedTouches[0].pageY
  }


  function ongoingTouchIndexById(idToFind) {
    for (var i = 0; i < ongoingTouches.length; i++) {
      var id = ongoingTouches[i].identifier
      
      if (id == idToFind) {
        return i
      }
    }
    return -1    // not found
  }

  function resize(){
    init()
  }


  p.preload = () => {

    backgroundimage = p.loadImage(require('../../assets/sketches/aboveandbelow/background.png'));
    scale = p.loadImage(require('../../assets/sketches/aboveandbelow/scale.png'));
      temp = p.loadImage(require('../../assets/sketches/aboveandbelow/temp.png'));
      ppm = p.loadImage(require('../../assets/sketches/aboveandbelow/ppm.png'));
      info1 = p.loadImage(require('../../assets/sketches/aboveandbelow/soilcarbon_middle.png'));
      info2 = p.loadImage(require('../../assets/sketches/aboveandbelow/climateconditions_middle.png'));
      info3 = p.loadImage(require('../../assets/sketches/aboveandbelow/extracteddata_middle.png'));
      info4 = p.loadImage(require('../../assets/sketches/aboveandbelow/biodiversity_middle.png'));
      info = p.loadImage(require('../../assets/sketches/aboveandbelow/no_selection.png'));
      biomes = p.loadImage(require('../../assets/sketches/aboveandbelow/biomes.png'));

      table = p.loadTable(require('../../assets/sketches/aboveandbelow/data.csv'), 'csv', 'header');
      
    myFont = p.loadFont(require('../../assets/sketches/aboveandbelow/Futura-Lig.otf'));
   
    // openFullscreen()
    init()
  }


  p.setup = () => {
    canvas = p.createCanvas(width, height)
    canvas.parent(parent)
    p.colorMode(p.HSB, 100);

  //	canvas = createCanvas(2560, 1600);
      // print(table.getRowCount() + ' total rows in table');
    // print(table.getColumnCount() + 'total columns in table')
    p.noStroke()
    p.textFont(myFont)
    // Attaching  Touch Listeners to body and P5 JS Canvas 
    document.body.addEventListener('touchstart',handleTouch,false)
    /*parent.addEventListener('touchstart',handleTouch,false)
    parent.addEventListener('touchend',handleEnd,false)
    parent.addEventListener('touchmove',handleMove,false)*/
    addScreenPositionFunction(p)
    listenMessages()
  }

  p.draw = () => {
      p.background(0)
    p.background(0, 0, 0, 0);
      p.noStroke();
      p.imageMode(p.CORNER);
      p.image(backgroundimage, 0, 0, width, height);
    today();
    future();
    show2d();

  }

  let tokenActions = ['soil'];
  // LISTEN FOR NEW TRACKED DEVICES AND UPDATES
  function listenMessages() {

    const { wsPort } = Osc();
    wsPort.on('addDevice', function(data){

      let thisDevice = new TrackedDevice()
      thisDevice.uniqueId = data.id
      thisDevice.x = data.x * p.windowWidth
      thisDevice.y = data.y * p.windowHeight
      thisDevice.rotation = data.rot
      trackedDevices.push(thisDevice)

      trackedDevices[trackedDevices.length - 1].action = tokenActions[0]
    }) 
    wsPort.on('updateDevice', function(data){
        // console.log(trackedDevices)
        let id = data.id
        let deviceFound = false;
        trackedDevices.forEach( element => {
        if(element.uniqueId === id){
          deviceFound = true;
          element.x = data.x * p.windowWidth
          element.y = data.y * p.windowHeight
          element.rotation = data.rot
            if (element.action === "soil") {
              //update soil tracker
              rotationS = element.rotation;
              positionXi = element.x

            }
  
        }
      })
      if(!deviceFound) {
        let thisDevice = new TrackedDevice()
        thisDevice.uniqueId = data.id
        thisDevice.x = data.x * p.windowWidth
        thisDevice.y = data.y * p.windowHeight
        thisDevice.rotation = data.rot
        trackedDevices.push(thisDevice)
        trackedDevices[trackedDevices.length - 1].action = tokenActions[0]
      }
      })
  }

  function show2d() {
      trackedDevices.forEach( element => {
       element.show()
      })
  }

  function future(){

      p.push();
      p.translate(63,0);


      let spaceRight = width/8.18;
      let spaceLeft = width-width/4.63;
      let middle = (height/2)- height/5.5;
      let spaceMiddle = height/200;

      p.fill(255, 0, 0, 100);

      p.beginShape();

      p.vertex(spaceRight, middle-spaceMiddle);
      space = spaceRight;

      for (let i = 0; i < table.getRowCount(); i++) {

        try {

      tPot = table.getRow(i).getNum("Tree GtC potential");
      tPred = table.getRow(i).getNum("Tree GtC prediction");

          let mtPot = p.map(tPot, 0, 19, 0, width/10);
          let mtPred = p.map(tPred, 0, 19, 0, width/14);

          let tP = p.map(rotationS, 0, 360, mtPred, mtPot);
          aPot = tP;
          ppmT = p.map(rotationS, 0, 360, 61.6, -86.4);

          let xCoord = space;
          let yCoord = middle -spaceMiddle- tP;
          space = xCoord +(height/110);

          p.vertex(xCoord, yCoord);
          
          let graphPointPosition = p.createVector(xCoord, 0);
          let tokenOfInterest = p.createVector(positionXi, 0);
          if (p.circleT == false) {
              if (graphPointPosition.dist(tokenOfInterest) < 3) {
                  CoordXt = xCoord;
                  CoordYt = yCoord;
                  p.circleT = true;
                  
              }
          }
        } catch {}
      }
      p.vertex(spaceLeft, middle-spaceMiddle);
      p.endShape();

      // soil graph

      p.beginShape();


      p.vertex(spaceRight, middle+spaceMiddle);
      space = spaceRight;

      for (let i = 0; i < table.getRowCount(); i++) {

        try {

          sPot = table.getRow(i).getNum("Soil GtC potential");
          sPred = table.getRow(i).getNum("Soil GtC prediction");

          let msPot = p.map(sPot, 0, 150, 0, width/2.85);
          let msPred = p.map(sPred, 0, 150, 0, width/2.25);

          let sP = p.map(rotationS, 0, 360, msPred, msPot);
          aPred = sP;
          ppmS = p.map(rotationS, 0, 360, -73.2, 69.4);

          let xCoord = space ;
          let yCoord = middle + sP + spaceMiddle;

          space = xCoord+height/110;

          p.vertex(xCoord, yCoord);
          let graphPointPosition = p.createVector(xCoord, 0);
          let tokenOfInterest = p.createVector(positionXi, 0);
          if (p.circleS == false) {
              if (graphPointPosition.dist(tokenOfInterest) < 3) {
                  CoordXs = xCoord;
                  CoordYs = yCoord;
                  p.circleS = true;
              }
          }
        } catch {}
      }
      p.vertex(spaceLeft, middle+spaceMiddle);
      p.endShape();


      // air graph


      p.beginShape();

      p.vertex(spaceRight, 0);
      space = spaceRight;

      for (let i = 0; i < table.getRowCount(); i++) {

        try {

          aNow = table.getRow(i).getNum("p.mapped Air GtC now");

          let mapred = p.map(aPred, 3.7, 4.5, -30, 30);
          let mapot = p.map(aPot, 4, 9, -15, 15);
          let maNow = p.map(aNow, 3, 9, 3, 54);
          let Now = p.map(maNow, 3, 54, 0, p.mapred);
          let Now2 = p.map(maNow, 3, 54, 0, p.mapot);

          let xCoord = space ;
          let yCoord = 0 + maNow - Now - Now2 ;
          space = xCoord+height/110;

          p.vertex(xCoord, -yCoord);

          let graphPointPosition = p.createVector(xCoord, 0);
          let tokenOfInterest = p.createVector(positionXi, 0);
          if (circleA == false) {
              if (graphPointPosition.dist(tokenOfInterest) < 3) {
                  CoordXa = xCoord;
                  CoordYa = yCoord;
                  circleA = true;
              }
          }
        }catch {}
      }
      p.vertex(spaceLeft, 0);
      p.endShape();


      p.pop();
      // p.text data out of table
      space = spaceRight;

      for (let i = 0; i < table.getRowCount(); i++) {

          let xCoord = space ;
          space = xCoord+height/110;

          let graphPointPosition = p.createVector(xCoord, 0);
          let tokenOfInterest = p.createVector(positionXi, 0);

          if (p.textI == false) {
              if (graphPointPosition.dist(tokenOfInterest) < 3) {
                  coordinates = table.getRow(i).getString("Biomes");
                  latLong = p.map(xCoord, spaceRight, spaceLeft, -90, 90);
                  p.textI = true;
              }
          }
      }

      //ppm monitor

      p.fill(0, 0, 100, 50);
      let ppmCalc = 369 + ppmT +ppmS;
      let sizePPM = p.map(ppmCalc, 0, 500, 1, 170);

      p.circle(width/6, height - height/6+1, sizePPM);

      //temperature monitor

      let colorPPM = p.map(ppmCalc, 0, 500, 270, 40);
      p.fill(colorPPM, 100, 100, 100);
      let numPPM = p.map(ppmCalc,0, 500, -1, 2);
      let numPPMr = p.round(numPPM, 2);

    // p.stroke(0,0,100,100);
      p.circle( width/3.3, height - height/6, 170);

      p.fill(0,0,100,100);
      p.textSize(50);
      p.text("+" +numPPMr+ "°C" , width/3.8, height - height/6+18);

  }

  function today(){

      p.push();
      p.translate(63, 0);

      let spaceRight = width/8.18;
      let spaceLeft = width-width/4.63;
      let middle = (height/2)- height/5.5;
      let spaceMiddle = height/200;

      p.fill(0, 0, 70, 50);

      p.beginShape();
      p.vertex( spaceRight, middle-spaceMiddle);
      space = spaceRight;

      for (let i = 0; i < table.getRowCount(); i++) {
        try {

          tNow = table.getRow(i).getNum("Tree GtC now");

          let mtNow = p.map(tNow, 0, 19, 0, width/14);

          let xCoord = space;
          let yCoord = middle - mtNow -spaceMiddle;
          space = xCoord +height/105;

          p.vertex(xCoord, yCoord);
        } catch {}
      }
      p.vertex(spaceLeft, middle-spaceMiddle);
      p.endShape();



      // soil graph static

      p.beginShape();
      p.vertex( spaceRight, middle+spaceMiddle);
      space = spaceRight;

      for (let i = 0; i < table.getRowCount(); i++) {

        try {

          sNow = table.getRow(i).getNum("s");

          let msNow = p.map(sNow, 0, 150, 0, width/2.5);
          let xCoord = space ;
          let yCoord = middle + msNow +spaceMiddle;
          space = xCoord+height/110;

          p.vertex(xCoord, yCoord);
        } catch {}
      }
      p.vertex(spaceLeft, middle+spaceMiddle);
      p.endShape();

      // air graph static

      p.beginShape();
      p.vertex( spaceRight, 0);
      space = spaceRight;

      for (let i = 0; i < table.getRowCount(); i++) {

        try {

          aNow = table.getRow(i).getNum("p.mapped Air GtC now");

          let maNow = p.map(aNow, 3, 9, width/300, width/20);

          let xCoord = space ;
          let yCoord = 0 + maNow ;
          space = xCoord+height/110;

          p.vertex(xCoord, yCoord);
        }catch{}
      }

      p.vertex(spaceLeft, 0);
      p.endShape();

    //  if(id == trackerAllocation.info){

          // intersection points

          p.stroke(0, 0, 0, 100);
          p.fill(0, 0, 100, 100);
          if (p.circleT) {
              p.circle(CoordXt, CoordYt, 10);
              p.circleT = false;
          }
          if (p.circleS) {
              p.circle(CoordXs, CoordYs, 10);
              p.circleS = false;
          }
          if (p.circleA) {
              p.circle(CoordXa, CoordYa, 10);
              p.circleA = false;
          }

          // p.line

          p.strokeWeight(1);
          if ((positionXi >  spaceRight) && (positionXi < spaceLeft)) {
              p.line(positionXi, 0, positionXi, height);
          }

  //   }

      p.pop();



  // Biomes

      if ((positionXi >  870) && (positionXi < 900)) {
          p.imageMode(p.CENTER);
          p.image(biomes, width/2.15, height - height/6+4, 250,195);
      }

  //ppm

      p.imageMode(p.ER);
      p.image(ppm, width/6, height - height/6+4, 180, 195);

      // temp

      p.imageMode(p.CENTER);
      p.image(temp, width/3.3, height - height/6+4, 180, 195);


      // p.text

      if ( p.textI ) {

          p.fill(0, 0, 0, 100);
          //  p.text(latLong + "°", positionXi+ 100, positionYi);
          // p.text(coordinates, positionXi+ 100, positionYi + 50);
          textI = false;
      }

  }

  // *** CLASS FOR THE TRACKED DEVICE *** //
  class TrackedDevice{
    constructor(){
      this.uniqueId = -1
      this.identifier = -1
      this.x = 0.0
      this.y = 0.0
      this.rotation =0.0
      this.intensity = 0.0
      this.dead = false
      this.smoothPosition  = p.createVector(0.0,0.0)
      this.smoothRotation = 0.0
      this.inRange = false
      this.angle = 0
      this.sizeL = 180
      this.thisLabel = new Label()
      this.oldPos = p.createVector(0,0)
      
    }
    update(){
      let currPos = p.createVector ( this.x,this.y )
      let delta = currPos.dist(this.oldPos)
      let alpha = 0.1
      this.smoothRotation = this.easeFloatCircular((360 - this.rotation), this.smoothRotation, 0.85)
      this.smoothPosition.x = this.easeFloatCircular(this.x, this.smoothPosition.x, alpha)
        this.smoothPosition.y = this.easeFloatCircular(this.y, this.smoothPosition.y, alpha)
      this.angle = Math.atan2(this.smoothPosition.y - p.windowHeight/2, this.smoothPosition.x - p.windowWidth/2) * 180 / Math.PI
      this.oldPos.x = this.smoothPosition.x
      this.oldPos.y = this.smoothPosition.y
    }
    show(){
      let radius = 45
      let lSize = p.map(this.smoothRotation,0,360,10,75)
      let rotX = (0 + radius) * Math.cos(p.radians(this.smoothRotation))
      let rotY = (0+ radius) * Math.sin(p.radians(this.smoothRotation))

    //	p.fill(255,255,100, 25+p.map(this.smoothRotation,0,360,0,150))
      p.noStroke()
    //	ellipse(this.smoothPosition.x,this.smoothPosition.y,radius*2 + lSize,radius*2 + lSize)
      p.fill(255,255,100)
      p.stroke(0)
      p.strokeWeight(10)
    //	p.circle(this.smoothPosition.x ,this.smoothPosition.y , radius*2)
      p.stroke(0)
      p.strokeWeight(10)
    //	p.line(this.smoothPosition.x , this.smoothPosition.y  , this.smoothPosition.x + rotX, this.smoothPosition.y + rotY)

      // DISPLAY DEGREES OF ROTATION
      p.push()
        p.translate(this.smoothPosition.x+rotX, this.smoothPosition.y+rotY)
        p.rotate(p.radians(this.smoothRotation))
      //	p.fill(255,255,100)
        p.textSize(30)
        // p.text(Math.p.round(this.smoothRotation,3) + " , " + Math.p.round(this.smoothPosition.x) + " , " + Math.p.round(this.smoothPosition.y), 30,10)
    //		p.text(Math.p.round(this.smoothRotation,3), 30,10)
      p.pop()

      // DISPLAY LABEL
      this.thisLabel.update(this.smoothPosition.x,this.smoothPosition.y,this.sizeL, this.smoothRotation + 120)		
      p.noStroke()
    }
    calculateRange(){
      this.update()
      
      // CONDITION DEVICE OUT OF DRAWING RANGE
      if(this.smoothPosition.x > p.windowWidth || this.smoothPosition.x < 0 || this.smoothPosition.y>p.windowHeight || this.smoothPosition.y<0){
        let angle = atan2(this.smoothPosition.y - height / 2, this.smoothPosition.x  - width / 2)
        let newX = this.smoothPosition.x > p.windowWidth ? p.windowWidth : this.smoothPosition.x
        let newY = this.smoothPosition.y > p.windowHeight ? p.windowHeight : this.smoothPosition.y
        newX = newX < 0 ? 0 : newX
        newY = newY < 0 ? 0 : newY
        p.push()
        let sizeT = 30
        p.translate(newX,newY)
        p.rotate(angle)
        let thisTriangle = new Triangle(0,0,sizeT)
        thisTriangle.show()
        p.pop()
        this.inRange = false
      }else{
        this.inRange = true
      }
    }
    easeFloat (target, value, alpha = 0.1) {
        const d = target - value
        return value + (d * alpha)
      }
    easeFloat2 (target, value, alpha ){
    value = value * alpha + target *(1-alpha)
    return value
    }
      easeFloatCircular (target, value, maxValue, alpha = 0.1) {
        let delta = target - value
        const altDelta = maxValue - Math.abs(delta)

        if (Math.abs(altDelta) < Math.abs(delta)) {
            delta = altDelta * (delta < 0 ? 1 : -1)
        }
      return value + (delta * alpha)
    }
    radians (degrees) {
      let radians = degrees * (Math.PI / 180)
      return radians
    }
  }
  // CLASS TO DRAW THE TRIANGLE
  class Triangle{
    constructor(x, y, size){
      this.x = x
      this.y = y
      this.size = size
    }
    update(){

    }
    show(){
      p.noStroke()
      p.fill(255,255,100)
      p.beginShape()
      p.vertex(this.x,this.y)
      p.vertex(this.x-this.size,this.y+this.size)
      p.vertex(this.x-this.size, this.y-this.size)
      p.endShape(CLOSE)
      p.textSize(16)
      p.text('OBJECT OUT OF RANGE', this.x-200,this.y+4)
    }
  }

  // CLASS TO DRAW THE LABEL
  class Label{
    constructor(x,y,size, rotation){
      this.x =0
      this.y = 0
      this.size = 0
      this.rotation = 0
      this.count = 0
      this.oldRotation = 0
      this.oldY = 0
      this.labelOff=false
      this.opacity = 0
    }
    update(x,y,size,rotation){

      this.x = x
      this.y = y
      this.size = size
      this.rotation = Math.round(rotation)

      if(this.rotation!=this.oldRotation){
        this.count=30
        this.labelOff = false

      }else{
        if(this.count>0){
          this.count --
        }else{
          this.labelOff = true
        }
      }
      this.opacity = p.map(this.count,0,30,0,255)
      if(!this.labelOff){
        this.show()
      }
      
      this.oldRotation = this.rotation

    }

    show(){
      // p.mapping the rotation of the tracked device to the position of the p.text array
      // if rotation 120 
      let txtContent =[
        
      ]
      let peak = 10
      let offX=120
      let offY=0
      /*
      p.push()
      
      p.strokeWeight(5)
      p.stroke(255,255,100,this.opacity)
      nop.fill()
      p.translate(this.x,this.y)
      p.rotate(radians(this.rotation))
      p.beginShape()
      p.vertex(offX,offY)
      p.vertex(offX+peak, offY-peak)
      p.vertex(offX+peak,offY-this.size/3)
      p.vertex(offX+peak+this.size, offY-this.size/3)
      p.vertex(offX+peak+this.size,offY+this.size/3)
      p.vertex(offX+peak, offY+this.size/3)
      p.vertex(offX+peak,offY+peak)
      p.endShape(CLOSE)
      p.p.textSize(16)
      p.fill(255,255,100)
      p.textAlign(p.CENTER,p.CENTER)
      p.nop.stroke()
      p.text(txtContent[int(p.map(this.rotation%360,1,360,0,txtContent.length))],offX +30 , offY - this.size/4, this.size-25, this.size/2 )
      p.pop()
      */

    }
  }
});

export default aboveAndBelowSketch;