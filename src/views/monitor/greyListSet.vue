<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>直销员灰名单设置</p>
      <div class="clear"></div>
    </div>
    <div style="margin-top: 15px;">
      <el-form label-position="left" :model="form">
        <el-row style="margin-bottom:10px">
          <el-col :span="7">
            <span class="cx-title" style="margin-right:28px">小微：</span>
            <!-- <el-form-item label="小微："> -->
            <el-select class="cx-content" v-model="form.xwId" placeholder="请选择小微">
              <el-option v-for="item in xwoptions" :key="item.xwId" :label="item.xwName" :value="item.xwId">
              </el-option>
            </el-select>
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="7">
            <!-- <el-form-item label="渠道：" > -->
            <span class="cx-title" style="margin-right:41px">渠道：</span>
            <el-select class="cx-content" v-model="form.channelName" placeholder="请选择渠道">
              <el-option v-for="item in channeloptions" :key="item" :label="item" :value="item"> </el-option>
            </el-select>
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="7">
            <span class="cx-title" style="margin-right:41px">产业：</span>
            <!-- <el-form-item label="产业：" > -->
            <el-select class="cx-content" v-model="form.industry" placeholder="请选择产业">
              <el-option v-for="item in productoptions" :key="item" :label="item" :value="item"> </el-option>
            </el-select>
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="batchFreeze">批量冻结</el-button>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:10px">
          <el-col :span="7">
            <span class="cx-title" style="margin-right:28px">门店：</span>
            <!-- <el-form-item label="门店："> -->
            <!-- <el-autocomplete v-model="shopName" class="cx-content" :fetch-suggestions="listShopInfo" placeholder="请输入门店名称" @select="storeSelect" :props="{'value':'shopName','label':'shopName'}">
                            </el-autocomplete> -->
            <el-input class="cx-content" v-model="shopName" placeholder="请输入门店名称"></el-input>
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="7">
            <span class="cx-title">直销员工号：</span>
            <!-- <el-form-item label="直销员工号："> -->
            <el-input class="cx-content" v-model="form.hmcId" placeholder="请输入直销员工号"></el-input>
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="7">
            <span class="cx-title">直销员姓名：</span>
            <!-- <el-form-item label="直销员姓名："> -->
            <el-input class="cx-content" v-model="form.hname" placeholder="请输入直销员姓名"></el-input>
            <!-- </el-form-item>-->
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="batchThaw">批量解冻</el-button>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:10px">
          <el-col :span="7">
            <span class="cx-title">门店编码：</span>
            <!-- <el-form-item label="门店编码：" label-width="115px"> -->
            <el-input class="cx-content" v-model="form.shopCode" placeholder="请输入门店编码"></el-input>
            <!-- </el-form-item> -->
          </el-col>
          <el-col :span="7">
            <span class="cx-title" style="margin-right:41px">状态：</span>

            <!-- <el-form-item label="状态："> -->

            <el-select class="cx-content" v-model="form.sellerStatus" placeholder="请选择状态">
              <el-option label="全部" value=""></el-option>
              <el-option label="正常" value="0"></el-option>
              <el-option label="冻结" value="1"></el-option>
            </el-select>
            <!-- </el-form-item>     -->
          </el-col>
          <el-col :span="7" class="btnMl">
            <el-button @click="reset">重置</el-button>
            <el-button type="primary" @click="query">搜索</el-button>
          </el-col>
        </el-row>
        <!-- <el-row>

                </el-row> -->
      </el-form>
    </div>
    <div v-loading="msgListLoading">
      <el-table
        :data="tableData"
        show-overflow-tooltip
        style="width: 100%;margin-top: 20px;"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="hmcid" label="直销员工号" width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="hname" label="姓名" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="shopname" label="门店" width="200" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="shopid" label="门店编码" width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="zyproductline" label="产业" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="customer_category_name" label="渠道" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="trade_code_name" label="小微" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="sellerStatus" label="状态" show-overflow-tooltip> </el-table-column>
        <el-table-column label="冻结时间" width="220" show-overflow-tooltip :formatter="formatterTime">
          <!-- <template slot-scope="scope" >
                        <span v-if="scope.row.frozenBeginTime != '' && scope.row.frozenEndTime != ''">{{scope.row.frozenBeginTime}} , {{scope.row.frozenEndTime}}</span>
                        <span v-else>无</span>
                    </template>                     -->
        </el-table-column>
        <el-table-column prop="frozenRemark" width="150" label="冻结原因" show-overflow-tooltip> </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <span>
              <el-button
                type="text"
                class="col"
                v-show="scope.row.sellerStatus != '冻结'"
                @click="freeze(scope.row, '0')"
                >冻结</el-button
              >

              <el-button type="text" @click="thaw(scope.row)" v-show="scope.row.sellerStatus == '冻结'">解冻</el-button>
              <el-button type="text" v-show="scope.row.sellerStatus == '冻结'" @click="editTime(scope.row, '1')"
                >修改冻结时间</el-button
              >
            </span>
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
        :total="total"
      >
      </el-pagination>
    </div>
    <!--冻结 -->
    <el-dialog title="账号冻结" :visible.sync="starDialog" :modal-append-to-body="false" :before-close="cancel">
      <div class="starDialog-box">
        <el-form ref="freezeDet" :model="freezeDetail" :rules="rulesDetail" class="demo-ruleForm">
          <el-row>
            <el-col :span="18">
              <el-form-item label="冻结时间" prop="date" class="start">
                <el-col :span="9">
                  <el-form-item prop="frozenBeginTime">
                    <el-date-picker
                      type="date"
                      :disabled="permanent"
                      placeholder="开始日期"
                      v-model="freezeDetail.frozenBeginTime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1">-</el-col>
                <el-col :span="9">
                  <el-form-item prop="frozenEndTime">
                    <el-date-picker
                      type="date"
                      :disabled="permanent"
                      placeholder="结束日期"
                      v-model="freezeDetail.frozenEndTime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="margin-left:30px;line-height: 35px;">
              <el-checkbox v-model="permanent" @change="handleCheck">永久冻结</el-checkbox>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="冻结原因" prop="frozenRemark">
              <el-col :span="18">
                <el-input v-model="freezeDetail.frozenRemark"></el-input>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="starTrue">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 解冻 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import qs from 'qs';
