exports.index = function(req, res) {
  res.render('index', { pageTitle: 'Socket.io chat' });
}