<template>
  <div class="vip-content" style="background: #eff4f8;height: 100%;min-width: 1180px;position: relative;">
    <div class="left">
      <div class="index-grid">
        <p class="template-brand"><i></i>快捷入口</p>
      </div>
      <div class="home-group" style="margin-top:0px;">
        <div v-if="jurisdiction['home:contentOperations:visible']" class="box">
          <div>
            <a @click="hometo('/contents/content')">
              <!-- <p class="i1"></p> -->
              <img src="../../assets/images/home_img1.jpg" />
              <h3>内容运营</h3>
              <div class="m-txt">企业咨询、家电优选、家电课堂内容运营</div>
            </a>
          </div>
        </div>
        <div v-if="jurisdiction['home:marketingOperations:visible']" class="box">
          <div>
            <a @click="hometo('/activity/addactivity')">
              <!-- <p class="i2"></p> -->
              <img src="../../assets/images/home_img2.jpg" />
              <h3>营销运营</h3>
              <div class="m-txt">活动发布、沟通渠道 选择及配置</div>
            </a>
          </div>
        </div>
        <div
          v-if="jurisdiction['home:strategyOperations:visible']"
          class="box"
          @mouseenter="menter(3)"
          @mouseleave="mleave(3)"
        >
          <transition name="home-fade" mode="out-in">
            <div>
              <div v-if="box.show1">
                <!-- <p class="i3"></p> -->
                <img src="../../assets/images/home_img3.jpg" />
                <h3>策略运营</h3>
                <div class="m-txt">等级、成长值、权益、 积分策略制定</div>
              </div>
            </div>
          </transition>
          <transition name="home-fade" mode="out-in">
            <div class="index-link" v-if="!box.show1">
              <div>
                <a @click="hometo('/strategy/level')">
                  <!-- <i class="iconfont icon-dengji"></i> -->
                  <img src="../../assets/images/home_icon01.png" />
                  <span>等级策略</span>
                </a>
                <a @click="hometo('/strategy/growup')">
                  <!-- <i class="iconfont icon-chengchangguiji"></i> -->
                  <img src="../../assets/images/home_icon02.png" />
                  <span>成长策略</span>
                </a>
                <a @click="hometo('/strategy/system')">
                  <!-- <i class="iconfont icon-jifen"></i> -->
                  <img src="../../assets/images/home_icon03.png" />
                  <span>积分策略</span>
                </a>
                <a @click="hometo('/rights/xrights')">
                  <!-- <i class="iconfont icon-quanyishangpin"></i> -->
                  <img src="../../assets/images/home_icon04.png" />
                  <span>权益策略</span>
                </a>
              </div>
            </div>
          </transition>
        </div>
        <div
          v-if="jurisdiction['home:customerOperations:visible']"
          class="box"
          @mouseenter="menter(4)"
          @mouseleave="mleave(4)"
        >
          <transition name="home-fade" mode="out-in">
            <div>
              <div v-if="box.show2">
                <!-- <p class="i4"></p> -->
                <img src="../../assets/images/home_img4.jpg" />
                <h3>客服运营</h3>
                <div class="m-txt">常规客服问答及客服人 员管理</div>
              </div>
            </div>
          </transition>
          <transition name="home-fade" mode="out-in">
            <div class="index-link" v-if="!box.show2">
              <div>
                <a @click="hometo('/service/personnel')">
                  <!-- <i class="iconfont icon-kefu1"></i> -->
                  <img src="../../assets/images/home_icon05.png" />
                  <span>客服维护</span>
                </a>
                <a @click="hometo('/service/group')">
                  <!-- <i class="iconfont icon-fenzu"></i> -->
                  <img src="../../assets/images/home_icon06.png" />
                  <span>分组管理</span>
                </a>
                <el-tooltip class="item" effect="dark" content="常用知识管理" placement="left">
                  <a @click="hometo('/service/faqs')">
                    <!-- <i class="iconfont icon-zhishi"></i> -->
                    <img src="../../assets/images/home_icon07.png" />
                    <span>常用知...</span>
                  </a>
                </el-tooltip>
                <a @click="hometo('/service/sendnotice')">
                  <!-- <i class="iconfont icon-fasonglanjietongzhi"></i> -->
                  <img src="../../assets/images/home_icon08.png" />
                  <span>发送通知</span>
                </a>
              </div>
            </div>
          </transition>
        </div>
        <div v-if="jurisdiction['home:dataOperations:visible']" class="box">
          <div>
            <a @click="hometo('/report/operation')">
              <!-- <p class="i5"></p> -->
              <img src="../../assets/images/home_img5.jpg" />
              <h3>数据运营</h3>
              <div class="m-txt">会员入会、活跃、留存、 价值趋势、准金银卡会员 及活动数据统计</div>
            </a>
          </div>
        </div>
        <div v-if="jurisdiction['home:rightsOperations:visible']" class="box">
          <div>
            <a @click="hometo('/strategy/rightsconfig')">
              <!-- <p class="i6"></p> -->
              <img src="../../assets/images/home_img6.jpg" />
              <h3>权益运营</h3>
              <div class="m-txt">单品权益，套购权益 权益策略制定</div>
            </a>
          </div>
        </div>
        <div style="clear:both;"></div>
      </div>
      <!--友情连接 开始-->
      <div class="linkbox">
        <div class="m-tit">友情连接：</div>
        <a href="http://www.haierchina.ethicspoint.com" target="_blank">合规热线</a>
      </div>
      <!--友情连接 结束-->
    </div>
    <div class="right">
      <div class="home-right-top">
        <div class="index-grid">
          <p class="template-brand" style="margin-bottom:7px"><i></i>我的待办</p>
          <div class="box">
            <a
              href="javascript:;"
              @click="reviewActivity(1)"
              v-if="jurisdiction['marketingOperations:activityManager:visible']"
            >
              <img src="../../assets/images/home_icon09.png" />

              <i class="red">{{ activityCount.wait }}</i
              >活动类</a
            >
            <a href="javascript:;" @click="reviewRights(11)" v-if="jurisdiction['home:rightsOperations:visible']">
              <img src="../../assets/images/home_icon10.png" />

              <i>{{ rightsCount.wait }}</i
              >权益类</a
            >
          </div>
        </div>
      </div>
      <div class="home-right-bottom">
        <div class="index-grid">
          <p class="template-brand" style="margin-bottom:7px"><i></i>已完成</p>
          <div class="box">
            <a
              href="javascript:;"
              @click="reviewActivity(2)"
              v-if="jurisdiction['marketingOperations:activityManager:visible']"
            >
              <img src="../../assets/images/home_icon09.png" />
              <i class="red">{{ activityCount.finish }}</i
              >活动类</a
            >
            <a href="javascript:;" @click="reviewRights(12)" v-if="jurisdiction['home:rightsOperations:visible']">
              <img src="../../assets/images/home_icon10.png" />
              <i>{{ rightsCount.finish }}</i
              >权益类</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction',
      getSystemMenu: 'getSystemMenu'
    })
  },
  data() {
    return {
      box: {
        show1: true,
        show2: true
      },
      activityCount: {
        wait: 0,
        total: 0,
        finish: 0
      },
      rightsCount: {
        wait: 0,
        finish: 0
      },
      path: '/rights/rightsactlist'
    };
  },
  methods: {
    hometo(e) {
      for (const i in this.getSystemMenu) {
        this.getSystemMenu[i].isMouse = false;
        for (const j in this.getSystemMenu[i].children) {
          this.getSystemMenu[i].children[j].isHover = false;
          if (this.getSystemMenu[i].children[j].url == e) {
            this.getSystemMenu[i].isMouse = true;
            this.getSystemMenu[i].children[j].isHover = true;
          }
        }
      }
      this.$router.push({
        path: e
      });
    },
    modellink(e) {},
    menter(type) {
      const _this = this;
      switch (type) {
        case 3:
          _this.box.show1 = false;
          break;
        case 4:
          _this.box.show2 = false;
          break;
      }
    },
    mleave(type) {
      const _this = this;
      switch (type) {
        case 3:
          _this.box.show1 = true;
          break;
        case 4:
          _this.box.show2 = true;
          break;
      }
    },
    // 跳转模板详情
    reviewActivity(status) {
      for (const i in this.getSystemMenu) {
        this.getSystemMenu[i].isMouse = false;
        for (const j in this.getSystemMenu[i].children) {
          this.getSystemMenu[i].children[j].isHover = false;
          if (this.getSystemMenu[i].children[j].url == '/communication/activity') {
            this.getSystemMenu[i].isMouse = true;
            this.getSystemMenu[i].children[j].isHover = true;
          }
        }
      }
      this.$router.push({
        path: '/communication/activity',
        query: { status }
      });
    },
    reviewRights(status) {
      for (const i in this.getSystemMenu) {
        this.getSystemMenu[i].isMouse = false;
        for (const j in this.getSystemMenu[i].children) {
          this.getSystemMenu[i].children[j].isHover = false;
          if (this.getSystemMenu[i].children[j].url == this.path) {
            this.getSystemMenu[i].isMouse = true;
            this.getSystemMenu[i].children[j].isHover = true;
          }
        }
      }
      this.$router.push({
        path: this.path
        // query: { type: status }
      });
    },
    // 获取登录用户活动数目
    getActivityCount() {
      const self = this;
      this.requestCare.getActivityCount().then((data) => {
        self.activityCount = data;
      });
    },
    getFinishCount() {
      const self = this;
      this.requestRights.getFinishCount().then((data) => {
        if (data) {
          self.rightsCount.finish = data;
        }
      });
    },
    getWaitCount() {
      const self = this;
      this.requestRights.getWaitCount().then((data) => {
        if (data) {
          self.rightsCount.wait = data;
        }
      });
    },
    listCheckedOrRights() {
      const self = this;
      this.requestRights.listCheckedOrRights().then((data) => {
        if (data == 2) {
          self.path = '/strategy/rightsaudit';
        }
      });
    }
  },
  mounted() {
    const self = this;
    setTimeout(() => {
      self.getActivityCount();
      self.getFinishCount();
      self.getWaitCount();
      self.listCheckedOrRights();
    }, 1000);
  }
};
</script>

