/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

    // Insert routes below
    app.use('/api/pageRatings', require('./api/pageRating'));
    app.use('/api/pageInfos', require('./api/pageInfo'));
    app.use('/api/pages', require('./api/page'));
    app.use('/api/things', require('./api/thing'));
    app.use('/api/users', require('./api/user'));

    app.use('/auth', require('./auth'));
    
    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|scripts|js|view|styles)/*')
	.get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
	.get(function(req, res) {
	    res.sendfile(app.get('appPath') + '/index.html');
	});
};
