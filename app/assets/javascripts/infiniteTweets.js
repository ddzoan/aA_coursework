$(function () {
  $('.infinite-tweets').infiniteTweets();
});

$.fn.infiniteTweets = function () {
  return this.each(function () {
    new $.InfiniteTweets(this);
  });
};

$.InfiniteTweets = function (el) {
  this.$el = $(el);
  this.addListener();
};

$.extend($.InfiniteTweets.prototype, {
  addListener: function () {
    this.$el.find('.fetch-more').on('click', this.fetchTweets.bind(this));
  },

  fetchTweets: function () {
    var feedItems = this.$el.find('#feed');
    var lastTweet = feedItems.find(":last-child").html();
    if(lastTweet) {
      var lastCreatedAt = JSON.parse(lastTweet).created_at;
    }
    $.ajax({
      url: '/feed',
      method: 'get',
      data: {'max_created_at': lastCreatedAt },
      dataType: 'json',
      success: function(response) {
        this.insertTweets(response);
      }.bind(this)
    });
  },

  insertTweets: function (tweets) {
    if(tweets.length < 20) {
      this.$el.find(".fetch-more").remove();
    }
    var template = this.$el.find('script').html();
    debugger
    var partial = _.template(template)({ tweets: tweets });
    this.$el.find('#feed').append(partial);
    // tweets.forEach(function (tweet) {
    //   var li = $('<li>').html(JSON.stringify(tweet));
    //   this.$el.find('#feed').append(li);
    // }.bind(this));
  }
});
