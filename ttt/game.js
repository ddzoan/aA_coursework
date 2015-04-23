var Board = require('./board');

var Game = function(reader) {
  this.board = new Board();
  this.currentPlayer = 'x';
  this.reader = reader;
};

Game.prototype.getMove = function(callback) {
  var game = this;
  this.reader.question("Give me x coordinate! Player " + game.currentPlayer + ': ', function(x){
    game.reader.question("Give me y coordinate! Player " + game.currentPlayer + ': ', function(y){

      callback(x, y);
    });
  });
};

Game.prototype.changePlayer = function() {
  this.currentPlayer = (this.currentPlayer === 'x' ? 'o' : 'x');
};

Game.prototype.run = function(completionCallback) {
  this.board.display();
  if(this.board.isWon()){
    completionCallback();
    return;
  }
  var game = this;
  this.getMove(function(x, y){
    if(game.board.placeMark([y, x], game.currentPlayer)){
      game.changePlayer();
    } else {
      console.log('invalid move');
    }
    game.run(completionCallback);
  });
};

module.exports = Game;
