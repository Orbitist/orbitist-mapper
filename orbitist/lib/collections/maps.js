Maps = new Mongo.Collection('maps');

Maps.allow({
  update: function(userId, map) { return ownsDocument(userId, map); },
  remove: function(userId, map) { return ownsDocument(userId, map); },
});

Maps.deny({
  update: function(userId, map, fieldNames) {
    // may only edit the following field:
    return (_.without(fieldNames, 'title').length > 0);
  }
});

Meteor.methods({
  mapInsert: function(mapAttributes) {
    check(Meteor.userId(), String);
    check(mapAttributes, {
      title: String
    });
    var user = Meteor.user();
    var map = _.extend(mapAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });
    var mapId = Maps.insert(map);
    return {
      _id: mapId
    };
  }
});