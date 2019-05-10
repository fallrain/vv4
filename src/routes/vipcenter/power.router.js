import mainbody from '../../components/layout/layout.mainBody.vue';
import user from '../../views/power/user.vue';
import role from '../../views/power/role.vue';

import sendinglimit from '../../views/power/sendingLimit.vue';

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
    },
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
    },
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          path: 'sendinglimit', // 发送限制
          component: sendinglimit,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
