'use strict'

var NORTH = 'n', SOUTH = 's', EAST = 'e', WEST = 'w';

function Player(canvas, width, height) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.width = width;
  this.height = height;
  this.x = canvas.width/2 - this.width/2; // center point
  this.y = canvas.height - this.height/2;
  this.color = 'red';
  this.direction = '';
  this.lives = 3;
  this.eggs = 0;
  this.isOnCenter = false;
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
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y - this.height/2, this.width, this.height);
  //this.ctx.fillRect(20, 20, this.width, this.height);
};
