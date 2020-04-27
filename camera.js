class Camera {
    constructor(pos) {
        this.fov = 45
        this.pos = createVector(pos[0], pos[1]);
        this.rays = [];
        this.step = 0.5;
        this.heading = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.step) {
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

    canMove(v, tiles) {
        let x = this.pos.x + cos(this.heading) * v+1;
        let y = this.pos.y + sin(this.heading) * v+1;
        for (let t of tiles) {
            if (t.collidesWith([x,y])) return false
        }
        return true;
    }

    rotate(angle) {
        this.heading += angle;
        let i = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += this.step) {
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
        stroke(0,255,0)
        ellipse(this.pos.x, this.pos.y, 8)
        for (let i = 0; i < this.rays.length; i++) {
            let pt = this.rays[i].cast(walls);
            if (pt) {
                stroke(0,255,0,50);
                
                let d = p5.Vector.dist(this.pos, pt[0]);
                const a = this.rays[i].d.heading() - this.heading;
                d *= cos(a);
                line(this.pos.x, this.pos.y, pt[0].x, pt[0].y);
                scene[i] = d;
            }
        }
        return scene;
    }
}