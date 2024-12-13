import Player from "./Player.js";
import Ground from "./Ground.js";
import Hills from "./Hills.js";
import Clouds from "./Clouds.js";
import ObstaclesController from "./ObstaclesController.js";
import Score from "./Score.js";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const GAME_SPEED_START = 1;
const GAME_SPEED_INCREMENT = .00001;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 250;
const PLAYER_WIDTH = 88 /1.5;
const PLAYER_HEIGHT = 94 / 1.5; 
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 324;
const GROUND_AND_OBSTACLE_SPEED = 0.5;

const OBSTACLES_CONFIG = [
  {width:270 /4, height: 258 / 4, image:"images/obstacles/1.png"},
  {width:184 /4, height: 195 / 4, image:"images/obstacles/2.png"},
  {width:149 /4, height: 299 / 4, image:"images/obstacles/3.png"},
  {width:159 /4, height: 326 / 4, image:"images/obstacles/4.png"},
 
]

//Game Object
let player = null; 
let ground = null;
let hills = null;
let clouds = null;
let obstaclesController = null;
let score = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
let waitingToStart = true;

function createSprites(){
  const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
  const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
  const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
  const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

  const groundWidthInGame = GROUND_WIDTH * scaleRatio;
  const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

  player = new Player(ctx, playerWidthInGame, playerHeightInGame,minJumpHeightInGame, maxJumpHeightInGame, scaleRatio)
  ground = new Ground(ctx, groundWidthInGame, groundHeightInGame,  GROUND_AND_OBSTACLE_SPEED, scaleRatio);
  hills = new Hills (ctx, groundWidthInGame, groundHeightInGame,  GROUND_AND_OBSTACLE_SPEED, scaleRatio);
  clouds = new Clouds (ctx, groundWidthInGame, groundHeightInGame,  GROUND_AND_OBSTACLE_SPEED, scaleRatio);

  
  const obstaclesImages = OBSTACLES_CONFIG.map(obstacle =>{
    const image = new Image();
    image.src = obstacle.image;
    return{
      image:image,
      width: obstacle.width * scaleRatio,
      height: obstacle.height * scaleRatio,
    };
  });
  obstaclesController = new ObstaclesController(ctx, obstaclesImages, scaleRatio, GROUND_AND_OBSTACLE_SPEED);
  score = new Score(ctx, scaleRatio);
}
function setScreen(){
  scaleRatio = getScaleRatio();
  canvas.width = GAME_WIDTH * scaleRatio;
  canvas.height = GAME_HEIGHT * scaleRatio;
  createSprites();
}

setScreen();
window.addEventListener('resize', ()=>setTimeout(setScreen, 500));

function getScaleRatio(){
  const screenHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
  const screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth)
  if(screenWidth / screenHeight < GAME_WIDTH/ GAME_HEIGHT){
    return screenWidth / GAME_WIDTH;
  } else{
    return screenHeight / GAME_HEIGHT;
  }
}
if(screen.orientation){
  screen.orientation.addEventListener('change', setScreen);
}
function showGameOver() {
  const fontSize = 70 * scaleRatio;
  ctx.font = `${fontSize}px Verdana`;
  ctx.fillStyle = "grey";
  const x = canvas.width / 4.5;
  const y = canvas.height / 2;
  ctx.fillText("GAME OVER", x, y);
}
function setupGameReset(){
  if(!hasAddedEventListenersForRestart){
    hasAddedEventListenersForRestart = true;

    setTimeout(()=>{
      
      window.addEventListener('keyup', reset, {once:true})
      window.addEventListener('touchstart', reset, {once:true})
    }, 1000)

  }
}
function reset(){
  hasAddedEventListenersForRestart = false;
  gameOver = false;
  waitingToStart = false;
  ground.reset();
  hills.reset(); 
  clouds.reset();
  obstaclesController.reset();
  score.reset();
  gameSpeed = GAME_SPEED_START;
}
function showStartGameText(){
  const fontSize = 40 * scaleRatio;
  ctx.font = `${fontSize}px Verdana`;
  ctx.fillStyle = "grey";
  const x = canvas.width / 14;
  const y = canvas.height / 2;
  ctx.fillText("Tap Screen or Press Space To Start", x, y);
}
function updateGameSpeed(frameTimeDelta){
  gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
}
function clearScreen(){
  ctx.fillStyle="white";
  ctx.fillRect (0,0, canvas.width, canvas.height)
}
function gameLoop(currentTime){
  if(previousTime === null){
    previousTime = currentTime;
    requestAnimationFrame(gameLoop);
    return;
  }
  const frameTimeDelta = currentTime - previousTime;
  previousTime = currentTime;
clearScreen();

if(!gameOver && !waitingToStart){
  // Update game objects
  clouds.update(gameSpeed, frameTimeDelta);
  hills.update(gameSpeed, frameTimeDelta);
  ground.update(gameSpeed, frameTimeDelta);
  obstaclesController.update(gameSpeed, frameTimeDelta);
  player.update(gameSpeed, frameTimeDelta);
  score.update(frameTimeDelta);
  updateGameSpeed(frameTimeDelta);

}
 if(!gameOver && obstaclesController.collideWith(player)){
  gameOver = true;
  setupGameReset();
  score.setHighScore();
}
if(waitingToStart){
  showStartGameText();
  // player.update(gameSpeed,frameTimeDelta, waitingToStart);
  player.stand(gameSpeed, frameTimeDelta );
}
//Draw game objects
clouds.draw();
hills.draw();
ground.draw();
obstaclesController.draw();
player.draw();
score.draw();
if(gameOver){
  showGameOver();
}

requestAnimationFrame(gameLoop)
}
requestAnimationFrame(gameLoop);

window.addEventListener('keyup', reset, {once:true})
window.addEventListener('touchstart', reset, {once:true})

