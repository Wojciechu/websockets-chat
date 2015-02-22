var express       = require('express');
var app           = express();
var http          = require('http').createServer(app);
var path          = require('path');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var cookieSession = require('cookie-session');
var cryptoJS      = require('crypto-js');
var authorize     = require('./definitions/security').authorize;

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({secret: 'W385OCK375'}));

app.use('/chat', function (request, response, next) {
  if (authorize(request.session.username, request.session.token)) {
    next();
  } 
  else {
    request.session = null;
    response.redirect('/');
  }
});

var globals     = require('./definitions/globals');
var events      = require('./definitions/chat')(http);
var router      = require('./definitions/router')(app);

app.use(function(request, response) {
  response.status(404).send('Not found');
});

var port = Number(process.env.PORT || 5000);
http.listen(port, function() {
  console.log('listening on ' + port);
});
