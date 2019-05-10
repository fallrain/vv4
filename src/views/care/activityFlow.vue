<template>
  <div style="background: #eff4f8;height: 100%;">
    <div class="step-line">
      <el-steps :active="1" finish-status="success" align-center center>
        <el-step v-if="!isEdit" title="创建活动"></el-step>
        <el-step v-if="isEdit" title="修改活动"></el-step>
        <el-step title="选择会员"></el-step>
        <el-step title="选择沟通渠道"></el-step>
        <el-step title="选择通知客服"></el-step>
        <el-step title="活动创建完成"></el-step>
      </el-steps>
    </div>
    <div class="vip-content msg-template activity-flow" style="width:85%;float:left;padding:0">
      <div style="background:#fff;height:100%">
        <p class="template-brand" style="padding:20px 40px 10px"><i></i>选择会员</p>
        <div v-for="(node, $index) in flow" v-if="node.flowtype == 2" class="flow-node">
          <div style="display:inline-block">
            <div class="flow-col" v-if="fixNum == 1">
              <a href="javascript:;" class="color-link" @click="selectGroup(node.flowtype)">选择分组</a>
              <el-tag
                v-for="(tag, index) in node.ids"
                :key="tag"
                :closable="true"
                type="primary"
                @close="removeItem('group', index, $index)"
              >
                {{ tag | nameFilter }}
              </el-tag>
            </div>

            <!-- <div class="flow-col">
              <a v-if="isOnline != 2" href="javascript:;" class="color-link" @click="selectRank">选择等级</a>
              <el-tag v-if="isOnline != 2" v-for="(tag, index) in activityRank.selected" :key="tag" :closable="true" type="primary" @close="removeItem('rank',index, $index)"> {{tag | nameFilter}} </el-tag>
            </div> -->

            <div class="flow-col" v-if="fixNum == -1">
              <a v-if="isOnline != 2" href="javascript:;" class="color-link" @click="systemFilter">系统自动筛选</a>
              <el-tag
                v-if="isOnline != 2"
                v-for="(tag, index) in scene"
                :key="tag"
                :closable="true"
                type="primary"
                @close="removeItem('scene', index, $index)"
              >
                {{ tag | nameFilter }}
              </el-tag>
            </div>
            <div class="flow-col">
              <!--<span v-if="isOnline != 2" style="background:#fff;margin-right:27px;margin-left:30px">排除设置</span>-->
              <a v-if="isOnline != 2" href="javascript:;" class="color-link" @click="selectExceptGroup(node.flowtype)"
                >排除分组</a
              >

              <el-tag
                v-if="isOnline != 2"
                v-for="(tag, index) in node.exceptGroupIds"
                :key="tag"
                :closable="true"
                type="primary"
                @close="removeItem('expGroup', index, $index)"
              >
                {{ tag | nameFilter }}
              </el-tag>

              <el-checkbox
                v-if="isOnline != 2"
                v-model="node.excludeBlackList"
                :true-label="1"
                :false-label="-1"
                style="margin-left: 7px;"
                >排除黑名单</el-checkbox
              >
            </div>
          </div>
        </div>

        <div style="text-align: center;">
          <div style="display:inline-block;margin-right:20px;">
            <el-button type="primary" @click="goPrev" style="background:#40dfa6;border-color:#40dfa6">上一步</el-button>
          </div>
          <div
            v-if="
              jurisdiction['marketingOperations:activityManager:save'] ||
                jurisdiction['marketingOperations:activityManager:edit']
            "
            style="display:inline-block;margin-right:20px;"
          >
            <el-button type="primary" @click="saveFlow">下一步</el-button>
          </div>
          <div style="display:inline-block">
            <el-button type="primary" @click="saveFlow('pause')" style="background:#7ebe26;border-color:#7ebe26"
              >暂存</el-button
            >
          </div>
        </div>
        <el-dialog
          title="设置发送时间"
          :visible.sync="activityDate.dialogDisplay"
          size="387px"
          :before-close="activityDateDialogBeforeCloas"
          :modal-append-to-body="false"
          @close="activityDate.dialogDisplay = false"
        >
          <span>发送时间</span>
          <el-date-picker
            v-model="activityDate.sendTime"
            type="datetime"
            placeholder="选择日期时间"
            :editable="false"
            style="width: 270px;margin-left: 17px;"
          >
          </el-date-picker>
          <span slot="footer" class="dialog-footer">
            <el-button @click="activityDateDialogBeforeCloas">取 消</el-button>
            <el-button type="primary" @click="activityDateDialogSave">保存</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="选择等级"
          :visible.sync="activityRank.dialogDisplay"
          size="700px"
          :before-close="activityRankDialogBeforeCloas"
          :modal-append-to-body="false"
          @close="activityRank.dialogDisplay = false"
        >
          <span style="display: block;margin-bottom: 10px;">总共选择：{{ activityRank.count }}人</span>
          <el-checkbox-group v-model="activityRank.dialogSelected" @change="randSelect">
            <el-checkbox
              v-for="item in activityRank.rank"
              :label="item.rank + ':' + item.rankName"
              style="width: 180px;margin-left: 0;"
              >{{ item.rankName }}({{ item.count }})</el-checkbox
            >
          </el-checkbox-group>
          <span slot="footer" class="dialog-footer">
            <el-button @click="rankDialogClose(false)">取 消</el-button>
            <el-button type="primary" @click="rankDialogClose(true)">保存</el-button>
          </span>
        </el-dialog>

        <select-group
          :dialogChange="groupDialogChange"
          :form="activityInfo.ids"
          :random="groupDialog.random"
          :dialogDisplay="groupDialog.display"
          :closeDialog="closeGroupDialog"
          :onlineType="getOnline"
          :type="'flow'"
        ></select-group>

        <select-group
          :dialogChange="exceptGroupDialogChange"
          :form="activityInfo.ids"
          :random="exceptGroupDialog.random"
          :dialogDisplay="exceptGroupDialog.display"
          :closeDialog="closeExceptGroupDialog"
          :onlineType="getOnline"
          :type="'flow'"
        ></select-group>

        <select-customer-group
          :dialogChange="customerGroupDialogChange"
          :form="activityInfo.ids"
          :random="customerGroupDialog.random"
          :dialogDisplay="customerGroupDialog.display"
          :closeDialog="closeCustomerGroupDialog"
          :type="'flow'"
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
    return {
      fixNum: 1, // 沟通次数
      isEdit: false,
      flowtype: 2,
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
          flowtype: 2,
          siteMsgTemplate: '',
          smsTemplate: '',
          weChatTemplate: '',
          emailTemplate: '',
          ids: '',
          rankIds: '',
          exceptGroupIds: '',
          excludeBlackList: '',
          isOnline: 1
        }
      ],
      activityDate: {
        sendTime: '',
        dialogDisplay: false
      },
      activityInfo: {
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
      selectNode: 0,
      curFlowtype: 1,
      isUpdate: false,
      isInit: true,
      isOnline: 1
    };
  },
  filters: {
    nameFilter(value) {
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
    getOnline(v) {
      if (v == '线上') {
        this.flow.isOnline = 1;
      } else {
        this.flow.isOnline = 2;
      }
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
      }
    },
    goback() {
      history.go(-1);
    },
    addNode() {
      this.flow.push({
        flowtype: '',
        siteMsgTemplate: '',
        smsTemplate: '',
        weChatTemplate: '',
        emailTemplate: '',
        ids: [],
        rankIds: [],
        exceptGroupIds: []
      });
    },
    // 变更首节点类型清空后面节点内容
    flowtypeChange(index, node) {
      if (!this.isInit) {
        if (index == 0 && node != 1) {
          const newArr = [];
          newArr.push({
            flowtype: node,
            siteMsgTemplate: '',
            smsTemplate: '',
            weChatTemplate: '',
            emailTemplate: '',
            ids: [],
            rankIds: [],
            exceptGroupIds: []
          });
          this.flow = newArr;
        }
      }
    },
    setDate() {
      this.activityDate.sendTime = '';
      this.activityDate.dialogDisplay = true;
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
    activityDateDialogSave() {
      this.activityInfo.sendTime = this.activityDate.sendTime;
      this.activityDate.dialogDisplay = false;
    },
    activityDateDialogBeforeCloas() {
      this.activityDate.dialogDisplay = false;
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

      for (let i = 0; i < data.length; i++) {
        if (data[i].flowtype == 2) {
          const idsArr = [];
          for (var j = 0; j < data[i].ids.length; j++) {
            idsArr.push(data[i].ids[j].split(':')[0]);
          }

          const rankIdsArr = [];
          for (var j = 0; j < this.activityRank.selected.length; j++) {
            rankIdsArr.push(this.activityRank.selected[j].split(':')[0]);
          }
          data[i].rankIds = rankIdsArr.join(',');
          if (data[i].ids == '' && self.fixCommunicationType == 1) {
            self.$message({
              type: 'warning',
              message: '请选择分组!'
            });
            return false;
          } if (data[i].rankIds == '' && self.fixCommunicationType == 2) {
            self.$message({
              type: 'warning',
              message: '请选择等级!'
            });
            return false;
          }

          const exceptidsArr = [];
          for (var j = 0; j < data[i].exceptGroupIds.length; j++) {
            exceptidsArr.push(data[i].exceptGroupIds[j].split(':')[0]);
          }

          if (data[i].ids && data[i].exceptGroupIds) {
            for (let c = 0; c < data[i].ids.length; c++) {
              for (let d = 0; d < data[i].exceptGroupIds.length; d++) {
                if (data[i].ids[c] == data[i].exceptGroupIds[d]) {
                  self.$message({
                    type: 'warning',
                    message: '排除分组不能含有分组'
                  });
                  return false;
                }
              }
            }
          }

          data[i].ids = idsArr.join(',');
          data[i].exceptGroupIds = exceptidsArr.join(',');

          data[i].isOnline = self.isOnline;

          if (self.scene.length > 0) {
            data[i].scene = self.scene[0].split(':')[0];
          }
        }
      }

      const params = data[1];
      params.activityId = self.$route.query.id;

      // let params = {
      //   "activityFlowList": data,
      //   "activityId": self.$route.query.id
      // }
      if (!this.isUpdate || !params.id) {
        this.requestCare.saveFlow(params).then((data) => {
          if (data != []) {
            if (data) {
              if (type == 'pause') {
                self.$message({
                  type: 'success',
                  message: '暂存成功!'
                });
              } else {
                self.$router.push({
                  path: '/activity/activityQD',
                  query: {
                    id: self.$route.query.id,
                    fixNum: self.$route.query.fixNum
                  }
                });
              }
            }
          }
        });
      } else {
        this.requestCare.updateFlow(params).then((data) => {
          if (data != []) {
            if (data) {
              if (type == 'pause') {
                self.$message({
                  type: 'success',
                  message: '暂存成功!'
                });
              } else {
                self.$router.push({
                  path: '/activity/activityQD',
                  query: {
                    id: self.$route.query.id,
                    fixNum: self.$route.query.fixNum
                  }
                });
              }
            }
          }
        });
      }
    },
    goPrev() {
      this.$router.push({
        path: '/activity/addactivity',
        query: {
          id: this.$route.query.id,
          fixNum: this.$route.query.fixNum
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
        {},
        {
          flowtype: 2,
          siteMsgTemplate: '',
          smsTemplate: '',
          weChatTemplate: '',
          emailTemplate: '',
          ids: '',
          rankIds: '',
          exceptGroupIds: '',
          excludeBlackList: ''
        }
      ];
      this.scene = [];
    },
    activityInfoGet() {
      const self = this;
      if (self.$route.query.id) {
        this.requestCare
          .getActivity({
            id: self.$route.query.id
          })
          .then((data) => {
            if (data) {
              self.fixNum = data.fixNum;
            }
          });
      }
    },
    listFlow() {
      const self = this;
      this.requestCare
        .listFlow({
          id: self.$route.query.id
        })
        .then((data) => {
          if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].flowtype == 2) {
                // debugger
                data[i].ids = `${data[i].ids}`;
                data[i].idsName = `${data[i].idsName}`;
                if (data[i].ids) {
                  const idsArr = data[i].ids.split(',');
                  const idsNameArr = data[i].idsName.split(',');

                  for (var j = 0; j < idsArr.length; j++) {
                    idsArr[j] = `${idsArr[j]}:${idsNameArr[j]}`;
                  }
                  data[i].ids = idsArr;
                }

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
              }
            }

            if (data.length == 1 && data[0].flowtype != 1) {
              data = [{}, data[0]];
            }

            if (data.length < 2) {
              data.push({
                flowtype: 2,
                siteMsgTemplate: '',
                smsTemplate: '',
                weChatTemplate: '',
                emailTemplate: '',
                ids: '',
                rankIds: '',
                exceptGroupIds: '',
                excludeBlackList: ''
              });
            }

            self.flow = data;
            self.activityInfo.sendTime = Date.parse(data[0].sendTime);
            self.isUpdate = true;
          } else {
            self.flow = [
              {},
              {
                flowtype: 2,
                siteMsgTemplate: '',
                smsTemplate: '',
                weChatTemplate: '',
                emailTemplate: '',
                ids: '',
                rankIds: '',
                exceptGroupIds: '',
                excludeBlackList: ''
              }
            ];
          }
          setTimeout(() => {
            self.isInit = false;
          }, 500);
        });
    }
  },
  mounted() {
    this.isEdit = this.$route.query.id;
    this.activityInfoGet();
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

.flow-col > a {
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
