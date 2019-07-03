'use strict'

function Enemy(canvas, x, y, direction, width, height, speed, image) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.speed = speed;
  this.width = width;
  this.height = height;
  this.image = image;
}

Enemy.prototype.draw = function() {
  /*this.ctx.fillStyle = 'yellow';
  this.ctx.fillRect(this.x, this.y, this.width, this.height);*/
  var img = new Image();
  img.src = this.image;
  this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
}

Enemy.prototype.move = function() {
  this.x += this.speed*this.direction;
}

Enemy.prototype.checkCollisionWithPlayer = function(player) {
  var rightLeft = player.x + player.width >= this.x;
  var leftRight = player.x - player.width/2 <= this.x + this.width-20;
  var bottomTop = player.y + player.height/2-2 >= this.y;
  var topBottom = player.y - player.height/2+2 <= this.y + this.height;

  if(rightLeft && leftRight && bottomTop && topBottom) {
    player.lives--;
    console.log(player.lives);
  }
}
