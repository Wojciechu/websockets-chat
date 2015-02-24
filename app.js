var express       = require('express');
var app           = express();
var http          = require('http').createServer(app);
var path          = require('path');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var cookieSession = require('cookie-session');
var cryptoJS      = require('crypto-js');
var csrf          = require('csurf');
var authorize     = require('./definitions/security').authorize;
var config        = require('./definitions/config');

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({secret: config.secretSession}));
app.use(csrf());

app.use(function (request, response, next) {
  response.locals.csrftoken = request.csrfToken();
  next();
});

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
