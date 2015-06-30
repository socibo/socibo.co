var _ = require('lodash');
var Page = require('../../api/page/page.model');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function (User, config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'facebook.id': profile.id
      },
      function(err, user) {
        if (err) {
          return done(err);
        }
          if (!user) {
              user = new User({
		  name: profile.displayName,
		  email: profile.emails[0].value,
		  role: 'user',
		  id: profile.id,
		  username: profile.username,
		  provider: 'facebook',
		  facebook: profile._json
              });
	      require('https').get({host: 'graph.facebook.com', path:'/v2.3/me/accounts?access_token=' + accessToken}, function(response){
		  var accounts = '';
		  response.on('data', function (chunk) {
		      console.log('BODY: ' + chunk);
		      accounts += chunk;
		  });
		  
		  response.on('end', function(){
		      user.facebook.access_token = accessToken;
		      user.facebook.accounts = JSON.parse(accounts).data;

		      user.save(function(err) {
			  if (err) done(err);
			  _(user.facebook.accounts).forEach(function(account){
			      account.user_id = user.id;
			      account.page_id = account.id;
			      delete account.id;
			      console.log('Account:', account)

			      Page.create(account, function(err, page){
				  console.log('Page CREATE', err, page);
			      });
			      
			      // emulating http call
			  })
			  
			  return done(err, user);
		      });
		      
		  });
	      })
          } else {
              return done(err, user);
          }
      })
    }));
};
