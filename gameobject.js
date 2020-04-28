class GameObject {
    constructor(x,y,type, sprite) {
        this.pos = createVector(x,y);
        this.type = type;
        this.heading = 0;
        this.sprite = sprite;
    }

    show(scene) {
        
    }
}