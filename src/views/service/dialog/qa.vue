<template>
  <div>
    <el-dialog title="选择模板" ref="userDialog" :visible.sync="display" custom-class="edit-role" :modal-append-to-body="false" @close="closeDialog">
      <el-tabs v-model="categoryTab" type="card" @tab-click="tabChange">
        <el-tab-pane v-for="(item, index) in category" :key="item.id" :label="item.categoryName" :name="''+item.id"> </el-tab-pane>
      </el-tabs>
      <el-table ref="multipleTable" :data="msgListData.entities" border tooltip-effect="dark" max-height="300" @select="handleSelectionChange" @select-all="selectAll">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="question" label="常用内容">
          <template scope="scope">
              <p class="aq-desc">Q : {{scope.row.question}}</p>
              <p class="aq-desc">A : {{scope.row.answer}}</p>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" border :current-page.sync="pageNo" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="msgListData.entityCount">
      </el-pagination>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="selectedModel(selection)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  // props: ['selectedTemplate', 'autoInit'],
  props: ['dialogChange', 'type', 'random', 'dialogDisplay', 'closeDialog', 'selectedModel'],
  data() {
    return {
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      selectedGroup: [],
      display: false,
      selection: [],
      categoryTab: '',
      category: [],
    };
  },
  mounted() {
    this.selectedGroup = [];
    if (this.$refs.multipleTable) {
      this.$refs.multipleTable.clearSelection();
    }
    this.listSearch();
    this.queryQACategory();
    this.display = this.dialogDisplay;
  },
  methods: {
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        whereCondition: self.searchName,
        categoryId: self.categoryTab == 'all' ? '' : self.categoryTab
      };

      this.msgListLoading = true;
      this.requestService.queryQA(data).then((data) => {
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
      if (selection) {
        this.selection = selection;
      }
    },
    selectAll(selection, row) {
      if (selection) {
        this.selection = selection;
      }
    },
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    queryQACategory() {
      const self = this;
      self.requestService.queryQACategory({
        pageNo: 1,
        pageSize: 100,
      }).then((data) => {
        if (data) {
          const category = [{
            id: 'all',
            categoryName: '全部分类'
          }];
          self.category = category.concat(data.entities);
          self.categoryTab = 'all';
        }
      });
    },
    tabChange() {
      this.listSearch();
    }
  },
  watch: {
    random() {
      this.selectedGroup = [];
      if (this.$refs.multipleTable) {
        this.$refs.multipleTable.clearSelection();
      }
      this.listSearch();
      this.queryQACategory();
      this.display = this.dialogDisplay;
    },
    dialogDisplay() {
      this.display = this.dialogDisplay;
    }
  }
};

</script>
