<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>星级升级路径维护
        <el-button type="primary" @click="add" class="fr">新建</el-button>
      </p>
      <div class="clear"></div>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="productLine" label="产业" width="180"> </el-table-column>
      <el-table-column prop="textupCategory" label="分类" width="180"> </el-table-column>
      <el-table-column label="附件" width="180">
        <template scope="scope">
          <el-button type="text" @click="preview(scope.row.videoLink)" v-if="scope.row.videoLink">点击预览</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="textstatus" label="状态" width="180"> </el-table-column>
      <el-table-column label="上下架" width="180">
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
      <el-table-column prop="crUserName" label="创建人" width="130" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="lastUpdateUserName" label="最后操作人" width="130" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="详情" width="150">
        <template scope="scope">
          <el-button type="text" @click="detailsView(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="130">
        <template scope="scope">
          <el-button @click="view(scope.row.id)" type="text" v-if="scope.row.status == 2">修改</el-button>
          <el-button @click="deletered(scope.row.id)" type="text" v-if="scope.row.status != 1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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

    <!--预览-->
    <el-dialog title="附件" :visible.sync="encDialog" :modal-append-to-body="false" class="modadv-encbox">
      <video controls :src="videoLink" width="640" height="480" v-if="encDialog">
        <source type="video/mp4" />
      </video>
    </el-dialog>

    <!--查看详情-->
    <el-dialog title="查看详情" :visible.sync="detailsDialog" :modal-append-to-body="false" class="star-details-box">
      <el-row class="userdetails-elrow">
        <el-col :span="12"
          ><span>产业：</span><span>{{ details.productLine }}</span></el-col
        >
        <el-col :span="12"
          ><span>分类：</span><span>{{ details.textupCategory }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="12">
          <span style="float: left">创建人：</span><span>{{ details.crUserName }}</span>
        </el-col>
        <el-col :span="12">
          <span style="float: left">最后操作人：</span><span>{{ details.lastUpdateUserName }}</span>
        </el-col>
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24" style="display: flex;"
          ><span style="width: 42px;">内容：</span
          ><span v-html="details.content" style="width: 650px; overflow-x: auto;"></span
        ></el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      encDialog: false,
      videoLink: '',
      detailsDialog: false,
      details: []
    };
  },
  created(e) {},
  methods: {
    detailsView(e) {
      this.details = [];
      this.details = e;
      this.detailsDialog = true;
    },
    preview(e) {
      // this.$refs.video.src = e
      this.encDialog = true;
      this.videoLink = '';
      this.videoLink = e;
    },
    getStarUpList() {
      this.tableData = [];
      const _this = this;
      const data = {
        pageSize: this.pageSize,
        pageNo: this.pageNo
      };
      this.requestComplaint.getStarUpList(data).then((data) => {
        if (data.isSuccess) {
          if (data.data && data.data.entities) {
            data.data.entities.forEach((el) => {
              if (el.upCategory == 1) {
                el.textupCategory = '升级标准';
              }
              if (el.upCategory == 2) {
                el.textupCategory = '升级路径';
              }
              if (el.status == 1) {
                el.textstatus = '上架';
              }
              if (el.status == 2) {
                el.textstatus = '下架';
              }
            });
          }
          _this.tableData = data.data.entities;
          _this.total = data.data.entityCount;
        }
      });
    },
    add() {
      this.$router.push({
        path: '/complaint/addstarmain'
      });
    },
    switchChange(id, status) {
      const _this = this;
      const data = {
        id,
        status
      };
      this.requestComplaint.updateStarUpStatus(data).then((data) => {
        _this.getStarUpList();
      });
    },
    view(e) {
      this.$router.push({
        path: '/complaint/addstarmain',
        query: {
          id: e
        }
      });
    },
    deletered(e) {
      const _this = this;
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            id: e
          };
          this.requestComplaint.deleteStarUp(data).then((data) => {
            _this.getStarUpList();
          });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.pageNo = 1;
      this.pageSize = val;
      if (this.tableData.length != 0) {
        this.getStarUpList();
      }
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      if (this.tableData.length != 0) {
        this.getStarUpList();
      }
    }
  },
  mounted(e) {
    this.getStarUpList();
  }
};
</script>

<style scoped>
.userdetails-elrow {
  margin-top: 10px;
}
.userdetails-elrow div span:nth-child(1) {
  color: #ccc;
}
.userdetails-elrow div span:nth-child(2) {
  color: #333;
}
.pz-tool {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 224px;
  display: inline-block;
  float: left;
}
</style>
<style>
.star-details-box .el-dialog--small {
  width: 770px;
}
</style>
