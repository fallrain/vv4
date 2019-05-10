<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>兑呗操作指导
        <el-button type="primary" @click="add" class="fr">新建操作指导</el-button>
      </p>
      <div class="clear"></div>
    </div>

    <el-table v-loading="loading" :data="tableData" border style="width: 100%;">
      <el-table-column prop="title" label="标题" width="200" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="columnTitle" label="栏目" width="200" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column label="附件" width="120">
        <template scope="scope">
          <p v-if="scope.row.videoLink" style="color: #1fb5fc;cursor:pointer;" @click="preview(scope.row.videoLink)">
            点击预览
          </p>
        </template>
      </el-table-column>
      <el-table-column label="链接" width="200" :show-overflow-tooltip="true">
        <template scope="scope">
          <a :href="scope.row.link" target="_blank" style="color: #1fb5fc;">{{ scope.row.link }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="texxtstatus" label="状态" width="120"> </el-table-column>
      <el-table-column label="上下架" width="160">
        <template scope="scope">
          <el-switch
            v-model="scope.row.status"
            on-color="#13ce66"
            off-color="#ff4949"
            :on-value="1"
            :off-value="2"
            @change="switchChange(scope.row.id, scope.row.status)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="160">
        <template scope="scope">
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
      <video controls :src="videoLink" width="640" height="480" v-if="encDialog">
        <source type="video/mp4" />
      </video>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'guidance',
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
      videoLink: ''
    };
  },
  methods: {
    preview(e) {
      console.log(this.$refs);
      // this.$refs.video.src = e
      this.encDialog = true;
      this.videoLink = '';
      this.videoLink = e;
    },
    add() {
      this.$router.push({
        path: '/complaint/addguidance'
      });
    },
    view(e) {
      this.$router.push({
        path: '/complaint/addguidance',
        query: {
          id: e
        }
      });
    },
    deletered(e) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
          this.requestComplaint.deleteUseHelpTitle(data).then((data) => {
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
      this.requestComplaint.deleteUseHelpTitle(data).then((data) => {
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
      this.requestComplaint.selectAllUseHelpTitle(data).then((data) => {
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

<style>
.encbox .el-dialog--small {
  width: 680px;
}
.encbox .el-dialog__body {
  background-color: white;
}
.encbox video {
  background-color: white;
}
</style>
