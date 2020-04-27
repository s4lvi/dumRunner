class Ray {
    constructor(p, a) {
        this.p = createVector(p[0], p[1]);
        this.d = p5.Vector.fromAngle(radians(a));
    }

    lookAt(x, y) {
        this.d.x = x - this.p.x;
        this.d.y = y - this.p.y;
        this.d.normalize();
    }

    setAngle(angle) {
        this.d = p5.Vector.fromAngle(angle);
    }

    show() {
        stroke(255);
        push();
        translate(this.p.x, this.p.y);
        line(0, 0, this.d.x * 20, this.d.y * 20);
        pop();
    }

    cast(boundaries) {
        let collision = Infinity;
        let closest = null;
        let closestIndex = null;
        let closestType = null;
        for (let b of boundaries) {
            const x1 = b.a.x;
            const y1 = b.a.y;
            const x2 = b.b.x;
            const y2 = b.b.y;
    
            const x3 = this.p.x;
            const y3 = this.p.y;
    
            const x4 = this.p.x + this.d.x;
            const y4 = this.p.y + this.d.y;
    
            const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            
            if (den != 0) {
                const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
                const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
                if (t > 0 && t < 1 && u > 0) {
                    let pt = createVector();
                    pt.x = x1 + t * (x2 - x1);
                    pt.y = y1 + t * (y2 - y1);
                    let ptDist = dist(this.p.x, this.p.y, pt.x, pt.y);
                    if (ptDist < collision) {
                        collision = ptDist;
                        closest = pt;
                        closestIndex = floor(dist(pt.x, pt.y, x1, y1)*4);
                        closestType = b.type;
                    }
                }    
            }
        }
        if (closest) return [closest, collision, closestIndex, closestType];
        return;
    }
}