<style scoped>
.left .index-grid {
  margin-bottom: -35px;
}

.vip-content {
  padding: 0;
}

.vip-content .index-grid {
  /* margin-bottom: 30px; */
}

.vip-content .left {
  background: #fff;
  padding: 20px 0 0px 0;
  float: left;
  min-width: 815px;
  position: absolute;
  right: 273px;
  left: 0;
}
.vip-content .left .linkbox {
  width: 100%;
  display: inline-block;
  border-top: 10px solid #eff4f8;
  height: 50px;
  line-height: 40px;
  padding: 0 15px;
  box-sizing: border-box;
}
.vip-content .left .linkbox .m-tit {
  width: auto;
  display: inline-block;
  float: left;
  font-size: 14px;
  margin-right: 5px;
}
.vip-content .left .linkbox a {
  color: #428bca;
}

.vip-content .right {
  width: 243px;
  position: absolute;
  right: 0;
}

.vip-content .home-group {
  margin: 10px 30px 20px 30px;
  /* border-left:1px solid #cddff0 ; */
  /* border-top:1px solid #cddff0 ; */
  display: inline-block;
}

.vip-content .home-group .box {
  /* min-width: 339.89px; */
  min-width: 281.7px;
  position: relative;
  width: 33.3%;
  text-align: center;
  float: left;
  padding: 5px 20px 0;
  height: 220px;
  cursor: pointer;
  /* border:1px solid #cddff0 ; */
  margin: -1px -1px 0 0;
}

