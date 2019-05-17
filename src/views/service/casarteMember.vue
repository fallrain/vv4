<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>会员信息查询</p>

      <div class="clear"></div>
    </div>
    <el-row>
      <el-col :span="8">
        <span class="appealtitel">登录名：</span
        ><el-input
          style="width: 60%"
          v-model="form.userName"
          placeholder="请输入登录名"
          @keyup.native="form.userName = form.userName.replace(/\s+/g, '')"
        ></el-input>
      </el-col>
      <el-col :span="8">
        <span class="appealtitel">手机号：</span
        ><el-input
          :maxlength="11"
          @keyup.native="form.mobile = form.mobile.replace(/\D/g, '').slice(0, 11)"
          style="width: 60%"
          v-model="form.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-col>
      <el-col :span="8">
        <span class="appealtitel">产品编码：</span
        ><el-input
          style="width: 60%"
          v-model="form.skuCode"
          placeholder="请输入产品编码"
          @keyup.native="form.skuCode = form.skuCode.replace(/\s+/g, '')"
        ></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="8">
        <span class="appealtitel">产品型号：</span
        ><el-input style="width: 60%" v-model="form.productModelName" placeholder="请输入产品型号"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="appealtitel">认证时间：</span>
        <el-date-picker
          style="width: 60%;margin-left: -4px;"
          v-model="sstime"
          type="datetimerange"
          placeholder="选择认证时间范围"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="gettime"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="8">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="query">查询</el-button>
      </el-col>
    </el-row>

    <el-table
      class="casarteproduct"
      v-loading="loading"
      border
      :data="tableData"
      style="width: 100%;text-align: center;margin-top: 20px;"
    >
      <el-table-column prop="userId" label="用户id" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="userName" label="登录名" width="120" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="120" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="regTime" label="认证时间" width="200" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="skuCode" label="产品编码" width="200" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="productModelName" label="产品型号" width="180" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="productCategoryName" label="产品大类" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="scoreNum" label="获得积分" width="90" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="rightStatus" label="领取状态" width="90" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="provice" label="省份" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="city" label="城市" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="sourceName" label="认证来源" min-width="120" :show-overflow-tooltip="true">
      </el-table-column>
      <!--<el-table-column prop="date" label="操作" min-width="120">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button type="text" @click="casaterelease(scope.row.id)">释放序列号</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
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

    <el-dialog
      title="请填写释放原因"
      :visible.sync="dialogVisible"
      size="small"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <el-form ref="form" :model="reason" label-width="80px">
        <el-form-item label="释放原因" style="margin-bottom:0">
          <el-input type="textarea" v-model="reason.reason" :maxlength="200"></el-input>
          <p style="text-align:right;color:#999;">已输入 {{ reason.reason.length }} 个字</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogVisible = false;
            reason.reason = '';
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="check(rejectedId, false)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'casarteMember',
  data() {
    return {
      form: {
        userName: '',
        mobile: '',
        skuCode: '',
        productModelName: '',
        regProductStartTime: '',
        regProductEndTime: ''
      },
      sstime: '',
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      dialogVisible: false,
      reason: {
        reason: ''
      },
      rejectedId: ''
    };
  },
  created(e) {},
  methods: {
    handleClose() {
      this.reason.reason = '';
      this.dialogVisible = false;
    },
    // 审核申诉
    check(id, status) {
      const self = this;
      if (this.reason.reason == '') {
        self.$message({
          type: 'warning',
          message: '请填写释放原因!'
        });
        return false;
      }
      const data = {
        id,
        releaseReason: self.reason.reason
      };

      this.requestComplaint.casaterelease(data).then((data) => {
        self.dialogVisible = false;
        self.list();
        if (data.isSuccess) {
          self.$message({
            message: data.msg,
            type: 'success'
          });
        }
        self.reason.reason = '';
      });
    },
    gettime(e) {
      let range = e;
      if (!range) {
        range = ['', ''];
      }
      [this.form.regProductStartTime, this.form.regProductEndTime] = range;
    },
    handleSizeChange(pageSize) {
      this.pageNo = 1;
      this.pageSize = pageSize;
      if (this.tableData.length != 0) {
        this.list();
      }
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      if (this.tableData.length != 0) {
        this.list();
      }
    },
    reset() {
      this.form = {
        userName: '',
        mobile: '',
        skuCode: '',
        productModelName: '',
        regProductStartTime: '',
        regProductEndTime: ''
      };
      this.list();
    },
    query() {
      const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (this.form.mobile && !myreg.test(this.form.mobile)) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        });
        return false;
      }
      this.pageNo = 1;
      this.list();
    },
    list() {
      this.loading = true;
      const _this = this;
      const data = JSON.parse(JSON.stringify(this.form));
      data.pageNo = this.pageNo;
      data.pageSize = this.pageSize;
      this.tableData = [];
      this.requestComplaint.casatelist(data).then((data) => {
        if (data.isSuccess) {
          _this.tableData = data.data.entities;
          _this.total = data.data.entityCount;
          _this.loading = false;
          if (data.data) {
            data.data.entities.forEach((el) => {
              if (el.sourceId == 0) {
                el.sourceName = 'PC端条形码';
              }
              if (el.sourceId == 1) {
                el.sourceName = '手机条形码';
              }
              if (el.sourceId == 2 && !el.orderId) {
                el.sourceName = '手机二维码';
              }
              if (el.sourceId == 2 && el.orderId) {
                el.sourceName = '订单上网';
              }
              if (el.sourceId == 3) {
                el.sourceName = '管理员代注册';
              }
              if (el.sourceId == 4) {
                el.sourceName = '申诉成功';
              }
              if (el.sourceId == 6) {
                el.sourceName = '线上送积分';
              }
              if (el.rightStatus == 0) {
                el.rightStatus = '无';
              }
              if (el.rightStatus == 1) {
                el.rightStatus = '待领取';
              }
              if (el.rightStatus == 2) {
                el.rightStatus = '已领取';
              }
            });
          }
        } else {
          _this.tableData = [];
          _this.total = 0;
          _this.loading = false;
        }
      });
    },
    // 释放序列号
    casaterelease(e) {
      this.dialogVisible = true;
      this.rejectedId = e;
    }
  },
  mounted(e) {
    this.list();
  }
};
</script>

<style scoped>
.appealtitel {
  display: inline-block;
  width: 95px;
}
</style>
<style>
.casarteproduct .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
