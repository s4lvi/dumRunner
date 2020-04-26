let walls;
let ray;
let camera;

let width = 600;
let height = 600;

function setup() {
    cam = new Camera();
    createCanvas(width, height);
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
    background(20);
    cam.cast(walls);
    for (wall of walls) {
        wall.show();
    }
    cam.changePos(mouseX, mouseY);
    // let pt = ray.cast(wall);
    // if (pt) {
    //     fill(255);
    //     ellipse(pt.x, pt.y, 8, 8);
    // }
    // ray.show();
}