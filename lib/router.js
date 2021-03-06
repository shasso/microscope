Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('posts');
    }
});
// route to home page
Router.route('/', { name: 'postsList' });

// route to indvidual posts 
Router.route('/posts/:_id', {
    name: 'postPage',
    data: function () {
        return Posts.findOne(this.params._id);
    }
});
Router.onBeforeAction('dataNotFound', { only: 'postPage' });

Router.route('/submit', { name: 'postSubmit' });
var requireLogin = function () {
    if (!Meteor.user()) {
        this.render('accessDenied');
    } else {
        this.next();
    }
}
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});