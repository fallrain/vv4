import mainbody from '../../components/layout/layout.mainBody.vue';
import msglist from '../../views/comm/msgList.vue';
import msgtemplate from '../../views/comm/msgTemplate.vue';
import wechatlist from '../../views/comm/weChatList.vue';
import wechattemplate from '../../views/comm/weChatTemplate.vue';
import wechatgraphic from '../../views/comm/weChatGraphic.vue';
import maillist from '../../views/comm/mailList.vue';
import mailtemplate from '../../views/comm/mailTemplate.vue';
import sitemsglist from '../../views/comm/siteMsgList.vue';
import sitemsgtemplate from '../../views/comm/siteMsgTemplate.vue';
import luckyactivity from '../../views/comm/luckyActivity.vue';
import luckyactivitydetails from '../../views/comm/luckyActivityDetails.vue';
import activity from '../../views/comm/activity.vue';
import activityaudit from '../../views/comm/activityAudit.vue';
import addactivity from '../../views/comm/addActivity.vue';
import quickcomm from '../../views/comm/quickComm.vue';
import addModel from '../../views/comm/addModel.vue';
import ceshi from '../../views/comm/ceshi.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          path: 'msglist', // 短信列表
          component: msglist,
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
          path: 'msgtemplate', // 短信模版
          component: msgtemplate,
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
          path: 'wechatlist', // 微信列表
          component: wechatlist,
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
          path: 'wechattemplate', // 微信模板
          component: wechattemplate,
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
          path: 'wechatgraphic', // 微信图文
          component: wechatgraphic,
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
          path: 'maillist', // 邮箱列表
          component: maillist,
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
          path: 'mailtemplate', // 邮箱模版
          component: mailtemplate,
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
          path: 'sitemsglist', // 邮箱列表
          component: sitemsglist,
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
          path: 'sitemsgtemplate', // 邮箱模版
          component: sitemsgtemplate,
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
          path: 'luckyactivity', // 邮箱模版
          component: luckyactivity,
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
          path: 'luckyactivitydetails', // 邮箱模版
          component: luckyactivitydetails,
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
          path: 'activity', // 系统策略
          component: activity,
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
          path: 'activityaudit', // 活动审核
          component: activityaudit,
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
          path: 'addactivity', // 系统策略
          component: addactivity,
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
          path: 'quickcomm', //
          component: quickcomm,
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
          path: 'addModel', // 新建模版任务
          component: addModel,
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
          path: 'ceshi',
          component: ceshi,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
