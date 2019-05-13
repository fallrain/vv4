<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>关怀提醒
        <el-button type="primary" @click="add" class="fr">新建关怀提醒事项</el-button>
      </p>
      <div class="clear"></div>
    </div>
    <div class="carequery">
      <p>
        <span>名称：</span>
        <el-input
          style="display: inline-block;width: 200px;"
          :maxlength="6"
          v-model="name"
          @keyup.native="name = name.replace(/\s+/g, '')"
          placeholder="请输入名称"
        ></el-input>
      </p>
      <p style="margin-left: 20px">
        <span>状态：</span>
        <el-select v-model="status" placeholder="请选择状态">
          <el-option v-for="item in stateoptions" :key="item.id" :label="item.value" :value="item.id"> </el-option>
        </el-select>
      </p>
      <p style="margin-left: 20px">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="query">查询</el-button>
      </p>
    </div>

    <el-table
      class="cares-table"
      v-loading="loading"
      border
      :data="tableData"
      style="width: 100%;margin-top: 15px;text-align: center;"
    >
      <el-table-column prop="sort" label="优先级" width="180"> </el-table-column>
      <el-table-column prop="name" label="提醒事项" width="180"> </el-table-column>
      <el-table-column prop="textstatus" label="状态" width="180"> </el-table-column>
      <el-table-column label="详情" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="getdetails(scope.row.id)">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="上下架">
        <template slot-scope="scope">
          <el-switch
            v-if="scope.row.status == 1 || scope.row.status == 2"
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status != 1"
            type="text"
            @click="$router.push({ path: '/management/addcarereminding', query: { id: scope.row.id } })"
            >修改</el-button
          >
          <a v-if="scope.row.status != 1" href="javascript:;" @click="zxdelete(scope.row.id)">删除</a>
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

    <!--查看详情-->
    <el-dialog class="trs-dialog" title="" :visible.sync="detailsdialog" :modal-append-to-body="false">
      <div class="vip-head-tool" style="margin-bottom: 0;">
        <p class="template-brand" style="margin-bottom: 0;"><i></i>基础信息</p>
        <div class="clear"></div>
      </div>
      <el-row style="margin: 10px 0">
        <el-col :span="12">
          <span class="gh-name">关怀提醒名称：</span>
          {{ details.name }}
        </el-col>
        <el-col :span="12">
          <span class="gh-name">关怀提醒类型：</span>
          <span v-if="details.type == 1">生日类关怀提醒</span>
          <span v-if="details.type == 2">权益发放类提醒</span>
          <span v-if="details.type == 3">权益到期类提醒</span>
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0;position: relative">
        <el-col :span="12"> <span class="gh-name">优先级：</span>{{ details.sort }}</el-col>
      </el-row>
      <div class="vip-head-tool" style="margin-bottom: 0;">
        <p class="template-brand" style="margin-bottom: 0;"><i></i>详细说明</p>
        <div class="clear"></div>
      </div>
      <el-row style="margin-top: 10px">
        <el-col :span="12"
          ><span class="gh-name">提前提醒天数：</span
          ><span v-if="details.startBeforeDays"
            >{{ details.startBeforeDays }}-{{ details.endBeforeDays }}天</span
          ></el-col
        >
        <el-col :span="12">
          <span class="gh-name" v-if="details.type == 3">展示权益：</span>
          <el-tooltip class="item" effect="dark" :content="details.rightName" placement="top">
            <span class="care-tooltip">{{ details.rightName }}</span>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="24"><span class="gh-name">提醒描述摘要：</span>{{ details.summary }}</el-col>
      </el-row>
      <el-row style="margin-top: 10px;">
        <el-col :span="24" style="display: flex"
          ><span style="width: 42px">说明：</span>
          <div style="width: 650px;overflow-x: auto;" v-html="details.desc"></div
        ></el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'carereminding',
  data() {
    return {
      name: '',
      status: '',
      stateoptions: [
        {
          id: 1,
          value: '生效'
        },
        {
          id: 2,
          value: '停用'
        },
        {
          id: 3,
          value: '草稿'
        }
      ],
      loading: false,
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      detailsdialog: false,
      details: []
    };
  },
  methods: {
    switchChange(id, status) {
      const _this = this;
      this.requestManagement
        .updateVipRemindStatus({
          id,
          status
        })
        .then((data) => {
          _this.getVipRemindList();
          if (!data.isSuccess) {
            _this.$message.warning(data.msg);
          }
        });
    },
    reset() {
      this.name = '';
      this.status = '';
      this.getVipRemindList();
    },
    getdetails(e) {
      this.details = [];
      const _this = this;
      this.detailsdialog = true;
      this.requestManagement.getVipRemindDetail({ id: e }).then((data) => {
        if (data.isSuccess) {
          _this.details = data.data;
        }
      });
    },
    handleSizeChange(val) {
      if (this.tableData.length != 0) {
        this.pageNo = 1;
        this.pageSize = val;
        this.getVipRemindList();
      }
    },
    handleCurrentChange(val) {
      if (this.tableData.length != 0) {
        this.pageNo = val;
        this.getVipRemindList();
      }
    },
    add() {
      this.$router.push({
        path: '/management/addcarereminding'
      });
    },
    query() {
      this.pageNo = 1;
      this.getVipRemindList();
    },
    zxdelete(id) {
      console.log(id);
      const _this = this;
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            id,
            status: -1
          };
          this.requestManagement.updateVipRemindStatus(data).then((data) => {
            if (data.isSuccess) {
              _this.getVipRemindList();
            }
          });
        })
        .catch(() => {});
    },
    getVipRemindList() {
      const _this = this;
      this.tableData = [];
      this.loading = true;
      const data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        name: this.name,
        status: this.status
      };
      this.requestManagement.getVipRemindList(data).then((data) => {
        _this.loading = false;
        if (data.isSuccess) {
          if (data.data.entities) {
            data.data.entities.forEach((el) => {
              if (el.status == 1) {
                el.textstatus = '生效';
              }
              if (el.status == 2) {
                el.textstatus = '停用';
              }
              if (el.status == 3) {
                el.textstatus = '草稿';
              }
            });
          }
          _this.tableData = data.data.entities;
          _this.total = data.data.entityCount;
        } else {
          _this.total = 0;
        }
      });
    }
  },
  mounted(e) {
    this.getVipRemindList();
  }
};
</script>

<style scoped>
.carequery p {
  display: inline-block;
}
.gh-name {
}
.care-tooltip {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 285px;
  display: inline-block;
  vertical-align: middle;
}
</style>
<style>
.cares-table .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
