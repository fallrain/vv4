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
                  <span class="color-red">{{ form.budgetAmount }}</span> 元
                </p></label
              >
              <label for=""
                ><span>成本合计：</span>
                <p>
                  <span class="color-red">{{ form.costAmount }}</span> 元
                </p></label
              >
              <!-- <label for=""><span>预算明细：</span><el-button @click="detail(1)" style="padding: 5px 6px;">查看详情</el-button></label> -->

              <!-- <a href="javascript:;" class="edit-config-btn" @click="edit(1)">修改</a> -->
            </div>
          </div>
          <div class="config-item-1-2 edit-config-1-2">
            <p>活动范围</p>
            <div>
              <label for=""
                ><span>活动区域：</span>
                <p :title="form.xiaoweiName">{{ form.xiaoweiName | nameFilter }}</p></label
              >
              <label for=""
                ><span>活动渠道：</span>
                <p :title="form.channelName">{{ form.channelName | nameFilter }}</p></label
              >
              <!--<label for=""><span>活动门店：</span><p :title="form.shopName">{{form.shopName | nameFilter}}</p></label>-->
              <label for=""
                ><span>活动品牌：</span>
                <p>{{ form.brandName }}</p></label
              >
              <label for=""
                ><span>产业类别：</span>
                <p :title="form.productCategoryName">{{ form.productCategoryName | nameFilter }}</p></label
              >
              <a href="javascript:;" class="edit-config-btn" @click="edit(2)">修改</a>
            </div>
          </div>
        </div>

        <div class="config-item-1-1 edit-config-1-2">
          <p>赠送礼品</p>
          <div v-if="form.scoreGiftConfig">
            <p>套购赠</p>
            <div style="margin-bottom:10px;">
              <div v-for="gift in form.scoreGiftConfig.rightList" style="display:block;">
                <img v-if="gift.giftList" :src="gift.giftList[0].picUrl" alt="" />
                <img v-if="!gift.giftList" src="../../assets/images/score.jpg" alt="" />
                <div style="margin-bottom:10px;">
                  <p
                    v-show="!buyAm && gift.scoreList[0]"
                    style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"
                    :title="gift.buyAmount"
                  >
                    满{{ gift.buyAmount }}元赠
                  </p>
                  <p class="gift" v-for="score in gift.scoreList" v-if="score.score != ''">
                    <em v-if="type == 1"
                      >{{ score.productName }}（总数{{ score.num }}份）<label v-if="score.type == 1">（线上物品）</label
                      ><label v-if="score.type == 2">（线下物品）</label></em
                    ><em v-if="type == 2">{{ score.score }}积分（总数{{ score.num }}份）</em
                    ><el-button
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
        <el-button type="primary" class="trs-btn" style="width:109px;margin-top:14px;" @click="listRepeatRights"
          >确认提交方案</el-button
        >
        <!-- 验证权益冲突的提交按钮 -->
        <!-- <el-button type="primary" class="trs-btn" style="width:109px;margin-top:14px;" @click="submit">确认提交方案</el-button> -->
      </div>
    </div>

    <el-dialog
      class="similar-rights-dialog trs-dialog"
      title=""
      :visible.sync="detailRights"
      :modal-append-to-body="false"
    >
      <div>
        <el-table :data="budget" max-height="294" class="tx_left">
          <!--:data="msgChinaListData.entities"-->
          <el-table-column prop="channelName" label="活动渠道" width="200px"></el-table-column>
          <el-table-column prop="budgetAmount" label="分配金额"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="giveUpDetail" style="width:125px;">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      class="similar-rights-dialog trs-dialog"
      title=""
      :visible.sync="detailSubRights"
      :modal-append-to-body="false"
    >
      <div>
        <el-table :data="subBudget" max-height="294" class="tx_left">
          <!--:data="msgChinaListData.entities"-->
          <el-table-column prop="channel" label="活动渠道" width="200px"></el-table-column>
          <el-table-column prop="Num" label="分配份额"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="giveUpSubDetail" style="width:125px;">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      class="similar-rights-dialog trs-dialog"
      title=""
      :visible.sync="similarRights"
      :modal-append-to-body="false"
    >
      <div>
        <p>您的新建权益与以下已上架权益产生权益重复：</p>
        <table>
          <tr>
            <th>权益活动名称</th>
            <th>权益活动类型</th>
            <th>权益活动内容</th>
            <th>活动有效期</th>
          </tr>
          <tr v-for="rights in repeatRights">
            <td>{{ rights.rightName }}</td>
            <td>{{ rights.rightSmallType | rightSmallTypeFilter }}</td>
            <td><a href="javascript:;" class="color-link" @click="toCompare(rights.id)">详情对比</a></td>
            <td>{{ rights.startTime | timeFilter }} - {{ rights.endTime | timeFilter }}</td>
          </tr>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="giveUp" style="width:125px;">放弃保存</el-button>
        <el-button type="primary" @click="submit" class="trs-btn" style="width:125px;">继续保存</el-button>
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
      type: 2,
      title: '配置单品权益',
      form: {
        costAmount: 0
      },
      rules: {},
      budget: [], // 小微预算明细
      subBudget: [], // 小微预算明细
      similarRights: false,
      detailRights: false,
      detailSubRights: false,
      repeatRights: [],
      cpname: true,
      modelNo: '',
      buyAm: true
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
      this.similarRights = false;
      this.$router.push({
        path: '/strategy/rightsactlist'
      });
    },
    submit(temporary) {
      const _this = this;
      const data = {
        id: this.$route.query.id,
        step: 4
      };

      if (temporary == 'temporary') {
        this.requestRights.saveMomentOrderRights(data).then((data) => {
          if (data) {
            _this.$message({
              type: 'success',
              message: '暂存成功'
            });
          }
        });
      } else {
        this.requestRights.saveXwNextOrderRights(data).then((data) => {
          if (data) {
            _this.$router.push({
              path: '/strategy/rightsactlist',
              query: { id: data }
            });
          }
        });
      }
    },
    toCompare(repeatId) {
      this.$router.push({
        path: '/strategy/rightsxwcompare',
        query: {
          id: this.$route.query.id,
          repeatId
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
          data.costAmount = data.costAmount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') || 0;
          data.budgetAmount = data.budgetAmount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') || 0;
          data.scoreGiftConfig = JSON.parse(data.scoreGiftConfig);
          if (data.scoreGiftConfig.rightList[0].scoreList == null) {
            data.scoreGiftConfig.rightList.forEach((el) => {
              el.scoreList = el.giftList;
            });
            _this.type = 1;
          }
          _this.form = data;
          if (_this.form.rightSmallType == 2) {
            if (_this.form.scoreGiftConfig != null && _this.form.scoreGiftConfig.type == 2) {
              //                  for( let a=0; a<this.detailInfo.scoreGiftConfig.rightList.length; a++){
              //                    if(this.detailInfo.scoreGiftConfig.rightList[a].scoreList == undefined){
              //                      console.log(123)
              //                      this.detailInfo.scoreGiftConfig.rightList.splice(a,1)
              //                      //delete this.detailInfo.scoreGiftConfig.rightList[a];
              //                    }
              //                  }
              //          console.log(this.form.scoreGiftConfig)
              _this.buyAm = false;
            }
          }
          _this.title = '配置套购权益';
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
          _this.repeatRights = data.entities;
          _this.similarRights = true;
        } else {
          _this.submit();
        }
      });
    },
    edit(index) {
      let path = '';
      if (index == 1) {
        path = '/strategy/rightsxwbaseinfo';
      } else if (index == 2) {
        path = '/strategy/rightsxwrange';
      } else if (index == 3) {
        path = '/strategy/rightsxwgift';
      }
      this.$router.push({
        path,
        query: {
          id: this.$route.query.id,
          rightSmallType: this.form.rightSmallType
        }
      });
    },
    detail() {
      const _this = this;
      const params = {
        rightsId: this.$route.query.id
      };
      this.requestRights.getDetailByRightsId(params).then((data) => {
        if (data.isSuccess) {
          _this.budget = data.data;
        }
      });
      this.detailRights = true;
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
    giveUpDetail() {
      this.detailRights = false;
    },
    giveUpSubDetail() {
      this.detailSubRights = false;
    }
  },
  mounted() {
    this.getOrderRightsById();
  }
};
</script>
<style scoped>
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
}
.config-item-1-2 label span {
  display: inline-block;
  width: 135px;
  text-align: right;
  font-weight: bold;
}
.config-item-1-2:last-child label span {
  width: 90px;
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
.config-item-1-1 > div div {
  display: inline-block;
  vertical-align: top;
  margin-bottom: 10px;
}

.config-item-1-1 > div div:last-child {
  margin-bottom: 0;
}

.config-item-1-1 img {
  width: 58px;
  height: 58px;
  border: 1px solid #cccccc;
  display: inline-block;
  vertical-align: top;
  margin-right: 12px;
}
.config-item-1-1 .gift {
  color: #ee5851;
}
.config-item-1-1 > div div p {
  line-height: 19px;
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
.det-btn {
  margin-left: 134px;
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
.tx_left {
  text-align: left !important;
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
