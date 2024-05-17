class DrawElement {
    constructor(canvasNumber) {
        this.canvasNumber = canvasNumber
    }
}

export class Rect extends DrawElement {
    constructor(canvasNumber,x,y,width,height,color) {
        super(canvasNumber)
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.type = "rect"
    }
    draw(canvas,inputPacket) {
        let can = document.getElementById(canvas.id)
        let ctx = can.getContext("2d")
        //big brain scaing of rectangle
        ctx.rect((this.x*canvas.resolutionFactor),
        (this.y*canvas.resolutionFactor),
        (this.width*canvas.resolutionFactor),
        (this.height*canvas.resolutionFactor))
        ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`
        ctx.fill()
    }
}

export class Button extends Rect {
    constructor(canvasNumber,x,y,width,height,color,text) {
        super(canvasNumber,x,y,width,height,color)
        this.text = text
        this.type = "button"
    }
    draw(canvas,inputPacket) {
        let can = document.getElementById(canvas.id)
        let ctx = can.getContext("2d")
        ctx.fillStyle = "black"
        //big brain scaing of rectangle
        ctx.fillRect(((this.x-2)*canvas.resolutionFactor),
                ((this.y-2)*canvas.resolutionFactor),
                ((this.width+4)*canvas.resolutionFactor),
                ((this.height+4)*canvas.resolutionFactor))
        //set color
        ctx.fillStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`
        //change the appearance if it is being pressed
        if (inputPacket.mouseX > (this.x) + canvas.xRel * 1200 && 
            inputPacket.mouseY > (this.y) + canvas.yRel * 675 && 
            inputPacket.mouseX < (this.x) + (this.width) + canvas.xRel * 1200 && 
            inputPacket.mouseY < (this.y) + (this.height) + canvas.yRel * 675) {
            ctx.fillStyle = `rgb(${this.color[0]*0.75},${this.color[1]*0.75},${this.color[2]*0.75})`
        }
        ctx.fillRect((this.x*canvas.resolutionFactor),
                (this.y*canvas.resolutionFactor),
                (this.width*canvas.resolutionFactor),
                (this.height*canvas.resolutionFactor))
        //text location calculations go burrrr
        ctx.fillStyle = "black"
        //ctx.textBaseline = "middle"
        //ctx.textAlign = "center"
        //ctx.font = `${this.height*canvas.resolutionFactor * window.innerHeight/1000}px Verdana`
        /*ctx.fillText(this.text,(this.x*canvas.resolutionFactor)+(this.width/2)*canvas.resolutionFactor,
                            (this.y*canvas.resolutionFactor)+(this.height/2)*canvas.resolutionFactor,
                            (this.width*canvas.resolutionFactor))*/

        // Start with a large font size
        let fontSize = 100;
         // Set the font style
        ctx.font = fontSize + 'px Verdana';
        // Measure the text width and height
        let textWidth = ctx.measureText(this.text).width;
        let textHeight = fontSize; // Assuming constant height for simplicity

        // Reduce font size until it fits within the specified area
        while (textWidth > this.width || textHeight > this.height/1.5) {
            fontSize--;
            ctx.font = fontSize + 'px Verdana';
            textWidth = ctx.measureText(this.text).width;
            textHeight = fontSize;
        }

        // Calculate the position to center the text
        const textX = this.x + (this.width - textWidth) / 2;
        const textY = this.y + (this.height - textHeight) / 2 + fontSize * 0.8; // Adjust for baseline

        // Draw the text
        ctx.fillText(this.text, textX, textY);
    }
}

export class Sprite extends DrawElement {
    constructor(canvasNumber,x,y,scaleWidth,source) {
        super(canvasNumber)
        this.x = x
        this.y = y
        this.scaleWidth = scaleWidth
        this.source = source
    }
    draw(canvas,inputPacket) {
        let can = document.getElementById(canvas.id)
        let ctx = can.getContext("2d")
        let img = new Image()
        img.src = this.source
        ctx.drawImage(img, (this.x*canvas.resolutionFactor),
                        (this.y*canvas.resolutionFactor),
                        (this.scaleWidth*canvas.resolutionFactor),
                        (this.scaleWidth*canvas.resolutionFactor)*(img.height/img.width))
    }
}

export class Circle extends DrawElement {
    constructor(canvasNumber,x,y,radius,color) {
        super(canvasNumber)
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw(canvas,inputPacket) {
        let can = document.getElementById(canvas.id)
        let ctx = can.getContext("2d")
        ctx.beginPath();
        ctx.arc((this.x*canvas.resolutionFactor),
        (this.y*canvas.resolutionFactor),(this.radius*canvas.resolutionFactor), 0, 2 * Math.PI);
        ctx.fillStyle = 'rgb(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')'
        ctx.fill();
    }
}