import './style.less';

export default function plugin(Vue, loadingOptions = {}) {
  Vue.directive('loading', {
    bind(el, binding, vnode) {
      let options = {
        text: '加载中...',
        bgcolor: 'rgba(0, 0, 0, 0.20)'
      };

      if (loadingOptions) {
        Object.assign(options, loadingOptions);
      }

      let position = window.getComputedStyle(el).position;

      if (position === 'static' || position === '') {
        el.style.position = 'relative';
      }

      let box = document.createElement('div');
      box.className = 'me-loading';
      box.style.display = 'none';
      box.style.backgroundColor = options.bgcolor;
      el.appendChild(box);

      let text = document.createElement('div');
      text.className = 'text';
      text.textContent = options.text;
      box.appendChild(text);

      let spinner = document.createElement('i');
      spinner.className = 'spinner me-icon-loading';
      text.appendChild(spinner);
    },
    update(el, binding, vnode) {
      let boxs = el.getElementsByClassName('me-loading');
      let box = boxs[boxs.length - 1];

      if (binding.oldValue !== binding.value) {
        if (binding.value) {
          binding.def.handleShow(box);
        } else {
          binding.def.handleHide(box);
        }
      }
    },
    handleShow(box) {
      box.style.display = 'initial';
      window.requestAnimationFrame(() => {
        box.style.opacity = 1;
      });
    },
    handleHide(box) {
      box.style.display = 'none';
      window.requestAnimationFrame(() => {
        box.style.opacity = 0.2;
      });
    }
  });
};