var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

exports.setup = function (User, config) {
  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
      passReqToCallback   : true
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'google.id': profile.id
      }, function(err, user) {

	  // require('https').get({host: 'graph.facebook.com', path:'/v2.3/me/accounts?access_token=' + accessToken}, function(response){
	  //     var accounts = '';
	  //     response.on('data', function (chunk) {
	  // 	  console.log('BODY: ' + chunk);
	  // 	  accounts += chunk;
	  //     });
	      
	  //     response.on('end', function(){
	  // 	  user.facebook.access_token = accessToken;
	  // 	  user.facebook.accounts = JSON.parse(accounts).data;
		  
	  // 	  user.save(function(err) {
	  // 	      if (err) done(err);
	  // 	      return done(err, user);
	  // 	  });
		  
	  //     });
	  // })	  
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.username,
            provider: 'google',
            google: profile._json
          });
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));
};
