export default class Dino{
  ANIMATION_INTERVAL = 200;
  runAnimationTimer = this.ANIMATION_INTERVAL;
  dinoRunImages = [];

  constructor(ctx, x, y, width, height){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    
    const dinoRunImage1 = new Image();
    dinoRunImage1.src = 'images/Dino/dino1.png';
    this.image = dinoRunImage1;
    // const dinoRunImage2 = new Image();
    // dinoRunImage2.src = 'images/Dino/dino2.png';
    // const dinoRunImage3 = new Image();
    // dinoRunImage3.src = 'images/Dino/dino3.png';
    // const dinoRunImage4 = new Image();
    // dinoRunImage4.src = 'images/Dino/dino4.png';
    // const dinoRunImage5 = new Image();
    // dinoRunImage5.src = 'images/Dino/dino5.png';
    // const dinoRunImage6 = new Image();
    // dinoRunImage6.src = 'images/Dino/dino6.png';
    // const dinoRunImage7 = new Image();
    // dinoRunImage7.src = 'images/Dino/dino7.png';

    this.dinoRunImages = [];

    for (let i = 1; i <= 7; i++){
      const dinoRunImage = new Image();
      dinoRunImage.src = `images/Dino/dino${i}.png`;
      dinoRunImage.onload = () => {
        console.log(`Image ${i} loaded successfully.`);
      };
    
      dinoRunImage.onerror = () => {
        console.error(`Failed to load image: images/Dino/dino${i}.png`);
      };
      this.dinoRunImages.push(dinoRunImage);
      console.log(this.dinoRunImages)
      
    }
    // Initialize run image index
  // this.dinoRunImageIndex = 0; 
   // Initialize animation index
   this.imageIndex = 0;
   this.image = this.dinoRunImages[this.imageIndex]; // Set the first image

  }
  update(speed, gameSpeed, frameTimeDelta, scaleRatio){
    console.log('Updating dino at x:', this.x, 'Image Index:', this.imageIndex);
    this.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;
    this.runAnimationTimer -= frameTimeDelta * gameSpeed;

    if (this.runAnimationTimer <= 0) {
        this.imageIndex = (this.imageIndex + 1) % this.dinoRunImages.length;
        this.image = this.dinoRunImages[this.imageIndex];
        this.runAnimationTimer = this.ANIMATION_INTERVAL;
    }
}
draw(){
  console.log('Drawing dino at:', this.x, this.y, 'with image:', this.image.src);
  this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
}
  collideWith(sprite) {
    const adjustBy = 1.4;
  if (
      sprite.x < this.x + this.width / adjustBy &&
      sprite.x + sprite.width / adjustBy > this.x &&
      sprite.y < this.y + this.height / adjustBy &&
      sprite.y + sprite.height / adjustBy > this.y
  ) {
      return true;
  } else {
      return false;
  }
  }
}