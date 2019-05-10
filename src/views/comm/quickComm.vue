<template>
  <div class="vip-content quick-comm">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>快捷沟通
        <el-button type="primary" @click="addModel()" class="m-addmission" style="float: right;">新建任务</el-button>
      </p>
      <div class="clear"></div>
    </div>
    <el-tabs v-model="quickTab" type="card">
      <!--@tab-click="missionClick"-->
      <el-tab-pane label="发模板消息" name="second">
        <div class="quickbox">
          <div class="quick-task">
            <p class="qt-title">任务列表</p>
            <el-input
              placeholder="请输入任务名称"
              style="margin-top: 15px;width: 300px;"
              icon="search"
              v-model="taskName"
              :on-icon-click="query"
              @input.native="titleInput"
              @keyup.enter.native="query"
            ></el-input>
            <el-table :data="tableData" border style="width: 100%;margin-top: 15px;">
              <el-table-column label="序号" width="50">
                <template scope="scope">
                  {{ (pageNo - 1) * pageSize + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="title" label="任务名称" width="120" show-overflow-tooltip> </el-table-column>
              <el-table-column label="用户范围" width="100" show-overflow-tooltip>
                <template scope="scope">
                  <el-tooltip
                    v-if="scope.row.type == 1"
                    class="item"
                    effect="dark"
                    :content="scope.row.typeName"
                    placement="top"
                  >
                    <p>{{ scope.row.typeName | typenameFile }}</p>
                  </el-tooltip>
                  <el-button
                    type="text"
                    v-if="scope.row.type == 3 && scope.row.fileName != null"
                    @click="fileUp(scope.row)"
                    >下载</el-button
                  >
                  <el-button
                    type="text"
                    v-if="scope.row.type == 3 && scope.row.fileName == null"
                    @click="fileLock(scope.row)"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column prop="crTime" label="发送时间" width="150" show-overflow-tooltip> </el-table-column>
              <el-table-column prop="textStatus" label="状态" width="80"> </el-table-column>
              <el-table-column label="效果分析" width="80">
                <template scope="scope">
                  <el-button type="text" @click="analysis(scope.row)">分析</el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="50">
                <template scope="scope">
                  <el-button type="text" v-if="scope.row.status == 0" @click="updateTaskStatus(scope.row, 3)"
                    >停止</el-button
                  >
                  <el-button type="text" v-if="scope.row.status != 0" @click="updateTaskStatus(scope.row, 4)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pageNo"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageSize"
              layout="sizes, prev, pager, next"
              :total="total"
            >
            </el-pagination>
          </div>
          <div class="quick-effect">
            <p class="qe-title">效果分析</p>
            <div class="m-effectcontbox">
              <div class="m-right">
                <p style="font-size: 14px;">
                  任务名称：<span style="color: #20a0ff;font-weight: bold;font-size: 15px;">{{ titleName }}</span>
                </p>
                <ul>
                  <li class="bg06">
                    <div class="ico-key">
                      <div class="bg"></div>
                      <div class="m-share"></div>
                    </div>
                    <div class="m-txt">计划发送用户数</div>
                    <div class="m-number">{{ pointAllPeople }}</div>
                  </li>
                  <li class="bg02">
                    <div class="ico-key">
                      <div class="bg"></div>
                      <div class="m-share"></div>
                    </div>
                    <div class="m-txt">成功发送用户数</div>
                    <div class="m-number">{{ pointSucPeople }}</div>
                  </li>
                  <li class="bg04">
                    <div class="ico-key">
                      <div class="bg"></div>
                      <div class="m-share"></div>
                    </div>
                    <div class="m-txt">未触发用户数</div>
                    <div class="m-number">{{ pointFailPeople }}</div>
                  </li>
                </ul>
              </div>

              <div class="m-left">
                <chart-pie width="100%" height="325px" style="margin: 0 auto;" :data="dataModelPeo"></chart-pie>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!--查看写入openid弹窗-->
    <el-dialog title="用户范围" :visible.sync="fileLockDialog" size="tiny" :modal-append-to-body="false">
      <el-table :data="fileLockData" style="width: 100%" border>
        <el-table-column label="序号" width="80">
          <template scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="openId" min-width="180">
          <template scope="scope">
            {{ scope.row }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex';
import gUtils from '../../utils/gUtils.js';
import chartPie from './components/chart.pie';

export default {
  components: {
    chartPie
  },
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction',
      getUserInfo: 'getUserInfo'
    })
  },
  data() {
    return {
      fileLockDialog: false,
      fileLockData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      taskName: '',
      titleName: '',
      pointSelect: [], // 送积分任务select
      pointplas: '',
      pointData: [], // 送积分任务数据
      pointMissiondate: '', // 送积分任务时间
      // mouldSelect:[],//发模版任务select
      mouldtype: '', // 模版用户范围
      missiontype: '2', // 快捷沟通tab切换
      quickTab: 'second',
      pointAllPeople: '', // 送积分-总人数
      pointAllNum: '', // 送积分-总积分数
      pointSucPeople: '', // 送积分-成功人数
      pointSucNum: '', // 送积分-成功积分数
      pointFailPeople: '', // 送积分-失败人数
      pointFailNum: '', // 送积分-失败积分数
      dataPointPeo: [], // 送积分图表数据-发送人数
      dataModelPeo: [], // 送积分图表数据-发送人数
      dataPointNum: [], // 送积分图表数据-发送积分
      isNum: '发送人数'
    };
  },
  filters: {
    typenameFile(val) {
      if (val.length > 4) {
        val = `${val.substring(0, 4)}...`;
      }
      return val;
    }
  },
  methods: {
    titleInput() {
      const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
      this.taskName = this.taskName.replace(pattern, '');
      this.taskName = this.taskName.replace(/\s+/g, '');
    },
    updateTaskStatus(e, i) {
      let msg = '';
      const _this = this;
      if (i == 3) {
        msg = '此操作将停止发送模板消息，是否继续？';
      } else if (i == 4) {
        msg = '此操作将删除该数据，是否继续？';
      }
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            title: e.title,
            status: i
          };
          this.requestVip.updateTaskStatus(params).then((data) => {
            if (data.isSuccess) {
              _this.query();
            }
          });
        })
        .catch(() => {});
    },
    fileUp(e) {
      window.location.href = e.fileName;
    },
    fileLock(e) {
      this.fileLockDialog = true;
      const user = e.userId.split(',');
      const newUser = [];
      for (const i in user) {
        if (user[i] != '') {
          newUser.push(user[i]);
        }
      }
      this.fileLockData = newUser;
    },
    // 搜索
    query() {
      this.pageNo = 1;
      this.getListCount();
    },
    // 模板任务名称检索
    getListCount() {
      this.tableData = [];
      const _this = this;
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        title: this.taskName
      };
      this.requestVip.getListCount(params).then((data) => {
        if (data.isSuccess) {
          for (const i in data.data.entities) {
            if (data.data.entities[i].status == 0) {
              data.data.entities[i].textStatus = '发送中';
            }
            if (data.data.entities[i].status == 1) {
              data.data.entities[i].textStatus = '发送成功';
            }
            if (data.data.entities[i].status == 2) {
              data.data.entities[i].textStatus = '发送失败';
            }
            if (data.data.entities[i].status == 3) {
              data.data.entities[i].textStatus = '停止';
            }
            if (data.data.entities[i].status == 4) {
              data.data.entities[i].textStatus = '删除';
            }
          }
          _this.tableData = data.data.entities;
        }
        _this.total = data.data.entityCount;
      });
    },
    analysis(e) {
      const self = this;
      this.isNum == '发送人数' ? 1 : 2;
      this.titleName = e.title;
      const _this = this;
      const params = {
        id: e.id
      };
      this.requestVip.getListCount(params).then((data) => {
        if (data.isSuccess) {
          const anaData = data.data.entities[0];
          self.pointAllPeople = anaData.totalNum; // 总人数
          self.pointSucPeople = anaData.successNum; // 成功人数
          self.pointFailPeople = anaData.failNum + anaData.needSendNum; // 失败人数
          // 柱状图数据
          self.dataPointPeo = {
            color: self.isNum, // 表格颜色

            data: [
              {
                name: '计划发送用户数',
                value: self.pointAllPeople
              },
              {
                name: '成功发送用户数',
                value: self.pointSucPeople
              },
              {
                name: '失败发送用户数',
                value: self.pointFailPeople
              }
            ] // 数据
          };

          self.dataModelPeo = {
            color: self.isNum, // 表格颜色
            data: [
              {
                name: '计划发送用户数',
                value: self.pointAllPeople
              },
              {
                name: '成功发送用户数',
                value: self.pointSucPeople
              },
              {
                name: '未触发用户数',
                value: self.pointFailPeople
              }
            ] // 数据
          };
        }
      });
    },
    handleSizeChange(val) {
      this.pageNo = 1;
      this.pageSize = val;
      if (this.tableData.length != 0) {
        this.getListCount();
      }
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      if (this.tableData.length != 0) {
        this.getListCount();
      }
    },
    // 送积分-任务select
    missionSelect() {
      const self = this;
      this.requestVip.listTitle({ type: self.missiontype }).then((data) => {
        if (data.isSuccess) {
          self.pointSelect = data.data;
          self.pointplas = data.data[0];
        } else {
          self.pointSelect = [];
        }
      });
    },
    missionClick() {
      if (this.quickTab == 'second') {
        this.missiontype = 2;
      } else {
        this.missiontype = 1;
      }
      this.missionSelect();
    },

    // 切换送积分显示数据
    pointypeChange() {
      this.isNum == '发送人数' ? 1 : 2;
    },

    pointSel(ele) {
      const self = this;
      self.pointAllPeople = ''; // 送积分-总人数
      self.pointAllNum = ''; // 送积分-总积分数
      self.pointSucPeople = ''; // 送积分-成功人数
      self.pointSucNum = ''; // 送积分-成功积分数
      self.pointFailPeople = ''; // 送积分-失败人数
      self.pointFailNum = ''; // 送积分-失败积分数
      this.requestVip.getListCount({ type: self.missiontype, title: ele }).then((data) => {
        if (data.isSuccess) {
          self.pointMissiondate = data.data.crTime;
          self.mouldtype = data.data.type;
          self.pointAllPeople = data.data.totalCount;
          self.pointAllNum = data.data.totalScore;
          self.pointSucPeople = data.data.normalCount;
          self.pointSucNum = data.data.normalScore;
          self.pointFailPeople = data.data.failCount;
          self.pointFailNum = data.data.failScore;
        } else {
          self.pointMissiondate = '';
          self.mouldtype = '';
          self.pointAllPeople = '';
          self.pointAllNum = '';
          self.pointSucPeople = '';
          self.pointSucNum = '';
          self.pointFailPeople = '';
          self.pointFailNum = '';
        }
      });

      setTimeout(() => {
        // 柱状图数据
        self.dataPointPeo = {
          color: self.isNum, // 表格颜色

          data: [
            {
              name: '计划发送用户数',
              value: self.pointAllPeople
            },
            {
              name: '成功发送用户数',
              value: self.pointSucPeople
            },
            {
              name: '失败发送用户数',
              value: self.pointFailPeople
            }
          ] // 数据
        };

        self.dataModelPeo = {
          color: self.isNum, // 表格颜色
          data: [
            {
              name: '计划发送用户数',
              value: self.pointAllPeople
            },
            {
              name: '成功发送用户数',
              value: self.pointSucPeople
            },
            {
              name: '未触发用户数',
              value: self.pointFailPeople
            }
          ] // 数据
        };

        self.dataPointNum = {
          data: [
            {
              name: '计划发送积分量',
              value: self.pointAllNum
            },
            {
              name: '成功发送积分量',
              value: self.pointSucNum
            },
            {
              name: '失败发送积分量',
              value: self.pointFailNum
            }
          ] // 数据
        };
      }, 1000);
    },

    // 添加积分任务
    addMission() {
      this.$router.push({
        path: '/vip/addPointMission'
      });
    },
    // 添加模版任务
    addModel() {
      this.$router.push({
        path: '/communication/addModel'
      });
    }
  },
  mounted() {
    this.missionSelect();
    this.query();
  },
  watch: {
    //      searchOption: {
    //        handler: function (curVal, oldVal) {
    //          let self = this
    //          let searchOption = ['线上用户']
    //
    //          setTimeout(function () {
    //            if ($("#group-filter").html()) {
    //              searchOption = $("#group-filter").html().split(",");
    //            }
    //            self.searchOptionArr = searchOption
    //          }, 50)
    //        },
    //        deep: true,
    //        immediate: true
    //      }
  }
};
</script>
<style scoped>
.quickbox {
  display: flex;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-top: -15px;
  border-right: 1px solid #d1dbe5;
  border-left: 1px solid #d1dbe5;
  border-bottom: 1px solid #d1dbe5;
}
.quick-task {
  width: 60%;
}
.qt-title {
  font-size: 14px;
  color: #666;
  background: #f5f5f5;
  padding-left: 14px;
  height: 32px;
  line-height: 32px;
}
.quick-effect {
  margin-left: 20px;
  width: 40%;
}
.qe-title {
  font-size: 14px;
  color: #666;
  background: #f5f5f5;
  padding-left: 14px;
  height: 32px;
  line-height: 32px;
}
.m-right {
  width: 100%;
  display: inline-block;
  padding: 20px;
  box-sizing: border-box;
  background: #fbfbfb;
}
.m-right ul {
  width: 100%;
  display: inline-block;
}
.m-right ul li {
  width: 100%;
  height: 36px;
  border-bottom: 1px dotted #e2e4e5;
}
.m-right ul li .ico-key {
  width: 18px;
  height: 16px;
  margin-top: 10px;
  display: inline-block;
  float: left;
  position: relative;
}
.m-right ul li .ico-key .bg {
  width: 16px;
  height: 14px;
  margin: 1px;
  display: inline-block;
}
.m-right ul li.bg01 .ico-key .bg {
  background: #1689e4;
}
.m-right ul li.bg02 .ico-key .bg {
  background: #c5d330;
}
.m-right ul li.bg03 .ico-key .bg {
  background: #fcb72c;
}
.m-right ul li.bg04 .ico-key .bg {
  background: #f5583d;
}
.m-right ul li.bg05 .ico-key .bg {
  background: #bb3d49;
}
.m-right ul li.bg06 .ico-key .bg {
  background: #e4165f;
}
.m-right ul li .ico-key .m-share {
  width: 18px;
  height: 16px;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background: url('../../assets/images/ico-quickshare.png') no-repeat;
}
.m-right ul li .m-txt {
  width: auto;
  height: 36px;
  line-height: 36px;
  float: left;
  margin-left: 6px;
  font-size: 12px;
  color: #666;
}
.m-right ul li .m-number {
  width: auto;
  height: 36px;
  line-height: 36px;
  float: left;
  margin-left: 15px;
  font-size: 14px;
  font-weight: bold;
}
.m-right ul li.bg01 .m-number {
  color: #1689e4;
}
.m-right ul li.bg02 .m-number {
  color: #c5d330;
}
.m-right ul li.bg03 .m-number {
  color: #fcb72c;
}
.m-right ul li.bg04 .m-number {
  color: #f5583d;
}
.m-right ul li.bg05 .m-number {
  color: #bb3d49;
}
.m-right ul li.bg06 .m-number {
  color: #e4165f;
}
</style>
<style>
.el-message-box__message p {
  word-wrap: break-word;
}
</style>
