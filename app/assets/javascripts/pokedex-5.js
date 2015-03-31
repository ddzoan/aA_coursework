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
      success: function () {
        this.render();
        if(options.success){
          options.success.call(this);
        }
      }.bind(this)
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
    var pokemonId = $(event.currentTarget).data('id');
    // var pokemon = this.collection.get($(event.currentTarget).data('id'));
    Backbone.history.navigate('/pokemon/' + pokemonId, { trigger: true });
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    'click .toys li': 'selectToyFromList'
  },

  refreshPokemon: function (options) {
    this.model.fetch( {
      success: function () {
        this.render();
        if(options.success){
          options.success.call(this);
        }
      }.bind(this)
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
    var target = $(event.currentTarget);
    var toyId = target.data('toy-id');
    var pokemonId = target.data('pokemon-id');


    Backbone.history.navigate('pokemon/' + pokemonId + '/toys/' + toyId, { trigger: true })
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    var content = JST['toyDetail']({ toy: this.model, pokes: _([]) });
    this.$el.append(content);
    return this;
  }
});

//
// $(function () {
//   var pokemonIndex = new Pokedex.Views.PokemonIndex();
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });
