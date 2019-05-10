<template>
  <div>
    <el-dialog
      title="申诉详情"
      ref="userDialog"
      :visible.sync="dialogDisplay"
      custom-class="add-personnel"
      :modal-append-to-body="false"
      class="userdetails-box"
      @close="dialogClose"
    >
      <div class="vip-head-tool">
        <p class="template-brand" style="border-top: none"><i></i> 用户信息</p>

        <div class="clear"></div>
      </div>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>申诉人姓名：</span><span>{{ data.userName }}</span></el-col
        >
        <el-col :span="8"
          ><span>申诉人手机号：</span><span>{{ data.mobile }}</span></el-col
        >
        <el-col :span="8"
          ><span>当前绑定者手机号：</span><span>{{ data.oldMobile }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>申诉时间：</span
          ><span v-if="data.appealDate && data.appealDate != ''">{{
            this.gUtils.dateFormat(data.appealDate, 'yyyy-MM-dd HH:mm:ss')
          }}</span></el-col
        >
        <el-col :span="16"
          ><span>申诉理由：</span><span class="jujue">{{ data.appealReason }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24"
          ><span>驳回原因：</span><span class="jujue">{{ data.rejectReason }}</span></el-col
        >
      </el-row>
      <div class="vip-head-tool">
        <p class="template-brand"><i></i> 申诉产品信息</p>

        <div class="clear"></div>
      </div>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>产品型号：</span><span>{{ data.mmt_material_descrition }}</span></el-col
        >
        <el-col :span="8"
          ><span>套机型号：</span><span>{{ data.parentCode }}</span></el-col
        >
        <el-col :span="8"
          ><span>产品编码：</span><span>{{ data.skuCode }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>购买渠道：</span><span>{{ data.channel }}</span></el-col
        >
        <el-col :span="8"
          ><span>购买城市：</span><span>{{ data.city }}</span></el-col
        >
        <el-col :span="8"
          ><span>产品注册时间：</span
          ><span v-if="data.regTime && data.regTime != ''">{{
            this.gUtils.dateFormat(data.regTime, 'yyyy-MM-dd HH:mm:ss')
          }}</span></el-col
        >
      </el-row>
      <div class="vip-head-tool">
        <p class="template-brand"><i></i> 发票</p>

        <div class="clear"></div>
      </div>
      <div class="userdetails-fapiao">
        <a v-for="item in data.invoice" :href="item" target="_blank">
          <img :src="item" alt="" />
        </a>
      </div>
      <div class="vip-head-tool">
        <p class="template-brand"><i></i> 产品出厂信息（供参考）</p>

        <div class="clear"></div>
      </div>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>是否虚假：</span><span>{{ data.falsity_analysis }}</span></el-col
        >
        <el-col :span="8"
          ><span>是否样机：</span><span>{{ data.isSample }}</span></el-col
        >
        <el-col :span="8"
          ><span>生产日期：</span><span>{{ data.productionDate }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>发货日期：</span><span>{{ data.deliveryDate }}</span></el-col
        >
        <el-col :span="8"
          ><span>发货工贸：</span><span>{{ data.deliveryParty }}</span></el-col
        >
        <el-col :span="8"
          ><span>发货工厂编号：</span><span>{{ data.deliveryFactoryNo }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>发货工厂名：</span><span>{{ data.deliveryFactoryName }}</span></el-col
        >
        <el-col :span="8"
          ><span>物流类型：</span><span>{{ data.logisticsType }}</span></el-col
        >
        <el-col :span="8"
          ><span>收货地址：</span><span>{{ data.deliveryAddress }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>条码类型：</span><span>{{ data.barcodeType }}</span></el-col
        >
      </el-row>
      <div class="vip-head-tool">
        <p class="template-brand"><i></i> 订单基本信息</p>

        <div class="clear"></div>
      </div>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>直销员姓名：</span><span>{{ data.ptName }}</span></el-col
        >
        <el-col :span="8"
          ><span>直销员手机：</span><span>{{ data.ptMobile }}</span></el-col
        >
        <el-col :span="8"
          ><span>门店：</span><span>{{ data.shopName }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>订单提交时间：</span><span>{{ data.orderSubmitTime }}</span></el-col
        >
      </el-row>
      <div class="vip-head-tool">
        <p class="template-brand"><i></i> 订单产品信息</p>

        <div class="clear"></div>
      </div>
      <div v-for="item in data.orderInfo">
        <el-row class="userdetails-elrow">
          <el-col :span="8"
            ><span>产品型号：</span><span>{{ item.modelNo }}</span></el-col
          >
          <el-col :span="8"
            ><span>产品价格：</span><span>{{ item.bccPrice }}</span></el-col
          >
          <el-col :span="8"
            ><span>产品绑定时间：</span><span v-if="item.activatedFlag == 1">{{ item.lastUpdateTime }}</span></el-col
          >
        </el-row>
        <el-row class="userdetails-elrow" style="margin-top: 0px;">
          <el-col :span="8"
            ><span>产品绑定状态：</span><span v-if="item.activatedFlag == 0">未绑定</span
            ><span v-if="item.activatedFlag == 1">绑定</span></el-col
          >
        </el-row>
      </div>
      <div class="vip-head-tool">
        <p class="template-brand"><i></i> 订单权益信息</p>

        <div class="clear"></div>
      </div>
      <div v-for="item in data.orderRight">
        <el-row class="userdetails-elrow">
          <el-col :span="8"
            ><span>权益名称：</span><span>{{ item.rightName }}</span></el-col
          >
          <el-col :span="8">
            <span>权益状态：</span>
            <span v-if="item.status == 1">权益在途</span>
            <span v-if="item.status == 2">权益已激活</span>
            <span v-if="item.status == 3">权益已领取</span>
            <span v-if="item.status == 4">权益已过期</span>
            <span v-if="item.status == 5">权益缺货</span>
            <span v-if="item.status == 6">已发放</span>
          </el-col>
        </el-row>
      </div>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogClose">取 消</el-button> -->
        <el-button type="primary" @click="dialogClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['data', 'random', 'display', 'jurisdiction', 'close'],
  data() {
    return {
      dialogDisplay: false
    };
  },
  methods: {
    dialogClose() {
      this.close();
    }
  },
  mounted() {
    this.dialogDisplay = this.display;
  },
  watch: {
    random() {},
    display(curValue) {
      this.dialogDisplay = curValue;
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
.userdetails-box .add-personnel {
  width: 920px;
}
.userdetails-box .el-dialog__body {
  padding-top: 0;
}
</style>
