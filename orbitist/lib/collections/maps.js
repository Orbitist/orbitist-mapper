Maps = new Mongo.Collection('maps');

Maps.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});