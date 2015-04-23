NewsReader.Views.feedIndexItem = Backbone.View.extend({
  template: JST['feed_index_item'],
  tagName: 'li',
  events: {
    "click button": "deleteFeed"
  },
  render: function () {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    return this;
  },

  deleteFeed: function(event) {
    event.preventDefault();
    this.model.destroy();
    this.remove();
  }
});
