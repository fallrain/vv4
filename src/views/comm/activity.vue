<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <el-button
        v-if="jurisdiction['marketingOperations:activityManager:save']"
        type="primary"
        class="fr"
        @click="toDetail()"
        >新建活动</el-button
      >
      <div class="clear"></div>
    </div>
    <div v-loading="msgListLoading">
      <el-table :data="msgListData.entities" style="width: 100%;" :row-class-name="listRowClass">
        <el-table-column type="expand" align="center">
          <template scope="props">
            <!--{{props.row.vipActivityFlowDtoList}}-->
            <div v-for="flow in props.row.vipActivityFlowDtoList" class="expand-flow">
              <div v-if="flow.flowtype == 1" style="margin: 5px 0;border-bottom: 1px dashed #eee;padding-bottom: 5px;">
                <label style="margin-top: 10px;">流程：</label><span>选择通知客服</span><br />
                <label>分组：</label><span>{{ flow.idsName }}</span> <label>发送时间：</label
                ><span>{{ flow.sendTime }}</span> <label>邮件：</label><span>{{ flow.emailTemplateName }}</span>
              </div>
              <div
                v-if="flow.flowtype == 2"
                class="expand-flow"
                style="border-bottom: 1px dashed #eee;padding-bottom: 5px;"
              >
                <label style="margin-top: 10px;">流程：</label><span>选择会员</span><br />
                <label>分组：</label><span>{{ flow.idsName }}</span>
                <!-- <label>等级：</label><span>{{flow.rankIdsName}}</span> -->
                <label>系统自动筛选：</label><span>{{ flow.sceneName }}</span> <label>排除分组：</label
                ><span>{{ flow.exceptGroupIdsName }}</span> <label>排除黑名单：</label
                ><span>{{ flow.excludeBlackList | excludeBlackListFilter }}</span
                ><br />
                <label v-if="flow.weChatTemplateName">微信：</label><span>{{ flow.weChatTemplateName }}</span>
                <label v-if="flow.smsTemplateName">短信：</label><span>{{ flow.smsTemplateName }}</span>
                <label v-if="flow.siteMsgTemplateName">站内信：</label><span>{{ flow.siteMsgTemplateName }}</span>
              </div>
              <div v-if="flow.flowtype == 3" style="margin: 5px 0;border-bottom: 1px solid #eee;padding-bottom: 10px;">
                <label style="margin-top: 10px;">流程：</label><span>选择会员多波次</span><br />
                <label>发送时间：</label><span>{{ flow.sendTime }}</span> <label>发送次数：</label
                ><span>{{ flow.multiWaveSendNum }}</span
                ><br />
                <label>短信模板：</label><span>{{ flow.smsTemplateName }}</span> <label>用户范围名称：</label
                ><span>{{ flow.chartNames }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="templateName" label="" width="40">
              <template scope="scope">
                <i class="active-icon iconfont " :class="{'icon-houtaiicon--':scope.row.status == 1,'icon-yishanchu':scope.row.status == 1,'icon-zanting2':scope.row.status == -3,'icon-yiguoqi':scope.row.status == -4,'icon-ep-':scope.row.status == -6}"></i>
              </template>
            </el-table-column> -->
        <el-table-column prop="templateName" label="序号" width="50" align="center">
          <template scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="activityName" label="活动名称" show-overflow-tooltip align="center"> </el-table-column>
        <!-- <el-table-column prop="activityDesc" label="描述" show-overflow-tooltip> </el-table-column> -->
        <el-table-column prop="fixCommunicationTime" label="活动时间" width="180" show-overflow-tooltip align="center">
          <template scope="scope">
            <span v-if="scope.row.fixNum == 1">{{ scope.row.fixCommunicationTime }}</span>
            <span v-if="scope.row.fixNum == -1">{{ scope.row.unSetCommunicationTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fixNum" label="沟通频率" align="center">
          <template scope="scope">
            {{ scope.row.fixNum | fixNumFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="duo" label="多波次" align="center"> </el-table-column>
        <el-table-column prop="filterInfo" label="参加人数" align="center">
          <template scope="scope">
            <div v-if="userNumLoading" v-loading="userNumLoading" style="position: initial;height:35px;"></div>
            <div v-if="!userNumLoading">{{ scope.row.filterInfo.userNum }}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="configFlag" label="沟通流程">
              <template scope="scope">
                {{scope.row.configFlag | flowFilter}}
              </template>
            </el-table-column> -->
        <el-table-column prop="crUserName" label="创建人" show-overflow-tooltip align="center"> </el-table-column>
        <el-table-column prop="crTime" label="创建时间" show-overflow-tooltip align="center">
          <template scope="scope">
            <div>{{ gUtils.dateFormat(scope.row.crTime, 'yyyy-MM-dd') }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="checkUserName" label="审核人" show-overflow-tooltip align="center"> </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template scope="scope">
            <p v-if="scope.row.status != -8" v-html="statusFilter(scope.row.status)"></p>
            <el-tooltip
              v-if="scope.row.status == -8"
              class="item"
              effect="dark"
              :content="scope.row.checkReason"
              placement="top"
            >
              <span style="color:#ea0202;">驳回</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template scope="scope">
            <a
              v-if="
                jurisdiction['marketingOperations:activityManager:edit'] &&
                  (scope.row.status == -7 || scope.row.status == -8 || scope.row.status == -9)
              "
              href="javascript:;"
              class="color-link operation-btn"
              @click="toDetail(scope.row.id)"
              ><i class="iconfont icon-xiugai"></i>修改</a
            >
            <a
              v-if="
                jurisdiction['marketingOperations:activityManager:edit'] &&
                  (scope.row.status == -3 || scope.row.status == 1)
              "
              href="javascript:;"
              class="operation-btn"
              @click="pause(scope.row.id, scope.row.status)"
              ><i
                class="iconfont"
                :class="{ 'icon-zanting': scope.row.status == -3, 'icon-icon-zanting': scope.row.status == 1 }"
              ></i
              >{{ scope.row.status | optionFilter }}</a
            >
            <a
              v-if="jurisdiction['marketingOperations:activityManager:edit']"
              href="javascript:;"
              class="operation-btn"
              @click="deleteTpl(scope.row.id)"
              ><i class="iconfont icon-shanchu-copy"></i>删除</a
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Vue from 'vue';

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
      status: '',
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
        path: '/communication/addactivity',
        query: { id }
      });
    },
    // 模板删除
    deleteTpl(id) {
      const self = this;

      this.$confirm('您确定要删除该活动吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.requestCare
            .deleteActivity({
              id
            })
            .then((data) => {
              self.listSearch();
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
        activityName: '',
        statusFilter: self.status
      };

      this.msgListLoading = true;
      this.requestCare.list(data).then((data) => {
        const idsArr = [];
        if (data.length != 0) {
          for (let i = 0; i < data.entities.length; i++) {
            idsArr.push(data.entities[i].id);
            if (data.entities[i].checkReason != '') {
              data.entities[i].checkReason = HTMLDecode(data.entities[i].checkReason);
            }
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
          if (data.entities.length != 0) {
            self.getUserCountByActivityIds(idsArr.join(','));
          }
        }

        self.msgListData = data;
        self.msgListLoading = false;
        $('#app-view').scrollTop(0);
      });

      function HTMLDecode(text) {
        let temp = document.createElement('div');
        temp.innerHTML = text;
        const output = temp.innerText || temp.textContent;
        temp = null;
        return output;
      }
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
    this.status = this.$route.query.status;
    this.listSearch();
  }
};
</script>
<style>
.el-loading-spinner {
  margin-top: -14px;
}
.el-loading-spinner .circular {
  width: 28px;
  height: 28px;
}

.el-loading-mask {
  background: initial;
}
</style>

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
</style>
