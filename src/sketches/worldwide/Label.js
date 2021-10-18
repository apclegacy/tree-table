const label = (p) => {

class Label {
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
        this.opacity = map(this.count,0,30,0,255)
        if(!this.labelOff){
            this.show()
        }

        this.oldRotation = this.rotation

    }

    show(){
        // mapping the rotation of the tracked device to the position of the text array
        // if rotation 120
        let txtContent =[
            "I'M A PROTOTYPE FOR TANGIBLE INTERACTION AND DATA VISUALIZATION",
            "MOVE ME AROUND TO EXPLORE MY AFFORDANCES!",
            "STUDENTS FROM INTERACTION DESIGN USE ME TO EXPLORE THEIR CONCEPTS",
            "DESIGN ... TECHNOLOGY ... THINKING ... CONCEIVING ...  DOING ...  ",
            "PROTOTYPING"
        ]
        let peak = 10


        let offX=120
        let offY=0
        P.push()
        P.strokeWeight(5)
        P.stroke(255,255,100,this.opacity)
        // fill(100,0,0,this.opacity)
        P.noFill()
        P.translate(this.x,this.y)
        P.rotate(radians(this.rotation))
        P.beginShape()
        P.vertex(offX,offY)
        P.vertex(offX+peak, offY-peak)
        P.vertex(offX+peak,offY-this.size/3)
        P.vertex(offX+peak+this.size, offY-this.size/3)
        P.vertex(offX+peak+this.size,offY+this.size/3)
        P.vertex(offX+peak, offY+this.size/3)
        P.vertex(offX+peak,offY+peak)
        P.endShape(p.CLOSE)
        P.textSize(16)
        P.fill(255,255,100,this.opacity)
        P.textAlign(p.CENTER,p.CENTER)
        P.text(txtContent[p.int(p.map(this.rotation,1,360,-1,4))],offX +30 , offY - this.size/4, this.size-25, this.size/2 )
        P.pop()

    }
}

return { Label };

}

export default label;