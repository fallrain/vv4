import Vue from 'vue';
import App from './components/App.vue';
import router from './routes/';
import store from './vuex/index';
import VueResource from 'vue-resource';

import VCharts from 'v-charts';

import gUtils from './utils/gUtils';
import './services/core';
import './services/vipcenter/comm/comm.service'; // 服务

import './components/index';
import ElementUI from 'element-ui';
import VeeValidate, {
  Validator
} from 'vee-validate';
import messages from '../src/utils/zh_CN';
import filterMap from '@/filter';
import './directives/';
import './filters/';
import './assets/css/fixer.css';
import './assets/css/iconfont.css';
import './assets/css/base.scss';
import './assets/css/components.css';
import '@/assets/css/common.scss';
import configs from './config/config';

Vue.use(VCharts);
// 全局filter
Object.keys(filterMap).forEach((filterName) => {
  Vue.filter(filterName, filterMap[filterName]);
});
// 表单校验插件
Validator.updateDictionary({
  zh_CN: {
    messages
  }
});

const veeConfig = {
  errorBagName: 'errors',
  fieldsBagName: 'vfields',
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
};

Vue.use(VeeValidate, veeConfig);
Vue.use(VueResource);
Vue.use(ElementUI);

// 全局挂载自定义函数
Vue.prototype.gUtils = gUtils; // 工具函数
Vue.prototype.siteUrl = configs.siteUrl; // 站点地址
Vue.prototype.devUrl = configs.siteUrl + '/gateway'; // 全局服务地址
Vue.prototype.idsUrl = configs.idsUrl; // ids地址
Vue.prototype.mgeUrl = configs.siteUrl + configs.mgeUrl; // bbs Mange应用
Vue.prototype.localUrl = configs.localUrl; // 本地json应用
Vue.prototype.apiUrl = process.env.VUE_APP_API_URL; // 服务应用地址
Vue.prototype.domain = process.env.VUE_APP_DOMAIN; // 服务应用地址
Vue.prototype.loginUrl = process.env.VUE_APP_LOGIN_URL;
// 模拟登录
// Vue.http({
//   method: 'POST',
//   url: Vue.prototype.apiUrl + 'vipcenter/auth/login',
//   params: {
//     // userName: '00000007',
//     // passWord: 'Test,123'
//     userName: '00000002',
//     passWord: 'Test2'
//   }
// }).then(function(data) {
//   if (data.data.isSuccess) {
//     // 隐藏loading页面

// ========================================
// 中间件
// ========================================
// 简单的路由跳转logger
let hyzx = false;
router.beforeEach((to, from, next) => {
  console.info(`[RouteLogger] ${decodeURI(from.path)} => ${decodeURI(to.path)}`);
  hyzx = to.query.hyzx;
  next();
});

setTimeout(function () {
  if (hyzx) {
    Vue.http({
      method: 'POST',
      url: Vue.prototype.apiUrl + 'vipcenter/auth/loginByAccessToken',
      params: {
        token: hyzx
      }
    }).then(function (availableMenu) {
      Vue.http({
        method: 'POST',
        url: Vue.prototype.apiUrl + 'vipcenter/auth/selfInformation'
      }).then(function (availableMenu) {
        if (availableMenu.data.isSuccess) {
          $('#dom-loading').hide();
          var userInfo = {
            user: availableMenu.data.data.user,
            menuList: availableMenu.data.data.menuList,
            // menuList: menu,
            oprKeyList: availableMenu.data.data.oprKey
          };

          store.dispatch('setUserInfo', userInfo);

          // 设置当前品牌
          $.cookie('vipCenterCurrentBrandName', availableMenu.data.data.user.brandName, {
            'domain': Vue.prototype.domain,
            'path': '/'
          });

          router.push({
            path: '/home'
          });
        } else {
          window.location.href = Vue.prototype.loginUrl;
        }
      }), function (error) {
        console.log(error);
        window.location.href = Vue.prototype.loginUrl;
      };
    }), function (error) {
      console.log(error);
      // window.location.href = 'Vue.prototype.loginUrl
    };
  } else {
    // 获取菜单
    Vue.http({
      method: 'POST',
      url: Vue.prototype.apiUrl + 'vipcenter/auth/selfInformation'
    }).then(function (availableMenu) {
      if (availableMenu.data.isSuccess) {
        $('#dom-loading').hide();
        var userInfo = {
          user: availableMenu.data.data.user,
          menuList: availableMenu.data.data.menuList,
          // menuList: menu,
          oprKeyList: availableMenu.data.data.oprKey
        };

        store.dispatch('setUserInfo', userInfo);

        // 设置当前品牌
        $.cookie('vipCenterCurrentBrandName', availableMenu.data.data.user.brandName, {
          'domain': Vue.prototype.domain,
          'path': '/'
        });
      } else {
        window.location.href = Vue.prototype.loginUrl;
      }
    }), function (error) {
      console.log(error);
      window.location.href = Vue.prototype.loginUrl;
    };
  }
}, 500);

