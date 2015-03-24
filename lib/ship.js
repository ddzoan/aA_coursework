(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var RADIUS = 4;
  var COLOR = '#9966FF';

  var Ship = Asteroids.Ship = function(attributes){
    var game = attributes['game'];
    var pos = attributes['pos'];
    var vel = [0, 0]
    Asteroids.MovingObject.call(this, {pos: pos, color: COLOR, radius: RADIUS, vel: vel, game: game});
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
    this.vel = [0, 0];
    this.pos = this.game.randomPosition();
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };
})();
