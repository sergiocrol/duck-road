'use strict'

function Game(canvas) {
  this.player = null;
  this.lines = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.level = 0;
  this.score = 0;
  this.isInCenter = false;
  this.onGameOver = null;
};

Game.prototype.startGame = function() {
  var lineArray = ['Line','DangerLine','Line','DangerLine','DangerLine','Line','DangerLine','DangerLine','DangerLine','Line','DangerLine','DangerLine','DangerLine','Line','DangerLine','DangerLine'];
  lineArray = lineArray.reverse();
  for(var i = 0; i<lineArray.length; i++) {
    var file;
    if(lineArray[i] === 'Line') {
      file = new Line(this.canvas, i-2, 'green', 50, this.level);
    }else if(lineArray[i] === 'DangerLine'){
      file = new DangerLine(this.canvas, i-2, 'grey', 50, Math.random() < 0.5 ? -1 : 1, this.level);
    }else{
      file = new WaterLine(this.canvas, i-2, 'blue', 50, Math.random() < 0.5 ? -1 : 1, this.level);
    }
    this.lines.push(file);
  }
  console.log(this.lines);

  this.player = new Player(this.canvas, 50, 50);
  
  this.generateEnemies();
  this.generateObjects();
  var loop = () => {
    //this.generateEnemies();
    this.checkCollisions();
    this.update();
    this.clear();
    this.draw();
    this.playerInCenter();
    this.updateEnemies();
    this.checkLives();
    if(!this.isGameOver) {
      requestAnimationFrame(loop);
    }else{
      this.onGameOver();
    }
  }
  loop();
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
};

Game.prototype.update = function() {

  this.player.move('user');
  this.lines.forEach(function(line) {
    if(line.constructor === DangerLine){
      line.enemies.forEach(function(lineEnemy) {
        lineEnemy.move();
      })
    }
  })
};

Game.prototype.playerInCenter = function() {
  if(this.player.y <= this.lines[9].y+this.lines[9].height/2) {
    this.isInCenter = true;
  }else{
    this.isInCenter = false;
  }
};

Game.prototype.updateEnemies = function() {
  this.lines.forEach(function(line) {
    if(line.constructor === DangerLine){
      line.updateEnemies();
    }
  });
};


Game.prototype.checkCollisions = function() {
  this.lines.forEach((line, index) => {
    var i = index;
    if(line.constructor === DangerLine){
      line.draw('danger');
    }else{
      line.draw();
    }
    if(line.constructor === DangerLine){
      line.enemies.forEach((enemy) => {
        //enemy.checkCollisionWithPlayer(this.player);
        var rightLeft = this.player.x + this.player.width >= enemy.x;
        var leftRight = this.player.x - this.player.width/2 <= enemy.x + enemy.width-20;
        var bottomTop = this.player.y + this.player.height/2-2 >= enemy.y;
        var topBottom = this.player.y - this.player.height/2+2 <= enemy.y + enemy.height;
      
        if(rightLeft && leftRight && bottomTop && topBottom) {
          this.relocatePlayer(line, i);
        }
      })
    }
    line.objects.forEach((object) => {
      var rightLeft = this.player.x + this.player.width >= object[0].x;
      var leftRight = this.player.x - this.player.width/2 <= object[0].x + object[0].width-20;
      var bottomTop = this.player.y + this.player.height/2-2 >= object[0].y;
      var topBottom = this.player.y - this.player.height/2+2 <= object[0].y + object[0].height;
    
      if(rightLeft && leftRight && bottomTop && topBottom) {
        if(object[0].constructor === Live) {
          this.player.lives++;
          section.querySelector('#lives').innerHTML = 'Lives: ' + this.player.lives;
          console.log(this.player.lives);
          line.objects.splice(line.objects.length-1,1);
        }else if(object[0].constructor === Coin){
          this.score += 10;
          if(this.score >= 100) {this.level += 0.2}
          section.querySelector('#score').innerHTML = 'Score: ' + this.score;
          this.assignScore();
          line.objects.splice(line.objects.length-1,1);
        }
      }
    })
  })
};

Game.prototype.assignScore = function() {
  localStorage.setItem('score', JSON.stringify({score: this.score}));
  console.log(JSON.parse(localStorage.getItem('score')).score);
  if(JSON.parse(localStorage.getItem('bestScore')) === null) {  
    localStorage.setItem('bestScore', JSON.stringify({bestScore: this.score}));
  }else{
    var bestScore = JSON.parse(localStorage.getItem('bestScore')).bestScore;
    if(bestScore <= this.score) {
      bestScore = this.score;
    }
    localStorage.setItem('bestScore', JSON.stringify({bestScore: bestScore}));
  }
}

Game.prototype.checkLives = function() {
  if(this.player.lives <= 0) {
    this.isGameOver = true;
  }
};

Game.prototype.relocatePlayer = function(line, i) {
  var validLine = this.lines.reduce(function(acc, current, index){
    if(index > i){
      if(current.constructor === Line) {
        acc.push(index);
      }
    }
    return acc;
  },[]);
  var res = validLine[0] - i;
  this.player.y = this.player.y + (50*res);
  this.player.lives--;
  section.querySelector('#lives').innerHTML = 'Lives: ' + this.player.lives;
};

Game.prototype.generateEnemies = function() {
  this.lines.forEach(function(line) {
    if(line.constructor === DangerLine){
      line.generateEnemies();
    }
  });
};

Game.prototype.generateObjects = function() {
  this.lines.forEach(function(line) {
    line.generateObjects();
  });
};

Game.prototype.draw = function() {
  this.lines.forEach(function(line) {
    if(line.constructor === DangerLine){
      line.draw('danger');
    }else{
      line.draw();
    }
    line.objects.forEach(function(lineObject) {
      lineObject[0].draw();
    })
    if(line.constructor === DangerLine){
      line.enemies.forEach(function(lineEnemy) {
        lineEnemy.draw();
      })
    }
  })
  this.player.draw();
}

Game.prototype.updateLines = function() { 
  if(this.isInCenter){
    this.lines.pop();
    this.lines.unshift(this.randomLine());
    if(this.lines[0].constructor === DangerLine){
      this.lines[0].generateEnemies();
    }
    this.lines[0].generateObjects();
    this.lines.forEach(function(line) {
      //line.move();
      line.y += line.height;
      if(line.constructor === DangerLine){
        line.enemies.forEach(function(lineEnemy) {
          //lineEnemy.move();
          lineEnemy.y += lineEnemy.height;
        })
      }
      line.objects.forEach(function(lineObject) {
        //lineEnemy.move();
        lineObject[0].y += 50;
      })
    })
  }
};

Game.prototype.randomLine = function() { 
  var randomArray = ['Line', 'DangerLine', 'Line'];
  var randomLine = randomArray[Math.floor(Math.random()*randomArray.length)];
  var newLine;
  if(randomLine === 'Line'){
    newLine = new Line(this.canvas, -2, 'green', 50, this.level);
  }else if(randomLine === 'DangerLine'){
    newLine = new DangerLine(this.canvas, -2, 'grey', 50, Math.random() < 0.5 ? -1 : 1, this.level);
  }else{
    newLine = new WaterLine(this.canvas, -2, 'blue', 50, this.level);
  }
  return newLine;
}

Game.prototype.gameOverCallback = function(callback) {
  this.onGameOver = callback;
}
