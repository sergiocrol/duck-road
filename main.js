'use strict'
var section;

function main() {
  var siteMain = document.querySelector('#site-main');

  function buildDom(html) {
    siteMain.innerHTML = html;
    return siteMain;
  };

  function createSplashScreen() {
    var splashScreen = `
      <section id="game-start">
        <section>TXERRI <span>&</span> ROAD</section>
        <img src="images/pig.gif"/>
        <button class="button">Start</button>
      </section>
    `
    buildDom(splashScreen);
    var startGameButton = document.querySelector("#site-main section button");

    startGameButton.addEventListener('click', function(event) {
      createGameScreen();
    });
  }

  function createGameScreen() {
    localStorage.setItem('score', JSON.stringify({score: 0}));
    var gameScreen = `
    <section>
      <canvas width="850px" height="700px"></canvas>
    </section>
    <section id="panel">
      <img src="images/menu-pig.gif"/>
      <p id="lives"><img src="images/heart.png"/> Lives: <span>3</span></p>
      <p id="score"><img src="images/acorn.png"/> Score: <span>0</span></p>
      <p id="level">Level <span>1</span></p>
    </section>
    `
    buildDom(gameScreen);
    section = document.querySelector('#panel');

    var canvas = document.querySelector('canvas');
    var game = new Game(canvas);
    game.gameOverCallback(createGameOverScreen);
    game.startGame();  
    document.addEventListener('keydown', function(event) {
      if(!game.prevent) {
        switch(event.key) {
          case 'ArrowDown':
            game.player.direction = SOUTH;
            break;
          case 'ArrowUp':
            game.player.direction = NORTH;
            game.updateLines();
            break;
          case 'ArrowRight':
            game.player.direction = EAST;
            break;
          case 'ArrowLeft':
            game.player.direction = WEST;
            break;
        }
      }
    })
  }

  function createGameOverScreen() {
    var score = JSON.parse(localStorage.getItem('score')).score;
    var bestScore = JSON.parse(localStorage.getItem('bestScore')).bestScore;
    var gameOverScreen = `
     <section id="game-over">
      <p class="gameover-title">GAME</p>
      <p class="gameover-title">OVER</span></p>
      <p>Your score: <span>${score}</span></p>
      <p>Best score: <span>${bestScore}</span></p>
      <button class="button">Restart</button>
     </section>
    `
    buildDom(gameOverScreen);
    var restartGameButton = document.querySelector("#site-main section button");
    restartGameButton.addEventListener('click', function(event) {
      createSplashScreen();
    });
  }

  createGameOverScreen();
}

window.addEventListener('load', main);