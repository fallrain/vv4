<template>
  <div class="vip-content" style="min-width:1230px;">
    <div class="rights-config-header-box">
      <div class="rights-config-header">
        <div class="header-title">
          <span>{{ title }}</span>
        </div>
        <div class="rights-config-step" style="margin-left:35px">
          <div class="step-index"><span>1</span></div>
          <div class="step-title"><span>基础信息配置</span></div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:242px">
          <div class="step-index"><span>2</span></div>
          <div class="step-title"><span>发放范围配置</span></div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step setted" style="margin-left:449px">
          <div class="step-index"><span>3</span></div>
          <div class="step-title"><span>发放规则配置</span></div>
          <div class="step-bg"></div>
        </div>
      </div>
      <!--<div class="save-draft">-->
      <!--<span>有急事？先</span>-->
      <!--<a href="javascript:;" @click="save('temporary')">存草稿</a>-->
      <!--<span>回来继续配置</span>-->
      <!--</div>-->
    </div>
    <div style="width: 898px; margin: auto;">
      <div class="config-form">
        <div class="config-form-header">
          <span>发放规则配置</span>
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="发放规则 " prop="">
            <el-radio-group v-model="form.ruleType" @change="typeChange">
              <el-radio :label="1" disabled>按定向人群</el-radio>
              <el-radio :label="2">按直销员均分</el-radio>
              <el-radio :label="3">按直销员销量</el-radio>
            </el-radio-group>
            <el-tooltip
              class="item"
              effect="dark"
              content="根据直销员在一定时间段内销售家电数量进行分配"
              placement="top"
            >
              <p class="rule-icon"><img src="../../assets/images/icon-qMark.png" alt="" /></p>
            </el-tooltip>
          </el-form-item>
          <div class="junfen" v-if="!form.ruleType"></div>
          <!--按直销员均分-->
          <div class="junfen" v-if="form.ruleType == 2">
            <p class="junfen-fugai">
              本次权益预计发放覆盖 <span>{{ sellersCount }}</span> 位直销员，这些直销员共经营用户量
              <span>{{ userCount }}</span> 人
            </p>
            <p class="junfen-celue">您的策略：</p>
            <p class="junfen-fenpei">
              每个直销员分配
              <el-input
                v-model="form.config"
                :maxlength="8"
                style="width: 80px"
                placeholder=""
                @change="pricechange"
                @keyup.native="form.config = form.config.replace(/\D/g, '').slice(0, 8)"
              ></el-input>
              份
            </p>
          </div>
          <!--按直销员销量-->
          <div class="junfen" v-if="form.ruleType == 3">
            <p style="line-height: 32px;">
              按照
              <el-select v-model="form.salesVolume" placeholder="请选择" style="width: 100px">
                <el-option v-for="item in xiaoliangoptions" :key="item.id" :label="item.value" :value="item.id">
                </el-option>
              </el-select>
              直销员产品销量由高到低
              <el-button style="padding: 7px 15px;" type="primary" @click="distribution">分配</el-button>
            </p>
            <p class="junfen-celue">覆盖范围：</p>
            <div class="xiaoliang-fenpei" v-if="range.length != 0">
              <p v-for="item in range">
                直销员：<span style="min-width: 60px;">{{ item.HNAME }}</span> 经营用户量：<span
                  style="min-width: 48px;"
                  >{{ item.userCount }}</span
                >
                送权益数量：<span style="margin-right: 0;min-width: 45px;">{{ item.cardNum }}</span
                >份
              </p>
              <p v-if="range.length == 10">.........</p>
            </div>
            <div
              style="display: flex;justify-content: space-between;padding: 0 80px;margin-top: 10px;"
              v-if="range.length != 0"
            >
              <el-button type="primary" style="padding: 5px 15px" @click="deriving"
                ><i class="ico-down"></i>导出详情</el-button
              >
              <el-upload
                class="upload-demo m-vipinbtn"
                :action="gUtils.getApiUrl() + 'vipcenter/vipUserManageConfig/uploadUserManageFile'"
                :data="{ id: $route.query.id }"
                :on-error="uploaderr"
                :on-success="uploadsuccess"
                :on-remove="handleRemove"
                multiple
                :limit="1"
                :show-file-list="false"
              >
                <el-button type="primary" style="padding: 5px 15px" :disabled="canotChange">
                  <i class="ico-vipin"></i>导入详情
                </el-button>
              </el-upload>
            </div>
          </div>

          <el-form-item>
            <el-button class="trs-btn" style="width:109px;margin-top:14px;" @click="prev">上一步</el-button>
            <el-button
              type="primary"
              class="trs-btn"
              style="width:109px;margin-top:14px;margin-left:11px;"
              :disabled="disableGenerate || budgetAmount < costAmount || costAmount == 0"
              @click="save"
              >生成方案
            </el-button>
          </el-form-item>
        </el-form>
        <div class="cost-bar">
          权益成本：<b class="color-red">{{ costAmount }}</b> &nbsp;&nbsp;|&nbsp;&nbsp; 投入预算：<b
            class="color-red"
            >{{ budgetAmount }}</b
          >
          &nbsp;&nbsp;|&nbsp;&nbsp; 剩余金额：<b class="color-red" v-if="budgetAmount >= costAmount">{{
            parseFloat(budgetAmount - costAmount).toFixed(2)
          }}</b
          ><b class="color-red" v-if="budgetAmount < costAmount">0</b> &nbsp;&nbsp;
          <i
            v-if="budgetAmount >= costAmount"
            style="display:inline-block;height:16px;width:16px;border-radius: 16px;background:#00df60;vertical-align: text-top;margin-right:6px;margin-left:16px;"
          ></i
          ><span v-if="budgetAmount >= costAmount">正常</span>
          <i
            v-if="budgetAmount < costAmount"
            style="display:inline-block;height:16px;width:16px;border-radius: 16px;background:#ee5851;vertical-align: text-top;margin-right:6px;margin-left:16px;"
          ></i
          ><span v-if="budgetAmount < costAmount">超预算</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      title: '直销员经营权益配置',
      disableGenerate: true,
      budgetAmount: 0,
      costAmount: 0,
      input: '',
      form: {
        ruleType: 2,
        config: '',
        salesVolume: '',
        excelSign: '',
        step: 3
      },
      rules: {},
      xiaoliangoptions: [
        {
          id: 1,
          value: '近一个月'
        },
        {
          id: 2,
          value: '近三个月'
        },
        {
          id: 3,
          value: '近半年'
        }
      ],
      sellersCount: 0,
      userCount: 0,
      price: 0,
      range: [],
      canotChange: true,
      is_change: false
    };
  },
  methods: {
    // 导出
    deriving() {
      const _this = this;
      const data = {
        id: this.$route.query.id,
        type: this.form.salesVolume
      };
      this.requestManagement.downloadSellers(data).then((data) => {
        if (data.isSuccess) {
          _this.canotChange = false;
          window.location.href = data.data.showPath;
        }
      });
    },
    // 上传文件成功后调用方法
    uploadsuccess(response) {
      if (response.isSuccess) {
        this.form.excelSign = 1;
        this.costAmount = response.data.costAmount;
        this.range = response.data.topTen;
        this.disableGenerate = false;
        this.$message({
          type: 'success',
          message: '上传成功'
        });
      } else {
        this.disableGenerate = true;
        this.$message({
          type: 'warning',
          message: response.msg
        });
      }
    },
    handleRemove() {
      this.form.uuid = '';
    },
    // 上传失败
    uploaderr(err) {
      this.$message({
        type: 'warning',
        message: '上传失败'
      });
    },
    // 分配
    distribution() {
      const _this = this;
      if (this.form.salesVolume == '') {
        this.$message({
          message: '请选择时间范围',
          type: 'warning'
        });
        return;
      }
      _this.form.excelSign = 2;
      const data = {
        id: this.$route.query.id,
        type: this.form.salesVolume,
        status: 1
      };
      this.requestManagement.listTopTen(data).then((data) => {
        if (data.isSuccess) {
          _this.range = data.data.data;
          _this.costAmount = data.data.costAmount;
          _this.disableGenerate = false;
        } else {
          _this.range = [];
        }
      });
    },
    // 第一次进入获取range
    getrange() {
      const _this = this;
      const data = {
        id: this.$route.query.id,
        type: this.form.salesVolume,
        status: 2
      };
      this.requestManagement.listTopTen(data).then((data) => {
        if (data.isSuccess) {
          _this.range = data.data.data;
          setTimeout(() => {
            _this.costAmount = data.data.costAmount;
          }, 300);
          _this.disableGenerate = false;
        } else {
          _this.range = [];
        }
      });
    },
    prev() {
      this.$router.push({
        path: '/management/rightsgrantrange',
        query: { id: this.$route.query.id }
      });
    },
    save() {
      const data = JSON.parse(JSON.stringify(this.form));
      const _this = this;
      this.requestManagement.saveupdateVipUserManageConfig(data).then((data) => {
        if (data.isSuccess) {
          _this.$router.push({
            path: '/management/rightsdirectconfirm',
            query: { id: data.data }
          });
        }
      });
    },
    typeChange(e) {
      this.form.config = '';
      this.costAmount = 0;
      this.range = [];
      this.disableGenerate = true;
      this.canotChange = true;
    },
    getUserAndSellersCount() {
      const _this = this;
      const data = { id: this.$route.query.id };
      this.requestManagement.getUserAndSellersCount(data).then((data) => {
        if (data.isSuccess) {
          _this.sellersCount = data.data.sellersCount;
          _this.userCount = data.data.userCount;
          _this.costAmount = _this.form.config * _this.price * _this.sellersCount;
          _this.disableGenerate = false;
        }
      });
    },
    getOrderRightsById() {
      const _this = this;
      this.requestManagement.getVipUserManageConfigVOById({ id: this.$route.query.id }).then((data) => {
        if (data.isSuccess) {
          _this.price = data.data.price;
          _this.budgetAmount = data.data.budgetAmount;
          _this.price = data.data.price;
          _this.form.id = data.data.id;
          if (data.data.ruleType) {
            _this.form.ruleType = data.data.ruleType;
          }
          _this.form.config = data.data.config;
          _this.form.salesVolume = data.data.salesVolume;
          _this.form.excelSign = data.data.excelSign;
          if (data.data.excelSign) {
            if (data.data.excelSign == 1) {
              _this.getrange();
            } else {
              _this.distribution();
            }
          }
          _this.getUserAndSellersCount();
        }
      });
    },
    pricechange(e) {
      if (!isNaN(e)) {
        this.costAmount = e * this.price * this.sellersCount;
        this.disableGenerate = false;
      }
    }
  },
  mounted() {
    this.getOrderRightsById();
  }
};
</script>
<style scoped>
.addmodel-but {
  float: right;
  padding: 7px 10px;
  margin-right: 13px;
}
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
.config-form {
  /* max-height:525px; */
  position: absolute;
  top: 20px;
  bottom: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 0;
}

