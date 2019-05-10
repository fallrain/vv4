<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>快捷沟通</p>
      <div class="clear"></div>
    </div>

    <div>
      <el-tabs v-model="quickTab" type="card" @tab-click="missionClick">
        <!--<el-tab-pane label="送积分" name="first">-->
        <!--<div class="tab-cont">-->
        <!--<div class="m-missionbox">-->
        <!--<div class="m-left">-->
        <!--<span class="option-label">选择任务</span>-->
        <!--<el-select v-model="pointplas" style="margin-right:5px"  @change="pointSel">-->
        <!--<el-option v-for="item in pointSelect" :value="item"> </el-option>-->
        <!--</el-select>-->
        <!--</div>-->
        <!--<el-button type="text" @click="addMission()" class="m-addmission">新建积分任务</el-button>-->
        <!--</div>-->
        <!--<div class="m-databox">-->
        <!--<span class="option-label">发送时间</span>-->
        <!--<span class="date">{{pointMissiondate}}</span>-->
        <!--</div>-->
        <!--<div class="m-effect">效果分析</div>-->
        <!--<div class="m-effectcontbox">-->
        <!--<div class="m-left">-->
        <!--<el-radio-group v-model="isNum" @change="pointypeChange" style="float:left;">-->
        <!--<el-radio-button label="发送人数"></el-radio-button>-->
        <!--<el-radio-button label="发送积分"></el-radio-button>-->
        <!--</el-radio-group>-->
        <!--<div v-if="isNum == '发送人数'" style="margin-top: 40px;"><chart-pie width="580px" height="325px" style="margin: 0 auto;" :data="dataPointPeo" :color="1"></chart-pie></div>-->
        <!--<div v-if="isNum == '发送积分'" style="margin-top: 40px;"><chart-pie width="580px" height="325px" style="margin: 0 auto;" :data="dataPointNum" :color="2">></chart-pie></div>-->
        <!--</div>-->
        <!--<div class="m-right">-->
        <!--<ul>-->

        <!--<li class="bg02">-->
        <!--<div class="ico-key"><div class="bg"></div><div class="m-share"></div></div>-->
        <!--<div class="m-txt">计划发送用户数</div>-->
        <!--<div class="m-number">{{pointAllPeople}}</div>-->
        <!--</li>-->
        <!--<li class="bg04">-->
        <!--<div class="ico-key"><div class="bg"></div><div class="m-share"></div></div>-->
        <!--<div class="m-txt">成功发送用户数</div>-->
        <!--<div class="m-number">{{pointSucPeople}}</div>-->
        <!--</li>-->
        <!--<li class="bg06">-->
        <!--<div class="ico-key"><div class="bg"></div><div class="m-share"></div></div>-->
        <!--<div class="m-txt">失败发送用户数</div>-->
        <!--<div class="m-number">{{pointFailPeople}}</div>-->
        <!--</li>-->

        <!--<li class="bg01">-->
        <!--<div class="ico-key"><div class="bg"></div><div class="m-share"></div></div>-->
        <!--<div class="m-txt">计划发送积分量</div>-->
        <!--<div class="m-number">{{pointAllNum}}</div>-->
        <!--</li>-->
        <!--<li class="bg03">-->
        <!--<div class="ico-key"><div class="bg"></div><div class="m-share"></div></div>-->
        <!--<div class="m-txt">成功发送积分量</div>-->
        <!--<div class="m-number">{{pointSucNum}}</div>-->
        <!--</li>-->
        <!--<li class="bg05">-->
        <!--<div class="ico-key"><div class="bg"></div><div class="m-share"></div></div>-->
        <!--<div class="m-txt">失败发送积分量</div>-->
        <!--<div class="m-number">{{pointFailNum}}</div>-->
        <!--</li>-->

        <!--</ul>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</el-tab-pane>-->
        <el-tab-pane label="发模版消息" name="second">
          <div class="tab-cont">
            <div class="m-missionbox">
              <div class="m-left">
                <span class="option-label">选择任务</span>
                <el-select v-model="pointplas" style="margin-right:5px;width: 260px;" @change="pointSel">
                  <el-option v-for="item in pointSelect" :value="item"> </el-option>
                </el-select>
              </div>
              <el-button type="text" @click="addModel()" class="m-addmission">新建任务</el-button>
            </div>
            <div class="m-databox">
              <span class="option-label">用户范围</span>
              <span class="date" style=" margin-right: 10px;">{{ mouldtype }}</span>
              <span class="option-label">发送时间</span>
              <span class="date">{{ pointMissiondate }}</span>
              <span class="option-label">任务状态</span>
              <span class="date">{{ pointMissiondate }}</span>
            </div>
            <div class="m-effect">效果分析</div>
            <div class="m-effectcontbox">
              <div class="m-left">
                <chart-pie width="580px" height="325px" style="margin: 0 auto;" :data="dataModelPeo"></chart-pie>
              </div>
              <div class="m-right">
                <ul>
                  <li class="bg02">
                    <div class="ico-key">
                      <div class="bg"></div>
                      <div class="m-share"></div>
                    </div>
                    <div class="m-txt">计划发送用户数</div>
                    <div class="m-number">{{ pointAllPeople }}</div>
                  </li>
                  <li class="bg04">
                    <div class="ico-key">
                      <div class="bg"></div>
                      <div class="m-share"></div>
                    </div>
                    <div class="m-txt">成功发送用户数</div>
                    <div class="m-number">{{ pointSucPeople }}</div>
                  </li>
                  <li class="bg06">
                    <div class="ico-key">
                      <div class="bg"></div>
                      <div class="m-share"></div>
                    </div>
                    <div class="m-txt">未触发用户数</div>
                    <div class="m-number">{{ pointFailPeople }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex';
import gUtils from '../../utils/gUtils.js';
import chartPie from './dialog/chart.pie.vue';

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
  filters: {},
  methods: {
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
        path: '/vip/addModel'
      });
    }
  },
  mounted() {
    this.missionSelect();
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
<style>
.tab-cont {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: -15px;
  border-right: 1px solid #d1dbe5;
  border-left: 1px solid #d1dbe5;
  border-bottom: 1px solid #d1dbe5;
}
.tab-cont .m-missionbox {
  width: 100%;
  height: 60px;
  display: inline-block;
  background: #f5f5f5;
  margin-top: 20px;
}
.tab-cont .m-missionbox .m-left {
  height: 32px;
  width: auto;
  display: inline-block;
  float: left;
  margin: 14px 0 14px 20px;
}
.tab-cont .m-missionbox .m-left .option-label {
  height: 32px;
  line-height: 32px;
  width: auto;
  font-size: 14px;
  color: #666;
  float: left;
  margin-right: 20px;
}
.tab-cont .m-missionbox .m-addmission {
  width: auto;
  display: inline-block;
  float: right;
  margin-right: 10px;
  height: 60px;
  line-height: 60px;
  padding: 0;
}
.tab-cont .m-databox {
  width: 100%;
  display: inline-block;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #f5f5f5;
  margin-bottom: 10px;
}
.tab-cont .m-databox .option-label {
  width: auto;
  height: 32px;
  line-height: 32px;
  padding: 0 15px;
  font-size: 14px;
  background: #def1ff;
  color: #666;
  float: left;
  margin-right: 20px;
}
.tab-cont .m-databox .date {
  width: auto;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #999;
  float: left;
}
.tab-cont .m-effect {
  width: 100%;
  display: inline-block;
  height: 32px;
  line-height: 32px;
  text-align: left;
  padding-left: 12px;
  font-size: 14px;
  color: #666;
  background: #f5f5f5;
}
.tab-cont .m-effectcontbox {
  width: 100%;
  display: inline-block;
  height: 325px;
  margin: 15px auto 25px;
}
.tab-cont .m-effectcontbox .m-left {
  width: 50%;
  display: inline-block;
  float: left;
  height: 325px;
}
.tab-cont .m-effectcontbox .m-right {
  width: 430px;
  display: inline-block;
  float: right;
  height: 325px;
  padding: 20px;
  box-sizing: border-box;
  background: #fbfbfb;
}
.tab-cont .m-effectcontbox .m-right ul {
  width: 100%;
  display: inline-block;
}
.tab-cont .m-effectcontbox .m-right ul li {
  width: 100%;
  height: 36px;
  border-bottom: 1px dotted #e2e4e5;
}
.tab-cont .m-effectcontbox .m-right ul li .ico-key {
  width: 18px;
  height: 16px;
  margin-top: 10px;
  display: inline-block;
  float: left;
  position: relative;
}
.tab-cont .m-effectcontbox .m-right ul li .ico-key .bg {
  width: 16px;
  height: 14px;
  margin: 1px;
  display: inline-block;
}
.tab-cont .m-effectcontbox .m-right ul li.bg01 .ico-key .bg {
  background: #1689e4;
}
.tab-cont .m-effectcontbox .m-right ul li.bg02 .ico-key .bg {
  background: #c5d330;
}
.tab-cont .m-effectcontbox .m-right ul li.bg03 .ico-key .bg {
  background: #fcb72c;
}
.tab-cont .m-effectcontbox .m-right ul li.bg04 .ico-key .bg {
  background: #f5583d;
}
.tab-cont .m-effectcontbox .m-right ul li.bg05 .ico-key .bg {
  background: #bb3d49;
}
.tab-cont .m-effectcontbox .m-right ul li.bg06 .ico-key .bg {
  background: #e4165f;
}
.tab-cont .m-effectcontbox .m-right ul li .ico-key .m-share {
  width: 18px;
  height: 16px;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background: url('../../assets/images/ico-quickshare.png') no-repeat;
}
.tab-cont .m-effectcontbox .m-right ul li .m-txt {
  width: auto;
  height: 36px;
  line-height: 36px;
  float: left;
  margin-left: 6px;
  font-size: 12px;
  color: #666;
}
.tab-cont .m-effectcontbox .m-right ul li .m-number {
  width: auto;
  height: 36px;
  line-height: 36px;
  float: left;
  margin-left: 15px;
  font-size: 14px;
  font-weight: bold;
}
.tab-cont .m-effectcontbox .m-right ul li.bg01 .m-number {
  color: #1689e4;
}
.tab-cont .m-effectcontbox .m-right ul li.bg02 .m-number {
  color: #c5d330;
}
.tab-cont .m-effectcontbox .m-right ul li.bg03 .m-number {
  color: #fcb72c;
}
.tab-cont .m-effectcontbox .m-right ul li.bg04 .m-number {
  color: #f5583d;
}
.tab-cont .m-effectcontbox .m-right ul li.bg05 .m-number {
  color: #bb3d49;
}
.tab-cont .m-effectcontbox .m-right ul li.bg06 .m-number {
  color: #e4165f;
}
</style>
