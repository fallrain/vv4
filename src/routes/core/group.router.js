import mainbody from '../../components/layout/layout.mainBody.vue';
import group from '../../views/group/index.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          // produc路由
          path: 'group',
          component: group,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
