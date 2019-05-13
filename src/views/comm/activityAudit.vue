<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <!-- <el-button v-if="jurisdiction['concern:activityManager:save']" type="primary" class="fr" @click="toDetail()">新建活动</el-button> -->
      <el-input
        placeholder="输入活动名称检索"
        icon="search"
        v-model="activityName"
        :on-icon-click="handleIconClick"
        @keyup.enter.native="handleIconClick"
        style="width: 300px"
        class="fr"
      >
      </el-input>

      <div class="clear"></div>
    </div>
    <div v-loading="msgListLoading">
      <el-table :data="msgListData.entities" style="width: 100%;text-align: center" :row-class-name="listRowClass">
        <!-- <el-table-column type="expand">
              <template scope="props">
                <div v-for="flow in props.row.vipActivityFlowDtoList" class="expand-flow">
                  <div v-if="flow.flowtype == 1" style="margin: 5px 0;border-bottom: 1px solid #eee;padding-bottom: 10px;">
                    <label style="margin-bottom: 10px;">流程：</label><span>选择通知客服</span><br>
                    <label>分组：</label><span>{{flow.idsName}}</span>
                    <label>发送时间：</label><span>{{flow.sendTime}}</span>
                    <label>邮件：</label><span>{{flow.emailTemplateName}}</span>
                  </div>
                  <div v-if="flow.flowtype == 2" class="expand-flow">
                    <label style="margin-bottom: 10px;">流程：</label><span>选择会员</span><br>
                    <label style="margin-bottom: 10px;">分组：</label><span>{{flow.idsName}}</span>
                    <label>等级：</label><span>{{flow.rankIdsName}}</span>
                    <label>系统自动筛选：</label><span>{{flow.sceneName}}</span>
                    <label>排除分组：</label><span>{{flow.exceptGroupIdsName}}</span>
                    <label>排除黑名单：</label><span>{{flow.excludeBlackList | excludeBlackListFilter}}</span><br>
                    <label v-if="flow.weChatTemplateName">微信：</label><span>{{flow.weChatTemplateName}}</span>
                    <label v-if="flow.smsTemplateName">短信：</label><span>{{flow.smsTemplateName}}</span>
                    <label v-if="flow.siteMsgTemplateName">站内信：</label><span>{{flow.siteMsgTemplateName}}</span>
                  </div>
                </div>
              </template>
            </el-table-column> -->

        <el-table-column prop="templateName" label="序号" width="50">
          <template slot-scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="activityName" label="活动名称" show-overflow-tooltip> </el-table-column>
        <!-- <el-table-column prop="activityDesc" label="描述" show-overflow-tooltip> </el-table-column> -->
        <el-table-column prop="fixCommunicationTime" label="活动时间" width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.fixNum == 1">{{ scope.row.fixCommunicationTime }}</span>
            <span v-if="scope.row.fixNum == -1">{{ scope.row.unSetCommunicationTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="crUserName" label="创建人" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="crTime" label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>{{ gUtils.dateFormat(scope.row.crTime, 'yyyy-MM-dd') }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="fixNum" label="沟通频率">
          <template slot-scope="scope">
            {{ scope.row.fixNum | fixNumFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="duo" label="多波次"> </el-table-column>
        <el-table-column prop="filterInfo" label="参加人数">
          <template slot-scope="scope">
            <div v-if="userNumLoading" v-loading="userNumLoading" style="position: initial;height:35px;"></div>
            <div v-if="!userNumLoading">{{ scope.row.filterInfo.userNum }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="configFlag" label="详情">
          <template slot-scope="scope">
            <a href="javascript:;" class="color-link" @click="reviewActivity(scope.row)">查看</a>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <p v-html="statusFilter(scope.row.status)"></p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <a
              v-if="jurisdiction['marketingOperations:activityManager:edit'] && scope.row.status == -7"
              href="javascript:;"
              class="color-link operation-btn"
              @click="checkActivity(scope.row.id, true)"
              ><i class="iconfont icon-tongguo"></i>通过</a
            >
            <!-- <a v-if="jurisdiction['concern:activityManager:edit'] && (scope.row.status == -3 || scope.row.status == 1)" href="javascript:;" class="operation-btn" @click="pause(scope.row.id, scope.row.status)"><i class="iconfont" :class="{'icon-zanting': scope.row.status == -3,'icon-icon-zanting': scope.row.status == 1}"></i>{{scope.row.status | optionFilter}}</a> -->
            <a
              v-if="jurisdiction['marketingOperations:activityManager:edit'] && scope.row.status == -7"
              href="javascript:;"
              class="operation-btn"
              @click="rejected(scope.row.id)"
              ><i class="iconfont icon-bohui1"></i>驳回</a
            >
          </template>
        </el-table-column>
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

    <el-dialog
      title="请填写驳回原因"
      :visible.sync="dialogVisible"
      size="small"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <el-form ref="form" :model="reason" label-width="80px">
        <el-form-item label="驳回原因">
          <el-input type="textarea" v-model="reason.reason"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkActivity(activityId, false)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="活动详情"
      :visible.sync="activityDialogVisible"
      :modal-append-to-body="false"
      class="acti-audit-dialog"
    >
      <el-form
        v-if="activityInfo.activityName"
        ref="activityForm"
        :model="activityInfo"
        label-width="120px"
        style="height:500px;overflow:auto;"
      >
        <el-form-item label="活动名称：">
          <p>{{ activityInfo.activityName }}</p>
        </el-form-item>
        <el-form-item label="活动描述：">
          <p>{{ activityInfo.activityDesc }}</p>
        </el-form-item>
        <el-form-item label="活动发送时间：">
          <p v-if="activityInfo.fixNum == 1">{{ activityInfo.fixCommunicationTime }}</p>
          <p v-if="activityInfo.fixNum == -1">每天 {{ activityInfo.unSetCommunicationTime }}</p>
        </el-form-item>
        <el-form-item label="创建人：">
          <p>{{ activityInfo.crUserName }}</p>
        </el-form-item>
        <el-form-item label="筛选条件：">
          <div v-if="activityInfo.filterInfo">
            <!--<p>分组：</p>-->
            <div v-for="group in activityInfo.filterInfo.filter.group">
              分组名称：{{ group.groupName }}
              <div v-for="groups in group.groupFilter" style="margin-bottom:10px;">
                <el-tag type="primary" v-for="item in groups.filters">{{ item }}</el-tag>
              </div>
            </div>
            <p>系统自动筛选：</p>
            <el-tag type="primary" v-for="scene in activityInfo.filterInfo.filter.scene">{{ scene.sceneName }}</el-tag>
            <p>排除分组：</p>
            <div v-for="group in activityInfo.filterInfo.filter.exceptGroup">
              分组名称：{{ group.groupName }}
              <div v-for="groups in group.groupFilter" style="margin-bottom:10px;">
                <el-tag type="primary" v-for="item in groups.filters">{{ item }}</el-tag>
              </div>
            </div>
            <!-- <el-tag type="primary" v-for="exceptGroup in activityInfo.filterInfo.filter.exceptGroup">{{exceptGroup}}</el-tag> -->
            <p v-if="activityInfo.filterInfo.filter.excludeBlack">排除黑名单</p>
          </div>
        </el-form-item>
        <el-form-item label="发送渠道：">
          <div v-for="flow in activityInfo.vipActivityFlowDtoList">
            <!-- <p v-if="flow.emailTemplateName">邮件模板：<el-tag type="primary">{{flow.emailTemplateName}}</el-tag></p> -->
            <p v-if="flow.smsTemplateName">
              短信模板：<el-tag type="primary">{{ flow.smsTemplateName }}</el-tag>
            </p>
            <p v-if="flow.weChatTemplateName">
              微信模板：<el-tag type="primary">{{ flow.weChatTemplateName }}</el-tag>
            </p>
            <p v-if="flow.siteMsgTemplateName">
              站内信模板：<el-tag type="primary">{{ flow.siteMsgTemplateName }}</el-tag>
            </p>
          </div>
        </el-form-item>
        <el-form-item label="发送总人数：">
          <p>{{ activityInfo.filterInfo.userNum }}</p>
        </el-form-item>
        <el-form-item label="多波次：" v-if="activityInfo.duo == '是'">
          <div>
            <div v-for="flow in activityInfo.vipActivityFlowDtoList">
              <p v-if="flow.flowtype == 3">
                发送时间：<span>{{ flow.sendTime }}</span>
              </p>
              <p v-if="flow.flowtype == 3">
                发送次数：<span>{{ flow.multiWaveSendNum }}</span>
              </p>
              <p v-if="flow.flowtype == 3">
                短信模板：<el-tag type="primary">{{ flow.smsTemplateName }}</el-tag>
              </p>
              <p v-if="flow.flowtype == 3">
                用户范围名称：<span>{{ flow.chartNames }}</span>
              </p>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="activityDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      templateType: '营销类',
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      activityName: '',
      dialogVisible: false,
      activityId: '',
      reason: {
        reason: ''
      },
      activityDialogVisible: false,
      activityInfo: {},
      userNumLoading: true
    };
  },
  filters: {
    fixNumFilter(fixNum) {
      if (fixNum > 0) {
        return '一次执行';
      }
      return '每日执行';
    },
    optionFilter(status) {
      switch (status) {
        case 1:
          return '暂停';
          break;
        case -3:
          return '开始';
          break;
        default:
          return 'status';
          break;
      }
    },
    flowFilter(status) {
      switch (status) {
        case 0:
          return '未配置';
          break;
        case 1:
          return '已配置';
          break;
        default:
          return status;
          break;
      }
    },
    excludeBlackListFilter(status) {
      status = status == 1 ? '是' : '否';
      return status;
    }
  },
  methods: {
    statusFilter(status) {
      switch (status) {
        case 1:
          return '<span style="color:#f28902;">待发送</span>';
          break;
        case -1:
          return '已删除';
          break;
        case -4:
          return '<span style="color:#666;">已过期</span>';
          break;
        case -3:
          return '<span style="color:#ea0202;">已暂停</span>';
          break;
        case -5:
          return '<span style="color:#0ab202;">已发送</span>';
          break;
        case -6:
          return '<span style="color:#0894d5;">发送中</span>';
          break;
        case -7:
          return '<span style="color:#0894d5;">待审核</span>';
          break;
        case -8:
          return '<span style="color:#ea0202;">驳回</span>';
          break;
        case -9:
          return '<span style="color:#03a9f4;">待配置</span>';
          break;
        default:
          return status;
          break;
      }
    },
    listRowClass(row) {
      if (row.configFlag != 1) {
        return 'no-expand';
      }
    },
    // 跳转模板详情
    toDetail(id) {
      this.$router.push({
        path: '/comm/addactivity',
        query: { id }
      });
    },
    // 驳回
    rejected(id) {
      (this.activityId = id), (this.reason.reason = ''), (this.dialogVisible = true);
    },
    pause(id, status) {
      const self = this;

      if (status == 1) {
        this.requestCare
          .pauseActivity({
            id
          })
          .then((data) => {
            self.listSearch();
          });
      } else {
        this.requestCare
          .startActivity({
            id
          })
          .then((data) => {
            self.listSearch();
          });
      }
    },
    typefilter(value) {
      const type = value == '营销类' ? 2 : 1;
      return type;
    },
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        activityName: self.activityName
      };

      this.msgListLoading = true;
      this.requestCare.listCheckedActivity(data).then((data) => {
        const idsArr = [];
        for (let i = 0; i < data.entities.length; i++) {
          idsArr.push(data.entities[i].id);
          for (let j = 0; j < data.entities[i].vipActivityFlowDtoList.length; j++) {
            if (data.entities[i].vipActivityFlowDtoList[j].flowtype == 3) {
              data.entities[i].duo = '是';
            } else {
              data.entities[i].duo = '否';
            }
          }
          if (data.entities[i].vipActivityFlowDtoList.length == 0) {
            data.entities[i].duo = '否';
          }
        }

        self.getUserCountByActivityIds(idsArr.join(','));

        self.msgListData = data;
        self.msgListLoading = false;
        $('#app-view').scrollTop(0);
      });
    },
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    typeChange() {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.listSearch();
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
    // 弹层关闭
    handleClose() {
      this.dialogVisible = false;
    },
    // 审核活动
    checkActivity(id, status) {
      const self = this;
      const data = {
        id,
        status: status ? 1 : -8, // 通过1 不通过-8
        reason: !status ? self.reason.reason : ''
      };
      this.requestCare.checkActivity(data).then((data) => {
        if (data) {
          self.dialogVisible = false;
          self.pageNo = 1;
          self.listSearch();
        }
      });
    },
    // 查看活动详情
    reviewActivity(activityInfo) {
      const activity = JSON.parse(JSON.stringify(activityInfo));
      console.log(activity.filterInfo.filter.group);
      if (activity.filterInfo.filter.group) {
        for (let j = 0; j < activity.filterInfo.filter.group.length; j++) {
          for (let i = 0; i < activity.filterInfo.filter.group[j].groupFilter.length; i++) {
            activity.filterInfo.filter.group[j].groupFilter[i].filters = activity.filterInfo.filter.group[
              j
            ].groupFilter[i].filters.split('&');
          }
        }

        for (let j = 0; j < activity.filterInfo.filter.exceptGroup.length; j++) {
          for (let i = 0; i < activity.filterInfo.filter.exceptGroup[j].groupFilter.length; i++) {
            activity.filterInfo.filter.exceptGroup[j].groupFilter[i].filters = activity.filterInfo.filter.exceptGroup[
              j
            ].groupFilter[i].filters.split('&');
          }
        }
      }
      this.activityInfo = activity;
      this.activityDialogVisible = true;
    },
    getUserCountByActivityIds(ids) {
      const params = {
        ids
      };
      const self = this;

      this.userNumLoading = true;

      this.requestCare.getUserCountByActivityIds(params).then((data) => {
        if (data) {
          for (let index = 0; index < self.msgListData.entities.length; index++) {
            self.msgListData.entities[index].filterInfo.userNum = data[self.msgListData.entities[index].id];
          }
          self.userNumLoading = false;
        }
      });
    }
  },
  mounted() {
    this.listSearch();
  }
};
</script>
<style scope>
.active-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  background: #0069d3;
  border-radius: 16px;
  color: #fff !important;
  font-size: 12px !important;
  line-height: 16px;
  text-align: center;
}

.active-icon.icon-houtaiicon-- {
  background: #f6a302;
}
.active-icon.icon-zanting2 {
  background: #f00202;
}
.active-icon.icon-yiguoqi {
  background: #f00202;
  font-weight: bold;
}
.acti-audit-dialog .el-form-item__content {
  position: static;
}
</style>
<style>
.acti-audit-dialog .el-dialog--small {
  width: 570px;
}
</style>
