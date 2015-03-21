Function.prototype.myBind = function(context) {
  var fn = this;
  var args = Array.prototype.slice.call(arguments, 1);
  function anon(){
    args = args.concat(Array.prototype.slice.call(arguments));
    return fn.apply(context, args);
  }
  return anon;
};

function times(num, fun) {
  for (var i = 0; i < num; i++) {
    fun(); // call is made "function-style"
  }
}

var cat = {
  age: 5,

  ageOneYear: function () {
    this.age += 1;
  }
};
console.log(cat.age);
times(10, cat.ageOneYear.myBind(cat));
console.log(cat.age);
