let snake;

let snakeLength = 8;
let snakeSize = 30;
let snakeShrinkFactor = 0.8;

//--------------------------------------------

function setup() {
  createCanvas(800, 800);
  background(0);
  noFill();
  stroke(255);
  strokeWeight(2);
  snake = new Snake(8, 30, 0.8);
}

function draw() {
  background(0);
  snake.moveTo(mouseX, mouseY);
  snake.bodyMove();
  snake.draw();
}