/* .config-form{position:relative;} */
.config-form .trs-btn {
  margin-left: 159px;
}

.config-form .img-list {
  margin-left: 159px;
}

.gift-list {
  margin-left: 159px;
}

.gift-list .gift-item {
  width: 610px;
  padding: 10px 16px;
  background: #f5f5f5;
  margin: 10px 0;
  position: relative;
}

.gift-list .gift-item p {
  line-height: 20px;
}

.gift-list .gift-item p i {
  width: 12px;
  height: 14px;
  display: inline-block;
  margin-right: 5px;
  background: url('../../assets/images/ico-gift.png') no-repeat;
}

.gift-list .gift-item p a {
  margin-left: 10px;
  color: #45a0f8;
}

.gift-list .gift-item .ico-del {
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: -5px;
  top: -5px;
  background: url('../../assets/images/ico-del.png') no-repeat;
  background-size: 100% 100%;
}

.gift-list .gift {
  color: #f06230;
  word-wrap: break-word;
}

.gift-list .gift-item .ico-tcdel {
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: inline-block;
  background: url('../../assets/images/ico-del.png') no-repeat;
  background-size: 100% 100%;
  vertical-align: -3px;
  margin-left: 5px;
}

.gift-list .gift .split {
  color: #c8c8c8;
}

