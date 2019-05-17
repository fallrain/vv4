<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i> 卡萨帝申诉审核</p>

      <div class="clear"></div>
    </div>
    <el-row>
      <el-col :span="6">
        <span class="appealtitel">登录名：</span
        ><el-input
          style="width: 60%"
          v-model="form.loginName"
          placeholder="请输入登录名"
          @keyup.native="form.loginName = form.loginName.replace(/\s+/g, '')"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <span class="appealtitel">产品编码：</span
        ><el-input
          style="width: 60%"
          v-model="form.skuCode"
          placeholder="请输入产品编码"
          @keyup.native="form.skuCode = form.skuCode.replace(/\s+/g, '')"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <span class="appealtitel">状态：</span>
        <el-select v-model="form.status" placeholder="请选择状态" style="width: 60%">
          <el-option v-for="item in options" :key="item.id" :label="item.value" :value="item.id"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span class="appealtitel">手机号：</span
        ><el-input
          :maxlength="11"
          @keyup.native="form.whereCondition = form.whereCondition.replace(/\D/g, '').slice(0, 11)"
          style="width: 60%"
          v-model="form.whereCondition"
          placeholder="请输入手机号"
        ></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="6">
        <span class="appealtitel">小微：</span>
        <el-select v-model="form.xwName" placeholder="请选择小微" style="width: 60%;margin-left: -4px;">
          <el-option v-for="item in xwoptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span class="appealtitel">申诉时间：</span>
        <el-date-picker
          style="width: 60%"
          v-model="sstime"
          type="datetimerange"
          placeholder="选择申诉时间范围"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="gettime"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <span class="appealtitel">申诉类别：</span>
        <el-select v-model="form.appealType" placeholder="请选择申诉类型" style="width: 60%">
          <el-option v-for="item in appealTypeOptions" :key="item.id" :label="item.value" :value="item.id"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="query">查询</el-button>
      </el-col>
    </el-row>

    <div v-loading="msgListLoading" style="margin-top: 20px;text-align: center;">
      <el-table border :data="msgListData.entities" style="width: 100%">
        <el-table-column prop="templateName" label="序号" width="50">
          <template slot-scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="skuCode" label="产品编码" width="160" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="userName" label="登录名" width="120" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="mobile" label="电话" width="120" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column label="购买区域" width="180">
          <template slot-scope="scope">
            {{ scope.row.province }} {{ scope.row.city }} {{ scope.row.district }}
          </template>
        </el-table-column>
        <el-table-column prop="appealDate" label="申诉时间" width="160" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="appealTypeText" label="申诉类别" width="130" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="rejectReason" label="驳回原因" width="120" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="详情" width="100">
          <template slot-scope="scope">
            <a href="javascript:;" class="operation-btn color-link" @click="detail(scope.row.id, scope.row)">
              <i class="iconfont icon-chakan"></i>查看</a
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="200" style="position: relative">
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
            <!--当异常的时候加通过和驳回-->
            <a
              v-if="scope.row.assignStatus == null && scope.row.auditStatus == '3'"
              href="javascript:;"
              class="operation-btn color-link"
              @click="YCpass(scope.row)"
              style="margin-left: 15px;"
            >
              <i class="iconfont icon-tongguo"></i>通过</a
            >
            <a
              v-if="scope.row.assignStatus == null && scope.row.auditStatus == '3'"
              href="javascript:;"
              class="operation-btn"
              @click="rejected(scope.row.id)"
            >
              <i class="iconfont icon-bohui1"></i>驳回</a
            >
            <!--<span v-if="scope.row.assignStatus==null&&scope.row.auditStatus=='3'">异常</span>-->

            <div>
              <a
                href="javascript:;"
                class="operation-btn color-link"
                @click="pass(scope.row.id, 1)"
                v-if="scope.row.assignStatus == null && scope.row.auditStatus == 0"
              >
                <i class="iconfont icon-tongguo"></i>通过</a
              >
              <a
                href="javascript:;"
                class="operation-btn"
                @click="rejected(scope.row.id)"
                v-if="scope.row.assignStatus == null && scope.row.auditStatus == 0"
              >
                <i class="iconfont icon-bohui1"></i>驳回</a
              >
              <a
                href="javascript:;"
                class="operation-btn"
                @click="fp(scope.row.id, scope.row)"
                v-if="scope.row.assignStatus == -1 && (scope.row.auditStatus == '0' || scope.row.auditStatus == '3')"
              >
                <i class="iconfont icon-fenpei"></i>分配小微</a
              >
              <!--<span v-if="scope.row.auditStatus == 1||scope.row.auditStatus == 2">已审核</span>-->
            </div>
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
    <!--异常释放理由-->
    <el-dialog title="请填写释放理由" :visible.sync="YCdialog" size="small" :modal-append-to-body="false">
      <p style="margin:0 0 10px 13px;font-weight: bold;">
        {{ YCdetails.skuCode }} 编码的{{ YCdetails.product }}已被“{{ YCdetails.mobile }}”用户绑定，是否释放序列号
      </p>
      <el-form ref="form" :model="reason" label-width="180px">
        <el-form-item label="若要释放请填写释放理由" style="margin-bottom:0">
          <el-input type="textarea" v-model="YCreason" :maxlength="200"></el-input>
          <p style="text-align:right;color:#999;">已输入 {{ YCreason.length }} 个字</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="YCdialog = false">取 消</el-button>
        <el-button type="primary" @click="YCcheck">确 定</el-button>
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
import detail from './dialog/casarteUserDetail';
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
      YCdialog: false,
      YCreason: '',
      YCdetails: {
        skuCode: '',
        product: '',
        mobile: ''
      },
      YCform: [],
      YCauit: [],
      form: {
        loginName: '',
        skuCode: '',
        status: '',
        whereCondition: '',
        xwName: '',
        appealDateStartTime: '',
        appealDateEndTime: '',
        appealType: ''
      },
      sstime: [],
      xwoptions: [],
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
      appealTypeOptions: [
        {
          id: '',
          value: '全部'
        },
        {
          id: 1,
          value: '不存在此型号'
        },
        {
          id: 2,
          value: '二维码错误'
        },
        {
          id: 3,
          value: '产品被自己注册'
        },
        {
          id: 4,
          value: '产品被他人注册'
        },
        {
          id: 5,
          value: '认证产品过多'
        },
        {
          id: 6,
          value: '无二维码或破损'
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
      total: 0,
      searchEmail: '',
      customer: {
        name: '',
        email: '',
        mobile: ''
      },
      // form: ''
      StartTime: '',
      EndTime: ''
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
  created(e) {
    const _this = this;
    this.requestComplaint.listxiaoweiname({}).then((data) => {
      _this.xwoptions = data;
      if (data.length == 1) {
        _this.form.xwName = data[0];
      }
    });
  },
  methods: {
    YCcheck() {
      const _this = this;
      const data_lease = {
        id: this.YCform.id,
        releaseReason: this.YCreason
      };
      _this.requestComplaint.casaterelease(data_lease).then((data) => {
        if (data.isSuccess) {
          _this.YCaudit(_this.YCauit, _this);
        }
      });
    },
    YCaudit(e, _this) {
      const data_audit = {
        id: e.id,
        flag: 1
      };
      _this.requestComplaint.audit(data_audit).then((data) => {
        if (data) {
          _this.$message({
            type: 'success',
            message: '操作成功!'
          });
          _this.YCdialog = false;
          _this.listSearch();
        }
      });
    },
    YCpass(e) {
      const _this = this;
      const data = {
        mobile: '',
        pageNo: 1,
        pageSize: 1,
        productModelName: '',
        regProductEndTime: '',
        regProductStartTime: '',
        skuCode: e.skuCode,
        userName: ''
      };
      this.requestComplaint.casatelist(data).then((data) => {
        if (data.isSuccess) {
          if (data.data.entities.length == 0) {
            _this.YCaudit(e, _this);
          } else {
            _this.YCdetails = {
              skuCode: data.data.entities[0].skuCode,
              product: data.data.entities[0].productCategoryName,
              mobile: data.data.entities[0].mobile
            };
            _this.YCreason = '';
            _this.YCdialog = true;
            _this.YCform = data.data.entities[0];
            _this.YCauit = e;
          }
        }
      });
    },
    reset() {
      this.form = {
        loginName: '',
        skuCode: '',
        status: '',
        whereCondition: '',
        xwName: '',
        appealDateStartTime: '',
        appealDateEndTime: '',
        appealType: ''
      };
      this.sstime = '';
      this.StartTime = '';
      this.EndTime = '';
      this.listSearch();
    },
    query() {
      this.form.appealDateStartTime = this.StartTime;
      this.form.appealDateEndTime = this.EndTime;

      const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (this.form.whereCondition && !myreg.test(this.form.whereCondition)) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        });
        return false;
      }
      this.pageNo = 1;
      this.listSearch();
    },
    gettime(e) {
      let range = e;
      if (!range) {
        range = ['', ''];
      }
      [this.StartTime, this.EndTime] = range;
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
      const data = JSON.parse(JSON.stringify(this.form));
      data.pageNo = this.pageNo;
      data.pageSize = this.pageSize;
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
            for (let i = 1; i < self.appealTypeOptions.length; i++) {
              if (el.appealType == self.appealTypeOptions[i].id) {
                el.appealTypeText = self.appealTypeOptions[i].value;
              }
            }
            if (!el.appealType || el.appealType == '') {
              el.appealTypeText = '无';
            }
          });
          if (data.data.entities) {
            data.data.entities.forEach((el) => {
              el.appealDate = self.gUtils.dateFormat(el.appealDate, 'yyyy-MM-dd HH:mm:ss');
            });
          }
          self.msgListData = data.data;
          self.msgListLoading = false;
          self.total = data.data.entityCount;
        } else {
          self.$message({
            message: data.msg,
            type: 'warning'
          });
          self.msgListData = [];
          self.msgListLoading = false;
          self.total = 0;
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
            }
            self.listSearch();
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
.appealtitel {
  display: inline-block;
  width: 75px;
}
</style>
