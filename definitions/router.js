var security = require('./security');

module.exports = function (app) {

  app.get('/', function(request, response) {
    response.render('login', {error: request.query.error});
  });

  app.get('/chat', function(request, response) {
    response.render('chat');
  });

  app.post('/login/auth', function(request, response) {
    var token;
    var credentials = request.body;
    if(security.authenticate(credentials.username, credentials.hash)) {
      token = security.prepareAuthZToken(credentials.hash);
      response.cookie('hash', token);
      response.cookie('username', credentials.username);
      response.redirect('/chat');
    }
    else {
      response.redirect('/?error=true');
    }
  });

  app.post('/login/salt', function(request, response) {
    var salt = security.generateSalt(request.body.name);
    response.send(salt);
  });

  app.get('/logout', function(request, response) {
    response.clearCookie('hash');
    response.clearCookie('username');
    response.redirect('/');
  });
};
