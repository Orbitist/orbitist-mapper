Template.mapItem.helpers({
  ownMap: function() {
    return this.userId === Meteor.userId();
  },
  storiesCount: function() {
    return Stories.find({mapId: this._id}).count();
  }
});