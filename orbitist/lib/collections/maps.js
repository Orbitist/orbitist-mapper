Maps = new Mongo.Collection('maps');

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