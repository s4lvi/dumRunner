class Camera {
    constructor(pos) {
        this.fov = 75
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
        tiles.sort(function (a,b) {
            let aC = a.getCenter();
            let bC = b.getCenter();
            return dist(cam.pos.x, cam.pos.y, aC.x, aC.y) - dist(cam.pos.x, cam.pos.y, bC.x, bC.y);
        })
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

    cast(objects) {
        let scene = []
        stroke(0,0,255)
        ellipse(this.pos.x, this.pos.y, 8)
        objects.sort(function (a,b) {
            let centerpointA = [(a.a.x+a.b.x)/2,(a.a.y+a.b.y)/2];
            let centerpointB = [(b.a.x+b.b.x)/2,(b.a.y+b.b.y)/2];
            return dist(cam.pos.x, cam.pos.y, centerpointA[0], centerpointA[1]) -dist(cam.pos.x, cam.pos.y, centerpointB[0], centerpointB[1]);
            //if (cam.pos.y >= a.a.y) return dist(cam.pos.x, cam.pos.y, a.a.x + TILE_SIZE/2, a.a.y  + TILE_SIZE/2) - dist(cam.pos.x, cam.pos.y, b.a.x + TILE_SIZE/2, b.a.y  + TILE_SIZE/2);
            //else return dist(cam.pos.x, cam.pos.y, a.b.x + TILE_SIZE/2, a.b.y  + TILE_SIZE/2) - dist(cam.pos.x, cam.pos.y, b.b.x + TILE_SIZE/2, b.b.y  + TILE_SIZE/2);
        }) 
        for (let i = 0; i < this.rays.length; i++) {
            let pt = this.rays[i].cast(objects);
            if (pt) {
                stroke(0,255,0,50);
                let d = p5.Vector.dist(this.pos, pt[0]);
                const a = this.rays[i].d.heading() - this.heading;
                d *= cos(a);
                line(this.pos.x, this.pos.y, pt[0].x, pt[0].y);
                scene[i] = [d, pt[2], pt[3]];
            }
        }
        return scene;
    }

    compare(cam,boundary) {
        return dist(cam.pos.x, cam.pos.y, boundary.a.x, boundary.a.y)
    }
}