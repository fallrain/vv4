import mainbody from '../../components/layout/layout.mainBody.vue';
import system from '../../views/strategy/system.vue';
import activityflow from '../../views/care/activityFlow.vue';
import activityQD from '../../views/care/activityQD.vue';
import activityKF from '../../views/care/activityKF.vue';
import activityDBC from '../../views/care/activityDBC.vue';

import activityadded from '../../views/care/activityAdded.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          path: 'activityflow', // 系统策略
          component: activityflow,
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
          path: 'activityQD', // 系统策略
          component: activityQD,
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
          path: 'activityKF', // 系统策略
          component: activityKF,
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
          path: 'activityDBC', // 系统策略
          component: activityDBC,
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
          path: 'activityadded', // 活动审核
          component: activityadded,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
