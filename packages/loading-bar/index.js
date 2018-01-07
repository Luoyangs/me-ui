import Vue from 'vue';
import LoadingBar from './src/loading-bar.vue';

let LoadingBarConstructor = Vue.extend(LoadingBar),
  timer = null,
  removeTimer = null,
  getInstance = () => {
    var _instance;
    if (_instance) {
      return _instance;
    }
    return _instance = new LoadingBarConstructor();
  };

LoadingBarConstructor.prototype.config = function(options) {
  Object.keys(options).forEach((key) => {
    if (key === 'isError' || key === 'progress') {
      return;
    }
    this[key] = options[key];
  });
}

LoadingBarConstructor.prototype.init = function() {
  clearTimeout(timer);
  this.progress = 0;
  this.isError = false;
  this.vm = this.$mount();
  document.body.appendChild(this.vm.$el);
  return this;
}

LoadingBarConstructor.prototype.start = function() {
  this.init();
  timer = setInterval(() => {
    if (this.progress < 90) {
      this.progress += (this.progress || Math.random()) * this.speed;
    }
  }, 150);
}

LoadingBarConstructor.prototype.end = function() {
  timer || this.init();
  this.progress = 100;
  clearTimeout(removeTimer);
  removeTimer = setTimeout(() => {
    clearInterval(timer);
    timer = null;
    document.body.removeChild(this.vm.$el);
  }, 200);
}

LoadingBarConstructor.prototype.error = function() {
  this.end();
  this.progress = 100;
  this.isError = true;
}

export default getInstance();