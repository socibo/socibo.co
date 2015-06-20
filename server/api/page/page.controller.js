'use strict';

var _ = require('lodash');
var fb = require('./pagescanner/scanner')
var User = require('../user/user.model');
var Page = require('./page.model');

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


// Get list of pages
exports.index = function(req, res) {
  Page.find(function (err, pages) {
    if(err) { return handleError(res, err); }
    return res.json(200, pages);
  });
};

// Get a single page
exports.show = function(req, res) {
  Page.findById(req.params.id, function (err, page) {
    if(err) { return handleError(res, err); }
    if(!page) { return res.send(404); }
    return res.json(page);
  });
};

// Creates a new page in the DB.
exports.create = function(req, res) {
    var decorateJob = function(job){
	job.on('complete', function(result){
	    console.log('Job completed with data ', result);
	}).on('failed attempt', function(errorMessage, doneAttempts){
	    console.log('Job failed', errorMessage, doneAttempts);

	}).on('failed', function(errorMessage){
	    console.log('Job failed', errorMessage);

	}).on('progress', function(progress, data){
	    console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data );
	});	
    };
    
    Page.create(req.body, function(err, page) {
	if(err) { return handleError(res, err); }
	console.log(page);
	User.findById(page.user_id, function(err, user){
	    var accIdx = _.findIndex(user.facebook.accounts, function(a){ return a.name === page.name});
	    var acc = user.facebook.accounts[accIdx];
	    console.log('Acc', acc);
	    
	    var job = queue.create('facebook.scan_page_info', {page_id: page.page_id, access_token: acc.access_token}).priority('high').save();
	    decorateJob(job)
	    job = queue.create('facebook.scan_page_ratings', {page_id: page.page_id, access_token: acc.access_token}).priority('high').save();
	    decorateJob(job)
	    
	    return res.json(201, page);
	    
	});

    });

};

// Updates an existing page in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Page.findById(req.params.id, function (err, page) {
    if (err) { return handleError(res, err); }
    if(!page) { return res.send(404); }
    var updated = _.merge(page, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, page);
    });
  });
};

// Deletes a page from the DB.
exports.destroy = function(req, res) {
  Page.findById(req.params.id, function (err, page) {
    if(err) { return handleError(res, err); }
    if(!page) { return res.send(404); }
    page.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
