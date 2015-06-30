'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var _ = require('lodash');
var fb = require('./pagescanner/scanner');
var User = require('../user/user.model');
var PageInfo = require('../pageInfo/pageInfo.model');

var kue = require('kue')
, queue = kue.createQueue();

kue.app.listen(3000);


queue.process('facebook.scan_page_info', function(job, done){
    var data = job.data;
    console.log('data', data);
    fb.scanPageInfo(data.page_id, data.access_token, done)
})

queue.process('facebook.scan_page_ratings', function(job, done){
    var data = job.data;
    console.log('data', data);
    fb.scanPageRatings(data.page_id, data.access_token, done)
})



var PageSchema = new Schema({
    user_id: String,
    page_id: String,
    access_token: String,
    perms: [String],
    name: String,
    info: String,
    active: Boolean
});


PageSchema
    .post('save', function(page) {
	console.log('PRE CALLED');
	var decorateJob = function(job){
	    job.on('failed attempt', function(errorMessage, doneAttempts){
		console.log('Job failed', errorMessage, doneAttempts);

	    }).on('failed', function(errorMessage){
		console.log('Job failed', errorMessage);

	    }).on('progress', function(progress, data){
		console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data );
	    });	
	};
	console.log('Page', page, page.user_id);
	
	var job = queue.create('facebook.scan_page_info', {page_id: page.page_id, access_token: page.access_token}).priority('high').save();
	decorateJob(job)
	job.on('complete', function(result){
	    result.user_id = page.user_id;
	    result.page_id = result.id;
	    delete result.id;
	    console.log('scan_page_info job completed with data ', result);
	    PageInfo.create(result, function(err, pageInfo){
		console.log('PageInfo created:', err, pageInfo)
	    })
	    
	})   
	job = queue.create('facebook.scan_page_ratings', {page_id: page.page_id, access_token: page.access_token}).priority('high').save();
	decorateJob(job)
	job.on('complete', function(result){
	    console.log('scan_page_ratings job completed with data ', result);
	    // PageRating.create(result, function(err, pageRating){
	    //     console.log(err, pageRating)
	    // })		
	});
    });

module.exports = mongoose.model('Page', PageSchema);
