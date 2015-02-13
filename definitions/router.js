module.exports = function (app) {
  app.get('/', function(request, response) {
    response.render('login');
  });
  app.get('/chat', function(request, response) {
    response.render('chat');
  });
  app.post('/login/auth', function(request, response) {
    var credentials = request.body;
    var hash = cryptoJS.HmacSHA256('www', 'posolone').toString();
    if(credentials.username + credentials.passwordHash === 'www' + hash) {
      var cookieData = {
        username: credentials.username,
        hash: hash
      };
      response.cookie('auth', 'www' + hash);
      response.cookie('username', 'www');
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
