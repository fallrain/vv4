<template>
  <div class="g-login">
    <!--START header -->
    <div class="header o_fixH">
      <div class="header-content">
        <a href="javascript:;" class="logo">
          <img src="../../assets/images/logo.png" />
          <!-- <span>海尔社区管理平台</span> -->
        </a>
      </div>
    </div>
    <!--END header -->
    <!--START content  -->
    <div class="o_autoH">
      <div class="content">
        <div class="login-block">
          <h1>会员中心后台登录</h1>
          <div class="login-form">
            <div class="o_clear "></div>
            <div>
              <label>用户名</label>
              <!-- <i class="iconfont icon-denglu"></i> -->
              <input type="text" class="g-input" autocomplete="off" v-model="userInfo.userName" />
            </div>
            <div class="normal-login">
              <label>密&nbsp;&nbsp;&nbsp;码</label>
              <!-- <i class="iconfont icon-0056"></i> -->
              <input
                type="password"
                class="g-input"
                autocomplete="off"
                v-model="userInfo.password"
                @keyup.enter="login"
              />
            </div>
            <div class="normal-login vcode-input" v-show="vCodeShow">
              <div class="verify-block fl" style="width:203px!important">
                <label class="">验证码</label>
                <input
                  type="text"
                  class="g-input"
                  autocomplete="off"
                  placeholder="验证码"
                  v-model="userInfo.code"
                  @keyup.enter="login"
                />
              </div>
              <div class="s-verify fr">
                <img src="/" id="vCode" @click="refreshVerifyCode" />
              </div>
            </div>
            <!-- <div class="rem-input"><input type="checkBox" id="remmbername" @click="userInfo.rememberMe=!userInfo.rememberMe" v-model="userInfo.rememberMe"> -->
            <!-- <label for="remmbername"><span>记住我</span></label> -->
            <!-- </div> -->
            <g-button
              type="2"
              my-style="width:100%;height:50px;line-height:50px;font-size:18px;margin-top:15px;"
              @click="login"
              >登录</g-button
            >
          </div>
        </div>
      </div>
    </div>
    <!--END content  -->
    <div class="footer o_fixH" style="height:60px;">
      <div class="footer-content">
        <p>Copyright©2000-2016 海尔集团电子商务有限公司 All Rights Reserved</p>
        <div class="o_df_left">
          <!--<a href="javascript:;">关于海尔</a><span class="division">|</span>
          <a href="javascript:;">联系我们</a><span class="division">|</span>
          <a href="javascript:;">法律声明</a>-->
        </div>
        <div class="o_df_right">
          <!--<span>鲁ICP备09096283</span><span class="division">|</span>
          <span>Copyright ©2015 海尔集团 版权所有</span>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import gButton from '../../components/common/comm.button';
import menu from '../../json/menu.js'; // 菜单


export default {
  components: {
    gButton
  },
  data() {
    return {
      userInfo: {
        userName: 'A0020407',
        password: '141736',
        rememberMe: false
      },
      vCodeShow: false
    };
  },
  mounted() {
    $('#dom-loading').hide();
  },
  methods: {
    ...mapActions({
      setUserInfo: 'setUserInfo'
    }),

    login() {
      const self = this;

      // 模拟登录
      this.$http({
        method: 'POST',
        url: `${self.apiUrl}vipcenter/auth/login`,
        params: {
          userName: self.userInfo.userName,
          passWord: self.userInfo.password
        }
      }).then(
        (data) => {
          if (data.data.isSuccess) {
            // 隐藏loading页面

            self.$router.push({
              path: '/home',
              query: {
                hyzx: data.data.data.split('hyzx=')[1]
              }
            });
            $('#dom-loading').show();
            window.location.reload();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    refreshVerifyCode() {
      $('#vCode').attr('src', `${this.apiUrl}/user/captcha?random=${Math.random()}`);
    }
  }
};
</script>
