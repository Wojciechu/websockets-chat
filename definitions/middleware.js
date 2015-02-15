var cryptoJS = require('crypto-js');
var authorize = require('./security').authorize;

module.exports = function (app) {
  app.use('/chat', function (request, response, next) {
    if(authorize(request.cookies.username, request.cookies.hash)) {
      next();
    } 
    else {
      response.clearCookie('hash');
      response.clearCookie('username');
      response.redirect('/');
    }
  });
};
