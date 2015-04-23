NewsReader.Views.newFeedForm = Backbone.View.extend({
  template: JST['new_feed_form'],
  tagName: 'form',
  events: {
    "submit": "submit"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var formData = this.$el.serializeJSON();
    this.render();
    var newFeed = new NewsReader.Models.Feed();
    newFeed.save(formData, {
      success: function (model) {
        this.collection.add(model);
      }.bind(this)
    });
  }
});
