JournalApp.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts_index'],
  initialize: function(){
    this.listenTo(this.collection, 'sync remove add change', this.render);
  },

  render: function () {
    var content = this.template({ posts: this.collection });
    this.$el.html(content);

    this.collection.each(function(post){
      var postItem = new JournalApp.Views.PostsIndexItem({ model: post });
      this.$('ul.posts').append(postItem.render().$el);
    });

    return this;
  },
});
