<template>
  <div class="Recruit vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>认筹列表</p>
      <div class="clear"></div>
    </div>
    <el-table
      class="cares-table"
      v-loading="loading"
      :data="tableData"
      style="width: 100%;margin-top: 15px;text-align: center;"
    >
      <el-table-column prop="name" label="认筹名称" width="250"> </el-table-column>
      <el-table-column prop="date" label="认筹时间" width="260"> </el-table-column>
      <el-table-column prop="recruitDetail" label="详情" width="240"> </el-table-column>
      <el-table-column prop="num" label="发放数量" width="200"> </el-table-column>
      <el-table-column prop="recruitNum" label="认筹数量" width="200"> </el-table-column>
      <el-table-column prop="convertNum" label="转化订单" width="200"> </el-table-column>
      <el-table-column prop="sort" label="操作">
        <template slot-scope="scope">
          <el-button type="text" v-if="">查看</el-button>
          <el-button type="text" v-if="">统计</el-button>
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
      :total="entityCount"
    >
    </el-pagination>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios';

export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      entityCount: 0,
      tableData: [],
      loading: false,
      isPage: false
    };
  },
  methods: {
    handleSizeChange(val) {
      if (this.isPage) {
        this.pageNo = 1;
        this.pageSize = val;
        this.pageVipUserManageCardType();
      }
    },
    handleCurrentChange(val) {
      if (this.isPage) {
        this.pageNo = val;
        this.pageVipUserManageCardType();
      }
    },
    pageVipUserManageCardType() {
      this.tableData = [];
      this.isPage = false;
      const _this = this;
      const data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      axios
        .post(`${this.apiUrl}vipcenter/VipUserManagerRecruit/pageVipUserManagerRecruit`, data)
        .then((response) => {
          if (response.data.isSuccess) {
            _this.tableData = response.data.data.entities;
            _this.tableData.forEach((e) => {
              if (e.endTime) {
                e.date = `${e.startTime} —— ${e.endTime}`;
              }
            });
            _this.entityCount = response.data.data.entityCount;
            _this.isPage = true;
          } else {
            _this.isPage = true;
            _this.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          _this.isPage = true;
          console.log(error);
        });
    }
  },
  mounted() {
    this.pageVipUserManageCardType();
  }
};
</script>

<style scoped></style>
