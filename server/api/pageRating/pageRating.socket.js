/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var PageRating = require('./pageRating.model');

exports.register = function(socket) {
  PageRating.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  PageRating.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('pageRating:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('pageRating:remove', doc);
}