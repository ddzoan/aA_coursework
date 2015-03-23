(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var DIM_X = 1000;
  var DIM_Y = 500;
  var NUM_ASTEROIDS = 10;

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
      this.asteroids.push(new Asteroids.Asteroid({pos: this.randomPosition()}));
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

})();
