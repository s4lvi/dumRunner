class Sprite {
    constructor(image) {
        this.image = image;
        this.pixelRows = [];
        for (let i = 0; i < this.image.width*2; i++) {
            this.pixelRows[i] = this.image.get(i, 0, 1, 32);
        }
    }

    getPixelRow(i) {
        while (i >= this.image.width){
            i -= this.image.width;
        }
        return this.pixelRows[i];
    }
}