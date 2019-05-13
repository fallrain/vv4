<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <el-radio-group v-model="isOnline" @change="typeChange">
        <el-radio-button label="线上"></el-radio-button>
        <el-radio-button label="线下"></el-radio-button>
      </el-radio-group>
      <el-button v-if="jurisdiction['member:memberGroupManager:save']" type="primary" class="fr" @click="toDetail()"
        >新建分组</el-button
      >
      <div class="clear"></div>
    </div>
    <div v-loading="msgListLoading">
      <el-table :data="msgListData.entities" style="width: 100%;text-align: center;">
        <el-table-column prop="templateName" label="序号" width="50">
          <template slot-scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="groupName" label="分组名称" min-width="15%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="groupDesc" label="分组描述" min-width="18%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="startTime" label="生效时间" min-width="12%">
          <template slot-scope="scope">
            <div>{{ gUtils.dateFormat(scope.row.startTime, 'yyyy-MM-dd') | startTimeDate }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="失效时间" min-width="12%">
          <template slot-scope="scope">
            <div>{{ gUtils.dateFormat(scope.row.endTime, 'yyyy-MM-dd') | endTimeDate }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="分组人员" min-width="12%">
          <template slot-scope="scope">
            <a
              v-if="jurisdiction['member:memberGroupManager:query']"
              href="javascript:;"
              class="color-link operation-btn"
              @click="toUser(scope.row.id, scope.row)"
              >查看</a
            >
          </template>
        </el-table-column>
        <el-table-column prop="crUserName" label="创建人" min-width="12%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="crTime" label="创建时间" min-width="12%" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ gUtils.dateFormat(scope.row.crTime, 'yyyy-MM-dd') }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="18%">
          <template slot-scope="scope">
            <a
              v-if="jurisdiction['member:memberGroupManager:update']"
              href="javascript:;"
              class="color-link operation-btn"
              @click="toDetail(scope.row.id)"
              ><i class="iconfont icon-xiugai"></i>修改</a
            >
            <a
              v-if="jurisdiction['member:memberGroupManager:update']"
              href="javascript:;"
              class="operation-btn"
              @click="deleteTpl(scope.row.id)"
              ><i class="iconfont icon-shanchu-copy"></i>删除</a
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import gUtils from '../../utils/gUtils.js';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      isOnline: '线上',
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10
    };
  },
  filters: {
    startTimeDate(date) {
      if (date == '1970-01-01') {
        return '永久';
      }
      return date;
    },
    endTimeDate(date) {
      if (date == '1970-01-01') {
        return '';
      }
      return date;
    }
  },
  methods: {
    toUser(id, row) {
      this.$router.push({
        path: '/vip/groupuser',
        query: {
          id,
          name: row.groupName,
          type: row.isOnline
        }
      });
    },

    typeChange() {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.listSearch();
      }
    },
    // 跳转模板详情
    toDetail(id) {
      this.$router.push({
        path: '/vip/addvipgroup',
        query: { id }
      });
    },
    // 模板删除
    deleteTpl(id) {
      const self = this;

      this.$confirm('您确定要删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.requestVip
            .memberChangeStatus({
              id,
              status: '-1'
            })
            .then((data) => {
              self.listSearch();
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    listSearch() {
      const self = this;

      const data = {
        pageNum: self.pageNo,
        pageSize: self.pageSize,
        isOnline: self.isOnline == '线上' ? 1 : 2
      };

      this.msgListLoading = true;
      this.requestVip.queryForPageByBrandName(data).then((data) => {
        self.msgListData = data;
        self.msgListLoading = false;
      });
    },
    typeChange() {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.listSearch();
      }
    },
    handleSizeChange(pageSize) {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.pageSize = pageSize;
        this.listSearch();
      }
    },
    handleCurrentChange(pageNo) {
      if (!this.msgListLoading) {
        this.pageNo = pageNo;
        this.listSearch();
      }
    }
  },
  mounted() {
    this.listSearch();
  }
};
</script>
