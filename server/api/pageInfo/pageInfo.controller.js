'use strict';

var _ = require('lodash');
var PageInfo = require('./pageInfo.model');

// Get list of pageInfos
exports.index = function(req, res) {
  PageInfo.find(function (err, pageInfos) {
    if(err) { return handleError(res, err); }
    return res.json(200, pageInfos);
  });
};

// Get a single pageInfo
exports.show = function(req, res) {
  PageInfo.findById(req.params.id, function (err, pageInfo) {
    if(err) { return handleError(res, err); }
    if(!pageInfo) { return res.send(404); }
    return res.json(pageInfo);
  });
};

// Creates a new pageInfo in the DB.
exports.create = function(req, res) {
  PageInfo.create(req.body, function(err, pageInfo) {
    if(err) { return handleError(res, err); }
    return res.json(201, pageInfo);
  });
};

// Updates an existing pageInfo in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PageInfo.findById(req.params.id, function (err, pageInfo) {
    if (err) { return handleError(res, err); }
    if(!pageInfo) { return res.send(404); }
    var updated = _.merge(pageInfo, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, pageInfo);
    });
  });
};

// Deletes a pageInfo from the DB.
exports.destroy = function(req, res) {
  PageInfo.findById(req.params.id, function (err, pageInfo) {
    if(err) { return handleError(res, err); }
    if(!pageInfo) { return res.send(404); }
    pageInfo.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}