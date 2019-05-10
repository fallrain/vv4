<template>
  <div>
    <div class="selected-group">
      <span>已选分组</span>
      <p v-for="group in selectedGroup" v-if="group">
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
      max-height="300"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" reserve-selection> </el-table-column>
      <el-table-column prop="groupName" label="分组名称" min-width="25%" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="userList" label="人数" min-width="25%">
        <template scope="scope">
          <span v-if="scope.row.userList">{{ scope.row.userList.length }}</span>
          <span v-if="!scope.row.userList">0</span>
        </template>
      </el-table-column>
      <el-table-column prop="crUserName" label="创建人" min-width="25%"> </el-table-column>
      <el-table-column prop="crTime" label="创建时间" min-width="25%"> </el-table-column>
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
  props: ['selectGroup', 'random'],
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
    },
    handleSelectionChange(selection) {
      this.selectedGroup = selection;
      this.selectGroup(selection);
    },
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    removeGroup(row) {
      this.$refs.multipleTable.toggleRowSelection(row, false);
    }
  },
  watch: {
    random() {
      this.$refs.multipleTable.clearSelection();
      // console.log(this.recipient)
      // this.selectedGroup = this.recipient
      // for (var i = 0; i < this.selectedGroup.length; i++) {
      //   this.$refs.multipleTable.toggleRowSelection(this.selectedGroup[i]);
      // }
    }
  }
};
</script>
