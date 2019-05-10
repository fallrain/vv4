<template>
  <div class="vip-content" style="min-width:1230px;">
    <div class="rights-config-header-box">
      <div class="rights-config-header">
        <div class="header-title">
          <span>{{ title }}</span>
        </div>
        <div class="rights-config-step setted" style="margin-left:35px">
          <div class="step-index"><span>1</span></div>
          <div class="step-title"><span>基础信息配置</span></div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step setted" style="margin-left:242px">
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
      <!--<a href="javascript:;" @click="submit('temporary')">存草稿</a>-->
      <!--<span>回来继续配置</span>-->
      <!--</div>-->
    </div>
    <div style="width: 898px; margin: auto;">
      <div class="config-form config-confirm">
        <div class="config-item">
          <div class="config-item-1-2 edit-config-1-2">
            <p>基础信息</p>
            <div>
              <label for=""
                ><span>权益活动名称：</span>
                <p>{{ form.name }}</p></label
              >
              <label for=""
                ><span>权益类型：</span>
                <p>{{ form.buildCardName }}</p></label
              >
              <label for=""
                ><span>权益券：</span>
                <p>{{ form.type }}</p></label
              >
              <label for=""
                ><span>活动有效期：</span>
                <p>{{ form.startTime | timeFilter }} - {{ form.endTime | timeFilter | endTimeFilter }}</p></label
              >
              <label for=""
                ><span>投入预算：</span>
                <p>
                  <span class="color-red">{{ form.budgetAmount }}</span> 元
                </p></label
              >
              <label for=""
                ><span>权益总量：</span>
                <p>
                  <span class="color-red">{{ form.num }}</span>
                </p></label
              >
              <!--<label for=""><span>成本合计：</span><p v-if="form.recognitionFlag==1">是</p><p v-if="form.recognitionFlag==0">否</p></label>-->
              <a href="javascript:;" class="edit-config-btn" @click="edit(1)">修改</a>
            </div>
          </div>
          <div class="config-item-1-2 edit-config-1-2">
            <p>发放范围</p>
            <div>
              <label for=""
                ><span>活动小微：</span>
                <p :title="form.xiaoweiName">{{ form.xiaoweiName | nameFilter }}</p></label
              >
              <label for=""
                ><span>活动渠道：</span>
                <p :title="form.channel">{{ form.channel | nameFilter }}</p></label
              >
              <label for=""
                ><span>活动门店：</span>
                <p :title="form.shopName">{{ form.shopName | nameFilter }}</p></label
              >
              <label for=""
                ><span>经营产业：</span>
                <p :title="form.productCategoryName | productFilter">
                  {{ form.productCategoryName | categorynameFilter }}
                </p></label
              >
              <label for=""
                ><span>资源发放形式：</span>
                <p :title="form.resourceForm">{{ form.resourceForm | resourceFormFilter }}</p></label
              >
              <label for="" v-if="form.resourceForm == 1"
                ><span>关联资源位：</span>
                <p :title="form.sourceName">{{ form.sourceName | nameFilter }}</p></label
              >
              <label for=""
                ><span>发放方式：</span>
                <p>{{ form.sendChannelType | typeFilter }}</p></label
              >
              <a href="javascript:;" class="edit-config-btn" @click="edit(2)">修改</a>
            </div>
          </div>
        </div>
        <div class="config-item-1-1 edit-config-1-2">
          <p>发放规则</p>
          <div v-if="form.ruleType">
            <p v-if="form.ruleType == 1">按定向人群</p>
            <p v-if="form.ruleType == 2">按直销员均分</p>
            <div class="junfen" v-if="form.ruleType == 2">
              <p class="junfen-fugai">
                本次权益预计发放覆盖 <span>{{ sellersCount }}</span> 位直销员，这些直销员共经营用户量
                <span>{{ userCount }}</span> 人
              </p>
              <p class="junfen-celue">您的策略：</p>
              <p class="junfen-fenpei">
                每个直销员分配<span style="padding: 0 10px;border-bottom: 1px solid #ccc;margin: 0 10px;">{{
                  form.config
                }}</span
                >份
              </p>
            </div>
            <p v-if="form.ruleType == 3">按直销员销量</p>
            <div class="junfen" v-if="form.ruleType == 3">
              <p style="line-height: 32px;">
                按照
                <span v-if="form.salesVolume == 1" style="color: #FF0000;">近一个月</span>
                <span v-if="form.salesVolume == 2" style="color: #FF0000;">近三个月</span>
                <span v-if="form.salesVolume == 3" style="color: #FF0000;">近半年</span>
                直销员产品销量由高到低分配
              </p>
              <p class="junfen-celue">覆盖范围：</p>
              <div class="xiaoliang-fenpei">
                <p v-for="item in form.topTen">
                  直销员：<span style="min-width: 60px;">{{ item.HNAME }}</span> 经营用户量：<span
                    style="min-width: 48px;"
                    >{{ item.userCount }}</span
                  >
                  送权益数量：<span style="margin-right: 0;min-width: 45px;">{{ item.cardNum }}</span
                  >份
                </p>
                <p v-if="form.topTen.length == 10">.........</p>
                <el-button type="primary" style="padding: 4px 15px;margin-top: 5px;" @click="excelPath"
                  ><i class="ico-down"></i>导出详情</el-button
                >
              </div>
            </div>
          </div>
          <a href="javascript:;" class="edit-config-btn" @click="edit(3)">修改</a>
        </div>
        <el-button type="primary" class="trs-btn" style="width:109px;margin-top:14px;" @click="submit"
          >确认提交方案</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      title: '直销员经营权益配置',
      form: {},
      rules: {},
      similarRights: false,
      repeatRights: [],
      cpname: true,
      modelNo: '',
      buyAm: true,
      sellersCount: '',
      userCount: ''
    };
  },
  filters: {
    timeFilter(val) {
      if (val) {
        val = val.split(' ')[0];
      }

      return val;
    },
    nameFilter(val) {
      if (val) {
        if (val.length > 15) {
          val = `${val.substring(0, 15)}...`;
        }
      }
      return val;
    },
    resourceFormFilter(val) {
      if (val == 1) {
        val = '资源位';
      }
      if (val == 2) {
        val = '入户服务';
      }
      if (val == 3) {
        val = '潜在顾客';
      }
      return val;
    },
    productFilter(val) {
      if (val) {
        if (val == 'all') {
          val = '所有产业';
        }
      }
      return val;
    },
    categorynameFilter(val) {
      if (val) {
        if (val == 'all') {
          val = '所有产业';
        }
        if (val.length > 15) {
          val = `${val.substring(0, 15)}...`;
        }
      }
      return val;
    },
    typeFilter(val) {
      if (val) {
        const arr = [];
        for (const i in val.split(',')) {
          if (val.split(',')[i] == 1) {
            arr.push('兑呗已录单用户');
          }
          if (val.split(',')[i] == 2) {
            arr.push('微信好友');
          }
        }
        return arr.join('，');
      }
      return val;
    },
    rightSmallTypeFilter(val) {
      if (val == 1) {
        val = '单品权益';
      } else if (val == 2) {
        val = '套购权益';
      } else if (val == 3) {
        val = '台阶积分卡';
      }
      return val;
    },
    endTimeFilter(val) {
      if (val && val.indexOf('2099') == 0) {
        val = '不限结束时间';
      }
      return val;
    }
  },
  methods: {
    excelPath() {
      window.location.href = this.form.excelPath;
    },
    getUserAndSellersCount() {
      const _this = this;
      const data = { id: this.$route.query.id };
      this.requestManagement.getUserAndSellersCount(data).then((data) => {
        if (data.isSuccess) {
          _this.sellersCount = data.data.sellersCount;
          _this.userCount = data.data.userCount;
        }
      });
    },
    submit(temporary) {
      const _this = this;
      const data = {
        id: this.$route.query.id,
        step: 4
      };
      this.requestManagement.saveupdateVipUserManageConfig(data).then((data) => {
        if (data.isSuccess) {
          _this.$router.push({
            path: '/management/rightssuccess',
            query: { id: data.data }
          });
        }
      });
    },
    getOrderRightsById() {
      const _this = this;
      _this.cpname = true;
      _this.buyAm = true;
      const params = {
        id: this.$route.query.id
      };
      this.requestManagement.getVipUserManageConfigVOById(params).then((data) => {
        if (data.isSuccess) {
          data.data.topTen = JSON.parse(data.data.topTen);
          _this.form = data.data;
          console.log(_this.form);
        }
      });
    },
    edit(index) {
      let path = '';
      if (index == 1) {
        path = '/management/rightsdirect';
      } else if (index == 2) {
        path = '/management/rightsgrantrange';
      } else if (index == 3) {
        path = '/management/rightsrulerange';
      }
      this.$router.push({
        path,
        query: {
          id: this.$route.query.id
        }
      });
    }
  },
  mounted() {
    this.getOrderRightsById();
    this.getUserAndSellersCount();
  }
};
</script>
<style scoped>
.junfen {
  margin-left: 30px;
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
.model-dian {
  float: left;
  margin-right: 5px;
  width: 5px;
  height: 20px;
  margin-top: 7px;
  background-color: #ffa24f;
}
.config-form {
  max-height: 522px;
  position: absolute;
  top: 20px;
  bottom: 20px;
  overflow: auto;
}

.config-confirm {
  padding: 35px 55px 27px;
}
.config-item {
  text-align: center;
}
.config-item-1-2 {
  display: inline-block;
  margin: 0 2px;
  vertical-align: top;
}
.config-item-1-2 > p {
  font-size: 16px;
  font-weight: bold;
  color: #28272b;
  text-align: left;
  margin-bottom: 10px;
}
.config-item-1-2 div {
  width: 384px;
  height: 233px;
  border: 1px solid #cccccc;
  text-align: left;
  padding-top: 15px;
}
.config-item-1-2 label {
  display: block;
  line-height: 25px;
}
.config-item-1-2 label p {
  display: inline-block;
}
.config-item-1-2 label span {
  display: inline-block;
  width: 135px;
  text-align: right;
  font-weight: bold;
}
.config-item-1-2:last-child label span {
  width: 120px;
}
.config-item-1-1 > p {
  font-size: 16px;
  font-weight: bold;
  color: #28272b;
  text-align: left;
  margin-bottom: 10px;
  margin-top: 18px;
}
.config-item-1-1 > div {
  min-height: 122px;
  border: 1px solid #cccccc;
  padding: 10px 20px;
}
.config-item-1-1 > div > p {
  margin-bottom: 10px;
}

.config-confirm .trs-btn {
  margin: 10px auto 0;
  display: block;
}
.similar-rights-dialog table {
  width: 100%;
  margin-top: 15px;
}
.similar-rights-dialog th {
  background: #e0f0ff;
  border: 1px solid #cccccc;
  padding: 5px 0;
}
.similar-rights-dialog td {
  border: 1px solid #cccccc;
  text-align: center;
  padding: 5px 0;
}
.similar-rights-dialog .dialog-footer {
  text-align: center;
}

.edit-config-1-2 {
  position: relative;
}

.edit-config-1-2:hover div {
  border-color: #45a0f8;
  background: #edf6ff;
  position: relative;
}

.edit-config-btn {
  display: none;
}
.edit-config-1-2:hover .edit-config-btn {
  display: block;
  position: absolute;
  width: 58px;
  height: 22px;
  border: 1px solid #45a0f8;
  border-radius: 2px;
  color: #45a0f8;
  background: #fff;
  text-align: center;
  bottom: 6px;
  right: 5px;
}
.config-item-1-2 label span.color-red {
  color: #ee5851;
  font-weight: normal;
  display: inline;
}
.product-tap {
  margin-bottom: 3px !important;
  margin-top: 3px;
}
.product-tap div {
  width: auto;
  display: inline-block;
  position: relative;
  /*margin-top: 10px;*/
  margin-right: 10px;
  /*width: 174px;*/
}

.product-tap div span {
  display: inline-block;
  line-height: 26px;
  border: 1px solid #c3e0fd;
  background: #fff;
  max-width: 174px;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
}

.product-tap div .ico-del {
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
</style>
<style>
.similar-rights-dialog .el-dialog__header {
  /* display: none; */
  padding: 0;
}

.similar-rights-dialog .el-dialog__footer {
  padding-bottom: 35px;
}
</style>