.select-product {
  margin: 10px 0;
  position: relative;
}

.select-product label {
  width: 80px;
  height: 32px;
  background: #e0f0ff;
  text-align: center;
  margin-bottom: 0;
  margin-right: 5px;
}

.select-product .el-input {
  margin: 0 5px 0 4px;
}

.select-product:after {
  content: '';
  display: inline-block;
  height: 2px;
  width: 24px;
  background: #95cbff;
  vertical-align: 2px;
  margin-left: 25px;
}

.select-product .ico-link {
  width: 20px;
  height: 26px;
  display: inline-block;
  vertical-align: top;
  position: absolute;
  z-index: 10;
  left: 566px;
  top: -18px;
  background: url('../../assets/images/ico-prolink02.png') no-repeat;
}

.select-product:first-child .ico-link {
  display: none;
}

.select-product .ico-del02 {
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  left: 530px;
  margin-top: 7px;
  background: url('../../assets/images/ico-del.png') no-repeat;
  background-size: 100% 100%;
}

.select-product-list {
  position: relative;
}

.select-product-list:after {
  content: '';
  display: inline-block;
  width: 2px;
  background: #95cbff;
  vertical-align: top;
  position: absolute;
  right: 123px;
  top: 18px;
  bottom: 14px;
}

.select-product-list .add-product {
  position: absolute;
  width: 85px;
  height: 24px;
  line-height: 24px;
  margin-left: 0;
  right: 20px;
  top: 50%;
  margin-top: -12px;
}

.gift-list-combination {
  padding: 10px;
  background: #f5f5f5;
  width: 612px;
  margin-top: 15px;
}

.gift-list-combination div {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  margin-right: 2px;
  position: relative;
}

.gift-list-combination div i {
  width: 20px;
  height: 20px;
  display: inline-block;
  position: absolute;
  background: url('../../assets/images/ico-prolink.png');
  left: -13px;
  top: 20px;
}

.gift-list-combination div:first-child i {
  display: none;
}

