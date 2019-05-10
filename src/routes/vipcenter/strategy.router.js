import mainbody from '../../components/layout/layout.mainBody.vue';
import system from '../../views/strategy/system.vue';
import addsystemstrategy from '../../views/strategy/addSystemStrategy.vue';
import level from '../../views/strategy/level.vue';
import growup from '../../views/strategy/growUp.vue';
import addgrowupstrategy from '../../views/strategy/addGrowUpStrategy.vue';
import addrankstrategy from '../../views/strategy/addRankStrategy.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          path: 'system', // 系统策略
          component: system,
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
          path: 'addsystemstrategy', // 新增系统策略
          component: addsystemstrategy,
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
          path: 'level', // 等级策略
          component: level,
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
          path: 'addrankstrategy', // 等级策略
          component: addrankstrategy,
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
          path: 'growup', // 成长值策略
          component: growup,
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
          path: 'addgrowupstrategy', // 成长值策略
          component: addgrowupstrategy,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
