/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var PageInfo = require('./pageInfo.model');

exports.register = function(socket) {
  PageInfo.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  PageInfo.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('pageInfo:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('pageInfo:remove', doc);
}