export default class Player{
  WALK_ANIMATION_TIMER = 200;
  walkAnimationTimer = this.WALK_ANIMATION_TIMER;
  runImages = [];
  

  jumpPressed = false;
  jumpInProgress = false;
  falling = false;
  JUMP_SPEED = 0.6;
  GRAVITY = 0.4;

  constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio){

    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height; 
    this.minJumpHeight = minJumpHeight; 
    this.maxJumpHeight = maxJumpHeight; 
    this.scaleRatio = scaleRatio;
    
    
    this.x = 10 * scaleRatio;
    this.y = this.canvas.height - this.height - 15 * scaleRatio;
    this.yStandingPosition = this.y;


    // Standing Imgs da togliere quando implemento l'animazione del salto

    this.standingStillImage = new Image();
    this.standingStillImage.src = 'images/5x/idle_0.png';
    this.image = this.standingStillImage;
    
    const stillImage0 = new Image();
    stillImage0.src = 'images/5x/idle_0.png';
    this.image = stillImage0;
    // const stillImage1 = new Image();
    // stillImage1.src = 'images/5x/idle_1.png';
    // const stillImage2 = new Image();
    // stillImage2.src = 'images/5x/idle_2.png';
    // const stillImage3 = new Image();
    // stillImage3.src = 'images/5x/idle_3.png';
    
    this.standImages = [];
    for (let i = 0; i <= 3; i++) { 
      const standImages = new Image();
      standImages.src = `images/5x/idle_${i}.png`;
      this.standImages.push(standImages);
    }

    this.standImgIndex = 0;
    this.STAND_ANIMATION_TIMER = 300;
    this.standAnimationTimer = this.STAND_ANIMATION_TIMER;

//Running Images

    // const runImage0 = new Image();
    // runImage0.src = 'images/5x/run_0.png';
    
    // const runImage1 = new Image();
    // runImage1.src = 'images/5x/run_1.png';

    // const runImage2 = new Image();
    // runImage2.src = 'images/5x/run_2.png';

    // const runImage3 = new Image();
    // runImage3.src = 'images/5x/run_3.png';

    // const runImage4 = new Image();
    // runImage4.src = 'images/5x/run_4.png';

    // const runImage5 = new Image();
    // runImage5.src = 'images/5x/run_5.png';



    this.runImages = [];
    for (let i = 0; i <= 5; i++) { 
      const runImage = new Image();
      runImage.src = `images/5x/run_${i}.png`;
      this.runImages.push(runImage);
    }

  // Initialize run image index
  this.runImgIndex = 0; 

    //keyboard 

    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('keyup', this.keyup);
    
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);

    // touch

    window.removeEventListener('touchstart',this.touchstart);
    window.removeEventListener('touchend',this.touchend);

    window.addEventListener('touchstart',this.touchstart);
    window.addEventListener('touchend',this.touchend);
  }

  keydown = (event)=>{
  if(event.code === "Space"){
    this.jumpPressed = true

  }
  };

  keyup = (event)=>{
    if(event.code === "Space"){
      this.jumpPressed = false; 
    }
  };

  touchstart = (event) => {
    this.jumpPressed = true;
  }

  touchend = (event) => {
    this.jumpPressed = false;
  }
  update(gameSpeed,frameTimeDelta, waitingToStart){
    // console.log(waitingToStart);
    
    // if(waitingToStart){
    //   this.stand(gameSpeed, frameTimeDelta);
      
    // }else{
      // this.waitingToStart = false;
      // console.log(this.waitingToStart);
      this.run(gameSpeed, frameTimeDelta);
      if(this.jumpInProgress){
        this.image = this.standingStillImage;
      }
      this.jump(frameTimeDelta);

    // }
  }
  jump(frameTimeDelta){
    if(this.jumpPressed){
      this.jumpInProgress = true;
    }
    if(this.jumpInProgress && !this.falling){
      if(this.y > this.canvas.height - this.minJumpHeight || (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)){
        this.y-= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio
      }else{
        this.falling = true;
      }
    }else{
      if(this.y < this.yStandingPosition){
        this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
        if(this.y + this.height > this.canvas.height){
          this.y = this.yStandingPosition;
        }
      }else{
        this.falling = false;
        this.jumpInProgress = false;
      }
    }
  }
  stand(gameSpeed, frameTimeDelta) {
    this.standAnimationTimer -= frameTimeDelta * gameSpeed;
  
    if (this.standAnimationTimer <= 0) {
      // Cycle through standing still images using the current index
      this.standImgIndex = (this.standImgIndex + 1) % this.standImages.length;
      this.image = this.standImages[this.standImgIndex];
  
      // Reset the timer
      this.standAnimationTimer = this.STAND_ANIMATION_TIMER;
    }
  }
  run(gameSpeed, frameTimeDelta) {
    if (this.walkAnimationTimer <= 0) {
      // Cycle through images using the current index
      this.runImgIndex = (this.runImgIndex + 1) % this.runImages.length;
      this.image = this.runImages[this.runImgIndex];
  
      // Reset the timer
      this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    }
  
    // Decrease the timer by the frame time delta
    this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
  }
  
  draw(){
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  };
}