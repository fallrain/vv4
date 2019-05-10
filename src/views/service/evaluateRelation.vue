<template>
  <div class="vip-content">
    <div>
      <p class="template-brand">
        <i></i>评价并联
        <!--<el-button type="primary" style="float: right;" @click="exportExcel" v-if="jurisdiction['servicesOperations:evaluateMultiple:exportJD'] || jurisdiction['servicesOperations:evaluateMultiple:exportOther'] || jurisdiction['servicesOperations:evaluateMultiple:exportGW'] || jurisdiction['servicesOperations:evaluateMultiple:exportTM'] || jurisdiction['servicesOperations:evaluateMultiple:exportSg']">-->
        <!--导出excel-->
        <!--</el-button>-->
      </p>
      <div class="clear"></div>
    </div>
    <div class="clear">
      <div style="float: left;">
        <span>选择渠道：</span>
        <el-select v-model="sign" placeholder="请选择渠道" @change="signChange">
          <el-option
            :key="1"
            label="京东"
            :value="1"
            v-if="jurisdiction['servicesOperations:evaluateMultiple:queryJD']"
          >
          </el-option>
          <el-option
            :key="2"
            label="天猫"
            :value="2"
            v-if="jurisdiction['servicesOperations:evaluateMultiple:queryTM']"
          >
          </el-option>
          <el-option
            :key="4"
            label="官网"
            :value="4"
            v-if="jurisdiction['servicesOperations:evaluateMultiple:queryGW']"
          >
          </el-option>
          <el-option
            :key="5"
            label="其他"
            :value="5"
            v-if="jurisdiction['servicesOperations:evaluateMultiple:queryOther']"
          >
          </el-option>
          <el-option
            :key="3"
            label="顺逛"
            :value="3"
            v-if="jurisdiction['servicesOperations:evaluateMultiple:querySg']"
          >
          </el-option>
        </el-select>
      </div>
      <div style="float: left;margin-left: 20px;">
        <span>用户电话：</span>
        <el-input
          :maxlength="11"
          v-model="mobile"
          placeholder="请输入用户电话"
          style="display: inline-block;width: 200px;"
          @input.native="mobile = mobile.replace(/[^\d]/g, '')"
        ></el-input>
      </div>
      <div style="float: left;margin-left: 20px;">
        <el-button type="primary" @click="query">查询</el-button>
        <span v-if="sign != 3">
          <el-button
            type="primary"
            @click="exportEvaluateTemplate"
            v-if="
              jurisdiction['servicesOperations:evaluateMultiple:importJD'] ||
                jurisdiction['servicesOperations:evaluateMultiple:importTM'] ||
                jurisdiction['servicesOperations:evaluateMultiple:importGW'] ||
                jurisdiction['servicesOperations:evaluateMultiple:importOther']
            "
            >下载模板</el-button
          >
        </span>
        <el-upload
          v-if="sign != 3"
          style="display: inline-block;"
          :action="gUtils.getApiUrl() + 'vipcenter/ResearchConfigTmGdController/uploadTmJdEvaluate'"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :data="{ sign: sign }"
        >
          <el-button
            type="primary"
            :loading="loading"
            :disabled="disabled"
            v-if="
              jurisdiction['servicesOperations:evaluateMultiple:importJD'] ||
                jurisdiction['servicesOperations:evaluateMultiple:importTM'] ||
                jurisdiction['servicesOperations:evaluateMultiple:importGW'] ||
                jurisdiction['servicesOperations:evaluateMultiple:importOther']
            "
            >导入数据</el-button
          >
        </el-upload>
      </div>
    </div>

    <!--京东商城表格，官网、其他-->
    <el-table
      v-show="sign == '' || sign == 1 || sign == 4 || sign == 5"
      border
      :data="JDData"
      style="width: 100%;margin-top: 20px;"
    >
      <el-table-column label="序号" width="80" :show-overflow-tooltip="true">
        <template scope="scope">
          {{ (pageNo - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="source" label="评价来源" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="userName" label="用户姓名" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="mobile" label="用户电话" width="130" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="brandName" label="产品品牌" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="productCategoryName" label="产品品类" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="createOrderTime" label="下单时间" width="160" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="skuCode" label="sku编号" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="goodsName" label="商品名称" width="160" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="evaluateLevel" label="评分级别" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="evaluateContent" label="评价内容" width="180" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="evaluateTime" label="评价时间" width="160" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="查看详情" width="100" :show-overflow-tooltip="true">
        <template scope="scope">
          <el-button type="text" @click="getJDDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="feedbackTime" label="处理时间" width="160" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="feedbackStatus" label="处理状态" width="100" :show-overflow-tooltip="true">
      </el-table-column>
    </el-table>
    <!--天猫商城表格-->
    <el-table v-show="sign == 2" border :data="TMData" style="width: 100%;margin-top: 20px;">
      <el-table-column label="序号" width="80" :show-overflow-tooltip="true">
        <template scope="scope">
          {{ (pageNo - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="source" label="评价来源" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="userName" label="用户姓名" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="mobile" label="用户电话" width="130" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="productCategoryName" label="产品产业" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="classify" label="产品分类" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="goodsName" label="产品型号" width="180" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="shopName" label="所在门店" width="180" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="center" label="所在工贸" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="materielCode" label="sku编号" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="evaluateContent" label="评价内容" width="180" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="evaluateTime" label="评价时间" width="160" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="查看详情" width="100" :show-overflow-tooltip="true">
        <template scope="scope">
          <el-button type="text" @click="getTMDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="feedbackTime" label="处理时间" width="160" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="feedbackStatus" label="处理状态" width="100" :show-overflow-tooltip="true">
      </el-table-column>
    </el-table>
    <!--顺逛商城-->
    <el-table v-show="sign == 3" border :data="SGData" style="width: 100%;margin-top: 20px;">
      <el-table-column label="序号" width="80" :show-overflow-tooltip="true">
        <template scope="scope">
          {{ (pageNo - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="source" label="评价来源" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="user_name" label="用户姓名" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="mobile" label="用户电话" width="130" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="address" label="用户地址" width="160" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="plat_name" label="平台" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="industry_name" label="产业" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="category_name" label="品类" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="product_name" label="型号" width="150" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="sku" label="sku编号" width="150" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="comment_contents" label="评价内容" width="180" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="comment_time" label="评价时间" width="160" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="查看详情" width="100" :show-overflow-tooltip="true">
        <template scope="scope">
          <el-button type="text" @click="getSGDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="feedbackTime" label="处理时间" width="160" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="feedbackStatus" label="处理状态" width="100" :show-overflow-tooltip="true">
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
      :total="total"
    >
    </el-pagination>

    <!--京东详情-->
    <jddetail :JDDialog="JDDialog" :data="JDDetailData" @JDClose="JDClose"></jddetail>

    <!--天猫详情-->
    <tmdetail :TMDialog="TMDialog" :data="TMDetailData" @TMClose="TMClose"></tmdetail>

    <!--顺逛详情-->
    <sgdetail :SGDialog="SGDialog" :data="SGDetailData" @SGClose="SGClose"></sgdetail>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import gUtils from '../../utils/gUtils.js';
import jddetail from './dialog/JDDetail';
import tmdetail from './dialog/TMdetail';
import sgdetail from './dialog/SGdetail';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  components: {
    jddetail,
    tmdetail,
    sgdetail
  },
  data() {
    return {
      sign: '',
      mobile: '',
      JDData: [],
      TMData: [],
      SGData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      JDDialog: false,
      JDDetailData: [],
      TMDialog: false,
      TMDetailData: [],
      SGDialog: false,
      SGDetailData: [],
      loading: false,
      disabled: true
    };
  },
  methods: {
    query() {
      this.total = 0;
      this.pageNo = 1;
      this.pageResearchConfigTmGd();
    },
    exportExcel() {
      const data = {
        sign: this.sign,
        mobile: this.mobile
      };
      this.requestService.exportEvaluate(data).then((data) => {
        if (data.isSuccess) {
          window.location.href = data.data.showPath;
        }
      });
    },
    signChange(e) {
      this.pageNo = 1;
      this.pageSize = 10;
      this.total = 0;
      this.disabled = true;
      this.pageResearchConfigTmGd();
    },
    beforeUpload(file) {
      if (this.sign == '') {
        this.$message({
          message: '请选择渠道',
          type: 'warning'
        });
        return false;
      }
      this.loading = true;
    },
    handleSuccess(res) {
      this.loading = false;
      if (res.isSuccess) {
        this.$message.success(res.msg);
        this.pageResearchConfigTmGd();
      } else {
        this.$message.warning(res.msg);
      }
    },
    exportEvaluateTemplate() {
      const _this = this;
      if (this.sign == '') {
        this.$message({
          message: '请选择渠道',
          type: 'warning'
        });
        return;
      }
      const data = {
        sign: this.sign
      };
      this.requestService.exportEvaluateTemplate(data).then((data) => {
        if (data.isSuccess) {
          _this.disabled = false;
          window.location.href = data.data.showPath;
        }
      });
    },
    pageResearchConfigTmGd() {
      const _this = this;
      if (this.sign == '') {
        this.$message({
          message: '请选择渠道',
          type: 'warning'
        });
        return;
      }
      this.JDData = [];
      this.TMData = [];
      this.SGData = [];
      const data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sign: this.sign,
        mobile: this.mobile
      };
      this.requestService.pageResearchConfigTmGd(data).then((data) => {
        if (data.isSuccess) {
          if (_this.sign == 1 || _this.sign == 4 || _this.sign == 5) {
            _this.JDData = data.data.entities;
          }
          if (_this.sign == 2) {
            _this.TMData = data.data.entities;
          }
          if (_this.sign == 3) {
            _this.SGData = data.data.entities;
          }
          _this.total = data.data.entityCount;
        }
      });
    },
    JDClose(e) {
      this.JDDialog = e;
    },
    TMClose(e) {
      this.TMDialog = e;
    },
    SGClose(e) {
      this.SGDialog = e;
    },
    getJDDetail(e) {
      this.JDDetailData = e;
      this.JDDialog = true;
    },
    getTMDetail(e) {
      this.TMDetailData = e;
      this.TMDialog = true;
    },
    getSGDetail(e) {
      this.SGDetailData = e;
      this.SGDialog = true;
    },
    handleSizeChange(pageSize) {
      this.pageNo = 1;
      this.pageSize = pageSize;
      if (this.sign && (this.JDData.length != 0 || this.TMData.length != 0 || this.SGData.length != 0)) {
        this.pageResearchConfigTmGd();
      }
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      if (this.sign && (this.JDData.length != 0 || this.TMData.length != 0 || this.SGData.length != 0)) {
        this.pageResearchConfigTmGd();
      }
    }
  },
  mounted(e) {}
};
</script>

<style scoped>
.clear:after {
  content: '';
  display: block;
  clear: both;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
.clear {
  zoom: 1;
}
</style>
