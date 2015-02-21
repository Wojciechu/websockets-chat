var security = require('./security');

module.exports = function (app) {

  app.get('/', function(request, response) {
    if (request.session.token) {
      response.redirect('/chat');
    }
    else {
      response.render('login', {error: request.query.error});
    }
  });

  app.get('/chat', function(request, response) {
    response.render('chat', {username: request.session.username});
  });

  app.post('/login/auth', function(request, response) {
    var authZToken;
    var credentials = request.body;
    if(security.authenticate(credentials.username, credentials.hash)) {
      authZToken = security.prepareAuthZToken(credentials);
      request.session.username = credentials.username;
      request.session.token = authZToken;
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
    request.session = null;
    response.redirect('/');
  });
};
