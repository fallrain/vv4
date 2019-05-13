<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <el-radio-group v-model="templateType" @change="typeChange">
        <el-radio-button label="营销类"></el-radio-button>
        <el-radio-button label="关怀类"></el-radio-button>
      </el-radio-group>

      <el-button v-if="jurisdiction['communication:emailManager:save']" type="primary" class="fr" @click="toDetail()"
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
        <el-table-column label="模板名称" min-width="32%" show-overflow-tooltip>
          <template slot-scope="scope">
            <a href="javascript:;" @click="toDetail(scope.row.id, 'view')" class="color-link">{{
              scope.row.templateName
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="templateTitle" label="标题" min-width="31%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="templateContent" label="内容" min-width="19%" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- <div v-html="scope.row.templateContent"></div> -->
            <a href="javascript:;" class="color-link" @click="view(scope.row.templateContent)">查看</a>
          </template>
        </el-table-column>
        <el-table-column prop="crUserName" label="创建人" min-width="17%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="crTime" label="创建时间" min-width="17%">
          <template slot-scope="scope">
            {{ gUtils.dateFormat(scope.row.crTime, 'yyyy-MM-dd') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <a
              v-if="jurisdiction['communication:emailManager:edit']"
              href="javascript:;"
              class="color-link operation-btn"
              @click="toDetail(scope.row.id)"
              ><i class="iconfont icon-xiugai"></i>修改</a
            >
            <a
              v-if="jurisdiction['communication:emailManager:delete']"
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

    <el-dialog
      title="模板内容"
      :visible.sync="dialogVisible"
      size="small"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <div v-html="content"></div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      pageSize: 10,
      dialogVisible: false,
      content: '' // 模板内容
    };
  },
  filters: {},
  methods: {
    // 查看模板
    view(content) {
      this.dialogVisible = true;
      this.content = content;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 跳转模板详情
    toDetail(id, type) {
      this.$router.push({
        path: '/communication/mailtemplate',
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
            .emailDelete({
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
      this.requestComm.emailSearch(data).then((data) => {
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
