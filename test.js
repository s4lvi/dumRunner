let walls;
let ray;
let camera;
let tiles;

const Y_AXIS = 1;
const X_AXIS = 2;
const SPEED = 0.5;
let mapWidth = 32*20;
let mapHeight = mapWidth;
let width = 640;
let height = width;
const scene = [];
const TILE_SIZE = 16;
let border;
function setup() {
    cam = new Camera();
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
        let randX = int(Math.random() * floor(width/TILE_SIZE));
        let randY = int(Math.random() * floor(height/TILE_SIZE));
        let b = new WallTile([randX*TILE_SIZE, randY*TILE_SIZE], TILE_SIZE);
        walls = walls.concat(b.getBoundaries());
        tiles.push(b);
    }
}

  
function draw() {

    if (keyIsDown(LEFT_ARROW)) {
        cam.rotate(-0.05);
    } else if (keyIsDown(RIGHT_ARROW)) {
        cam.rotate(0.05);
    }
    if (keyIsDown(UP_ARROW)) {
        if (cam.canMove(SPEED, tiles) && !cam.canMove(SPEED, [border])) cam.move(SPEED);
    } else if (keyIsDown(DOWN_ARROW)) {
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
        const sq = 1/(scene[i]);
        const b = map(sq*12, 0, 1, 0, 220);
        const h = map(height/scene[i]*5, 0, width, 0, height);
        fill(b);
        rectMode(CENTER);
        rect(i * w + w / 2 + 1, height / 2, w+1, h);
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
  