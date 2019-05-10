<template>
  <div class="single-table">
    <el-dialog
      title="选择模板"
      ref="userDialog"
      :visible.sync="display"
      custom-class="edit-role"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <div style="margin-bottom: 10px">
        <div class="type" @click="newTemplate">新建模板</div>
        <el-input
          placeholder="请输入模板标题检索"
          icon="search"
          v-model="searchName"
          :on-icon-click="handleIconClick"
          @keyup.enter.native="handleIconClick"
          style="width: 300px;float:right;"
        >
        </el-input>
      </div>

      <el-table
        ref="multipleTable"
        :data="msgListData"
        border
        tooltip-effect="dark"
        style="width: 100%;"
        max-height="250"
        @select="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="templateName" label="模板标题" min-width="95%"> </el-table-column>
      </el-table>
      <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" border :current-page.sync="pageNo" :page-sizes="[10, 20, 50, 100]"-->
      <!--:page-size="pageSize" layout="sizes, prev, pager, next" :total="msgListData.entityCount">-->
      <!--</el-pagination>-->

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="selectedModel(type, selectModel)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ['dialogChange', 'type', 'random', 'dialogDisplay', 'closeDialog', 'selectedModel'],
  data() {
    return {
      msgType: '图文消息',
      searchName: '',
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      selectedGroup: [],
      display: false,
      selectModel: {}
    };
  },
  mounted() {
    this.selectedGroup = [];
    // this.$refs.multipleTable.clearSelection();
    this.display = this.dialogDisplay;
  },
  methods: {
    newTemplate() {
      this.$router.push({
        path: '/communication/wechattemplate'
      });
    },
    //      typeChange: function () {
    //        this.pageNo = 1
    //        this.pageSize = 10
    //        this.listSearch()
    //      },
    listSearch() {
      const self = this;
      const data = {
        //            pageNo: self.pageNo,
        //            pageSize: self.pageSize,
        //            whereCondition: self.searchName,
        templateName: self.searchName
      };
      this.msgListLoading = true;
      this.requestVip.listWechatModel(data).then((data) => {
        self.msgListData = data;
        self.msgListLoading = false;
      });
    },
    //      handleSizeChange: function (pageSize) {
    //        if (!this.msgListLoading) {
    //          this.pageNo = 1
    //          this.pageSize = pageSize
    //          this.listSearch()
    //        }
    //      },
    //      handleCurrentChange: function (pageNo) {
    //        if (!this.msgListLoading) {
    //          this.pageNo = pageNo
    //          this.listSearch()
    //        }
    //      },
    handleSelectionChange(selection, row) {
      if (row) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(row);
        this.selectModel = row;
        // this.selectedModel(this.type, row)
      }
    },
    //      selectAll: function () {
    //        this.$refs.multipleTable.clearSelection();
    //      },
    handleIconClick() {
      this.listSearch();
    },
    removeGroup(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  },
  watch: {
    random() {
      // this.$refs.multipleTable.clearSelection();
      this.listSearch();
      this.searchName = '';
      this.pageNo = 1;
      this.pageSize = 10;
      this.msgType = '图文消息';
    },
    dialogDisplay(curVal) {
      this.display = this.dialogDisplay;
    },
    type() {}
  }
};
</script>
<style>
.type {
  width: 72px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  font-size: 12px;
  color: #3a9de9;
  display: inline-block;
  border: 1px solid #3a9de9;
  border-radius: 3px;
  cursor: pointer;
}
</style>
