'use strict'

var NORTH = 'n', SOUTH = 's', EAST = 'e', WEST = 'w';

function Player(canvas, width, height, img) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.width = width;
  this.height = height;
  this.x = canvas.width/2 - this.width/2; // center point
  this.y = canvas.height - this.height/2;
  this.img = img;
  this.direction = '';
  this.lives = 3;
  this.eggs = 0;
  this.isOnCenter = false;
  this.count = 0;
  this.arrayIndex = 0;
}

Player.prototype.move = function(type) {
  //if(type === 'user') {
  if(!this.isOnCenter) {
    switch(this.direction) {
      case NORTH:
        (this.y-this.height > this.canvas.height/2) ? this.y -= this.height : this.y;
        break;
      case SOUTH:
        (this.y+this.height < this.canvas.height) ? this.y += this.height : this.y;
        break;
      case WEST:
        (this.x > 0) ? this.x -= this.width/3 : this.x;
        break;
      case EAST:
        (this.x+this.width < this.canvas.width) ? this.x += this.width/3 : this.x;
        break;
    }
    this.direction = '';
  }else{
    this.direction = '';
  }
  /*}else{
    this.y += 0.5;
  }*/
};

Player.prototype.checkBorders = function() {

};

Player.prototype.updateLives = function() {

};

Player.prototype.draw = function() {
  /*var imgPos = 0;
  var posArray = [70,140,70,0];
  this.count++;
  if(this.count < 15) {
    imgPos = posArray[this.arrayIndex];
  }else{
    (this.arrayIndex === posArray.length-1) ? this.arrayIndex = 0 : this.arrayIndex += 1;
    this.count = 0;
  }*/
  this.count++;
  var imgPos = 70;
  if(this.count >=0 && this.count <= 15) {
    imgPos = 70;
  }else if(this.count >15 && this.count <= 30) {
    imgPos = 140;
  }else if(this.count >30 && this.count <= 45) {
    imgPos = 70;
  }else if(this.count >45 && this.count <= 60) {
    imgPos = 0;
  }else if(this.count > 60){
    this.count = 0;
  }
  var img = new Image();
  img.src = this.img;
  this.ctx.drawImage(img, imgPos, 0, 70, 80, this.x, this.y - this.height/2, 40, 50);
};
