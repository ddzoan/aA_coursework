(function() {
  if (typeof window.Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function(game, $el) {
    this.game = game;
    this.$board = $el;
    this.render();
    this.bindEvents();
    this.startPile;
  };

  // View.prototype.setupBoard = function() {
  //   var $piles = $('.piles');
  //   for (var i = 0; i < 3; i++) {
  //     $piles.append($("<div class='pile' data-pile-id='" + i + "'></div>"));
  //     var el = $piles.children().last();
  //     for (var j = 0; j < 3; j++) {
  //       el.prepend("<div class='disc' data-position='" + j + "'></div>");
  //     }
  //   }
  // }
  View.prototype.render = function() {
    var towers = this.game.towers;
    var $piles = $('.piles');
    $piles.empty();
    for (var i = towers.length - 1; i >= 0; i--) {
      $piles.append($("<div class='pile' data-pile-id='" + i + "'></div>"));
      // debugger
      var el = $piles.children().last();
      for (var j = towers[i].length - 1; j >= 0; j--) {
        var size = towers[i][j];
        el.prepend("<div style='width:" + 30*size + "px;' class='disc' data-size='" + size + "'></div>");
      }
    }
  };

  View.prototype.bindEvents = function() {
    var view = this;
    this.$board.on('click', '.pile', function(event) {
      if (view.startPile === undefined) {
        var target = $(event.currentTarget);
        target.addClass('selected');
        view.startPile = parseInt(target.data('pile-id'));
      } else {
        var endPile = parseInt($(event.currentTarget).data('pile-id'));
        if (!view.game.move(view.startPile, endPile)) {
          alert("Invalid Move!");
        } else {
          view.render();
          if (view.game.isWon()) {
            view.endGame();
          }
        }
        view.startPile = undefined;
        $('.selected').removeClass('selected');
      }
    });
  };


  View.prototype.endGame = function() {
    this.$board.off('click', '.pile');
    $('.wrapper').append($("<h2>You win!</h2>"));
  };
})();

//
//
// Game.prototype.isWon = function () {
//   // move all the discs to the last or second tower
//   return (this.towers[2].length == 3) || (this.towers[1].length == 3);
// };
//
// Game.prototype.move = function (startTowerIdx, endTowerIdx) {
//   if (this.isValidMove(startTowerIdx, endTowerIdx)) {
//     this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
//     return true;
//   } else {
//     return false;
//   }
// };
