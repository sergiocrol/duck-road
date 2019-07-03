'use strict'

function Live(canvas, x, y, width, height, speed, direction) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y+5;
  this.speed = speed;
  this.direction = direction;
}

Live.prototype.draw = function() {
  var img = new Image();
  img.src = 'images/heart.png'
  this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
}

function Coin(canvas, x, y, width, height) {
  Live.call(this,canvas, x, y, width, height);
}

Coin.prototype = Object.create(Live.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.draw = function() {
  var img = new Image();
  img.src = 'images/coin.png'
  this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
}

function Grass(canvas, x, y, width, height) {
  Live.call(this,canvas, x, y, width, height);
}

Grass.prototype = Object.create(Live.prototype);
Grass.prototype.constructor = Grass;

Grass.prototype.draw = function() {
  var img = new Image();
  img.src = 'images/grass.png'
  this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
}


function Trunk(canvas, x, y, width, height, speed, direction) {
  Live.call(this,canvas, x, y, width, height, speed, direction);
}

Trunk.prototype = Object.create(Live.prototype);
Trunk.prototype.constructor = Trunk;

Trunk.prototype.draw = function() {
  var img = new Image();
  img.src = 'images/log.png'
  this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
}

Trunk.prototype.move = function() {
  this.x += this.speed*this.direction;
}