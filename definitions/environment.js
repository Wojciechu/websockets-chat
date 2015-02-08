module.exports = function (app, express, path) {
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'jade');

  app.use(express.static(path.join(__dirname, '../public')));
};


