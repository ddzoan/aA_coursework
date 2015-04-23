(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var COLOR = '#3399FF';
  var RADIUS = 4;

  var Bullet = Asteroids.Bullet = function(attributes){
    this.pos = attributes['pos'];
    this.vel = attributes['vel'];
    this.game = attributes['game'];

    Asteroids.MovingObject.call(this, {pos: this.pos, color: COLOR, radius: RADIUS, vel: this.vel, game: this.game});
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
})();
