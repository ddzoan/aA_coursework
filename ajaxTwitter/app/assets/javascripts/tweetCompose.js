$(function () {
  $('.tweet-compose').tweetCompose();
});

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};

$.TweetCompose = function (el) {
  this.$el = $(el);
  this.bindEvents();
  this.feed = $(this.$el.data('tweets-ul'));
};

$.extend($.TweetCompose.prototype, {
  bindEvents: function () {
    this.monitorSubmit();
    this.charCount();
    this.mentionListener();
    this.removeMentionListener();
  },

  removeMentionListener: function () {
    this.$el.find('.mentioned-users').on('click', 'a.remove-mentioned-user', function (event) {
      this.removeMentionedUser($(event.currentTarget));
    }.bind(this));
  },

  removeMentionedUser: function ($link) {
    $link.parent().remove();
  },

  mentionListener: function () {
    this.$el.find(".add-mentioned-user").on('click', function (event) {
      event.preventDefault();
      this.addMentionedUser();
    }.bind(this));
  },

  addMentionedUser: function () {
    var select = this.$el.find('script').html();
    this.$el.find('.mentioned-users').append(select);
  },

  monitorSubmit: function () {
    this.$el.on('submit', function(event) {
      event.preventDefault();
      var form = $(event.currentTarget).serializeJSON();
      this.$el.find(':input').prop('disabled', true);
      this.submitTweet(form);
    }.bind(this));
  },

  charCount: function () {
    var $textarea = this.$el.find('textarea');
    $textarea.on('input', function(event) {
      this.$el.find('.chars-left').html(140 - $textarea.val().length);
    }.bind(this));
  },

  submitTweet: function (form) {
    $.ajax({
      url: '/tweets/',
      method: 'post',
      data: form,
      dataType: 'json',
      success: function (response) {
        this.handleSuccess(response);
      }.bind(this)
    });
  },

  handleSuccess: function (response) {
    this.clearInput();
    this.$el.find(':input').prop('disabled', false);
    var li = $('<li>').append(JSON.stringify(response));
    this.feed.prepend(li);
  },

  clearInput: function () {
    this.$el.find('textarea').val('');
    this.$el.find('.chars-left').text(140);
    this.$el.find('.mentioned-users').empty();
  }
});
