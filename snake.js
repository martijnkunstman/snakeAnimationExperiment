class Snake {
  //settable
  lenght = 10;
  size = 40;
  shrinkFactor = 0.85;
  //private
  speed = 0;
  bodyParts = [];
  maxSpeed = 10;
  velocity = { x: 0, y: 0, z: 0 };
  damping = 0.05;

  constructor(length, size, shrinkFactor, x, y, z) {
    this.lenght = length;
    this.size = size;
    this.shrinkFactor = shrinkFactor;
    this.createBodyParts(x, y, z);
  }

  createBodyParts(x, y, z) {
    let size = this.size;
    for (let i = 0; i < this.lenght; i++) {
      this.bodyParts.push({ x: x, y: y, z: z, size: size });
      size = size * this.shrinkFactor;
    }
  }

  moveTo(targetX, targetY, targetZ) {
    let newVelocity = createVector(
      targetX - this.bodyParts[0].x,
      targetY - this.bodyParts[0].y,
      targetZ - this.bodyParts[0].z
    );
    //set magnitude to maxSpeed
    if (newVelocity.mag() > this.maxSpeed) {
      newVelocity.setMag(this.maxSpeed);
    }
    //newVelocity.setMag(this.maxSpeed);
    //set velocity to new velocity with damping
    this.velocity.x += (newVelocity.x - this.velocity.x) * this.damping;
    this.velocity.y += (newVelocity.y - this.velocity.y) * this.damping;
    this.velocity.z += (newVelocity.z - this.velocity.z) * this.damping;
    //move head
    this.bodyParts[0].x += this.velocity.x;
    this.bodyParts[0].y += this.velocity.y;
    this.bodyParts[0].z += this.velocity.z;
  }

  bodyMove() {
    for (let i = 0; i < this.bodyParts.length - 1; i++) {
      let dx = this.bodyParts[i + 1].x - this.bodyParts[i].x;
      let dy = this.bodyParts[i + 1].y - this.bodyParts[i].y;
      let angle = atan2(dy, dx);
      this.speed = mag(this.velocity.x, this.velocity.y);
      let x =
        this.bodyParts[i].x +
        cos(angle) * this.bodyParts[i].size * 2 * (this.speed / this.maxSpeed);
      let y =
        this.bodyParts[i].y +
        sin(angle) * this.bodyParts[i].size * 2 * (this.speed / this.maxSpeed);
      this.bodyParts[i + 1].x = x;
      this.bodyParts[i + 1].y = y;
    }
  }

  draw() {
    for (let i = this.bodyParts.length - 1; i >= 0; i--) {
      //(255-i/(this.bodyParts.length-2)*255);
      //circle(this.bodyParts[i].x, this.bodyParts[i].y, this.bodyParts[i].size);

      strokeWeight(this.bodyParts[i].size / 2);
      //stroke(255-i/(this.bodyParts.length-2)*255,0.5);
      stroke(
        "rgba(255, 255, 255, " + (1 - i / this.bodyParts.length) / 1.2 + ")"
      );
      if (i < this.bodyParts.length - 1) {
        line(
          this.bodyParts[i].x,
          this.bodyParts[i].y,
          this.bodyParts[i + 1].x,
          this.bodyParts[i + 1].y
        );
      }
    }
  }

  tick(x, y) {
    this.moveTo(x, y);
    this.bodyMove();
    this.draw();
  }
}