.vip-content .home-group .box > div {
  display: table;
  height: 100%;
  margin: auto;
}

.vip-content .home-group .box > div > div,
.vip-content .home-group .box > div > a {
  display: table-cell;
  vertical-align: middle;
}

@media (min-width: 1300px) {
  .vip-content .home-group .box {
    height: 220px;
  }
}

@media (min-width: 1500px) {
  .vip-content .home-group .box {
    height: 235px;
  }
}

.vip-content .home-group .box .index-link {
  /* margin: 18px 0px 0px -96px; */
  /* left:50%; */
  left: 0;
  right: 0;
  font-size: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: table;
  width: 100%;
  height: 100%;
}

.vip-content .home-group .box .index-link div {
  margin: auto;
  display: table-cell;
  vertical-align: middle;
}

.vip-content .home-group .box .index-link a {
  width: 50%;
  margin: 0;
  box-sizing: border-box;
  padding: 10px;
}

.vip-content .home-group .box .index-link a img {
  max-height: 35px;
  width: auto;
  margin-bottom: 15px;
}

.vip-content .home-group .box:nth-child(2),
.vip-content .home-group .box:nth-child(5) {
  width: 33.4%;
}

.vip-content .home-group .box h3 {
  color: #2ca3fc;
  font-size: 24px;
  margin-bottom: 10px;
  margin-top: 15px;
}

.vip-content .home-group .box p {
}

.vip-content .home-group .box .m-txt {
  text-align: center;
  font-size: 12px;
  color: #666666;
  width: 100%;
}

.vip-content .home-group .box p::before {
  width: 344px;
  height: 196px;
  display: block;
  content: '';
  margin: 0 auto 10px;
}

.vip-content .home-group .box p.i1::before {
  background: url('../../assets/images/home_img1.jpg') no-repeat;
}

.vip-content .home-group .box p.i2::before {
  background: url('../../assets/images/home_img2.jpg') no-repeat;
}

.vip-content .home-group .box p.i3::before {
  background: url('../../assets/images/home_img3.jpg') no-repeat;
}

.vip-content .home-group .box p.i4::before {
  background: url('../../assets/images/home_img4.jpg') no-repeat;
}

.vip-content .home-group .box p.i5::before {
  background: url('../../assets/images/home_img5.jpg') no-repeat;
}

.vip-content .home-group .box p.i6::before {
  background: url('../../assets/images/home_img6.jpg') no-repeat;
}

.vip-content .home-group .box img {
  width: 75%;
}

.vip-content .right .home-right-top {
  background: #fff;
  padding: 20px 0 10px;
}

.vip-content .right .home-right-bottom {
  margin-top: 19px;
  background: #fff;
  padding: 20px 0 10px;
}

.vip-content .right .box {
  /*padding: 10px;*/
  font-size: 0;
}

.vip-content .right .box a {
  width: 50%;
  font-size: 14px;
  display: inline-block;
  color: #111;
  text-align: center;
}

.vip-content .right .box a::before {
  display: block;
  text-align: center;
  font-size: 50px;
  color: #289fd7;
  margin-left: 20px;
}

.vip-content .right .box a img {
  margin: 15px auto;
  display: block;
  height: 45px;
}

.vip-content .right .box a i {
  /* width: 20px; */
  height: 20px;
  padding: 0 3px;
  background: #03d708;
  color: #fff;
  border-radius: 5px;
  display: inline-block;
  margin-right: 5px;
  text-align: center;
  font-style: normal;
}

.vip-content .right .box a i.red {
  background: #f30303;
}
</style>
