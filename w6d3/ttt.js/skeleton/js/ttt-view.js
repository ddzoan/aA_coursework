(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$board = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var board = this;
    this.$board.on('click', '.square', function(myEvent){
      var $square = $(myEvent.currentTarget);
      board.makeMove($square);
    });
  };

  View.prototype.makeMove = function ($square) {
    var row = $square.data('row-id');
    var col = $square.data('col-id');
    var currentPlayer = this.game.currentPlayer;
    try {
      this.game.playMove([row, col]);
      $square.addClass("marked");
      $square.attr("data-mark", currentPlayer);
      $square.html(currentPlayer);
    } catch (error) {
      alert("Invalid move! Try again");
    }
    if(this.game.isOver()){
      this.endGame();
    }
  };

  View.prototype.endGame = function() {
    var endText = "";
    var winner = this.game.winner();
    if(winner){
      endText = "You win, " + winner;
      $('.square[data-mark=' + winner + ']').addClass("winner");
      $('.square[data-mark!=' + winner + ']').css("background-color", "white");

    } else {
      endText = "It's a draw!";
    }
    $('.wrapper').append($("<h1>" + endText + "</h1>"));

    this.$board.off('click', '.square');
  };

  View.prototype.setupBoard = function () {
    var squareString = "";
    for (var row = 0; row < 3; row++) {
      for (var col  = 0; col < 3; col++) {
        squareString += "<div class='square' data-row-id=" + row;
        squareString += " data-col-id=" + col;
        squareString += "></div>";
      }
    }
    this.$board.html($(squareString));
  };
})();
