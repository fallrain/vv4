<template>
  <div class="vip-content sellers">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>订单详情
        <el-button style="float: right;" type="primary" @click="excel">导出excel</el-button>
      </p>
      <div class="clear"></div>
    </div>
    <el-row>
      <el-col :span="8">
        <span class="leftname">权益活动：</span>
        <el-autocomplete
          style="width: 60%;"
          :fetch-suggestions="rightsList"
          :disabled="rightdis"
          :props="{ value: 'rightName', label: 'rightName' }"
          @select="rightsSelect"
          v-model="input.rightName"
          placeholder="请输入权益活动"
        ></el-autocomplete>
      </el-col>
      <el-col :span="8">
        <span class="leftname">订单时间：</span>
        <el-date-picker
          style="width: 60%;"
          v-model="orderTime"
          type="datetimerange"
          placeholder="选择订单时间范围"
          :picker-options="pickerOptions"
          @change="timeChange"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="8">
        <span class="leftname">小微名称：</span>
        <el-select
          style="width: 60%;"
          v-model="input.xiaoweiId"
          :disabled="xiaoweidis"
          placeholder="请选择小微名称"
          @change="
            shopdis = false;
            input.shopName = '';
          "
        >
          <el-option v-for="item in xiaoweioptions" :key="item.id" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col :span="8">
        <span class="leftname">渠道名称：</span>
        <el-select
          style="width: 60%;"
          v-model="input.channelName"
          placeholder="请选择渠道名称"
          @change="
            shopdis = false;
            input.shopName = '';
          "
        >
          <el-option v-for="item in channeloptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <span class="leftname">门店名称：</span>
        <el-autocomplete
          style="width: 60%;"
          :fetch-suggestions="shopList"
          :disabled="shopdis"
          :props="{ value: 'shopName', label: 'shopName' }"
          v-model="input.shopName"
          placeholder="请输入门店名称"
        ></el-autocomplete>
      </el-col>
      <el-col :span="8">
        <span class="leftname">直销员工号：</span>
        <el-input style="width: 60%;" v-model="input.ptId" placeholder="请输入直销员工号"></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col :span="8">
        <span class="leftname">直销员姓名：</span>
        <el-input style="width: 60%;" v-model="input.ptName" placeholder="请输入直销员姓名"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="leftname">礼品名称：</span>
        <el-autocomplete
          style="width: 60%;"
          :disabled="giftdisabled"
          :fetch-suggestions="giftList"
          @select="giftSelect"
          v-model="input.giftName"
          :props="{ value: 'productName', label: 'productName' }"
          placeholder="请输入礼品名称"
        ></el-autocomplete>
      </el-col>
      <el-col :span="8">
        <span class="leftname">权益状态：</span>
        <el-select style="width: 60%;" v-model="input.status" placeholder="请选择权益状态">
          <el-option v-for="item in rightStateoptions" :key="item.id" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col :span="8">
        <span class="leftname">配置人：</span>
        <el-select style="width: 60%;" v-model="input.crUserId" placeholder="请选择配置人">
          <el-option
            v-for="item in allocators"
            :key="item.crUserId"
            :label="item.crUserName"
            :value="item.crUserId"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="8" style="float: left;">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="getquery">查询</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;"> </el-row>
    <div style="margin-top: 15px;">
      <template>
        <el-table v-loading="loading" border :data="tableData" stripe style="width: 100%;text-align: center;">
          <el-table-column prop="rightName" label="活动名称" width="180"> </el-table-column>
          <el-table-column prop="orderId" label="订单号" width="180"> </el-table-column>
          <el-table-column prop="orderTime" label="订单时间" width="160"> </el-table-column>
          <el-table-column prop="bccprice" label="订单金额" width="140" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="userName" label="顾客姓名" width="90"> </el-table-column>
          <el-table-column prop="userNumber" label="顾客手机号" width="120"> </el-table-column>
          <el-table-column prop="userAddress" label="顾客配送地址" width="160"> </el-table-column>
          <el-table-column prop="ptId" label="直销员工号" :show-overflow-tooltip="true" width="130"> </el-table-column>
          <el-table-column prop="ptName" label="直销员姓名" width="100"> </el-table-column>
          <el-table-column prop="ptNumber" label="直销员手机号" width="120"> </el-table-column>
          <el-table-column prop="xiaoweiName" label="小微名" width="100"> </el-table-column>
          <el-table-column prop="channelName" label="渠道名" width="150"> </el-table-column>
          <el-table-column prop="shopName" label="门店名" width="100"> </el-table-column>
          <el-table-column prop="rightInfo" label="权益信息" width="100"> </el-table-column>
          <el-table-column prop="rightState" label="权益状态" width="100"> </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template scope="scope">
              <el-button @click="view(scope.row.orderId)" type="text" size="small">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog title="详情" :visible.sync="dialogVisible" size="100" :modal-append-to-body="false">
      <el-table :data="orderInfoList" border style="width: 100%;text-align: center;">
        <el-table-column prop="brandName" label="品牌" width="100"> </el-table-column>
        <el-table-column prop="modelNo" label="产品型号" width="160" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="bccPrice" label="产品价格" width="120"> </el-table-column>
        <el-table-column prop="activatedFlag" label="产品绑定状态" width="110"> </el-table-column>
        <el-table-column prop="lastUpdateTime" label="产品绑定时间" width="160"> </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
