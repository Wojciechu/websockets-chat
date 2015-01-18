var express  = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require('path');

global._    = require('lodash')();
global.io   = require('socket.io')(http);

var chat = require('./chat');
var events = require('./events');

module.exports = app;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', chat.index);


var port = Number(process.env.PORT || 5000);
http.listen(port, function() {
  console.log('listening on ' + port);
});
