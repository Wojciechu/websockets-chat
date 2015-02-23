var cryptoJS  = require('crypto-js');
var users     = require('./database').users;
var config    = require('./config');

exports.authenticate = function (username, hash) {
  var salt = users[username] ? users[username].salt : '';
  var dbHash = users[username] ? users[username].hash : '';

  if (cryptoJS.HmacSHA256(hash, salt).toString() === dbHash) {
    return true;
  }
  else {
    return false;
  }
};

exports.authorize = function (username, authZToken) {
  var hash = users[username] ? users[username].hash : '';
  var dbHash = cryptoJS.HmacSHA256(hash + process.pid, config.secretTwo).toString();

  if (dbHash === authZToken) {
    return true;
  }
  else {
    return false;
  }
};

exports.generateSalt = function (username) {
  var salt = users[username] ? users[username].salt : '';
  return cryptoJS.HmacSHA256(username + salt, config.secretOne).toString();
};

exports.prepareAuthZToken = function (credentials) {
  var salt = users[credentials.username] ? users[credentials.username].salt : '';
  var authNToken =cryptoJS.HmacSHA256(credentials.hash, salt).toString();
  return cryptoJS.HmacSHA256(authNToken + process.pid, config.secretTwo).toString();
};