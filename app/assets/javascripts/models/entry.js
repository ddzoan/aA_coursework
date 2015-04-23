NewsReader.Models.Entry = Backbone.Model.extend({
  urlRoot: function() {
    return '/entries/' + this.id ;
  },
});
