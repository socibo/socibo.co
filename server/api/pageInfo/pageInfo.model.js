'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageInfoSchema = new Schema({
    user_id: String,
    page_id: Number,
    name: String,
    active: Boolean,

    can_post: Boolean,
    category: String,
    checkins: Number,
    country_page_likes: Number,
    cover: Object,
    has_added_app: Boolean,
    is_community_page:  Boolean,
    is_published:  Boolean,
    new_like_count: Number,
    likes: Number,
    link: String,
    offer_eligible: Boolean,
    promotion_eligible: Boolean,
    talking_about_count: Number,
    unread_message_count: Number,
    unread_notif_count: Number,
    unseen_message_count: Number,
    username: String,
    website: String,
    were_here_count: Number
});

module.exports = mongoose.model('PageInfo', PageInfoSchema);
