window.JournalApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new JournalApp.Routers.PostsRouter($('#main'));
    Backbone.history.start();
  }
};

$(document).ready(function(){
  JournalApp.initialize();
});
