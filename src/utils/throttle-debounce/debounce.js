var throttle = require('./throttle');

module.exports = function(delay, atBagin, callback) {
  return callback === undefined ? throttle(delay, atBagin, false) : throttle(delay, callback, atBagin !== false);
}