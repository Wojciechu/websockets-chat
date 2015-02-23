var cryptoJS  = require('crypto-js');
var users     = require('./database').users;
var config    = require('./config');

/**
 * Checks if user credentials are valid
 * @param  {String}   username User name 
 * @param  {String}   hash     Users password hash
 * @return {Boolean}           Returns if user is authenticated
 */
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

/**
 * Checks if Authorization token is valid
 * @param  {String} username   User name
 * @param  {String} authZToken Authorization token
 * @return {Boolean}           Returns if user is authorized to access
 */
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

/**
 * Generates salt based on username and salt
 * @param  {String} username User name
 * @return {String}          Calculated salt hash
 */
exports.generateSalt = function (username) {
  var salt = users[username] ? users[username].salt : '';
  return cryptoJS.HmacSHA256(username + salt, config.secretOne).toString();
};

/**
 * Prepares authorization token based on user credentials
 * @param  {Object} credentials           User credentials
 * @param  {String} credentials.username  User name
 * @param  {String} credentials.hash      Users password hash
 * @return {String}                       Authorization token
 */
exports.prepareAuthZToken = function (credentials) {
  var salt = users[credentials.username] ? users[credentials.username].salt : '';
  var authNToken =cryptoJS.HmacSHA256(credentials.hash, salt).toString();
  return cryptoJS.HmacSHA256(authNToken + process.pid, config.secretTwo).toString();
};