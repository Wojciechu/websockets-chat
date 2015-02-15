var express     = require('express');
var app         = express();
var http        = require('http').createServer(app);
var path        = require('path');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var globals     = require('./definitions/globals');
var middleware  = require('./definitions/middleware')(app);
var events      = require('./definitions/events')(http);
var router      = require('./definitions/router')(app);

var port = Number(process.env.PORT || 5000);
http.listen(port, function() {
  console.log('listening on ' + port);
});
