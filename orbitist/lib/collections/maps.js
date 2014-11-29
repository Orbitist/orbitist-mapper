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

validateMap = function (map) {
  var errors = {};
  if (!map.title)
    errors.title = "Please give your map a title.";
  return errors;
}

Meteor.methods({
  mapInsert: function(mapAttributes) {
    check(Meteor.userId(), String);
    check(mapAttributes, {
      title: String
    });
    
    var errors = validateMap(mapAttributes);
    if (errors.title)
      throw new Meteor.Error('invalid-map', "You must set a title for your map");
    
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