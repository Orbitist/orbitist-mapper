Template.mapCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var map = {
      title: $(e.target).find('[name=title]').val()
    };

    map._id = Maps.insert(map);
    Router.go('mapPage', map);
  }
});