Template.mapCreate.created = function() {
  Session.set('mapCreateErrors', {});
}

Template.mapCreate.helpers({
  errorMessage: function(field) {
    return Session.get('mapCreateErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('mapCreateErrors')[field] ? 'has-error' : '';
  }
});

Template.mapCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var map = {
      title: $(e.target).find('[name=title]').val()
    };
    
    var errors = validateMap(map);
    if (errors.title)
      return Session.set('mapCreateErrors', errors);

    Meteor.call('mapInsert', map, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      Router.go('mapPage', {_id: result._id});  
    });
  }
});