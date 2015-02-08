var express     = require('express');
var app         = express();
var http        = require('http').createServer(app);
var path        = require('path');
var bodyParser  = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
global.io       = require('socket.io')(http);

global._        = require('lodash');
global.moment   = require('moment');
global.sha256 = require('crypto-js/sha256');

var environment = require('./definitions/environment')(app, express, path);
var middleware  = require('./definitions/middleware')(app, express);
var events      = require('./definitions/events');
var router      = require('./definitions/router')(app);


module.exports = app;


var port = Number(process.env.PORT || 5000);
http.listen(port, function() {
  console.log('listening on ' + port);
});
