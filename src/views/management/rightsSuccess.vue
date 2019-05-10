<template>
  <div class="vip-content">
    <div class="vip-configbox">
      <div class="vip-statebox">
        <div class="m-titbox">
          <i><img src="../../assets/images/ico-configover.png" alt=""/></i>
          <div class="m-txtbox">
            <div class="m-title">权益配置完成</div>
            <div class="m-text">当前状态：审核中</div>
          </div>
        </div>
        <div class="m-exam">还需要1步审核，权益活动才能正式上线，您可以在“ 直销员权益发放 ”页面查看审核状态</div>
        <div class="m-stepbox01">
          <p>上级领导审核</p>
          <p>审核人： {{ name }} 电话：{{ tel }}</p>
        </div>
        <el-button type="primary" class="trs-btn" style="width:109px;margin-bottom:14px;" @click="toList"
          >已知晓</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import gUtils from '../../utils/gUtils.js';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      name: '',
      tel: ''
    };
  },
  methods: {
    toList() {
      this.$router.push({
        path: '/management/rightsdirectlist'
      });
    },
    getAuditUserInfo() {
      const _this = this;
      this.requestManagement.getAuditUserInfo({ configId: this.$route.query.id }).then((data) => {
        if (data.isSuccess) {
          _this.name = data.data.nextNodeUserName;
          _this.tel = data.data.nextNodeUserMobile;
        }
      });
    }
  },
  mounted() {
    this.getAuditUserInfo();
  }
};
</script>
<style scoped>
.vip-content {
  padding-top: 15px;
}
.vip-configbox {
  width: 645px;
  margin: 35px auto 0;
}
.vip-statebox {
  width: 100%;
  display: inline-block;
  border: 1px solid #ccc;
  text-align: center;
}
.vip-statebox .m-titbox {
  width: auto;
  display: inline-block;
  margin: 75px auto 0;
}
.vip-statebox .m-titbox i {
  width: 46px;
  height: 46px;
  display: inline-block;
  float: left;
  margin-right: 20px;
}
.vip-statebox .m-titbox i img {
  width: 100%;
  height: 100%;
  display: inline-block;
  vertical-align: top;
}
.vip-statebox .m-titbox .m-txtbox {
  width: 180px;
  display: inline-block;
  float: left;
}
.vip-statebox .m-titbox .m-txtbox .m-title {
  width: auto;
  display: inline-block;
  font-size: 28px;
  color: #333;
}
.vip-statebox .m-titbox .m-txtbox .m-text {
  width: auto;
  display: inline-block;
  font-size: 16px;
  color: #333;
  text-align: left;
}
.vip-statebox .m-exam {
  width: 100%;
  text-align: center;
  margin: 60px auto 0;
  font-size: 14px;
  color: #999;
}
.vip-statebox .m-stepbox {
  width: 100%;
  height: 40px;
  background: url('../../assets/images/bg-rightstem01.png') no-repeat;
  margin: 10px auto 12px;
}
.vip-statebox .m-stepbox li {
  width: 50%;
  height: 40px;
  line-height: 40px;
  float: left;
  padding: 0 15px;
  text-align: center;
  font-size: 14px;
  color: #45a0f8;
}
.vip-statebox .m-stepbox01 {
  width: 100%;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: #45a0f8;
  background: #ddf0ff;
  margin: 10px auto 12px;
}
.vip-servicebox {
  width: 100%;
  display: inline-block;
  border: 1px solid #ccc;
  text-align: center;
  background: #fff6f6;
  margin-top: 7px;
}
.vip-servicebox .m-text01 {
  width: 80%;
  display: inline-block;
  margin: 25px auto 0;
  text-align: center;
  font-size: 14px;
  color: #ee5851;
}
.vip-servicebox .m-text02 {
  width: 80%;
  display: inline-block;
  margin: 10px auto 25px;
  text-align: center;
  font-size: 14px;
  color: #333;
}
</style>
<style>
.detail-dialog .el-dialog__header p {
  padding: 0;
}
.detail-dialog .el-dialog {
  width: 820px;
}
.detail-dialog .el-dialog__body {
  padding-top: 4px;
}
.el-table th,
.el-table th div {
  background: #e0f0ff;
  font-weight: normal;
}
.el-table__body-wrapper tr:nth-child(odd) {
}
.el-table__body-wrapper tr:nth-child(even) {
  background: #f6f6f6;
}

.reject-dialog .el-dialog {
  width: 398px;
}
</style>
