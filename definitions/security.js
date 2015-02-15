var users = require('./database').users;

exports.authorize = function (username, hash) {
  var user = users[username];

  if(hash === user.hash) {
    return true;
  }
  else {
    return false;
  }
};