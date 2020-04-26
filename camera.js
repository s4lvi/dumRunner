class Camera {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        this.heading = 0;
        for (let a = -1; a < 2; a += 1) {
            this.rays.push(new Ray([this.pos.x, this.pos.y], a));
        }
    }

    changePos(x,y) {
        this.pos.x = x;
        this.pos.y = y;
        this.updateRays();
    }

    move(v) {
        self.pos.x = self.pos.x + Sin
    }

    updateRays() {
        for (ray of this.rays) {
            ray.p.x = this.pos.x;
            ray.p.y = this.pos.y;
        }
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
    }

    cast(walls) {
        console.log("Cast");
        for (ray of this.rays) {
            let pt = ray.cast(walls);
            if (pt) {
                stroke(255, 50);
                line(this.pos.x, this.pos.y, pt.x, pt.y);
            }
        }
    }
}