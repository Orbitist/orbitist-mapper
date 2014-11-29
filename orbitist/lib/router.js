Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('maps'); }
});

Router.route('/', {name: 'mapsList'});
Router.route('/maps/:_id', {
  name: 'mapPage',
  data: function() { return Maps.findOne(this.params._id); }
});