<template>
  <div class="rightsconfigrutionsix" v-loading="loading">
    <div class="rights-config-header-box">
      <div class="rights-config-header">
        <div class="header-title">
          <span>一站式调研配置</span>
        </div>
        <div class="rights-config-step" style="margin-left:35px">
          <div class="step-index">
            <span>1</span>
          </div>
          <div class="step-title">
            <span>选择发放场景</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:185px">
          <div class="step-index">
            <span>2</span>
          </div>
          <div class="step-title">
            <span>问卷配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:335px">
          <div class="step-index">
            <span>3</span>
          </div>
          <div class="step-title">
            <span>直销员和用户筛选</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:485px">
          <div class="step-index">
            <span>4</span>
          </div>
          <div class="step-title">
            <span>详情配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:635px">
          <div class="step-index">
            <span>5</span>
          </div>
          <div class="step-title">
            <span>奖励配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step setted" style="margin-left:785px">
          <div class="step-index">
            <span>6</span>
          </div>
          <div class="step-title">
            <span>配置成功</span>
          </div>
          <div class="step-bg"></div>
        </div>
      </div>
    </div>

    <div class="success">恭喜！此权益已配置成功！</div>
    <div class="successBut">
      <el-button type="primary" @click="successClick">返回调研列表</el-button>
      <el-button type="primary" @click="review" :disabled="disable">提交审核</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';

export default {
  data() {
    return {
      id: 0,
      loading: false,
      disable: false
    };
  },
  methods: {
    successClick() {
      this.$router.push('/dbOperate/survey');
    },
    review() {
      const _this = this;
      this.$confirm('将推送到积分商城审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        _this.loading = true;
        axios
          .get(`${_this.apiUrl}vipcenter/researchAudit/pushOneStopConfig`, {
            params: {
              id: _this.id
            }
          })
          .then((response) => {
            if (response.data.isSuccess) {
              _this.loading = false;
              _this.disable = true;
              _this.$message({
                type: 'success',
                message: response.data.msg
              });
            } else {
              _this.loading = false;
              _this.$message({
                type: 'error',
                message: response.data.msg
              });
            }
          })
          .catch((error) => {
            _this.loading = false;
            console.log(error);
          });
      });
    }
  },
  created() {
    this.id = this.$route.query.id;
  }
};
</script>

<style scoped>
.rightsconfigrutionsix {
  padding: 20px;
}
.success {
  font-size: 30px;
  color: red;
  text-align: center;
  margin-top: 50px;
}
.successBut {
  margin-left: 56%;
  margin-top: 50px;
  transform: translateX(-50%);
  width: 450px;
}
.rightsconfigrutionsix .rights-config-step .step-title {
  width: 123px;
  background: #e2e2e2;
  z-index: 1;
  margin-top: 6px;
  color: #252525;
  margin-left: 8px;
}
.rightsconfigrutionsix .rights-config-step .step-index {
  width: 30px;
  background: #cecece;
  font-size: 12px;
  color: #252525;
  font-weight: bold;
  z-index: 2;
  text-align: center;
  line-height: 30px;
}
.rightsconfigrutionsix .rights-config-header {
  transform: skewX(-45deg);
  background: #e0f0ff;
  /*width: 1000px;*/
  width: 1133px;
  /*margin-left: -45px;*/
}
.rightsconfigrutionsix .rights-config-header .step-bg {
  width: 74px;
  margin-top: 16px;
  background: #fff;
  margin-left: 65px;
}
.rightsconfigrutionsix .vip-head-tool {
  margin-top: 30px;
}
.rightsconfigrutionsix .rights-config-step .step-title span {
  transform: skewX(45deg);
  font-size: 10px;
  display: block;
  line-height: 30px;
  text-align: center;
  padding-left: 20px;
}
.rightsconfigrutionsix .rights-config-step.setted .step-index {
  background: #196acf;
  color: #fff;
}
.rightsconfigrutionsix .rights-config-step.setted .step-title {
  background: #45a0f8;
  color: #fff;
  margin-left: 10px;
  width: 123px;
}
.rightsconfigrutionsix .rights-config-step .step-index span {
  font-size: 12px;
}
</style>
