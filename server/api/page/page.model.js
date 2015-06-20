'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageSchema = new Schema({
    user_id: String,
    page_id: String,
    name: String,
    info: String,
    active: Boolean
});

module.exports = mongoose.model('Page', PageSchema);
