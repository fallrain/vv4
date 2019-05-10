import mainbody from '../../components/layout/layout.mainBody.vue';
import user from '../../views/user/index.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          // produc路由
          path: 'user',
          component: user,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
