var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleClimbersGroup, invisibleClimber;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
    
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;
  
  ghost = createSprite(300,300);
  ghost.addImage("ghostr" , ghostImg);
  ghost.scale = 0.4;
  
  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleClimbersGroup = new Group();
}

function draw() {
  background(200);
  
  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
   }
   ghost.velocityX = 0;
 
   if(keyDown("up")){
     ghost.velocityY = -5
   }
   if(keyDown("right")){
     ghost.x = ghost.x+2
   }
   if(keyDown(LEFT_ARROW)){
     ghost.velocityX = -2
   }
   
   ghost.velocityY += 0.5
   spawnDoors();

    ghost.collide(climbersGroup);

    if(ghost.isTouching(invisibleClimbersGroup) || ghost.y > 600){
      gameState = "end"
    }
    drawSprites();
  }
  else if(gameState === "end"){
    tower.velocityY = 0;
    ghost.destroy();
    
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    invisibleClimbersGroup.destroyEach();
  }
 }

 function spawnDoors(){
  var ran = Math.round(random(100,500))
  if(frameCount%160 === 0){
  door = createSprite(ran,-70);
  door.addImage("door" , doorImg);
  door.velocityY = 2;
  doorsGroup.add(door);
  door.lifetime = 300;
  
  climber = createSprite(ran,0);
  climber.addImage("climber" , climberImg);
  climber.scale = 0.9
  climber.velocityY = 2;
  climber.lifetime = 300;
  climbersGroup.add(climber);
  
  invisibleClimber = createSprite(ran,5,climber.width,10);
  invisibleClimber.visible = false;
  invisibleClimber.velocityY = 2;
  invisibleClimber.lifetime = 300;
  invisibleClimbersGroup.add(invisibleClimber);

  door.depth = ghost.depth
  ghost.depth += 1
  }
}
