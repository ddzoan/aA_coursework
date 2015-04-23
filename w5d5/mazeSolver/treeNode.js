var TreeNode = function(coordinate, parent) {
  this.parent = parent;
  this.children = [];
  this.coordinate = coordinate;
};

TreeNode.prototype.makeChild = function(coordinate) {
  this.children.push(new TreeNode(coordinate, this));
  return this.children[this.children.length-1];
};

TreeNode.prototype.neighbors = function() {
  var coordinate = this.coordinate;
  return [[coordinate[0] + 1, coordinate[1]],
    [coordinate[0] - 1, coordinate[1]],
    [coordinate[0], coordinate[1] + 1],
    [coordinate[0], coordinate[1] - 1]];
};

TreeNode.prototype.findEnd = function(visited, grid) {
  console.log(visited);
  var near = this.neighbors();
  for(var i = 0; i < 4; i++){
    if(visited.indexOf(near[i].toString()) === -1 && grid[near[i][0]][near[i][1]] !== '*'){
      if(grid[near[i][0]][near[i][1]] === 'E'){
        return [near[i]];
      }
      else {
        var child = this.makeChild(near[i]);
        visited.push(near[i].toString());
        var previousPath = child.findEnd(visited, grid);
        previousPath.push(near[i]);
        return previousPath;
      }
    } else {
      return [];
    }
  }
};

module.exports = TreeNode;
