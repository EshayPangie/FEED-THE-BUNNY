const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var backgroundImg;
var cutButton;
var rabbitImg;
var melon;
var rabbit_sprite;
var button;
var blinkAnimation;
var sadAnimation;
var eatAnimation;
var backgroundSound;
var rope_cutSound;
var airWavSound;
var eatingSound;
var sadWavSound;
var ctfSound;

function preload() {
  backgroundImg = loadImage("Images/background.png");
  blinkAnimation = loadAnimation(
    "Images/blink_1.png",
    "Images/blink_2.png",
    "Images/blink_3.png"
  );
  sadAnimation = loadAnimation(
    "Images/sad_1.png",
    "Images/sad_2.png",
    "Images/sad_3.png"
  );
  eatAnimation = loadAnimation(
    "Images/eat_1.png",
    "Images/eat_2.png",
    "Images/eat_3.png",
    "Images/eat_4.png",
    "Images/eat_5.png"
  );
  cutButton = loadImage("Images/cut_button.png");
  melon = loadImage("Images/melon.png");
  blinkAnimation.playing = true;
  eatAnimation.playing = true;
  sadAnimation.playing = true;
  sadAnimation.looping = false;
  eatAnimation.looping = false;

  backgroundSound = loadSound("Sounds/sound1.mp3");
  airWavSound = loadSound("Sounds/air.wav");
  rope_cutSound = loadSound("Sounds/rope_cut.mp3");
  sadWavSound = loadSound("Sounds/sad.wav");
  ctfSound = loadSound("Sounds/Cutting Through Foliage.mp3");
  eatingSound = loadSound("Sounds/eating_sound.mp3")
}

function setup() {
  createCanvas(500, 700);
  backgroundSound.play();
  backgroundSound.setVolume(0.5);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(250, 690, 500, 10);
  rope = new Rope(7, { x: 380, y: 30 });
  rope2 = new Rope(8, {x: 55, y: 40})
  rope3 = new Rope(7, {x: 380, y: 210})
  fruit = Bodies.circle(300, 300, 30);
  Matter.Composite.add(rope.body, fruit);
  connection = new Connection(rope.body, fruit);
  connection2 = new Connection(rope2.body, fruit);
  connection3 = new Connection(rope3.body, fruit);

  rabbit_sprite = createSprite(250, 560);
  rabbit_sprite.addAnimation("blinking", blinkAnimation);
  rabbit_sprite.addAnimation("sad", sadAnimation);
  rabbit_sprite.addAnimation("eating", eatAnimation);
  rabbit_sprite.changeAnimation("blinking", blinkAnimation);
  rabbit_sprite.scale = 0.2;
  button = createImg("Images/cut_button.png");
  button.position(370, 40);
  button.size(30, 30);
  button.mouseClicked(breakRope);

  button2 = createImg("Images/cut_button.png");
  button2.position(50, 40);
  button2.size(30, 30);
  button2.mouseClicked(breakRope2);

  button3 = createImg("Images/cut_button.png");
  button3.position(370, 210);
  button3.size(30, 30);
  button3.mouseClicked(breakRope3);

  var muteButton = createImg("Images/mute.png");
  muteButton.position(450, 40);
  muteButton.size(30, 30);
  muteButton.mouseClicked(playSound);

  // var balloonButton = createImg("Images/balloon.png")
  // balloonButton.position(50,270)
  // balloonButton.size(120,120)
  // balloonButton.mouseClicked(balloonClicked)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);
  ground.display();
  rope.show();
  rope2.show()
  rope3.show()
  imageMode(CENTER);

  if (fruit != null) {
    image(melon, fruit.position.x, fruit.position.y, 80, 80);
  }
  if (checkCollision(fruit, rabbit_sprite) === true) {
    rabbit_sprite.changeAnimation("eating", eatAnimation);
    backgroundSound.stop()

    eatingSound.stop()
  } 
  
if (checkCollision(fruit, ground.ground) === true) {
    console.log("ground touched")
    rabbit_sprite.changeAnimation("sad", sadAnimation);
    backgroundSound.stop()
  
  }

  drawSprites();
}

function breakRope() {
  rope.break();
  connection.detachFruit();
  connection = null;
}

function breakRope2() {
  rope2.break();
  connection2.detachFruit();
  connection2 = null;
}

function breakRope3() {
  rope3.break();
  connection3.detachFruit();
  connection3 = null;
}

function checkCollision(fruit, sprite) {
  if (fruit != null) {
    var d = dist(
      sprite.position.x,
      sprite.position.y,
      fruit.position.x,
      fruit.position.y
    );
    console.log(d)
    if (d <= 150) {
      World.remove(world, fruit);
      fruit = null;
      return true;
    } else {
      return false;
    }
  }
}

function playSound() {
  if (backgroundSound.isPlaying()) {
    backgroundSound.stop();
  } else {
    backgroundSound.play();
  }
}

function balloonClicked(){
  Matter.Body.applyForce(fruit,{x:0, y:0}, {x:0.01, y:0})
  airWavSound.play()
}