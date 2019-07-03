# Project's name
DUCK & GO

## Description
Help to the duck to cross the road and avoid cars.
Yo win points everytime you cross one road; Besides, you can win extra points collecting 
the coins randomly positioned on the ground.
You have three lives. With every collision you'll lose one, but you will can get extra lives 
taking the hearts you can find from time to time.
After losing all lives, you'll be returned to first screen.


## MVP (DOM - CANVAS)
1) One player (duck)
2) Canvas divided by lines. Can be safeLine or dangerLine.
3) DangerLine contains enemies (cars). It has one direction (cars will move in that direction)
4) Both lines can cointain objects -> coins (extra points) or hearth (extra lives).
5) Player has three lives. With each collision it lose one. 
6) Game's end if player doesn't have any lives.

## Backlog
1) Eggs -> collect eggs that double points with each road crossing (they will be positioned behind the duck, so could be hit by cars).
2) Waterline -> Line of water with lilipads. Player cannot jump to the water, only to the lilipads.
3) Screen's movement -> The screen will be scrolling down; player cannot touch the bottom border.

## Data structure
1) Game.js
  1.1) Properties
    this.player
    this.lines
    this.isGameOver
    this.level*
    this.score*
    this.isInCenter
  1.2) methods
    this.startGame()
    this.clear()
    this.update()
    this.draw();
    this.checkCollisions() // forEach enemies
    this.checkLives()
    this.checkLevel()
    this.updateLines()
    this.playerInCenter()

2) Player.js
  2.1) Properties
    this.x
    this.y
    this.color(img)
    this.direction
    this.width
    this.height
    this.lives
    this.eggs*
  2.2) Methods
    this.move()
    this.checkBorders()
    this.updateLives()
    this.draw()
  
3) Line.js ================ extends =============== DangerLine =============== WaterLine *
  3.1) Properties --------------------------------- Properties --------------- Properties                               
    this.y                                         this.enemies               this.direction
    this.objects                                   this.direction             this.speed
    this.height                                    this.speed                 this.lilipads
  3.2) Methods                                     
    this.draw()                                    this.generateEnemies
    this.updateScore()
    this.move()*

4) Enemy.js
  2.1) Properties
    this.x
    this.y
    this.direction
    this.speed
    this.width
    this.height
  2.2) Methods
    this.draw()
    this.move()
    this.checkCollisionWithPlayer()

5) Object.js
  2.1) Properties
    this.x
    this.y
  2.2) Methods
    this.remove()
    this.checkCollisionWithPlayer()
    this.updateScore()
    

## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen
- (winScreen)


## Task
1) Create files
2) Boilerplate
3) git
4) Create 3 screens
5) transitions
6) Create game loop
7) Create Player
8) Move Player
9) Create Lines
10) Update lines
11) Create Enemies
12) Move enemies
13) Create Objects
14) Collisions Player-emenies
15) Collitions Player-objects
16) Update lives
17) Game over

## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)