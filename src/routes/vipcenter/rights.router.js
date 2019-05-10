import mainbody from '../../components/layout/layout.mainBody.vue';
import rightslist from '../../views/rights/rightsList.vue';
import rightsconfig from '../../views/rights/rightsConfig.vue';
import rightschinabaseinfo from '../../views/rights/rightsChinaBaseInfo.vue'; // 权益基础信息-中国地区版
import rightsxwbaseinfo from '../../views/rights/rightsXwBaseInfo.vue'; // 权益基础信息-中国地区版--小微
import rightsBaseInfotwo from '../../views/rights/rightsBaseInfotwo.vue'; // 权益基础信息-中国地区版--小微
import rightsbaseinfo from '../../views/rights/rightsBaseInfo.vue'; // 权益基础信息
import rightsgift from '../../views/rights/rightsGift.vue'; // 权益礼品配置
import rightsGifttwo from '../../views/rights/rightsGifttwo.vue'; // 权益礼品配置
import rightschinagift from '../../views/rights/rightsChinaGift.vue';
import rightsconfirm from '../../views/rights/rightsConfirm.vue'; // 权益确认
import rightsconfirmtwo from '../../views/rights/rightsconfirmtwo.vue'; // 权益确认
import rightschinaconfirm from '../../views/rights/rightsChinaConfirm.vue'; // 权益确认-中国地区版
import rightsxwconfirm from '../../views/rights/rightsXwConfirm.vue'; // 权益确认-中国地区版--小微
import rightscompare from '../../views/rights/rightsCompare.vue'; // 权益比较
import rightsxwcompare from '../../views/rights/rightsXwCompare.vue'; // 权益比较
import rightschinarange from '../../views/rights/rightsChinaRange.vue'; // 权益活动范围-中国地区版
import rightsxwrange from '../../views/rights/rightsXwRange.vue'; // 权益活动范围-中国地区版--小微
import rightsrange from '../../views/rights/rightsRange.vue'; // 权益活动范围
import rightsRangetwo from '../../views/rights/rightsRangetwo.vue'; // 权益活动范围
import rightsactlist from '../../views/rights/rightsActList.vue'; // 权益活动范围
import rightsaudit from '../../views/rights/rightsAudit.vue'; // 权益活动范围
import rightsconfigover from '../../views/rights/rightsConfigOver.vue'; // 权益配置完成
import rightsuseingdetail from '../../views/rights/rightsUseingDetail.vue'; // 中国区小微联合配置

import xrights from '../../views/rights/rights.vue';
import rightsmanage from '../../views/rights/rightsManage.vue';
import rightscard from '../../views/rights/rightsCard.vue';
import addright from '../../views/rights/addRight.vue';
import editright from '../../views/rights/editRight.vue';
import addrightscard from '../../views/rights/addRightsCard.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          path: 'rightslist',
          component: rightslist,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsconfig',
          component: rightsconfig,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightschinabaseinfo',
          component: rightschinabaseinfo,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsxwbaseinfo',
          component: rightsxwbaseinfo,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsBaseInfotwo',
          component: rightsBaseInfotwo,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsbaseinfo',
          component: rightsbaseinfo,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsgift',
          component: rightsgift,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsGifttwo',
          component: rightsGifttwo,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightschinagift',
          component: rightschinagift,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsconfirm',
          component: rightsconfirm,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsconfirmtwo',
          component: rightsconfirmtwo,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightschinaconfirm',
          component: rightschinaconfirm,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsxwconfirm',
          component: rightsxwconfirm,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightscompare',
          component: rightscompare,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsxwcompare',
          component: rightsxwcompare,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsrange',
          component: rightsrange,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsRangetwo',
          component: rightsRangetwo,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightschinarange',
          component: rightschinarange,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsxwrange',
          component: rightsxwrange,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsactlist',
          component: rightsactlist,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsaudit',
          component: rightsaudit,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsconfigover',
          component: rightsconfigover,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsuseingdetail',
          component: rightsuseingdetail,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'xrights', // new
          component: xrights,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsmanage', // new
          component: rightsmanage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightscard', // new
          component: rightscard,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'addright', // new
          component: addright,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'editright', // new
          component: editright,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'addrightscard', // new
          component: addrightscard,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
