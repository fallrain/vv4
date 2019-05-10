import mainbody from '../../components/layout/layout.mainBody.vue';
import list from '../../views/objectType/index.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          // produc路由
          path: 'objecttype',
          component: list,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
