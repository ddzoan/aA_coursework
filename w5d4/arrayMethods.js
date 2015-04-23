Array.prototype.uniq = function () {
  var uniqArray = [];
  for(var i = 0; i < this.length; i++){
    var uniq = true;
    for(var j = 0; j < uniqArray.length; j++){
      if(this[i] === uniqArray[j]) {
        uniq = false;
        break;
      }
    }
    if(uniq) {
      uniqArray.push(this[i]);
    }
  }
  return uniqArray;
};

var a = [1,2,3,3,3,4,4,6];
// console.log(a.uniq());

Array.prototype.twoSum = function() {
  var twoSum = [];
  for(var i = 0; i < this.length; i++) {
    for(var j = i + 1; j < this.length; j++) {
      if(this[i] + this[j] === 0) {
        twoSum.push([i,j]);
      }
    }
  }
  return twoSum;
};

var b = [-1, 0, 2, -2, 1];
// console.log(b.twoSum());

Array.prototype.transpose = function() {
  var rows = this.length;
  var cols = this[0].length;
  var transpose = [];
  for(var i = 0; i < cols; i++) {
    transpose[i] = [];
  }

  for(i = 0; i < rows; i++) {
    for(var j = 0; j < cols; j++) {
      transpose[j][i] = this[i][j];
    }
  }
  return transpose;
};

var c = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];

// console.log(c.transpose());

Array.prototype.myEach = function(callBack) {
  for(var i=0; i< this.length; i++){
    callBack(this[i]);
  }
  return this;
};

// var c = [1,2,3,45,5];
// c.myEach(function (el){
//   console.log(el);
// });

Array.prototype.myMap = function(callBack) {
  var newArray = [];
  this.myEach(function (el) {
    newArray.push(callBack(el));
  });
  return newArray;
};

// var c = [1,2,3,4,5];
//   console.log(c.myMap(function (el){
//   return el * 2;
// }));

Array.prototype.myInject = function(callBack) {
  var result = this[0];
  this.splice(1,this.length).myEach(function (el) {
    result = callBack(result, el);
  });
  return result;
};

// var c = [1,2,3,4,5];
// console.log(c.myInject(function(accumulator, val) {
//   return accumulator * val;
// }));

Array.prototype.bubbleSort = function(){
  var sorted = false;
  while(!sorted){
    sorted = true;
    for(var i=0; i < this.length - 1; i++){
      if(this[i] > this[i + 1]){
        var temp = this[i];
        this[i] = this[i + 1];
        this[i + 1] = temp;
        sorted = false;
      }
    }
  }
  return this;
};

var a = [6,4,3,2,1];
// console.log(a.bubbleSort());


String.prototype.subStrings = function() {
  var subStrings = [];
  for(var i = 0; i < this.length; i++){
    for(var j = i + 1; j < this.length + 1; j++){
      var substring = this.substring(i,j);
      if(subStrings.indexOf(substring) === -1) {
        subStrings.push(substring);
      }
    }
  }
  return subStrings;
};

var substring = "catt";
// console.log(substring.subStrings());


var range = function(start, finish){
  if(start === finish){
    return [finish];
  } else {
    return [start].concat(range(start + 1, finish));
  }
};

// console.log(range(3,18));

var sumArray = function(array){
  if(array.length === 1){
    return array[0];
  } else {
    return array[0] + sumArray(array.slice(1,array.length));
  }
};

// console.log(sumArray([1,2,3,4,5]));

var exp = function(base, power){
  if(power === 0){
    return 1;
  } else {
    return base * exp(base, power-1);
  }
};

// console.log(exp(2,10));

var exp2 = function(base, power){
  if(power === 0){
    return 1;
  } else if(power === 1) {
    return base;
  } else if(power % 2 === 0) {
    return exp2(base, power/2) * exp2(base, power/2);
  } else {
    return base * exp2(base, (power - 1) / 2) * exp2(base, (power - 1) / 2);
  }
};

// console.log(exp2(2,11));

var fibonacci = function(n){
  if(n === 1){
    return [1];
  } else if(n === 2){
    return [1, 1];
  } else {
    var previous = fibonacci(n-1);
    var nextDigit = previous[previous.length-1] + previous[previous.length-2];
    return previous.concat(nextDigit);
  }
};

// console.log(fibonacci(10));

var binarySearch = function(array, target){
  if(array.length === 0) {
    return null;
  }
  var pivotIndex = Math.floor(array.length / 2);
  if(array[pivotIndex] === target) {
    return pivotIndex;
  } else if(array[pivotIndex] > target){
    return binarySearch(array.slice(0, pivotIndex),target);
  } else {
    var subIndex = binarySearch(array.slice(pivotIndex + 1, array.length), target);
    if(subIndex !== null){
      return pivotIndex + 1 + subIndex;
    } else {
      return null;
    }
  }
};

// console.log(binarySearch([1, 2, 3], 1));
// console.log(binarySearch([2, 3, 4, 5], 3));
// console.log(binarySearch([2, 4, 6, 8, 10], 6));
// console.log(binarySearch([1, 3, 4, 5, 9], 5));
// console.log(binarySearch([1, 2, 3, 4, 5, 6], 6));
// console.log(binarySearch([1, 2, 3, 4, 5, 6], 0));
// console.log(binarySearch([1, 2, 3, 4, 5, 7], 6));

var makeChange = function (money, coins){
  if(money === 0){
    return [];
  }
  var best = [];
  for(var i=0; i < coins.length; i++){
    best[i] = [];
  }
  for(i=0; i < coins.length; i++){
    if(coins[i] <= money){
      best[i].push(coins[i]);
      best[i] = best[i].concat(makeChange(money-coins[i], coins));
    }
  }
  var bestIndex = 0;
  for(i=1; i < best.length; i++){
    if(best[i].length < best[bestIndex].length && best[i].length > 0 || best[bestIndex].length === 0){
      bestIndex = i;
    }
  }
  return best[bestIndex];
};

// console.log(makeChange(14,[10,7,1]));

var merge = function(arr1,arr2){
  var merged = [];
  while(arr1.length > 0 && arr2.length > 0){
    if(arr1[0] < arr2[0]){
      merged.push(arr1.shift());
    } else {
      merged.push(arr2.shift());
    }
  }
  return merged.concat(arr1).concat(arr2);
};

Array.prototype.mergeSort = function () {
  if(this.length === 0){
    return [];
  } else if(this.length === 1) {
    return this;
  }
  var middle = Math.floor(this.length/2);
  var left = this.slice(0,middle);
  var right = this.slice(middle,this.length);
  return merge(left.mergeSort(), right.mergeSort());
};

// console.log([23,78,8,2,9,2].mergeSort());

var subSets = function(arr) {
  if(arr.length === 0){
    return [[]];
  }
  var subset = subSets(arr.slice(0,arr.length - 1));
  var subarr = [].concat(subset);
  for(var i=0; i < subset.length; i++){
    subarr.push(subset[i].concat(arr[arr.length-1]));
  }
  return subarr;
};

// console.log(subSets([1,2,3]));
