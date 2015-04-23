NewsReader.Views.feedShow = Backbone.View.extend({
  template: JST['feed_show'],
  events: {
    'click .refresh': 'refreshFeed'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    var entries = this.model.entries();
    entries.each(function(entry) {
      var newEntry = new NewsReader.Views.Entry({ model: entry });
      this.$('.entries').append(newEntry.render().$el);
    });
    return this;
  },

  refreshFeed: function () {
    this.model.fetch();
  }
});
