const isServer = typeof window === 'undefined';

const requestFrame = (function() {
  if (isServer) return;
  const raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
    function(fn) {
      return window.setTimeout(fn, 20);
    };

  return function(fn) {
    return raf(fn);
  }
})();

const cancelFrame = (function() {
  if (isServer) return;
  const caf = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;

  return function(id) {
    return caf(id);
  }
})();

const resetTrigger = function(ele) {
  const trigger = ele.__resizeTrigger__;
  const expand = trigger.firstElementChild;
  const contract = trigger.lastElementChild;
  const expandChild = expand.firstElementChild;

  contract.scrollLeft = contract.scrollWidth;
  contract.scrollTop = contract.scrollHeight;
  expandChild.style.width = expand.offsetWidth + 1 + 'px';
  expandChild.style.height = expand.offsetHeight + 1 + 'px';
  expand.scrollLeft = expand.scrollWidth;
  expand.scrollTop = expand.scrollHeight;
}

const checkTrigger = function(ele) {
  return ele.offsetWidth !== ele.__resizeTrigger__.width || ele.offsetHeight !== ele.__resizeTrigger__.height;
}

const scrollListener = function(event) {
  resetTrigger(this);
  if (this.__resizeTrigger__) cancelFrame(this.__resizeRAF__);

  this.__resizeRAF__ = requestFrame(() => {
    if (checkTrigger(this)) {
      this.__resizeLast__.width = this.offsetWidth;
      this.__resizeLast__.height = this.offsetHeight;
      this.__resizeListeners__.forEach((fn) => {
        fn.call(this, event);
      });
    }
  });
}

const attachEvent = isServer ? {} : document.attachEvent;
const DOM_PREFIXES = 'Webkit Moz O ms'.split(' ');
const START_EVENTS = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' ');
const RESIZE_ANIMATION_NAME = 'resizeanim';
let animation = false;
let keyFramePrefix = '';
let animationStartEvent = 'animationstart';

if (!attachEvent && !isServer) {
  const testElement = document.createElement('fakeelement');
  if (testElement.style.animationName !== undefined) {
    animation = true;
  }

  if (animation === false) {
    let prefix = '';
    for (var i = 0; i < DOM_PREFIXES.length; i++) {
      if (testElement.style[DOM_PREFIXES[i] + 'AnimationName'] !== undefined) {
        prefix = DOM_PREFIXES[i];
        keyFramePrefix = '-' + prefix.toUpperCase() + '-';
        animationStartEvent = START_EVENTS[i];
        animation = true;
        break;
      }
    }
  }
}

let stylesCreated = false;
const createStyles = function() {
  if (!stylesCreated && !isServer) {
    const animationKeyframes = `@${keyFramePrefix}keyframes ${RESIZE_ANIMATION_NAME} { from { opacity: 0; } to { opacity: 0; } } `;
    const animationStyle = `${keyFramePrefix}animation: 1ms ${RESIZE_ANIMATION_NAME};`;

    const css = `${animationKeyframes}
      .resize-triggers { ${animationStyle} visibility: hidden; opacity: 0; }
      .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1 }
      .resize-triggers > div { background: #eee; overflow: auto; }
      .contract-trigger:before { width: 200%; height: 200%; }`;

    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    stylesCreated = true;
  }
}

export const addResizeListener = function(ele, fn) {
  if (isServer) return;
  if (attachEvent) {
    ele.attachEvent('onresize', fn);
  } else {
    if (!ele.__resizeTrigger__) {
      if (getComputedStyle(ele).position === 'static') {
        ele.style.position = 'relative';
      }
      createStyles();
      ele.__resizeLast__ = {};
      ele.__resizeListeners__ = [];

      const resizeTrigger = ele.__resizeTrigger__ = document.createElement('div');
      resizeTrigger.className = 'resize-triggers';
      resizeTrigger.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>';
      ele.appendChild(resizeTrigger);

      resetTrigger(ele);
      ele.addEventListener('scroll', scrollListener, true);

      if (animationStartEvent) {
        resizeTrigger.addEventListener(animationStartEvent, function(event) {
          if (event.animationName === RESIZE_ANIMATION_NAME) {
            resetTrigger(ele);
          }
        });
      }
    }
    ele.__resizeListeners__.push(fn);
  }
}

export const removeResizeListener = function(ele, fn) {
  if (!ele || !ele.__resizeListeners__) return;
  if (attachEvent) {
    ele.detachEvent('onresize', fn);
  } else {
    ele.__resizeListeners__.splice(ele.__resizeListeners__.indexOf(fn), 1);
    if (!ele.__resizeListeners__.length) {
      ele.removeEventListener('scroll', scrollListener);
      ele.__resizeTrigger__ = !ele.removeChild(ele.__resizeTrigger__);
    }
  }
}