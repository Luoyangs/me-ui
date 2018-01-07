import Vue from 'vue';

const isServer = Vue.prototype.$isServer;
const ieVersion = isServer ? 0 : Number(document.documentMode);

const trim = function(str) {
  return (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}

const camelCase = function(name) {
  return name.replace(/([\:\-\_]+(.))/g, function(_, sep, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(/^moz([A-Z])/, 'Moz$1');
}

export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(ele, event, handler) {
      ele && event && handler && ele.addEventListener(event, handler, false);
    };
  } else {
    return function(ele, event, handler) {
      ele && event && handler && ele.attachEvent('on' + event, handler);
    };
  }
})();

export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(ele, event, handler) {
      ele && event && handler && ele.removeEventListener(event, handler, false);
    };
  } else {
    return function(ele, event, handler) {
      ele && event && handler && ele.detachEvent('on' + event, handler);
    };
  }
})();

export const once = function(ele, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(ele, event, listener);
  };
  on(ele, event, listener);
}

export const hasClass = function(ele, className) {
  if (!ele || !className) return false;
  if (className.indexOf(' ') !== -1) throw new Error('className should not contain space');
  if (ele.classList) {
    return ele.classList.contains(className);
  } else {
    return (' ' + ele.className + ' ').indexOf(' ' + className + ' ') > -1;
  }
}

export const addClass = function(ele, className) {
  if (!ele || !className) return;
  var curClass = ele.className;
  var params = (className || '').split(' ');

  for (var i = 0; i < params.length; i++) {
    var item = params[i];

    if (!item) continue;
    if (ele.classList) {
      ele.classList.add(item);
    } else if (!hasClass(ele, item)) {
      curClass += ' ' + item;
    }
  }
  if (!ele.classList) {
    ele.className = curClass;
  }
}

export const removeClass = function(ele, className) {
  if (!ele || !className) return;
  var params = className.split(' ');
  var curClass = ' ' + ele.className + ' ';

  for (var i = 0; i < params.length; i++) {
    var item = params[i];

    if (!item) continue;
    if (ele.classList) {
      ele.classList.remove(item);
    } else if (hasClass(ele, item)) {
      curClass = curClass.replace(' ' + item + ' ', ' ');
    }
  }
  if (!ele.classList) {
    ele.className = curClass;
  }
}

export const getStyle = ieVersion < 9 ? function(ele, style) {
  if (isServer) return;
  if (!ele || !style) return null;
  style = camelCase(style);
  if (style === 'float') {
    style = 'styleFloat';
  }
  try {
    switch (style) {
      case 'opacity':
        try {
          return ele.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return (ele.style[style] || ele.currentStyle ? ele.currentStyle : null);
    }
  } catch (e) {
    return ele.style[style];
  }

} : function(ele, style) {
  if (isServer) return;
  if (!ele || !style) return null;
  style = camelCase(style);
  if (style === 'float') {
    style = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(ele, '');
    return ele.style[style] || computed ? computed[style] : null;
  } catch (e) {
    return ele.style[style];
  }
}

export const setStyle = function(ele, style, value) {
  if (!ele || !style) return;

  if (typeof style === 'object') {
    for (var prop in style) {
      if (style.hasOwnProperty(prop)) {
        setStyle(ele, prop, style[prop]);
      }
    }
  } else {
    style = camelCase(style);
    if (style === 'opacity' && ieVersion < 9) {
      ele.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + (value * 100) + ')';
    } else {
      ele.style[style] = value;
    }
  }
}