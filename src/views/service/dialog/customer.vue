<template>
  <div>
    <!-- <el-input placeholder="输入分组名检索" icon="search" v-model="searchName" :on-icon-click="handleIconClick" style="width: 300px;margin:10px 0;"> </el-input> -->
    <el-table
      ref="multipleTable"
      :data="msgListData.entities"
      border
      tooltip-effect="dark"
      style="width: 100%"
      height="300"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" reserve-selection> </el-table-column>
      <el-table-column prop="userName" label="姓名" min-width="33%" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="33%" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="mobile" label="手机号" min-width="33%"> </el-table-column>
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
  props: ['selectGroup', 'recipient', 'random'],
  data() {
    return {
      searchName: '',
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      selectedGroup: []
    };
  },
  mounted() {
    this.selectedGroup = [];
    this.listSearch();
  },
  methods: {
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        whereCondition: self.searchName
      };

      this.msgListLoading = true;
      this.requestService.queryCustomer(data).then((data) => {
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
    handleSelectionChange(val) {
      this.selectedGroup = val;
      this.selectGroup(val);
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
    recipient() {
      this.$refs.multipleTable.clearSelection();
      this.selectedGroup = this.recipient;
      // for (var i = 0; i < this.selectedGroup.length; i++) {
      // this.$refs.multipleTable.toggleRowSelection(this.selectedGroup[i]);
      // }
    },
    random() {
      this.$refs.multipleTable.clearSelection();
      this.selectedGroup = [];
      this.pageNo = 1;
      this.listSearch();
    }
  }
};
</script>
