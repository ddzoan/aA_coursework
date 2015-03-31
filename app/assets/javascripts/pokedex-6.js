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
      $("#pokedex .pokemon-detail").append(this._pokemonDetail.$el);
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
  },

  toyDetail: function (pokemonId, toyId) {
    if (!this._pokemonDetail) {
      this.pokemonDetail(pokemonId, this.toyDetail.bind(this, pokemonId, toyId));
    } else {
      var toy = this._pokemonDetail.model.toys().get(toyId);
      var toyDetail = new Pokedex.Views.ToyDetail({ model: toy});
      $("#pokedex .toy-detail").append(toyDetail.$el);
      toyDetail.render();
    }
  },

  pokemonForm: function () {
  }
});

$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
