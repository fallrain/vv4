<template>
  <div>
    <el-dialog
      title="添加权益"
      ref="userDialog"
      :visible.sync="display"
      custom-class="edit-role right-dialog"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <el-tabs v-model="rightsType" type="card" @tab-click="rightHandleClick">
        <el-tab-pane label="内部权益" name="1">
          <el-table
            :data="rightMsgListData.entities"
            ref="multipleTable"
            style="width: 100%"
            @selection-change="rightHandleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="rightsName" label="权益名称" min-width="18%"> </el-table-column>
            <el-table-column prop="time" label="有效期" min-width="40%">
              <template slot-scope="scope">
                <!-- <el-radio-group v-model="scope.row.useFrequency"> -->
                <!-- <el-radio :label="1">不限</el-radio> -->
                <!-- <el-radio :label="-1"> -->
                限制
                <el-input
                  v-model="scope.row.validNum"
                  style="width: 60px;"
                  :maxlength="5"
                  @keyup.native="rightValidNumChange(scope.row.validNum, scope.row.index)"
                ></el-input>

                <el-select v-model="scope.row.validType" style="width: 120px;">
                  <el-option label="年" value="1"></el-option>
                  <el-option label="月" value="3"></el-option>
                  <el-option label="日" value="5"></el-option>
                </el-select>
                <!-- </el-radio> -->
                <!-- </el-radio-group> -->
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="使用频率"
              min-width="40%"
              @selection-change="rightHandleSelectionChange"
            >
              <template slot-scope="scope">
                <!-- <el-radio-group v-model="rank.useFrequency"> -->
                <!-- <el-radio :label="1">不限</el-radio> -->
                <!-- <el-radio :label="-1"> -->
                限制

                <el-select v-model="scope.row.useFrequencyType" style="width: 120px;">
                  <el-option label="每年" value="1"></el-option>
                  <el-option label="每季度" value="2"></el-option>
                  <el-option label="每月" value="3"></el-option>
                  <el-option label="每周" value="4"></el-option>
                  <el-option label="每天" value="5"></el-option>
                </el-select>

                <el-input
                  v-model="scope.row.useNum"
                  style="width: 60px;"
                  :maxlength="5"
                  @keyup.native="rightUseNumChange(scope.row.useNum, scope.row.index)"
                ></el-input>

                次
                <!-- </el-radio> -->
                <!-- </el-radio-group> -->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="rightHandleSizeChange"
            @current-change="rightHandleCurrentChange"
            border
            :current-page.sync="rightPageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="rightPageSize"
            layout="sizes, prev, pager, next"
            :total="rightMsgListData.entityCount"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="外部权益" name="2">
          <el-table :data="rightMsgListData.entities" style="width: 100%">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="rightsName" label="权益名称" min-width="18%"> </el-table-column>
            <el-table-column prop="time" label="有效期" min-width="40%">
              <template slot-scope="scope">
                <!-- <el-radio-group v-model="scope.row.useFrequency"> -->
                <!-- <el-radio :label="1">不限</el-radio> -->
                <!-- <el-radio :label="-1"> -->
                限制
                <el-input
                  v-model="scope.row.validNum"
                  style="width: 60px;"
                  :maxlength="5"
                  @keyup.native="rightValidNumChange(scope.row.validNum, scope.row.index)"
                ></el-input>

                <el-select v-model="scope.row.validType" placeholder="请选择频率" style="width: 120px;">
                  <el-option label="每年" value="1"></el-option>
                  <el-option label="每月" value="3"></el-option>
                  <el-option label="每天" value="5"></el-option>
                </el-select>
                <!-- </el-radio> -->
                <!-- </el-radio-group> -->
              </template>
            </el-table-column>
            <el-table-column prop="time" label="使用频率" min-width="40%">
              <template slot-scope="scope">
                <!-- <el-radio-group v-model="rank.useFrequency"> -->
                <!-- <el-radio :label="1">不限</el-radio> -->
                <!-- <el-radio :label="-1"> -->
                限制
                <el-select v-model="scope.row.useFrequencyType" placeholder="请选择频率" style="width: 120px;">
                  <el-option label="每年" value="1"></el-option>
                  <el-option label="每季度" value="2"></el-option>
                  <el-option label="每月" value="3"></el-option>
                  <el-option label="每周" value="4"></el-option>
                  <el-option label="每天" value="5"></el-option>
                </el-select>

                <el-input
                  v-model="scope.row.useNum"
                  style="width: 60px;"
                  :maxlength="5"
                  @keyup.native="rightUseNumChange(scope.row.useNum, scope.row.index)"
                ></el-input>
                次
                <!-- </el-radio> -->
                <!-- </el-radio-group> -->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="rightHandleSizeChange"
            @current-change="rightHandleCurrentChange"
            border
            :current-page.sync="rightPageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="rightPageSize"
            layout="sizes, prev, pager, next"
            :total="rightMsgListData.entityCount"
          >
          </el-pagination>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ['dialogChange', 'form', 'random', 'dialogDisplay', 'closeDialog'],
  data() {
    return {
      rightsType: '1',
      rightMsgListData: [],
      rightPageNo: 1,
      rightLoading: false,
      rightPageSize: 10,
      rightSelectedGroup: [],
      rightIdsAndEmails: [],
      display: false,
      rightIdsArr: []
    };
  },
  mounted() {
    this.rightSelectedGroup = [];
    this.rightListSearch();
    this.display = this.dialogDisplay;
  },
  methods: {
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
    // insertVipMembersGroup: function () {
    //   this.requestVip.insertVipMembersGroup(data).then(function (data) {
    //     self.rightMsgListData = data
    //     self.rightLoading = false
    //   })
    // },
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
      console.log(group);
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
    // handleIconClick: function () {

    // },
    // removeGroup: function (row) {
    //   this.$refs.multipleTable.toggleRowSelection(row);
    // },
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
              useNum: this.rightMsgListData.entities[i].useNum // 结合useFrequencyType使用表示次数
            });
          }
        }
      }

      if (this.rightIdsAndEmails.length > 0) {
        this.rightSave(this.rightIdsAndEmails);
      }
    },
    rightSave(addRights) {
      const self = this;
      const data = JSON.parse(JSON.stringify(self.form));
      data.addRights = addRights;
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

      self.requestVip.setRight(data).then((data) => {
        self.$message({
          type: 'success',
          message: '添加成功!'
        });
        self.closeDialog();
      });
    }
  },
  watch: {
    random() {
      // 每次打开清楚上次选择项
      if (this.$refs.multipleTable) {
        this.$refs.multipleTable.clearSelection();
        // this.rightSelectedGroup = this.recipient
        // for (var i = 0; i < this.rightSelectedGroup.length; i++) {
        // this.$refs.multipleTable.toggleRowSelection(this.rightSelectedGroup[i]);
        // }
      }
      this.rightListSearch();
    },
    dialogDisplay(curVal) {
      this.display = this.dialogDisplay;
    }
  }
};
</script>
