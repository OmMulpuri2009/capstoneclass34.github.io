const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, helicopter;
var bullets = [];
var car = [];
var score = 0;
var Helipad;
var road;




function preload() {
  HelipadImg = loadImage("Helipad.jpg");
  bulletImg=loadImage("bullet.jpg")
  backgroundImg=loadImage("road.jpg")
 }

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  


  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  Helipad = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, Helipad);

  car= new Car(180, 110, 130, 100, angle);
 }

 

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
 
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  push();
  translate(Helipad.position.x, Helipad.position.y);
  imageMode(CENTER);
  image(HelipadImg, 0, 0, 160, 310);
  pop();

  showCar();

  for (var i = 0; i < balls.length; i++) {
    showBullets(bullets[i], i);
    collisionWithBullets(i);
  }

  bullet.display();

  
}

function collisionWithCar(index) {
  for (var i = 0; i < car.length; i++) {
    if (bullets[index] !== undefined && car[i] !== undefined) {
      var collision = Matter.SAT.collides(bullets[index].body, cars[i].body);

      if (collision.collided) {
          cars[i].remove(i);
        

        Matter.World.remove(world, bullets[index].body);
        delete bullets[index];
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var helicopter = new bullet(helicopter.x, Helicopter.y);
    bullet.trajectory = [];
    Matter.Body.setAngle(helicopter.body, helicopter.angle);
    bullets.push(bullet);
  }
}

function showBullets(ball, index) {
  if (bullet) {
    bullet.display();
    
    
  }
}

function showCar() {
  if (car.length > 0) {
    if (
      car[car.length - 1] === undefined ||
      car[car.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var car = new car(
        width,
        height - 100,
        170,
        170,
        position
      );

      cars.push(car);
    }

    for (var i = 0; i < cars.length; i++) {
      if (cars[i]) {
        Matter.Body.setVelocity(cars[i].body, {
          x: -0.9,
          y: 0
        });

        cars[i].display();
        
        
    }
    }
  } else {
    var car = new car(width, height - 60, 170, 170, -60);
    cars.push(car);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    cars[cars.length - 1].shoot();
  }
}