import gUtils from '../../utils/gUtils.js';

export default {
  name: 'starRating',
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    const startTime = (rule, value, callback) => {
      // console.log(value)
      if (!this.permanent) {
        if (value != '' && value != undefined && value != null) {
          const startDate = gUtils.dateFormat(Date.parse(value), 'yyyy-MM-dd');
          const nowDate = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
          // var endDate = gUtils.dateFormat(Date.parse(this.freezeDetail.endDate, "yyyy-MM-dd");
          if (startDate < nowDate) {
            callback(new Error('开始日期应大于等于当前日期'));
          } else {
            callback();
          }
        } else {
          callback(new Error('请选择开始日期'));
        }
      } else {
        callback();
      }
    };
    const endTime = (rule, value, callback) => {
      // console.log(value)
      if (!this.permanent) {
        if (value != '' && value != undefined && value != null) {
          const startDate = gUtils.dateFormat(Date.parse(this.freezeDetail.frozenBeginTime), 'yyyy-MM-dd');
          const endDate = gUtils.dateFormat(Date.parse(value), 'yyyy-MM-dd');
          // var endDate = gUtils.dateFormat(Date.parse(this.freezeDetail.endDate, "yyyy-MM-dd");
          if (endDate < startDate) {
            callback(new Error('结束日期应大于等于开始日期'));
          } else {
            callback();
          }
        } else {
          callback(new Error('请选择结束日期'));
        }
      } else {
        callback();
      }
    };
    return {
      value: '',
      xwoptions: [], // 小薇列表
      channeloptions: [], // 渠道列表
      productoptions: [], // 产业列表
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 1,
      permanent: false,
      starDialog: false,
      form: {
        xwId: '', // 小薇
        channelName: '', // 渠道
        industry: '', // 产业
        shopCode: '',
        hname: '', // 直销员姓名
        hmcId: '', // 直销员工号
        sellerStatus: '' // 状态
      },
      freezeDetail: {
        frozenBeginTime: '',
        frozenEndTime: '',
        frozenRemark: '',
        foreverStatus: '',
        hmcid: ''
      },
      shopName: '', // 门店
      queryString: '',
      informationFilePath: [],
      path: [],
      isYC: true,
      loading: false,
      dcloading: false,
      multipleSelection: '',
      msgListLoading: false,
      rulesDetail: {
        frozenBeginTime: [
          // { type: 'date', required: true, message: '请选择日期', trigger: 'blur' },
          {
            type: 'date', required: true, validator: startTime, triger: 'blur'
          }
        ],
        frozenEndTime: [{
          type: 'date', required: true, validator: endTime, trigger: 'blur'
        }],
        frozenRemark: [{ required: true, message: '请输入冻结原因', trigger: 'blur' }],
        date: [
          //  { required: true, message: '' }
        ]
      },
      addOrEdit: ''
    };
  },
  created(e) {
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
        _this.form.xwId = arr[0].xwId;
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
        _this.form.channelName = _this.channeloptions[0];
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
        _this.form.industry = arr[0];
      }
    });
  },
  methods: {
    formatterTime(row) {
      //  foreverStatus  frozenBeginTime frozenEndTime
      if (row.foreverStatus == '0') {
        return `${row.frozenBeginTime} , ${row.frozenEndTime}`;
      } if (row.foreverStatus == '1') {
        return '永久冻结';
      }
      return '无';
    },
    // 冻结弹窗关闭
    cancel() {
      this.starDialog = false;
      // this.freezeDetail={
      //     frozenBeginTime:'',
      //     frozenEndTime:'',
      //     frozenRemark:'',
      //     foreverStatus:'',
      //     hmcid:'',
      // }
      this.$refs.freezeDet.resetFields();
      this.permanent = false;
    },
    // 冻结弹窗确认
    starTrue() {
      const that = this;
      const data = JSON.parse(JSON.stringify(this.freezeDetail));
      data.frozenBeginTime = gUtils.dateFormat(Date.parse(this.freezeDetail.frozenBeginTime), 'yyyy-MM-dd');
      data.frozenEndTime = gUtils.dateFormat(Date.parse(this.freezeDetail.frozenEndTime), 'yyyy-MM-dd');

      this.$refs.freezeDet.validate((valid) => {
        if (valid) {
          if (that.permanent) {
            data.foreverStatus = '1';
            data.frozenBeginTime = '';
            data.frozenEndTime = '';
          } else {
            data.foreverStatus = '0';
          }
          // console.log('submit!', data);
          if (that.addOrEdit == '0') {
            var url = 'vipcenter/sellersGreyListController/frozenSellers';
          } else {
            var url = 'vipcenter/sellersGreyListController/updateFrozenSellersDate';
          }
          // var  params = "hmcid ="+ data.hmcid+"&frozenBeginTime="+data.frozenBeginTime+"&frozenEndTime="+data.frozenEndTime+"&foreverStatus="+data.foreverStatus+"&frozenRemark"+data.frozenRemark
          axios
            .post(this.apiUrl + url, qs.stringify(data))
            .then((res) => {
              if (res.data.isSuccess) {
                // console.log(res.data.data.entities);
                that.starDialog = false;
                that.$message({
                  type: 'warning',
                  message: res.data.msg
                });
                that.pageSellersInfo();
                that.freezeDetail = {
                  frozenBeginTime: '',
                  frozenEndTime: '',
                  frozenRemark: '',
                  foreverStatus: '',
                  hmcid: ''
                };
              } else {
                that.$message({
                  type: 'warning',
                  message: res.data.msg
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      // console.log(this.freezeDetail);
      // console.log(gUtils.dateFormat(Date.parse(this.freezeDetail.startDate), "yyyy-MM-dd"))
    },
    editTime(row, num) {
      this.starDialog = true;
      this.freezeDetail.frozenBeginTime = row.frozenBeginTime;
      this.freezeDetail.frozenEndTime = row.frozenEndTime;
      this.freezeDetail.frozenRemark = row.frozenRemark;
      this.freezeDetail.hmcid = row.hmcid;
      this.addOrEdit = '1';
    },
    reset() {
      this.form = {
        xwId: 'all', // 小薇
        channelName: '全部渠道', // 渠道
        industry: '全部产业', // 产业
        shopCode: '',
        hname: '', // 直销员姓名
        hmcId: '', // 直销员工号
        sellerStatus: '', // 状态
        conding: '' // 编码
      };
      this.shopName = '';
      this.pageSellersInfo();
    },
    query() {
      this.pageNo = 1;
      this.pageSize = 10;
      // if(this.shopName==""){
      //     this.form.shopCode="";
      // }

      this.pageSellersInfo();
    },
    // 搜索
    pageSellersInfo() {
      const _this = this;
      // _this.tableData=[]
      const data = JSON.parse(JSON.stringify(this.form));
      if (data.channelName == '全部渠道') {
        data.channelName = '';
      }
      if (data.industry == '全部产业') {
        data.industry = '';
      }
      if (data.xwId == 'all') {
        data.xwId = '';
      }
      data.shopName = this.shopName;
      data.pageNo = this.pageNo;
      data.pageSize = this.pageSize;
      this.msgListLoading = true;
      // console.log('搜索',data)
      axios
        .post(`${this.apiUrl}vipcenter/sellersGreyListController/pageQuerySellersGreyList`, data)
        .then((res) => {
          if (res.data.isSuccess) {
            // console.log(res.data.data.entities);
            _this.msgListLoading = false;
            for (const i in res.data.data.entities) {
              if (res.data.data.entities[i].sellerStatus == '0') {
                res.data.data.entities[i].sellerStatus = '正常';
              }
              if (res.data.data.entities[i].sellerStatus == '1') {
                res.data.data.entities[i].sellerStatus = '冻结';
              }
              // if(res.data.data.entities[i].sellerStatus=="0")
            }
            _this.tableData = res.data.data.entities;
            _this.pageNo = res.data.data.pageNo;
            _this.pageSize = res.data.data.pageSize;
            _this.total = res.data.data.entityCount;
          } else {
            _this.$message({
              type: 'warning',
              message: res.data.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    storeSelect(item) {
      console.log(item);
      this.form.shopCode = item.shopCode;
    },
    // 门店
    listShopInfo(queryString, cb) {
      const _this = this;
      let { channelName } = this.form;
      const channeloptions = JSON.parse(JSON.stringify(this.channeloptions));
      channeloptions.splice(0, 1);
      if (channelName == '全部渠道') {
        channelName = channeloptions.join(',');
      }
      const params = {
        xwId: this.form.xwId,
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
    handleSizeChange(val) {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.pageSize = val;
        if (this.tableData.length != 0) {
          this.pageSellersInfo();
        }
      }
    },
    handleCurrentChange(val) {
      if (!this.msgListLoading) {
        this.pageNo = val;
        if (this.tableData.length != 0) {
          this.pageSellersInfo();
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量冻结
    batchFreeze() {
      if (this.multipleSelection == '') {
        this.$message({
          type: 'warning',
          message: '请选择需要冻结的直销员'
        });
        return;
      }
      const hmcid = this.multipleSelection.map(row => row.hmcid);
      this.starDialog = true;
      this.freezeDetail.frozenBeginTime = '';
      this.freezeDetail.frozenEndTime = '';
      this.freezeDetail.frozenRemark = '';
      this.freezeDetail.hmcid = hmcid.join(',');
      this.addOrEdit = '0';
    },
    // 批量解冻
    batchThaw() {
      if (this.multipleSelection == '') {
        this.$message({
          type: 'warning',
          message: '请选择需要解冻的直销员'
        });
        return;
      }
      const hmcid = this.multipleSelection.map(row => row.hmcid);

      this.thawDet(hmcid.join(','));
    },
    // 冻结
    freeze(row, num) {
      console.log(row);
      this.starDialog = true;
      this.freezeDetail.frozenBeginTime = row.frozenBeginTime;
      this.freezeDetail.frozenEndTime = row.frozenEndTime;
      this.freezeDetail.frozenRemark = row.frozenRemark;
      this.freezeDetail.hmcid = row.hmcid;
      this.addOrEdit = '0';
    },
    // 解冻
    thaw(row) {
      this.thawDet(row.hmcid);
    },
    thawDet(row) {
      const that = this;
      const hmcid = row;
      this.$confirm('是否解冻该账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          const data = {
            hmcid
          };
          axios
            .post(`${this.apiUrl}vipcenter/sellersGreyListController/trawSellers`, qs.stringify(data))
            .then((res) => {
              if (res.data.isSuccess) {
                // console.log(res.data.data.entities);
                that.starDialog = false;
                that.$message({
                  type: 'success',
                  message: res.data.msg
                });
                that.pageSellersInfo();
              } else {
                that.$message({
                  type: 'warning',
                  message: res.data.msg
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解冻'
          });
        });
    },
    handleCheck() {
      console.log(this.permanent);
    }
  },

  mounted() {
    this.pageSellersInfo();
  }
};
</script>

<style scoped>
.star-star {
  display: flex;
  align-items: center;
}
.star-star span {
  color: rgb(255, 73, 73);
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.dialog-footer button {
  width: 126px;
}
.ico-vipin {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: -2px;
  background: url('../../assets/images/ico-vipin.png') no-repeat;
}
.starDialog-rictext {
  font-size: 15px;
}
.line {
  text-align: center;
}
.starDialog-chuanbox {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 5px;
}
.starDialog-jia {
  margin: 5px 0 0 5px;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f9fe;
  border-radius: 10px;
  font-size: 40px;
  color: #2ba2fc;
}
.starDialog-cright {
  margin-left: 15px;
}
.starDialog-cright p {
  font-size: 12px;
  color: #999999;
  margin-top: 8px;
}
.starDialog-box {
  padding: 20px 0 0;
  /* border: 1px solid #ccc; */
}
.starDialog-title {
  font-weight: bold;
  margin: 10px 0;
}
.rights-config-header {
  background: initial;
}
.cx-star {
  height: 36px;
  display: inline-block;
  line-height: 36px;
}
.cx-title {
}
.cx-content {
  width: 68%;
}
.zl-scz,
.zl-node {
  border: 1px solid white;
  position: relative;
  width: 70px;
  height: 70px;
  margin-left: 5px;
  margin-top: 5px;
}

.zl-scz img,
.zl-node img {
  width: 100%;
  height: 100%;
}
.zl-scz .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.9);
}
.zl-scz:hover .close {
  display: block;
}
.zl-scz .el-loading-spinner {
  margin-top: -27px;
}
.close {
  border-radius: 19px;
  display: block;
  color: #45a0f8;
  position: absolute;
  right: -9px;
  top: -10px;
  font-size: 19px !important;
  line-height: 20px;
  display: none;
  z-index: 9;
}
.btnMl {
  text-align: center;
  margin-left: -16px;
}
</style>
<style>
.starDialog-jia .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.9);
}
.starDialog-jia .el-loading-spinner {
  margin-top: -46px;
}
.star-box .el-form-item__label {
  padding-top: 14px;
}
.starPing-dialog .el-dialog--small {
  width: 475px;
}
.starDialog-cright .el-upload {
  text-align: left;
}
.starDialog-reason .el-textarea__inner {
  border: none;
  background-color: #f3f9fe;
}
.start .el-form-item__label:before {
  content: '*';
  color: #ff4949;
  margin-right: 4px;
}
</style>
