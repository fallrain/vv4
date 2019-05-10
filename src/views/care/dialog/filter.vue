<template>
  <div class="single-table">
    <el-dialog
      title="系统自动筛选的活动"
      ref="userDialog"
      :visible.sync="display"
      custom-class="edit-role"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <!-- <el-input placeholder="输入标题检索" icon="search" class="fr" v-model="searchName" :on-icon-click="handleIconClick" style="width: 300px;margin:10px 0;"> </el-input> -->
      <el-table
        ref="multipleTable"
        :data="msgListData"
        border
        tooltip-effect="dark"
        style="width: 100%;"
        max-height="294"
        @select="handleSelectionChange"
        @select-all="selectAll"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="sceneName" label="活动名称" min-width="95%"> </el-table-column>
      </el-table>
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" border :current-page.sync="pageNo" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="msgListData.entityCount">
      </el-pagination> -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="selectedFilter(selectModel)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ['dialogChange', 'random', 'dialogDisplay', 'closeDialog', 'selectedFilter'],
  data() {
    return {
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
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize
      };

      this.msgListLoading = true;
      this.requestCare.listScene(data).then((data) => {
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
    },
    handleSelectionChange(selection, row) {
      if (row) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(row);
        this.selectModel = row;
      }
    },
    selectAll() {
      this.$refs.multipleTable.clearSelection();
    },
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    removeGroup(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  },
  watch: {
    random() {
      if (this.$refs.multipleTable) {
        this.$refs.multipleTable.clearSelection();
      }
      this.selectModel = {};
      this.listSearch();
    },
    dialogDisplay(curVal) {
      this.display = this.dialogDisplay;
    }
  }
};
</script>
