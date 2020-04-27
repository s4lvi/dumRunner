let walls;
let ray;
let camera;
let tiles;

const Y_AXIS = 1;
const X_AXIS = 2;
const SPEED = 0.5;
let width = 320;
let height = width;
const scene = [];
const TILE_SIZE = 8;
const MAP_SIZE = 40;
let mapWidth = TILE_SIZE * MAP_SIZE;
let mapHeight = mapWidth;
let border;
let tileTypes;
let wallTexture, wall2Texture, outerTexture;
let lastMouseX;
let lastMouseY;
let wSize = width * 2;
let SHADING_TOGGLE = false;
let TEXTURE_TOGGLE = true;
let STROKE_TOGGLE = true;
let counter = 0;
let framecount = 0;
function preload() {
    wallTexture = loadImage('outer.jpg');
    wall2Texture = loadImage('wall2.jpg');
    outerTexture = loadImage('wall.jpg');
  }

function setup() {
    mapLoader = new MapLoader();
    cam = new Camera([mapWidth/2 + TILE_SIZE/2, mapHeight/2 + TILE_SIZE/2]);
    createCanvas(wSize*2, wSize);
    walls = [];
    tiles = [];
    tileTypes = {
        "wall1": new Sprite(wallTexture),
        "wall2": new Sprite(wall2Texture),
        "boundary": new Sprite(outerTexture)
    }
    mapLoader.loadRandomMap(400, Object.keys(tileTypes));
    border = new WallTile([0,0], width, "boundary");
    walls = walls.concat(border.getBoundaries());
    walls = walls.concat(mapLoader.walls);
    tiles = mapLoader.tiles;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
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

function keyPressed() {
    if (keyCode === SHIFT) {
        SHADING_TOGGLE = !SHADING_TOGGLE;
    } else if (keyCode === CONTROL) {
        TEXTURE_TOGGLE = !TEXTURE_TOGGLE;
    } 
}
  
function draw() {
    counter++;
    framecount += frameRate();
    if (counter == 100){

        console.log(framecount / 100);
        framecount = 0;
        counter = 0;
    }

    scale(2.0);
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        cam.rotate(-0.05);
    } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        cam.rotate(0.05);
    }
    // let rot = 1/(mouseX-lastMouseX) != Infinity ? 1/(mouseX-lastMouseX) : 0;
    // cam.rotate(rot);
    // console.log(mouseX);
    // console.log("rot", rot);

    lastMouseX = mouseX;
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        if (cam.canMove(SPEED, tiles) && !cam.canMove(SPEED, [border])) cam.move(SPEED);
    } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        if (cam.canMove(-SPEED, tiles) && !cam.canMove(-SPEED, [border])) cam.move(-SPEED);
    }

    background(20);
    setGradient(width,0,width,height/2,color(80),color(40),Y_AXIS);
    setGradient(width,height/2,width,height,color(80),color(120),Y_AXIS);

    const scene = cam.cast(walls);
    const w = width / scene.length;
    for (wall of walls) {
        wall.show();
    }


    push();
    translate(width, 0);
    for (let i = 0; i < scene.length; i++) {
        const sq = 1/(scene[i][0]);
        const b = map(sq*12, 0, 1, 0, 255);
        const h = map(height/scene[i][0]*5, 0, width, 0, height);
        if (SHADING_TOGGLE) {
            tint(b != Infinity ? b : 0);
        }
        if (STROKE_TOGGLE) { 
            noStroke(); 
        } 
        if (TEXTURE_TOGGLE) {
            let pixelRow = tileTypes[scene[i][2]].getPixelRow(scene[i][1]);
            noSmooth();
            try {
                image(pixelRow, i * w + w / 2 , height/2-h/2, w, h);
            } catch(err) {
                console.log(err);
            }
        } else {
            fill(b);
            rectMode(CENTER);
            rect(i * w + (w / 2) + 1, height / 2, w, h);
        }
    }
    pop();
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
  