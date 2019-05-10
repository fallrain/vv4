<template>
  <div class="jdDetail-box">
    <el-dialog title="评价并联详情" :visible.sync="JDDialogDisplay" :modal-append-to-body="false" @close="dialogClose">
      <div class="vip-head-tool">
        <p class="template-brand" style="border-top: none"><i></i> 用户信息</p>
      </div>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>用户姓名：</span><span>{{ data.userName }}</span></el-col
        >
        <el-col :span="8"
          ><span>用户电话：</span><span>{{ data.mobile }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24"
          ><span>用户地址：</span><span>{{ data.address }}</span></el-col
        >
      </el-row>
      <div class="vip-head-tool">
        <p class="template-brand" style="border-top: none"><i></i> 评价产品信息</p>
      </div>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>产品品牌：</span><span>{{ data.brandName }}</span></el-col
        >
        <el-col :span="8"
          ><span>产品品类：</span><span>{{ data.productCategoryName }}</span></el-col
        >
        <el-col :span="8"
          ><span>工贸：</span><span>{{ data.center }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>sku编号：</span><span>{{ data.skuCode }}</span></el-col
        >
        <el-col :span="8"
          ><span>下单时间：</span><span>{{ data.createOrderTime }}</span></el-col
        >
        <el-col :span="8"
          ><span>订单号：</span><span>{{ data.orderId }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24"
          ><span>订单承运人名称：</span><span>{{ data.orderCarriageName }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24"
          ><span>商品名称：</span><span>{{ data.goodsName }}</span></el-col
        >
      </el-row>
      <div class="vip-head-tool">
        <p class="template-brand" style="border-top: none"><i></i> 评价信息</p>
      </div>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>初判责任位：</span><span>{{ data.dutyPost }}</span></el-col
        >
        <el-col :span="8"
          ><span>二级分类：</span><span>{{ data.secondClassify }}</span></el-col
        >
        <el-col :span="8"
          ><span>三级（二级详细）：</span><span>{{ data.threeLevel }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>评价级别：</span><span>{{ data.evaluateLevel }}</span></el-col
        >
        <el-col :span="8"
          ><span>评价时间：</span><span>{{ data.evaluateTime }}</span></el-col
        >
        <el-col :span="8"
          ><span>发送责任位时间：</span><span>{{ data.sendDutyTime | sendDutyTimeFilter }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24"
          ><span>评价内容：</span><span>{{ data.evaluateContent }}</span></el-col
        >
      </el-row>
      <div class="vip-head-tool">
        <p class="template-brand" style="border-top: none"><i></i> 电话中心反馈</p>
      </div>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>工单号：</span><span>{{ data.orderNo }}</span></el-col
        >
        <el-col :span="8"
          ><span>信息号：</span><span>{{ data.informationNumber }}</span></el-col
        >
        <el-col :span="8"
          ><span>状态：</span><span>{{ data.feedbackStatus }}</span></el-col
        >
      </el-row>
      <div class="vip-head-tool">
        <p class="template-brand" style="border-top: none"><i></i> 售后反馈</p>
      </div>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>用户姓名：</span><span>{{ data.csCustomer_name }}</span></el-col
        >
        <el-col :span="8"
          ><span>用户手机号：</span><span>{{ data.csCustomer_phone }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24"
          ><span>用户地址：</span><span>{{ data.csCustomer_address }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24"
          ><span>用户反映问题：</span><span>{{ data.csHsicrm_failurename }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>登记时间：</span><span>{{ data.csEnter_time }}</span></el-col
        >
        <el-col :span="8"
          ><span>派单时间：</span><span>{{ data.csCall_time }}</span></el-col
        >
        <el-col :span="8"
          ><span>完成时间：</span><span>{{ data.csServer_close_time }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24"
          ><span>产品型号：</span><span>{{ data.csModal_name }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>产品大类：</span><span>{{ data.csProduct_name }}</span></el-col
        >
        <el-col :span="8"
          ><span>产品品牌：</span><span>{{ data.csBrand_desc }}</span></el-col
        >
        <el-col :span="8"
          ><span>投诉次数：</span><span>{{ data.csComplaints_count }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>所属工贸：</span><span>{{ data.csBranch_name }}</span></el-col
        >
        <el-col :span="8"
          ><span>是否跳闸：</span><span>{{ data.csTrippingtype_status }}</span></el-col
        >
        <el-col :span="8"
          ><span>跳闸类型：</span><span>{{ data.csTrippingtype_name }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24"
          ><span>中间结果：</span><span>{{ data.csBequeath_reason }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>工单状态：</span><span>{{ data.csWo_status }}</span></el-col
        >
        <el-col :span="8"
          ><span>回访结果：</span><span>{{ data.csRingbackresult_name }}</span></el-col
        >
        <el-col :span="8"
          ><span>实际服务类型：</span><span>{{ data.csService_type_name }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>服务措施：</span><span>{{ data.csMethod_describe }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24"
          ><span>服务网点名称：</span><span>{{ data.csServer_name }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24"
          ><span>20位产品编码：</span><span>{{ data.csProduct_no }}</span></el-col
        >
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['JDDialog', 'data'],
  data() {
    return {
      JDDialogDisplay: false
    };
  },
  filters: {
    sendDutyTimeFilter(val) {
      if (val) {
        return val.substring(0, 10);
      }
    }
  },
  methods: {
    dialogClose() {
      this.$emit('JDClose', false);
    }
  },
  mounted() {},
  watch: {
    JDDialog(curValue) {
      this.JDDialogDisplay = curValue;
    }
  }
};
</script>

<style scoped>
.orderxx {
  padding: 4px 12px 11px 0px;
  line-height: 2;
  word-wrap: break-word;
  word-break: normal;
}
.userdetails-elrow {
  margin-top: 10px;
}
.userdetails-elrow div span:nth-child(1) {
  color: #ccc;
}
.userdetails-elrow div span:nth-child(2) {
  color: #333;
}
.template-brand {
  margin-top: 10px;
  margin-bottom: 0;
  padding-top: 10px;
}
.vip-head-tool {
  margin-bottom: 0;
}
.template-brand {
  border-top: 1px solid #ccc;
}
.userdetails-fapiao {
}
.userdetails-fapiao img {
  width: 100px;
  height: 100px;
  margin-left: 20px;
}
.jujue {
  word-break: normal;
  width: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}
</style>
<style>
.jdDetail-box .el-dialog__body {
  padding-top: 0;
}
.jdDetail-box .el-dialog--small {
  width: 705px;
}
</style>