// }

// }, function(error) {
//   console.log(error)
// })

// 全局用户信息
// Vue.http({
//   method: 'POST',
//   url: Vue.prototype.mgeUrl + '/user/queryCurLoginUser'
// }).then(function(data) {
//   if (data.data.isSuccess) {
//     // //console.log(data.data.data);
//     store.dispatch('setBBSuserInfo', data.data.data);
//   }
// }, function(error) {

// })

// 全局登录限制
// Vue.http({
//   method: 'POST',
//   url: Vue.prototype.devUrl + '/user/self'
// }).then(function(data) {
//   if (data.data.isSuccess) {
//     ////console.log('已登录');
//     ////console.log(data.data.data);

// Vue.http({
//   method: 'POST',
//   url: Vue.prototype.apiUrl + 'user/self'
// }).then(function (data) {
//   if (data.data.isSuccess) {

// var userInfo = {
//   // user: data.data.data.user,
//   user: {
//     crTime: null,
//     crUserId: null,
//     email: null,
//     enName: null,
//     gender: null,
//     id: 23134487,
//     phone: null,
//     pic: '/gateway//bbs/images/noavatar_small.gif',
//     remark: null,
//     status: null,
//     theme: null,
//     trueName: null,
//     upTime: null,
//     upUserId: null,
//     userName: 'admin'
//   },
//   menuList: menu
// }
// store.dispatch('setUserInfo', userInfo)

//   } else {
//     router.push({path: '/app/login'})
//   }
// }, function (error) {
//   console.log(error.resultMsg)
//   router.push({path: '/app/login'})
// })

// var sideMenu = {
//   data: {
//     menuList: [],
//     isAdmin: true,
//     // user: {
//     //   crTime: null,
//     //   crUserId: null,
//     //   email: null,
//     //   enName: null,
//     //   gender: null,
//     //   id: 23134487,
//     //   phone: null,
//     //   pic: '/gateway//bbs/images/noavatar_small.gif',
//     //   remark: null,
//     //   status: null,
//     //   theme: null,
//     //   trueName: null,
//     //   upTime: null,
//     //   upUserId: null,
//     //   userName: 'H926R1491013126152'
//     // }
//   },
//   'isSuccess': true,
//   'resultMsg': '执行成功！'
// }

//     localStorage.setItem('menu', JSON.stringify(data.data.data.menuList))

//     ////console.log('!!!!:', localStorage.getItem('openTab').url);

//     if (localStorage.getItem('openTab')) {
//       var tUrl = JSON.parse(localStorage.getItem('openTab')).url;
//       if (tUrl.indexOf('http') >= 0) {
//         router.push({
//           path: '/comm/' + tUrl.slice(7, tUrl.length + 1)
//         });
//       } else {
//         router.push({
//           path: tUrl
//         });
//       }
//     }

//   }
// }, function(error) {
//   const l = window.location.href;
//   if (l.indexOf('login') <= 0) {
//     if (!error.data.isSuccess && error.data.errorCode.indexOf('notLogin') >= 0) {
//       console.log('我是1');
//       $('body').append(Vue.prototype.gUtils.myAlert('由于你长时间未操作,请重新登录', 'pop'));
//       $('.pop').attr('tabindex', 0).focus().keyup(function(e) {
//         if (e.keyCode == 13) {
//           $('.maskpop').remove();
//           localStorage.setItem('historyTabs', JSON.stringify([{
//             name: '首页',
//             url: '/home',
//             icon: 'icon-weibiaoti5',
//             hide: false
//           }]));
//           localStorage.setItem('openTab', JSON.stringify({
//             name: '首页',
//             url: '/home',
//             icon: 'icon-weibiaoti5',
//             hide: false
//           }));
//           store.dispatch('removeAllHistory');
//           store.dispatch('removeUserInfo');
//           window.location.href = Vue.prototype.idsUrl + '/ids/cn/haier_logout.jsp?regFrom=haierBBS&returnUrl=' + Vue.prototype.idsUrl + '/ids/cn/haier_login.jsp?returnUrl=' + Vue.prototype.siteUrl + '/admin/';
//         }
//       });
//       $('.pop').click(function() {
//         $('.maskpop').remove();
//         localStorage.setItem('historyTabs', JSON.stringify([{
//           name: '首页',
//           url: '/home',
//           icon: 'icon-weibiaoti5',
//           hide: false
//         }]));
//         localStorage.setItem('openTab', JSON.stringify({
//           name: '首页',
//           url: '/home',
//           icon: 'icon-weibiaoti5',
//           hide: false
//         }));
//         store.dispatch('removeAllHistory');
//         store.dispatch('removeUserInfo');
//         window.location.href = Vue.prototype.idsUrl + '/ids/cn/haier_logout.jsp?regFrom=haierBBS&returnUrl=' + Vue.prototype.idsUrl + '/ids/cn/haier_login.jsp?returnUrl=' + Vue.prototype.siteUrl + '/admin/';
//         // router.push({
//         //   path: '/app/login'
//         // })
//       });
//     }
//   }
// })

