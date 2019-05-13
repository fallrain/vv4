<template>
  <div class="vip-content activity">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>抽奖活动
        <el-button type="primary" @click="add" class="fr">新建抽奖活动</el-button>
      </p>
      <div class="clear"></div>
    </div>

    <el-row style="margin-top: 15px;">
      <el-col :span="6">
        <span>使用渠道：</span>
        <el-select style="width: 60%;" v-model="input.channel" placeholder="请选择使用渠道">
          <el-option v-for="item in channeloptions" :key="item.id" :label="item.value" :value="item.id"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>活动名称：</span>
        <el-input style="width: 60%;" v-model="input.activityName" placeholder="请输入活动名称"></el-input>
      </el-col>
      <el-col :span="6">
        <span>状态：</span>
        <el-select style="width: 60%;" v-model="input.status" placeholder="请选择状态">
          <el-option v-for="item in ostateptions" :key="item.id" :label="item.value" :value="item.id"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="query">查询</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" border :data="tableData" style="width: 100%;margin-top: 15px;text-align: center;">
      <el-table-column prop="activityName" label="活动名称" width="180"> </el-table-column>
      <el-table-column prop="channel" label="使用渠道" width="100"> </el-table-column>
      <el-table-column prop="startTime" label="生效期" width="180"> </el-table-column>
      <el-table-column prop="endTime" label="失效期" width="180"> </el-table-column>
      <el-table-column prop="url" label="链接" width="200"> </el-table-column>
      <el-table-column prop="teststatus" label="状态" width="100"> </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <a href="javascript:;" @click="changestatus(scope.row)" v-if="scope.row.status == 2" class="operation-btn"
            ><i class="iconfont icon-zanting"></i>开始</a
          >
          <a href="javascript:;" @click="changestatus(scope.row)" v-if="scope.row.status == 1" class="operation-btn"
            ><i class="iconfont icon-icon-zanting"></i>暂停</a
          >
          <el-button @click="view(scope.row.id)" type="text">详情</el-button>
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
  data() {
    return {
      page: 1,
      loading: false,
      input: {
        activityName: '',
        channel: '',
        status: '',
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      channeloptions: [
        {
          id: 2,
          value: '关注公众号'
        }
      ],
      ostateptions: [
        {
          id: 1,
          value: '生效'
        },
        {
          id: 2,
          value: '失效'
        },
        {
          id: 3,
          value: '已结束'
        },
        {
          id: 4,
          value: '未开始'
        },
        {
          id: 5,
          value: '存草稿'
        }
      ],
      tableData: []
    };
  },
  methods: {
    handleSizeChange(val) {
      this.input.pageSize = val;
      this.getActivityData();
    },
    handleCurrentChange(val) {
      this.input.pageNo = val;
      this.getActivityData();
    },
    view(e) {
      this.$router.push({
        path: '/communication/luckyactivitydetails',
        query: {
          id: e
        }
      });
    },
    query() {
      this.getActivityData();
    },
    add() {
      this.$router.push({
        path: '/communication/luckyactivitydetails'
      });
    },
    changestatus(e) {
      const _this = this;
      let msg = '';
      let status = '';
      if (e.status == 1) {
        msg = '是否确认暂停活动？';
        status = 2;
      } else if ((e.status = 2)) {
        msg = '是否确认开启活动？';
        status = 1;
      }
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          _this.loading = true;
          const data = {
            id: e.id,
            status
          };
          this.requestActivity.updateLuckyStatus(data).then((data) => {
            _this.loading = false;
            if (data.isSuccess) {
              _this.getActivityData();
            }
          });
        })
        .catch(() => {});
    },
    getActivityData() {
      this.loading = true;
      this.tableData = [];
      const data = this.input;
      const _this = this;
      this.requestActivity.getLuckyData(data).then((data) => {
        _this.loading = false;
        if (data.isSuccess) {
          if (data.data.entities != null) {
            data.data.entities.forEach((el) => {
              if (el.channel == 1) {
                el.channel = '签到';
              } else if (el.channel == 2) {
                el.channel = '关注公众号';
              } else if (el.channel == 3) {
                el.channel = '扫码';
              } else if (el.channel == 4) {
                el.channel = '其他';
              }
              if (el.status == 1) {
                el.teststatus = '生效';
              } else if (el.status == -1) {
                el.teststatus = '删除';
              } else if (el.status == 2) {
                el.teststatus = '失效';
              } else if (el.status == 3) {
                el.teststatus = '已结束';
              } else if (el.status == 4) {
                el.teststatus = '未开始';
              } else if (el.status == 5) {
                el.teststatus = '存草稿';
              }
            });
          }
          _this.tableData = data.data.entities;
          _this.total = data.data.entityCount;
        } else {
          _this.tableData = [];
        }
      });
    }
  },
  mounted(e) {
    this.getActivityData();
  }
};
</script>
<style>
.activity .el-table .cell {
  word-break: break-all;
}
</style>
