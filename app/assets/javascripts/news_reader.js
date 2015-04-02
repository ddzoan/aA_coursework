window.NewsReader = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.router = new NewsReader.Routers.router($("#content"));
    Backbone.history.start();
  }
};

$(document).ready(function(){
  NewsReader.initialize();
});
