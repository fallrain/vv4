<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <el-button
        v-if="jurisdiction['servicesOperations:customerGroupManager:save']"
        type="primary"
        @click="toDetail()"
        class="fr"
        >新建分组</el-button
      >
      <div class="clear"></div>
    </div>
    <div v-loading="msgListLoading">
      <el-table :data="msgListData.entities" style="width: 100%">
        <el-table-column prop="templateName" label="序号" width="50">
          <template scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="groupName" label="分组名称" min-width="20%" show-overflow-tooltip>
          <template scope="scope">
            <a href="javascript:;" class="color-link" @click="toDetail(scope.row.id, 'view')">{{
              scope.row.groupName
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="groupDesc" label="分组描述" min-width="20%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="crUserName" label="创建人" min-width="20%"> </el-table-column>
        <el-table-column prop="crTime" label="创建时间" min-width="20%"> </el-table-column>
        <el-table-column label="操作" min-width="20%">
          <template scope="scope">
            <a
              v-if="jurisdiction['servicesOperations:customerGroupManager:update']"
              href="javascript:;"
              class="color-link operation-btn"
              @click="toDetail(scope.row.id)"
              ><i class="iconfont icon-xiugai"></i>修改</a
            >
            <a
              v-if="jurisdiction['servicesOperations:customerGroupManager:delete']"
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

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      searchEmail: ''
    };
  },
  filters: {},
  methods: {
    handleIconClick() {},
    // 跳转模板详情
    toDetail(id, type) {
      this.$router.push({
        path: '/service/addgroup',
        query: {
          id,
          type
        }
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
          this.requestService
            .deleteGroup({
              id
            })
            .then((data) => {
              console.log(data);
              if (data) {
                self.listSearch();
              }
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
        pageNo: self.pageNo,
        pageSize: self.pageSize
      };

      this.msgListLoading = true;
      this.requestService.queryGroup(data).then((data) => {
        self.msgListData = data;
        self.msgListLoading = false;
      });
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
    $('.el-pagination__sizes')
      .find('input')
      .on('click', () => {
        $('.el-pagination__sizes')
          .find('input')
          .blur();
      });
  }
};
</script>
