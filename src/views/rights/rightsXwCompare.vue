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
          <div class="step-title"><span>活动范围配置</span></div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step setted" style="margin-left:449px">
          <div class="step-index"><span>3</span></div>
          <div class="step-title"><span>赠送礼品配置</span></div>
          <div class="step-bg"></div>
        </div>
      </div>
      <!--<div class="save-draft">-->
      <!--<span>有急事？先</span>-->
      <!--<a href="javascript:;">存草稿</a>-->
      <!--<span>回来继续配置</span>-->
      <!--</div>-->
    </div>
    <div style="width: 898px; margin: auto;">
      <div class="config-form config-compare">
        <div class="config-compare-title">
          <div>冲突权益</div>
          <div>当前权益</div>
        </div>
        <div class="config-item">
          <div class="config-item-1-2">
            <div>
              <label for=""
                ><span>权益活动名称：</span>
                <p>{{ repeatForm.rightName }}</p></label
              >
              <label for=""
                ><span>活动有效期：</span>
                <p>
                  {{ repeatForm.startTime | timeFilter }} - {{ repeatForm.endTime | timeFilter | endTimeFilter }}
                </p></label
              >
              <label for=""
                ><span>礼品兑换有效期：</span>
                <p>
                  {{ repeatForm.exchangeStartTime | timeFilter }} -
                  {{ repeatForm.exchangeEndTime | timeFilter | endTimeFilter }}
                </p></label
              >
              <label for=""
                ><span>投入预算：</span>
                <p>
                  <span class="color-red" style="width:auto">{{ repeatForm.budgetAmount }}</span> 元
                </p></label
              >
              <label for=""
                ><span>成本合计：</span>
                <p>
                  <span class="color-red" style="width:auto">{{ repeatForm.costAmount }}</span> 元
                </p></label
              >
              <!-- <label for=""><span>产出销售额：</span><p>8,746,372 元</p></label> -->
            </div>
          </div>
          <div class="config-item-1-2 edit-config-1-2">
            <div>
              <label for=""
                ><span>权益活动名称：</span>
                <p>{{ form.rightName }}</p></label
              >
              <label for=""
                ><span>活动有效期：</span>
                <p>{{ form.startTime | timeFilter }} - {{ form.endTime | timeFilter | endTimeFilter }}</p></label
              >
              <label for=""
                ><span>礼品兑换有效期：</span>
                <p>
                  {{ form.exchangeStartTime | timeFilter }} - {{ form.exchangeEndTime | timeFilter | endTimeFilter }}
                </p></label
              >
              <label for=""
                ><span>投入预算：</span>
                <p>
                  <span class="color-red" style="width:auto">{{ form.budgetAmount }}</span> 元
                </p></label
              >
              <label for=""
                ><span>成本合计：</span>
                <p>
                  <span class="color-red" style="width:auto">{{ form.costAmount }}</span> 元
                </p></label
              >
              <!-- <label for=""><span>产出销售额：</span><p>8,746,372 元</p></label> -->
              <!-- <a href="javascript:;" class="edit-config-btn" @click="edit(1)">修改</a> -->
            </div>
          </div>
          <div class="config-item-1-2">
            <div>
              <label for=""
                ><span>活动区域：</span>
                <p>全国</p></label
              >
              <label for=""
                ><span>活动渠道：</span>
                <el-tooltip
                  class="item"
                  :disabled="qddisabled"
                  effect="light"
                  :content="repeatForm.channelName"
                  placement="top"
                >
                  <p>{{ repeatForm.channelName }}</p>
                </el-tooltip>
              </label>
              <label for=""
                ><span>活动门店：</span>
                <p :title="repeatForm.shopName">{{ repeatForm.shopName | nameFilter }}</p></label
              >
              <label for=""
                ><span>活动品牌：</span>
                <p>{{ form.brandName }}</p></label
              >
              <label for=""
                ><span>产业类别：</span>
                <p>{{ repeatForm.productCategoryName }}</p></label
              >
            </div>
          </div>
          <div class="config-item-1-2 edit-config-1-2">
            <div>
              <label for=""
                ><span>活动区域：</span>
                <p>{{ form.xiaoweiName }}</p></label
              >
              <label for=""
                ><span>活动渠道：</span>
                <el-tooltip
                  class="item"
                  :disabled="dbqddisabled"
                  effect="light"
                  :content="form.channelName"
                  placement="top"
                >
                  <p>{{ form.channelName }}</p>
                </el-tooltip>
              </label>
              <label for=""
                ><span>活动门店：</span>
                <p :title="form.shopName">{{ form.shopName | nameFilter }}</p></label
              >
              <label for=""
                ><span>活动品牌：</span>
                <p>{{ form.brandName }}</p></label
              >
              <label for=""
                ><span>产业类别：</span>
                <p>{{ form.productCategoryName }}</p></label
              >
              <a href="javascript:;" class="edit-config-btn" @click="edit(2)">修改</a>
            </div>
          </div>
          <div style="border: 1px solid #ccc;margin: 0px 4px;">
            <div class="config-item-1-2 config-gift" style="margin-bottom:0">
              <div style="height:auto;margin: -1px 0 -1px -1px;">
                <div v-if="repeatForm.scoreGiftConfig">
                  <p v-if="repeatForm.rightSmallType == 1">购买单品赠</p>
                  <p v-if="repeatForm.rightSmallType == 2">套购赠</p>
                  <div v-for="gift in repeatForm.scoreGiftConfig.rightList" style="display:block;">
                    <img v-if="gift.giftList && gift.giftList[0]" :src="gift.giftList[0].picUrl" alt="" />
                    <img v-if="!gift.giftList || !gift.giftList[0]" src="../../assets/images/score.jpg" alt="" />
                    <div style="margin-bottom:10px;">
                      <p>{{ gift.modelNo }}</p>
                      <p class="gift" v-for="score in gift.scoreList">{{ score.score }}积分（总数{{ score.num }}份）</p>
                      <p class="gift" v-for="score in gift.giftList">
                        {{ score.productName }}（总数{{ score.num }}份）
                      </p>
                    </div>
                  </div>
                  <div v-if="repeatForm.scoreGiftConfig.twoTypes" style="display:block;">
                    <div style="margin-bottom:10px;">
                      <img src="../../assets/images/score.jpg" alt="" />
                      <p>购买 2 件产品赠送</p>
                      <p class="gift">
                        {{ repeatForm.scoreGiftConfig.twoTypes.score }}积分（总数{{
                          repeatForm.scoreGiftConfig.twoTypes.num
                        }}份）
                      </p>
                    </div>
                  </div>
                  <div v-if="repeatForm.scoreGiftConfig.threeTypes" style="display:block;">
                    <div style="margin-bottom:10px;">
                      <img src="../../assets/images/score.jpg" alt="" />
                      <p>购买 3 件产品赠送</p>
                      <p class="gift">
                        {{ repeatForm.scoreGiftConfig.threeTypes.score }}积分（总数{{
                          repeatForm.scoreGiftConfig.threeTypes.num
                        }}份）
                      </p>
                    </div>
                  </div>
                  <div v-if="repeatForm.scoreGiftConfig.fourTypes" style="display:block;">
                    <div style="margin-bottom:10px;">
                      <img src="../../assets/images/score.jpg" alt="" />
                      <p>购买 4 件产品赠送</p>
                      <p class="gift">
                        {{ repeatForm.scoreGiftConfig.fourTypes.score }}积分（总数{{
                          repeatForm.scoreGiftConfig.fourTypes.num
                        }}份）
                      </p>
                    </div>
                  </div>
                  <div v-if="repeatForm.scoreGiftConfig.fiveTypes" style="display:block">
                    <div style="margin-bottom:10px;">
                      <img src="../../assets/images/score.jpg" alt="" />
                      <p>购买 5 件及以上产品赠送</p>
                      <p class="gift">
                        {{ repeatForm.scoreGiftConfig.fiveTypes.score }}积分（总数{{
                          repeatForm.scoreGiftConfig.fiveTypes.num
                        }}份）
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="config-item-1-2 config-gift edit-config-1-2" style="margin-bottom:0">
              <div style="height:auto;margin: -1px -1px -1px 0;">
                <div v-if="form.scoreGiftConfig">
                  <p v-if="form.rightSmallType == 1">购买单品赠</p>
                  <p v-if="form.rightSmallType == 2">套购赠</p>
                  <div v-for="gift in form.scoreGiftConfig.rightList" style="display:block;">
                    <img v-if="gift.giftList && gift.giftList[0]" :src="gift.giftList[0].picUrl" alt="" />
                    <img v-if="!gift.giftList || !gift.giftList[0]" src="../../assets/images/score.jpg" alt="" />
                    <div style="margin-bottom:10px;">
                      <p
                        v-show="!buyAm && gift.scoreList[0]"
                        style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"
                        :title="gift.buyAmount"
                      >
                        满{{ gift.buyAmount }}元赠
                      </p>
                      <p class="gift" v-for="score in gift.scoreList">
                        {{ score.score }}积分（总数{{ score.num }}份）<el-button
                          type="text"
                          class="trs-btn"
                          style="width:auto;float: right;margin-top: -7px;"
                          @click="giftDetail(gift.buyAmount)"
                          >详情</el-button
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <a href="javascript:;" class="edit-config-btn" @click="edit(3)">修改</a> -->
            </div>
          </div>
        </div>
        <div style="text-align:right">
          <el-button class="trs-btn" style="width:109px;margin-top:14px;" @click="giveUp">放弃提交方案</el-button>
          <el-button type="primary" class="trs-btn" style="width:133px;margin-top:14px;" @click="submit"
            >确认继续提交方案</el-button
          >
        </div>
      </div>
    </div>

    <el-dialog
      class="similar-rights-dialog trs-dialog"
      title=""
      :visible.sync="detailSubRights"
      :modal-append-to-body="false"
    >
      <div>
        <el-table :data="subBudget" max-height="294">
          <!--:data="msgChinaListData.entities"-->
          <el-table-column prop="channel" label="活动渠道" width="200px"></el-table-column>
          <el-table-column prop="Num" label="分配份额"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="giveUpSubDetail" style="width:125px;">确定</el-button>
      </div>
    </el-dialog>
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
      title: '配置单品权益',
      qddisabled: true,
      dbqddisabled: true,
      subBudget: [], // 小微预算明细
      detailSubRights: false,
      cpname: true,
      modelNo: '',
      buyAm: true,
      form: {},
      repeatForm: {},
      rules: {}
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
        if (val.length > 9) {
          val = `${val.substring(0, 9)}...`;
        }
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
    giveUp() {
      this.$router.push({
        path: '/strategy/rightsactlist'
      });
    },
    submit() {
      const _this = this;
      const data = {
        id: this.$route.query.id,
        step: 4
      };
      this.requestRights.saveNextOrderRights(data).then((data) => {
        if (data) {
          _this.$router.push({
            path: '/strategy/rightsconfigover',
            query: { id: data }
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
      this.requestRights.getOrderRightsById(params).then((data) => {
        if (data) {
          data.scoreGiftConfig = JSON.parse(data.scoreGiftConfig);
          _this.form = data;
          if (_this.form.channelName != null) {
            _this.dbqddisabled = false;
          }
          if (_this.form.rightSmallType == 2) {
            if (_this.form.scoreGiftConfig != null && _this.form.scoreGiftConfig.type == 3) {
              _this.modelNo = '';
              _this.cpname = false;
              for (let c = 0; c < _this.form.scoreGiftConfig.productList.length; c++) {
                _this.modelNo += `${_this.form.scoreGiftConfig.productList[c].modelNo},`;
              }
              _this.modelNo = _this.modelNo.substring(0, _this.modelNo.length - 1);
            }
            if (_this.form.scoreGiftConfig != null && _this.form.scoreGiftConfig.type == 2) {
              //          for( let a=0; a<this.detailInfo.scoreGiftConfig.rightList.length; a++){
              //            if(this.detailInfo.scoreGiftConfig.rightList[a].scoreList == undefined){
              //              console.log(123)
              //              this.detailInfo.scoreGiftConfig.rightList.splice(a,1)
              //              //delete this.detailInfo.scoreGiftConfig.rightList[a];
              //            }
              //          }
              //          console.log(this.detailInfo.scoreGiftConfig.rightList)
              _this.buyAm = false;
            }
          }

          if (data.rightSmallType == 1) {
            _this.title = '配置单品权益';
          } else if (data.rightSmallType == 2) {
            _this.title = '配置套购权益';
          }
        }
      });
    },
    listRepeatRights() {
      const _this = this;
      const params = {
        id: this.$route.query.id,
        pageNo: 1,
        pageSize: 100
      };
      this.requestRights.listRepeatRights(params).then((data) => {
        if (data.entityCount > 0) {
          for (let i = 0; i < data.entities.length; i++) {
            if (data.entities[i].id == _this.$route.query.repeatId) {
              data.entities[i].scoreGiftConfig = JSON.parse(data.entities[i].scoreGiftConfig);
              _this.repeatForm = data.entities[i];
              if (_this.repeatForm.channelName != null) {
                _this.qddisabled = false;
              }
            }
          }
          _this.similarRights = true;
        }
      });
    },
    edit(index) {
      let path = '';
      if (index == 1) {
        path = '/strategy/rightsbaseinfo';
      } else if (index == 2) {
        path = '/strategy/rightsxwrange';
      } else if (index == 3) {
        path = '/strategy/rightsgift';
      }
      this.$router.push({
        path,
        query: {
          id: this.$route.query.id,
          rightSmallType: this.form.rightSmallType
        }
      });
    },
    giftDetail(ele) {
      const self = this;
      const params = {
        rightsId: this.$route.query.id,
        amountCount: ele
      };
      // POST /orderRights/getScoreNum
      this.requestRights.getXwScoreNum(params).then((data) => {
        if (data.isSuccess) {
          self.subBudget = data.data;
        }
      });
      this.detailSubRights = true;
    },
    giveUpSubDetail() {
      this.detailSubRights = false;
    }
  },
  mounted() {
    this.getOrderRightsById();
    this.listRepeatRights();
  }
};
</script>
<style scoped>
.config-form {
  max-height: 624px;
  position: absolute;
  top: 60px;
  bottom: 20px;
  overflow: auto;
}

.config-compare {
  padding: 35px 58px 56px;
  margin-top: 30px;
}
.config-item {
  text-align: center;
}
.config-item-1-2 {
  display: inline-block;
  margin: 0 0;
  vertical-align: top;
  margin: 0 -2px 12px;
}

.config-item-1-2:nth-child(odd) {
  background: #f6f6f6;
}

.config-item-1-2:nth-child(odd) div {
  border-right: 0;
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
  height: 208px;
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
  width: 230px;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.config-item-1-2 label span {
  display: inline-block;
  width: 135px;
  float: left;
  text-align: right;
  font-weight: bold;
}
.config-item-1-2:last-child label span {
  width: 90px;
}
.config-gift > p {
  font-size: 16px;
  font-weight: bold;
  color: #28272b;
  text-align: left;
  margin-bottom: 10px;
  margin-top: 18px;
}
.config-gift > div {
  height: 122px;
  border: 1px solid #cccccc;
  padding: 10px 20px;
}
.config-gift > div > p {
  margin-bottom: 10px;
}
.config-gift > div div {
  display: inline-block;
  vertical-align: top;
  border: 0;
  width: auto;
  height: auto;
  padding: 0;
}
.config-gift img {
  width: 58px;
  height: 58px;
  border: 1px solid #cccccc;
  display: inline-block;
  vertical-align: top;
  margin-right: 12px;
}
.config-gift .gift {
  color: #ee5851;
}
.config-gift > div div p {
  line-height: 19px;
}

.config-compare .trs-btn {
  margin: 10px 0 0 10px;
  display: inline-block;
}

.config-compare-title {
  margin: -35px -58px 40px;
  background: #edf6ff;
  border-bottom: 1px solid #cccccc;
}
.config-compare-title div {
  display: inline-block;
  line-height: 39px;
  width: 49%;
  text-align: center;
  font-weight: bold;
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
</style>
