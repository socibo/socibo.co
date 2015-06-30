'use strict';

var _ = require('lodash');
var Page = require('./page.model');
var PageInfo = require('../pageInfo/pageInfo.model');
var PageRating = require('../pageRating/pageRating.model');


// Get list of pages
exports.index = function(req, res) {
    Page.find({}, '-access_token', function (err, pages) {
    if(err) { return handleError(res, err); }
    return res.json(200, pages);
  });
};

// Get a single page
exports.show = function(req, res) {
    Page.findById(req.params.id, '-access_token', function (err, page) {
    if(err) { return handleError(res, err); }
      if(!page) { return res.send(404); }
      delete page.access_token; // have to remove access token for secuirty purpose;
    return res.json(page);
  });
};

// Creates a new page in the DB.
exports.create = function(req, res) {
    Page.create(req.body, function(err, page) {
	if(err) { return handleError(res, err); }
	console.log(page);
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
