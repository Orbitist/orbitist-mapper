Template.mapPage.helpers({
  stories: function() {
    return Stories.find({mapId: this._id});
  }
});