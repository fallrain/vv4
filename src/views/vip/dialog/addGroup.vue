<template>
  <div>
    <el-dialog
      title="会员筛选"
      ref="userDialog"
      :visible.sync="display"
      custom-class="edit-role"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <p style="margin-bottom: 15px">本次筛选共有：{{ memberCount }}人</p>
      <!-- <el-tabs v-if="memberCount > 0" v-model="operation" type="card"> -->
      <!-- <el-tab-pane label="添加分组" name="group"> -->
      <el-tabs v-model="groupTags">
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
              <el-button type="primary" @click="groupAdd">添加到分组</el-button>
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
              max-height="200"
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
              <el-button type="primary" @click="selectGroup">添加到分组</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- </el-tab-pane>
        <el-tab-pane v-if="form.type == 1" label="添加权益" name="right">
          <el-tabs v-model="rightsType" @tab-click="rightHandleClick">
            <el-tab-pane label="内部权益" name="1">
              <div v-loading="rightLoading">
                <el-table :data="rightMsgListData.entities" ref="multipleTable" style="width: 100%" @selection-change="rightHandleSelectionChange">
                  <el-table-column type="selection" width="50"> </el-table-column>
                  <el-table-column prop="rightsName" label="权益名称" width="100" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="time" label="" width="240">
                    <template slot-scope="scope">
                          限制
                          <el-input v-model="scope.row.validNum" style="width: 60px;" :maxlength="5" @keyup.native="rightValidNumChange(scope.row.validNum, scope.row.index)"></el-input>
                          <el-select v-model="scope.row.validType" style="width: 120px;">
                            <el-option label="年" value="1"></el-option>
                            <el-option label="月" value="3"></el-option>
                            <el-option label="日" value="5"></el-option>
                          </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="time" label="" @selection-change="rightHandleSelectionChange">
                    <template slot-scope="scope">
                          <div v-if="scope.row.type == 1">
                            限制
                            <el-select v-model="scope.row.useFrequencyType" style="width: 120px;">
                              <el-option label="每年" value="1"></el-option>
                              <el-option label="每季度" value="2"></el-option>
                              <el-option label="每月" value="3"></el-option>
                              <el-option label="每周" value="4"></el-option>
                              <el-option label="每天" value="5"></el-option>
                            </el-select>
                            <el-input v-model="scope.row.useNum" style="width: 60px;" :maxlength="5" @keyup.native="rightUseNumChange(scope.row.useNum, scope.row.index)"></el-input>
                            次
                          </div>

                          <div v-if="scope.row.type == 2" class="right-product-category">
                            <el-select v-model="scope.row.productCategory" placeholder="请选择适用产品类别" multiple style="width: 240px;">
                              <el-option v-for="item in proCategory" :label="item.productCategoryName" :value="item.id"></el-option>
                            </el-select>
                          </div>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination @size-change="rightHandleSizeChange" @current-change="rightHandleCurrentChange" border :current-page.sync="rightPageNo" :page-sizes="[10, 20, 50, 100]" :page-size="rightPageSize" layout="sizes, prev, pager, next" :total="rightMsgListData.entityCount">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="外部权益" name="2">
              <div v-loading="rightLoading">
                <el-table :data="rightMsgListData.entities" style="width: 100%">
                  <el-table-column type="selection" width="50"> </el-table-column>
                  <el-table-column prop="rightsName" label="权益名称" width="100">
                  </el-table-column>
                  <el-table-column prop="time" label="" width="240">
                    <template slot-scope="scope">
                          限制
                        <el-input v-model="scope.row.validNum" style="width: 60px;" :maxlength="5" @keyup.native="rightValidNumChange(scope.row.validNum, scope.row.index)"></el-input>
                          <el-select v-model="scope.row.validType" placeholder="请选择频率" style="width: 120px;">
                            <el-option label="每年" value="1"></el-option>
                            <el-option label="每月" value="3"></el-option>
                            <el-option label="每天" value="5"></el-option>
                          </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="time" label="">
                    <template slot-scope="scope">
                          <div v-if="scope.row.type == 1">
                            限制
                            <el-select v-model="scope.row.useFrequencyType" style="width: 120px;">
                              <el-option label="每年" value="1"></el-option>
                              <el-option label="每季度" value="2"></el-option>
                              <el-option label="每月" value="3"></el-option>
                              <el-option label="每周" value="4"></el-option>
                              <el-option label="每天" value="5"></el-option>
                            </el-select>
                            <el-input v-model="scope.row.useNum" style="width: 60px;" :maxlength="5" @keyup.native="rightUseNumChange(scope.row.useNum, scope.row.index)"></el-input>
                            次
                          </div>

                          <div v-if="scope.row.type == 2" class="right-product-category">
                            <el-select v-model="scope.row.productCategory" placeholder="请选择适用产品类别" multiple style="width: 240px;">
                              <el-option v-for="item in proCategory" :label="item.productCategoryName" :value="item.id"></el-option>
                            </el-select>
                          </div>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination @size-change="rightHandleSizeChange" @current-change="rightHandleCurrentChange" border :current-page.sync="rightPageNo" :page-sizes="[10, 20, 50, 100]" :page-size="rightPageSize" layout="sizes, prev, pager, next" :total="rightMsgListData.entityCount">
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>

          <div class="dialog-footer" style="margin-top: 20px">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="saveRight">确 定</el-button>
          </div>
        </el-tab-pane>
      </el-tabs> -->
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import gUtils from '../../../utils/gUtils.js';

