NewsReader.Views.Entry = Backbone.View.extend({
  template: JST['entry'],
  tagName: 'li',
  render: function () {
    var content = this.template({ entry: this.model });
    this.$el.html(content);
    return this;
  }
});
