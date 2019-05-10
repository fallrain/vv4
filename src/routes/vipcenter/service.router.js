import mainbody from '../../components/layout/layout.mainBody.vue';
import personnel from '../../views/service/personnel.vue';
import group from '../../views/service/group.vue';
import faqs from '../../views/service/faqs.vue';
import sendnotice from '../../views/service/sendNotice.vue';
import addgroup from '../../views/service/addGroup.vue';
import productcomplaint from '../../views/service/productComplaint.vue';
import activereport from '../../views/service/activeReport.vue';
import casarteappeal from '../../views/service/casarteAppeal.vue';
import casarteproduct from '../../views/service/casarteProduct.vue';
import casartemember from '../../views/service/casarteMember.vue';
import evaluaterelation from '../../views/service/evaluateRelation.vue';
import casarteproductmaintain from '../../views/service/casarteProductMaintain.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          path: 'personnel', // 人员管理
          component: personnel,
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
          path: 'group', // 分组管理
          component: group,
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
          path: 'addgroup', // 新建分组
          component: addgroup,
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
          path: 'faqs', // 人员管理
          component: faqs,
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
          path: 'sendnotice', // 人员管理
          component: sendnotice,
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
          path: 'productcomplaint',
          component: productcomplaint,
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
          path: 'activereport',
          component: activereport,
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
          path: 'casarteappeal',
          component: casarteappeal,
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
          path: 'casarteproduct',
          component: casarteproduct,
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
          path: 'casartemember',
          component: casartemember,
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
          path: 'evaluaterelation',
          component: evaluaterelation,
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
          path: 'casarteproductmaintain',
          component: casarteproductmaintain,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
