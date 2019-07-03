'use strict'

function Line(canvas, y, color, height, level) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.height = height;
  //this.y = y*height;
  this.y = y*height;
  this.objects = [];
  this.color = color;
  this.random = null;
  this.level = level;
}

Line.prototype.draw = function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(0, this.y, this.canvas.width, this.height);
}

Line.prototype.move = function() {
  this.y += this.height;
}

Line.prototype.generateObjects = function() {
  var objectGenerated = false;
  var object = [];
  if(Math.random() > 0.99) {
    var x = Math.floor(Math.random()*((this.canvas.width-10)-10+1)+10);
    object.push(new Live(this.canvas, x, this.y, 25, 25));
    objectGenerated = true;
  }
  if(Math.random() > 0.7 && !objectGenerated) {
    var x = Math.floor(Math.random()*((this.canvas.width-10)-10+1)+10);
    object.push(new Coin(this.canvas, x, this.y, 25, 25));
  }

  if(object.length > 0) {
    this.objects.push(object);
  }
}

function DangerLine(canvas, y, color, height, direction) {
  Line.call(this, canvas, y, color, height);
  this.enemies = [];
  this.direction = direction;
  this.speed = (Math.random() * (0.99 - 0.50) + 0.50).toFixed(2); // 0.99 bigger when level up
}

DangerLine.prototype = Object.create(Line.prototype);
DangerLine.prototype.constructor = DangerLine;

DangerLine.prototype.generateEnemies = function() {
  this.random = Math.floor(Math.random()*(320-200+1)+200);
  for(var i=0; i<=20; i++) {
    var x = (i==0)?0:this.enemies[i-1].x+this.random;
    var enemy = new Enemy(this.canvas, x, this.y, this.direction, 100, 50, this.speed);
    this.enemies.push(enemy);
  }
}

DangerLine.prototype.updateEnemies = function() {
  this.enemies.forEach((enemy, index) => {
    if(this.direction === 1) {
      if(enemy.x > this.canvas.width) {
        enemy.x = this.enemies[0].x - this.random;
        this.enemies.splice(index, 1);
        this.enemies.unshift(enemy);
      }
    }else{
      if(enemy.x < -enemy.width) {
      enemy.x = this.enemies[0].x + this.random;
      this.enemies.splice(index, 1);
      this.enemies.unshift(enemy);
      }
    }
  });
}

function WaterLine(canvas, y, color, height) {
  Line.call(this, canvas, y, color, height);
  this.direction = null;
  this.speed = null;
  this.lilypad = [];
}

WaterLine.prototype = Object.create(Line.prototype);
WaterLine.prototype.constructor = WaterLine;

DangerLine.prototype.generateLilipads = function() {
  this.random = /*Math.floor(Math.random() * 160) + 90;*/ Math.floor(Math.random()*(280-180+1)+180); // 150 small when level up
  for(var i=0; i<=20; i++) {
    var x = (i==0)?0:this.enemies[i-1].x+this.random;
    var enemy = new Enemy(this.canvas, x, this.y, this.direction, 100, 50, this.speed);
    this.enemies.push(enemy);
  }
}
