Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({
  events: {
    'submit form' : 'savePokemon'
  },

  render: function () {
    var content = JST['pokemonForm']({});
    this.$el.html(content);
    return this;
  },

  savePokemon: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON().pokemon;
    var newPoke = new Pokedex.Models.Pokemon(params);
    newPoke.save({}, {
      success: function() {
        this.collection.add(newPoke);
        Backbone.history.navigate('pokemon/' + newPoke.id, { trigger: true });
      }.bind(this)
    });
  }
});
