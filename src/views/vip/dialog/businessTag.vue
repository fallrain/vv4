<template>
  <div>
    <el-dialog
      title="选择业务标签"
      ref="userDialog"
      :visible.sync="display"
      custom-class="edit-role"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <!-- <div class="selected-group">
        <span>已选分组</span>
        <p v-for="group in selectedGroup"><span>{{group.groupName}}</span><a href="javascript:;" @click="removeGroup(group)"><i class="iconfont icon-guanbi1"></i></a></p>
      </div> -->
      <!-- <el-input placeholder="输入分组名检索" icon="search" v-model="searchName" :on-icon-click="handleIconClick" style="width: 300px;margin:10px 0;"> </el-input> -->
      <el-table
        ref="multipleTable"
        :data="msgListData.entities"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" reserve-selection> </el-table-column>
        <el-table-column prop="tagName" label="标签名称" min-width="40%"> </el-table-column>
        <el-table-column prop="tagDesc" label="内容描述" min-width="55%"> </el-table-column>
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

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="dialogChange(groupIdsAndEmails)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ['dialogChange', 'form', 'random', 'dialogDisplay', 'closeDialog', 'site'],
  data() {
    return {
      searchName: '',
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      selectedGroup: [],
      groupIdsAndEmails: [],
      display: false
    };
  },
  mounted() {
    this.selectedGroup = [];
    this.listSearch();
    this.display = this.dialogDisplay;
  },
  methods: {
    listSearch() {
      const self = this;

      const data = {
        pageNum: self.pageNo,
        pageSize: self.pageSize
      };

      this.msgListLoading = true;
      this.requestVip.queryCustomer(data).then((data) => {
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
    handleSelectionChange(group) {
      this.selectedGroup = group;

      const self = this;
      const { recipient } = this;
      this.recipient = group;

      for (var i = 0; i < group.length; i++) {
        group[i].selected = false;
      }

      const groups = [];
      for (var i = 0; i < group.length; i++) {
        if (!group[i].selected) {
          group[i].label = `标签${group[i].id}:${group[i].tagName}`;

          groups.push(group[i].label);
        }
      }

      this.groupIdsAndEmails = this.groupIdsAndEmails.concat(groups);

      const groupIdsAndEmails = [];
      for (var i = 0; i < this.groupIdsAndEmails.length; i++) {
        if (
          ($.inArray(this.groupIdsAndEmails[i], groups) >= 0 || this.groupIdsAndEmails[i].indexOf('标签') < 0)
          && $.inArray(self.groupIdsAndEmails[i], groupIdsAndEmails) < 0
        ) {
          groupIdsAndEmails.push(self.groupIdsAndEmails[i]);
        }
      }

      this.groupIdsAndEmails = groupIdsAndEmails;
    },
    handleIconClick() {},
    removeGroup(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  },
  watch: {
    random() {
      // 每次打开清楚上次选择项
      if (this.$refs.multipleTable) {
        this.$refs.multipleTable.clearSelection();
        // this.selectedGroup = this.recipient
        // for (var i = 0; i < this.selectedGroup.length; i++) {
        // this.$refs.multipleTable.toggleRowSelection(this.selectedGroup[i]);
        // }
      }
    },
    dialogDisplay(curVal) {
      this.display = this.dialogDisplay;
    }
  }
};
</script>
