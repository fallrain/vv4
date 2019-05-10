import mainbody from '../../components/layout/layout.mainBody.vue';
import content from '../../views/contents/content.vue';
import contentlist from '../../views/contents/contentList.vue';
import bannermanage from '../../views/complaint/bannerManage.vue';
import addbanner from '../../views/complaint/addBanner.vue';
import jfhandle from '../../views/complaint/jfHandle.vue';
import addjfhandle from '../../views/complaint/addJfHandle.vue';
import openred from '../../views/complaint/openRed.vue';
import openreddetails from '../../views/complaint/openRedDetails.vue';
import guidance from '../../views/complaint/guidance.vue';
import addguidance from '../../views/complaint/addguidance.vue';
import starrating from '../../views/complaint/starRating.vue';
import msgremind from '../../views/complaint/msgRemind.vue';
import addmsgrem from '../../views/complaint/addmsgRem.vue';
import starmaintain from '../../views/complaint/starMaintain.vue';
import modeladviser from '../../views/complaint/modelAdviser.vue';
import addstarmain from '../../views/complaint/addStarMain.vue';
import addmodeladv from '../../views/complaint/addModelAdv.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: [
        {
          // produc路由
          path: 'addjfhandle',
          component: addjfhandle,
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
          path: 'jfhandle',
          component: jfhandle,
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
          path: 'addcontent',
          component: content,
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
          path: 'content',
          component: contentlist,
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
          path: 'bannermanage',
          component: bannermanage,
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
          path: 'addbanner',
          component: addbanner,
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
          path: 'openred',
          component: openred,
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
          path: 'guidance',
          component: guidance,
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
          path: 'addguidance',
          component: addguidance,
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
          path: 'openreddetails',
          component: openreddetails,
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
          path: 'starrating',
          component: starrating,
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
          path: 'msgremind',
          component: msgremind,
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
          path: 'addmsgrem',
          component: addmsgrem,
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
          path: 'starmaintain',
          component: starmaintain,
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
          path: 'modeladviser',
          component: modeladviser,
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
          path: 'addstarmain',
          component: addstarmain,
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
          path: 'addmodeladv',
          component: addmodeladv,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
};
