class Bullet {
    constructor(x, y) {
      var options = {
        isStatic: true
      };
      this.r = 30;
      this.speed = 0.05;
      this.image = loadImage("bullet.png");
      this.trajectory = [];
      World.add(world, this.body);
    }
  
   
  
  
    shoot() {
       var newAngle = helicopter.angle - 28;
      newAngle = newAngle *(3.14/180)
      var velocity = p5.Vector.fromAngle(newAngle);
      velocity.mult(0.5);
      Matter.Body.setStatic(this.body, false);
      Matter.Body.setVelocity(this.body, {
        x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)});
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
    
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      pop();
  
      if (this.body.velocity.x > 0 && pos.x > 10 ) {
        var position = [pos.x, pos.y];
        this.trajectory.push(position);
      }
  
      for (var i = 0; i < this.trajectory.length; i++) {
        image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
      }
    }
  }