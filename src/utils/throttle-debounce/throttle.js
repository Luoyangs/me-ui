/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 */
module.exports = function(delay, noTraling, callback, debounceMode) {
  var timeoutID;
  var lastExec = 0;
  if (typeof noTraling !== 'boolean') {
    debounceMode = callback;
    callback = noTraling;
    noTraling = undefined;
  }

  return function() {
    var self = this;
    var elapsed = Number(new Date()) - lastExec;
    var args = arguments;

    function exec() {
      lastExec = Number(new Date());
      callback.apply(self, args);
    }

    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      exec();
    }

    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    if (debounceMode === undefined && elapsed > delay) {
      exec();
    } else if (noTraling !== true) {
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  };
}