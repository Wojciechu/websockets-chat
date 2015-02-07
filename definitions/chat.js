module.exports = function (app) {
  app.get('/', function(req, res) {
    res.render('login');
  });
  app.get('/chat', function(req, res) {
    res.render('chat');
  });
};
