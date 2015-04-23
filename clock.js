function Clock () {
}

Clock.TICK = 1000;

Clock.prototype.printTime = function () {
  console.log(this.hours + ':' + this.minutes + ':' + this.seconds);
};

Clock.prototype.run = function () {
  var currentTime = new Date();
  this.hours = currentTime.getHours();
  this.minutes = currentTime.getMinutes();
  this.seconds = currentTime.getSeconds() + 1;
  this.printTime();
  var clock = this;
  setInterval(function() {
    clock._tick();
  }, Clock.TICK);
};

Clock.prototype._tick = function () {
  this.seconds += Clock.TICK / 1000;

  if(this.seconds >= 60){
    this.seconds -= 60;
    this.minutes++;
  }
  if(this.minutes >= 60){
    this.minutes -= 60;
    this.hours++;
  }
  if(this.hours >= 24){
    this.hours -= 24;
  }
  this.printTime();
};

var clock = new Clock();
clock.run();
