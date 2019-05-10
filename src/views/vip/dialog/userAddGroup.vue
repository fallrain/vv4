<template>
  <div>
    <el-dialog
      title="选择用户分组"
      ref="userDialog"
      :visible.sync="display"
      custom-class="edit-role"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <el-tabs v-model="groupTags" type="card">
        <el-tab-pane label="新建分组" name="new">
          <el-form ref="form" :model="groupForm" :rules="rules" label-width="80px">
            <el-form-item label="分组名称" prop="groupName">
              <el-input v-model="groupForm.groupName" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="分组描述" prop="groupDesc">
              <el-input type="textarea" v-model="groupForm.groupDesc"></el-input>
            </el-form-item>
            <el-form-item label="生效时间">
              <el-date-picker
                v-model="groupForm.dateRange"
                type="daterange"
                placeholder="选择日期范围"
                :editable="false"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item style="text-align: right">
              <el-button @click="closeDialog">取 消</el-button>
              <el-button type="primary" @click="groupAdd">确 定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="选择分组" name="list">
          <div v-loading="msgListLoading">
            <el-input
              placeholder="输入分组名检索"
              icon="search"
              v-model="whereCondition"
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
              <el-table-column prop="groupName" label="分组名" min-width="99%"> </el-table-column>
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
            <div class="dialog-footer" style="margin-top: 20px">
              <el-button @click="closeDialog">取 消</el-button>
              <el-button type="primary" @click="selectGroup">确 定</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import gUtils from '../../../utils/gUtils.js';

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
      whereCondition: '',
      groupForm: {
        groupName: '', // 模板名称
        groupDesc: '',
        dateRange: []
      },
      rules: {
        groupName: [
          {
            required: true, validator: isNotEmpty, trigger: 'blur', message: '请输入分组名称'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ],
        groupDesc: [
          {
            required: true, validator: isNotEmpty, message: '请输入分组描述', trigger: 'blur'
          },
          { max: 200, message: '长度不可超过200个字符', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.selectedGroup = [];
    // this.listSearch()
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
        pageSize: self.pageSize,
        isOnline: self.form.type || 1, // self.isOnline == '线上' ? 1:2
        whereCondition: self.whereCondition
      };

      this.msgListLoading = true;
      this.requestVip.queryGroup(data).then((data) => {
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
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    removeGroup(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 新增分组
    groupAdd() {
      const self = this;
      const data = JSON.parse(JSON.stringify(this.groupForm));

      data.startTimeString = gUtils.dateFormat(Date.parse(data.dateRange[0]), 'yyyy-MM-dd HH:mm:ss');
      data.endTimeString = gUtils.dateFormat(Date.parse(data.dateRange[1]), 'yyyy-MM-dd HH:mm:ss');
      data.isOnline = self.form.type || 1;

      this.$refs.form.validate((valid) => {
        if (valid) {
          this.requestVip.insertVipMembersGroup(data).then((group) => {
            if (group.id) {
              self.save(`${group.id}`);
            }
          });
        }
      });
    },
    // 选择分组
    selectGroup() {
      if (this.groupIdsAndEmails.length > 0) {
        this.save(this.groupIdsAndEmails.join(';'));
      }
    },
    // 用户添加分组
    save(addGroupIds) {
      const self = this;
      if (typeof self.form === 'object') {
        const data = JSON.parse(JSON.stringify(self.form));
        data.addGroupIds = addGroupIds;
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

        // console.log(JSON.parse($('#group-filter').html()).join(' & '))
        data.filter = JSON.parse($('#group-filter').html()).join(' & ');

        self.requestVip.setGroup(data).then((data) => {
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
          groupIds: addGroupIds.replace(/\;/g, ',')
        };
        self.requestVip.setMemberGroup(data).then((data) => {
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
      console.log(9999);
      if (this.$refs.multipleTable) {
        this.$refs.multipleTable.clearSelection();
      }
      this.pageNo = 1;
      this.pageSize = 10;
      this.listSearch();
      this.groupForm = {
        groupName: '', // 模板名称
        groupDesc: '',
        dateRange: []
      };
    },
    dialogDisplay(curVal) {
      this.display = this.dialogDisplay;
    }
  }
};
</script>
