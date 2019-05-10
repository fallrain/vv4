<template>
  <div>
    <top-Head v-for="model in downListData" :headmodel="model" :setmodel="settingData"></top-Head>
    <div class="g-left-menu">
      <!-- <span class="g-left-menu-toggle" :class="{closed:isToggle}">
        <i v-show="!isToggle" class="iconfont icon-caidan01" style="color:#9faab4;line-height:33px;font-size:15px;margin-right:9px;"></i>
        <span v-show="!isToggle" @click="toggleSiteList">海尔平台</span>
        <div class="site-list" v-show="isSiteListShow">
            <a class="info" v-for="site in siteList" @click="toggleSiteList">{{site.name}}</a>
        </div>
        <a class="left-menu-toggle">
          <i class="iconfont g-left-menu-icon-arr jt" @click="toggle" :class="{'icon-arrow-right':isToggle,'icon-arrow-left':!isToggle}"></i>
        </a>
      </span> -->
      <!-- 侧边栏菜单 -->
      <side-Bar :sidemodel="this.gUtils.jsonFormatSide(this.getSystemMenu, 0)"></side-Bar>

      <!--<ul class="g-left-bar-nav">-->

      <!--<side-Menu v-for="model,index in this.gUtils.jsonFormatSide(this.getSystemMenu,0)" :menumodel="model"   :islayer="isLayer"></side-Menu>-->
      <!--&lt;!&ndash;<side-Bar v-for="model,index in this.gUtils.jsonFormatSide(this.getSystemMenu,0)" :menumodel="model" :indexnum="index"  :islayer="isLayer"></side-Bar>&ndash;&gt;-->
      <!--</ul>-->
    </div>
    <div class="g-right-main">
      <!-- 面包屑 -->
      <div class="crumbs">
        <!--<span class="menu-toggle" @click="toggle" :class="{closed:isToggle}" v-show="isToggle">-->
        <!--<i class="iconfont icon-caidan1"></i>-->
        <!--</span>-->
        <span>
          <i class="iconfont icon-home-select-copy color-link" style="margin-right: 5px;"></i>
          <a href="javascript:;" @click="goHome">主页</a>
        </span>
        <span v-for="item in crumbs" @click="goMBX(item)" style="cursor: pointer;"> <i>/</i>{{ item }}</span>
        <!-- <span v-if="specification" style="font-size: 12px;margin-left: 4px;">（{{specification}}）</span> -->
      </div>
      <!-- 面包屑 END -->

      <div class="g-tabs-view" id="app-view">
        <!-- 选项卡路由 -->
        <!-- <transition name="component-fade" mode="out-in" v-if="$route.meta.requiresAuth">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
        <transition name="component-fade" mode="out-in" v-if="!$route.meta.requiresAuth">
          <router-view></router-view>
        </transition> -->

        <!-- 非选项卡路由 -->
        <!-- <transition name="component-fade" mode="out-in"> -->
        <router-view></router-view>
        <!-- </transition> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import topHead from './layout.topHead';
import sideBar from '../common/comm.sideBar';

import menuData from '../../json/menu.js';
import downListData from '../../json/dowListData.js';
import settingData from '../../json/settingList.js';
import crumbsDes from '../../json/crumbs';


