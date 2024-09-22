class Flock {
    constructor() {
      // Initialize the array of boids
      this.boids = [];
    }
  
    run() {
      for (let boid of this.boids) {
        // Pass the entire list of boids to each boid individually
        boid.run(this.boids);
      }
    }
  
    addBoid(b) {
      this.boids.push(b);
    }
  }