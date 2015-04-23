Pokedex.RootView.prototype.addToyToList = function (toy) {
  var li = $('<li>').addClass('toy-list-item');
  li.data({'toy-id': toy.get('id'), 'pokemon-id': toy.get('pokemon_id')});
  var str = toy.get('name') + ' provides ' + toy.get('happiness') + ' happiness for the low, low price of $' + toy.get('price');
  li.append(str);
  this.$pokeDetail.find('ul.toys').append(li);
};

Pokedex.RootView.prototype.renderToyDetail = function (toy) {
  var div = $('<div>').addClass('detail');
  var destroy = $('<button>').addClass('delete').attr('id', 'destroy-toy');
  destroy.text('distruy pukemanz thuy');
  destroy.data('toy-id', toy.get('id'));
  destroy.data('pokemon-id', toy.get('pokemon_id'));
  div.prepend(destroy);
  div.prepend($('<img src=' + toy.escape('image_url') + '>'));
  var form = $('<form>');
  form.attr('id', 'toy-detail');
  _(toy.attributes).each(function(value, key) {
    if(key === 'id' || key === 'pokemon_id'){
      var input = $('<input>').attr({
        'name': 'toy[' + key + ']',
        'value': value
      });
      input.attr('type', 'hidden');

      form.append(input);
    } else {
      var label = $('<label>');
      label.append(key);
      var input = $('<input>').attr({
        'name': 'toy[' + key + ']',
        'value': value
      });
      label.append('<br>');
      label.append(input);
      form.append(label);
      form.append('<br>');
    }
  });
  form.append($('<input type=submit>'))
  div.append(form);

  var ownerSelect = $('<select>');
  ownerSelect.data({'pokemon-id': toy.get('pokemon_id'),
                    'toy-id': toy.get('id')});
  this.pokes.each(function(pokemon){
    var option = $('<option>');
    option.attr('value', pokemon.get('id'));
    option.text(pokemon.get('name'));
    if(toy.get('pokemon_id') === pokemon.get('id')) {
      option.prop('selected', true);
    }
    ownerSelect.append(option);
  });
  div.append('<br>');
  div.append(ownerSelect);
  this.$toyDetail.html(div);
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  var $targ = $(event.currentTarget);
  var pokeId = $targ.data('pokemon-id');
  var toyId = $targ.data('toy-id');
  var toy = this.pokes.get(pokeId).toys().get(toyId);
  this.renderToyDetail(toy);
};
