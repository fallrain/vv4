import mainbody from '../../components/layout/layout.mainBody.vue';
import operation from '../../views/report/operation.vue';
import timeorderreport from '../../views/report/timeOrderReport.vue';
import sellersorderreport from '../../views/report/sellersOrderReport.vue';
import bireport from '../../views/report/BIreport.vue';
import productquery from '../../views/report/productQuery.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          // timeorderproduc路由
          path: 'timeorderreport',
          component: timeorderreport,
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
          path: 'sellersorderreport',
          component: sellersorderreport,
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
          path: 'operation',
          component: operation,
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
          path: 'bireport',
          component: bireport,
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
          path: 'productquery',
          component: productquery,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
