import Vue from 'vue';
import VueRouter from 'vue-router';
import routesMap from './core'; // 路由映射
import vipcenterMap from './vipcenter';
import home from '../views/home/home.vue';
import comm from '../views/home/publicView.vue';
import mainbody from '../components/layout/layout.mainBody.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/home',
  component: mainbody,
  meta: {
    requiresAuth: true
  },
  children: [{
    path: '',
    component: home,
    meta: {
      requiresAuth: true
    }
  }]
}, {
  path: '/comm/:url',
  component: mainbody,
  children: [{
    path: '',
    component: comm,
    meta: {
      requiresAuth: true
    }
  }]
}];

const routeCenter = routes.concat(routesMap.routes, vipcenterMap.routes);

// 路由重定向
routeCenter.push({
  path: '*',
  redirect: '/home'
});

const router = new VueRouter({
  mode: 'hash',
  base: '/admin/',
  routes: routeCenter
});

export default router;
