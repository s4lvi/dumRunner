let walls;
let ray;
let camera;
let tiles;

const Y_AXIS = 1;
const X_AXIS = 2;
const SPEED = 0.5;
let width = 640;
let height = width;
const scene = [];
const TILE_SIZE = 16;
const MAP_SIZE = 40;
let mapWidth = TILE_SIZE * MAP_SIZE;
let mapHeight = mapWidth;
let border;
let tileTypes;
let wallTexture;

function preload() {
    wallTexture = loadImage('wall.jpg');
  }

function setup() {
    cam = new Camera([mapWidth/2 + TILE_SIZE/2, mapHeight/2 + TILE_SIZE/2]);
    createCanvas(width*2, height);
    walls = [];
    tiles = [];
    border = new WallTile([0,0], width);
    // walls.push(new Boundary([0,0], [0,height]))
    // walls.push(new Boundary([0,0], [width,0]))
    // walls.push(new Boundary([width,0], [width,height]))
    // walls.push(new Boundary([0,height], [width,height]))
    walls = walls.concat(border.getBoundaries());
    for (let i = 0; i < 500; i++) {
        let isCenterTile = true;
        let randX, randY;
        while (isCenterTile == true) {
            randX = int(Math.random() * floor(width/TILE_SIZE));
            randY = int(Math.random() * floor(height/TILE_SIZE));
            isCenterTile = checkCenterTile(randX, randY);
        }
        let b = new WallTile([randX*TILE_SIZE, randY*TILE_SIZE], TILE_SIZE);
        walls = walls.concat(b.getBoundaries());
        tiles.push(b);
    }
    tileTypes = {
        "boundary": new Sprite(wallTexture)
    }

}

function checkCenterTile(x, y) {
    let centerX =  MAP_SIZE/2;
    let centerY =  MAP_SIZE/2;
    let midTiles = [
        [centerX, centerY],
        [centerX+1, centerY],
        [centerX-1, centerY],
        [centerX, centerY+1],
        [centerX+1, centerY+1],
        [centerX-1, centerY+1],
        [centerX, centerY-1],
        [centerX+1, centerY-1],
        [centerX-1, centerY-1],
    ];
    for (let tile of midTiles) {
        if (tile[0] == x && tile[1] ==y) return true;
    }
    return false;
}

  
function draw() {

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        cam.rotate(-0.05);
    } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        cam.rotate(0.05);
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        if (cam.canMove(SPEED, tiles) && !cam.canMove(SPEED, [border])) cam.move(SPEED);
    } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        if (cam.canMove(-SPEED, tiles) && !cam.canMove(-SPEED, [border])) cam.move(-SPEED);
    }

    background(20);
    setGradient(width,0,width,height/2,color(180),color(0),Y_AXIS);
    setGradient(width,height/2,width,height,color(0),color(180),Y_AXIS);

    const scene = cam.cast(walls);
    const w = width / scene.length;
    for (wall of walls) {
        wall.show();
    }


    push();
    translate(width, 0);
    for (let i = 0; i < scene.length; i++) {
        noStroke();
        const sq = 1/(scene[i][0]);
        const b = map(sq*12, 0, 1, 0, 220);
        const h = map(height/scene[i][0]*5, 0, width, 0, height);
        //fill(b);
        //rectMode(CENTER);
        let pixelRow = tileTypes[scene[i][2]].getPixelRow(scene[i][1]);
        //if (b) opacity(b);
        //else opacity(0);
        noSmooth();
        try {
            image(pixelRow, i * w + w / 2 -1, height/2-h/2, w, h);
        } catch(err) {
            console.log(err);
        }
        //rect(i * w + w / 2 + 1, height / 2, w+1, h);
    }
    pop();

    //cam.changePos(mouseX, mouseY);
}

function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
  
    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
  }
  