$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data('content-tabs'));
  this.$activeTab = this.$el.find('.active');
  this.bindEvents();
};

$.Tabs.prototype.clickTab = function(event) {
  var tab = this.$contentTabs.find(this.$activeTab.attr('href'));
  tab.addClass("transitioning");
  tab.one('transitionend', function(){
    tab.removeClass("active transitioning");
    this.$activeTab.removeClass("active");
    this.$activeTab = $(event.currentTarget);
    this.$activeTab.addClass("active");
    var newActive = this.$contentTabs.find(this.$activeTab.attr('href'));
    newActive.addClass("active transitioning");
    // debugger;
    setTimeout(function(){
      newActive.removeClass("transitioning");
    }, 0);
  }.bind(this));
};

$.Tabs.prototype.bindEvents = function () {
  this.$el.on('click', 'a', function (event) {
    event.preventDefault();
    this.clickTab(event);
  }.bind(this));
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
