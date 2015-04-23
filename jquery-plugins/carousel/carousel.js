$.Carousel = function (HTMLElement) {
  this.$el = $(HTMLElement);
  this.activeIdx = 0;
  this.numImages = this.$el.find('img').length;
  this.$el.find('img').eq(0).addClass('active');
  this.$el.find('img').eq(1).addClass('right');
  this.$el.find('img').eq(this.numImages - 1).addClass('left');
  this.bindEvents();
  this.transitioning = false;
};

$.Carousel.prototype.bindEvents = function () {
  this.$el.find('.slide-left').on('click', function () {
    if(!this.transitioning){
      this.transitioning = true;
      this.slideLeft();
    }
  }.bind(this));

  this.$el.find('.slide-right').on('click', function () {
    if(!this.transitioning){
      this.transitioning = true;
      this.slideRight();
    }
  }.bind(this));
};

$.Carousel.prototype.slideRight = function () {
  var rightIdx = (this.activeIdx + 1) % this.numImages;
  var leftIdx = (this.activeIdx - 1 + this.numImages) % this.numImages;

  this.$el.find('img').eq(this.activeIdx).addClass('left');
  this.$el.find('img').eq(rightIdx).addClass('active');
  setTimeout(function () {
    this.$el.find('img').eq(leftIdx).removeClass('left');
    var slideIn = this.$el.find('img').eq(rightIdx);
    slideIn.removeClass('right');

    slideIn.one('transitionend', function(){
      this.$el.find('img').eq(this.activeIdx).removeClass('active');
      this.activeIdx = rightIdx;
      rightIdx = (this.activeIdx + 1) % this.numImages;
      this.$el.find('img').eq(rightIdx).addClass('right');
      this.transitioning = false;
    }.bind(this));
  }.bind(this), 0);
};

$.Carousel.prototype.slideLeft = function () {
  var rightIdx = (this.activeIdx + 1) % this.numImages;
  var leftIdx = (this.activeIdx - 1 + this.numImages) % this.numImages;

  this.$el.find('img').eq(this.activeIdx).addClass('right');
  this.$el.find('img').eq(leftIdx).addClass('active');
  setTimeout(function () {
    this.$el.find('img').eq(rightIdx).removeClass('right');
    var slideIn = this.$el.find('img').eq(leftIdx);
    slideIn.removeClass('left');

    slideIn.one('transitionend', function(){
      this.$el.find('img').eq(this.activeIdx).removeClass('active');
      this.activeIdx = leftIdx;
      leftIdx = (this.activeIdx - 1 + this.numImages) % this.numImages;
      this.$el.find('img').eq(leftIdx).addClass('left');
      this.transitioning = false;
    }.bind(this));
  }.bind(this), 0);
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
}
