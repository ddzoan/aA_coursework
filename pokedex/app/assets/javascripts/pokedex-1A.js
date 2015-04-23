Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  var $li = $('<li>');
  $li.addClass('poke-list-item');
  $li.data('id', pokemon.get('id'));
  // $li.attr('data-id')
  var str = pokemon.get('name') + ' <br> type: ' + pokemon.get('poke_type');
  $li.append(str);
  this.$pokeList.append($li);
};

Pokedex.RootView.prototype.refreshPokemon = function () {
  this.pokes.fetch({
    success: function(pokemon) {
      pokemon.each(function(poke) {
        Pokedex.rootView.addPokemonToList(poke);
      })
    }
  })
};
