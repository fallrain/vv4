<template>
  <div class="Recruit vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>入户服务报表</p>
      <div class="clear"></div>
    </div>
    <div class="product-box">
      <div class="daoBiaoBtn">
        <el-button type="primary" @click="daoBiaoFunc()">导出excel</el-button>
      </div>
      <el-row>
        <el-col :span="8">
          <span class="leftname">直销员：</span>
          <el-input placeholder="请输入直销员名称" style="width: 60%;" v-model="input.hmcName"></el-input>
        </el-col>
        <el-col :span="8">
          <span class="leftname">直销员工号：</span>
          <el-input placeholder="请输入直销员工号" style="width: 60%;" v-model="input.hmcId"></el-input>
        </el-col>
        <el-col :span="8">
          <span class="leftname">产业：</span>
          <el-select style="width: 60%;" v-model="input.member" placeholder="请选择产业名称(默认所有)">
            <el-option v-for="item in productoptions" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-col :span="8">
          <span class="leftname">中心：</span>
          <!-- <el-input
            placeholder="请输入中心"
            style="width: 60%;"
            v-model="input.xiaoweiCode"
          ></el-input> -->
          <el-select style="width: 60%;" v-model="input.xiaoweiCode" placeholder="请选择小微">
            <el-option v-for="item in xwoptions" :key="item.xwId" :label="item.xwName" :value="item.xwId"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span class="leftname">渠道：</span>
          <el-select style="width: 60%;" v-model="input.channelName" placeholder="请选择渠道名称(默认所有)">
            <el-option v-for="item in channeloptions" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span class="leftname">门店：</span>
          <el-autocomplete
            style="width: 60%;"
            v-model="shopName"
            class="cx-content"
            :fetch-suggestions="listShopInfo"
            placeholder="请输入门店"
            @select="storeSelect"
            :props="{ value: 'shopName', label: 'shopName' }"
          >
          </el-autocomplete>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span class="leftname">品牌型号：</span>
          <el-input placeholder="请输入品牌" style="width: 30%;" v-model="input.brandName"></el-input>
          <el-input placeholder="请输入型号" style="width: 30%;" v-model="input.productCode"></el-input>
        </el-col>
        <el-col :span="8">
          <span class="leftname">时间：</span>
          <el-date-picker
            :picker-options="pickerOptions0"
            :editable="false"
            v-model="setime"
            type="daterange"
            placeholder="选择时间范围"
            style="width: 60%;"
          ></el-date-picker>
        </el-col>

        <el-col :span="8">
          <el-button style="margin-left:90px;" @click="reset">重置</el-button>
          <el-button type="primary" @click="handleIconClick">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- :data="tableData" -->
    <el-table
      :data="tableData"
      align="center"
      style="width: 100%;margin-top: 20px;"
      show-overflow-tooltip
      border
      v-loading="tabLoading"
    >
      <el-table-column prop="hname" label="直销员" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="hmcid" label="工号" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="zyproductline" label="产业" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="tradeCodeName" label="中心" width="80" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="customerCategoryName" label="渠道" width="100" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="shopName" label="门店" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="userName" label="用户姓名" width="80" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="phone" label="用户电话" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="occupation" label="用户职业" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="bnCode" label="品牌型号" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="address" label="用户地址" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="lastUpdateTime" label="最后维护时间" width="220" show-overflow-tooltip> </el-table-column>
      <!-- <el-table-column label="操作" min-width="120" show-overflow-tooltip>
                <template scope="scope">
                    <span @click="detailsView(scope.row)" style="cursor:pointer;" >
                        <span style="color:#1fb5fc;vertical-align: middle;">查看</span>
                    </span>
                </template>
            </el-table-column> -->
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      border
      :current-page.sync="pageNo"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>

    <!--查看详情-->
    <el-dialog title="查看详情" :visible.sync="detailsDialog" :modal-append-to-body="false" class="star-details-box">
      <el-row class="userdetails-elrow">
        <el-col :span="12">
          <img src="http://www.pptok.com/wp-content/uploads/2012/08/xunguang-4.jpg" alt="" width="78" height="78" />
          <img src="http://www.pptok.com/wp-content/uploads/2012/08/xunguang-4.jpg" alt="" width="78" height="78" />
          <img src="http://www.pptok.com/wp-content/uploads/2012/08/xunguang-4.jpg" alt="" width="78" height="78" />
          <img src="http://www.pptok.com/wp-content/uploads/2012/08/xunguang-4.jpg" alt="" width="78" height="78" />
        </el-col>
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="12"
          ><span>购买产品：</span><span>{{ details.bnCode }}</span></el-col
        >
        <el-col :span="12"
          ><span>上门时间：</span><span>{{ details.lastUpdateTime }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="12">
          <span style="float: left">记录标题：</span><span>{{ details.crUserName }}1111111111111111111</span>
        </el-col>
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24" style="display: flex;">
          <span>记录内容：</span>
          <!-- v-html="details.content" -->
          <span style="width: 650px; overflow-x: auto;">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id ab labore maxime, aspernatur incidunt tempora
            nobis, enim corrupti temporibus ex necessitatibus, quis nemo at vero rerum quae illum provident repellendus.
          </span>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios';
import gUtils from '../../utils/gUtils.js';

export default {
  data() {
    return {
      tabLoading: false,
      msgListDataZXY: [],
      input: {
        hmcName: '',
        hmcId: '',
        xiaoweiCode: '所有小微',
        channelName: '全部渠道',
        member: '全部产业',
        shopCode: '',
        brandName: '',
        productCode: '',
        startTime: '',
        endTime: ''
      },
      shopName: '',
      channeloptions: [],
      productoptions: [],
      xwoptions: [],
      setime: '',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      pageNo: 1,
      pageSize: 10,
      total: 1,
      entityCount: 0,
      tableData: [],
      msgListLoading: false,
      isPage: false,
      detailsDialog: false,
      details: []
    };
  },
  created() {
    const _this = this;
    // 小微
    this.requestRights.listArea().then((data) => {
      if (data) {
        const arr = [];
        if (data.length != 1) {
          arr[0] = { xwId: 'all', xwName: '所有小微' };
        }
        for (const i in data) {
          arr.push(data[i]);
        }
        _this.xwoptions = arr;
        _this.input.xiaoweiCode = arr[0].xwId;
      }
    });
    // 渠道
    this.requestRights.listChannel().then((data) => {
      if (data.isSuccess) {
        data.data = Object.values(data.data);
        if (data.data.length == 1) {
          _this.channeloptions = data.data;
        } else {
          const arr = ['全部渠道'];
          for (const i in data.data) {
            arr.push(data.data[i]);
          }
          _this.channeloptions = arr;
        }
        _this.input.channelName = _this.channeloptions[0];
      }
    });
    // 产业
    this.requestRights.listSellersProduct().then((data) => {
      if (data) {
        const arr = [];
        if (data.length > 1) {
          arr[0] = '全部产业';
        }
        for (const i in data) {
          arr.push(data[i]);
        }
        _this.productoptions = arr;
        _this.input.member = arr[0];
      }
    });
  },
  mounted() {
    this.pageSellersInfo();
    // this.pageVipUserManageCardType();
  },
  methods: {
    storeSelect(item) {
      this.input.shopCode = item.shopCode;
    },
    listShopInfo(queryString, cb) {
      const _this = this;
      let { channelName } = this.input;
      const channeloptions = JSON.parse(JSON.stringify(this.channeloptions));
      channeloptions.splice(0, 1);
      if (channelName == '全部渠道') {
        channelName = channeloptions.join(',');
      }
      const params = {
        xwId: this.input.xiaoweiCode,
        channelName,
        shopName: queryString || queryString == '' ? queryString : _this.queryString
      };
      this.requestRights.listShopInfo(params).then((data) => {
        _this.queryString = queryString || queryString == '' ? queryString : _this.queryString;
        if (data) {
          cb(data.entities);
        } else {
          cb([]);
        }
      });
    },
    detailsView(e) {
      this.details = [];
      this.details = e;
      this.detailsDialog = true;
    },
    deletePath(i) {
      this.path.splice(i, 1);
    },
    reset() {
      this.input = {
        hmcName: '',
        hmcId: '',
        xiaoweiCode: 'all',
        channelName: '全部渠道',
        member: '全部产业',

        shopCode: '',
        brandName: '',
        productCode: '',
        setime: ''
      };
      this.shopName = '';
      this.pageNo = 1;
      this.pageSize = 10;
      this.pageSellersInfo();
    },
    handleIconClick() {
      this.pageNo = 1;
      this.pageSize = 10;
      this.pageSellersInfo();
    },
    pageSellersInfo(flag) {
      const that = this;
      // that.tableData=[];
      const data = JSON.parse(JSON.stringify(this.input));
      if (that.setime != [] && that.setime[0] != null && that.setime[1] != null) {
        data.startTime = gUtils.dateFormat(that.setime[0], 'yyyy-MM-dd');
        data.endTime = gUtils.dateFormat(that.setime[1], 'yyyy-MM-dd');
      } else {
        data.startTime = '';
        data.endTime = '';
      }
      data.pageNo = that.pageNo;
      data.pageSize = that.pageSize;
      if (data.channelName == '全部渠道') {
        data.channelName = '';
      }
      if (data.member == '全部产业') {
        data.member = '';
      }
      if (data.xiaoweiCode == 'all' || data.xiaoweiCode == '所有小微') {
        data.xiaoweiCode = '';
      }
      if (that.shopName == '') {
        data.shopCode = '';
      }
      if (flag == 1) {
        data.flag = 1;
      } else {
        data.flag = 0;
      }
      that.tabLoading = true;
      axios
        .post(`${this.apiUrl}vipcenter/visitServeController/pageVisitServe`, data)
        .then((response) => {
          if (response.data.isSuccess == true) {
            if (data.flag == 1) {
              // console.log(response.data.data)
              that.tabLoading = false;
              window.location.href = response.data.data.showPath;
              // window.open(response.data.data.showPath);
            } else {
              that.tabLoading = false;
              that.tableData = response.data.data.entities;
              that.entityCount = response.data.data.entityCount;
              that.total = response.data.data.entityCount;
            }
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      if (!this.tabLoading) {
        this.pageNo = 1;
        this.pageSize = val;
        if (this.tableData.length != 0) {
          this.pageSellersInfo();
        }
      }
    },
    handleCurrentChange(val) {
      if (!this.tabLoading) {
        this.pageNo = val;
        if (this.tableData.length != 0) {
          this.pageSellersInfo();
        }
      }
    },
    // 导表
    daoBiaoFunc() {
      const that = this;
      that
        .$confirm('是否下载入户服务报表?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.pageSellersInfo(1);
        })
        .catch(() => {
          that.$message({
            type: 'error',
            message: '已取消导表'
          });
        });
    }
  }
};
</script>

<style scoped>
.product-box span {
  display: inline-block;
  text-align: right;
  width: 85px;
}
.leftname {
  width: 90px;
  display: inline-block;
}
.daoBiaoBtn {
  position: absolute;
  top: 30px;
  right: 40px;
}
.userdetails-elrow {
  margin-top: 10px;
}
.userdetails-elrow div span:nth-child(1) {
  color: #ccc;
}
.userdetails-elrow div span:nth-child(2) {
  color: #333;
}
</style>
