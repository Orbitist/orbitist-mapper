Stories = new Mongo.Collection('stories');

Meteor.methods({
  storyInsert: function(storyAttributes) {
    check(this.userId, String);
    check(storyAttributes, {
      mapId: String,
      body: String
    });
    var user = Meteor.user();
    var map = Maps.findOne(storyAttributes.mapId);
    if (!map)
      throw new Meteor.Error('invalid-story', 'You must write a story');
    story = _.extend(storyAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    return Stories.insert(story);
  }
});