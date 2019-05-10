import mainbody from '../../components/layout/layout.mainBody.vue';

import addQuestion from '../../views/dbOperate/survey/addQuestion.vue'; // 新增问题设置
import rightsGrantModel from '../../views/dbOperate/rightsGrantModel.vue'; // 权益发放模型
import sellerGroupManage from '../../views/dbOperate/sellerGroupManage.vue'; // 直销员组管理
import resourceConfigure from '../../views/dbOperate/resourceConfigure.vue'; // 资源位配置
import addNewResource from '../../views/dbOperate/resourceConfigure/addNewResource.vue'; // 新增资源位
import updateNewResource from '../../views/dbOperate/resourceConfigure/updateNewResource.vue'; // 修改实物资源位
import rightsDatacount from '../../views/dbOperate/survey/rightsDatacount.vue'; // 数据统计
import rightsDirectseller from '../../views/dbOperate/sellerGroupManage/rightsDirectseller.vue'; // 直销员组管理修改
import XiaoWeiGroup from '../../views/dbOperate/XiaoWeiGroup.vue'; // 小微组管理
import survey from '../../views/dbOperate/survey.vue'; // 实物调研配置
import addSurvey from '../../views/dbOperate/survey/addSurvey.vue'; // 修改实物调研基本配置
import rightsconfigrution from '../../views/dbOperate/rightsconfigrution.vue'; // 一站式1
import rightsconfigrutiontwo from '../../views/dbOperate/rightsconfigrutiontwo.vue'; // 一站式2
import rightsconfigrutionthree from '../../views/dbOperate/rightsconfigrutionthree.vue'; // 一站式3
import rightsconfigrutionfour from '../../views/dbOperate/rightsconfigrutionfour.vue'; // 一站式4
import rightsconfigrutionfive from '../../views/dbOperate/rightsconfigrutionfive.vue'; // 一站式5
import rightsconfigrutionsix from '../../views/dbOperate/rightsconfigrutionsix.vue'; // 一站式5
import surveyChart from '../../views/dbOperate/surveyChart.vue'; // 数据图
import userGroupManage from '../../views/dbOperate/userGroupManage.vue'; // 用户组管理
import userGroupscreen from '../../views/dbOperate/userGroupManage/userGroupscreen.vue'; // 用户组筛选
import updateSurvey from '../../views/dbOperate/survey/updateSurvey.vue'; // 修改调研配置
import Recruit from '../../views/dbOperate/Recruit.vue'; // 一站式3
import duibeiChart from '../../views/dbOperate/duibeiChart.vue'; // 兑呗报表
import greyListSet from '../../views/monitor/greyListSet.vue';
import greyListSetRecord from '../../views/monitor/greyListSetRecord.vue';

import ruhuServiceReport from '../../views/dbOperate/ruhuServiceReport.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          path: 'userGroupManage',
          component: userGroupManage,
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: 'userGroupscreen',
              component: userGroupscreen,
              name: 'userGroupscreen',
              meta: {
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: 'XiaoWeiGroup',
          component: XiaoWeiGroup,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsconfigrutionsix',
          component: rightsconfigrutionsix,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsconfigrutionfive',
          component: rightsconfigrutionfive,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'Recruit',
          component: Recruit,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsconfigrutionthree',
          component: rightsconfigrutionthree,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'duibeiChart',
          component: duibeiChart,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'ruhuServiceReport',
          component: ruhuServiceReport,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'resourceConfigure',
          component: resourceConfigure,
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: 'addNewResource',
              component: addNewResource,
              name: 'addNewResource',
              meta: {
                requiresAuth: true
              }
            },
            {
              path: 'updateNewResource',
              component: updateNewResource,
              name: 'updateNewResource',
              meta: {
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: 'sellerGroupManage',
          component: sellerGroupManage,
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: 'rightsDirectseller',
              component: rightsDirectseller,
              name: 'rightsDirectseller',
              meta: {
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: 'rightsGrantModel',
          component: rightsGrantModel,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'surveyChart',
          component: surveyChart,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsconfigrutionfour',
          component: rightsconfigrutionfour,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'greyListSet', // 灰名单设置
          component: greyListSet,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'greyListSetRecord', // 灰名单设置记录
          component: greyListSetRecord,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'survey',
          component: survey,
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: 'addQuestion',
              component: addQuestion,
              name: 'addQuestion',
              meta: {
                requiresAuth: true
              }
            },
            {
              path: 'rightsDatacount',
              component: rightsDatacount,
              name: 'rightsDatacount',
              meta: {
                requiresAuth: true
              }
            },
            {
              path: 'updateSurvey',
              component: updateSurvey,
              name: 'updateSurvey',
              meta: {
                requiresAuth: true
              }
            },
            {
              path: 'addSurvey',
              component: addSurvey,
              name: 'addSurvey',
              meta: {
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: 'rightsconfigrution',
          component: rightsconfigrution,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsconfigrutiontwo',
          component: rightsconfigrutiontwo,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
