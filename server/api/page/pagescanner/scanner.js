var Facebook = require('facebook-node-sdk');

var facebook = new Facebook({ appID: '753977061366187', secret: '92217d3890fa2cf8b6fea8ecfcd3d319' });


module.exports = {
    scanPageInfo: function(pageId, access_token, done){
	console.log("Start ratings scan:" + pageId, access_token);
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
