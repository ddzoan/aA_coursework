(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var DIM_X = 1000;
  var DIM_Y = 500;
  var NUM_ASTEROIDS = 200;

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.addAsteroids(NUM_ASTEROIDS);
  };

  Game.prototype.randomPosition = function() {
    var x = Math.random()*DIM_X;
    var y = Math.random()*DIM_Y;
    return [x,y];
  };

  Game.prototype.addAsteroids = function(quantity){
    for (var i = 0; i < quantity; i++) {
      this.asteroids.push(new Asteroids.Asteroid({pos: this.randomPosition(), game: this}));
    }
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
    }
  };

  Game.prototype.wrap = function(pos) {
    if (pos[0] >= DIM_X) {
      pos[0] = 0;
    }
    if (pos[1] >= DIM_Y) {
      pos[1] = 0;
    }
    return pos;
  };

  Game.prototype.checkCollisions = function() {
    var remove = []
    for (var i = 0; i < this.asteroids.length; i++) {
      for (var j = i + 1; j < this.asteroids.length; j++) {
        if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          remove.push(this.asteroids[i], this.asteroids[j]);
        }
      }
    }
    for (var i = 0; i < remove.length; i++){
      this.remove(remove[i]);
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function(asteroid) {
    var index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index,1);
  };
})();