import gUtils from '../../utils/gUtils.js';

export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      orderTime: '',
      allocators: [], // 所有配置人
      input: {
        rightId: '',
        rightName: '',
        xiaoweiId: '',
        channelName: '',
        shopName: '',
        ptName: '',
        ptId: '',
        giftId: '',
        giftName: '',
        status: '',
        flag: 0,
        startTime: '',
        endTime: '',
        crUserId: '' // 配置人
      },
      jurisdiction: false,
      errmsg: '',
      rightdis: false,
      xiaoweidis: false,
      shopdis: false,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      tableData: [],
      orderInfoList: [],
      loading: false,
      xiaoweioptions: gUtils.getXWname,
      channeloptions: ['所有渠道', '苏宁', 'VIP客户', '五星', '国美', '社区专卖', '综合店', '超市'],
      rightStateoptions: [
        {
          id: 1,
          value: '权益在途'
        },
        {
          id: 2,
          value: '权益已激活'
        },
        {
          id: 3,
          value: '权益已领取'
        },
        {
          id: 4,
          value: '权益已过期'
        },
        {
          id: 5,
          value: '权益缺货'
        },
        {
          id: 6,
          value: '礼品已发送'
        }
      ],
      queryString: '',
      rightsid: '',
      giftdisabled: false,
      orderListLoading: false
    };
  },
  created(e) {
    const _this = this;
    if (this.$route.query.id) {
      this.input.rightId = this.$route.query.id;
      this.input.xiaoweiId = this.$route.query.xiaoweiId;
      this.input.rightName = this.$route.query.rightName;
      this.rightdis = true;
      // if(this.$route.query.xiaoweiId!=""){
      //     this.xiaoweidis=true
      // }
      this.rightsid = this.$route.query.id;
    }
    if (!this.$route.query.id && this.$route.query.rightName) {
      this.input.xiaoweiId = this.$route.query.xiaoweiId;
      this.input.rightName = this.$route.query.rightName;
      this.rightdis = true;
      // if(this.$route.query.xiaoweiId!=""){
      //     this.xiaoweidis=true
      // }
      const params = {
        rightName: this.input.rightName
      };
      this.requestReport.getRightsName(params).then((data) => {
        if (data.data) {
          _this.rightsid = data.data[0].id;
        }
      });
    }
    // 查询小微id
    if (this.$route.query.xiaoweiId) {
      var { xiaoweiId } = this.$route.query;
    } else {
      var xiaoweiId = '';
    }
    const params = {
      xiaoweiId
    };
    this.requestReport.queryxiaoweiId(params).then((data) => {
      if (data.isSuccess) {
        if (data.data) {
          _this.xiaoweidis = true;
          _this.input.xiaoweiId = data.data;
        } else {
          _this.xiaoweidis = false;
        }
      } else {
        _this.errmsg = data.msg;
        _this.jurisdiction = true;
      }
    });

    this.getAllocator();
  },
  methods: {
    // 获取配置人列表
    getAllocator() {
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/dealordermanager/queryAllCrUserName`)
        .then((response) => {
          if (response.data.isSuccess) {
            that.allocators = response.data.data;
          }
        })
        .catch((error) => {});
    },
    timeChange(e) {
      console.log(e.split(' - '));
      this.input.startTime = e.split(' - ')[0];
      this.input.endTime = e.split(' - ')[1];
    },
    getCreatertime(e) {
      const create_time = parseInt(e);
      const year = new Date(create_time).getFullYear();
      let month = new Date(create_time).getMonth() + 1;
      let date = new Date(create_time).getDate();
      let hour = new Date(create_time).getHours();
      let minute = new Date(create_time).getMinutes();
      let second = new Date(create_time).getSeconds();
      if (month < 10) {
        month = `0${month}`;
      }
      if (date < 10) {
        date = `0${date}`;
      }
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minute < 10) {
        minute = `0${minute}`;
      }
      if (second < 10) {
        second = `0${second}`;
      }
      return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    },
    view(e) {
      const _this = this;
      this.orderInfoList = [];
      this.dialogVisible = true;
      const data = {
        orderId: e
      };
      this.requestReport.getOrderDetails(data).then((data) => {
        if (data && data.orderInfoList) {
          data.orderInfoList.forEach((el) => {
            if (el.activatedFlag == 0) {
              el.activatedFlag = '未激活';
              el.lastUpdateTime = '';
            } else if (el.activatedFlag == 1) {
              el.activatedFlag = '已激活';
              el.lastUpdateTime = _this.getCreatertime(el.lastUpdateTime);
            }
          });
        }
        _this.orderInfoList = data.orderInfoList;
      });
    },
    reset() {
      if (!this.$route.query.id) {
        this.rightsid = '';
        this.giftdisabled = false;
        this.input = {
          rightId: '',
          rightName: '',
          xiaoweiId: '',
          channelName: '',
          shopName: '',
          ptName: '',
          ptId: '',
          giftId: '',
          giftName: '',
          status: '',
          flag: 0,
          startTime: '',
          endTime: '',
          crUserId: ''
        };
        this.orderTime = '';
      } else {
        this.giftdisabled = false;
        this.input.channelName = '';
        this.input.shopName = '';
        this.input.ptName = '';
        this.input.ptId = '';
        this.input.giftId = '';
        this.input.giftName = '';
        this.input.status = '';
        this.input.flag = 0;
        this.input.startTime = '';
        this.input.endTime = '';
        (this.orderTime = ''), (this.input.crUserId = '');
      }
      this.tableData = [];
    },
    getquery() {
      this.input.flag = 0;
      this.query();
    },
    query() {
      // 121 142 128
      // 是否有权限查询导表
      if (this.jurisdiction) {
        this.$message({
          type: 'warning',
          message: this.errmsg
        });
        return;
      }

      // if(this.input.rightName==""){
      //     this.$message({
      //         type: 'warning',
      //         message: "请选择权益活动名称"
      //     });
      //     return;
      // }
      const data = JSON.parse(JSON.stringify(this.input));
      if (this.$route.query.id) {
        // data.xiaoweiId = ""
        data.rightName = '';
      }
      if (this.input.flag == 0) {
        this.loading = true;
        this.tableData = [];
      }
      data.pageNo = this.pageNo;
      data.pageSize = this.pageSize;
      const _this = this;
      this.requestReport.getSellersOrderData(data).then((data) => {
        _this.loading = false;
        if (data.isSuccess) {
          _this.orderListLoading = true;
          if (_this.input.flag == 1) {
            window.location.href = data.data.showPath;
          } else if (_this.input.flag == 0) {
            _this.tableData = data.data.entities;
            _this.pageNo = data.data.pageNo;
            _this.pageSize = data.data.pageSize;
            _this.total = data.data.entityCount;
          }
        }
      });
    },
    handleSizeChange(pageSize) {
      if (this.orderListLoading) {
        this.input.flag = 0;
        this.pageNo = 1;
        this.pageSize = pageSize;
        this.query();
      }
    },
    handleCurrentChange(pageNo) {
      if (this.orderListLoading) {
        this.input.flag = 0;
        this.pageNo = pageNo;
        this.query();
      }
    },
    rightsList(queryString, cb) {
      const _this = this;
      const params = {
        rightName: this.input.rightName
      };
      this.requestReport.getRightsName(params).then((data) => {
        if (data.data) {
          cb(data.data);
        } else {
          cb([]);
        }
      });
    },
    rightsSelect(item) {
      this.rightsid = item.id;
      this.giftdisabled = false;
    },
    shopList(queryString, cb) {
      const _this = this;
      const params = {
        xwId: this.input.xiaoweiId,
        channelName: this.input.channelName,
        shopName: queryString || queryString == '' ? queryString : _this.queryString
      };
      if (this.input.channelName == '') {
        cb([]);
        _this.$message({
          message: '请选择渠道名称',
          type: 'warning'
        });
        this.shopdis = true;
      } else {
        this.requestRights.listShopInfo(params).then((data) => {
          _this.queryString = queryString || queryString == '' ? queryString : _this.queryString;
          if (data) {
            cb(data.entities);
          } else {
            cb([]);
          }
        });
      }
    },
    giftList(queryString, cb) {
      const _this = this;
      const params = {
        id: this.rightsid
      };
      this.requestReport.getGiftNameByRightsname(params).then((data) => {
        if (data.isSuccess) {
          if (data.data) {
            cb(data.data);
          } else {
            cb([]);
          }
        } else {
          cb([]);
          _this.giftdisabled = true;
        }
      });
    },
    giftSelect(item) {
      this.input.giftId = item.giftId;
    },
    excel() {
      this.input.flag = 1;
      this.query();
    }
  },
  mounted() {
    if (this.$route.query.rightName) {
      this.query();
    }
  }
};
</script>
<style scoped>
.sellers .leftname {
  white-space: nowrap;
}
</style>
<style>
.sellers .leftname {
  width: 90px;
  display: inline-block;
}
.sellers .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
}
.el-autocomplete-suggestion li {
  line-height: 25px;
  padding: 5px 10px;
  white-space: inherit;
}
</style>
