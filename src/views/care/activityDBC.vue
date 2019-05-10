<template>
  <div style="background: #eff4f8;height: 100%;">
    <div class="step-line">
      <el-steps :active="4" finish-status="success" align-center center>
        <el-step v-if="!isEdit" title="创建活动"></el-step>
        <el-step v-if="isEdit" title="修改活动"></el-step>
        <el-step title="选择会员"></el-step>
        <el-step title="选择沟通渠道"></el-step>
        <el-step title="选择通知客服"></el-step>
        <el-step title="配置多波次"></el-step>
        <el-step title="活动创建完成"></el-step>
      </el-steps>
    </div>
    <div class="vip-content msg-template activity-flow" style="width:85%;float:left;padding:0">
      <div style="background:#fff;height:100%">
        <p class="template-brand" style="padding:20px 40px 10px"><i></i>通知波次设置</p>
        <div v-for="(node, $index) in flow" v-if="node.flowtype == 3" class="flow-node">
          <!---->
          <div style="display:inline-block">
            <div class="flow-col" style="float: left;width: 100%; display: inline-block;">
              <div style="float: left;width: 440px;display: inline-block;">
                <a href="javascript:;" class="a-flow-col color-link" @click="setDate" style="margin-left:10px;"
                  >设置发送时间</a
                >
                <span v-if="dbcactivityInfo.sendTime">{{
                  gUtils.dateFormat(dbcactivityInfo.sendTime, 'yyyy-MM-dd HH:mm:ss')
                }}</span>
              </div>
              <div style="float: left;width: 400px;display: inline-block;">
                <el-form ref="form" :model="form" :rules="rules" label-width="170px">
                  <div class="a-flow-col color-link" style="margin-left:40px; float: left;">发送次数</div>
                  <el-form-item prop="number" style="margin-bottom: 0;">
                    <el-input v-model="form.number" style="width: 100px;"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>

            <div class="flow-col" style="float: left;width: 100%; display: inline-block;">
              <div style="float: left;width: 440px;display: inline-block;">
                <a
                  href="javascript:;"
                  class="a-flow-col color-link"
                  @click="selectModel(3, $index)"
                  style="margin-left:10px;"
                  >短信模版</a
                >
                <el-tag
                  v-if="node.smsTemplate"
                  type="primary"
                  :closable="true"
                  @close="removeItem('smsTemplate', 0, $index)"
                  >{{ node.smsTemplate | nameFilter }}</el-tag
                >
              </div>
              <div style="float: left;width: 400px;display: inline-block;">
                <div class="a-flow-col color-link" style="margin-left:40px; float: left;">用户范围ID</div>
                <el-form ref="form" :model="form" :rules="rules" label-width="170px">
                  <el-form-item prop="userid" style="margin-bottom: 0;">
                    <el-input v-model="form.userid" style="width: 300px;"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>

            <div class="flow-col" style="width: 100%; display: inline-block;">
              <div class="a-flow-col color-link" style="margin-left:10px; float: left;">用户范围名称</div>
              <el-form ref="form" :model="form" :rules="rules" label-width="140px">
                <el-form-item prop="username">
                  <el-input v-model="form.username" style="width: 300px;"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>

        <div style="text-align: center;">
          <div style="display:inline-block;margin-right:20px;">
            <el-button v-if="isQdorKf == 2" type="primary" @click="goKf" style="background:#40dfa6;border-color:#40dfa6"
              >上一步</el-button
            >
            <el-button v-if="isQdorKf == 1" type="primary" @click="goQd" style="background:#40dfa6;border-color:#40dfa6"
              >上一步</el-button
            >
          </div>
          <div
            v-if="
              jurisdiction['marketingOperations:activityManager:save'] ||
                jurisdiction['marketingOperations:activityManager:edit']
            "
            style="display:inline-block;margin-right:20px;"
          >
            <el-button type="primary" @click="saveFlow">完成</el-button>
          </div>
          <div
            v-if="
              jurisdiction['marketingOperations:activityManager:save'] ||
                jurisdiction['marketingOperations:activityManager:edit']
            "
            style="display:inline-block;margin-right:20px;"
          >
            <el-button type="primary" @click="saveFlow('pause')" style="background:#7ebe26;border-color:#7ebe26"
              >暂存</el-button
            >
          </div>
          <!-- <div style="display:inline-block">
            <el-button type="primary" @click="pass" style="background:#b9b9b9;border-color:#b9b9b9">跳过</el-button>
          </div> -->
        </div>
        <el-dialog
          title="设置发送时间"
          :visible.sync="dbcactivityDate.dialogDisplay"
          size="387px"
          :before-close="dbcactivityDateDialogBeforeCloas"
          :modal-append-to-body="false"
          @close="dbcactivityDate.dialogDisplay = false"
        >
          <span>发送时间</span>
          <el-date-picker
            :picker-options="pickerOptions0"
            v-model="dbcactivityDate.sendTime"
            type="datetime"
            placeholder="选择日期时间"
            :editable="false"
            style="width: 270px;margin-left: 17px;"
          >
          </el-date-picker>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dbcactivityDateDialogBeforeCloas">取 消</el-button>
            <el-button type="primary" @click="dbcactivityDateDialogSave">保存</el-button>
          </span>
        </el-dialog>

        <select-customer-group
          :dialogChange="customerGroupDialogChange"
          :form="dbcactivityInfo.ids"
          :random="customerGroupDialog.random"
          :dialogDisplay="customerGroupDialog.display"
          :closeDialog="closeCustomerGroupDialog"
          :type="'kf'"
        ></select-customer-group>

        <select-model
          :type="modelDialog.type"
          :random="modelDialog.random"
          :dialogDisplay="modelDialog.display"
          :closeDialog="closeModelDialog"
          :selectedModel="selectedModel"
        ></select-model>

        <system-filter
          :random="filter.random"
          :dialogDisplay="filter.display"
          :closeDialog="closeFilterDialog"
          :selectedFilter="selectedFilter"
        ></system-filter>
      </div>
    </div>
    <div style="width:15%;float:right" class="plhy-right">
      <div class="group">
        <a class="i1" @click="open(1)" style="cursor:pointer">内容运营</a>
        <a class="i2" @click="open(2)" style="cursor:pointer">策略运营</a>
        <a class="i3" @click="open(3)" style="cursor:pointer">客服运营</a>
        <a class="i4" @click="open(4)" style="cursor:pointer">数据运营</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import selectGroup from './dialog/group.vue';
