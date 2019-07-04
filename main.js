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
        <button>Start</button>
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
      <p id="lives">Lives: 3</p>
      <p id="score">Score: 0</p>
      <p id="level">Level 1</p>
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
      <p>Your score: ${score}</p>
      <p>Best score: ${bestScore}</p>
      <button>Restart</button>
     </section>
    `
    buildDom(gameOverScreen);
    var restartGameButton = document.querySelector("#site-main section button");
    restartGameButton.addEventListener('click', function(event) {
      createSplashScreen();
    });
  }

  createSplashScreen();
}

window.addEventListener('load', main);