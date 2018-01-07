import Vue from 'vue';
import merge from '../merge';
import PopupManager from './popup-manager';
import getScrollBarWidth from '../scrollbar-width';
import { getStyle } from '../dom';

let seed = 1;
let scrollBarWidth;
const transitions = [];

const hookTransition = (transition) => {
  if (transitions.indexOf(transition) !== -1) return;

  const getInstance = (ele) => {
    let _instance = ele.__vue__;
    if (!_instance) {
      const textNode = ele.previousSibling;
      if (textNode.__vue__) {
        _instance = textNode.__vue__;
      }
    }
    return _instance;
  };

  Vue.transition(transition, {
    afterEnter(ele) {
      const instance = getInstance(ele);
      if (instance) {
        instance.doAfterOpen && instance.doAfterOpen();
      }
    },
    afterLeave(ele) {
      const instance = getInstance(ele);
      if (instance) {
        instance.doAfterClose && instance.doAfterClose();
      }
    }
  });
}

const getDOM = (ele) => {
  if (ele.nodeType === 3) {
    ele = ele.nextElementSibling || ele.nextSibing;
    getDOM(ele);
  }
  return ele;
}

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: ''
    },
    openDelay: {},
    closeDelay: {},
    zIndex: {},
    modal: {
      type: Boolean,
      default: false
    },
    modalFade: {
      type: Boolean,
      default: true
    },
    modalClass: {},
    modalAppendToBody: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      opend: false,
      bodyOverflow: null,
      bodyPaddingRight: null,
      rendered: false
    }
  },
  created() {
    if (this.transition) {
      hookTransition(this.transition);
    }
  },
  beforeMount() {
    this._popupId = 'popup-' + seed++;
    PopupManager.register(this._popupId, this);
  },
  beforeDestroy() {
    PopupManager.deregister(this._popupId);
    PopupManager.closeModal(this._popupId);

    if (this.modal && this.bodyOverflow !== null && this.bodyOverflow !== 'hidden') {
      document.body.style.overflow = this.bodyOverflow;
      document.body.style.paddingRight = this.bodyPaddingRight;
    }
    this.bodyOverflow = null;
    this.bodyPaddingRight = null;
  },
  watch: {
    visible(val) {
      if (val) {
        if (this._opening) return;
        if (!this.rendered) {
          this.rendered = true;
          Vue.nextTick(() => {
            this.open();
          })
        } else {
          this.open();
        }
      } else {
        this.close();
      }
    }
  },
  methods: {
    open(options) {
      if (!this.rendered) {
        this.rendered = true;
      }

      const props = merge({}, this.$props || this, options);
      if (this._closeTimer) {
        clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }
      clearTimeout(this._closeTimer);

      const openDelay = Number(props.openDelay);
      if (openDelay > 0) {
        this._openTimer = setTimeout(() => {
          this._openTimer = null;
          this.doOpen(props);
        }, openDelay);
      } else {
        this.doOpen(props);
      }
    },
    doOpen(props) {
      if (this.$isServer) return;
      if (this.willOpen && !this.willOpen()) return;
      if (this.opend) return;

      this._opening = true;

      const dom = getDOM(this.$el);
      const modal = props.modal;
      const zIndex = props.zIndex;

      if (zIndex) {
        PopupManager.zIndex = zIndex;
      }

      if (modal) {
        if (this._closing) {
          PopupManager.closeModal(this._popupId);
          this, _closing = false;
        }
        PopupManager.openModal(this._popupId, PopupManager.nextZIndex(), this.modalAppendToBody ? undefined : dom, props.modalClass, props.modalFade);
        if (!props.lockScroll) {
          if (!this.bodyOverflow) {
            this.bodyPaddingRight = document.body.style.paddingRight;
            this.bodyOverflow = document.body.style.overflow;
          }
          scrollBarWidth = getScrollBarWidth();

          let bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
          let bodyOverflowY = getStyle(document.body, 'overflowY');

          if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll')) {
            document.body.style.paddingRight = scrollBarWidth + 'px';
          }
          document.body.style.overflow = 'hidden';
        }
      }
      if (getComputedStyle(dom).position === 'static') {
        dom.style.position = 'absolute';
      }

      dom.style.zIndex = PopupManager.nextZIndex();
      this.opend = true;
      this.onOpen && this.onOpen();

      if (!this.transition) {
        this.doAfterOpen();
      }
    },
    doAfterOpen() {
      this._opening = false;
    },
    close() {
      if (this.willOpen && !this.willOpen()) return;

      if (this._openTimer !== null) {
        clearTimeout(this._openTimer);
        this._openTimer = null;
      }
      clearTimeout(this._openTimer);

      const closeDelay = Number(this.closeDelay);
      if (closeDelay > 0) {
        this._closeTimer = setTimeout(() => {
          this._closeTimer = null;
          this.doClose();
        }, this.closeDelay);
      } else {
        this.doClose();
      }
    },
    doClose() {
      this._closing = true;
      this.onClose && this.onClose();

      if (this.lockScroll) {
        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
      }

      this.opend = false;
      if (!this.transition) {
        this.doAfterClose();
      }
    },
    doAfterClose() {
      PopupManager.closeModal(this._popupId);
      this._closing = false;
    }
  }
}

export {
  PopupManager
}