'use strict'

function Live(canvas, x, y, width, height) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y+12;
}

Live.prototype.draw = function() {
  this.ctx.fillStyle = 'violet';
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
}

function Coin(canvas, x, y, width, height) {
  Live.call(this,canvas, x, y, width, height);
}

Coin.prototype = Object.create(Live.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.draw = function() {
  this.ctx.fillStyle = 'black';
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
}