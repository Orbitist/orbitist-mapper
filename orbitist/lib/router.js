Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('maps'), Meteor.subscribe('stories')];
  }
});

Router.route('/', {name: 'mapsList'});

Router.route('/maps/:_id', {
  name: 'mapPage',
  data: function() { return Maps.findOne(this.params._id); }
});

Router.route('/maps/:_id/edit', {
  name: 'mapEdit',
  data: function() { return Maps.findOne(this.params._id); }
});

Router.route('/create', {name: 'mapCreate'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'mapPage'});
Router.onBeforeAction(requireLogin, {only: 'mapCreate'});