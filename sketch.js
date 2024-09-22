let flock = new Flock();

let snakeLength = 8;
let snakeSize = 30;
let snakeShrinkFactor = 0.8;

//--------------------------------------------

function setup() {
  createCanvas(800, 800);
  background(0);
  stroke(1);
  strokeWeight(1);

  for (let i = 0; i < 100; i++) {
    let b = new Boid(width / 2, height / 2);
    flock.addBoid(b);
  }
}

function draw() {
  background(0);
  flock.run();
}