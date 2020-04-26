let walls;
let ray;
let camera;

let width = 600;
let height = 400;
const scene = [];

function setup() {
    cam = new Camera();
    createCanvas(width*2, height);
    walls = [];
    walls.push(new Boundary([0,0], [0,height]))
    walls.push(new Boundary([0,0], [width,0]))
    walls.push(new Boundary([width,0], [width,height]))
    walls.push(new Boundary([0,height], [width,height]))
    for (let i = 0; i < 5; i++) {
         walls.push(new Boundary([Math.random() * width, Math.random() * height],[Math.random() * width, Math.random() * height]));
    }
}

  
function draw() {

    if (keyIsDown(LEFT_ARROW)) {
        cam.rotate(-0.05);
    } else if (keyIsDown(RIGHT_ARROW)) {
        cam.rotate(0.05);
    }
    if (keyIsDown(UP_ARROW)) {
        cam.move(1);
    } else if (keyIsDown(DOWN_ARROW)) {
        cam.move(-1);
    }

    background(20);
    const scene = cam.cast(walls);
    const w = width / scene.length;
    for (wall of walls) {
        wall.show();
    }


    push();
    translate(width, 0);
    for (let i = 0; i < scene.length; i++) {
        noStroke();
        const sq = scene[i]*scene[i];
        const wSq = width * width;
        const hSq = height * height;
        const b = map(sq, 0, wSq, 255, 0);
        const h = map(scene[i], 0, width, height, 0);
        fill(b);
        rectMode(CENTER);
        rect(i*w + w / 2, height / 2, w, h);
    }
    pop();

    //cam.changePos(mouseX, mouseY);
}