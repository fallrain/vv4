import mainbody from '../../components/layout/layout.mainBody.vue';
import carereminding from '../../views/management/carereminding.vue';
import addcarereminding from '../../views/management/addcarereminding.vue';
import rightsdirect from '../../views/management/rightsDirect.vue';
import rightsgrantrange from '../../views/management/rightsGrantRange.vue';
import rightsrulerange from '../../views/management/rightsRuleRange.vue';
import rightssuccess from '../../views/management/rightsSuccess.vue';
import rightsdirectconfirm from '../../views/management/rightsDirectConfirm.vue';
import rightsdirectlist from '../../views/management/rightsDirectList.vue';
import resources from '../../views/management/resources.vue';
import addresources from '../../views/management/addresources.vue';

import rightsvoucher from '../../views/management/rightsVoucher.vue';
import addvoucher from '../../views/management/addVoucher.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          path: 'carereminding',
          component: carereminding,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'addcarereminding',
          component: addcarereminding,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsdirect',
          component: rightsdirect,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsgrantrange',
          component: rightsgrantrange,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsrulerange',
          component: rightsrulerange,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsdirectconfirm',
          component: rightsdirectconfirm,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightssuccess',
          component: rightssuccess,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsdirectlist',
          component: rightsdirectlist,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rightsvoucher',
          component: rightsvoucher,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'addvoucher',
          component: addvoucher,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'resources',
          component: resources,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'addresources',
          component: addresources,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
