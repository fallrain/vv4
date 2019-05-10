<template>
  <div>
    <el-dialog
      title="设置标签"
      ref="userDialog"
      :visible.sync="display"
      custom-class="edit-role"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <el-tabs v-model="groupTags" type="card">
        <el-tab-pane label="新建标签" name="new">
          <el-form :model="customer" ref="customer" :rules="rules" label-width="100px">
            <el-form-item label="标签名称" prop="tagName">
              <el-input v-model="customer.tagName" auto-complete="off" style="width: 320px;"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="tagDesc">
              <el-input type="textarea" v-model="customer.tagDesc" auto-complete="off" style="width: 320px;"></el-input>
            </el-form-item>
          </el-form>
          <div class="dialog-footer" style="margin-top: 20px;">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="insertVipMembersTag">确 定</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="选择标签" name="list">
          <div v-loading="msgListLoading">
            <el-table
              :data="msgListData.entities"
              ref="multipleTable"
              style="width: 100%"
              max-height="300"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="tagName" label="标签名称" min-width="20%"> </el-table-column>
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
          <div class="dialog-footer" style="margin-top: 20px">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="selectTags">确 定</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ['dialogChange', 'form', 'random', 'dialogDisplay', 'closeDialog'],
  data() {
    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };
    return {
      groupTags: 'new',
      searchName: '',
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      selectedGroup: [],
      groupIdsAndEmails: [],
      display: false,
      customer: {
        tagName: '', // 模板名称
        tagDesc: ''
      },
      rules: {
        tagName: [
          {
            required: true, validator: isNotEmpty, trigger: 'blur', message: '请输入标签名称'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ],
        tagDesc: [
          {
            required: true, validator: isNotEmpty, message: '请输入标签描述', trigger: 'blur'
          },
          { max: 200, message: '长度不可超过200个字符', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.selectedGroup = [];
    this.listSearch();
    this.display = this.dialogDisplay;
  },
  methods: {
    insertVipMembersGroup() {
      this.requestVip.insertVipMembersGroup(data).then((data) => {
        self.msgListData = data;
        self.msgListLoading = false;
      });
    },
    listSearch() {
      const self = this;

      const data = {
        pageNum: self.pageNo,
        pageSize: self.pageSize
      };

      this.msgListLoading = true;
      // this.requestVip.queryCustomer(data).then(function (data) {
      //   self.msgListData = data
      //   self.msgListLoading = false
      // })
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
          group[i].label = `${group[i].id}`;

          groups.push(group[i].label);
        }
      }

      this.groupIdsAndEmails = this.groupIdsAndEmails.concat(groups);

      const groupIdsAndEmails = [];
      for (var i = 0; i < this.groupIdsAndEmails.length; i++) {
        if (
          ($.inArray(this.groupIdsAndEmails[i], groups) >= 0 || this.groupIdsAndEmails[i].indexOf('分组') < 0)
          && $.inArray(self.groupIdsAndEmails[i], groupIdsAndEmails) < 0
        ) {
          groupIdsAndEmails.push(self.groupIdsAndEmails[i]);
        }
      }

      this.groupIdsAndEmails = groupIdsAndEmails;
    },
    handleIconClick() {},
    insertVipMembersTag() {
      const self = this;

      this.$refs.customer.validate((valid) => {
        if (valid) {
          this.requestVip
            .insertVipMembersTag({
              tagDesc: self.customer.tagDesc,
              tagName: self.customer.tagName
            })
            .then((data) => {
              if (data.id) {
                self.save(data.id);
              }
              // self.$message({
              //   type: 'success',
              //   message: '添加成功!'
              // });
            });
        }
      });
    },
    // 选择标签
    selectTags() {
      if (this.groupIdsAndEmails.length > 0) {
        this.save(this.groupIdsAndEmails.join(';'));
      }
    },
    save(addTagIds) {
      const self = this;
      if (typeof self.form === 'object') {
        const data = JSON.parse(JSON.stringify(self.form));
        data.addTagIds = addTagIds;
        data.pageNo = 1;
        data.pageSize = 15;

        // 清理基础标签id
        if (data.queryParam.tagIdsArr.length > 0) {
          const tagIdsArr = [];
          for (var i = 0; i < data.queryParam.tagIdsArr.length; i++) {
            tagIdsArr.push(data.queryParam.tagIdsArr[i].split(':')[0]);
          }
          const tagIds = tagIdsArr.join(';');
          data.queryParam.tagIds = tagIds;
        }

        // 清理业务标签
        if (data.queryParam.businessTagArr.length > 0) {
          const businessTagIdsArr = [];
          for (var i = 0; i < data.queryParam.businessTagArr.length; i++) {
            const groupName = data.queryParam.businessTagArr[i].split(':')[0];
            businessTagIdsArr.push(groupName.substr(2, groupName.length));
          }
          const businessTagIds = businessTagIdsArr.join(';');
          data.queryParam.businessTagIds = businessTagIds;
        }

        data.queryParam.hrActionContent = data.queryParam.hrActionContent.join(';');
        data.queryParam.caActionContent = data.queryParam.caActionContent.join(';');

        data.queryParam.hrRankId = data.queryParam.hrRankId.join(';');
        data.queryParam.caRankId = data.queryParam.caRankId.join(';');

        // 清理参数
        data.queryParam.hrGrowupValueContent = data.queryParam.hrGrowupValueContentArr[0].value != ''
          ? `${data.queryParam.hrGrowupValueContentArr[0].value};${data.queryParam.hrGrowupValueContentArr[1].value}`
          : '';
        data.queryParam.caGrowupValueContent = data.queryParam.caGrowupValueContentArr[0].value != ''
          ? `${data.queryParam.caGrowupValueContentArr[0].value};${data.queryParam.caGrowupValueContentArr[1].value}`
          : '';
        data.queryParam.hrIntegrateContent = data.queryParam.hrIntegrateContentArr[0].value != ''
          ? `${data.queryParam.hrIntegrateContentArr[0].value};${data.queryParam.hrIntegrateContentArr[1].value}`
          : '';
        data.queryParam.caIntegrateContent = data.queryParam.caIntegrateContentArr[0].value != ''
          ? `${data.queryParam.caIntegrateContentArr[0].value};${data.queryParam.caIntegrateContentArr[1].value}`
          : '';
        data.queryParam.hrBugProductAmountContent = data.queryParam.hrBugProductAmountContentArr[0].value != ''
          ? `${data.queryParam.hrBugProductAmountContentArr[0].value
          };${
            data.queryParam.hrBugProductAmountContentArr[1].value}`
          : '';
        data.queryParam.caBugProductAmountContent = data.queryParam.caBugProductAmountContentArr[0].value != ''
          ? `${data.queryParam.caBugProductAmountContentArr[0].value};${data.caBugProductAmountContentArr[1].value}`
          : '';
        data.queryParam.hrRegProductAmountContent = data.queryParam.hrRegProductAmountContentArr[0].value != ''
          ? `${data.queryParam.hrRegProductAmountContentArr[0].value
          };${
            data.queryParam.hrRegProductAmountContentArr[1].value}`
          : '';
        data.queryParam.caRegProductAmountContent = data.queryParam.caRegProductAmountContentArr[0].value != ''
          ? `${data.queryParam.caRegProductAmountContentArr[0].value
          };${
            data.queryParam.caRegProductAmountContentArr[1].value}`
          : '';

        delete data.queryParam.hrGrowupValueContentArr;
        delete data.queryParam.caGrowupValueContentArr;
        delete data.queryParam.hrIntegrateContentArr;
        delete data.queryParam.caIntegrateContentArr;
        delete data.queryParam.hrBugProductAmountContentArr;
        delete data.queryParam.caBugProductAmountContentArr;
        delete data.queryParam.hrRegProductAmountContentArr;
        delete data.queryParam.caRegProductAmountContentArr;
        delete data.queryParam.groupIdsArr;
        delete data.queryParam.tagIdsArr;
        delete data.queryParam.businessTagArr;

        for (const item in data.queryParam) {
          if (data.queryParam[item] == 0 || data.queryParam[item] == '') {
            delete data.queryParam[item];
          }
        }

        self.requestVip.setTag(data).then((data) => {
          if (data) {
            self.$message({
              type: 'success',
              message: '添加成功!'
            });
            self.closeDialog();
          }
        });
      } else {
        const data = {
          userId: self.form,
          businessTagIds: addTagIds.toString().replace(/\;/g, ',')
        };
        self.requestVip.setBusinessTag(data).then((data) => {
          if (data) {
            self.$message({
              type: 'success',
              message: '添加成功!'
            });
            self.closeDialog();
            self.dialogChange();
          }
        });
      }
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
      this.customer = {
        tagName: '', // 模板名称
        tagDesc: ''
      };
    },
    dialogDisplay(curVal) {
      this.display = this.dialogDisplay;
    }
  }
};
</script>
