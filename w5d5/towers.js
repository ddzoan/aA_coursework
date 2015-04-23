var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var HanoiGame = function(height) {
  this.stacks = [[], [], []];
  for(var i = height; i > 0; i--) {
    this.stacks[0].push(i);
  }
};

HanoiGame.prototype.isWon = function() {
  if (this.stacks[0].length === 0 &&
    (this.stacks[1].length === 0 || this.stacks[2].length === 0)) {
      return true;
    }
  return false;
};

HanoiGame.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
  var startTower = this.stacks[startTowerIdx];
  var endTower = this.stacks[endTowerIdx];
  if (startTowerIdx < 0 || startTowerIdx > 2 || endTowerIdx < 0 || endTowerIdx > 2) {
    return false;
  }

  if (startTower.length < 1) {
    return false;
  }

  if ((endTower.length === 0 && startTower.length > 0) ||
    (startTower[startTower.length - 1] < endTower[endTower.length - 1])) {
    return true;
  }
  return false;
};

HanoiGame.prototype.move = function (startTowerIdx, endTowerIdx) {
  if(this.isValidMove(startTowerIdx, endTowerIdx)){
    this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.print = function () {
  console.log(JSON.stringify(this.stacks));
};

HanoiGame.prototype.promptMove = function (callback) {
  this.print();
  reader.question("Enter start tower: ", function (startIdx) {
    reader.question("Enter end tower: ", function (endIdx) {
      callback(startIdx, endIdx);
    });
  });
};

HanoiGame.prototype.run = function (completionCallback) {
  var game = this;
  this.promptMove(function(startIdx, endIdx) {
    if (game.move(startIdx, endIdx)) {
      if (game.isWon()) {
        completionCallback();
        return;
      } else {
        game.run(completionCallback);
      }
    } else {
      console.log("F U");
      game.run(completionCallback);
    }
  });
};


var game = new HanoiGame(3);
game.run(function(){
  console.log("Congratulations");
  reader.close();
});