.gift-list-combination img {
  width: 58px;
  height: 58px;
  background: #fff;
  border: 1px solid #cccccc;
  display: block;
}

.gift-list-combination div p {
  line-height: 16px;
  margin-top: 5px;
}

.gift-list-combination .option-div {
  vertical-align: top;
  margin-left: 12px;
  text-align: left;
}

.gift-list-combination .option-div a {
  vertical-align: top;
  line-height: 20px;
  color: #45a0f8;
}

.option-div .gift-item {
  width: auto;
  display: block;
  margin: 0;
  padding: 0;
  vertical-align: top;
  margin-top: -15px;
}

.option-div .gift-item i {
  position: relative;
  top: 1px;
  left: 0;
}

.score-rights-div {
  border: 1px solid #cccccc;
  padding: 20px 13px;
}

.score-rights-div .score-rights-input label {
  display: inline-block;
  width: 89px;
  line-height: 32px;
  background: #e0f0ff;
  text-align: center;
  margin-right: 2px;
}

.score-rights-div .score-rights-input.by-price label {
  width: 109px;
}

.dialog-footer {
  text-align: center;
  margin-top: 0px;
}

.gift-rights-dialog > p {
  position: absolute;
  top: 20px;
  right: 25px;
}

.gift-rights-dialog .score-rights-div {
  width: 327px;
  display: inline-block;
  height: 412px;
}

.gift-rights-dialog .gift-rights-div {
  width: 430px;
  display: inline-block;
  border: 1px solid #cccccc;
  padding: 20px 17px;
  vertical-align: top;
  margin-left: -4px;
  height: 412px;
}

.gift-budget {
  position: absolute;
  right: 25px;
  top: 20px;
}

.gift-select-list {
  margin-top: 22px;
}

.gift-select-list .gift-select-ul {
  border: 1px solid #3278bc;
  width: 388px;
  margin: 0 -2px;
}

.gift-select-list > div img {
  width: 58px;
  height: 58px;
  border: 1px solid #cccccc;
  vertical-align: top;
}

.gift-select-list > div div {
  display: inline-block;
  vertical-align: top;
}

.gift-select-list ul {
  height: 212px;
  overflow: auto;
}

.gift-select-list .recommended-list ul {
  height: 254px;
}

.gift-select-list li {
  padding: 12px 14px;
  position: relative;
  border-bottom: 1px solid #cccccc;
}

.gift-select-list li img {
  margin-right: 20px;
}

.gift-select-list li button {
  right: 17px;
  text-align: center;
  line-height: 26px;
  padding: 0;
  position: absolute;
  top: 50%;
  margin-top: -13px;
}

.color-red {
  color: #ee5851;
}

.type4-tab a {
  display: inline-block;
  border: 1px solid #cccccc;
  width: 188px;
  line-height: 38px;
  margin-left: 9px;
  margin-bottom: -1px;
  text-align: center;
  background: #ccc;
  margin-top: 19px;
}

.type4-tab a:first-child {
  margin-right: -3px;
}

.type4-tab a.active {
  background: #fff;
}

.type4-tab-panel {
  width: 700px;
  border: 1px solid #cccccc;
  padding: 17px 25px 23px;
}

.gift-list .el-tooltip {
  float: right;
  margin-top: 6px;
  position: relative;
  z-index: 999;
}
.model-dian {
  float: left;
  margin-right: 5px;
  width: 5px;
  height: 20px;
  margin-top: 4px;
  background-color: #ffa24f;
}
.junfen {
  width: 700px;
  margin-left: 163px;
  border: 1px solid #ccc;
  padding: 10px 15px;
  min-height: 200px;
}
.junfen-fugai {
}
.junfen-fugai span {
  font-size: 16px;
  color: #ff0000;
}
.junfen-celue {
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
}
.junfen-fenpei {
  line-height: 32px;
  margin-top: 5px;
  margin-left: 20px;
}
.xiaoliang-fenpei {
  margin-left: 80px;
}
.xiaoliang-fenpei p {
  margin-top: 5px;
}
.xiaoliang-fenpei p span {
  color: #ff0000;
  font-weight: bold;
  margin-right: 10px;
  display: inline-block;
}
.ico-down {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: -2px;
  background: url('../../assets/images/ico-down.png') no-repeat;
}
.ico-vipin {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: -2px;
  background: url('../../assets/images/ico-vipin.png') no-repeat;
}
.rule-icon {
  width: 15px;
  height: 15px;
  display: inline-block;
}
.rule-icon img {
  width: 15px;
  height: 15px;
  float: left;
}
</style>
<style>
.junfen-fenpei .el-input__inner {
  border: none;
  border-bottom: 1px solid #ccc;
}
.junfen-fenpei .el-input__inner:hover {
  border: none;
  border-bottom: 1px solid #ccc;
}
</style>
