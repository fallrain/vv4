import mainbody from '../../components/layout/layout.mainBody.vue';
import list from '../../views/menu/index.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          // produc路由
          path: 'menu',
          component: list,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
