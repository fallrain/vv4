import mainbody from '../../components/layout/layout.mainBody.vue';
import role from '../../views/role/index.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          // produc路由
          path: 'role',
          component: role,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
