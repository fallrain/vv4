<template>
  <div>
    <div class="selected-group">
      <span>已选分组</span>
      <p v-for="group in selectedGroup">
        <span>{{ group.groupName }}</span
        ><a href="javascript:;" @click="removeGroup(group)"><i class="iconfont icon-guanbi1"></i></a>
      </p>
    </div>
    <el-input
      placeholder="输入分组名检索"
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
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="groupName" label="分组名称" min-width="33%"> </el-table-column>
      <el-table-column prop="crUserId" label="创建人" min-width="33%"> </el-table-column>
      <el-table-column prop="crTime" label="创建时间" min-width="33%"> </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      border
      :current-page.sync="pageNo"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="msgListData.pageCount"
    >
    </el-pagination>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ['selectGroup', 'recipient'],
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
      this.requestCare.queryMemberGroup(data).then((data) => {
        console.log(data);
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
      for (let i = 0; i < this.selectedGroup.length; i++) {
        this.$refs.multipleTable.toggleRowSelection(this.selectedGroup[i]);
      }
    }
  }
};
</script>
