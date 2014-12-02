Template.mapsList.helpers({
	maps: function() {
    return Maps.find({}, {sort: {submitted: -1}});
  },
  storiesCount: function() {
    return Stories.find({mapId: this._id}).count();
  }
});