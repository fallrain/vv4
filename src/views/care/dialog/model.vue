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
      <el-radio-group v-if="type == 4" v-model="msgType" @change="typeChange" style="margin-top: 10px;">
        <el-radio-button label="图文消息"></el-radio-button>
        <el-radio-button label="模板消息"></el-radio-button>
      </el-radio-group>
      <el-input
        placeholder="输入标题检索"
        icon="search"
        v-model="searchName"
        :class="{ fr: type == 4 }"
        :on-icon-click="handleIconClick"
        @keyup.enter.native="handleIconClick"
        style="width: 300px;margin:10px 0;"
      >
      </el-input>
      <a
        v-if="type == 1"
        href="./#/service/sendnotice"
        class="color-link"
        style="margin-left:10px;"
        target="_blank"
        @click="closeDialog"
        >新建邮件模板</a
      >
      <a
        v-if="type == 2"
        href="./#/communication/sitemsgtemplate?templateType=2"
        class="color-link"
        style="margin-left:10px;"
        target="_blank"
        @click="closeDialog"
        >新建站内信模板</a
      >
      <a
        v-if="type == 3"
        href="./#/communication/msgtemplate?templateType=2"
        class="color-link"
        style="margin-left:10px;"
        target="_blank"
        @click="closeDialog"
        >新建短信模板</a
      >
      <a
        v-if="type == 4 && msgType == '图文消息'"
        href="./#/communication/wechatgraphic"
        class="color-link"
        style="margin-left:10px;vertical-align: -webkit-baseline-middle;"
        target="_blank"
        @click="closeDialog"
        >新建微信模板</a
      >
      <a
        v-if="type == 4 && msgType == '模板消息'"
        href="./#/communication/wechattemplate"
        class="color-link"
        style="margin-left:10px;vertical-align: -webkit-baseline-middle;"
        target="_blank"
        @click="closeDialog"
        >新建微信模板</a
      >
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
        <el-table-column prop="templateName" label="模板标题" min-width="95%"> </el-table-column>
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
    typeChange() {
      this.pageNo = 1;
      this.pageSize = 10;
      this.listSearch();
    },
    listSearch() {
      const self = this;

      if (self.type == 1) {
        const data = {
          pageNo: self.pageNo,
          pageSize: self.pageSize,
          whereCondition: self.searchName
        };

        this.msgListLoading = true;
        this.requestService.listCustomerEmail(data).then((data) => {
          self.msgListData = data;
          self.msgListLoading = false;
        });
      } else {
        const data = {
          pageNo: self.pageNo,
          pageSize: self.pageSize,
          type: self.type,
          name: self.searchName,
          msgType: self.msgType == '图文消息' ? 2 : 1
        };

        this.msgListLoading = true;
        this.requestCare.getModel(data).then((data) => {
          self.msgListData = data;
          self.msgListLoading = false;
        });
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
    },
    handleSelectionChange(selection, row) {
      if (row) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(row);
        this.selectModel = row;
        // this.selectedModel(this.type, row)
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
    },
    go() {
      const _this = this;
      console.log(_this.type);
      if (_this.type == 1) {
        // _this.$router.push({
        //   path: "/service/addgroup",
        // });
        window.open('#/service/addgroup');
      } else if (_this.type == 4) {
        // _this.$router.push({
        //   path: "/vip/addvipgroup",
        // });
        window.open('#/communication/wechattemplate');
      } else if (_this.type == 3) {
        // _this.$router.push({
        //   path: "/vip/addvipgroup",
        // });
        window.open('#/communication/msgtemplate?templateType=2');
      } else if (_this.type == 2) {
        // _this.$router.push({
        //   path: "/vip/addvipgroup",
        // });
        window.open('#/communication/sitemsgtemplate?templateType=2');
      }
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
