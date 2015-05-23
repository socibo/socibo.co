/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var httpProxy = require('http-proxy');
var https = require('https');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

var options=require('proxy-by-url')({
	'/github': { port: 80, host: 'github.com' },
	'/nodejitsu': { port: 80, host: 'nodejitsu.com' },
	'/localstuff': { port: 8080, host: 'localhost' }
    })

//
// Just set up your options...
//
//
// ...and then pass them in when you create your proxy.
//
var proxyServer = httpProxy.createServer(options).listen(9001);
// Setup server
var app = express();

var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);



// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
