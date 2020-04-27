class WallTile {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
        this.walls = [
            new Boundary([pos[0], pos[1]], [pos[0], pos[1]+size]),
            new Boundary([pos[0], pos[1]], [pos[0]+size, pos[1]]),
            new Boundary([pos[0]+size, pos[1]], [pos[0]+size, pos[1]+size]),
            new Boundary([pos[0], pos[1]+size], [pos[0]+size, pos[1]+size]),
        ];
    }

    getBoundaries() {
        return this.walls;
    }

    collidesWith(point) {
        let left = this.pos[0];
        let right = this.pos[0] + this.size;
        let top = this.pos[1];
        let bottom = this.pos[1] + this.size;

        if (point[0] > left && point[0] < right + 1 && point[1] > top && point[1] < bottom+1) return true;
        return false;
    }
}
