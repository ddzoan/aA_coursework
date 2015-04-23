$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.userId = this.$el.data('user-id') || options.userId;
  this.followState = this.$el.data('initial-follow-state') || options.followState;
  this.render();
  this.handleClick();
};


$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$.extend($.FollowToggle.prototype, {
  render: function () {


    if(this.followState == "unfollowed") {
      this.$el.html("Follow!");
    } else {
      this.$el.html("Unfollow!");
    }
  },

  toggleState: function () {
    if(this.followState == "unfollowed"){
      this.followState = "followed";
    } else {
      this.followState = "unfollowed";
    }
  },

  handleClick: function () {
    this.$el.on('click', function (event) {
      event.preventDefault();
      this.$el.prop('disabled', true);

      var requestType = this.followState == "unfollowed" ? 'post' : 'delete';

      $.ajax({
        url: '/users/' + this.userId + '/follow',
        method: requestType,
        dataType: 'json',
        success: function (response) {
          this.toggleState();
          this.render();
          this.$el.prop('disabled', false);
        }.bind(this)
      });
    }.bind(this));
  }
});

$(function () {
  $("button.follow-toggle").followToggle();
});
