$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$activeImg = this.$el.find('.gutter-images > img').eq(0);
  this.activate(this.$activeImg);
  this.bindEvents();
  this.gutterIdx = 0;
  this.$images;
  this.setImages();
};

$.Thumbnails.prototype.setImages = function () {
  this.$images = $('.gutter-images img');
  this.fillGutterImages();
};

$.Thumbnails.prototype.bindEvents = function () {
  this.$el.find('.gutter-images').on('mouseenter', 'img', function (event) {
    var $img = $(event.currentTarget);
    this.activate($img);
  }.bind(this));

  this.$el.find('.gutter-images').on('mouseleave', 'img', function (event) {
    this.activate(this.$activeImg);
  }.bind(this));

  this.$el.find('.gutter-images').on('click', 'img', function (event) {
    this.$activeImg = $(event.currentTarget);
    this.activate(this.$activeImg);
  }.bind(this));

  this.$el.find('#nav-left').on('click', function (event) {
    if (this.gutterIdx > 0) {
      this.gutterIdx -= 1;
    }
    this.fillGutterImages();
  }.bind(this));

  this.$el.find('#nav-right').on('click', function (event) {
    if (this.gutterIdx < this.$images.length - 5) {
      this.gutterIdx += 1;
    }
    this.fillGutterImages();
  }.bind(this));
};

$.Thumbnails.prototype.activate = function($img) {
  this.$el.find('.active').html($img.clone());
};

$.Thumbnails.prototype.fillGutterImages = function() {
  $('.gutter-images').html('');
  $.each(this.$images.slice(this.gutterIdx, this.gutterIdx + 5), function () {
    $('.gutter-images').append(this);
  });
};

$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};
