<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <el-radio-group v-model="templateType" @change="typeChange">
        <el-radio-button label="营销类"></el-radio-button>
        <el-radio-button label="关怀类"></el-radio-button>
      </el-radio-group>

      <el-button
        v-if="jurisdiction['marketingOperations:siteMsgManager:save']"
        type="primary"
        class="fr"
        @click="toDetail()"
        >新建模板</el-button
      >
      <div class="clear"></div>
    </div>
    <div v-loading="msgListLoading">
      <el-table :data="msgListData.entities" style="width: 100%">
        <el-table-column prop="templateName" label="序号" width="50">
          <template slot-scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="模板名称" min-width="17%" show-overflow-tooltip>
          <template slot-scope="scope">
            <a href="javascript:;" @click="toDetail(scope.row.id, 'view')" class="color-link">{{
              scope.row.templateName
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="templateContent" label="内容" min-width="49%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="pushAppName" label="推送应用" min-width="16%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="crUserName" label="创建人" min-width="17%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="crTime" label="创建时间" min-width="17%">
          <template slot-scope="scope">
            {{ gUtils.dateFormat(scope.row.crTime, 'yyyy-MM-dd') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <a
              v-if="jurisdiction['marketingOperations:siteMsgManager:edit']"
              href="javascript:;"
              class="color-link operation-btn"
              @click="toDetail(scope.row.id)"
              ><i class="iconfont icon-xiugai"></i>修改</a
            >
            <a
              v-if="jurisdiction['marketingOperations:siteMsgManager:delete']"
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
      templateType: '营销类',
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10
    };
  },
  filters: {},
  methods: {
    // 跳转模板详情
    toDetail(id, type) {
      this.$router.push({
        path: '/communication/sitemsgtemplate',
        query: {
          id,
          type,
          templateType: this.templateType == '营销类' ? 2 : 1
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
          this.requestComm
            .siteMsgDelete({
              id
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
    typefilter(value) {
      const type = value == '营销类' ? 2 : 1;
      return type;
    },
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        templateType: self.typefilter(self.templateType)
      };

      this.msgListLoading = true;
      this.requestComm.siteMsgSearch(data).then((data) => {
        self.msgListData = data;
        self.msgListLoading = false;
        $('#app-view').scrollTop(0);
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
