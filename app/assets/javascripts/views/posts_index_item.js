JournalApp.Views.PostsIndexItem = Backbone.View.extend({
  template: JST['posts_index_item'],
  tagName: 'li',
  events: {
    'click .delete-item': 'removePost',
    'click .title': 'selectPost'
  },

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  },

  removePost: function (event) {
    this.model.destroy();
    this.remove();
  },

  selectPost: function (event) {
    Backbone.history.navigate('/posts/' + this.model.id, { trigger: true });
  }
});