export default {
  components: {
    sideBar,
    topHead
  },
  data() {
    return {
      menuData,
      downListData,
      settingData,
      isToggle: true,
      isLayer: true,
      isSiteListShow: false,
      isTabsListShow: false,
      siteList: [
        {
          name: '海尔社区'
        },
        {
          name: '卡萨帝'
        },
        {
          name: '统帅'
        }
      ],
      crumbs: [], // 面包屑
      specification: ''
    };
  },
  computed: {
    ...mapGetters({
      tabList: 'getTabData',
      getSystemMenu: 'getSystemMenu',
      openTab: 'getOpenTab'
    })
  },
  methods: {
    go(el) {
      this.$router.push({
        path: el
      });
    },
    toggle() {
      this.isToggle = !this.isToggle;
      this.setClosed(this.isToggle);
    },
    // 平台列表
    toggleSiteList() {
      this.isSiteListShow = !this.isSiteListShow;
    },
    routeLink(model) {
      this.selTabData({
        name: model.name,
        url: model.url,
        icon: model.icon,
        hide: model.hide
      });
      if (model.url.indexOf('http') >= 0) {
        this.$router.push({
          path: '/comm'
        });
        this.$router.match('/comm').meta.requiresAuth = true;
      } else {
        this.$router.push({
          path: model.url
        });
        this.$router.match(model.url).meta.requiresAuth = true;
      }
    },
    hideTabsShow() {
      this.isTabsListShow = !this.isTabsListShow;
    },
    hideTabsShowLeave() {
      this.isTabsListShow = false;
    },
    goMBX(item) {
      if (item == '直销员组管理') {
        this.$router.push('/dbOperate/sellerGroupManage');
      }
      if (item == '用户组管理') {
        this.$router.push('/dbOperate/userGroupManage');
      }
      if (item == '调研配置') {
        this.$router.push('/dbOperate/survey');
      }
      if (item == '资源位配置') {
        this.$router.push('/dbOperate/resourceConfigure');
      }
    },
    goHome() {
      for (const i in this.getSystemMenu) {
        this.getSystemMenu[i].isMouse = false;
        for (const j in this.getSystemMenu[i].children) {
          this.getSystemMenu[i].children[j].isHover = false;
        }
      }
      this.$router.push({
        path: '/home'
      });
    },
    closeAll() {
      this.isTabsListShow = false;
      localStorage.setItem(
        'historyTabs',
        JSON.stringify([
          {
            name: '首页',
            url: '/home',
            icon: 'icon-weibiaoti5',
            hide: false
          }
        ])
      );
      localStorage.setItem(
        'openTab',
        JSON.stringify({
          name: '首页',
          url: '/home',
          icon: 'icon-weibiaoti5',
          hide: false
        })
      );

      // 全加后解除
      const arr = this.$store.getters.getTabData;
      for (let i = 1; i < arr.length; i++) {
        const reset = `resetBBS${arr[i].url.split('/')[arr[i].url.split('/').length - 1]}`;
        this.$store.dispatch(reset);
      }

      this.removeAllHistory();
      this.$router.replace({
        path: '/home'
      });
    },
    closeOther() {
      const history = [
        {
          name: '首页',
          url: '/home',
          icon: 'icon-weibiaoti5',
          hide: false
        }
      ];
      let open = {};

      if (this.openTab.name !== '首页') {
        history.push({
          name: this.openTab.name,
          url: this.openTab.url,
          icon: this.openTab.name,
          hide: this.openTab.hide
        });

        open = {
          name: this.openTab.name,
          url: this.openTab.url,
          icon: this.openTab.name,
          hide: this.openTab.hide
        };
      } else {
        open = {
          name: '首页',
          url: '/home',
          icon: 'icon-weibiaoti5',
          hide: false
        };
      }

      localStorage.setItem('historyTabs', JSON.stringify(history));
      localStorage.setItem('openTab', JSON.stringify(open));

      // 全加后解除
      const arr = this.$store.getters.getTabData;
      const op = this.$store.getters.getOpenTab;
      for (let i = 1; i < arr.length; i++) {
        if (arr[i].name != op.name) {
          const reset = `resetBBS${arr[i].url.split('/')[arr[i].url.split('/').length - 1]}`;
          this.$store.dispatch(reset);
        }
      }
      this.removeOtherHistory(this.openTab);
      // this.$router.replace({
      //   path: this.openTab.url
      // })
      this.isTabsListShow = false;
    },
    ...mapActions({
      setClosed: 'setClosed',
      delTabData: 'DEL',
      selTabData: 'SELECT',
      removeAllHistory: 'removeAllHistory',
      removeOtherHistory: 'removeOtherHistory'
    })
  },
  mounted() {
    this.crumbs = [];
    const crumbsArr = this.$route.path.split('/');
    this.specification = '';
    for (let i = 0; i < crumbsArr.length; i++) {
      if (crumbsArr[i] != '') {
        if (i == crumbsArr.length - 1 && this.$route.query.type == 'view') {
          crumbsArr[i] = `${crumbsArr[i]}View`;
        }
        this.crumbs.push(crumbsDes.crumbs[crumbsArr[i]]);
        if (i == 2) {
          this.specification = crumbsDes.specification[crumbsArr[i]];
        }
      }
    }
  },
  watch: {
    $route(curVal, oldVal) {
      if (curVal.path) {
        this.crumbs = [];
        const crumbsArr = curVal.path.split('/');
        this.specification = '';
        for (let i = 0; i < crumbsArr.length; i++) {
          if (crumbsArr[i] != '') {
            if (i == crumbsArr.length - 1 && this.$route.query.type == 'view') {
              crumbsArr[i] = `${crumbsArr[i]}View`;
            }
            this.crumbs.push(crumbsDes.crumbs[crumbsArr[i]]);
            if (i == 2) {
              this.specification = crumbsDes.specification[crumbsArr[i]];
            }
          }
        }
      }
    }
  }
};
</script>
