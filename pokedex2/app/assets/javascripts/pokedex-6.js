Pokedex.Router = Backbone.Router.extend({
  routes: {
    '' : 'pokemonIndex',
    'pokemon/:id': 'pokemonDetail',
    'pokemon/:pokemonId/toys/:toyId': 'toyDetail'
  },

  pokemonDetail: function (id, callback) {
    if (!this._pokemonIndex) {
      this.pokemonIndex(this.pokemonDetail.bind(this, id, callback));
    } else {
      var pokemon = this._pokemonIndex.collection.get(id)
      this._pokemonDetail = new Pokedex.Views.PokemonDetail({ model: pokemon });
      $("#pokedex .toy-detail").html('');
      $("#pokedex .pokemon-detail").html(this._pokemonDetail.$el);
      this._pokemonDetail.refreshPokemon({
        success: callback
      });
    }
  },

  pokemonIndex: function (callback) {
    this._pokemonIndex = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex.refreshPokemon({
      success: callback
    });
    $("#pokedex .pokemon-list").html(this._pokemonIndex.$el);
    this.pokemonForm();
  },

  toyDetail: function (pokemonId, toyId) {
    if (!this._pokemonDetail || this._pokemonDetail.model.id != pokemonId) {
      this.pokemonDetail(pokemonId, this.toyDetail.bind(this, pokemonId, toyId));
    } else {
      var toy = this._pokemonDetail.model.toys().get(toyId);
      var toyDetail = new Pokedex.Views.ToyDetail({ model: toy, collection: this._pokemonIndex.collection });
      $("#pokedex .toy-detail").html(toyDetail.$el);
      toyDetail.render();
    }
  },

  pokemonForm: function () {
    var pokemon = new Pokedex.Models.Pokemon();
    var form = new Pokedex.Views.PokemonForm({ model: pokemon,
               collection: this._pokemonIndex.collection});
    form.render();
    $('#pokedex .pokemon-form').append(form.$el);
  }
});

$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
