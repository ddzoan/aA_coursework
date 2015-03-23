(function (){
  if(window.Asteroids === undefined){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  GameView.prototype.start = function() {
    gameView = this;
    setInterval(function(){
      gameView.game.moveObjects();
      gameView.game.draw(gameView.ctx);
    }, 20);
  }

})();
