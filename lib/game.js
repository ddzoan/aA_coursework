(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var DIM_X = 1000;
  var DIM_Y = 500;
  var NUM_ASTEROIDS = 50;

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids(NUM_ASTEROIDS);
    this.ship = new Asteroids.Ship({pos: this.randomPosition(), game: this});
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.ship).concat(this.bullets);
  }

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
    var objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      objects[i].draw(ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    var objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      objects[i].move();
    }
  };

  Game.prototype.wrap = function(pos) {
    if (pos[0] >= DIM_X) {
      pos[0] = 0;
    }
    if (pos[0] < 0){
      pos[0] = DIM_X;
    }
    if (pos[1] >= DIM_Y) {
      pos[1] = 0;
    }
    if (pos[1] < 0) {
      pos[1] = DIM_Y;
    }
    return pos;
  };

  Game.prototype.checkCollisions = function() {
    // var remove = []
    var objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      for (var j = i + 1; j < objects.length; j++) {
        if (objects[i].isCollidedWith(objects[j])) {
          // remove.push(objects[i], objects[j]);
        }
      }
    }
    // for (var i = 0; i < remove.length; i++){
    //   this.remove(remove[i]);
    // }
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
