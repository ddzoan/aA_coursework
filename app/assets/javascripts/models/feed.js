NewsReader.Models.Feed = Backbone.Model.extend({
  urlRoot: 'api/feeds',

  entries: function () {
    if (this._entries) {
      return this._entries;
    } else {
      this._entries = new NewsReader.Collections.Entries([], { feed: this });
      return this._entries;
    }
  },

  parse: function (response) {
    this.entries().set(response.latest_entries);
    delete response.lastest_entries;
    return response;
  }
});
