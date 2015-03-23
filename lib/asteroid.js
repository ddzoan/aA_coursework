(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var COLOR = '#FF00FF';
  var RADIUS = 7;

  var Asteroid = Asteroids.Asteroid = function(attributes){
    var game = attributes['game'];
    var pos = game.randomPosition();
    var vel = Asteroids.Util.randomVec(1);
    Asteroids.MovingObject.call(this, {pos: pos, color: COLOR, radius: RADIUS, vel: vel, game: game});
  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);
})();
