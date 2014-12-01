Meteor.publish('maps', function() {
  return Maps.find();
});

Meteor.publish('stories', function() {
  return Stories.find();
});