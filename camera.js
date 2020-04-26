class Camera {
    constructor() {
        this.fov = 45
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        this.heading = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += 0.5) {
            this.rays.push(new Ray([this.pos.x, this.pos.y], a));
        }
    }

    changePos(x,y) {
        this.pos.x = x;
        this.pos.y = y;
        this.updateRays();
    }

    move(v) {
        this.pos.x = this.pos.x + cos(this.heading) * v;
        this.pos.y = this.pos.y + sin(this.heading) * v;
        this.updateRays();
    }

    rotate(angle) {
        this.heading += angle;
        let i = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += 0.5) {
            this.rays[i].setAngle(radians(a) + this.heading);
            i++;
        }
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
        let scene = []
        for (let i = 0; i < this.rays.length; i++) {
            let pt = this.rays[i].cast(walls);
            if (pt) {
                stroke(255, 50);
                line(this.pos.x, this.pos.y, pt[0].x, pt[0].y);
                scene[i] = pt[1];
            }
        }
        return scene;
    }
}