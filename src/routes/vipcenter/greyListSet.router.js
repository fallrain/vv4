import mainbody from '../../components/layout/layout.mainBody.vue';
import greyListSet from '../../views/monitor/greyListSet.vue';
import greyListSetRecord from '../../views/monitor/greyListSetRecord.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          path: 'greyListSet', // 灰名单设置
          component: greyListSet,
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
          path: 'greyListSetRecord', // 灰名单设置记录
          component: greyListSetRecord,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
