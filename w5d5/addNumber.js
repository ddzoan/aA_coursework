var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var addNumbers = function(sum, numsLeft, completionCallback){
  if (numsLeft === 0){
    completionCallback(sum);
    reader.close();
    return sum;
  }

  reader.question("Give me number: ", function(answer) {
    console.log(sum += parseInt(answer));
    addNumbers(sum, numsLeft - 1, completionCallback);
  });
};

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});
