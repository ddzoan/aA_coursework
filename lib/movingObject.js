(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var Asteroids.MovingObject = function(attributes){
    this.pos = attributes['pos'];
    this.vel = attributes['vel'];
    this.radius = attributes['radius'];
    this.color = attributes['color'];
  };
});
