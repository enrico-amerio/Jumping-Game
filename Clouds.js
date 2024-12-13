export default class Clouds{
  constructor(ctx, width, height, speed, scaleRatio){
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.scaleRatio = scaleRatio;

    this.x = 0;
    this.y = this.canvas.height - this.height;

    this.cloudsImage = new Image();
    this.cloudsImage.src = 'images/2.png';
    this.skyImage = new Image();
    this.skyImage.src = 'images/1.png';
    

  }
  draw(){
    this.ctx.drawImage(this.skyImage, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.skyImage, this.x + this.width, this.y, this.width, this.height);
    if(this.x < -this.width){
      this.x = 0;
    }
    this.ctx.drawImage(this.cloudsImage, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.cloudsImage, this.x + this.width, this.y, this.width, this.height);
    if(this.x < -this.width){
      this.x = 0;
    }
  }
  update(gameSpeed, frameTimeDelta){
    this.x -= gameSpeed / 10 * frameTimeDelta * this.speed * this.scaleRatio;
  }
  reset(){
    this.x = 0;
  }
}