<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i> 产品申诉审核</p>

      <div class="clear"></div>
    </div>
    <div class="product-box">
      <el-row>
        <el-col :span="8">
          <span>产品序列号：</span>
          <el-input
            v-model="skuCode"
            placeholder="请输入产品序列号"
            style="width: 285px;"
            :maxlength="40"
            @keyup.native="skuCode = skuCode.replace(/\s+/g, '')"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <span>申诉人：</span>
          <el-input
            v-model="loginName"
            placeholder="请输入申诉申请人"
            style="width: 285px;"
            :maxlength="40"
            @keyup.native="loginName = loginName.replace(/\s+/g, '')"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <span style="width: 50px">状态：</span>
          <el-select v-model="status" placeholder="请选择状态" style="width: 285px;">
            <el-option v-for="item in options" :key="item.id" :label="item.value" :value="item.id"> </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-col :span="8">
          <span>时间范围：</span>
          <el-date-picker
            :picker-options="pickerOptions0"
            :editable="false"
            v-model="setime"
            type="datetimerange"
            placeholder="选择时间范围"
            @change="setimeChange"
            style="width: 285px;"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="8">
          <span>申诉手机号：</span>
          <el-input
            style="width: 285px;"
            placeholder="请输入申诉人手机号检索"
            v-model="searchEmail"
            :maxlength="11"
            @keyup.native="searchEmail = searchEmail.replace(/\D/g, '')"
          >
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="handleIconClick">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div v-loading="msgListLoading">
      <el-table :data="msgListData.entities" style="width: 100%" border>
        <el-table-column prop="templateName" label="序号" width="50">
          <template slot-scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="申诉人" min-width="10%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="mobile" label="申诉手机号" min-width="20%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="skuCode" label="产品序列号" min-width="20%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="appealReason" label="申诉理由" min-width="25%">
          <template slot-scope="scope">
            <el-tooltip placement="right" v-if="scope.row.appealReason && scope.row.appealReason.length >= 7">
              <div slot="content">{{ scope.row.appealReason }}</div>
              <div class="vip_appealReason">{{ scope.row.appealReason }}</div>
            </el-tooltip>
            <div v-if="scope.row.appealReason && scope.row.appealReason.length < 7">{{ scope.row.appealReason }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="xwName" label="小微" min-width="20%"> </el-table-column>
        <el-table-column prop="city" label="城市" min-width="17%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="processingTime" label="处理时效" min-width="20%" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="rejectReason" label="驳回原因" min-width="20%" show-overflow-tooltip> </el-table-column>
        <el-table-column label="详情" min-width="17%">
          <template slot-scope="scope">
            <a href="javascript:;" class="operation-btn color-link" @click="detail(scope.row.id, scope.row)">
              <i class="iconfont icon-chakan"></i>查看</a
            >
          </template>
        </el-table-column>
        <!--<el-table-column prop="auditStatus" label="状态" min-width="17%">-->
        <!--<template slot-scope="scope">-->
        <!--{{scope.row.status}}-->
        <!--&lt;!&ndash; 未处理 &ndash;&gt;-->
        <!--<span v-if="scope.row.auditStatus == 0&&scope.row.ptId!=null" style="color:#f28902;">{{scope.row.auditStatus | statusFilter}}</span>-->
        <!--&lt;!&ndash; 通过 &ndash;&gt;-->
        <!--<span v-if="scope.row.auditStatus == 1" style="color:#0ab202;">{{scope.row.auditStatus | statusFilter}}</span>-->
        <!--&lt;!&ndash; 驳回 &ndash;&gt;-->
        <!--<el-tooltip v-if="scope.row.auditStatus == 2 && scope.row.rejectReason" class="item" effect="dark" :content="scope.row.rejectReason" placement="top">-->
        <!--<span style="color:#ea0202;">{{scope.row.auditStatus | statusFilter}}</span>-->
        <!--</el-tooltip>-->
        <!--<span v-if="scope.row.auditStatus == 2 && !scope.row.rejectReason" style="color:#ea0202;">{{scope.row.auditStatus | statusFilter}}</span>-->

        <!--&lt;!&ndash; 未分配 &ndash;&gt;-->
        <!--<span v-if="scope.row.ptId==null" style="color:#111;">{{scope.row.ptId | statusFilter}}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column label="操作" min-width="30%" style="position: relative">
          <template slot-scope="scope">
            <span v-if="scope.row.assignStatus == null && scope.row.auditStatus == '1'">已通过</span>
            <span v-if="scope.row.assignStatus == null && scope.row.auditStatus == '2'">已驳回</span>
            <el-tooltip
              v-if="scope.row.assignStatus == null && scope.row.auditStatus == '3'"
              class="item"
              effect="dark"
              content="该产品已被原绑定者通过订单上网绑定"
              placement="top-start"
            >
              <span>异常</span>
            </el-tooltip>

            <!--<span v-if="scope.row.assignStatus==null&&scope.row.auditStatus=='3'">异常</span>-->

            <div v-if="scope.row.auditStatus == '0'">
              <a
                href="javascript:;"
                class="operation-btn color-link"
                @click="pass(scope.row.id, 1)"
                v-if="scope.row.ptId != null && scope.row.auditStatus != 1 && scope.row.auditStatus != 2"
              >
                <i class="iconfont icon-tongguo"></i>通过</a
              >
              <a
                href="javascript:;"
                class="operation-btn"
                @click="rejected(scope.row.id)"
                v-if="scope.row.ptId != null && scope.row.auditStatus != 1 && scope.row.auditStatus != 2"
              >
                <i class="iconfont icon-bohui1"></i>驳回</a
              >
              <span v-if="scope.row.auditStatus == 1 || scope.row.auditStatus == 2">已审核</span>
            </div>

            <a
              href="javascript:;"
              class="operation-btn"
              @click="fp(scope.row.id, scope.row)"
              v-if="scope.row.assignStatus == -1"
            >
              <i class="iconfont icon-fenpei"></i>分配小微</a
            >
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
        :total="msgListData.entityCount"
      >
      </el-pagination>
    </div>

    <el-dialog
      title="请填写驳回原因"
      :visible.sync="dialogVisible"
      size="small"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <el-form ref="form" :model="reason" label-width="80px">
        <el-form-item label="驳回原因" style="margin-bottom:0">
          <el-input type="textarea" v-model="reason.reason" :maxlength="200"></el-input>
          <p style="text-align:right;color:#999;">已输入 {{ reason.reason.length }} 个字</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="check(rejectedId, false)">确 定</el-button>
      </span>
    </el-dialog>

    <detail
      :data="datailDialog.data"
      :random="datailDialog.random"
      :display="datailDialog.display"
      :jurisdiction="jurisdiction"
      :close="detailClose"
    ></detail>

    <fpdialog
      :data="fpDialog.data"
      :random="fpDialog.random"
      :display="fpDialog.display"
      :options="fpDialog.options"
      :jurisdiction="jurisdiction"
      :close="fpClose"
      :reset="listSearch"
    ></fpdialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import detail from './dialog/userDetail.vue';
import fpdialog from './dialog/fpDialog.vue';


export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  components: {
    detail,
    fpdialog
  },
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      options: [
        {
          id: '',
          value: '全部'
        },
        {
          id: -1,
          value: '未分配'
        },
        {
          id: 0,
          value: '未处理'
        },
        {
          id: 1,
          value: '已通过'
        },
        {
          id: 2,
          value: '已驳回'
        },
        {
          id: 3,
          value: '异常'
        }
      ],
      status: '',
      dialogVisible: false,
      reason: {
        reason: ''
      },
      rejectedId: '',
      datailDialog: {
        display: false,
        data: {},
        random: Math.random()
      },
      fpDialog: {
        display: false,
        data: {},
        options: [],
        random: Math.random()
      },
      msgListLoading: false,
      msgListData: [],
      pageNo: 1,
      pageSize: 10,
      searchEmail: '',
      customer: {
        name: '',
        email: '',
        mobile: ''
      },
      form: '',
      setime: '',
      appealDateStartTime: '',
      appealDateEndTime: '',
      skuCode: '',
      loginName: ''
    };
  },
  filters: {
    statusFilter(status) {
      switch (status) {
        case null:
          return '未分配';
          break;
        case 0:
          return '未处理';
          break;
        case 1:
          return '通过';
          break;
        case 2:
          return '驳回';
          break;
        default:
          return status;
          break;
      }
    }
  },
  methods: {
    reset() {
      this.pageNo = 1;
      this.pageSize = 10;
      this.searchEmail = '';
      this.status = '';
      this.appealDateStartTime = '';
      this.appealDateEndTime = '';
      this.skuCode = '';
      this.loginName = '';
      this.setime = '';
      this.listSearch();
    },
    setimeChange(e) {
      this.appealDateStartTime = e.split(' - ')[0] || '';
      this.appealDateEndTime = e.split(' - ')[1] || '';
    },
    // 驳回
    rejected(id) {
      this.rejectedId = id;
      this.reason.reason = '';
      this.dialogVisible = true;
    },
    // 弹层关闭
    handleClose() {
      this.dialogVisible = false;
    },
    // 审核申诉
    check(id, status) {
      const self = this;
      if (this.reason.reason == '') {
        self.$message({
          type: 'warning',
          message: '请填写驳回原因!'
        });
        return false;
      }

      const data = {
        id,
        flag: 2,
        rejectReason: self.reason.reason
      };

      this.requestComplaint.audit(data).then((data) => {
        if (data) {
          self.dialogVisible = false;
          self.$message({
            type: 'success',
            message: '操作成功!'
          });
          self.listSearch();
        }
      });
    },
    detail(id, row) {
      if (typeof row.invoice === 'string' && row.invoice != '') {
        row.invoice = row.invoice.split(',');
      }

      this.datailDialog = {
        display: true,
        data: row,
        random: Math.random()
      };
    },
    detailClose() {
      this.datailDialog.display = false;
    },
    fp(id, row) {
      const _this = this;
      _this.requestComplaint.listxiaoweiname({}).then((data) => {
        _this.fpDialog = {
          display: true,
          data: row,
          options: data,
          random: Math.random()
        };
      });
    },
    fpClose() {
      this.fpDialog.display = false;
    },
    listSearch() {
      const self = this;
      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        whereCondition: self.searchEmail,
        status: self.status,
        appealDateStartTime: self.appealDateStartTime,
        appealDateEndTime: self.appealDateEndTime,
        skuCode: self.skuCode,
        loginName: self.loginName
      };

      this.msgListLoading = true;
      this.requestComplaint.list(data).then((data) => {
        if (data.isSuccess) {
          data.data.entities.forEach((el) => {
            if (el.assignStatus && el.auditStatus != 1) {
              el.processingTime = '';
            }
            if (el.assignStatus && el.auditStatus != 2) {
              el.processingTime = '';
            }
            if (el.orderInfo) {
              el.orderInfo = JSON.parse(el.orderInfo);
            }
            if (el.orderRight) {
              el.orderRight = JSON.parse(el.orderRight);
            }
          });
          self.msgListData = data.data;
          self.msgListLoading = false;
        } else {
          self.$message({
            message: data.msg,
            type: 'warning'
          });
          self.msgListData = [];
          self.msgListLoading = false;
        }
      });
    },
    handleSizeChange(pageSize) {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.pageSize = pageSize;
        if (this.msgListData.length != 0) {
          this.listSearch();
        }
      }
    },
    handleCurrentChange(pageNo) {
      if (!this.msgListLoading) {
        this.pageNo = pageNo;
        if (this.msgListData.length != 0) {
          this.listSearch();
        }
      }
    },
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    pass(id, type) {
      const self = this;
      self
        .$confirm('是否确认操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          const data = {
            id,
            flag: type
          };
          self.requestComplaint.audit(data).then((data) => {
            if (data) {
              self.$message({
                type: 'success',
                message: '操作成功!'
              });
              self.listSearch();
            }
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.listSearch();
  }
};
</script>
<style scoped>
.product-box span {
  display: inline-block;
  width: 85px;
}
</style>
