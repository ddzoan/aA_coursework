JournalApp.Views.PostShow = Backbone.View.extend({
  template: JST['post_show'],
  errorTemplate: JST['errors'],
  events: {
    'dblclick .title h2': 'editTitle',
    'dblclick .postbody p': 'editBody',
    'blur .title input': 'updateTitle',
    'blur .postbody textarea': 'updateBody'
  },

  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  },

  editTitle: function () {
    var input = $('<input>', { value: this.model.get('title') });
    this.$('.title').html(input);
    input.focus();
  },

  editBody: function () {
    var text = this.model.get('body');
    var cols = 50;
    var linecount = 0;
    _(text.split("\n")).each( function(l) {
      linecount += Math.ceil( l.length / cols ); // take into account long lines
    } )
    var textarea = $('<textarea>', { text: text, cols: cols, rows: linecount + 1 });
    this.$('.postbody').html(textarea);
    textarea.focus();
  },

  updateTitle: function (event) {
    var newTitle = $(event.currentTarget).val();
    this.model.save({ title: newTitle }, {
      success: function (model) {
        var $h2 = $('<h2>').html(model.get('title'));
        this.$('.title').html($h2);
        this.collection.add(model, { merge: true });
      }.bind(this),

      error: function (model, response) {
        this.model.fetch();
      }.bind(this)
    });
  },

  updateBody: function (event) {
    var newBody = $(event.currentTarget).val();
    this.model.save({ body: newBody }, {
      success: function (model) {
        var $p = $('<p>').html(model.get('body'));
        this.$('.postbody').html($p);
        this.collection.add(model, { merge: true });
      }.bind(this),

      error: function () {
        this.model.fetch();
      }.bind(this)
    });
  }

});
