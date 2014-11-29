Template.mapCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var map = {
      title: $(e.target).find('[name=title]').val()
    };

    Meteor.call('mapInsert', map, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);
      Router.go('mapPage', {_id: result._id});  
    });
  }
});