<template>
  <div style="background: #eff4f8;height: 100%;">
    <div class="step-line">
      <el-steps v-if="fixNum == 1" :active="6" finish-status="success" align-center center>
        <el-step v-if="!isEdit" title="创建活动"></el-step>
        <el-step v-if="isEdit" title="修改活动"></el-step>
        <el-step title="选择会员"></el-step>
        <el-step title="选择沟通渠道"></el-step>
        <el-step title="选择通知客服"></el-step>
        <el-step title="配置多波次"></el-step>
        <el-step title="活动创建完成"></el-step>
      </el-steps>
      <el-steps v-if="fixNum == -1" :active="5" finish-status="success" align-center center>
        <el-step v-if="!isEdit" title="创建活动"></el-step>
        <el-step v-if="isEdit" title="修改活动"></el-step>
        <el-step title="选择会员"></el-step>
        <el-step title="选择沟通渠道"></el-step>
        <el-step title="选择通知客服"></el-step>
        <el-step title="活动创建完成"></el-step>
      </el-steps>
    </div>
    <div class="vip-content msg-template activity-flow" style="width:85%;float:left;padding:0">
      <div class="activity-added-msg">
        <h3><i class="el-icon-check"></i>活动创建成功，待管理员审核！</h3>
      </div>
    </div>
    <div style="width:15%;float:right" class="plhy-right">
      <div class="group">
        <a class="i1" @click="open(1)" style="cursor:pointer">内容运营</a>
        <a class="i2" @click="open(2)" style="cursor:pointer">策略运营</a>
        <a class="i3" @click="open(3)" style="cursor:pointer">客服运营</a>
        <a class="i4" @click="open(4)" style="cursor:pointer">数据运营</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false,
      fixNum: ''
    };
  },
  methods: {
    open(type) {
      const _this = this;
      switch (type) {
        case 1:
          _this.$router.push({
            path: '/communication/wechatlist'
          });
          break;
        case 2:
          _this.$router.push({
            path: '/strategy/level'
          });
          break;
        case 3:
          _this.$router.push({
            path: '/service/personnel'
          });
          break;
        case 4:
          _this.$router.push({
            path: '/report/operation'
          });
          break;
      }
    }
  },
  mounted() {
    this.isEdit = this.$route.query.id;
    this.fixNum = this.$route.query.fixNum;
  }
};
</script>

<style scoped>
.flow-col {
  margin: 20px;
}

.flow-node {
  background: #fff;
  margin: 0;
}

.flow-node > div {
  margin: 0;
}

.template-brand {
  margin: 0;
}

.flow-col > a {
  width: 118px;
  height: 38px;
  display: inline-block;
  background: #eef5fc;
  text-align: center;
  line-height: 38px;
  margin-right: 10px;
}

.flow-col > span {
  background: #f2f6fc;
}

.activity-flow,
.plhy-right {
  background: #eff4f8;
  height: 450px;
}

.plhy-right .group {
  background: #fff;
  height: 100%;
  margin-left: 20px;
}

.plhy-right .group > a {
  padding: 20px 0;
  margin: 0 20px;
  font-size: 16px;
  border-bottom: 1px solid #eaeaea;
  text-align: center;
  display: block;
}

.plhy-right .group > a:last-child {
  border-bottom: none;
}

.plhy-right .group > a::before {
  width: 100%;
  height: 45px;
  content: '';
  display: block;
  text-align: center;
}

.plhy-right .group > a.i1::before {
  background: url('../../assets/images/plxz-icon1.png') center no-repeat;
}

.plhy-right .group > a.i2::before {
  background: url('../../assets/images/plxz-icon2.png') center no-repeat;
}

.plhy-right .group > a.i3::before {
  background: url('../../assets/images/plxz-icon3.png') center no-repeat;
}

.plhy-right .group > a.i4::before {
  background: url('../../assets/images/plxz-icon4.png') center no-repeat;
}

.activity-added-msg {
  background: #fff;
  height: 100%;
  text-align: center;
  position: relative;
}
.activity-added-msg h3 {
  font-size: 32px;
  position: absolute;
  top: 50%;
  margin-top: -40px;
  width: 100%;
}
.activity-added-msg i {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background: #14cf65;
  color: #fff;
  font-size: 25px;
  line-height: 53px;
  margin-right: 15px;
}
</style>
