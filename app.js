var express     = require('express');
var app         = express();
var http        = require('http').createServer(app);
var path        = require('path');
global.io       = require('socket.io')(http);

global._        = require('lodash')();
global.moment   = require('moment');

var environment = require('./definitions/environment')(app, express, path);
var events      = require('./definitions/events');
var middleware  = require('./definitions/middleware')(app, express);
var chat        = require('./definitions/chat')(app);

module.exports = app;

var port = Number(process.env.PORT || 5000);
http.listen(port, function() {
  console.log('listening on ' + port);
});
