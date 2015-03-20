function Cat(name, owner) {
  this.name = name;
  this.owner = owner;

}
Cat.prototype.cuteStatement = function () {
  console.log(this.owner + " loves " + this.name );
};

var cat = new Cat("Earl", "Sally");
var kitty = new Cat("Cookie", "John");
cat.cuteStatement();
kitty.cuteStatement();

Cat.prototype.cuteStatement = function (){
  console.log("Everybody loves " + this.name);
};
cat.cuteStatement();
kitty.cuteStatement();

Cat.prototype.meow = function (){
  console.log(this.name + " Meows!");
};

cat.meow();
kitty.meow();


kitty.meow = function (){
  console.log(this.name + " Roar!");
};

cat.meow();
kitty.meow();
