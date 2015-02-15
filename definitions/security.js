var cryptoJS  = require('crypto-js');
var users = require('./database').users;

exports.authenticate = function (username, hash) {
  var dbHash = users[username] ? users[username].hash : '';

  if(hash === dbHash) {
    return true;
  }
  else {
    return false;
  }
};

exports.authorize = function (username, token) {
  var hash = users[username] ? users[username].hash : '';
  var dbHash = cryptoJS.HmacSHA256(hash + process.pid, 'mostSecretish').toString();

  if (dbHash === token) {
    return true;
  }
  else {
    return false;
  }
};

exports.generateSalt = function (username) {
  var salt = users[username] ? users[username].salt : '';
  return cryptoJS.HmacSHA256(username + salt, 'verySecret').toString();
};

exports.prepareAuthZToken = function (authNToken) {
  return cryptoJS.HmacSHA256(authNToken + process.pid, 'mostSecretish').toString();
};