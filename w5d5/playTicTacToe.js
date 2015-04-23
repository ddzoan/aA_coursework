var TTT = require("./ttt");

var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var newGame = new TTT.Game(reader);
newGame.run(function(){
  console.log('game over');
  reader.close();
});
