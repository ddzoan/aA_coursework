Pokedex.RootView.prototype.createPokemon = function (attrs, callback) {
  var newPokemon = new Pokedex.Models.Pokemon(attrs.pokemon);
  newPokemon.save({}, {
    success: function(model, response, options){
      this.pokes.add(newPokemon);
      this.addPokemonToList(newPokemon);
      callback(newPokemon);
    }.bind(this)
  });

};

Pokedex.RootView.prototype.submitPokemonForm = function (event) {
  event.preventDefault();
  var formData = this.$newPoke.serializeJSON();
  this.createPokemon(formData, this.renderPokemonDetail.bind(this))
};