import selectCustomerGroup from './dialog/customerGroup.vue';
import selectModel from './dialog/model.vue';
import systemFilter from './dialog/filter.vue';
import gUtils from '../../utils/gUtils.js';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  components: {
    selectGroup,
    selectModel,
    systemFilter,
    selectCustomerGroup
  },
  data() {
    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      isEdit: false,
      isQdorKf: '',
      flowtype: 3,
      input: '',
      checkList: [],
      options: [
        {
          value: 1,
          label: '选择通知客服'
        },
        {
          value: 2,
          label: '批量会员选择'
        }
      ],
      value: '',
      scene: [],
      flow: [
        {
          flowtype: 3,
          activityId: '',
          sendTime: '',
          smsTemplate: ''
        }
      ],
      dbcactivityDate: {
        sendTime: '',
        dialogDisplay: false
      },
      dbcactivityInfo: {
        sendTime: '',
        ids: '',
        exceptGroupIds: ''
      },
      groupDialog: {
        display: false,
        random: Math.random()
      },
      exceptGroupDialog: {
        display: false,
        random: Math.random()
      },
      customerGroupDialog: {
        display: false,
        random: Math.random()
      },
      modelDialog: {
        type: 1,
        display: false,
        random: Math.random()
      },
      activityRank: {
        dialogDisplay: false,
        rank: [],
        selected: [],
        dialogSelected: [],
        count: 0
      },
      filter: {
        display: false,
        random: Math.random()
      },
      form: {
        number: '',
        userid: '',
        username: ''
      },
      rules: {
        number: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入发送次数',
            trigger: 'blur'
          },
          {
            max: 3,
            message: '发送次数不能超过999次',
            trigger: 'blur'
          }
        ],
        userid: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入用户范围ID',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '长度不可超过200个字符',
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入用户范围名称',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '长度不可超过200个字符',
            trigger: 'blur'
          }
        ]
      },
      selectNode: 0,
      curFlowtype: 1,
      isUpdate: false,
      isInit: true,
      isOnline: ''
    };
  },
  filters: {
    nameFilter(value) {
      value = `${value}`;
      if (value.indexOf(':') > 0) {
        value = value.split(':')[1];
      }
      return value;
    }
  },
  methods: {
    open(type) {
      const _this = this;
      _this
        .$confirm('将离开当前页面,是否暂存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          switch (type) {
            case 1:
              _this.$router.push({
                path: '/communication/wechatlist'
              });
              break;
            case 2:
              _this.$router.push({
                path: '/strategy/level'
              });
              break;
            case 3:
              _this.$router.push({
                path: '/service/personnel'
              });
              break;
            case 4:
              _this.$router.push({
                path: '/report/operation'
              });
              break;
          }
        })
        .catch(() => {});
    },
    removeNode(index) {
      this.flow.splice(index, 1);
    },
    removeItem(type, i, index) {
      if (type == 'group') {
        this.flow[index].ids.splice(i, 1);
      } else if (type == 'rank') {
        this.activityRank.selected.splice(i, 1);
        this.flow[index].rankIds = this.activityRank.selected.join(',');
      } else if (type == 'expGroup') {
        this.flow[index].exceptGroupIds.splice(i, 1);
      } else if (type == 'scene') {
        this.scene.splice(i, 1);
      } else if (type == 'smsTemplate') {
        this.flow[index].smsTemplate = '';
      }
    },
    goback() {
      history.go(-1);
    },
    addNode() {
      this.flow.push({
        flowtype: 3,
        activityId: '',
        chartIds: '',
        chartNames: '',
        multiWaveSendNum: '',
        sendTime: '',
        smsTemplate: ''
      });
    },
    // 变更首节点类型清空后面节点内容
    flowtypeChange(index, node) {
      if (!this.isInit) {
        if (index == 0 && node != 1) {
          const newArr = [];
          newArr.push({
            flowtype: node,
            activityId: '',
            chartIds: '',
            chartNames: '',
            multiWaveSendNum: '',
            sendTime: '',
            smsTemplate: ''
          });
          this.flow = newArr;
        }
      }
    },
    setDate() {
      this.dbcactivityDate.sendTime = '';
      this.dbcactivityDate.dialogDisplay = true;
    },
    selectRank() {
      const self = this;
      this.requestCare.getRankCnt().then((data) => {
        if (data) {
          self.activityRank.rank = data;
          self.activityRank.count = 0;
          self.activityRank.dialogSelected = [];
          // self.activityRank.selected = []

          self.activityRank.dialogDisplay = true;
        }
      });
    },
    randSelect() {
      let count = 0;
      const self = this;

      for (var i = 0; i < this.flow.length; i++) {
        if (this.flow[i].flowtype == 2) {
          const selectedRank = [];
          for (let j = 0; j < this.activityRank.selected.length; j++) {
            selectedRank.push(this.activityRank.selected[j].split(':')[0]);
          }
          this.flow[i].rankIds = selectedRank.join(',');
        }
      }

      for (var i = 0; i < self.activityRank.rank.length; i++) {
        if (
          $.inArray(
            `${self.activityRank.rank[i].rank}:${self.activityRank.rank[i].rankName}`,
            self.activityRank.dialogSelected
          ) >= 0
        ) {
          count += self.activityRank.rank[i].count;
        }
      }

      self.activityRank.count = count;
    },
    rankDialogClose(isSave) {
      this.activityRank.dialogDisplay = false;

      if (isSave) {
        this.activityRank.selected = this.activityRank.dialogSelected;
      }
    },
    dbcactivityDateDialogSave() {
      this.dbcactivityInfo.sendTime = this.dbcactivityDate.sendTime;
      this.dbcactivityDate.dialogDisplay = false;
    },
    dbcactivityDateDialogBeforeCloas() {
      this.dbcactivityDate.dialogDisplay = false;
    },
    activityRankDialogBeforeCloas() {
      this.activityRank.dialogDisplay = false;
    },
    groupDialogChange(group, isOnline) {
      this.groupDialog.display = false;
      for (let i = 0; i < this.flow.length; i++) {
        if (this.flow[i].flowtype == this.curFlowtype) {
          this.flow[i].ids = group;
        }
      }
      this.isOnline = isOnline;
    },
    closeGroupDialog() {
      this.groupDialog.display = false;
    },
    exceptGroupDialogChange(group) {
      this.exceptGroupDialog.display = false;
      for (let i = 0; i < this.flow.length; i++) {
        if (this.flow[i].flowtype == this.curFlowtype) {
          this.flow[i].exceptGroupIds = group;
        }
      }
    },
    closeExceptGroupDialog() {
      this.exceptGroupDialog.display = false;
    },
    customerGroupDialogChange(group) {
      this.customerGroupDialog.display = false;
      for (let i = 0; i < this.flow.length; i++) {
        if (this.flow[i].flowtype == this.curFlowtype) {
          this.flow[i].ids = group;
        }
      }
    },
    closeCustomerGroupDialog() {
      this.customerGroupDialog.display = false;
    },
    selectCustomerGroup(flowtype) {
      this.customerGroupDialog.display = true;
      this.customerGroupDialog.random = Math.random();

      this.curFlowtype = flowtype;
    },
    selectExceptGroup(flowtype) {
      this.exceptGroupDialog.display = true;
      this.exceptGroupDialog.random = Math.random();

      this.curFlowtype = flowtype;
    },
    selectGroup(flowtype) {
      this.groupDialog.display = true;
      this.groupDialog.random = Math.random();

      this.curFlowtype = flowtype;
    },
    selectModel(type, index) {
      this.modelDialog.type = type;
      this.modelDialog.display = true;
      this.modelDialog.random = Math.random();

      this.selectNode = index;
    },
    closeModelDialog() {
      this.modelDialog.display = false;
    },
    selectedModel(type, row) {
      const index = this.selectNode;
      if (row.id && row.templateName) {
        switch (type) {
          case 1:
            this.flow[index].emailTemplate = `${row.id}:${row.templateName}`;
            break;
          case 2:
            this.flow[index].siteMsgTemplate = `${row.id}:${row.templateName}`;
            break;
          case 3:
            this.flow[index].smsTemplate = `${row.id}:${row.templateName}`;
            break;
          case 4:
            this.flow[index].weChatTemplate = `${row.id}:${row.templateName}`;
            break;
        }
      }
      this.modelDialog.display = false;
    },
    systemFilter() {
      this.filter.display = true;
      this.filter.random = Math.random();
    },
    closeFilterDialog() {
      this.filter.display = false;
    },
    selectedFilter(selected) {
      this.filter.display = false;
      if (selected.id) {
        this.scene = [`${selected.id}:${selected.sceneName}`];
      }
    },
    saveFlow(type) {
      const self = this;
      const data = JSON.parse(JSON.stringify(this.flow));
      let dataIndex = '';
      for (let i = 0; i < data.length; i++) {
        if (data[i].flowtype == 3) {
          dataIndex = i;
          //            let idsArr = [];
          //            for (var j = 0; j < data[i].ids.length; j++) {
          //              idsArr.push(data[i].ids[j].split(":")[0]);
          //            }
          //            data[i].ids = idsArr.join(",");
          //
          //            if (data[i].ids == "") {
          //              self.$message({
          //                type: "warning",
          //                message: "请选择分组!"
          //              });
          //              return false;
          //            }
          console.log(self.dbcactivityInfo.sendTime);
          if (self.dbcactivityInfo.sendTime == '' || !self.dbcactivityInfo.sendTime == true) {
            self.$message({
              type: 'warning',
              message: '请设置发送时间!'
            });
            return false;
          }

          data[i].sendTime = gUtils.dateFormat(self.dbcactivityInfo.sendTime, 'yyyy-MM-dd HH:mm:ss');
          if (self.form.number == '') {
            self.$message({
              type: 'warning',
              message: '请输入发送次数!'
            });
            return false;
          }
          if (data[i].smsTemplate == '') {
            self.$message({
              type: 'warning',
              message: '请选择短信模板!'
            });
            return false;
          }
          if (self.form.userid == '') {
            self.$message({
              type: 'warning',
              message: '请输入用户范围ID!'
            });
            return false;
          }
          if (self.form.username == '') {
            self.$message({
              type: 'warning',
              message: '请输入用户范围名称!'
            });
            return false;
          }

          //            let exceptidsArr = [];
          //            for (var j = 0; j < data[i].exceptGroupIds.length; j++) {
          //              exceptidsArr.push(data[i].exceptGroupIds[j].split(":")[0]);
          //            }
          //            data[i].exceptGroupIds = exceptidsArr.join(",");

          data[i].smsTemplate = (`${data[i].smsTemplate}`).split(':')[0];
          data[i].flowtype = 3;
          data[i].multiWaveSendNum = self.form.number;
          data[i].chartNames = self.form.username;
          data[i].chartIds = self.form.userid;
        }
      }
      const params = data[dataIndex];

      params.activityId = self.$route.query.id;
      params.lastFlowFlag = 'last';

      if (!this.isUpdate) {
        this.requestCare.saveFlow(params).then((data) => {
          if (data) {
            if (type == 'pause') {
              self.$message({
                type: 'success',
                message: '暂存成功!'
              });
            } else {
              self.$router.push({
                path: '/activity/activityadded',
                query: {
                  id: self.$route.query.id,
                  fixNum: self.$route.query.fixNum
                }
              });
            }
          }
        });
      } else {
        this.requestCare.updateFlow(params).then((data) => {
          if (data) {
            if (type == 'pause') {
              self.$message({
                type: 'success',
                message: '暂存成功!'
              });
            } else {
              self.$router.push({
                path: '/activity/activityadded',
                query: {
                  id: self.$route.query.id,
                  fixNum: self.$route.query.fixNum
                }
              });
            }
          }
        });
      }
    },
    goKf() {
      this.$router.push({
        path: '/activity/activityKF',
        query: {
          id: this.$route.query.id,
          fixNum: this.$route.query.fixNum
        }
      });
    },
    goQd() {
      this.$router.push({
        path: '/activity/activityQD',
        query: {
          id: this.$route.query.id,
          fixNum: this.$route.query.fixNum
        }
      });
    },

    pass() {
      this.$router.push({
        path: '/activity/activityadded',
        query: {
          id: this.$route.query.id
        }
      });
    },
    reset() {
      this.activityRank = {
        dialogDisplay: false,
        rank: [],
        selected: [],
        dialogSelected: [],
        count: 0
      };
      this.flow = [
        {
          flowtype: 3,
          activityId: '',
          chartIds: '',
          chartNames: '',
          multiWaveSendNum: '',
          sendTime: '',
          smsTemplate: ''
        }
      ];
      this.scene = [];
    },
    listFlow() {
      const self = this;
      this.requestCare
        .listFlow({
          id: self.$route.query.id
        })
        .then((data) => {
          if (data && data.length > 0) {
            if (data.length == 1 && data[0].flowtype != 3) {
              data = [
                data[0],
                {
                  flowtype: 3,
                  activityId: '',
                  chartIds: '',
                  chartNames: '',
                  multiWaveSendNum: '',
                  sendTime: '',
                  smsTemplate: ''
                }
              ];
            } else if (data.length == 2 && data[0].flowtype != 3 && data[1].flowtype != 3) {
              data = [
                data[0],
                data[1],
                {
                  flowtype: 3,
                  activityId: '',
                  chartIds: '',
                  chartNames: '',
                  multiWaveSendNum: '',
                  sendTime: '',
                  smsTemplate: ''
                }
              ];
            }

            for (let i = 0; i < data.length; i++) {
              if (data[i].flowtype == 3 && data[i].multiWaveSendNum != '' && data[i].smsTemplate != '') {
                data[i].sendTime = `${data[i].sendTime}`;
                self.dbcactivityInfo.sendTime = `${data[i].sendTime}`;

                self.flow.activityId = data[i].activityId;
                self.form.number = data[i].multiWaveSendNum;
                self.form.userid = data[i].chartIds;
                self.form.username = data[i].chartNames;
                data[i].smsTemplate = `${data[i].smsTemplate}:${data[i].smsTemplateName}`;

                data[i].exceptGroupIds = data[i].exceptGroupIds || '';
                data[i].exceptGroupIdsName = data[i].exceptGroupIdsName || '';

                if (data[i].exceptGroupIds) {
                  const exceptGroupIdsArr = data[i].exceptGroupIds.split(',');
                  const exceptGroupIdsNameArr = data[i].exceptGroupIdsName.split(',');

                  for (var j = 0; j < exceptGroupIdsArr.length; j++) {
                    exceptGroupIdsArr[j] = `${exceptGroupIdsArr[j]}:${exceptGroupIdsNameArr[j]}`;
                  }
                  data[i].exceptGroupIds = exceptGroupIdsArr;
                }

                data[i].rankIds = `${data[i].rankIds}`;
                data[i].rankIdsName = `${data[i].rankIdsName}`;

                if (data[i].rankIds) {
                  const rankIdsArr = data[i].rankIds.split(',');
                  const rankIdsNameArr = data[i].rankIdsName.split(',');

                  for (var j = 0; j < rankIdsArr.length; j++) {
                    rankIdsArr[j] = `${rankIdsArr[j]}:${rankIdsNameArr[j]}`;
                  }
                  self.activityRank.selected = rankIdsArr;
                }

                if (data[i].scene) {
                  self.scene = [`${data[i].scene}:${data[i].sceneName}`];
                }
                self.dbcactivityInfo.sendTime = Date.parse(data[i].sendTime);
                self.isUpdate = true;
              }
            }

            self.flow = data;
          }
          setTimeout(() => {
            self.isInit = false;
          }, 500);
        });
    }
  },
  mounted() {
    this.isEdit = this.$route.query.id;
    this.isQdorKf = this.$route.query.kf;
    this.listFlow();
  }
};
</script>

