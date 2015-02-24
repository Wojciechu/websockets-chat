var security = require('./security');

module.exports = function (app) {

  app.get('/', function (request, response) {
    if (request.session.token) {
      response.redirect('/chat');
    }
    else {
      response.render('login', { error: request.query.error });
    }
  });

  app.get('/chat', function (request, response) {
    response.render('chat', { username: request.session.username });
  });

  app.post('/login/auth', function (request, response) {
    var authZToken;
    var username = sanitizer.sanitize(request.body.username);
    var hash = sanitizer.sanitize(request.body.hash);

    if (security.authenticate(username, hash)) {
      authZToken = security.prepareAuthZToken(username, hash);
      request.session.username = username;
      request.session.token = authZToken;
      response.redirect('/chat');
    }
    else {
      response.redirect('/?error=true');
    }
  });

  app.post('/login/salt', function (request, response) {
    var username = sanitizer.sanitize(request.body.username);
    response.send(security.generateSalt(username));
  });

  app.get('/logout', function (request, response) {
    request.session = null;
    response.redirect('/');
  });
};
