Meteor.publish('maps', function() {
  return Maps.find();
});

Meteor.publish('stories', function(mapId) {
  check(mapId, String);
  return Stories.find({mapId: mapId});
});