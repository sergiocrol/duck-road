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
  this.resetScore = 0;
  this.prevent = false;
};

Game.prototype.startGame = function() {
  this.restartLines()
  this.player = new Player(this.canvas, 40, 50, 'images/player3.png', this.prevent);
  
  this.generateEnemies();
  this.generateObjects();
  var loop = () => {
    //this.generateEnemies();
    this.update();
    this.clear();
    this.checkCollisions();
    this.playerInCenter();
    this.draw();
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

Game.prototype.restartLines = function() {
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
}

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
    this.player.isOnCenter = true;
  }else{
    this.isInCenter = false;
    this.player.isOnCenter = false;
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
          var audio = new Audio('audios/heart.mp3');
          audio.play();
          this.player.lives++;
          section.querySelector('#lives').innerHTML = `<img src="images/heart.png"/> Lives: <span>${this.player.lives}</span>`;
          line.objects.splice(line.objects.length-1,1);
        }else if(object[0].constructor === Coin){
          var audio = new Audio('audios/acorn.mp3');
          audio.play();
          this.score += 10;
          this.resetScore += 10;
          if(this.resetScore >= 50) {
            this.level += 0.2;
            this.resetScore = 0;
            var level = Math.round(this.level/2*10)+1;
            section.querySelector('#level').innerHTML = `<p id="level">Level <span>${level}</span></p>`;
          }
          section.querySelector('#score').innerHTML = `<img src="images/acorn.png"/> Score: <span>${this.score}</span>`;
          this.assignScore();
          line.objects.splice(line.objects.length-1,1);
        }
      }
    })
  })
};

Game.prototype.assignScore = function() {
  localStorage.setItem('score', JSON.stringify({score: this.score}));
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

Game.prototype.relocatePlayer = function(line,i) {
  var res = 0;
  for(var j=i+1;j<=this.lines.length-1; j++){
    if(this.lines[j].constructor === Line) {
      res = j;
      break;
    }
  }
  /*var validLine = this.lines.reduce(function(acc, current, index){
    if(index > i){
      if(current.constructor === Line) {
        acc.push(index);
      }
    }
    return acc;
  },[]);
  var res = validLine[0] - i;*/
  console.log(this.lines[res].y);
  this.player.lives--;
  //this.player.y = this.player.y + (50*res);
  this.player.y = this.lines[res].y + this.player.height/2;
  var audio = new Audio('audios/pig.mp3');
  audio.play();
 
  //this.player.isOnCenter = false;  
  this.prevent = true;
  this.player.prevent = true;
  this.player.count = 0;
  setTimeout(() => {
    this.prevent = false;
    this.player.prevent = false;
  }, 1000);
  section.querySelector('#lives').innerHTML = `<img src="images/heart.png"/> Lives: <span>${this.player.lives}</span>`
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
  if(this.isInCenter && !this.prevent){
    this.lines.pop();
    this.lines.unshift(this.randomLine());
    if(this.lines[0].constructor === DangerLine){
      this.lines[0].generateEnemies();
    }
    this.lines[0].generateObjects();
    this.lines.forEach(function(line) {
      line.y += line.height;
      if(line.constructor === DangerLine){
        line.enemies.forEach(function(lineEnemy) {
          lineEnemy.y += lineEnemy.height;
        })
      }
      line.objects.forEach(function(lineObject) {
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
  }
  return newLine;
}

Game.prototype.gameOverCallback = function(callback) {
  this.onGameOver = callback;
}
