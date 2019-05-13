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
        <div class="m-exam" v-if="lpshow && giftType != '2'">
          还需要2步审核，权益活动才能正式上线，您可以在“ 我的权益 ”页面查看审核状态
        </div>
        <div class="m-exam" v-if="!lpshow && giftType == '2'">
          还需要1步审核，权益活动才能正式上线，您可以在“ 我的权益 ”页面查看审核状态
        </div>
        <!--<div v-if="!lpshow" class="m-exam">还需要1步审核，权益活动才能正式上线，您可以在“ 我的权益 ”页面查看审核状态</div>-->
        <ul v-if="lpshow" class="m-stepbox">
          <li>上级领导审核</li>
          <li>积分商城主管审核</li>
        </ul>
        <ul v-if="!lpshow && giftType == '2'" class="m-oneshen">
          <li>上级领导审核</li>
        </ul>
        <ul v-if="!lpshow && giftType != '2'" class="m-stepbox">
          <li>上级领导审核</li>
          <li>积分中心主管审核</li>
        </ul>
        <el-button type="primary" class="trs-btn" style="width:109px;margin-bottom:14px;" @click="toList"
          >已知晓</el-button
        >
      </div>
      <div class="vip-servicebox" v-if="lpshow">
        <div class="m-text01">为保证权益正常执行，请确认预算已转账到积分商城，商品已在积分商城上架。</div>
        <div class="m-text02">联系积分商城运营人员： 王福文 电话：18615320988</div>
      </div>
      <div class="vip-servicebox" v-if="!lpshow && giftType != '2'">
        <div class="m-text01">为保证权益正常执行，请确认预算已转账至积分中心</div>
        <div class="m-text02">联系积分中心负责人： 孟利利 电话：18661778875</div>
      </div>
      <div class="vip-servicebox" v-if="!lpshow && giftType == '2'">
        <div class="m-text01">为保证权益正常执行，请确认预算已转账至积分中心</div>
        <div class="m-text02">联系积分中心负责人： 孟利利 电话：18661778875</div>
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
      detailDialog: false,
      rejectDialog: false,
      detailInfo: {},
      textarea: '',
      templateType: '营销类',
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      list: '',
      lpshow: false,
      form: {
        rightsType: 0,
        rankUseIds: 0,
        status: 0
      },
      memberRank: [],
      giftType: ''
    };
  },
  filters: {
    status(val) {
      let status = '';
      switch (val) {
        case 1:
          status = '启用';
          break;
        case 2:
          status = '禁用';
          break;
        case -1:
          status = '已过期';
          break;
        default:
          status = '';
      }
      return status;
    }
  },
  methods: {
    filterChange() {
      this.listSearch();
    },
    getOrderRightsById() {
      const _this = this;
      const params = {
        id: this.$route.query.id
      };
      if (this.$route.query.type == 1) {
        this.requestRights.getRightsById(params).then((data) => {
          if (data) {
            _this.list = JSON.parse(data.scoreGiftConfig);
            for (let i = 0; i < _this.list.rightList.length; i++) {
              if (_this.list.rightList[i].giftList != undefined && _this.list.rightList[i].giftList != '') {
                _this.lpshow = true;
                return;
              }
            }
          }
        });
      } else {
        this.requestRights.getOrderRightsById(params).then((data) => {
          if (data) {
            _this.giftType = data.giftType;
            _this.list = JSON.parse(data.scoreGiftConfig);
            if (_this.list.rightList) {
              for (let i = 0; i < _this.list.rightList.length; i++) {
                if (_this.list.rightList[i].giftList != undefined && _this.list.rightList[i].giftList != '') {
                  _this.lpshow = true;
                  return;
                }
              }
            }
          }
        });
      }
    },
    // 跳转模板详情
    toDetail(id) {
      this.$router.push({
        path: '/rights/addright',
        query: { id }
      });
    },
    // 跳转列表页
    toList(id) {
      this.$router.push({
        path: '/rights/rightsactlist'
      });
    },
    // 模板删除
    deleteTpl(id) {
      const self = this;

      this.$confirm('您确定要删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.requestCare
            .update({
              id,
              status: -1
            })
            .then((data) => {
              self.listSearch();
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize
      };

      this.msgListLoading = true;
      this.requestRights.listCheckedOrderRights(data).then((data) => {
        self.msgListData = data;
        self.msgListLoading = false;
      });
    },
    handleSizeChange(pageSize) {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.pageSize = pageSize;
        this.listSearch();
      }
    },
    handleCurrentChange(pageNo) {
      if (!this.msgListLoading) {
        this.pageNo = pageNo;
        this.listSearch();
      }
    },
    reviewDetail(scope) {
      this.detailDialog = true;
      this.detailInfo = scope.row;
    }
  },
  mounted() {
    const _this = this;
    //    setTimeout(function(){
    //      _this.$router.push({
    //        path: "/strategy/rightsactlist",
    //      });
    //    },3000)
    _this.getOrderRightsById();
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
  height: 40px;
  line-height: 40px;
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
.m-oneshen {
  width: 100%;
  height: 40px;
  margin: 10px auto 12px;
  background-color: #ddf0ff;
}
.m-oneshen li {
  width: 100%;
  height: 40px;
  line-height: 40px;
  float: left;
  padding: 0 15px;
  text-align: center;
  font-size: 14px;
  color: #45a0f8;
}
</style>
<style>

.reject-dialog .el-dialog {
  width: 398px;
}
</style>
