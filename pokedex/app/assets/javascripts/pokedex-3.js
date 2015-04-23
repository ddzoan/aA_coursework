Pokedex.RootView.prototype.reassignToy = function (event) {
  var $newOwner = $(event.currentTarget);
  var oldPokemon = this.pokes.get($newOwner.data('pokemon-id'));
  var toy = oldPokemon.toys().get($newOwner.data('toy-id'));
  toy.set('pokemon_id', $newOwner.val());
  toy.save({}, {
    success: function(model, response, options) {
      oldPokemon.toys().remove(model);
      Pokedex.rootView.renderToysList(oldPokemon.toys());
      Pokedex.rootView.$toyDetail.html('');
      // var pokemon = Pokedex.rootView.pokes.get(model.get('pokemon_id'));
      // Pokedex.rootView.renderPokemonDetail(pokemon);
    }
  });
};

Pokedex.RootView.prototype.renderToysList = function (toys) {
  this.$pokeDetail.find('ul.toys').html('');
  toys.each(function(toy){
    Pokedex.rootView.addToyToList(toy);
  });
};

Pokedex.RootView.prototype.updateToy = function (event) {
  event.preventDefault();
  var formData = $(event.currentTarget).serializeJSON().toy;
  var pokemonId = formData.pokemon_id;
  var pokemon = this.pokes.get(pokemonId);
  var toy = pokemon.toys().get(formData.id);
  toy.set(formData);
  toy.save({}, {
    success: function(model, response, options) {
      Pokedex.rootView.renderToyDetail(model);
    }
  });
};

Pokedex.RootView.prototype.updatePokemon = function (event) {
  event.preventDefault();
  var formData = $(event.currentTarget).serializeJSON().pokemon;
  var pokemon = this.pokes.get(formData.id);
  pokemon.set(formData);
  pokemon.save({}, {
    success: function(model, response, options) {
      Pokedex.rootView.renderPokemonDetail(model);
    }
  });
};

Pokedex.RootView.prototype.destroyPokemon = function(e) {
  e.preventDefault();
  var pokemonId = $(e.currentTarget).data('pokemon-id');
  var pokemon = this.pokes.get(pokemonId);
  this.pokes.remove(pokemon);
  pokemon.destroy();
};

Pokedex.RootView.prototype.destroyToy = function(e) {
  e.preventDefault();
  var pokemonId = $(e.currentTarget).data('pokemon-id');
  var pokemon = this.pokes.get(pokemonId);
  var toyId = $(e.currentTarget).data('toy-id');
  var toy = pokemon.toys().get(toyId);
  // pokemon.toys().remove(toy);
  toy.destroy();
};