export default {
  props: ['dialogChange', 'form', 'random', 'dialogDisplay', 'closeDialog', 'memberCount'],
  data() {
    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };
    return {
      operation: 'group',
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
            required: true,
            validator: isNotEmpty,
            trigger: 'blur',
            message: '请输入分组名称'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ],
        groupDesc: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入分组描述',
            trigger: 'blur'
          },
          { max: 200, message: '长度不可超过200个字符', trigger: 'blur' }
        ]
      },
      rightsType: '1',
      rightMsgListData: [],
      rightPageNo: 1,
      rightLoading: false,
      rightPageSize: 10,
      rightSelectedGroup: [],
      rightIdsAndEmails: [],
      display: false,
      rightIdsArr: [],
      proCategory: []
    };
  },
  mounted() {
    this.selectedGroup = [];
    this.listSearch();
    this.display = this.dialogDisplay;

    const self = this;
    this.requestCare.getAllProductCategory({}).then((data) => {
      if (data) {
        self.proCategory = data;
      }
    });
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
              self.save(`${group.id}`, 'group');
            }
          });
        }
      });
    },
    // 选择分组
    selectGroup() {
      if (this.groupIdsAndEmails.length > 0) {
        this.save(this.groupIdsAndEmails.join(';'), 'group');
      }
    },
    // 用户添加分组
    save(addGroupIds, type) {
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
            for (const j in data.queryParam.tagIdsArr[i].id) {
              tagIdsArr.push(data.queryParam.tagIdsArr[i].id[j].id);
            }
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

        if (type == 'group') {
          data.filter = $('#group-filter')
            .html()
            .split(',')
            .join(' & ');
          self.requestVip.setGroup(data).then((data) => {
            if (data) {
              self.$message({
                type: 'success',
                message: '添加成功!'
              });
              self.closeDialog();
            }
          });
        } else if (type == 'right') {
          self.requestVip.setRight(data).then((data) => {
            self.$message({
              type: 'success',
              message: '添加成功!'
            });
            self.closeDialog();
          });
        }
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
    },
    rightHandleClick() {
      this.rightListSearch();
    },
    rightValidNumChange(data, i) {
      // console.log(data)
      data += '';
      data = data.replace(/\D/g, '');
      this.rightMsgListData.entities[i].validNum = data;
    },
    rightUseNumChange(data, i) {
      // console.log(data)
      data += '';
      data = data.replace(/\D/g, '');
      this.rightMsgListData.entities[i].useNum = data;
    },
    rightListSearch() {
      const self = this;

      const data = {
        pageNo: self.rightPageNo,
        pageSize: self.rightPageSize,
        rightsType: self.rightsType
        // status: self.form.status == 0 ? '' : self.form.status,
      };

      this.rightLoading = true;
      this.requestCare.query(data).then((data) => {
        if (data.entities) {
          for (let i = 0; i < data.entities.length; i++) {
            data.entities[i].validType = '';
            data.entities[i].validNum = '';
            data.entities[i].useFrequencyType = '';
            data.entities[i].useNum = '';
            data.entities[i].index = i;
            data.entities[i].productCategory = [];
          }
          self.rightMsgListData = data;
          self.rightLoading = false;
        } else {
          self.rightMsgListData = [];
          self.rightLoading = false;
        }
      });
    },
    rightHandleSizeChange(pageSize) {
      if (!this.rightLoading) {
        this.rightPageNo = 1;
        this.rightPageSize = pageSize;
        this.rightListSearch();
      }
    },
    rightHandleCurrentChange(pageNo) {
      if (!this.rightLoading) {
        this.rightPageNo = pageNo;
        this.rightListSearch();
      }
    },
    rightHandleSelectionChange(group) {
      this.rightSelectedGroup = group;

      const self = this;
      const { recipient } = this;
      this.recipient = group;

      for (var i = 0; i < group.length; i++) {
        group[i].selected = false;
      }

      const groups = [];
      for (var i = 0; i < group.length; i++) {
        if (!group[i].selected) {
          group[i].label = {
            rightId: group[i].id,
            validNum: group[i].validNum, // 有效期几年/几月/几日 数字
            validType: group[i].validType, // 1-每年  3-每月 5-每日
            useFrequencyType: group[i].useFrequencyType, // 1-每年  2-每季度 3-每月 4-每周 5每日
            useNum: group[i].useNum // 结合useFrequencyType使用表示次数
          };

          groups.push(group[i].label);
        }
      }

      // this.rightIdsAndEmails = this.rightIdsAndEmails.concat(groups)

      // var rightIdsAndEmails = []
      // for (var i = 0; i < this.rightIdsAndEmails.length; i++) {
      //   if (($.inArray(this.rightIdsAndEmails[i], groups) >= 0) && $.inArray(self.rightIdsAndEmails[i], rightIdsAndEmails) < 0) {
      //     rightIdsAndEmails.push(self.rightIdsAndEmails[i])
      //   }
      // }

      // this.rightIdsAndEmails = rightIdsAndEmails

      this.rightIdsArr = this.rightIdsArr.concat(groups);

      const rightIdsArr = [];
      for (var i = 0; i < this.rightIdsArr.length; i++) {
        if ($.inArray(this.rightIdsArr[i], groups) >= 0 && $.inArray(self.rightIdsArr[i], rightIdsArr) < 0) {
          rightIdsArr.push(self.rightIdsArr[i]);
        }
      }

      this.rightIdsArr = rightIdsArr;
    },
    saveRight() {
      this.rightIdsAndEmails = [];
      for (let i = 0; i < this.rightMsgListData.entities.length; i++) {
        for (let j = 0; j < this.rightIdsArr.length; j++) {
          if (this.rightIdsArr[j].rightId == this.rightMsgListData.entities[i].id) {
            this.rightIdsAndEmails.push({
              rightId: this.rightMsgListData.entities[i].id,
              validNum: this.rightMsgListData.entities[i].validNum, // 有效期几年/几月/几日 数字
              validType: this.rightMsgListData.entities[i].validType, // 1-每年  3-每月 5-每日
              useFrequencyType: this.rightMsgListData.entities[i].useFrequencyType, // 1-每年  2-每季度 3-每月 4-每周 5每日
              useNum: this.rightMsgListData.entities[i].useNum, // 结合useFrequencyType使用表示次数
              productCategory: this.rightMsgListData.entities[i].productCategory.join(',') // 延保商品大类
            });
          }
        }
      }

      if (this.rightIdsAndEmails.length > 0) {
        this.save(this.rightIdsAndEmails, 'right');
      }
    }
  },
  watch: {
    random() {
      // 每次打开清楚上次选择项
      if (this.$refs.multipleTable) {
        this.$refs.multipleTable.clearSelection();
      }
      this.pageNo = 1;
      this.pageSize = 10;
      this.rightPageNo = 1;
      this.rightPageSize = 10;
      this.listSearch();
      this.rightListSearch();
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
