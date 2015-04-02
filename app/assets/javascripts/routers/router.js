NewsReader.Routers.router = Backbone.Router.extend({
  routes: {
    "": "feedIndex"
  },

  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    this.feeds = new NewsReader.Collections.Feeds();
  },

  feedIndex: function () {
    this.feeds.fetch();
    var feedIndex = new NewsReader.Views.feedIndex({collection: this.feeds});
    this.$rootEl.html(feedIndex.render().$el);
  }
});
