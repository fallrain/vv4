<template>
  <div class="vip-content">
    <div class="rights-config-guide">
      <h3 class="rights-config-title">请选择您需要创建的权益</h3>
      <div>
        <div class="right-line">
          <p class="rights-title">单品权益</p>
          <div class="rights-desc">
            <div class="right-img">
              <img src="../../assets/images/rightSmallType1.png" alt="" />
            </div>
            <p>
              购买单个型号产品所赠送权益配置，可配置赠送积分、赠送礼品
              <!-- 、同时赠送积分和礼品 -->
            </p>
            <div class="m-hoverbox">
              <div class="m-txt01">准备好以下信息才能完成配置:</div>
              <div class="m-txt02">
                <span>1.权益基本信息</span><br />
                权益名称、活动起止时间、权益兑换时间等<br /><br />
                <span>2.赠送用户范围</span><br />
                活动地域、渠道、门店、活动品牌、产业等<br /><br />
                <span>3.赠送方案</span><br />
                指定型号产品赠送积分、赠送礼品
                <!-- 、同时赠送积分和礼品等 -->
              </div>
              <a href="javascript:;" class="z-link" @click="newRight(1)">做好准备，开始配置</a>
            </div>
          </div>
        </div>
        <div class="right-line">
          <p class="rights-title">套购权益</p>
          <div class="rights-desc">
            <div class="right-img">
              <img src="../../assets/images/rightSmallType2.png" alt="" />
            </div>
            <p>
              成套购买产品所赠送权益配置，包括购买金额满赠、购买数量满赠、特定型号组合权益配置。可配置赠送积分、赠送礼品
              <!-- 、同时赠送积分和礼品 -->
            </p>
            <div class="m-hoverbox">
              <div class="m-txt01">准备好以下信息才能完成配置:</div>
              <div class="m-txt02">
                <span>1.权益基本信息</span><br />
                权益名称、活动起止时间、权益兑换时间等<br /><br />
                <span>2.赠送用户范围</span><br />
                活动地域、渠道、门店、活动品牌、产业等<br /><br />
                <span>3.赠送方案</span><br />
                购买金额满赠、购买数量满赠、特定型号组合送权益等
              </div>
              <a v-if="!isChian" href="javascript:;" class="z-link" @click="newRight(2)">做好准备，开始配置</a>
              <a
                v-if="isChian"
                href="javascript:;"
                class="z-link02"
                style="float: left; margin-left: 24px;"
                @click="newRight(2)"
                >独立配置</a
              >
              <a
                v-if="isChian"
                href="javascript:;"
                class="z-link02"
                style="float: right; margin-right: 24px;"
                @click="newRight(2, 2)"
                >批量配置</a
              >
            </div>
          </div>
        </div>
        <!-- <div class="right-line">
                    <p class="rights-title">台阶积分卡</p>
                    <div class="rights-desc">
                        <div class="right-img">
                            <img src="../../assets/images/rightSmallType3.png" alt="">
                        </div>
                        <p>购买金额到达指定台阶赠送积分权益</p>
                        <div class="m-hoverbox">
                            <div class="m-txt01">准备好以下信息才能完成配置:</div>
                            <div class="m-txt02"><span>1.权益基本信息</span><br />
                                权益名称、活动起止时间、权益兑换时间等<br /><br />
                                <span>2.赠送用户范围</span><br />
                                活动地域、渠道、门店、活动品牌、产业等<br /><br />
                                <span>3.赠送方案</span><br />
                                满指定金额赠送指定积分权益</div>
                            <a href="javascript:;" class="z-link" style="background: #bdbdbd;">做好准备，开始配置</a>
                        </div>
                    </div>
                </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      form: {},
      rules: {},
      isChian: false
    };
  },
  methods: {
    newRight(rightSmallType, go) {
      if (go == 2) {
        this.$router.push({
          path: '/rights/rightschinabaseinfo',
          query: { rightSmallType }
        });
      } else {
        this.$router.push({
          path: '/rights/rightsbaseinfo',
          query: { rightSmallType }
        });
      }
    },
    areaJudge() {
      const self = this;
      const data = '';
      this.requestRights.isChian(data).then((data) => {
        if (data && data != 'false') {
          self.isChian = true;
        } else {
          self.isChian = false;
        }
      });
    }
  },
  mounted() {
    this.areaJudge();
  }
};
</script>

<style scoped>
.rights-config-title {
  font-size: 24px;
  color: #666666;
  margin: 50px 0 70px;
}
.rights-config-guide {
  width: 750px;
  text-align: center;
  margin: auto;
}
.rights-config-guide > div > div {
  width: 247px;
  display: inline-block;
  vertical-align: top;
  height: 360px;
  border-right: 1px solid #ebebeb;
  cursor: pointer;
}
.rights-config-guide > div > div:last-child {
  border: 0;
}
.rights-title {
  font-size: 20px;
  color: #000000;
  font-weight: bold;
  margin-bottom: 30px;
}
.right-line {
  border-right: 1px solid #ebebeb;
  height: 350px;
}
.right-line:last-child {
  border-right: none;
}
.rights-desc {
  position: relative;
}
.rights-desc .right-img {
  display: table-cell;
  vertical-align: middle;
  height: 180px;
}
.rights-desc .m-hoverbox {
  width: 100%;
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
}
.right-line:hover .rights-desc .m-hoverbox {
  display: inline-block;
}
.rights-desc .m-txt01 {
  width: 100%;
  text-align: left;
  color: #ee5851;
  margin: 0 auto 20px;
  padding: 0 25px;
  box-sizing: border-box;
}
.rights-desc .m-txt02 {
  width: 100%;
  height: 190px;
  line-height: 18px;
  text-align: left;
  color: #333;
  font-size: 12px;
  margin: 0 auto 10px;
  padding: 0 25px;
  box-sizing: border-box;
}
.rights-desc .m-txt02 span {
  font-weight: bold;
  font-size: 14px;
}
.rights-desc p {
  text-align: left;
  padding: 0 25px;
  color: #666666;
}
.rights-desc .z-link {
  width: 150px;
  height: 32px;
  display: inline-block;
  margin: 20px auto 0;
  background: #45a0f8;
  border-radius: 2px;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  color: #fff;
}
.rights-desc .z-link02 {
  width: 90px;
  height: 32px;
  display: inline-block;
  margin: 20px auto 0;
  background: #45a0f8;
  border-radius: 2px;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  color: #fff;
}
</style>