// 全局拦截器
Vue.http.interceptors.push(function (request, next) {
  store.dispatch('setLoading', true);
  // var pm = request.params;
  // for (var key in pm) {
  //   if(key!='criteria'){
  //      pm[key] = encodeURI(pm[key])
  //   }
  // }
  next(function (response) {
    store.dispatch('setLoading', false);
    if (response.status == 200) {
      var dcode = response.data.errorCode ? response.data.errorCode.indexOf('notLogin') >= 0 : false;
      var dmsg = response.data.resultMsg ? response.data.resultMsg.indexOf('请登录后进行操作') >= 0 : false;
      if (dcode) {
        // 未登录跳转
        $('body').append(Vue.prototype.gUtils.myAlert('由于你长时间未操作,请重新登录', 'pop'));
        $('.pop').attr('tabindex', 0).focus().keyup(function (e) {
          if (e.keyCode == 13) {
            $('.maskpop').remove();
            // window.location.href = Vue.prototype.idsUrl + '/ids/cn/haier_logout.jsp?regFrom=haierBBS&returnUrl=' + Vue.prototype.idsUrl + '/ids/cn/haier_login.jsp?returnUrl=' + Vue.prototype.siteUrl + '/admin/';
            // router.push({path: '/app/login'})
            window.location.href = Vue.prototype.loginUrl; // 跳转用户中心运营平台
          }
        });
        $('.pop').click(function () {
          $('.maskpop').remove();
          // window.location.href = Vue.prototype.idsUrl + '/ids/cn/haier_logout.jsp?regFrom=haierBBS&returnUrl=' + Vue.prototype.idsUrl + '/ids/cn/haier_login.jsp?returnUrl=' + Vue.prototype.siteUrl + '/admin/';
          // router.push({path: '/app/login'})
          window.location.href = Vue.prototype.loginUrl; // 跳转用户中心运营平台
        });
      }
      if (dmsg) {
        $('body').append(Vue.prototype.gUtils.myAlert('由于你长时间未操作,请重新登录', 'pop'));
        $('.pop').attr('tabindex', 0).focus().keyup(function (e) {
          if (e.keyCode == 13) {
            $('.maskpop').remove();
            // window.location.href = Vue.prototype.idsUrl + '/ids/cn/haier_logout.jsp?regFrom=haierBBS&returnUrl=' + Vue.prototype.idsUrl + '/ids/cn/haier_login.jsp?returnUrl=' + Vue.prototype.siteUrl + '/admin/'
            // router.push({path: '/app/login'})
            window.location.href = Vue.prototype.loginUrl; // 跳转用户中心运营平台
          }
        });
        $('.pop').click(function () {
          $('.maskpop').remove();
          // window.location.href = Vue.prototype.idsUrl + '/ids/cn/haier_logout.jsp?regFrom=haierBBS&returnUrl=' + Vue.prototype.idsUrl + '/ids/cn/haier_login.jsp?returnUrl=' + Vue.prototype.siteUrl + '/admin/'
          // router.push({path: '/app/login'})
          window.location.href = Vue.prototype.loginUrl; // 跳转用户中心运营平台
        });
      }
    } else if (response.status == 401) {
      if (response.data.errorCode.indexOf('notLogin') >= 0) {
        // 未登录跳转
        $('body').append(Vue.prototype.gUtils.myAlert('由于你长时间未操作,请重新登录', 'pop'));
        $('.pop').attr('tabindex', 0).focus().keyup(function (e) {
          if (e.keyCode == 13) {
            $('.maskpop').remove();
            // window.location.href = Vue.prototype.idsUrl + '/ids/cn/haier_logout.jsp?regFrom=haierBBS&returnUrl=' + Vue.prototype.idsUrl + '/ids/cn/haier_login.jsp?returnUrl=' + Vue.prototype.siteUrl + '/admin/'
            // router.push({path: '/app/login'})
            window.location.href = Vue.prototype.loginUrl; // 跳转用户中心运营平台
          }
        });
        $('.pop').click(function () {
          $('.maskpop').remove();
          // window.location.href = Vue.prototype.idsUrl + '/ids/cn/haier_logout.jsp?regFrom=haierBBS&returnUrl=' + Vue.prototype.idsUrl + '/ids/cn/haier_login.jsp?returnUrl=' + Vue.prototype.siteUrl + '/admin/'
          // router.push({path: '/app/login'})
          window.location.href = Vue.prototype.loginUrl; // 跳转用户中心运营平台
        });
      }
    }
  });
});

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
