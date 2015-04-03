NewsReader.Views.feedIndex = Backbone.View.extend({
  template: JST['feed_index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({feeds: this.collection});
    this.$el.html(content);
    this.collection.each(function(feed) {
      var newFeedItem = new NewsReader.Views.feedIndexItem({ model: feed });
      this.$('.feeds').append(newFeedItem.render().$el);
    });
    return this;
  }
});
