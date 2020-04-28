class MapLoader {
    constructor() {
        this.walls = [];
        this.tiles = [];
    }

    loadMapFromFile(fileUrl) {

    }

    loadRandomMap(size, types) {
        //let tilemap = [];
        for (let i = 0; i < size; i++) {
            let isCenterTile = true;
            let randX, randY, tilepos;
            //while (isCenterTile == true || tilepos in tilemap) {
            while (isCenterTile == true) {
                randX = int(Math.random() * floor(width/TILE_SIZE));
                randY = int(Math.random() * floor(height/TILE_SIZE));
                //tilepos = randX + '' + randY;
                isCenterTile = checkCenterTile(randX, randY);
            }
            let b = new WallTile([randX*TILE_SIZE, randY*TILE_SIZE], TILE_SIZE, types[Math.floor(Math.random() * types.length)]);
            this.walls = this.walls.concat(b.getBoundaries());
            this.tiles.push(b);
            //tilemap.push(tilepos);
        }
    }
}