var Board = function() {
  this.grid = [];
  this.winner;
  for (var i = 0; i < 3; i++) {
    this.grid.push(new Array(3));
  }
};

Board.prototype.display = function() {
  console.log("  0 1 2")
  for(var i = 0; i < this.grid.length; i++) {
    var row = i.toString() + ' ';
    for(var j = 0; j < this.grid[i].length; j++) {
      var char = this.grid[i][j];
      if(!char) {
        char = ' ';
      }
      row += char;
      if(j < this.grid[i].length - 1) {
        row += '|';
      }
    }
    console.log(row);
    if( i < this.grid.length - 1) {
      console.log('  -----');
    }
  }
};

Board.prototype.isWon = function() {
  var rows = [[],[],[]];
  var cols = [[],[],[]];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      rows[i].push(this.grid[i][j]);
      cols[i].push(this.grid[j][i]);
    }
  }
  var diagonals = [[this.grid[0][0], this.grid[1][1], this.grid[2][2]],
                  [this.grid[0][2], this.grid[1][1], this.grid[2][0]]];
  var allLines = rows.concat(cols).concat(diagonals);

  for(i = 0; i < allLines.length; i++){
    if(allLines[i][0] === allLines[i][1] && allLines[i][1] === allLines[i][2] && !!allLines[i][0]){
      this.winner =  allLines[i][0];
      return true;
    }
  }
  return false;
};

Board.prototype.empty = function(pos) {
  return !(this.grid[pos[0]][pos[1]]);
};

Board.prototype.isValidMove = function(pos) {
  if (pos[0] < 3 && pos[0] >= 0 && pos[1] < 3 && pos[1] >= 0) {
    if (this.empty(pos)) {
      return true;
    }
  }
  return false;
};

Board.prototype.placeMark = function(pos, mark) {
  if (this.isValidMove(pos)) {
    this.grid[pos[0]][pos[1]] = mark;
    return true;
  }
  return false;
};




module.exports = Board;
