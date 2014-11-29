Template.mapEdit.created = function() {
  Session.set('mapEditErrors', {});
}
Template.mapEdit.helpers({
  errorMessage: function(field) {
    return Session.get('mapEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('mapEditErrors')[field] ? 'has-error' : '';
  }
});

Template.mapEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentMapId = this._id;

    var mapProperties = {
      title: $(e.target).find('[name=title]').val()
    }
    
    var errors = validateMap(mapProperties);
    if (errors.title)
      return Session.set('mapEditErrors', errors);

    Maps.update(currentMapId, {$set: mapProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('mapPage', {_id: currentMapId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this map?")) {
      var currentMapId = this._id;
      Maps.remove(currentMapId);
      Router.go('mapsList');
    }
  }
});