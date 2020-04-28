class Sprite {
    constructor(image) {
        this.image = image;
        this.pixelRows = [];
        for (let i = 0; i < this.image.width*2; i++) {
            this.pixelRows[i] = this.image.get(i, 0, 1, 32);
        }
        this.heading = p5.Vector.fromAngle(radians(0));
        this.pos = createVector(0,0);
    }

    setPos(x,y) {
        this.pos = creaetVector(x,y);
    }

    getPixelRow(i) {
        while (i >= this.image.width){
            i -= this.image.width;
        }
        return this.pixelRows[i];
    }

    getPixelRowShaded(i, v) {
        while (i >= this.image.width){
            i -= this.image.width;
        }
    
        return this.pixelRows[i] * v;
    }
}