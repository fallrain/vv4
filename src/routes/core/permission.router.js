import mainbody from '../../components/layout/layout.mainBody.vue';
import permission from '../../views/permission/index.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          // produc路由
          path: 'permission',
          component: permission,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
