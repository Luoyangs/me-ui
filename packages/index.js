import LoadingBar from './loading-bar';
import Message from './message';
import Button from './button';
import Form from './form';
import Input from './input';
import Checkbox from './checkbox';
import Radio from './radio';
import Upload from './upload';
import Rate from './rate';
import Progress from './progress';
import Swiper from './swiper';
import LoadMore from './loadmore';
import Pager from './pager';
import Icon from './icon';

import Loading from '../src/directives/loading';
import ImgLazy from '../src/directives/img-lazy';

const components = {
  Button,
  Input,
  Form,
  FormItem: Form.Item,
  Checkbox,
  CheckboxGroup: Checkbox.Group,
  Radio,
  RadioGroup: Radio.Group,
  Rate,
  Upload,
  Swiper,
  SwiperItem: Swiper.Item,
  Progress,
  LoadMore,
  Pager,
  Icon
};

const directives = {
  Loading,
  ImgLazy
}

const install = function(Vue) {
  if (install.installed) return;

  Object.keys(components).forEach(key => {
    Vue.component(components[key].name, components[key]);
  });

  Object.keys(directives).forEach(item => {
    Vue.use(directives[item]);
  });

  Vue.prototype.$loading = LoadingBar;
  Vue.prototype.$message = Message;
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  LoadingBar,
  ...components
};