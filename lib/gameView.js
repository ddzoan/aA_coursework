(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    var gameView = this;
    key('up, w', function(){gameView.game.ship.power([0,-1])});
    key('down, s', function(){gameView.game.ship.power([0,1])});
    key('left, a', function(){gameView.game.ship.power([-1,0])});
    key('right, d', function(){gameView.game.ship.power([1,0])});
    setInterval(function(){
      gameView.game.step();
      gameView.game.draw(gameView.ctx);
    }, 20);
  };

})();
