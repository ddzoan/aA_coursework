var TreeNode = require('./treeNode');
var filename = 'mazeSolver/maze1.txt';

var fs = require('fs');
fs.readFile(filename, 'utf-8', function(err, data) {
  if (err) throw err;
  console.log(data);
  var grid = [[]];
  var currentRow = 0;
  var head;
  for (var i = 0; i < data.length; i++) {
    if (data[i] === "\n") {
      grid.push([]);
      currentRow = grid.length - 1;
    } else {
      grid[currentRow].push(data[i]);
    }
  }

  for (i = 0; i < grid.length; i++){
    for(var j = 0; j < grid[0].length; j++){
      if(grid[i][j] === 'S'){
        head = new TreeNode([i,j]);
        break;
      }
    }
  }
  var visited = [head.coordinate.toString()];
  console.log(head.findEnd(visited, grid));
});
