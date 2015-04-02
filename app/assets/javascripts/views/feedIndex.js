NewsReader.Views.feedIndex = Backbone.View.extend({
  template: JST['feed_index'],


  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function(){
    var content = this.template({feeds: this.collection});
    $('#content').html(content);
    return this;
  }
});