<style scoped>
.flow-col {
  margin: 20px;
}

.flow-node {
  background: #fff;
  margin: 0;
}

.flow-node > div {
  margin: 0;
}

.template-brand {
  margin: 0;
}

.a-flow-col {
  width: 118px;
  height: 38px;
  display: inline-block;
  background: #eef5fc;
  text-align: center;
  line-height: 38px;
  margin-right: 10px;
}

.flow-col > span {
  background: #f2f6fc;
}

.activity-flow,
.plhy-right {
  background: #eff4f8;
  height: 450px;
}

.plhy-right .group {
  background: #fff;
  height: 100%;
  margin-left: 20px;
}

.plhy-right .group > a {
  padding: 20px 0;
  margin: 0 20px;
  font-size: 16px;
  border-bottom: 1px solid #eaeaea;
  text-align: center;
  display: block;
}

.plhy-right .group > a:last-child {
  border-bottom: none;
}

.plhy-right .group > a::before {
  width: 100%;
  height: 45px;
  content: '';
  display: block;
  text-align: center;
}

.plhy-right .group > a.i1::before {
  background: url('../../assets/images/plxz-icon1.png') center no-repeat;
}

.plhy-right .group > a.i2::before {
  background: url('../../assets/images/plxz-icon2.png') center no-repeat;
}

.plhy-right .group > a.i3::before {
  background: url('../../assets/images/plxz-icon3.png') center no-repeat;
}

.plhy-right .group > a.i4::before {
  background: url('../../assets/images/plxz-icon4.png') center no-repeat;
}
</style>
