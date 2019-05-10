<template>
  <div class="single-table">
    <el-input
      placeholder="输入标题检索"
      icon="search"
      v-model="searchName"
      :on-icon-click="handleIconClick"
      @keyup.enter.native="handleIconClick"
      style="width: 300px;margin:10px 0;"
    >
    </el-input>
    <el-table
      ref="multipleTable"
      :data="msgListData.entities"
      border
      tooltip-effect="dark"
      style="width: 100%;"
      max-height="294"
      @select="handleSelectionChange"
      @select-all="selectAll"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="templateName" label="模板名称"> </el-table-column>
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
</template>

<script type="text/javascript">
export default {
  props: ['selectedTemplate', 'autoInit', 'type'],
  data() {
    return {
      searchName: '',
      msgListData: {
        entities: [],
        entityCount: 0
      },
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      selectedGroup: []
    };
  },
  mounted() {
    this.selectedGroup = [];
    this.$refs.multipleTable.clearSelection();
    this.listSearch();
  },
  methods: {
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        name: self.searchName,
        type: self.type
      };

      this.msgListLoading = true;
      this.requestStrategy.getModel(data).then((data) => {
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
        this.selectedTemplate(row);
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
    autoInit() {
      this.$refs.multipleTable.clearSelection();
      this.listSearch();
    }
  }
};
</script>
