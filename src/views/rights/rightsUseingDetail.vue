<template>
  <div class="vip-content">
    <div style="position: relative">
      <div class="rights-config-header">
        <div class="header-title">
          <span>权益使用详情</span>
        </div>
      </div>
      <p style="position: absolute;right: 0;top: 0;height: 50px;display: flex;align-items: center">
        <el-button type="primary" @click="dcexcel">导出excel</el-button>
        <el-button @click="godetails" type="text" style="margin-right: 10px;margin-left: 20px;">订单详情</el-button>
      </p>
    </div>
    <div class="vip-head-tool"></div>

    <div class="detail_form">
      <el-table :data="rightDetailData.data" border>
        <el-table-column prop="name" label="小微" width="100"> </el-table-column>
        <el-table-column v-for="(thead, theadIndex) in rightDetailData.thead" :label="thead">
          <el-table-column label="已分配数量" width="100">
            <template scope="scope">
              {{ scope.row.config[theadIndex].allocated }}
            </template>
          </el-table-column>
          <el-table-column label="已消耗数量" width="100">
            <template scope="scope">
              {{ scope.row.config[theadIndex].consumed }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="费用（元）">
          <el-table-column prop="allocated" label="已分配费用（元）" width="135"> </el-table-column>
          <el-table-column prop="consumed" label="已消耗费用（元）" width="135"> </el-table-column>
          <el-table-column prop="surplus" label="剩余费用（元）" width="120"> </el-table-column>
        </el-table-column>

        <el-table-column label="详情">
          <template scope="scope">
            <a href="javascript:;" v-if="scope.row.name != '总计'" class="color-link" @click="qyReviewDetail(scope)"
              >查看详情</a
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 权益详情弹层 -->
    <el-dialog
      class="detail-dialog trs-dialog"
      title=""
      :visible.sync="qyDialog"
      :size="'large'"
      :modal-append-to-body="false"
    >
      <div class="config-item">
        <div class="m-border02">
          <div
            class="config-item-1-2 gift"
            v-bind:class="{
              giftHeight1: giftLength == 1,
              giftHeight2: giftLength == 2,
              giftHeight3: giftLength == 3,
              giftHeight4: giftLength == 4,
              giftHeight5: giftLength == 5
            }"
          >
            <div style="height:auto;width:780px;padding: 15px 10px;" v-show="!errMsg">
              <div v-for="gift in qylist" style="padding:0">
                <img src="../../assets/images/score.jpg" alt="" />
                <div>
                  <p
                    style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"
                    :title="gift.buyAmount"
                  >
                    满{{ gift.buyAmount }}元赠
                  </p>
                  <p class="gift-item"><i></i>{{ gift.score }}（总数{{ gift.num }}份）</p>
                </div>
                <el-table :data="gift.channelList" style="width: 760px;margin-top:5px">
                  <el-table-column prop="channelName" label="活动渠道"> </el-table-column>
                  <el-table-column prop="channelConfigNum" label="权益配置总数"> </el-table-column>
                  <el-table-column prop="userGainNum" label="已发出数量"> </el-table-column>
                  <el-table-column prop="unActivatedNum" label="未激活数量"> </el-table-column>
                  <el-table-column prop="activatedNum" label="激活未领取数量" width="120"> </el-table-column>
                  <el-table-column prop="exchangeNum" label="已领取数量"> </el-table-column>
                  <el-table-column prop="expiredNum" label="失效数量"> </el-table-column>
                </el-table>
              </div>
            </div>
            <div style="width: 780px;text-align: center;line-height:90px">
              {{ errMsg }}
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
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
      xiaoweiId: '',
      dataTab: 'first',
      isChian: false,
      type: '',
      detailDialog: false,
      detailChinaDialog: false,
      budget: [], // 小微预算明细
      subBudget: [], // 小微预算明细
      subXwBudget: [], // 小微预算明细
      detailRights: false,
      detailSubRights: false,
      detailXwSubRights: false,
      detailInfo: {},
      whereCondetion: '',
      msgListData: [],
      msgChinaListData: [],
      chinaAreaMsgListData: [],
      pageNo: 1,
      pageNoChina: 1,
      msgListLoading: false,
      pageSize: 10,
      pageSizeChina: 10,
      statusCount: {},
      chinaStatusCount: {},
      xwdisabled: true,
      qddisabled: true,
      mddisabled: true,
      cydisabled: true,
      cpname: true,
      modelNo: '',
      buyAm: true,
      giftLength: 1,
      remainAmountLoading: true,
      remainAmount: [
        {
          remainHaier: ''
        },
        {
          remainCasarte: ''
        }
      ],
      qyDialog: false,
      qylist: [],
      errMsg: '',
      rightDetailData: {}
    };
  },
  filters: {
    status(val) {
      let status = '';
      switch (val) {
        case 1:
          status = '存草稿';
          break;
        case 2:
          status = '审核中';
          break;
        case 3:
          status = '审核中';
          break;
        case 4:
          status = '审核中';
          break;
        case 5:
          status = '审核中';
          break;
        case 6:
          status = '已驳回';
          break;
        case 7:
          status = '待执行';
          break;
        case 8:
          status = '进行中';
          break;
        case 9:
          status = '已结束';
          break;
        case 10:
          status = '暂停';
          break;
        default:
          status = '';
      }
      return status;
    },
    dateFilter(val) {
      if (val) {
        val = val.split(' ')[0];
        return val;
      }
    },
    nameFilter(val) {
      if (val) {
        if (val.length > 9) {
          val = `${val.substring(0, 9)}...`;
        }
      }
      return val;
    },
    endTimeFilter(val) {
      if (val && val.indexOf('2099') == 0) {
        val = '不限结束时间';
      }
      return val;
    }
  },
  created(e) {
    const _this = this;
    if (
      this.$route.query.xiaoweiName.indexOf(',') != -1
      || this.$route.query.xiaoweiName == 'null'
      || this.$route.query.xiaoweiName == '所有小微'
    ) {
      this.xiaoweiId = '';
    } else {
      gUtils.getXWname.forEach((el) => {
        if (el.value == _this.$route.query.xiaoweiName) {
          _this.xiaoweiId = el.id;
        }
      });
    }
  },
  methods: {
    godetails() {
      window.open(
        `./#/report/sellersorderreport?xiaoweiId=${this.xiaoweiId}&rightName=${this.$route.query.rightName}`
      );
    },
    // 查看详细信息
    reviewDetail(scope) {
      this.detailDialog = true;
      this.cpname = true;
      this.buyAm = true;
      if (typeof scope.row.auditPics === 'string') {
        scope.row.auditPics = scope.row.auditPics.split('|');
      }
      scope.row.salesAmount = scope.row.salesAmount || 0;

      if (typeof scope.row.scoreGiftConfig === 'string') {
        scope.row.scoreGiftConfig = JSON.parse(scope.row.scoreGiftConfig);
      }

      this.detailInfo = scope.row;
      // this.detailInfo.costAmount =  this.detailInfo.costAmount || 0
      if (this.detailInfo.costAmount) {
        this.detailInfo.costAmount = this.detailInfo.costAmount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') || 0;
      } else {
        this.detailInfo.costAmount = 0;
      }

      if (this.detailInfo.rightSmallType == 2) {
        if (this.detailInfo.scoreGiftConfig != null && this.detailInfo.scoreGiftConfig.type == 3) {
          this.modelNo = '';
          this.cpname = false;
          for (let c = 0; c < this.detailInfo.scoreGiftConfig.productList.length; c++) {
            this.modelNo += `${this.detailInfo.scoreGiftConfig.productList[c].modelNo},`;
          }
          this.modelNo = this.modelNo.substring(0, this.modelNo.length - 1);
        }
        if (this.detailInfo.scoreGiftConfig != null && this.detailInfo.scoreGiftConfig.type == 2) {
          //          for( let a=0; a<this.detailInfo.scoreGiftConfig.rightList.length; a++){
          //            if(this.detailInfo.scoreGiftConfig.rightList[a].scoreList == undefined){
          //              console.log(123)
          //              this.detailInfo.scoreGiftConfig.rightList.splice(a,1)
          //              //delete this.detailInfo.scoreGiftConfig.rightList[a];
          //            }
          //          }
          //          console.log(this.detailInfo.scoreGiftConfig.rightList)
          this.buyAm = false;
        }
      }

      this.detailInfo.startTime = this.detailInfo.startTime.replace(/-/g, '/');
      this.detailInfo.endTime = this.detailInfo.endTime.replace(/-/g, '/');
      this.detailInfo.exchangeStartTime = this.detailInfo.exchangeStartTime.replace(/-/g, '/');
      this.detailInfo.exchangeEndTime = this.detailInfo.exchangeEndTime.replace(/-/g, '/');

      if (this.detailInfo.xiaoweiName != null) {
        this.xwdisabled = false;
      }
      if (this.detailInfo.channelName != null) {
        this.qddisabled = false;
      }
      if (this.detailInfo.shopName != null) {
        this.mddisabled = false;
      }
      if (this.detailInfo.productCategoryName != null) {
        this.cydisabled = false;
      }

      this.giftLength = scope.row.scoreGiftConfig && scope.row.scoreGiftConfig.rightList
        ? scope.row.scoreGiftConfig.rightList.length
        : 1;
    },
    // 查看详细信息--中国大区
    reviewChinaDetail(scope) {
      this.detailChinaDialog = true;
      this.cpname = true;
      this.buyAm = true;
      if (typeof scope.row.auditPics === 'string') {
        scope.row.auditPics = scope.row.auditPics.split('|');
      }
      scope.row.salesAmount = scope.row.salesAmount || 0;

      if (typeof scope.row.scoreGiftConfig === 'string') {
        scope.row.scoreGiftConfig = JSON.parse(scope.row.scoreGiftConfig);
      }

      this.detailInfo = scope.row;
      // this.detailInfo.costAmount =  this.detailInfo.costAmount || 0
      this.detailInfo.costAmount = this.detailInfo.costAmount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') || 0;
      if (this.detailInfo.rightSmallType == 2) {
        if (this.detailInfo.scoreGiftConfig != null && this.detailInfo.scoreGiftConfig.type == 3) {
          this.modelNo = '';
          this.cpname = false;
          for (let c = 0; c < this.detailInfo.scoreGiftConfig.productList.length; c++) {
            this.modelNo += `${this.detailInfo.scoreGiftConfig.productList[c].modelNo},`;
          }
          this.modelNo = this.modelNo.substring(0, this.modelNo.length - 1);
        }
        if (this.detailInfo.scoreGiftConfig != null && this.detailInfo.scoreGiftConfig.type == 2) {
          //          for( let a=0; a<this.detailInfo.scoreGiftConfig.rightList.length; a++){
          //            if(this.detailInfo.scoreGiftConfig.rightList[a].scoreList == undefined){
          //              console.log(123)
          //              this.detailInfo.scoreGiftConfig.rightList.splice(a,1)
          //              //delete this.detailInfo.scoreGiftConfig.rightList[a];
          //            }
          //          }
          //          console.log(this.detailInfo.scoreGiftConfig.rightList)
          this.buyAm = false;
        }
      }

      this.detailInfo.startTime = this.detailInfo.startTime.replace(/-/g, '/');
      this.detailInfo.endTime = this.detailInfo.endTime.replace(/-/g, '/');
      this.detailInfo.exchangeStartTime = this.detailInfo.exchangeStartTime.replace(/-/g, '/');
      this.detailInfo.exchangeEndTime = this.detailInfo.exchangeEndTime.replace(/-/g, '/');

      if (this.detailInfo.xiaoweiName != null) {
        this.xwdisabled = false;
      }
      if (this.detailInfo.channelName != null) {
        this.qddisabled = false;
      }
      if (this.detailInfo.shopName != null) {
        this.mddisabled = false;
      }
      if (this.detailInfo.productCategoryName != null) {
        this.cydisabled = false;
      }

      this.giftLength = scope.row.scoreGiftConfig && scope.row.scoreGiftConfig.rightList
        ? scope.row.scoreGiftConfig.rightList.length
        : 1;
    },
    // 暂停活动
    pause(id) {
      const self = this;
      const data = {
        id
      };
      this.requestRights.pauseOrderRights(data).then((data) => {
        self.$message({
          type: 'success',
          message: '活动已暂停!'
        });
        self.listSearch();
      });
    },
    // 重新开启活动
    start(id) {
      const self = this;
      const data = {
        id
      };
      this.requestRights.startOrderRights(data).then((data) => {
        self.$message({
          type: 'success',
          message: '活动已开启!'
        });
        self.listSearch();
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
          const data = {
            id
          };
          this.requestRights.deleteOrderRights(data).then((data) => {
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

    // // 模板删除--中国大区
    // deleteChinaTpl: function (id) {
    //     let self = this;

    //     this.$confirm("您确定要删除吗？", "删除", {
    //             confirmButtonText: "确定",
    //             cancelButtonText: "取消",
    //             type: "warning"
    //         })
    //         .then(() => {
    //             let data = {
    //                 id: id,
    //             };
    //             this.requestRights.deleteRightsById(data).then(function (data) {
    //                 self.$message({
    //                     type: "success",
    //                     message: "删除成功!"
    //                 });
    //                 self.listChinaSearch();
    //             });
    //         }).catch(() => {
    //             this.$message({
    //                 type: "info",
    //                 message: "已取消删除"
    //             });
    //         });
    // },

    searchByStatus(type) {
      this.type = type;
      this.pageNo = 1;
      this.listSearch();
    },
    searchChinaByStatus(type) {
      this.type = type;
      this.pageNoChina = 1;
      this.listChinaSearch();
    },
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    handleIconChinaClick() {
      this.pageNoChina = 1;
      this.listChinaSearch();
    },
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        type: self.type,
        whereCondition: self.whereCondetion
      };

      this.msgListLoading = true;
      this.requestRights.listOrderRights(data).then((data) => {
        self.msgListData = data;
        for (let i = 0; i < self.msgListData.entities.length; i++) {
          self.msgListData.entities[i].budgetAmount = self.msgListData.entities[i].budgetAmount
            .toString()
            .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
          if (self.msgListData.entities[i].scoreGiftConfig) {
            self.msgListData.entities[i].scoreGiftConfig = JSON.parse(self.msgListData.entities[i].scoreGiftConfig);
          }
        }
        self.msgListLoading = false;
      });

      this.getStatusCount();
    },
    // 中国大区
    listChinaSearch() {
      const self = this;
      const data = {
        pageNo: self.pageNoChina,
        pageSize: self.pageSizeChina,
        type: self.type,
        whereCondition: self.whereCondetion
      };

      this.msgListLoading = true;
      this.requestRights.pageListRights(data).then((data) => {
        self.msgChinaListData = data;
        for (let i = 0; i < self.msgChinaListData.entities.length; i++) {
          self.msgChinaListData.entities[i].budgetAmount = self.msgChinaListData.entities[i].budgetAmount
            .toString()
            .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
          if (self.msgChinaListData.entities[i].scoreGiftConfig) {
            self.msgChinaListData.entities[i].scoreGiftConfig = JSON.parse(
              self.msgChinaListData.entities[i].scoreGiftConfig
            );
          }
        }
        self.msgListLoading = false;
      });

      this.getChinaStatusCount();
    },
    getStatusCount() {
      const self = this;
      this.requestRights.getStatusCount().then((data) => {
        if (data) {
          self.statusCount = data;
        }
      });
    },
    // 中国大区getStatusCount
    getChinaStatusCount() {
      const self = this;
      // POST /ChinaRegionRightsController/getCount
      this.requestRights.getCount().then((data) => {
        if (data) {
          self.chinaStatusCount = data;
        }
      });
    },
    typeChange() {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.listSearch();
      }
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
    handleChinaSizeChange(pageSize) {
      if (!this.msgListLoading) {
        this.pageNoChina = 1;
        this.pageSizeChina = pageSize;
        this.listChinaSearch();
      }
    },
    handleChinaCurrentChange(pageNo) {
      if (!this.msgListLoading) {
        this.pageNoChina = pageNo;
        this.listChinaSearch();
      }
    },
    getRemainAmount() {
      const self = this;
      this.requestRights.getRemainAmount().then((data) => {
        if (data) {
          self.remainAmountLoading = false;
          const keyHaier = '海尔';
          self.remainAmount.remainHaier = data[keyHaier];
          if (self.remainAmount.remainHaier == null) {
            self.remainAmount.remainHaier = '';
          }
          const keyCasarte = '卡萨帝';
          self.remainAmount.remainCasarte = data[keyCasarte];
          if (self.remainAmount.remainCasarte == null) {
            self.remainAmount.remainCasarte = '';
          }
        } else {
          self.remainAmountLoading = false;
        }
      });
    },
    // 中国大区判断
    areaJudge() {
      const self = this;
      const data = '';
      this.requestRights.isChian(data).then((data) => {
        if (data) {
          if (data && data != 'false') {
            self.isChian = true;
          } else {
            self.isChian = false;
          }
        }
      });
    },
    // 中国区查看详情
    detail(id) {
      const _this = this;
      const params = {
        id
      };
      this.requestRights.getChinaDetailById(params).then((data) => {
        if (data.isSuccess) {
          _this.budget = data.data;
        }
      });
      this.detailRights = true;
      this.detailChinaDialog = false;
    },
    giftDetail(ele, id) {
      const self = this;
      const params = {
        rightsId: id,
        amountCount: ele
      };
      this.requestRights.getScoreNum(params).then((data) => {
        if (data.isSuccess) {
          self.subBudget = data.data;
        }
      });
      this.detailSubRights = true;
      this.detailChinaDialog = false;
    },
    giveUpDetail() {
      this.detailRights = false;
      this.detailChinaDialog = true;
    },
    giveUpSubDetail() {
      this.detailSubRights = false;
      this.detailChinaDialog = true;
    },
    // 小微详细弹层
    giftXwDetail(ele, id) {
      const self = this;
      const params = {
        rightsId: id,
        amountCount: ele
      };
      this.requestRights.getXwScoreNum(params).then((data) => {
        if (data.isSuccess) {
          self.subXwBudget = data.data;
        }
      });
      this.detailXwSubRights = true;
      this.detailDialog = false;
    },
    giveUpXwSubDetail() {
      this.detailXwSubRights = false;
      this.detailDialog = true;
    },
    qyReviewDetail(scope) {
      const _this = this;
      _this.qylist = [];
      _this.errMsg = '';
      _this.qyDialog = true;
      const params = {
        id: scope.row.id
      };
      _this.requestStrategy.getStatisticsInfoByRightId(params).then((data) => {
        if (data.isSuccess) {
          _this.qylist = data.data;
        } else {
          _this.errMsg = data.msg;
        }
      });
    },
    getChinaRegionRightsByChinaRightId(id) {
      const _this = this;
      const params = {
        id
      };

      this.requestStrategy.getChinaRegionRightsByChinaRightId(params).then((data) => {
        if (data) {
          _this.rightDetailData = data;
        }
      });
    },
    dcexcel() {
      const _this = this;
      const params = {
        id: this.$route.query.id
      };
      this.requestRights.exportChinaDetails(params).then((data) => {
        if (data.isSuccess) {
          window.location.href = data.data.showPath;
        }
      });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getChinaRegionRightsByChinaRightId(this.$route.query.id);
    }
    // if (this.$route.query.type) {
    //     this.type = this.$route.query.type
    // }
    // this.listSearch();
    // this.getRemainAmount();
    // // this.areaJudge();
    // this.listChinaSearch();
  }
};
</script>
<style scoped>
.vip-content {
  padding-top: 15px;
}

.vip-head-tool {
  margin: 30px 0 10px;
  text-align: center;
}

.rights-config-header {
  background: initial;
}

.el-table {
  width: 1090px;
  margin: auto;
  text-align: center;
}

.el-pagination {
  text-align: right;
  width: 1090px;
  margin: 15px auto 0;
  padding: 0;
}

.m-border {
  border: 1px solid #cccccc;
}

.m-border-r {
  border-right: 2px solid #cccccc;
}

.m-border02 {
  border: 1px solid #cccccc;
  margin-top: 40px;
}

.config-item-1-2 .m-tit {
  position: absolute;
  left: 0;
  top: -50px;
}

.config-item-1-2 label {
  display: inline-block;
  line-height: 25px;
}

.config-item-1-2 label p {
  display: inline-block;
}

.config-item-1-2 label span {
  display: inline-block;
  float: left;
  width: 135px;
  text-align: right;
  font-weight: bold;
}

.config-item-1-2 label p {
  float: left;
  width: 240px;
}

.config-item-1-2:last-child label span {
  width: 90px;
}

.config-item-1-2 img {
  width: 58px;
  height: 58px;
  border: 1px solid #cccccc;
  display: inline-block;
  vertical-align: top;
}

.config-item-1-2 div div {
  display: inline-block;
  padding: 2px 0;
}

.config-item-1-2 div div p {
  line-height: 18px;
}

.config-item-1-2.gift p {
  font-weight: bold;
}

.config-item-1-2.gift > div,
.config-item-1-2.report > div {
  padding: 15px 20px;
}

/*.config-item-1-2.giftHeight1>div{height: 124px;}*/

.config-item-1-2.giftHeight2 > div {
  height: 186px;
}

.config-item-1-2.giftHeight3 > div {
  height: 248px;
}

.config-item-1-2.giftHeight4 > div {
  height: 310px;
}

.config-item-1-2.giftHeight5 > div {
  height: 372px;
}

.config-item-1-2.gift > div > p {
  margin-bottom: 10px;
}

.config-item-1-2.gift img {
  margin-right: 12px;
}

.gift-item {
  color: #ee5851;
  font-weight: normal !important;
}

.config-item-1-2.report > div {
  padding: 30px 20px;
}

.config-item-1-2.report img {
  margin: 0 3px;
}

.config-item-1-2.gift > p,
.config-item-1-2.report > p {
  margin-top: 20px;
}

.ico-exam {
  width: 16px;
  height: 16px;
  display: inline-block;
  float: left;
}

.ico-exam img {
  vertical-align: -2px;
}

.bh-color {
  color: #f3918d;
}

.bh-boxbg {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.bh-boxbg .m-bhtext {
  width: 100%;
  padding: 5px;
  text-align: left;
}

.bh-boxbg .m-bhtext span {
  color: #ee5851;
  font-size: 14px;
  font-weight: bold;
}

.bh-boxbg .m-bgname {
  width: auto;
  display: inline-block;
  float: right;
  padding: 0 5px 5px;
}

.config-item-1-2 label span.color-red {
  color: #ee5851;
  font-weight: normal;
  display: inline;
}

.gift-item i {
  width: 12px;
  height: 14px;
  display: inline-block;
  margin-right: 5px;
  background: url('../../assets/images/ico-gift.png') no-repeat;
}

.m-txtomit {
  width: 240px;
  overflow: hidden;
  height: 24px;
  text-overflow: ellipsis;
  line-height: 24px;
  white-space: nowrap;
}

.el-tabs {
  width: 1090px;
  margin: auto;
  text-align: center;
}

.tx_left {
  text-align: left !important;
}
</style>
<style>
.el-table th div {
  background: #e0f0ff;
  font-weight: normal;
}

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

.el-tooltip__popper {
  max-width: 600px;
}

.el-dialog__body .config-item .el-table__body-wrapper {
  overflow-x: auto;
}

.el-table th > .cell {
  text-align: center;
}

.detail_form .el-table__row:last-child {
  color: red;
  font-weight: bold;
}
</style>
