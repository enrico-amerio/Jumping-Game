import Dino from "./Dino.js";

export default class EnemiesController{
  ENEMY_INTERVAL_MIN = 500;
  ENEMY_INTERVAL_MAX = 2000;
  nextEnemyInterval = null;
  dinos = [];

  constructor(ctx, scaleRatio, speed){
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
    this.speed = speed;
    
    this.setNextEnemyTime();
  }
  setNextEnemyTime(){
    const num = this.getRandomNumber(this.ENEMY_INTERVAL_MIN, this.ENEMY_INTERVAL_MAX);
    this.nextEnemyInterval = num;
  }
  getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // createEnemy() {
  //   const x = this.canvas.width * 1.5;
  //   const y = this.canvas.height - this.height;
  //   const enemy = new Dino(this.ctx, x, y, this.width, this.height);
  //   this.enemies.push(enemy);
  // }
  createEnemy() {
    const width = 50;  // Set appropriate width
    const height = 50; // Set appropriate height
    const x = this.canvas.width * 1.5;
    const y = this.canvas.height - height; // Adjust `y` based on `height`
    const dino = new Dino(this.ctx, x, y, width, height);
    this.dinos.push(dino);
  }
  
  
  update(gameSpeed, frameTimeDelta) {
    
    if (this.nextEnemyInterval <= 0) {
      
      // Create a new enemy
      this.createEnemy();
      this.setNextEnemyTime();
    }
    this.nextEnemyInterval -= frameTimeDelta;

    this.dinos.forEach((dino) => {
      dino.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
    });

    // Remove off-screen enemies
    this.dinos = this.dinos.filter((dino) => dino.x > -dino.width);
  }
  
  draw() {
    this.dinos.forEach((dino) => dino.draw());
  }

  collideWith(sprite) {
    return this.dinos.some((dino) => dino.collideWith(sprite));
  }

  reset() {
    this.dinos = [];
  }
}