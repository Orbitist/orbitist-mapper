Template.mapCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      title: $(e.target).find('[name=title]').val()
    };

    post._id = Maps.insert(map);
    Router.go('mapPage', map);
  }
});