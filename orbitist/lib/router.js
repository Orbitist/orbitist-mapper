Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('maps'); }
});

Router.route('/', {name: 'mapsList'});