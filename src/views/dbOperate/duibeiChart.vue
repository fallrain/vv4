<!--
 * @Description: 日清报表
 * @Author: zjm
 * @BelongTo: 惠州巨合
 * @Date: 2019-01-29 21:10:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-01-31 22:56:21
 -->
<template>
  <div class="vip-content">
    <div class="daoBiaoBtn">
      <el-button type="primary" v-if="canUpdate">更新报表</el-button>
      <el-button type="primary" @click="daoBiaoFunc(typeName)">导出excel</el-button>
    </div>
    <div>
      <div class="rights-config-header">
        <div class="header-title">
          <span>查看日清报表--{{ typeName }}</span>
        </div>
      </div>
    </div>
    <div class="BBType">
      <div class="tempBox">
        <div class="oneType oneColor" @click="selectTypeName('中心')">
          <div class="oneTypeLeft">
            <img src="../../assets/images/zhongxinIcon.png" style="width:20px;height:20px;" />
            <p>中心</p>
          </div>
          <div class="oneTypeRight">{{ CenterentityCount }}</div>
        </div>
      </div>
      <div class="tempBox">
        <div class="oneType twoColor" @click="selectTypeName('产业')">
          <div class="oneTypeLeft">
            <img src="../../assets/images/chanyeIcon.png" style="width:20px;height:20px;" />
            <p>产业</p>
          </div>
          <div class="oneTypeRight">{{ IndustryentityCount }}</div>
        </div>
      </div>
      <div class="tempBox">
        <div class="oneType threeColor" @click="selectTypeName('渠道')">
          <div class="oneTypeLeft">
            <img src="../../assets/images/qudaoIcon.png" style="width:20px;height:20px;" />
            <p>渠道</p>
          </div>
          <div class="oneTypeRight">{{ ChannelentityCount }}</div>
        </div>
      </div>
      <div class="tempBox">
        <div class="oneType fourColor" @click="selectTypeName('明细')">
          <div class="oneTypeLeft">
            <img src="../../assets/images/mingxiIcon.png" style="width:20px;height:20px;" />
            <p>明细</p>
          </div>
          <div class="oneTypeRight">{{ ZXYentityCount }}</div>
        </div>
      </div>
    </div>
    <div v-show="typeName == '明细'" class="vip-head-tool">
      <el-row>
        <el-col :span="6">
          <span class="leftname">中心名称：</span>
          <el-select style="width: 60%;" v-model="input.center" placeholder="请选择中心名称(默认所有)" @change>
            <el-option v-for="item in xiaoweioptions" :key="item" :label="item.value" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="leftname">产业名称：</span>
          <el-select style="width: 60%;" v-model="input.industry" placeholder="请选择产业名称(默认所有)" @change>
            <el-option v-for="item in productLineOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="leftname">渠道名称：</span>
          <el-select style="width: 60%;" v-model="input.channel" placeholder="请选择渠道名称(默认所有)" @change>
            <el-option v-for="item in channeloptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="leftname">直销员工号：</span>
          <el-input style="width: 60%;" v-model="input.hmcId" placeholder="请输入直销员工号"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6" style="float: right;text-align: center">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="getQuery(2)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div v-show="BBCenter" v-loading="msgListLoading" class="rights-act-list">
      <!---->
      <el-table :data="msgListDataCenter.entities" border>
        <el-table-column prop="templateName" label="序号" width="60">
          <template slot-scope="scope">{{
            (msgListDataCenter.pageNo - 1) * msgListDataCenter.pageSize + scope.$index + 1
          }}</template>
        </el-table-column>
        <el-table-column prop="center" label="小微" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="useNumber" label="当月使用人数" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="useNumberCount"
          label="当月小微总直销员数"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="usage" label="使用率" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="precipitateCount" label="当月沉淀总用户数" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="precipitateCasarteCount"
          label="当月沉淀卡萨帝用户数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="precipitateAverage" label="当月人均沉淀用户数" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="accumulateVisitService"
          label="累计入户服务用户数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="visitServiceAverage" label="人均入户服务用户数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="visitService" label="当月入户服务用户数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="accumulateLatency" label="累计潜客数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="latencyAverage" label="人均潜客数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="latency" label="当月潜客数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="score" label="综合评分" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="更新时间" width="150" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChangeCenter"
        @current-change="handleCurrentChangeCenter"
        border
        :current-page.sync="pageNoCenter"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="msgListDataCenter.entityCount"
      ></el-pagination>
    </div>
    <div v-show="BBIndustry" v-loading="msgListLoading" class="rights-act-list">
      <!---->
      <el-table :data="msgListDataIndustry.entities" border>
        <el-table-column prop="templateName" label="序号" width="60">
          <template slot-scope="scope">{{
            (msgListDataIndustry.pageNo - 1) * msgListDataIndustry.pageSize + scope.$index + 1
          }}</template>
        </el-table-column>
        <el-table-column prop="industry" label="产业" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="useNumber" label="当月使用人数" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="useNumberCount"
          label="当月小微总直销员数"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="usage" label="使用率" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="precipitateCount" label="当月沉淀总用户数" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="precipitateCasarteCount"
          label="当月沉淀卡萨帝用户数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="precipitateAverage" label="当月人均沉淀用户数" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="accumulateVisitService"
          label="累计入户服务用户数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="visitServiceAverage" label="人均入户服务用户数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="visitService" label="当月入户服务用户数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="accumulateLatency" label="累计潜客数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="latencyAverage" label="人均潜客数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="latency" label="当月潜客数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="score" label="综合评分" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="更新时间" width="150" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChangeIndustry"
        @current-change="handleCurrentChangeIndustry"
        border
        :current-page.sync="pageNoIndustry"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="msgListDataIndustry.entityCount"
      ></el-pagination>
    </div>
    <div v-show="BBChannel" v-loading="msgListLoading" class="rights-act-list">
      <!---->
      <el-table :data="msgListDataChannel.entities" border>
        <el-table-column prop="templateName" label="序号" width="60">
          <template slot-scope="scope">{{
            (msgListDataChannel.pageNo - 1) * msgListDataChannel.pageSize + scope.$index + 1
          }}</template>
        </el-table-column>
        <el-table-column prop="channel" label="渠道" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="useNumber" label="当月使用人数" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="useNumberCount"
          label="当月小微总直销员数"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="usage" label="使用率" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="precipitateCount" label="当月沉淀总用户数" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="precipitateCasarteCount"
          label="当月沉淀卡萨帝用户数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="precipitateAverage" label="当月人均沉淀用户数" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="accumulateVisitService"
          label="累计入户服务用户数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="visitServiceAverage" label="人均入户服务用户数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="visitService" label="当月入户服务用户数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="accumulateLatency" label="累计潜客数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="latencyAverage" label="人均潜客数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="latency" label="当月潜客数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="score" label="综合评分" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="更新时间" width="150" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChangeChannel"
        @current-change="handleCurrentChangeChannel"
        border
        :current-page.sync="pageNoChannel"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="msgListDataChannel.entityCount"
      ></el-pagination>
    </div>
    <div v-show="BBZXY" v-loading="msgListLoading" class="rights-act-list">
      <!---->
      <el-table :data="msgListDataZXY.entities" border>
        <el-table-column prop="templateName" label="序号" width="60">
          <template slot-scope="scope">{{
            (msgListDataZXY.pageNo - 1) * msgListDataZXY.pageSize + scope.$index + 1
          }}</template>
        </el-table-column>
        <el-table-column prop="use" label="是否使用" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.use | useFilter }}</template>
        </el-table-column>
        <el-table-column prop="hmcId" label="直销员工号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sellerName" label="直销员名字" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="hireDate" label="入职时间" width="190">
          <template slot-scope="scope">{{ scope.row.hireDate | formatDateHire }}</template>
        </el-table-column>
        <el-table-column prop="shopCode" label="门店编码" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shopName" label="门店名" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="channel" label="渠道" show-overflow-tooltip></el-table-column>
        <el-table-column prop="center" label="中心" show-overflow-tooltip></el-table-column>
        <el-table-column prop="industry" label="产业" show-overflow-tooltip></el-table-column>
        <el-table-column prop="haierOrder" label="海尔订单" show-overflow-tooltip></el-table-column>
        <el-table-column prop="casarteOrder" label="卡萨帝订单" show-overflow-tooltip></el-table-column>
        <el-table-column prop="totalOrder" label="总订单" show-overflow-tooltip></el-table-column>
        <el-table-column prop="arbitrageOrder" label="套购订单" show-overflow-tooltip></el-table-column>
        <el-table-column prop="precipitateUser" label="沉淀用户数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="accumulateLatency" label="累计潜客数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="latency" label="当月潜客数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="visitService" label="当月入户服务人数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="accumulateVisitService" label="入户服务总人数" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="visitServiceCasarte"
          label="当月入户服务卡萨帝用户数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="accumulateVisitServiceCasarte"
          label="入户服务总卡萨帝用户数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="visitServiceHaier"
          label="当月入户服务海尔用户数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="accumulateVisitServiceHaier"
          label="入户服务总海尔用户数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="createTime" label="更新时间" width="150" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChangeZXY"
        @current-change="handleCurrentChangeZXY"
        border
        :current-page.sync="pageNoZXY"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="msgListDataZXY.entityCount"
      ></el-pagination>
    </div>
    <div v-show="BBZXYQuery" v-loading="msgListLoading" class="rights-act-list">
      <!---->
      <el-table :data="msgListDataZXYQuery.entities" border>
        <el-table-column prop="templateName" label="序号" width="60">
          <template slot-scope="scope">{{
            (msgListDataZXYQuery.pageNo - 1) * msgListDataZXYQuery.pageSize + scope.$index + 1
          }}</template>
        </el-table-column>
        <el-table-column prop="use" label="是否使用" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.use | useFilter }}</template>
        </el-table-column>
        <el-table-column prop="hmcId" label="直销员工号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sellerName" label="直销员名字" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="hireDate" label="入职时间" width="190">
          <template slot-scope="scope">{{ scope.row.hireDate | formatDateHire }}</template>
        </el-table-column>
        <el-table-column prop="shopCode" label="门店编码" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shopName" label="门店名" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="channel" label="渠道" show-overflow-tooltip></el-table-column>
        <el-table-column prop="center" label="中心" show-overflow-tooltip></el-table-column>
        <el-table-column prop="industry" label="产业" show-overflow-tooltip></el-table-column>
        <el-table-column prop="haierOrder" label="海尔订单" show-overflow-tooltip></el-table-column>
        <el-table-column prop="casarteOrder" label="卡萨帝订单" show-overflow-tooltip></el-table-column>
        <el-table-column prop="totalOrder" label="总订单" show-overflow-tooltip></el-table-column>
        <el-table-column prop="arbitrageOrder" label="套购订单" show-overflow-tooltip></el-table-column>
        <el-table-column prop="precipitateUser" label="沉淀用户数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="accumulateLatency" label="累计潜客数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="latency" label="当月潜客数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="visitService" label="当月入户服务人数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="accumulateVisitService" label="入户服务总人数" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="visitServiceCasarte"
          label="当月入户服务卡萨帝用户数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="accumulateVisitServiceCasarte"
          label="入户服务总卡萨帝用户数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="visitServiceHaier"
          label="当月入户服务海尔用户数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="accumulateVisitServiceHaier"
          label="入户服务总海尔用户数"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="createTime" label="更新时间" width="150" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChangeZXY"
        @current-change="handleCurrentChangeZXY"
        border
        :current-page.sync="pageNoQuery"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="msgListDataZXYQuery.entityCount"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      CenterentityCount: 0,
      IndustryentityCount: 0,
      ChannelentityCount: 0,
      ZXYentityCount: 0,
      canUpdate: false,
      BBCenter: true,
      BBIndustry: false,
      BBChannel: false,
      BBZXY: false,
      BBZXYQuery: false,
      BBCenterCrT: '',
      BBIndustryCrT: '',
      BBChannelCrT: '',
      BBZXYCrT: '',
      msgListDataCenter: [],
      msgListDataChannel: [],
      msgListDataIndustry: [],
      msgListDataZXY: [],
      msgListDataZXYQuery: [],
      pageNoCenter: 1,
      pageNoChannel: 1,
      pageNoIndustry: 1,
      pageNoZXY: 1,
      pageNoQuery: 1,
      isQuery: false,
      pageSize: 10,
      msgListLoading: false,
      xiaoweioptions: [
        '所有中心',
        '上海',
        '乌鲁木齐',
        '兰州',
        '内蒙',
        '北京',
        '南京',
        '南宁',
        '南昌',
        '厦门',
        '合肥',
        '哈尔滨',
        '唐山',
        '大连',
        '天津',
        '太原',
        '宁波',
        '广州',
        '徐州',
        '成都',
        '无锡',
        '昆明',
        '杭州',
        '武汉',
        '沈阳',
        '济南',
        '济宁',
        '海口',
        '深圳',
        '烟台',
        '石家庄',
        '福州',
        '襄樊',
        '西宁',
        '西安',
        '贵州',
        '郑州',
        '重庆',
        '银川',
        '锦州',
        '长春',
        '长沙',
        '青岛'
      ],
      channeloptions: ['所有渠道', '苏宁', 'VIP客户', '五星', '国美', '社区专卖', '综合店', '超市'],
      productLineOptions: [
        '所有产业',
        '三菱空调',
        '冰箱',
        '冷柜',
        '厨房电器',
        '商用空调',
        '家用空调',
        '波轮',
        '洗碗机',
        '滚筒',
        '热水器',
        '电子'
      ],
      input: {
        hmcId: '',
        center: '',
        channel: '',
        industry: ''
      },
      typeName: '中心'
    };
  },
  filters: {
    useFilter(val) {
      if (val == 1) {
        return '是';
      }
      return '否';
    },
    formatDate(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
      const hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
      const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
      return `${year}-${month}-${day} ${hour}:${minutes}`;
    },
    formatDateHire(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
      return `${year}-${month}-${day}`;
    }
  },
  mounted() {
    this.getBBListZXY();
    this.getBBListCenter();
    this.getBBListIndustry();
    this.getBBListChannel();
  },
  methods: {
    // 刷新报表
    renewBaoBiaoFunc(typeName) {
      const that = this;
      if (typeName.indexOf('中心') != -1) {
        var renewWithCrT = that.BBCenterCrT;
        var typeUrl = '/dealForm/updateDealFormCenter';
      } else if (typeName.indexOf('产业') != -1) {
        var renewWithCrT = that.BBIndustryCrT;
        var typeUrl = '/dealForm/updateDealFormCenterToIndustry';
      } else if (typeName.indexOf('渠道') != -1) {
        var renewWithCrT = that.BBChannelCrT;
        var typeUrl = '/dealForm/updateDealFormCenterToChannel';
      } else if (typeName.indexOf('明细') != -1) {
        var renewWithCrT = that.BBZXYCrT;
        var typeUrl = '/dealFormSeller/updateDealFormSellerTempPlus';
      } else {
        var renewWithCrT = '未知时间';
        var typeUrl = '';
      }
      that
        .$confirm(
          `${typeName}报表在${renewWithCrT}已更新，本次更新需要半个小时至一个小时，现在是否再次更新?`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
        .then(() => {
          that.$message({
            type: 'success',
            message: '正在更新'
          });
          that.updateBBList(typeUrl);
        })
        .catch(() => {
          that.$message({
            type: 'error',
            message: '已取消更新'
          });
        });
    },
    // 更新报表
    updateBBList(typeUrl) {
      const that = this;
      if (typeUrl != '') {
        axios({
          url: `${this.apiUrl}vipcenter${typeUrl}`,
          method: 'post'
        })
          .then((response) => {
            if (response.data.isSuccess) {
            } else {
              that.canUpdate = false;
              that.$message({
                type: 'error',
                message: `报表已在${response.data.msg}时更新，请间隔一个小时更新`
              });
            }
          })
          .catch((error) => {
            console.log('error');
          });
      } else {
      }
      setTimeout(() => {
        that.canUpdate = true;
      }, 5000);
    },
    // 导表
    daoBiaoFunc(typeName) {
      const that = this;
      that
        .$confirm(`是否下载在${typeName}报表下查询到的数据?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          if (typeName.indexOf('中心') != -1) {
            this.getBBListCenter(1);
            return;
          }
          if (typeName.indexOf('产业') != -1) {
            this.getBBListIndustry(1);
            return;
          }
          if (typeName.indexOf('渠道') != -1) {
            this.getBBListChannel(1);
            return;
          }
          if (typeName.indexOf('明细') != -1) {
            this.getQuery(1);
          }
        })
        .catch(() => {
          that.$message({
            type: 'error',
            message: '已取消导表'
          });
        });
    },
    // 直销员明细
    getBBListZXY() {
      const that = this;
      that.isQuery = false;
      that.reset();
      const data = {
        pageNo: that.pageNoZXY,
        pageSize: that.pageSize
      };
      that.msgListLoading = true;
      axios({
        url: `${this.apiUrl}vipcenter/dealFormSeller/queryDealFormForSeller`,
        method: 'post',
        data
      })
        .then((response) => {
          that.msgListLoading = false;
          if (response.data.isSuccess) {
            that.msgListDataZXY = response.data.data;
            that.ZXYentityCount = response.data.data.entityCount;
            that.BBZXYCrT = that.formatDate(response.data.data.entities[0].createTime);
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          that.msgListLoading = false;
          console.log('error');
        });
    },
    handleSizeChangeZXY(pageSize) {
      if (!this.msgListLoading) {
        if (!this.isQuery) {
          this.pageNoZXY = 1;
          this.pageSize = pageSize;
          this.getBBListZXY();
        } else {
          this.pageNoQuery = 1;
          this.pageSize = pageSize;
          this.getQuery();
        }
      }
    },
    handleCurrentChangeZXY(pageNoZXY) {
      if (!this.msgListLoading) {
        if (!this.isQuery) {
          this.pageNoZXY = pageNoZXY;
          this.getBBListZXY();
        } else {
          this.pageNoQuery = pageNoZXY;
          this.getQuery();
        }
      }
    },
    // 渠道
    getBBListChannel(flag) {
      const that = this;
      const data = {
        pageNo: that.pageNoChannel,
        pageSize: that.pageSize
      };
      if (flag == 1) {
        data.flag = 1;
      } else {
        data.flag = 0;
      }
      that.msgListLoading = true;
      axios({
        url: `${this.apiUrl}vipcenter/dealForm/queryDealFormForCenterToChannel`,
        method: 'post',
        data
      })
        .then((response) => {
          that.msgListLoading = false;
          if (response.data.isSuccess) {
            if (data.flag == 1) {
              window.location.href = response.data.data.showPath;
            } else {
              that.msgListDataChannel = response.data.data;
              that.ChannelentityCount = response.data.data.entityCount - 1;
              that.BBChannelCrT = that.formatDate(response.data.data.entities[0].createTime);
            }
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          that.msgListLoading = false;
          console.log('error');
        });
    },
    handleSizeChangeChannel(pageSize) {
      if (!this.msgListLoading) {
        this.pageNoChannel = 1;
        this.pageSize = pageSize;
        this.getBBListChannel();
      }
    },
    handleCurrentChangeChannel(pageNoChannel) {
      if (!this.msgListLoading) {
        this.pageNoChannel = pageNoChannel;
        this.getBBListChannel();
      }
    },
    // 产业
    getBBListIndustry(flag) {
      const that = this;
      const data = {
        pageNo: that.pageNoIndustry,
        pageSize: that.pageSize
      };
      if (flag == 1) {
        data.flag = 1;
      } else {
        data.flag = 0;
      }
      that.msgListLoading = true;
      axios({
        url: `${this.apiUrl}vipcenter/dealForm/queryDealFormForCenterToIndustry`,
        method: 'post',
        data
      })
        .then((response) => {
          that.msgListLoading = false;
          if (response.data.isSuccess) {
            if (data.flag == 1) {
              window.location.href = response.data.data.showPath;
            } else {
              that.msgListDataIndustry = response.data.data;
              that.IndustryentityCount = response.data.data.entityCount - 1;
              that.BBIndustryCrT = that.formatDate(response.data.data.entities[0].createTime);
            }
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          that.msgListLoading = false;
          console.log('error');
        });
    },
    handleSizeChangeIndustry(pageSize) {
      if (!this.msgListLoading) {
        this.pageNoIndustry = 1;
        this.pageSize = pageSize;
        this.getBBListIndustry();
      }
    },
    handleCurrentChangeIndustry(pageNoIndustry) {
      if (!this.msgListLoading) {
        this.pageNoIndustry = pageNoIndustry;
        this.getBBListIndustry();
      }
    },
    // 中心列表
    getBBListCenter(flag) {
      const that = this;
      const data = {
        pageNo: that.pageNoCenter,
        pageSize: that.pageSize
      };
      if (flag == 1) {
        data.flag = 1;
      } else {
        data.flag = 0;
      }
      that.msgListLoading = true;
      axios({
        url: `${this.apiUrl}vipcenter/dealForm/queryDealFormForCenter`,
        method: 'post',
        data
      })
        .then((response) => {
          that.msgListLoading = false;
          if (response.data.isSuccess) {
            if (data.flag == 1) {
              window.location.href = response.data.data.showPath;
            } else {
              that.msgListDataCenter = response.data.data;
              that.CenterentityCount = response.data.data.entityCount - 1;
              that.BBCenterCrT = that.formatDate(response.data.data.entities[0].createTime);
            }
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          that.msgListLoading = false;
          console.log('error');
        });
    },
    // 中心选择页面大小
    handleSizeChangeCenter(pageSize) {
      if (!this.msgListLoading) {
        this.pageNoCenter = 1;
        this.pageSize = pageSize;
        this.getBBListCenter();
      }
    },
    // 中心选择第几页
    handleCurrentChangeCenter(pageNoCenter) {
      if (!this.msgListLoading) {
        this.pageNoCenter = pageNoCenter;
        this.getBBListCenter();
      }
    },
    // 选择报表类型
    selectTypeName(typeName) {
      const that = this;
      that.typeName = typeName;
      if (typeName.indexOf('中心') != -1) {
        that.getBBListCenter();
        that.BBCenter = true;
        that.BBIndustry = false;
        that.BBChannel = false;
        that.BBZXY = false;
        that.BBZXYQuery = false;
      } else if (typeName.indexOf('产业') != -1) {
        that.getBBListIndustry();
        that.BBCenter = false;
        that.BBIndustry = true;
        that.BBChannel = false;
        that.BBZXY = false;
        that.BBZXYQuery = false;
      } else if (typeName.indexOf('渠道') != -1) {
        that.getBBListChannel();
        that.BBCenter = false;
        that.BBIndustry = false;
        that.BBChannel = true;
        that.BBZXY = false;
        that.BBZXYQuery = false;
      } else if (typeName.indexOf('明细') != -1) {
        that.getBBListZXY();
        that.BBCenter = false;
        that.BBIndustry = false;
        that.BBChannel = false;
        that.BBZXY = true;
        that.BBZXYQuery = false;
      } else {
        that.$message({
          type: 'error',
          message: '无此报表'
        });
      }
    },
    // 重置筛选input
    reset() {
      this.input.hmcId = '';
      this.input.center = '';
      this.input.channel = '';
      this.input.industry = '';
    },
    // 格式化时间戳
    formatDate(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
      const hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
      const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
      return `${year}-${month}-${day} ${hour}:${minutes}`;
    },
    // 条件筛选查询 flag为1时导表
    getQuery(flag) {
      const data = JSON.parse(JSON.stringify(this.input));
      if (this.input.center.indexOf('所有') != -1) {
        data.center = '';
      }
      if (this.input.channel.indexOf('所有') != -1) {
        data.channel = '';
      }
      if (this.input.industry.indexOf('所有') != -1) {
        data.industry = '';
      }
      const that = this;
      that.isQuery = true;
      if (flag == 1) {
        data.flag = 1;
      } else {
        data.flag = 0;
      }
      data.pageNo = that.pageNoQuery;
      if (flag == 2) {
        data.pageNo = 1;
        that.pageNoQuery = 1;
        that.BBZXYQuery = true;
        that.BBZXY = false;
      }
      data.pageSize = that.pageSize;
      that.msgListLoading = true;
      axios({
        url: `${this.apiUrl}vipcenter/dealFormSeller/queryDealFormForSeller`,
        method: 'post',
        data
      })
        .then((response) => {
          that.msgListLoading = false;
          if (response.data.isSuccess) {
            if (data.flag == 1) {
              window.location.href = response.data.data.showPath;
            } else {
              that.msgListDataZXYQuery = response.data.data;
            }
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          that.msgListLoading = false;
          console.log('error');
        });
    }
  }
};
</script>

<style scoped>
.vip-content {
  padding-top: 15px;
  position: relation;
}
.daoBiaoBtn {
  position: absolute;
  top: 30px;
  right: 40px;
}
.rights-config-header {
  background: initial;
}
.BBType {
  display: flex;
  /* justify-content: space-between; */
  margin: 20px 0;
  height: 80px;
}
.tempBox {
  width: 25%;
}
.oneType:hover {
  cursor: pointer;
}

.oneType:hover .oneTypeRight {
  font-size: 26px;
}
.oneType {
  height: 80px;
  width: 94%;
  color: #fff;
  line-height: 80px;
  border-radius: 2px;
  display: flex;
}

.oneType .oneTypeLeft {
  flex: 2;
  line-height: 25px;
  font-size: 14px;
  width: 30%;
  background: #0000001c;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.oneType .oneTypeRight {
  flex: 3;
  font-size: 24px;
  width: 70%;
  text-align: center;
}
.oneColor {
  background: #4caf50;
}
.twoColor {
  background: #03a9f4;
}
.threeColor {
  background: #f39c12;
}
.fourColor {
  background: #f44336;
}
.fiveColor {
  background: #03a9f4;
}
.leftname {
  width: 90px;
  display: inline-block;
}
.el-table {
  margin: auto;
  text-align: center;
}

.el-pagination {
  text-align: right;
  margin: 15px auto 0;
  padding: 0;
}

.bh-color {
  color: #f3918d;
}

.rights-act-list .el-table th,
.el-table th div {
  background: #e0f0ff;
  font-weight: normal;
}

.rights-act-list .el-table__body-wrapper tr:nth-child(odd) {
}

.rights-act-list .el-table__body-wrapper tr:nth-child(even) {
  background: #f6f6f6;
}

.el-table th,
.el-table th div {
  background: #e0f0ff;
  font-weight: normal;
}

.el-table_1_column_5 .cell.el-tooltip > div {
  position: initial !important;
}

.el-table_1_column_5 .el-loading-spinner .circular {
  width: 22px;
}

.el-table_1_column_5 .el-loading-mask {
  background: rgba(0, 0, 0, 0);
}
</style>
