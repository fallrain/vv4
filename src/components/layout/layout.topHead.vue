<template>
  <div>
    <nav class="g-top-head">
      <a href="#/home" class="g-logo"></a>

      <div class="brand-select">
        <el-dropdown @command="brandChange">
          <el-button type="primary"> {{ brand }}<i class="iconfont icon-zhuye el-icon--right"></i> </el-button>
          <el-dropdown-menu slot="dropdown" class="brand-dropdown-menu">
            <el-dropdown-item v-for="item in brandArr" v-if="item.isShow" :command="item.code">{{
              item.desc
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- <a href="#/dbOperate/surveyChart" class="HeaddbManage">兑呗运营</a> -->
      <el-dropdown>
        <span class="el-dropdown-link HeaddbManage "> 兑呗运营<i class="el-icon-menu el-icon--right"></i> </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="text-align: center;"
            ><a style="display: block;" href="#/dbOperate/sellerGroupManage">直销员组管理</a></el-dropdown-item
          >
          <el-dropdown-item style="text-align: center;"
            ><a style="display: block;" href="#/dbOperate/userGroupManage">用户组管理</a></el-dropdown-item
          >
          <el-dropdown-item style="text-align: center;"
            ><a style="display: block;" href="#/dbOperate/XiaoWeiGroup">小微组管理</a></el-dropdown-item
          >
          <!--   <el-dropdown-item style="text-align: center;"><a style="display: block;" href="#/dbOperate/rightsGrantModel">权益发放模型</a></el-dropdown-item> -->
          <el-dropdown-item style="text-align: center;"
            ><a style="display: block;" href="#/dbOperate/rightsconfigrution">一站式调研</a></el-dropdown-item
          >
          <el-dropdown-item style="text-align: center;"
            ><a style="display: block;" href="#/dbOperate/survey">查看调研列表</a></el-dropdown-item
          >
          <el-dropdown-item style="text-align: center;"
            ><a style="display: block;" href="#/dbOperate/resourceConfigure">实物资源位</a></el-dropdown-item
          >
          <el-dropdown-item style="text-align: center;"
            ><a style="display: block;" href="#/dbOperate/Recruit">认筹列表</a></el-dropdown-item
          >
          <el-dropdown-item style="text-align: center;"
            ><a style="display: block;" href="#/dbOperate/duibeiChart">日清报表</a></el-dropdown-item
          >
          <el-dropdown-item style="text-align: center;"
            ><a style="display: block;" href="#/dbOperate/greyListSet">灰名单设置</a></el-dropdown-item
          >
          <el-dropdown-item style="text-align: center;"
            ><a style="display: block;" href="#/dbOperate/greyListSetRecord">灰名单设置记录</a></el-dropdown-item
          >
          <el-dropdown-item style="text-align: center;"
            ><a style="display: block;" href="#/dbOperate/ruhuServiceReport">入户服务报表</a></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>

      <!-- <down-List :downlistmodel="headmodel"></down-list> -->
      <!--<span class="g-settring fr" @click="logout()" :class="{'g-setting-open':isOpen}"><i style="color: #fc4245" class="iconfont g-downlist-arr icon-dengchutuichuguanbi"></i></span>-->
      <!--<span class="g-userhead fr" @click="mClick" @mouseleave="mLeave">-->
      <!--&lt;!&ndash; <span class="face"> <img :src="fileList[0].url" /> </span> &ndash;&gt;-->
      <!--<b class="name">{{getUserInfo.userName}}</b>-->
      <!--<i class="iconfont" :class="{'icon-menu-block-right-copy':!isLogoutShow,'icon-menu-block-up-copy':isLogoutShow}"></i>-->
      <!--<div class="headbox" v-show="isLogoutShow">-->
      <!--&lt;!&ndash; <span class="info" @click="infoEdit()">修改资料</span> &ndash;&gt;-->
      <!--&lt;!&ndash; <span class="info" @click="pwEdit()">修改密码</span> &ndash;&gt;-->
      <!--<span class="info" @click="logout">退出</span>-->
      <!--</div>-->
      <!--</span>-->
      <div
        class="fr g-seticon"
        @mouseenter="barMenter(0)"
        @mouseleave="reset(0)"
        v-if="this.gUtils.jsonFormatTopset(this.getSystemMenu, 0).length"
      >
        <i class="iconfont icon-guanli" style="color: white;font-size: 22px;"></i>
        <ul class="g-seticon-list" :class="{ 'g-tophead-clock': isSet }">
          <li
            v-for="(model, index) in this.gUtils.jsonFormatTopset(this.getSystemMenu, 0)"
            @click="modellink(model, index)"
            :class="{ 'g-mana-li-hover': model.isHover }"
          >
            <em class="g-seticon-list-col"></em>
            <span class="g-set-evtext">{{ model.name }}</span>
          </li>
        </ul>
      </div>

      <div
        class="fr g-mana"
        @mouseenter="barMenter(1)"
        @mouseleave="reset(1)"
        v-if="this.gUtils.jsonFormatTopmana(this.getSystemMenu, 0).length"
      >
        <span>经营后台</span>
        <i class="iconfont jt icon-chevron-copy-copy-copy" style="color: white;margin-left: 7px;"></i>
        <ul class="g-mana-list" :class="{ 'g-tophead-clock': isMana }">
          <li
            v-for="(model, index) in this.gUtils.jsonFormatTopmana(this.getSystemMenu, 0)"
            @click="modellink(model, index)"
            :class="{ 'g-mana-li-hover': model.isHover }"
          >
            <em class="g-seticon-list-col"></em>
            <span class="g-nana-evtext">{{ model.name }}</span>
          </li>
        </ul>
      </div>

      <p class="fr g-username">
        <img src="../../assets/images/user-photo.png" />
        <span>{{ getUserInfo.userName }}，欢迎您！</span>
        <span class="g-username-out" @click="logout">
          <i class="iconfont g-downlist-arr icon-dengchutuichuguanbi fl" style="font-size: 20px;"></i>
          <em>离开</em>
        </span>
      </p>

      <!-- <span class="g-message fr"><i class="iconfont icon-iconfontxiaoxi1"></i><b>2</b></span> -->
      <div class="g-setting-list" v-show="isOpen">
        <span
          >{{ setmodel.name }}<a class="g-setting-close" @click="toggle()"><i class="iconfont icon-icon-32"></i></a
        ></span>
        <ul>
          <li v-for="model in setmodel.children">
            <a @click="routeLink(model.url)">{{ model.name }}</a>
          </li>
        </ul>
      </div>
      <diglog v-show="isEdit" my-style="width:600px;" :is-Out="isOut">
        <h2 slot="header">修改资料</h2>
        <div slot="body" class="digbox">
          <div class="col">
            <span>真实姓名：</span>
            <input
              type="text"
              v-model="getUserInfo.trueName"
              placeholder="请输入真实姓名"
              class="g-input"
              autocomplete="off"
              style="width:260px;"
            />
          </div>
          <div class="col">
            <span>英文名：</span>
            <input
              v-validate
              data-vv-rules="alpha"
              name="英文名"
              type="text"
              v-model="getUserInfo.enName"
              placeholder="请输入英文名"
              class="g-input"
              autocomplete="off"
              style="width:260px;"
            />
            <p v-show="errors.has('英文名')" class="error">{{ errors.first('英文名') }}</p>
          </div>
          <div class="col">
            <span>性别：</span>
            <span class="radiobox"
              ><input type="radio" name="gender" value="1" v-model="getUserInfo.gender" />男<input
                type="radio"
                name="gender"
                value="2"
                v-model="getUserInfo.gender"
              />女</span
            >
          </div>
          <div class="col">
            <span>邮箱：</span>
            <input
              v-validate
              data-vv-rules="email"
              name="邮箱"
              type="text"
              v-model="getUserInfo.email"
              placeholder="请输入邮箱"
              class="g-input"
              autocomplete="off"
              style="width:260px;"
            />
            <p v-show="errors.has('邮箱')" class="error">{{ errors.first('邮箱') }}</p>
          </div>
          <div class="col">
            <span>手机号：</span>
            <input
              v-validate
              data-vv-rules="numeric"
              name="手机号"
              type="text"
              v-model="getUserInfo.phone"
              placeholder="请输入手机号"
              class="g-input"
              autocomplete="off"
              style="width:260px;"
              maxlength="11"
            />
            <p v-show="errors.has('手机号')" class="error">{{ errors.first('手机号') }}</p>
          </div>
          <!--<div class="col"> <span>头像：</span>
          <el-upload action="http://tbbs.haier.com/gateway/user/upload" type="drag" :thumbnail-mode="true" :on-success="upSuccess"
            :on-error="upError" :default-file-list="fileList">
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>-->
        </div>
        <div slot="footer">
          <g-button type="2" @click="editPerson">保存</g-button>
          <g-button type="3" @click="isEdit = false">取消</g-button>
        </div>
      </diglog>
      <diglog v-show="isPw" my-style="width:600px;" :is-Out="isOut">
        <h2 slot="header">重置密码</h2>
        <div slot="body" class="digbox">
          <div class="col">
            <span>旧密码：</span>
            <input
              type="password"
              v-model="pwInfo.oldPassword"
              placeholder="请输入旧密码"
              class="g-input"
              autocomplete="off"
              style="width:260px;"
            />
          </div>
          <div class="col">
            <span>新密码：</span>
            <input
              type="password"
              v-model="pwInfo.newPassword"
              placeholder="请输入新密码"
              class="g-input"
              autocomplete="off"
              style="width:260px;"
            />
          </div>
          <div class="col">
            <span>重复密码：</span>
            <input
              type="password"
              v-model="pwInfo.reNewPassword"
              placeholder="请输入重复密码"
              class="g-input"
              autocomplete="off"
              style="width:260px;"
            />
          </div>
        </div>
        <div slot="footer">
          <g-button @click="editPassword" type="2">保存</g-button>
          <g-button @click="isPw = false" type="3">取消</g-button>
        </div>
      </diglog>
    </nav>

    <!-- 面包屑 -->
    <!-- <div class="crumbs">
      <span><i class="iconfont icon-home-select-copy color-link" style="margin-right: 5px;"></i><a href="javascript:;" @click="goHome">主页</a></span>
      <span v-for="item in crumbs"><i>/</i>{{item}}</span>
      <span v-if="specification" style="font-size: 12px;margin-left: 4px;">（{{specification}}）</span>
    </div> -->
    <!-- 面包屑 END -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import downList from '../common/comm.downList';
import diglog from '../common/comm.dialog.vue';
import gButton from '../common/comm.button.vue';
import crumbsDes from '../../json/crumbs';


export default {
  components: {
    downList,
    diglog,
    gButton
  },
  props: ['headmodel', 'setmodel'],
  data() {
    return {
      isSet: false,
      isMana: false,
      isOpen: false,
      isLogoutShow: false,
      isEdit: false,
      isOut: false,
      isPw: false,
      pwInfo: {
        oldPassword: '',
        newPassword: '',
        reNewPassword: ''
      },
      brand: '',
      crumbs: [], // 面包屑
      brandArr: {
        haier: {
          desc: '海尔品牌',
          code: 'haier',
          isShow: false
        },
        casarte: {
          desc: '卡萨帝品牌',
          code: 'casarte',
          isShow: false
        }
      },
      specification: ''
    };
  },
  computed: {
    ...mapGetters({
      getUserInfo: 'getUserInfo',
      getBBSuserInfo: 'getBBSuserInfo',
      getSystemMenu: 'getSystemMenu'
    }),
    fileList() {
      const o = [
        {
          name: '头像.jpeg',
          url: this.getBBSuserInfo.userphoto
        }
      ];
      return o;
    }
  },
  methods: {
    ...mapActions({
      removeAllHistory: 'removeAllHistory',
      removeUserInfo: 'removeUserInfo'
    }),
    barMenter(e) {
      if (e == 0) {
        this.isSet = true;
      }
      if (e == 1) {
        this.isMana = true;
      }
    },
    reset(e) {
      if (e == 0) {
        this.isSet = false;
      }
      if (e == 1) {
        this.isMana = false;
      }
    },
    modellink(e, i) {
      this.$router.push({
        path: e.url
      });
      this.isSet = false;
      this.isMana = false;
      // 左边取消
      for (const i in this.getSystemMenu) {
        this.getSystemMenu[i].isMouse = false;
        for (const j in this.getSystemMenu[i].children) {
          this.getSystemMenu[i].children[j].isHover = false;
        }
      }
      // 右上角加上
      e.isHover = true;
    },
    infoEdit() {
      window.open(`${this.idsUrl}/HaierFramework/haier/appuser/vipUser/vipUserInfo.jsp`);
    },
    pwEdit() {
      window.open(`${this.idsUrl}/HaierFramework/haier/appuser/vipUser/modifyPwd.jsp`);
    },
    toggle() {
      // this.isOpen = !this.isOpen
    },
    routeLink(url) {
      this.$router.push({
        path: url
      });
    },
    mClick() {
      this.isLogoutShow = true;
    },
    mLeave() {
      this.isLogoutShow = false;
    },
    goHome() {
      this.$router.push({
        path: '/home'
      });
    },
    logout() {
      this.$http({
        method: 'POST',
        url: `${this.apiUrl}vipcenter/auth/logout`
      }).then(
        function (data) {
          // if (data.data.isSuccess) {
          // 退出清空历史
          // localStorage.setItem("historyTabs", JSON.stringify([{
          //   name: "首页",
          //   url: "/home",
          //   icon: "icon-weibiaoti5",
          //   hide: false
          // }]));
          // localStorage.setItem("openTab", JSON.stringify({
          //   name: "首页",
          //   url: "/home",
          //   icon: "icon-weibiaoti5",
          //   hide: false
          // }));
          this.removeAllHistory();
          this.removeUserInfo();
          // this.$router.push({
          //   path: '/app/login'
          // });
          $('#dom-loading').show();
          window.location.href = this.loginUrl; // 跳转用户中心运营平台
        },
        function (error) {
          if (!error.data.isSuccess && error.data.errorCode.indexOf('notLogin') >= 0) {
            // this.$router.push({
            //   path: '/app/login'
            // })
            window.location.href = this.loginUrl; // 跳转用户中心运营平台
          }
        }
      );

      // 退出清空历史
      // localStorage.setItem('historyTabs', JSON.stringify([{
      //   name: '首页',
      //   url: '/home',
      //   icon: 'icon-weibiaoti5',
      //   hide: false
      // }]))
      // localStorage.setItem('openTab', JSON.stringify({
      //   name: '首页',
      //   url: '/home',
      //   icon: 'icon-weibiaoti5',
      //   hide: false
      // }))
      // this.removeAllHistory()
      // this.removeUserInfo()
      // window.location.href = this.idsUrl + '/ids/cn/haier_logout.jsp?regFrom=haierBBS&returnUrl=' + this.idsUrl +
      //     '/ids/cn/haier_login.jsp?returnUrl=' + this.siteUrl + '/admin/'
    },
    editPerson() {
      this.$http({
        method: 'POST',
        url: `${this.devUrl}/user/updateUserInfo`,
        params: this.getUserInfo
      }).then(
        function (data) {
          if (data.data.isSuccess) {
            $('body').append(this.gUtils.myAlert('信息保存成功!', 'pop'));
            $('.pop').click(() => {
              $('.maskpop').remove();
            });
            this.isEdit = false;
          }
        },
        function (error) {
          $('body').append(this.gUtils.myAlert(error.data.resultMsg, 'pop'));
          $('.pop').click(() => {
            $('.maskpop').remove();
          });
        }
      );
    },
    editPassword() {
      this.$http({
        method: 'POST',
        url: `${this.devUrl}/user/changePwd`,
        params: this.pwInfo
      }).then(
        function (data) {
          if (data.data.isSuccess) {
            $('body').append(this.gUtils.myAlert('密码保存成功!', 'pop'));
            $('.pop').click(() => {
              $('.maskpop').remove();
            });
            this.isPw = false;
            this.logout();
          }
        },
        function (error) {
          $('body').append(this.gUtils.myAlert(error.data.resultMsg, 'pop'));
          $('.pop').click(() => {
            $('.maskpop').remove();
          });
        }
      );
    },
    upError(err, response, file) {
      // 替换原生alert
      let info = '';
      if (response.resultMsg.indexOf('1048576') >= 0) {
        info = '上传文件不能大于1mb';
      }
      $('body').append(this.gUtils.myAlert(info, 'pop'));
      $('.pop').click(() => {
        $('.maskpop').remove();
      });
    },
    upSuccess(response, file, fileList) {
      this.getUserInfo.pic = response.data;
    },
    brandChange(command) {
      $.cookie('vipCenterCurrentBrandName', command, {
        domain: this.domain,
        path: '/'
      });

      // 切换品牌 刷新路由
      this.$router.go(0);
      this.$router.push({
        path: '/home'
      });
    }
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
    },
    getUserInfo(curVal, oldVal) {
      const allBrand = this.getUserInfo.allBrandName.split(',');
      for (let i = 0; i < allBrand.length; i++) {
        this.brandArr[allBrand[i].toLowerCase()].isShow = true;
      }

      this.brand = this.brandArr[this.getUserInfo.brandName.toLowerCase()].desc;
    }
  }
};
</script>
<style>
.el-upload {
  width: 180px;
  position: relative;
  left: 75px;
  top: -15px;
}

.el-dragger {
  width: 180px;
}

.el-dragger span {
  width: auto !important;
  text-align: center !important;
  display: inline-block !important;
  font-size: auto !important;
  color: #fff !important;
}

.el-progress-bar {
  margin-top: 90px;
  width: 160px;
  margin-left: 10px;
}
.g-home {
  height: 45px;
  line-height: 45px;
  padding: 0 10px;
  border-left: 1px solid #ededed;
  cursor: pointer;
  position: relative;
  color: #666;
}
.g-home:hover i {
  color: #20a0ff;
}
.g-home:hover em {
  color: #20a0ff;
}
.g-home i {
  vertical-align: middle;
}
.g-home em {
  color: #666;
  vertical-align: middle;
}
.g-userhead:hover .name {
  color: #20a0ff !important;
}
.HeaddbManage:hover {
  color: #fff;
  cursor: pointer;
}
.HeaddbManage {
  height: 100%;
  color: #fff;
  font-size: 16px;
}
.HeaddbManage:visited {
  color: #fff;
}
</style>
