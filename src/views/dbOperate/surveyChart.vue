<template>
  <div>
    <div class="chartBox">
      <div class="line">
        <ve-line :data="SurveyDate" :settings="chartSettings" :data-zoom="dataZoom"></ve-line>
      </div>
      <div class="histogram">
        <ve-histogram :data="moneyDateChart" :settings="chartSettings1" :data-zoom="dataZoom"></ve-histogram>
      </div>
      <div class="pie">
        <ve-pie :data="moneyDate" :settings="chartSettings1"></ve-pie>
        <span class="thisMonth">本月详情</span>
      </div>
    </div>
    <div class="menu">
      <ul>
        <li>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link"> 组管理<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="xwGroupManage" style="text-align: center;">小微组管理</el-dropdown-item>
              <el-dropdown-item command="sellerManage" style="text-align: center;">直销员组管理</el-dropdown-item>
              <el-dropdown-item command="userGroupManage" style="text-align: center;">用户组管理</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li style="color: #409EFF" @click="rightsGrantModel">权益发放模型配置</li>
        <li style="color: #409EFF" @click="rightsConfigure">一站式权益配置</li>
        <li style="color: #409EFF" @click="resourceConfigure">实物资源位配置</li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    this.chartSettings = {
      yAxisName: ['数量'],
      labelMap: {
        date: '日期',
        userCount: '调研人数',
        sellerCount: '直销员参与人数'
      }
    };
    this.chartSettings1 = {
      yAxisName: ['金额'],
      labelMap: {
        budget: '权益成本',
        cost: '投入预算',
        remain: '剩余金额',
        yearMonth: '日期'
      }
    };
    this.dataZoom = [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        start: 80,
        end: 100,
        handleSize: 20, // 滑动条的 左右2个滑动条的大小
        height: 8, // 组件高度
        left: 30, // 左边的距离
        right: 30, // 右边的距离
        bottom: 30, // 右边的距离
        handleColor: '#ddd', // h滑动图标的颜色
        handleStyle: {
          borderColor: '#cacaca',
          borderWidth: '1',
          shadowBlur: 2,
          background: '#ddd',
          shadowColor: '#ddd'
        },
        fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          {
            offset: 0,
            color: '#1eb5e5'
          },
          {
            offset: 1,
            color: '#5ccbb1'
          }
        ]),
        backgroundColor: '#ddd', // 两边未选中的滑动条区域的颜色
        showDataShadow: false, // 是否显示数据阴影 默认auto
        showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
        handleIcon:
          'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z',
        filterMode: 'filter'
      }
    ];
    return {
      moneyDateChart: {
        columns: ['yearMonth', 'budget', 'cost', 'remain'],
        rows: [
          // { 'yearMonth': '1/1', 'budget': 1393, 'cost': 1093, 'remain': 1093 },
          // { 'yearMonth': '1/2', 'budget': 3530, 'cost': 3230, 'remain': 1093 },
          // { 'yearMonth': '1/3', 'budget': 2923, 'cost': 2623, 'remain': 2623 },
          // { 'yearMonth': '1/4', 'budget': 1723, 'cost': 1423, 'remain': 1423 },
          // { 'yearMonth': '1/5', 'budget': 3792, 'cost': 3492, 'remain': 3492 },
          // { 'yearMonth': '1/6', 'budget': 4593, 'cost': 4293, 'remain': 2623 }
        ]
      },
      moneyDate: {
        columns: ['type', 'content'],
        rows: [{ type: '权益成本', content: 0 }, { type: '投入预算', content: 0 }, { type: '剩余金额', content: 0 }]
      },
      SurveyDate: {
        columns: ['date', 'userCount', 'sellerCount'],
        rows: []
      }
    };
  },
  methods: {
    rightsConfigure() {
      this.$router.push('/dbOperate/rightsconfigrution');
    },
    resourceConfigure() {
      this.$router.push('/dbOperate/resourceConfigure');
    },
    rightsGrantModel() {
      this.$router.push('/dbOperate/rightsGrantModel');
    },
    handleCommand(command) {
      if (command == 'xwGroupManage') {
        // alert("小微组管理");
        this.$router.push('/dbOperate/XiaoWeiGroup');
      }
      if (command == 'sellerManage') {
        // alert("直销员管理");
        this.$router.push('/dbOperate/sellerGroupManageml/sellerGroupManage');
      }
      if (command == 'userGroupManage') {
        // alert("会员组管理");
        this.$router.push({ name: '/dbOperate/userGroupManageml/userGroupManage' });
      }
    }
  },
  mounted() {
    function checkIE() {
      return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
    }
    if (checkIE()) {
      window.addEventListener(
        'hashchange',
        () => {
          const currentPath = window.location.hash.slice(1);
          if (this.$route.path !== currentPath) {
            this.$router.push(currentPath);
          }
        },
        false
      );
    }

    const that = this;
    axios
      .post(`${this.apiUrl}vipcenter/ResearchUserSeller/getResearchInfo`)
      .then((response) => {
        if (response.data.isSuccess == true) {
          const { survey } = response.data.data;
          for (var i = 0; i < survey.length; i++) {
            const arr = survey[i].date.split('-');
            const str = `${arr[1]}-${arr[2]}`;
            survey[i].date = str;
          }
          that.SurveyDate.rows = survey;
          that.moneyDate.rows[0].content = response.data.data.money[0].budget;
          that.moneyDate.rows[1].content = response.data.data.money[0].cost;
          that.moneyDate.rows[2].content = response.data.data.money[0].remain;

          const moneySurvey = response.data.data.money;
          for (var i = 0; i < moneySurvey.length; i++) {
            const arr = moneySurvey[i].yearMonth.split('-');
            const str = `${arr[1]}月`;
            moneySurvey[i].yearMonth = str;
          }
          for (var i = 0; i < moneySurvey.length; i++) {
            that.moneyDateChart.rows.push(moneySurvey[moneySurvey.length - i - 1]);
          }
          // that.moneyDateChart.rows = moneySurvey;
        } else {
          that.$message({
            type: 'error',
            message: '请刷新页面'
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.chartBox {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.chartBox .histogram {
  width: 300px;
}
.chartBox .line {
  width: 300px;
}
.chartBox .pie {
  width: 400px;
  position: relative;
}
.chartBox .pie .thisMonth {
  position: absolute;
  left: 170px;
  bottom: 25px;
  font-weight: 600;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.menu {
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: red;
}
.menu ul {
  height: 50px;
  line-height: 50px;
  background-color: #eff4f8;
}
.menu ul li {
  float: left;
  /*margin-left: 50px;*/
  height: 50px;
  line-height: 50px;
  color: #000;
  cursor: pointer;
  width: 150px;
  text-align: center;
}
.menu ul li:first-child {
  margin-left: 100px;
}
.menu ul li:hover {
  background-color: #fff !important;
}
.menu ul li:hover .el-dropdown .el-dropdown-link {
  background-color: #fff !important;
}
.theme-default .g-tabs-view > div {
  margin-top: 20px;
}
</style>
