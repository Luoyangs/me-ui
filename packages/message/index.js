import Vue from 'vue';
import { PopupManager } from '../../src/utils/popup';
import Main from './src/message.vue';

const MessageConstructor = Vue.extend(Main);
let instance;
let instances = [];
let seed = 1;

function isVNode(node) {
  return typeof node === 'object' && node.hasOwnProperty('componentOptions');
};

const Message = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  const onClose = options.onClose;
  const id = 'message-' + seed++;
  const position = options.position || 'top-right';

  options.onClose = function() {
    Message.close(id, onClose);
  };

  instance = new MessageConstructor({
    data: options
  });

  if (isVNode(options.message)) {
    instance.$slots.default = [options.message];
    options.message = '';
  }
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instance.dom.style.zIndex = PopupManager.nextZIndex();

  let verticalOffset = options.offset || 0;
  instances.filter(item => item.position === position).forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  verticalOffset += 16;

  instance.verticalOffset = verticalOffset;
  instances.push(instance);
  return instance.vm;
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string' || isVNode(options)) {
      options = {
        message: options
      };
    }
    options.type = type;
    return Message(options);
  };
});

Message.close = function(id, onClose) {
  let index = -1;
  const len = instances.length;
  const instance = instances.filter((instance, i) => {
    if (instance.id === id) {
      index = i;
      return true;
    }
    return false;
  })[0];

  if (!instance) return;

  if (typeof onClose === 'function') {
    onClose(instance);
  }
  instances.splice(index, 1);

  if (len <= 1) return;
  const postion = instance.position;
  const removedHeight = instance.dom.offsetHeight;
  for (var i = index; i < len - 1; i++) {
    if (instances[i].position === postion) {
      instances[i].dom.style[instance.verticalProperty] = parseInt(instances[i].dom.style[instance.verticalProperty], 10) - removedHeight - 16 + 'px';
    }
  }
}

export default Message;