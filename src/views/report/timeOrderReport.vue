<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>订单查询</p>
      <div class="clear"></div>
    </div>
    <div>
      <el-date-picker
        v-model="value3"
        type="datetimerange"
        placeholder="选择时间范围"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="getTime"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      >
      </el-date-picker>
      <el-button type="primary" icon="search" @click="timequery">查询</el-button>
    </div>
    <div style="margin-top: 30px;">
      <template>
        <el-table v-loading="loading" border :data="tableData" stripe style="width: 100%;text-align: center">
          <el-table-column prop="orderId" label="订单号" width="150"> </el-table-column>
          <el-table-column prop="modelNo" label="产品型号" width="170"> </el-table-column>
          <el-table-column prop="userName" label="客户姓名" width="100"> </el-table-column>
          <el-table-column prop="mobile" label="客户电话" width="160"> </el-table-column>
          <el-table-column prop="ptId" label="直销员工号" width="160"> </el-table-column>
          <el-table-column prop="HNAME" label="直销员姓名" width="180"> </el-table-column>
          <el-table-column prop="SHOPNAME" label="直销员所在门店" width="180"> </el-table-column>
          <el-table-column prop="xwName" label="直销员所在小微" width="180"> </el-table-column>
          <el-table-column prop="channelName" label="直销员所在渠道" width="180"> </el-table-column>
          <el-table-column prop="ZYPRODUCTLINE" label="主营产品线" width="180"> </el-table-column>
          <el-table-column prop="orderTime" label="订单提交时间" width="180"> </el-table-column>
          <el-table-column prop="activatedFlag" label="产品是否激活" width="180"> </el-table-column>
          <el-table-column prop="source" label="订单上网类型" width="180"> </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value3: '',
      time: '',
      tableData: [],
      loading: false
    };
  },
  methods: {
    timequery() {
      const self = this;
      if (this.time == '') {
        this.$message({
          message: '请选择时间范围',
          type: 'warning'
        });
      } else {
        self.loading = true;
        const params = {
          startTime: this.time.split(' - ')[0],
          endTime: this.time.split(' - ')[1]
        };
        this.requestReport.getTimeOrderData(params).then((data) => {
          self.loading = false;
          if (data.isSuccess) {
            data.data.forEach((el) => {
              el.xwName += '小微';
              if (el.activatedFlag == 0) {
                el.activatedFlag = '未激活';
              } else if (el.activatedFlag == 1) {
                el.activatedFlag = '已激活';
              }
              if (el.source == 'vipcode') {
                el.source = '海尔';
              } else if (el.source == 'vipcodecasarte') {
                el.source = '卡萨帝';
              }
              const create_time = parseInt(el.orderTime);
              const year = new Date(create_time).getFullYear();
              let month = new Date(create_time).getMonth() + 1;
              let date = new Date(create_time).getDate();
              let hour = new Date(create_time).getHours();
              let minute = new Date(create_time).getMinutes();
              let second = new Date(create_time).getSeconds();
              if (month < 10) {
                month = `0${month}`;
              }
              if (date < 10) {
                date = `0${date}`;
              }
              if (hour < 10) {
                hour = `0${hour}`;
              }
              if (minute < 10) {
                minute = `0${minute}`;
              }
              if (second < 10) {
                second = `0${second}`;
              }
              el.orderTime = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
            });
            self.tableData = data.data;
          } else {
            self.tableData = [];
          }
        });
      }
    },
    getTime(data) {
      this.time = data ? data.join(' - ') : ' - ';
    }
  }
};
</script>
