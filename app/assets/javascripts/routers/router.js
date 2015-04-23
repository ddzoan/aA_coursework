NewsReader.Routers.router = Backbone.Router.extend({
  routes: {
    "": "feedIndex",
    "feeds/:id": "feedShow"
  },

  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    this.feeds = new NewsReader.Collections.Feeds();
  },

  feedIndex: function () {
    this.feeds.fetch();
    var feedIndex = new NewsReader.Views.feedIndex({ collection: this.feeds });
    this.$rootEl.html(feedIndex.render().$el);
  },

  feedShow: function (id) {
    var feed = this.feeds.getOrFetch(id);
    var showFeed = new NewsReader.Views.feedShow({ model: feed });
    this.$rootEl.html(showFeed.render().$el);
  }
});
