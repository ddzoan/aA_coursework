JournalApp.Routers.PostsRouter = Backbone.Router.extend({
  routes: {
    '': 'postsIndex',
    'posts/new': 'postNew',
    'posts/:id': 'postShow'
  },

  initialize: function ($rootEl) {
    this.$rootEl = $rootEl;
    this.$sidebar = $rootEl.find('.sidebar');
    this.$content = $rootEl.find('.content');

    this.posts = new JournalApp.Collections.Posts();

    this._postsIndex = new JournalApp.Views.PostsIndex({ collection: this.posts });
    this.posts.fetch();
    this.$sidebar.html(this._postsIndex.render().$el);
  },

  postsIndex: function () {

  },

  postShow: function (id) {
    var post = this.posts.getOrFetch(id);
    this._postShow = new JournalApp.Views.PostShow({ model: post, collection: this.posts });
    post.fetch();
    this.$content.html(this._postShow.render().$el);
  },

  postNew: function () {
    var post = new JournalApp.Models.Post();
    var postForm = new JournalApp.Views.PostForm({
      model: post,
      collection: this.posts
    });
    this.$content.html(postForm.render().$el);
  }
});
