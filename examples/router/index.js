import Vue from 'vue';
import Router from 'vue-router';
import navsConfig from './navs.json';

Vue.use(Router);

let routes = [];
Object.keys(navsConfig).forEach((item) => {
  routes = routes.concat(navsConfig[item]);
});

let addComponent = (router) => {
  router.forEach((route) => 　{
    if (route.items) {
      addComponent(route.items);
      routes = routes.concat(route.items);
    } else {
      if (route.type === 'pages') {
        route.component = r => require.ensure([], () => r(require(`../pages/${route.name}.vue`)));
        return;
      }
      route.component = r => require.ensure([], () => r(require(`../docs/${route.name}.md`)))
    }
  });
}

addComponent(routes);

export default new Router({
  routes: routes
});