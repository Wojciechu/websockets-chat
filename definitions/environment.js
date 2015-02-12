module.exports = function (app, express, path) {
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'jade');

  app.use(express.static(path.join(__dirname, '../public')));
  app.use('/chat', function (request, response, next) {
    var hash = cryptoJS.HmacSHA256('www', 'posolone').toString();
    if('www' + hash === request.cookies.auth) {
      next();
    } 
    else {
      response.redirect('/');
    }
  });
};


