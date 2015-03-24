(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (attributes){
    this.pos = attributes['pos'];
    this.vel = attributes['vel'];
    this.radius = attributes['radius'];
    this.color = attributes['color'];
    this.game = attributes['game'];
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.pos = this.game.wrap(this.pos);
  };

  MovingObject.prototype.isCollidedWith = function(object) {
    if (Asteroids.Util.distance(this.pos, object.pos) < this.radius + object.radius) {
      if(this instanceof Asteroids.Ship || object instanceof Asteroids.Ship){
        this.game.ship.relocate();
      }
      return true;
    } else {
      return false;
    }
  }

})();
