$.UsersSearch = function (el) {
  this.$el = $(el);
  this.addListener();
  this.$userList = this.$el.find('.users');
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$.extend($.UsersSearch.prototype, {
  addListener: function () {
    this.$el.find('input').on('input', function (event) {
      var textForm = $(event.currentTarget).serializeJSON();
      this.handleInput(textForm);
    }.bind(this));
  },

  handleInput: function (text) {
    $.ajax({
      url: '/users/search',
      method: 'get',
      data: text,
      dataType: 'json',
      success: function (response) {
        this.renderResults(response);
      }.bind(this)
    });
  },

  renderResults: function (users) {
    this.$userList.empty();
    users.forEach( function(user) {
      var link = $('<a>').attr('href', '/users/' + user.id).html(user.username);
      var followState = user.followed ? 'followed' : 'unfollowed';
      var button = $('<button>').attr('class', 'follow-toggle');
      button.followToggle({'userId': user.id, 'followState': followState});
      var li = $("<li>").append(link).append(button);
      this.$userList.append(li);
    }.bind(this));
  }
});

$(function () {
  $('div.users-search').usersSearch();
});
