import mainbody from '../../components/layout/layout.mainBody.vue';
import label from '../../views/vip/label.vue';
import vipgroup from '../../views/vip/group.vue';
import addvipgroup from '../../views/vip/addGroup.vue';
import addPointMission from '../../views/vip/addPointMission.vue';
import quickCommunication from '../../views/vip/quickCommunication.vue';
import filter from '../../views/vip/filter.vue';
import labeluser from '../../views/vip/labelUser.vue';
import groupuser from '../../views/vip/groupUser.vue';
import userinfo from '../../views/vip/userInfo.vue';
import olduserinfo from '../../views/vip/oldUserInfo.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          path: 'label', // 会员标签
          component: label,
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
          path: 'vipgroup', // 会员分组
          component: vipgroup,
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
          path: 'addvipgroup', // 新建分组
          component: addvipgroup,
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
          path: 'addPointMission', // 新建积分任务
          component: addPointMission,
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
          path: 'filters', // 会员筛选
          component: filter,
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
          path: 'quickCommunication', // 快捷沟通
          component: quickCommunication,
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
          path: 'labeluser', // 会员筛选
          component: labeluser,
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
          path: 'groupuser', // 会员筛选
          component: groupuser,
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
          path: 'userinfo', // 会员基本信息
          component: userinfo,
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
          path: 'olduserinfo', // 会员基本信息
          component: olduserinfo,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
