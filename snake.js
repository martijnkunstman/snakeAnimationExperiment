class Snake {
    //settable
    lenght = 8;
    size = 30;
    shrinkFactor = 0.8;
    //private
    speed = 0;
    bodyParts = [];
    maxSpeed = 10;
    velocity = { x: 0, y: 0 };
    damping = 0.05;
  
    constructor(length, size, shrinkFactor) {
      this.lenght = length;
      this.size = size;
      this.shrinkFactor = shrinkFactor;
      this.createBodyParts();
    }
    createBodyParts() {
      let size = this.size;
      for (let i = 0; i < this.lenght; i++) {
        this.bodyParts.push({ x: 0 + size, y: 0 + size, size: size });
        size = size * this.shrinkFactor;
      }
    }
    moveTo(targetX, targetY) {
      let newVelocity = createVector(targetX - this.bodyParts[0].x, targetY - this.bodyParts[0].y);
      //set magnitude to maxSpeed
      if (newVelocity.mag() > this.maxSpeed) {
        newVelocity.setMag(this.maxSpeed);
      }
      //newVelocity.setMag(this.maxSpeed);
      //set velocity to new velocity with damping
      this.velocity.x += (newVelocity.x - this.velocity.x) * this.damping;
      this.velocity.y += (newVelocity.y - this.velocity.y) * this.damping;
      //move head
      this.bodyParts[0].x += this.velocity.x;
      this.bodyParts[0].y += this.velocity.y;
    }
  
    bodyMove() {
      for (let i = 0; i < this.bodyParts.length - 1; i++) {
        let dx = this.bodyParts[i + 1].x - this.bodyParts[i].x;
        let dy = this.bodyParts[i + 1].y - this.bodyParts[i].y;
        let angle = atan2(dy, dx);
        this.speed = mag(this.velocity.x, this.velocity.y);
        let x = this.bodyParts[i].x + cos(angle) * this.bodyParts[i].size * (this.speed/this.maxSpeed);
        let y = this.bodyParts[i].y + sin(angle) * this.bodyParts[i].size * (this.speed/this.maxSpeed);
        this.bodyParts[i + 1].x = x;
        this.bodyParts[i + 1].y = y;
      }
    }
    draw() {
      for (let i = 0; i < this.bodyParts.length; i++) {
        circle(this.bodyParts[i].x, this.bodyParts[i].y, this.bodyParts[i].size);
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
  }