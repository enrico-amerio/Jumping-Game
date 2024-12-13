const gameOverAudio = new Audio('sounds/game-over.mp3');
let audioEnabled = null;
 
export default class Obstacle{
  constructor(ctx, x, y, width, height, image){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    
  }
  stopAudio(){
    gameOverAudio.pause(); 

  }
  setAudio(boolean){
    if(audioEnabled){
      gameOverAudio.pause(); 
    }
    audioEnabled = boolean;
  }
  update(speed, gameSpeed, frameTimeDelta, scaleRatio){
    this.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;
  }
  draw(){
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
  collideWith(sprite) {
    const adjustBy = 2;
  if (
      sprite.x < this.x + this.width / adjustBy &&
      sprite.x + sprite.width / adjustBy > this.x &&
      sprite.y < this.y + this.height / adjustBy &&
      sprite.y + sprite.height / adjustBy > this.y
  ) {
    if(audioEnabled){
      gameOverAudio.currentTime = 0;
      gameOverAudio.volume = 0.5;
      gameOverAudio.play();
      
    }
      return true;
  } else {
      return false;
  }
  }
}