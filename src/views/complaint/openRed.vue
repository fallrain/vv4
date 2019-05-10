<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>开门红
        <el-button type="primary" @click="add" class="fr">新建</el-button>
      </p>
      <div class="clear"></div>
    </div>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%;text-align: center;">
      <el-table-column label="图片" width="300">
        <template scope="scope">
          <img style="width: 100px;height: 100px;margin: 10px 0;" :src="scope.row.imageUrl" />
        </template>
      </el-table-column>
      <el-table-column label="有效期" width="400">
        <template scope="scope">
          <p>{{ scope.row.startTime }} - {{ scope.row.endTime }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button @click="view(scope.row.id)" type="text">修改</el-button>
          <el-button @click="deletered(scope.row.id)" type="text">删除</el-button>
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
  </div>
</template>

<script>
export default {
  name: 'openRed',
  data() {
    return {
      tableData: [],
      input: {
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      loading: false
    };
  },
  methods: {
    handleSizeChange(val) {
      this.input.pageSize = val;
      if (this.tableData.length != 0) {
        this.getOpenredData();
      }
    },
    handleCurrentChange(val) {
      this.input.pageNo = val;
      if (this.tableData.length != 0) {
        this.getOpenredData();
      }
    },
    getOpenredData() {
      this.loading = true;
      this.tableData = [];
      const data = this.input;
      const _this = this;
      this.requestComplaint.getOpenList(data).then((data) => {
        _this.loading = false;
        if (data.isSuccess) {
          _this.tableData = data.data.entities;
          _this.total = data.data.entityCount;
        }
      });
    },
    add() {
      this.$router.push({
        path: '/complaint/openreddetails'
      });
    },
    view(e) {
      this.$router.push({
        path: '/complaint/openreddetails',
        query: {
          id: e
        }
      });
    },
    deletered(e) {
      const _this = this;
      this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            id: e
          };
          this.requestComplaint.deleteOpenRed(data).then((data) => {
            _this.loading = false;
            if (data.isSuccess) {
              _this.$message({
                message: data.msg,
                type: 'success'
              });
              _this.getOpenredData();
            }
          });
        })
        .catch(() => {});
    }
  },
  mounted(e) {
    this.getOpenredData();
  }
};
</script>
