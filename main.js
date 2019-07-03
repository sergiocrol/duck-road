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
      <section>
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
      <section id="lives">Lives: 3</section>
      <section id="score">Score: 0</section>
    </section>
    `
    buildDom(gameScreen);
    section = document.querySelector('section');

    var canvas = document.querySelector('canvas');
    var game = new Game(canvas);
    game.gameOverCallback(createGameOverScreen);
    game.startGame();  
    document.addEventListener('keydown', function(event) {
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
    })
  }

  function createGameOverScreen() {
    var score = JSON.parse(localStorage.getItem('score')).score;
    var bestScore = JSON.parse(localStorage.getItem('bestScore')).bestScore;
    var gameOverScreen = `
     <section>
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

  createGameScreen();
}

window.addEventListener('load', main);