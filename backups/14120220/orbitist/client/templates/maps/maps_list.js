Template.mapsList.helpers({
	maps: function() {
    return Maps.find({}, {sort: {submitted: -1}});
  }
});