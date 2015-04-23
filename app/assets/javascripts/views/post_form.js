JournalApp.Views.PostForm = Backbone.View.extend({
  template: JST['post_form'],
  tagName: 'form',
  events: {
    'submit': 'savePost'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.errors = null;
  },

  render: function () {
    var content = this.template({ post: this.model, errors: this.errors });
    this.$el.html(content);
    return this;
  },

  savePost: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON().post;
    this.model.save(formData, {
      success: function(model){
        this.errors = undefined;
        this.collection.add(model, { merge: true });
        Backbone.history.navigate('/posts/' + model.id, {trigger: true})
      }.bind(this),
      error: function(model, response) {
        this.errors = response.responseText;
        this.render();
        this.errors = null;
      }.bind(this)
    });
  }

});
