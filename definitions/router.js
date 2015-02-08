module.exports = function (app) {
  app.get('/', function(request, response) {
    response.render('login');
  });
  app.get('/chat', function(request, response) {
    response.render('chat');
  });
  app.post('/login/auth', function(request, response) {
    var credentials = request.body;
    var hash = 'www' + sha256('www') + 'posolone';
    if(credentials.passwordHash === sha256(hash).toString()) {
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
