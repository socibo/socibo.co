var process = require('process');
var Facebook = require('facebook-node-sdk');

var facebook = new Facebook({ appID: process.env.FACEBOOK_ID, secret:  process.env.FACEBOOK_SECRET });


module.exports = {
    scanPageInfo: function(pageId, access_token, done){
	console.log("Start page info scan:" + pageId, access_token);
	facebook.setAccessToken(access_token)
	facebook.api('/' + pageId , function(err, data) {
	    done(err, data);
	})
    },
    
    scanPageRatings: function (pageId, access_token, done) {
	console.log("Start ratings scan:" + pageId, access_token);
	facebook.setAccessToken(access_token)
	facebook.api('/' + pageId + '/ratings?field=open_graph_story' , function(err, data) {
	    done(err, data);
	})
    },

}
