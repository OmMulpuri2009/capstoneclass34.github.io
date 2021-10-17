class Car {
    constructor(x, y, width, height, carPos) {
    
     
      this.body = Bodies.rectangle(x, y, width, height);
      this.width = width;
      this.height = height;
  
      this.carPosition = carPos;
      this.isBroken = false;
  
      World.add(world, this.body);
    }
    
  
    remove(index) {
      this.width = 300;
      this.height = 300;
      this.isBroken = true;
      setTimeout(() => {
        Matter.World.remove(world, cars[index].body);
        delete cars[index];
      }, 2000);
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
      
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image( 0, this.carPosition, this.width, this.height);
      pop();
    }
  }