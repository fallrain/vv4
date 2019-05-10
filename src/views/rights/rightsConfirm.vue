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
                </p>
              </label>
              <label for=""
                ><span>礼品类型：</span>
                <p>{{ form.giftType | giftNameByType }}</p></label
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
              <label for=""
                ><span>是否认筹：</span>
                <p v-if="form.recognitionFlag == 1">是</p>
                <p v-if="form.recognitionFlag == 0">否</p></label
              >
              <!-- <label for=""><span>产出销售额：</span><p>8,746,372 元</p></label> -->
              <a href="javascript:;" class="edit-config-btn" @click="edit(1)">修改</a>
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
              <label for=""
                ><span>活动门店：</span>
                <p :title="form.shopName" v-if="form.shopSign == 2">{{ form.shopName | nameFilter }}</p>
                <p v-if="form.shopSign == 1" class="shopsign-box" @click="shopsee">点击下载</p></label
              >
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
        <div
          class="config-item-1-1 edit-config-1-2 yueshu"
          v-if="
            form.modelConstraint[0].productList.length != 0 ||
              form.modelConstraint[1].productList.length != 0 ||
              form.modelConstraint[2].productList.length != 0 ||
              form.priceConstraint.productList.length != 0 ||
              (form.coupleNumber && form.coupleCategoryNumber)
          "
        >
          <p>约束限制</p>
          <div>
            <div v-if="form.coupleNumber && form.coupleCategoryNumber" style="display: block">
              <div style="display: block">
                <span class="model-dian" style="height: 16px;margin-top: 2px;"></span>购买限制：
              </div>
              <div class="product-tap" style="margin-left: 20px;display: block">
                购买限制 <label>{{ form.coupleNumber }}</label
                ><label v-if="form.coupleCategoryNumber == 1">类</label
                ><label v-if="form.coupleCategoryNumber == 2">件</label> 及以上
              </div>
            </div>
            <div
              style="display: block"
              v-if="
                form.modelConstraint[0].productList.length != 0 ||
                  form.modelConstraint[1].productList.length != 0 ||
                  form.modelConstraint[2].productList.length != 0
              "
            >
              <div><span class="model-dian" style="height: 16px;margin-top: 2px;"></span> 型号约束：</div>
              <div style="margin-left: 20px;display: block">
                <li v-if="form.modelConstraint[0].productList.length != 0">订单内必须含有</li>
                <div class="product-tap">
                  <div
                    v-for="(product, index) in form.modelConstraint[0].productList"
                    style="margin-bottom: 5px;display: block;"
                  >
                    <label v-for="(item, num) in product">
                      <span :title="item.brandName + ' | ' + item.productCategoryCode" v-if="item.desc == ''"
                        >{{ item.brandName }} | {{ item.productCategoryCode }}</span
                      >
                      <span v-if="item.desc != ''" :title="item.desc">{{ item.desc }}</span>
                      <i class="ico-link" v-if="product.length > 1 && num != product.length - 1"></i>
                    </label>
                  </div>
                </div>
                <li v-if="form.modelConstraint[1].productList.length != 0">仅参与计算权益</li>
                <div class="product-tap">
                  <div v-for="(product, index) in form.modelConstraint[1].productList" style="margin-bottom: 5px;">
                    <span :title="product.desc">{{ product.desc }}</span>
                  </div>
                </div>
                <li v-if="form.modelConstraint[2].productList.length != 0">订单内排除</li>
                <div class="product-tap">
                  <div v-for="(product, index) in form.modelConstraint[2].productList" style="margin-bottom: 5px;">
                    <span :title="product.desc">{{ product.desc }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="form.priceConstraint.productList.length != 0" style="display: block">
              <div style="display: block">
                <span class="model-dian" style="height: 16px;margin-top: 2px;"></span>价格约束：
              </div>
              <div class="product-tap" style="margin-left: 20px;display: block">
                <div v-for="(product, index) in form.priceConstraint.productList" style="margin-bottom: 5px;">
                  <span
                    :title="
                      product.brandName +
                        ' | ' +
                        product.productCategoryCode +
                        ' | 价格区间' +
                        product.minPrice +
                        '至' +
                        product.maxPrice
                    "
                    >{{ product.brandName }} | {{ product.productCategoryCode }} | 价格区间{{ product.minPrice }}至{{
                      product.maxPrice
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <a href="javascript:;" class="edit-config-btn" @click="edit(3)">修改</a>
        </div>
        <div class="config-item-1-1 edit-config-1-2">
          <p>赠送礼品</p>
          <div v-if="form.scoreGiftConfig">
            <span v-if="form.giftType === 5">
              <ul v-if="form.scoreGiftConfig.type === 2">
                <li
                  class="rightsConfirm-givenCard-example dis-flex-imp"
                  v-for="(item, index) in form.scoreGiftConfig.rightList"
                  v-if="item.virtualGiftList"
                  :key="index"
                >
                  <img class="portrait" :src="item.virtualGiftList[0].picUrl" />
                  <div class="cnt">
                    <p>{{ item.virtualGiftList[0].cardName }}</p>
                    <p class="mt20">兑换数量（{{ item.virtualGiftList[0].num }}）</p>
                  </div>
                </li>
              </ul>
              <ul v-else>
                <li
                  class="rightsConfirm-givenCard-example dis-flex-imp"
                  v-show="form.scoreGiftConfig.rightList[0].virtualGiftList"
                >
                  <img class="portrait" :src="form.scoreGiftConfig.rightList[0].virtualGiftList[0].picUrl" />
                  <div class="cnt">
                    <p>{{ form.scoreGiftConfig.rightList[0].virtualGiftList[0].cardName }}</p>
                    <p class="mt20">兑换数量（{{ form.scoreGiftConfig.rightList[0].virtualGiftList[0].num }}）</p>
                  </div>
                </li>
              </ul>
            </span>
            <span v-else>
              <p v-if="form.rightSmallType === 1">购买单品赠</p>
              <p v-if="form.rightSmallType === 2">套购赠</p>
              <div
                v-if="form.scoreGiftConfig.type !== 3"
                v-for="gift in form.scoreGiftConfig.rightList"
                style="display:block;"
              >
                <img v-if="gift.giftList && gift.giftList[0]" :src="gift.giftList[0].picUrl" alt="" />
                <img v-if="!gift.giftList || !gift.giftList[0]" src="../../assets/images/score.jpg" alt="" />
                <div style="margin-bottom:10px;">
                  <p
                    v-show="cpname && buyAm"
                    style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"
                    :title="gift.modelNo"
                  >
                    {{ gift.modelNo }}
                  </p>
                  <p
                    v-show="!cpname"
                    style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"
                    :title="modelNo"
                  >
                    {{ modelNo }}
                  </p>
                  <p
                    v-show="!buyAm && (gift.scoreList[0] || gift.giftList[0])"
                    style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"
                    :title="gift.buyAmount"
                  >
                    满{{ gift.buyAmount }}-{{ gift.maxBuyAmount }}元赠
                  </p>

                  <p class="gift" v-for="score in gift.scoreList" v-if="score.score">
                    {{ score.score }}积分（总数{{ score.num }}份）
                  </p>
                  <p class="gift" v-for="score in gift.scoreList" v-if="score.priceScale">
                    单品赠送{{ score.priceScale }}%积分
                  </p>
                  <p class="gift" v-for="score in gift.giftList">{{ score.productName }}（总数{{ score.num }}份）</p>
                </div>
              </div>
              <div
                v-if="form.scoreGiftConfig.type === 3"
                v-for="gift in form.scoreGiftConfig.modelNoDetail"
                style="display:block;"
              >
                <div v-for="item in gift.rightList">
                  <img v-if="item.giftList && item.giftList[0]" :src="item.giftList[0].picUrl" alt="" />
                  <img v-if="item.scoreList && item.scoreList[0]" src="../../assets/images/score.jpg" alt="" />
                  <div style="margin-bottom:10px;">
                    <p
                      style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"
                      :title="gift.modelNo"
                    >
                      {{ gift.modelNo }}
                    </p>
                    <p class="gift" v-if="item.scoreList && item.scoreList[0]">
                      {{ item.scoreList[0].score }}积分（总数{{ item.scoreList[0].num }}份）
                    </p>
                    <p class="gift" v-if="item.giftList && item.giftList[0]">
                      {{ item.giftList[0].productName }}（总数{{ item.giftList[0].num }}份）
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="form.scoreGiftConfig.twoTypes" style="display:inline-block;margin-right:20px;">
                <div style="margin-bottom:10px;">
                  <img src="../../assets/images/score.jpg" alt="" />
                  <p>
                    购买 2 <em v-if="form.coupleCategoryNumber == 2">件</em
                    ><em v-if="form.coupleCategoryNumber == 1">类</em>产品赠送
                  </p>
                  <p class="gift">
                    {{ form.scoreGiftConfig.twoTypes.score }}积分（总数{{ form.scoreGiftConfig.twoTypes.num }}份）
                  </p>
                </div>
              </div>
              <div v-if="form.scoreGiftConfig.threeTypes" style="display:inline-block;margin-right:20px;">
                <div style="margin-bottom:10px;">
                  <img src="../../assets/images/score.jpg" alt="" />
                  <p>
                    购买 3 <em v-if="form.coupleCategoryNumber == 2">件</em
                    ><em v-if="form.coupleCategoryNumber == 1">类</em>产品赠送
                  </p>
                  <p class="gift">
                    {{ form.scoreGiftConfig.threeTypes.score }}积分（总数{{ form.scoreGiftConfig.threeTypes.num }}份）
                  </p>
                </div>
              </div>
              <div v-if="form.scoreGiftConfig.fourTypes" style="display:inline-block;margin-right:20px;">
                <div style="margin-bottom:10px;">
                  <img src="../../assets/images/score.jpg" alt="" />
                  <p>
                    购买 4 <em v-if="form.coupleCategoryNumber == 2">件</em
                    ><em v-if="form.coupleCategoryNumber == 1">类</em>产品赠送
                  </p>
                  <p class="gift">
                    {{ form.scoreGiftConfig.fourTypes.score }}积分（总数{{ form.scoreGiftConfig.fourTypes.num }}份）
                  </p>
                </div>
              </div>
              <div v-if="form.scoreGiftConfig.fiveTypes" style="display:inline-block;margin-right:20px;">
                <div style="margin-bottom:10px;">
                  <img src="../../assets/images/score.jpg" alt="" />
                  <p>
                    购买 5 <em v-if="form.coupleCategoryNumber == 2">件</em
                    ><em v-if="form.coupleCategoryNumber == 1">类</em>及以上产品赠送
                  </p>
                  <p class="gift">
                    {{ form.scoreGiftConfig.fiveTypes.score }}积分（总数{{ form.scoreGiftConfig.fiveTypes.num }}份）
                  </p>
                </div>
              </div>
            </span>
          </div>
          <a href="javascript:;" class="edit-config-btn" @click="edit(3)">修改</a>
        </div>
        <el-button type="primary" class="trs-btn" style="width:109px;margin-top:14px;" @click="listRepeatRights">
          确认提交方案
        </el-button>
      </div>
    </div>

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
  name: 'rightsRange',
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      title: '配置单品权益',
      form: {
        modelConstraint: [
          {
            type: 1,
            productList: []
          },
          {
            type: 2,
            productList: []
          },
          {
            type: 3,
            productList: []
          }
        ],
        priceConstraint: {
          productList: []
        }
      },
      rules: {},
      similarRights: false,
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
    shopsee() {
      window.location.href = this.form.excelPath;
    },
    giveUp() {
      this.similarRights = false;
      this.$router.push({
        path: '/rights/rightsactlist'
      });
    },
    submit(temporary) {
      const _this = this;
      const data = {
        id: this.$route.query.id,
        step: 4
      };

      if (temporary === 'temporary') {
        this.requestRights.saveMomentOrderRights(data).then((data) => {
          if (data) {
            _this.$message({
              type: 'success',
              message: '暂存成功'
            });
          }
        });
      } else {
        this.requestRights.saveNextOrderRights(data).then((data) => {
          if (data) {
            _this.$router.push({
              path: '/rights/rightsconfigover',
              query: { id: data }
            });
          }
        });
      }
    },
    toCompare(repeatId) {
      this.$router.push({
        path: '/rights/rightscompare',
        query: {
          id: this.$route.query.id,
          repeatId
        }
      });
    },
    getOrderRightsById() {
      this.cpname = true;
      this.buyAm = true;
      const params = {
        id: this.$route.query.id
      };
      this.requestRights.getOrderRightsById(params).then((data) => {
        if (data) {
          // 约束限制
          data.modelConstraint = JSON.parse(data.modelConstraint);
          data.priceConstraint = JSON.parse(data.priceConstraint);

          data.costAmount = data.costAmount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') || 0;
          data.budgetAmount = data.budgetAmount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') || 0;
          data.scoreGiftConfig = JSON.parse(data.scoreGiftConfig);
          data.scoreGiftConfig.type = data.scoreGiftConfig.type * 1;
          this.form = data;
          if (this.form.rightSmallType === 2) {
            if (this.form.scoreGiftConfig && this.form.scoreGiftConfig.type === 3) {
              this.modelNo = '';
              this.cpname = false;
              for (let c = 0; c < this.form.scoreGiftConfig.modelNoDetail.length; c++) {
                this.form.scoreGiftConfig.modelNoDetail[c].modelNo = this.form.scoreGiftConfig.modelNoDetail[
                  c
                ].modelNoList.join(',');
              }
            }
            if (this.form.scoreGiftConfig != null && this.form.scoreGiftConfig.type === 2) {
              this.buyAm = false;
            }
          }

          if (data.rightSmallType === 1) {
            this.title = '配置单品权益';
          } else if (data.rightSmallType === 2) {
            this.title = '配置套购权益';
          }
        }
      });
    },
    listRepeatRights() {
      const params = {
        id: this.$route.query.id,
        pageNo: 1,
        pageSize: 100
      };
      this.requestRights.listRepeatRights(params).then((data) => {
        if (data.entityCount > 0) {
          this.repeatRights = data.entities;
          this.similarRights = true;
        } else {
          this.submit();
        }
      });
    },
    edit(index) {
      let path = '';
      if (index == 1) {
        path = '/rights/rightsbaseinfo';
      } else if (index == 2) {
        path = '/rights/rightsrange';
      } else if (index == 3) {
        path = '/rights/rightsgift';
      }
      this.$router.push({
        path,
        query: {
          id: this.$route.query.id,
          rightSmallType: this.form.rightSmallType
        }
      });
    }
  },
  mounted() {
    this.getOrderRightsById();
  }
};
</script>
<style scoped lang="scss">
.yueshu label {
  margin: 0;
}

.ico-link {
  width: 20px;
  height: 26px;
  display: inline-block;
  margin-left: -3px;
  margin-right: 1px;
  position: relative;
  z-index: 10;
  vertical-align: top;
  background: url('../../assets/images/ico-prolink02.png') no-repeat;
}

.shopsign-box {
  border: 1px solid #ccc;
  padding: 0 5px;
  border-radius: 5px;
  cursor: pointer;
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
  height: 230px;
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
  font-size: 12px;
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
