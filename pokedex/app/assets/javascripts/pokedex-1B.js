Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {


  var detail = $('<div>').addClass('detail');
  var destroy = $('<button>').addClass('delete').attr('id', 'destroy-pokemon');
  destroy.text('distruy pukeman');
  destroy.data('pokemon-id', pokemon.get('id'));
  detail.prepend(destroy);

  detail.prepend($('<img src=' + pokemon.escape('image_url') + '>'));
  var form = $('<form>');
  form.attr('id', 'poke-detail')
  form.append('<strong>id: ' + pokemon.get('id') + '</strong><br>');

  _(pokemon.attributes).each(function(value, key){
    if(key === 'id') {
      var input = $('<input>').attr({
        'name': 'pokemon[' + key + ']',
        'value': value
      });
      input.attr('type', 'hidden');

      form.append(input);
    } else if(key === 'poke_type'){
      var label = $('<label>');
      label.append(key);
      label.append('<br>');
      var otherList = $("#pokemon_poke_type").clone().attr('id', 'update_poke_type');

      otherList.find('option').each(function(index) {
        if($(this).text() === pokemon.get('poke_type')){
          $(this).prop('selected', true);
        }
      });

      label.append(otherList);
      form.append(label);
    } else {
      var label = $('<label>');
      label.append(key);
      var input = $('<input>').attr({
        'name': 'pokemon[' + key + ']',
        'value': value
      });
      label.append('<br>');
      label.append(input);
      form.append(label);
      form.append('<br>');

    }
  });
  form.append('<br>');
  form.append($('<input type=submit>'));
  detail.append(form);


  detail.append($('<ul>').addClass('toys'));
  pokemon.fetch({
    success: function(model, response, options) {
      Pokedex.rootView.renderToysList(model.toys());
    }
  })
  this.$pokeDetail.html(detail);
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  var pokemonId = $(event.currentTarget).data('id');
  var pokemon = this.pokes.get(pokemonId);
  Pokedex.rootView.renderPokemonDetail(pokemon);
  this.$toyDetail.html('');
};
