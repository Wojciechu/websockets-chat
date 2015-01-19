module.exports = function (app) {
  app.get('/', function(req, res) {
    res.render('index', { pageTitle: 'Socket.io chat', placeholder: "What's your name?" });
  });
}
