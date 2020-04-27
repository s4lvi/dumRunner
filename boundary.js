class Boundary {

    constructor(a, b, type) {
        this.a = createVector(a[0], a[1]);
        this.b = createVector(b[0], b[1]);
        this.type = type;
    }

    show() {
        stroke(0,255,0);
        push();
        line(this.a.x, this.a.y, this.b.x, this.b.y);
        pop();
    }
}