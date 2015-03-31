Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    'click li': 'selectPokemonFromList'
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon();

  },

  addPokemonToList: function (pokemon) {
    var content = JST['pokemonListItem']({ pokemon: pokemon});
    this.$el.append(content);
  },

  refreshPokemon: function (options) {
    this.collection.fetch( {
      success: this.render.bind(this)
    }
    );
  },

  render: function () {
    this.$el.empty();
    this.collection.each(function(poke) {
      this.addPokemonToList(poke);
    }.bind(this));
    return this;
  },

  selectPokemonFromList: function (event) {
    var pokemon = this.collection.get($(event.currentTarget).data('id'));
    var pokemonDetail = new Pokedex.Views.PokemonDetail({ model: pokemon });
    $("#pokedex .pokemon-detail").append(pokemonDetail.$el);
    pokemonDetail.refreshPokemon();
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    'click .toys li': 'selectToyFromList'
  },

  refreshPokemon: function (options) {
    this.model.fetch( {
      success: this.render.bind(this)
    });
  },

  render: function () {
    this.$el.empty();
    var pokeContent = JST['pokemonDetail']({ pokemon: this.model });
    this.$el.append(pokeContent);
    this.model.toys().each(function(toy) {
      var toyContent = JST['toyListItem']({toy: toy});
      this.$el.find('.toys').append(toyContent);
    }.bind(this));
    return this;
  },

  selectToyFromList: function (event) {
    var toy = this.model.toys().get($(event.currentTarget).data('toy-id'));
    var toyDetail = new Pokedex.Views.ToyDetail({ model: toy});
    debugger
    $("#pokedex .toy-detail").append(toyDetail.$el);
    toyDetail.render();
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    var content = JST['toyDetail']({ toy: this.model, pokes: _([]) });
    this.$el.append(content);
    return this;
  }
});


$(function () {
  var pokemonIndex = new Pokedex.Views.PokemonIndex();
  pokemonIndex.refreshPokemon();
  $("#pokedex .pokemon-list").html(pokemonIndex.$el);
});
