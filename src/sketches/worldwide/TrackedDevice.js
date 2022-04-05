// *** CLASS FOR THE TRACKED DEVICE *** //

import label from './Label';
import tokenHexagon from './tokenHexagon';
import { projectDd } from './projectDrawDown.js'

const trackedDevice = (p, textureGuiTriangleAmountDisplay) => {
const { displayHexPlusLabels } = tokenHexagon(p)

const { getActivePercentageOfActiveSector } = projectDd();


const RADIUSSHOWAMOUNT = 220; //40
const PIE_WEIGHT = 150; //20
const SIZE_TRIANGLE_AMOUNT_DISPLAY = 30; //10

const { Label } = label(p);

class TrackedDevice {
    constructor(){
        this.uniqueId = -1
        this.identifier = -1
        this.x = 0.0
        this.y = 0.0
        this.rotation = 0.0
        this.intensity = 0.0
        this.dead = false
        this.smoothPosition = p.createVector(0.0, 0.0)
        this.smoothRotation = 0.0
        this.inRange = false
        this.angle = 0
        this.sizeL = 180
        this.thisLabel = new Label()
        this.oldPos = p.createVector(0, 0)
    }

    update() {
        let currPos = p.createVector(this.x, this.y)
        let delta = currPos.dist(this.oldPos)
        let alpha = 0.1
        this.smoothRotation = this.easeFloat2((360 - this.rotation), this.smoothRotation, 0.85)
        this.smoothPosition.x = this.easeFloat2(this.x, this.smoothPosition.x, alpha)
        this.smoothPosition.y = this.easeFloat2(this.y, this.smoothPosition.y, alpha)
        this.angle = Math.atan2(this.smoothPosition.y - p.windowHeight / 2, this.smoothPosition.x - p.windowWidth / 2) * 180 / Math.PI
        this.oldPos.x = this.smoothPosition.x
        this.oldPos.y = this.smoothPosition.y
    }

    show() {

        //OLD TOKEN
        /*let radius = 45
        let lSize = map(this.smoothRotation,0,360,10,75)
        let rotX = (0 + radius) * Math.cos(radians(this.smoothRotation))
        let rotY = (0+ radius) * Math.sin(radians(this.smoothRotation))

        fill(255,255,100, 25+map(this.smoothRotation,0,360,0,150))
        noStroke()
        ellipse(this.smoothPosition.x,this.smoothPosition.y,radius*2 + lSize,radius*2 + lSize)
        fill(255,255,100)
        stroke(0)
        strokeWeight(10)
        circle(this.smoothPosition.x ,this.smoothPosition.y , radius*2)
        stroke(0)
        strokeWeight(10)
        line(this.smoothPosition.x , this.smoothPosition.y  , this.smoothPosition.x + rotX, this.smoothPosition.y + rotY)
        */
        if (this.action === 'sectorSelect') {
            displayHexPlusLabels(this.smoothPosition.x, this.smoothPosition.y, this.smoothRotation)
        } else if (this.action === 'amountSelect') {
            this.showAmountSelect();
        }



    }
    calculateRange() {
        this.update()
        // CONDITION DEVICE OUT OF DRAWING RANGE
        if (this.smoothPosition.x > p.windowWidth || this.smoothPosition.x < 0 || this.smoothPosition.y > p.windowHeight || this.smoothPosition.y < 0) {
            // uncomment this to draw a line between the center of the drawing area and the center of the tracked device
            // strokeWeight(2)
            // stroke(0,255,0)
            // line(windowWidth/4,windowHeight/2, this.smoothPosition.x,this.smoothPosition.y)
            /*p.push()
            p.translate(p.windowWidth / 2, p.height / 2)
            p.rotate(p.radians(this.angle))
            let sizeT = 30
            let thisTriangle = new p.Triangle(p.windowWidth / 2 - sizeT, -sizeT, sizeT)
            thisTriangle.show()
            p.pop()*/

            this.inRange = false
        } else {
            this.inRange = true
        }
    }
    easeFloat(target, value, alpha = 0.1) {
        const d = target - value
        return value + (d * alpha)
    }
    easeFloat2(target, value, alpha) {
        value = value * alpha + target * (1 - alpha)
        return value
    }
    easeFloatCircular(target, value, maxValue, alpha = 0.1) {
        let delta = target - value
        const altDelta = maxValue - Math.abs(delta)

        if (Math.abs(altDelta) < Math.abs(delta)) {
            delta = altDelta * (delta < 0 ? 1 : -1)
        }
        return value + (delta * alpha)
    }
    radians(degrees) {
        let radians = degrees * (Math.PI / 180)
        return radians
    }
    showAmountSelect() {
        if(textureGuiTriangleAmountDisplay) {
        p.noFill();
        p.stroke(255);
        p.strokeWeight(5);
        p.circle(this.smoothPosition.x, this.smoothPosition.y, RADIUSSHOWAMOUNT);

        let rotation = p.map(getActivePercentageOfActiveSector(), 0, 100, 0, p.TWO_PI);
        let sizePie = RADIUSSHOWAMOUNT + PIE_WEIGHT;

        p.push()
        p.translate(this.smoothPosition.x, this.smoothPosition.y)
        p.arc(0, 0, sizePie,  sizePie, 0, rotation);
        p.fill(255);
        p.textSize(30);
        p.text(getActivePercentageOfActiveSector() + "%", RADIUSSHOWAMOUNT, 10);
        p.rotate(rotation + p.PI / 2);
        p.image(textureGuiTriangleAmountDisplay, 0, - RADIUSSHOWAMOUNT + PIE_WEIGHT / 2 , SIZE_TRIANGLE_AMOUNT_DISPLAY, SIZE_TRIANGLE_AMOUNT_DISPLAY);
        p.pop()
        }
    }
}

return TrackedDevice;

}

export default trackedDevice;