Template.storyCreate.created = function() {
  Session.set('storyCreateErrors', {});
}

Template.storyCreate.helpers({
  errorMessage: function(field) {
    return Session.get('storyCreateErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('storyCreateErrors')[field] ? 'has-error' : '';
  }
});

Template.storyCreate.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var story = {
      body: $body.val(),
      postId: template.data._id
    };

    var errors = {};
    if (! story.body) {
      errors.body = "Please write some content";
      return Session.set('storyCreateErrors', errors);
    }

    Meteor.call('storyInsert', story, function(error, storyId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});