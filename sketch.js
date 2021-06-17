// Starting states
var PLAY = 1;
var END = 0;
var gameState = PLAY;
// Ending states

var txt,fileLoaded;

var monkey , monkey_running;
var monkey2 , monkey_angry;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var backgroundImage;
var restart,restartImg;
var begin,beginImg;

var score=0;

function preload(){
  
  monkey_angry= loadImage ("end.png");
  monkey1Img=loadImage("left.png");
  monkey3Img=loadImage("right.png")
  
  backgroundImage = loadImage("forest.jpg");
  beginImg= loadImage("begin.png")
  restartImg= loadAnimation("Picture1.png","Picture2.png","Picture3.png","Picture4.png");  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  mangoImage = loadImage("mango.png");
  obstacleImage = loadImage("obstacle.png");

 
}



function setup() {
    createCanvas (700,450)
  
  background = createSprite(0,0,700,450);
  background.addImage(backgroundImage);
  background.scale = 1.5;
  
  restart= createSprite(350,225,700,450);
  restart.addAnimation("restartImg",restartImg);
  restart.scale = 0.4;
  
  begin= createSprite(160,240,700,450);
  begin.addAnimation("beginImg",beginImg);
  begin.scale = 0.7;
  
  monkey = createSprite (90,400, 20, 20)
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.addAnimation("end",monkey_angry)
  monkey.scale = 0.19;
  

 
  ground = createSprite(100,420,700,20);
  ground.x = ground.width /2;
  ground.visible = false;
  
  restart.visible = false;
  
//   Monkeys
  


  
  begin.visible = false;
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  mangoGroup = createGroup();
  
  
  
}


function draw() {
  

  
   monkey.collide(ground); 
  
  if (gameState===PLAY){
   background.velocityX = -3; 
    
  monkey.velocityY = monkey.velocityY + 0.6
    
    if (background.x < 0){
      background.x = background.width/2;
    }
  
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnObstacles();
    spawnBanana();
    spawnMango();
  
   if(keyDown("space") && monkey.y >= 250) {
        monkey.velocityY = -18;
    }
  }
  
    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score + 1;
    }
    if (mangoGroup.isTouching(monkey)){
      mangoGroup.destroyEach();
      score = score + 1;
    }

  
  
  if (obstaclesGroup.isTouching(monkey)) {
      gameState=END
      
  } else if(gameState===END){
    monkey.y = 235;
    monkey.scale = 0.5;
    monkey.x=350;
    monkey.y=350;
    background.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    mangoGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    mangoGroup.setLifetimeEach(-1);
    monkey.changeAnimation("end", monkey_angry);
    restart.addAnimation("restartImg",restartImg);
    begin.addAnimation("beginImg",beginImg);
    restart.visible = true;
    begin.visible = true;



    
     
}

  
drawSprites();
  
    fill("white")
    textSize(40)
 text("Score: "+ score, 500,50);
    fill("black")
  
    if(mousePressedOver(restart) && gameState===END)
  { 
    reset();
  }

}

function reset()
{
  gameState=PLAY
  score=0
  monkey.x=90
  monkey.y=400
  obstaclesGroup.destroyEach()
  bananaGroup.destroyEach()
  mangoGroup.destroyEach()
  monkey.changeAnimation("monkey_running", monkey_running);
  monkey.scale = 0.19;
  restart.visible=false
  begin.visible=false
}

function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(500,370,20,20);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -(6 + 3*score/5);
   
    //generate random obstacles
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
     obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth - 1;
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.25;
    obstacle.lifetime = 500;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
  
  
  
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -(6 + 3*score/5);
    
     //assign lifetime to the variable
    banana.lifetime = 500;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
   bananaGroup.add(banana);
    }
}

function spawnMango() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    mango = createSprite(700,300,40,10);
    mango.y = Math.round(random(100,200));
    mango.addImage(mangoImage);
    mango.scale = 0.4;
    mango.velocityX = -(6 + 3*score/5);
    
     //assign lifetime to the variable
    mango.lifetime = 500;
    
    //adjust the depth
    mango.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
   mangoGroup.add(mango);
    }
}