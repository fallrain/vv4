<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>消息提醒设置
        <el-button type="primary" @click="add" class="fr">新建消息提醒</el-button>
      </p>
      <div class="clear"></div>
    </div>

    <el-table v-loading="loading" :data="tableData" border style="width: 100%;">
      <el-table-column prop="title" label="标题" width="180" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="columnTitle" label="栏目" width="180" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="sendTime" label="发送时间" width="180" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column label="服务通知" width="100" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <p v-if="scope.row.serviceNotify == 1">是</p>
          <p v-if="scope.row.serviceNotify == -1">否</p>
        </template>
      </el-table-column>
      <el-table-column prop="smsContent" label="短信提醒内容" width="180" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="附件" width="120">
        <template slot-scope="scope">
          <p v-if="scope.row.videoLink" style="color: #1fb5fc;cursor:pointer;" @click="preview(scope.row.videoLink)">
            点击预览
          </p>
        </template>
      </el-table-column>
      <!--<el-table-column label="链接" width="200" :show-overflow-tooltip="true">-->
      <!--<template slot-scope="scope">-->
      <!--<a :href="scope.row.link" target="_blank" style="color: #1fb5fc;">{{scope.row.link}}</a>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="texxtstatus" label="状态" width="120"> </el-table-column>
      <el-table-column label="上下架" width="160">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            on-color="#13ce66"
            off-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
            @change="switchChange(scope.row.id, scope.row.status)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="160">
        <template slot-scope="scope">
          <el-button @click="custom(scope.row)" type="text" v-if="scope.row.status == 1">自定义发送</el-button>
          <el-button @click="view(scope.row.id)" type="text" v-if="scope.row.status == 2">修改</el-button>
          <el-button @click="deletered(scope.row.id)" type="text" v-if="scope.row.status == 2">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="input.pageNo"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="input.pageSize"
      layout="sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>

    <!--预览-->
    <el-dialog title="附件" :visible.sync="encDialog" :modal-append-to-body="false" class="encbox">
      <video
        controls
        :src="videoLink"
        style="width: 640px;height: 480px;position: relative;opacity: 10;"
        v-if="encDialog"
      >
        <source type="video/mp4" />
      </video>
    </el-dialog>

    <!--自定义发送-->
    <el-dialog title="自定义发送" :visible.sync="customDialog" :modal-append-to-body="false" class="customsend-dialog">
      <div class="customsend">
        <p>兑呗登录账号</p>
        <el-input v-model="hmcId" placeholder="请输入兑呗登录账号"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="customDialog = false">取 消</el-button>
        <el-button type="primary" @click="customSend">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'msgremind',
  data() {
    return {
      loading: false,
      tableData: [],
      input: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      encDialog: false,
      videoLink: '',
      customData: [],
      customDialog: false,
      hmcId: ''
    };
  },
  methods: {
    custom(e) {
      this.customDialog = true;
      this.customData = e;
      this.hmcId = '';
    },
    customSend() {
      const _this = this;
      if (this.hmcId == '') {
        this.$message.warning('请输入兑呗登录账号');
        return false;
      }
      const parse = {
        id: this.customData.id,
        hmcId: this.hmcId,
        columnId: this.customData.columnId,
        sendTime: `${this.customData.sendTime}:00`, // 加个秒
        title: this.customData.title
      };
      this.requestComplaint.customSendReminding(parse).then((data) => {
        if (data.isSuccess) {
          _this.$message({
            message: '发送成功',
            type: 'success'
          });
          _this.customDialog = false;
        }
      });
    },
    preview(e) {
      // this.$refs.video.src = e
      this.encDialog = true;
      this.videoLink = '';
      this.videoLink = e;
    },
    add() {
      this.$router.push({
        path: '/complaint/addmsgrem'
      });
    },
    view(e) {
      this.$router.push({
        path: '/complaint/addmsgrem',
        query: {
          id: e
        }
      });
    },
    deletered(e) {
      this.$confirm('此操作将永久删除该消息提醒, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const _this = this;
          const data = {
            id: e,
            status: -1
          };
          this.requestComplaint.deleteMessageRemindingTitle(data).then((data) => {
            if (data.isSuccess) {
              _this.selectAllUseHelpTitle();
            } else {
              _this.$message.warning(data.msg);
            }
          });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.input.pageNo = 1;
      this.input.pageSize = val;
      if (this.tableData.length != 0) {
        this.selectAllUseHelpTitle();
      }
    },
    handleCurrentChange(val) {
      this.input.pageNo = val;
      if (this.tableData.length != 0) {
        this.selectAllUseHelpTitle();
      }
    },
    switchChange(id, status) {
      const _this = this;
      const data = {
        id,
        status
      };
      this.requestComplaint.deleteMessageRemindingTitle(data).then((data) => {
        if (!data.isSuccess) {
          _this.$message.warning(data.msg);
        }
        _this.selectAllUseHelpTitle();
      });
    },
    selectAllUseHelpTitle() {
      const _this = this;
      const data = this.input;
      _this.tableData = [];
      this.requestComplaint.selectAllMessageRemindingTitle(data).then((data) => {
        if (data.isSuccess && data.data) {
          if (data.data.entities) {
            data.data.entities.forEach((el) => {
              if (el.status == 1) {
                el.texxtstatus = '上架';
              }
              if (el.status == 2) {
                el.texxtstatus = '下架';
              }
            });
          }
          _this.tableData = data.data.entities;
          _this.total = data.data.entityCount;
        }
      });
    }
  },
  mounted(e) {
    this.selectAllUseHelpTitle();
  }
};
</script>

<style scoped>
.encbox video {
  background-color: white;
}
.customsend {
  display: flex;
  align-items: center;
}
.customsend p {
  width: 120px;
}
</style>
<style>
.encbox .el-dialog--small {
  width: 680px;
}
.encbox .el-dialog__body {
  background-color: white;
}
.customsend-dialog .el-dialog--small {
  width: 510px;
}
</style>
