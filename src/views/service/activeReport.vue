<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="tabChange" style="padding:30px;">
      <el-tab-pane label="查询用户订单情况" name="first">
        <div style="margin: 10px 0;width:300px;float:right">
          <el-input
            @keyup.enter.native="search('tab1')"
            type="number"
            @input.native="maxtel(1)"
            placeholder="请输入用户手机号"
            v-model="searchval1"
          >
            <el-button slot="append" icon="search" @click="search('tab1')"></el-button>
          </el-input>
        </div>
        <el-table v-loading="loading" element-loading-text="删除中" :data="orderListData" border style="width: 100%">
          <el-table-column prop="orderId" label="订单号" width="200"> </el-table-column>
          <el-table-column prop="orderName" label="下单人姓名" width="90" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="orderTime" label="订单时间" width="200"> </el-table-column>
          <el-table-column prop="ptId" label="直销员工号" width="120" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="ptName" label="直销员姓名" width="100"> </el-table-column>
          <el-table-column prop="ptMobile" label="直销员手机号" width="120"> </el-table-column>
          <el-table-column prop="shop" label="门店" width="120"> </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button @click="view(scope.row)" type="text" size="small">查看详情</el-button>
              <el-button @click="delorder(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          border
          :current-page.sync="pageNo"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="ordertotal"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="查询用户产品绑定情况" name="second">
        <div style="margin: 10px 0;width:300px;float:right">
          <el-input
            @keyup.enter.native="search('tab2')"
            type="number"
            @input.native="maxtel(2)"
            placeholder="请输入用户手机号"
            v-model="searchval2"
          >
            <el-button slot="append" icon="search" @click="search('tab2')"></el-button>
          </el-input>
        </div>
        <el-table v-loading="loading2" element-loading-text="解绑中" :data="bindingListData" border style="width: 100%">
          <el-table-column prop="userName" label="当前用户" width="165">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.userName" placement="top-start">
                <span v-text="scope.row.userName"></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="brandName" label="品牌" width="80"> </el-table-column>
          <el-table-column prop="skuCode" label="产品20位机编" width="200"> </el-table-column>
          <el-table-column prop="productModelName" label="产品型号" width="160">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.productModelName" placement="top-start">
                <span v-text="scope.row.productModelName"></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="productCategoryName" label="产品类别" width="80"> </el-table-column>
          <el-table-column prop="regTime" label="产品绑定时间" width="160"> </el-table-column>
          <el-table-column prop="source" label="产品绑定渠道" width="140"> </el-table-column>
          <el-table-column prop="isOrderReg" label="是否订单上网" width="110">
            <template scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.isOrderReg" placement="top-start">
                <span v-text="scope.row.isOrderReg"></span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button
                v-if="
                  scope.row.isOrderReg == '否' && !(scope.row.brandName == 'casarte' || scope.row.brandName == '卡萨帝')
                "
                @click="untie(scope.row)"
                type="text"
                size="small"
                >解绑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      size="100"
      :modal-append-to-body="false"
      @close="detailsClose"
    >
      <el-table :data="orderTableDtails" border style="width: 100%">
        <el-table-column prop="productCategoryName" label="产品类别" width="120"> </el-table-column>
        <el-table-column prop="modelNo" label="产品型号" width="150"> </el-table-column>
        <el-table-column prop="bccPrice" label="系统价格" width="120"> </el-table-column>
        <el-table-column prop="activatedFlag" label="产品绑定状态" width="120"> </el-table-column>
        <el-table-column prop="lastUpdateTime" label="产品绑定时间" width="160"> </el-table-column>
        <el-table-column label="发票详情" width="160">
          <template scope="scope">
            <span v-if="scope.row.invoiceType == 1">
              <a :href="scope.row.invoiceDetail" target="_blank">
                <img style="width: 100px;height: 100px;margin: 10px 0;" :src="scope.row.invoiceDetail" />
              </a>
            </span>
            <span v-if="scope.row.invoiceType == 2">{{ scope.row.invoiceDetail }}</span>
            <span v-if="scope.row.invoiceType == null">无</span>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="orderTableDtails02" border>
        <el-table-column prop="reason" label="权益名称" width="495"> </el-table-column>
        <el-table-column prop="textstatus" label="权益状态" width="167"> </el-table-column>
        <el-table-column label="操作" width="168">
          <template scope="scope">
            <el-button
              v-if="scope.row.status == 1 && (getUserInfo.xwId == '' || getUserInfo.xwId == null)"
              type="text"
              @click="activation(scope.row)"
              >强制激活</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--  <div>{{orderTableDtails[0].invoiceDetail}}</div> -->

      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
      <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      <!--</span>-->
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      getUserInfo: 'getUserInfo'
    })
  },
  data() {
    return {
      activeName: 'first',
      orderTableDtails: [],
      orderTableDtails02: [],
      dialogVisible: false,
      searchval1: '',
      searchval2: '',

      orderListData: [],
      pageNo: 1,
      ordertotal: 0,
      orderListLoading: false,
      pageSize: 10,
      loading: false,

      bindingListData: [],
      pageNo02: 1,
      bindingtotal: 0,
      bindingListLoading: false,
      pageSize02: 10,
      loading2: false
    };
  },
  methods: {
    activation(e) {
      const that = this;
      this.dialogVisible = false;
      this.$confirm('此操作将强制激活该权益, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = { exchangeDetailId: e.id };
          that.requestReport.activitedRight(data).then((data) => {
            that.dialogVisible = true;
            that.view(e);
          });
        })
        .catch(() => {
          that.dialogVisible = true;
          that.view(e);
        });
    },
    detailsClose() {
      this.orderTableDtails = [];
      this.orderTableDtails02 = [];
    },
    maxtel(e) {
      if (e == 1) {
        if (this.searchval1.length > 11) this.searchval1 = this.searchval1.slice(0, 11);
      } else if (e == 2) {
        if (this.searchval2.length > 11) this.searchval2 = this.searchval2.slice(0, 11);
      }
    },
    search(type) {
      if (type == 'tab1') {
        if (!this.orderListLoading) {
          this.listSearch();
        }
      } else if (type == 'tab2') {
        if (!this.bindingListLoading) {
          this.bindinglistSearch();
        }
      }
    },
    tabChange(tab, event) {
      this.searchval2 = '';
      this.bindingListData = [];
      this.searchval1 = '';
      this.orderListData = [];
    },
    view(e) {
      this.orderTableDtails = [];
      this.orderTableDtails02 = [];
      const self = this;
      this.dialogVisible = true;
      const data = {
        orderId: e.orderId
      };
      this.requestReport.getOrderDetails(data).then((data) => {
        if (data.orderInfoList != null) {
          data.orderInfoList.forEach((el) => {
            if (el.activatedFlag == 0) {
              el.activatedFlag = '未绑定';
              el.lastUpdateTime = '未绑定';
            } else if (el.activatedFlag == 1) {
              el.activatedFlag = '已绑定';
              const create_time = parseInt(el.lastUpdateTime);
              const year = new Date(create_time).getFullYear();
              let month = new Date(create_time).getMonth() + 1;
              let date = new Date(create_time).getDate();
              let hour = new Date(create_time).getHours();
              let minute = new Date(create_time).getMinutes();
              const second = new Date(create_time).getSeconds();
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
                minute = `0${second}`;
              }
              el.lastUpdateTime = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
            }
          });
        }
        if (data.rightList != null) {
          data.rightList.forEach((el) => {
            if (el.status == -1) {
              el.status = '';
            } else if (el.status == 1) {
              el.textstatus = '权益在途';
            } else if (el.status == 2) {
              el.textstatus = '权益已激活';
            } else if (el.status == 3) {
              el.textstatus = '权益已领取';
            } else if (el.status == 4) {
              el.textstatus = '权益已过期';
            } else if (el.status == 5) {
              el.textstatus = '权益缺货';
            } else if (el.status == 6) {
              el.textstatus = '权益兑换礼品已发送';
            }
          });
        }
        self.orderTableDtails = data.orderInfoList;
        self.orderTableDtails02 = data.rightList;
      });
    },
    operation(msg, e, id) {
      const self = this;
      if (e == 1) {
        var params = {
          orderId: id
        };
        var delnum;
        for (const i in this.orderListData) {
          if (this.orderListData[i].orderId == id) {
            delnum = i;
          }
        }
      } else {
        var delnum2;
        for (const i in this.bindingListData) {
          if (this.bindingListData[i].id == id.id) {
            delnum2 = i;
          }
        }
        var params = {
          flag: id.flag,
          id: id.id
        };
      }
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (e == 1) {
            self.loading = true;
            this.requestReport.delOrderData(params).then((data) => {
              self.loading = false;
              if (data.isSuccess) {
                self.$message({
                  type: 'success',
                  message: data.data
                });
                self.orderListData.splice(delnum, 1);
              }
            });
          } else {
            self.loading2 = true;
            this.requestReport.delBindData(params).then((data) => {
              self.loading2 = false;
              if (data.isSuccess) {
                self.$message({
                  type: 'success',
                  message: data.data
                });
                self.bindingListData.splice(delnum2, 1);
              }
            });
          }
        })
        .catch(() => {});
    },
    delorder(e) {
      this.operation('此操作将永久删除该数据，是否继续？', 1, e.orderId);
    },
    untie(e) {
      this.operation('此操作将解除绑定，是否继续？', 2, e);
    },
    // 表格分页
    listSearch() {
      this.orderListData = [];
      const self = this;
      const data = {
        mobile: self.searchval1,
        pageNo: self.pageNo,
        pageSize: self.pageSize
      };

      this.orderListLoading = true;

      this.requestReport.getOrderData(data).then((data) => {
        self.orderListLoading = false;
        if (data.isSuccess) {
          if (data.data.entities.length != 0) {
            self.orderListData = data.data.entities;
            self.ordertotal = data.data.entityCount;
          } else {
            self.orderListData = null;
            self.ordertotal = 0;
          }
        } else {
          self.orderListData = null;
          self.ordertotal = 0;
        }
      });
    },
    handleSizeChange(pageSize) {
      if (!this.orderListLoading) {
        this.pageNo = 1;
        this.pageSize = pageSize;
        if (!this.searchval1 == '') {
          this.listSearch();
        }
      }
    },
    handleCurrentChange(pageNo) {
      if (!this.orderListLoading) {
        this.pageNo = pageNo;
        this.listSearch();
      }
    },
    // 绑定情况
    bindinglistSearch() {
      this.bindingListData = [];
      const self = this;
      const data = {
        mobile: self.searchval2
      };

      this.bindingListLoading = true;

      this.requestReport.getBindData(data).then((data) => {
        self.bindingListLoading = false;
        // self.bindingtotal=data.entityCount
        if (data.isSuccess) {
          if (data.data != 0) {
            self.bindingListData = data.data;
          } else {
            self.bindingListData = null;
          }
        } else {
          self.bindingListData = null;
        }
      });
    }
  }
};
</script>
<style scoped>
.el-loading-mask {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
