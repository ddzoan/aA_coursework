(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  Asteroids.Util = {};

  Asteroids.Util.inherits = function (child, parent) {
    var Surrogate = function() {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function (length) {
    var vector = Math.random() * 2 * Math.PI;
    var x = length * Math.sin(vector);
    var y = length * Math.cos(vector);
    return [x, y];
  };

  Asteroids.Util.distance = function(pos1, pos2) {
    return Math.sqrt(Math.pow((pos1[0]-pos2[0]), 2) + Math.pow((pos1[1] - pos2[1]), 2));
  };
})();
