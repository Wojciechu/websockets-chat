var cryptoJS  = require('crypto-js');
var authorize = require('./security').authorize;

module.exports = function (app) {
  app.get('/', function(request, response) {
    response.render('login');
  });
  app.get('/chat', function(request, response) {
    response.render('chat');
  });
  app.post('/login/auth', function(request, response) {
    var credentials = request.body;
    if(authorize(credentials.username, credentials.hash)) {
      response.cookie('hash', credentials.hash);
      response.cookie('username', credentials.username);
      response.redirect('/chat');
    }
    else {
      response.status(403).send('Forbidden');
    }
  });
  app.get('/login/salt', function(request, response) {
    response.send('posolone');
  });
};
