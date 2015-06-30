'use strict';

var _ = require('lodash');
var PageRating = require('./pageRating.model');

// Get list of pageRatings
exports.index = function(req, res) {
  PageRating.find(function (err, pageRatings) {
    if(err) { return handleError(res, err); }
    return res.json(200, pageRatings);
  });
};

// Get a single pageRating
exports.show = function(req, res) {
  PageRating.findById(req.params.id, function (err, pageRating) {
    if(err) { return handleError(res, err); }
    if(!pageRating) { return res.send(404); }
    return res.json(pageRating);
  });
};

// Creates a new pageRating in the DB.
exports.create = function(req, res) {
  PageRating.create(req.body, function(err, pageRating) {
    if(err) { return handleError(res, err); }
    return res.json(201, pageRating);
  });
};

// Updates an existing pageRating in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PageRating.findById(req.params.id, function (err, pageRating) {
    if (err) { return handleError(res, err); }
    if(!pageRating) { return res.send(404); }
    var updated = _.merge(pageRating, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, pageRating);
    });
  });
};

// Deletes a pageRating from the DB.
exports.destroy = function(req, res) {
  PageRating.findById(req.params.id, function (err, pageRating) {
    if(err) { return handleError(res, err); }
    if(!pageRating) { return res.send(404); }
    pageRating.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}