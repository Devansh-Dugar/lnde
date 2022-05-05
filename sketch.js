let ground;
let lander;
var lander_img;
var bg_img;
var thrust;
var rcs_left;
var rcs_right;
var obstacles;
var fuelImg;
var fuels ;
var finishImg;
var finish;

var GameState=0;
var vx = 0;
var vy = 0;
var g = 0.05;
var fuel = 100;

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
  crash= loadAnimation("crash1.png","crash2.png","crash3.png");
  land = loadAnimation("landing1.png" ,"landing2.png","landing_3.png");
  rcs_left = loadAnimation("left_thruster_1.png","left_thruster_2.png");
  normal = loadAnimation("normal.png");
  rcs_right = loadAnimation("right_thruster_1.png","right_thruster_2.png");
  obstaclesImg = loadImage("obstacle.png") 
  fuelImg = loadImage("fuel.png") 
  finishImg = loadImage("finish.png") 


  thrust.playing= true;
  thrust.looping= false;
  rcs_left.looping = false;
  rcs_right.looping = false;
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
  timer = 1500;

  thrust.frameDelay = 5;
  rcs_left.frameDelay = 5;
  rcs_right.frameDelay = 5;

  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;

  finish = createSprite(910,200)
  finish.addImage(finishImg);
  finish.scale = 0.16

  //lander.addAnimation('thrust',"b_thrust_1.png","b_thrust_2.png","b_thrust_3.png" );
  lander.addAnimation('thrusting',thrust);
  lander.addAnimation('left',rcs_left);
  lander.addAnimation('normal',normal);
  lander.addAnimation('right',rcs_right);

  ground = createSprite(500,690,1000,20);

  obstacleGroup = createGroup()
  fuelGroup = createGroup()

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  if(GameState==0){
    background(51);
    image(bg_img,0,0);
    
    push()
    fill(255);
    text("Horizontal Velocity: " +round(vx,2),800,50);
    text("Fuel: "+fuel,800,25);
    text("Vertical Velocity: "+round(vy),800,75);
    pop();
  
    //fall down
    vy +=g;
    lander.position.y+=vy;
    lander.position.x +=vx;
  
    if(fuelGroup.isTouching(lander)){
      fuel = 100
      fuelGroup.destroyEach()
  }
  
  if(finish.isTouching(lander)){
    GameState = 1
}

/*if(obstacleGroup.isTouching(lander)){
  obstacleGroup.destroyEach()
  GameState = 2
}*/

    obstacleSpawn()
    //fuelSpawn()
  }
  /*if(GameState==1){
    push()
    fill(255);
    textSize(100)
    text("You Win",300,300);
    pop();
    fuelGroup.destroyEach()
    obstacleGroup.destroyEach()
    lander.destroy()
  } 
  if (GameState==2) {
    push()
    fill(255);
    textSize(100)
    text("You Lose",300,300);
    pop();
    fuelGroup.destroyEach()
    obstacleGroup.destroyEach()
    lander.destroy()
  }*/
  drawSprites();
}

function keyPressed()
{
  if(keyCode==UP_ARROW && fuel>0)
  {
    upward_thrust();
    lander.changeAnimation('thrusting');
    thrust.nextFrame();
    
  }
  if(keyCode==RIGHT_ARROW && fuel>0)
  {
    lander.changeAnimation('right');
    right_thrust();
  }

  if(keyCode==LEFT_ARROW && fuel>0)
  {
    lander.changeAnimation('left');
    left_thrust();
  }

  
}

function upward_thrust()
{
  vy = -1;
  fuel-=1;
}

function right_thrust()
{ 
  vx -= 0.2;
  fuel -=1;
}

function left_thrust()
{
  vx += 0.2;
  fuel-=1;
}

function obstacleSpawn()
{
  if(frameCount%150==0){
   obstacles = createSprite(1000,lander.y)
   obstacles.velocityX = -4
   obstacles.addImage('shfgivk',obstaclesImg)
   obstacles.scale = 0.2
   obstacleGroup.add(obstacles);
  }
 
}

/*function fuelSpawn()
{
  if(frameCount%400==0){
   fuels = createSprite(0,lander.x)
   fuels.velocityX = 2
   fuels.addImage('shfgivk',fuelImg)
   fuels.scale = 0.2
   fuelGroup.add(fuels);
  }
 
}*/