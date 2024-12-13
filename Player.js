export default class Player{
  WALK_ANIMATION_TIMER = 200;
  walkAnimationTimer = this.WALK_ANIMATION_TIMER;
  runImages = [];
  jumpImages = [];
  

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


    // Standing Img (inizializza il primo frame )

    this.standingStillImage = new Image();
    this.standingStillImage.src = 'images/5x/idle_0.png';
    this.image = this.standingStillImage;

     
    this.standImages = [];
    for (let i = 0; i <= 3; i++) { 
      const standImages = new Image();
      standImages.src = `images/5x/idle_${i}.png`;
      this.standImages.push(standImages);
    }

    this.standImgIndex = 0;
    this.STAND_ANIMATION_TIMER = 300;
    this.standAnimationTimer = this.STAND_ANIMATION_TIMER;

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
    
      this.run(gameSpeed, frameTimeDelta);
      this.jump(frameTimeDelta);
  }
  jump(frameTimeDelta){
    if(this.jumpPressed){
      this.jumpInProgress = true;
      
      
      
    }
    if(this.jumpInProgress && !this.falling){
      if(this.y > this.canvas.height - this.minJumpHeight || (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)){
        this.y-= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio
        const jumpImage = new Image();
        jumpImage.src = 'images/5x/jump_0.png';
        this.image = jumpImage;
      }else{
        this.falling = true;
        const fallImage = new Image();
        fallImage.src = 'images/5x/jump_1.png';
      this.image = fallImage;
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
    if (this.walkAnimationTimer <= 0 && !this.falling) {
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