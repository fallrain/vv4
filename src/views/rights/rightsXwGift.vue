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
          <div class="step-title"><span>活动范围配置</span></div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step setted" style="margin-left:449px">
          <div class="step-index"><span>3</span></div>
          <div class="step-title"><span>赠送礼品配置</span></div>
          <div class="step-bg"></div>
        </div>
      </div>
      <div class="save-draft">
        <span>有急事？先</span>
        <a href="javascript:;" @click="save('temporary')">存草稿</a>
        <span>回来继续配置</span>
      </div>
    </div>
    <div style="width: 898px; margin: auto;">
      <div class="config-form">
        <div class="config-form-header">
          <span>赠送礼品配置</span>
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <!--<el-form-item v-if="form.rightSmallType == 2" label="套购方式组合" prop="">-->
          <el-form-item label="套购方式组合" prop="">
            <el-radio-group v-model="radio" @change="radioChange">
              <el-radio :label="1">按满赠</el-radio>
            </el-radio-group>
            <div class="gift-list" style="width:700px;">
              <div v-if="radio == 1" style="margin-top:18px;">
                <div class="type4-tab-panel">
                  购买 <span class="color-red">{{ productCategoryName }}</span
                  >, 满<el-input
                    style="width: 71px;margin:0 10px;"
                    :maxlength="9"
                    v-model="buyAmount"
                    @change="inputChangeFilter('buyAmount')"
                  ></el-input
                  >元
                  <el-button type="primary" class="trs-btn" style="width:80px;margin-left:10px;" @click="addType3"
                    >添加</el-button
                  >
                  <div class="gift-item" v-for="(right, index) in type4Config.rightList">
                    <p>
                      满{{ right.buyAmount }}元
                      <a v-if="!right.scoreList" href="javascript:;" @click="configGift(4, index, right)">配置礼品</a>
                      <a
                        v-if="right.scoreList"
                        href="javascript:;"
                        @click="configGift(4, index, right, right.scoreList)"
                        >修改礼品</a
                      >
                    </p>
                    <p v-for="score in right.scoreList" class="gift">
                      <i></i>套购赠送 {{ score.score }} 积分（赠送总数量{{ score.num }}份）
                    </p>
                    <i class="ico-del" @click="deletescor(index)"></i>
                  </div>
                  <div style="width: 100%" v-if="!type4Config.rightList.length == 0">
                    <a href="http://testvip.haier.net/wechat/batchtempuser/userIds.xls" class="m-leftbtn"
                      ><i class="ico-down"></i>模版下载</a
                    >
                    <el-upload
                      class="upload-demo"
                      action="http://testvip.haier.net/vipcenter/batchUserController/uploadCustomerFile"
                      :on-preview="handlePreview"
                      :on-success="uuidAdd"
                      :on-remove="handleRemove"
                      multiple
                      :limit="1"
                    >
                      <el-button size="small" type="primary" class="m-vipinbtn"
                        ><i class="ico-vipin"></i>导入方案</el-button
                      >
                    </el-upload>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>

          <el-form-item>
            <!--<el-button type="primary" class="trs-btn" style="width:109px;margin-top:14px;" :disabled="disableGenerate || (budgetAmount < costAmount) || costAmount == 0" @click="save">生成方案</el-button>-->
            <el-button class="trs-btn" style="width:109px;margin-top:14px;" @click="prev">上一步</el-button>
            <el-button
              type="primary"
              class="trs-btn"
              style="width:109px;margin-top:14px;margin-left:11px;"
              @click="save"
              >生成方案</el-button
            >
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

    <el-dialog
      class="score-rights-dialog trs-dialog"
      title="配置礼品"
      :visible.sync="scoreRightsDialog"
      :modal-append-to-body="false"
    >
      <div class="score-rights-div">
        <p>
          您的投入预算为 <span class="color-red">{{ budgetAmount }}</span> 元，参考此价格配置礼品
        </p>
        <el-radio-group v-model="scoreList[0].rightType" style="margin: 15px 0 10px;">
          <el-radio :label="1">固定积分</el-radio>
          <el-radio :label="2" v-if="form.rightSmallType != 2">按产品价格比例</el-radio>
        </el-radio-group>

        <div v-if="scoreList[0].rightType == 1" class="score-rights-input">
          <div>
            <label>赠送</label>
            <el-input
              style="width: 110px;margin:0 5px;"
              v-model="scoreList[0].score"
              :maxlength="6"
              placeholder="输入积分数量"
              @change="inputChangeFilter('score', 'scoreList')"
            ></el-input>
            <span>积分</span>
          </div>
          <div>
            <label>礼品总数</label>
            <el-input
              style="width: 110px;margin:0 5px;"
              v-model="scoreList[0].num"
              :maxlength="9"
              placeholder="输入礼品总数"
              @change="inputChangeFilter('num', 'scoreList')"
            ></el-input>
            <span>份，赠完为止</span>
          </div>
        </div>
        <div v-if="scoreList[0].rightType == 2" class="score-rights-input by-price">
          <div>
            <label>产出销售额</label>
            <el-input
              style="width: 124px;margin:0 5px;"
              v-model="scoreList[0].salesAmount"
              :maxlength="6"
              placeholder="输入产出销售额"
              @change="inputChangeFilter('salesAmount', 'scoreList')"
            ></el-input>
            <span>元</span>
          </div>
          <div>
            <label>按产品供价的</label>
            <el-input
              style="width: 124px;margin:0 5px;"
              v-model="scoreList[0].priceScale"
              :maxlength="3"
              placeholder="输入百分比"
              @change="inputChangeFilter('priceScale', 'scoreList')"
            ></el-input>
            <span>% 赠送</span>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveGiftConfig" class="trs-btn" style="width:125px;">配置完成 </el-button>
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
      disableGenerate: true,
      form: {
        step: 3,
        rightBigType: 1,
        rightSmallType: 1
      },
      rules: {},
      radio: 1,
      radio2: 1,
      radio3: 1,
      //   radio4: "推荐礼品",
      scoreList: [
        {
          rightType: 1, // 1-固定积分数   2-按产品价格比例
          score: '', // 单台积分数   rightType=1时使用
          num: '', // 覆盖范围台数  rightType=1时使用
          priceScale: '', // 价格比例 20表示按照20%比例  rightType=2时使用
          salesAmount: '' // 产出销售额 rightType=2 时使用
        }
      ],
      giftList: [
        {
          giftType: 1, // 1-推荐   2-自定义
          num: '', // 覆盖范围台数，选择套装的话 2个礼物num一致填写相同数目
          purchasePriceStart: '', // 采购价开始
          purchasePriceEnd: '', // 采购价结束
          giftId: '', // 产品唯一编码
          giftIdUnique: '', // 权益活动产品唯一编码
          picUrl: '', // 图片url
          needScore: '', // 所需积分
          sortId: '', // 排序id
          dataFrom: '', // hbmall/camall
          productUrl: '', // 产品链接
          productName: '', // 产品名称
          exchangeNum: '' // 历史兑换数量
        }
      ],
      options: [
        {
          value: 'haier',
          label: '海尔'
        },
        {
          value: 'casarte',
          label: '卡萨帝'
        },
        {
          value: 'tongshuai',
          label: '统帅'
        }
      ],
      value: '',
      scoreRightsDialog: false,
      giftRightsDialog: false,
      checked1: '1',
      checked2: false,
      intorpro: false,
      prozh: false,
      rightBrandName: '',
      productCategoryCode: '',
      productName: '',
      type1Config: {
        type: 2, // 1-产业下全部产品参加活动   2-单型号产品参加活动
        rightList: []
      },
      type2Config: {
        type: 1, // 1-产业下全部产品参加活动   2-单型号产品参加活动
        rightList: [{}]
      },
      type3Config: {
        type: 1, // 1-产业下全部产品参加活动   2-单型号产品参加活动
        rightList: [{}]
      },
      type4Config: {
        type: 2, // 1-产业下全部产品参加活动   2-单型号产品参加活动
        rightList: []
      },
      type6Config: {
        type: 2, // 1-产业下全部产品参加活动   2-单型号产品参加活动
        rightList: []
      },
      productList: [{ desc: '' }, { desc: '' }],
      type5Config: {
        type: 3, // 1-产业下全部产品参加活动   2-单型号产品参加活动
        productList: [],
        rightList: [
          {
            scoreList: [],
            giftList: []
          }
        ]
      },
      recommendGift: [],
      recommendGiftByKeyWords: [],
      keyWords: '',
      buyAmount: '',
      productCategoryLength: 5,
      productCategoryName: '',
      listIndustryArr: [],
      budgetAmount: 0,
      startPrice: '',
      endPrice: '',
      giftProductCode: '',
      giftProductInit: false,
      nopro: false,
      nopro02: false,
      bpp_price: 0,
      modelNo: '',
      costAmount: 0,
      type4TabShow: '1',
      buyNumProductCode: []
    };
  },
  filters: {
    productNameFilter(val) {
      if (val) {
        if (val.length > 9) {
          val = `${val.substring(0, 9)}...`;
        }
      }
      return val;
    },
    numFilter(val) {
      val = parseFloat(val) || 0;
      return val;
    }
  },
  methods: {
    inputChangeFilter(value, list) {
      const _this = this;
      setTimeout(() => {
        if (list) {
          _this[list][0][value] = _this[list][0][value].replace(/[^\d]/g, '');
        } else {
          _this[value] = _this[value].replace(/[^\d]/g, '');
        }
      });
    },
    inttypeChange(value) {
      if (value == 1) {
        this.intorpro = false;
      } else {
        this.intorpro = true;
      }
    },
    jfChange(value) {
      if (value == 1) {
        this.scoreList[0].priceScale = '';
        this.scoreList[0].salesAmount = '';
      } else {
        this.scoreList[0].num = '';
        this.scoreList[0].score = '';
      }
    },
    type1ConfigTypeChange(value) {
      // this.type1Config.type = value
      // this.type1Config.rightList = []
      // this.type2Config.rightList = [{}]
      // this.disableGenerate = false
      // this.productName = ''
      // this.costAmount = 0
    },
    prev() {
      this.$router.push({
        path: '/strategy/rightsrange',
        query: { id: this.$route.query.id }
      });
    },
    radioChange() {
      // for (let i = 0; i < this.productCategoryLength; i++) {
      //   if (i <= 5 && i >= 2) {
      //     this.type3Config.rightList.push({});
      //   }
      // }
    },
    type4TabClick(index) {
      // this.type4TabShow = index;
    },
    save(temporary, getCostAmount) {
      // 假装流程--直接跳转
      this.$router.push({
        path: '/strategy/rightschinaconfirm',
        query: { id: data }
      });
      this.giftRightsDialog = false;

      let data = JSON.parse(JSON.stringify(this.form));

      //      if (this.form.rightSmallType == 1) {
      //        if (this.type1Config.type == 2) {
      //          data.scoreGiftConfig = this.type1Config;
      //        } else {
      //          data.scoreGiftConfig = this.type2Config;
      //        }
      //      } else if (this.form.rightSmallType == 2) {
      //        if (this.radio == 2) {
      //            if(this.type4TabShow == 1){
      //                data.scoreGiftConfig = this.type4Config;
      //            }else if(this.type4TabShow == 2){
      //                data.scoreGiftConfig = this.type6Config;
      //            }
      //
      //          if (this.type4TabShow == 2) {
      //            if (this.buyNumProductCode.length == 0) {
      //               this.$message({
      //                  type: "warning",
      //                  message: "请添加套餐产品！",
      //                });
      //                return false
      //            }
      //
      //            data.buyNumProductCode = {
      //              productList: this.buyNumProductCode
      //            }
      //            // data.buyNumProductCode = JSON.stringify(data.buyNumProductCode)
      //          }
      //
      //        } else if (this.radio == 1) {
      //          data.scoreGiftConfig = {
      //            type: "1"
      //          };
      //          for (let i = 0; i < this.type3Config.rightList.length; i++) {
      //            if (i == 0 && this.type3Config.rightList[i].scoreList) {
      //              data.scoreGiftConfig.twoTypes = this.type3Config.rightList[
      //                i
      //              ].scoreList[0];
      //            } else if (i == 1 && this.type3Config.rightList[i].scoreList) {
      //              data.scoreGiftConfig.threeTypes = this.type3Config.rightList[
      //                i
      //              ].scoreList[0];
      //            } else if (i == 2 && this.type3Config.rightList[i].scoreList) {
      //              data.scoreGiftConfig.fourTypes = this.type3Config.rightList[
      //                i
      //              ].scoreList[0];
      //            } else if (i == 3 && this.type3Config.rightList[i].scoreList) {
      //              data.scoreGiftConfig.fiveTypes = this.type3Config.rightList[
      //                i
      //              ].scoreList[0];
      //            }
      //          }
      //        } else if (this.radio == 3) {
      //          data.scoreGiftConfig = this.type5Config;
      //        }
      //      }
      const _this = this;
      if (getCostAmount) {
        const params = {
          giftConfig: JSON.stringify(data.scoreGiftConfig),
          id: data.id
        };
        this.requestRights.getCostAmountByGiftConfig(params).then((data) => {
          _this.disableGenerate = false;

          if (data) {
            _this.costAmount = data;
          } else {
            _this.costAmount = 0;
          }

          if (_this.budgetAmount < _this.costAmount) {
            _this.$message({
              type: 'warning',
              message: '预算不足！'
            });
          }
        });
      } else if (temporary == 'temporary') {
        this.requestRights.saveMomentOrderRights(data).then((data) => {
          self.saveing = false;
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
              path: '/strategy/rightsconfirm',
              query: { id: data }
            });
          }
        });
      }
    },
    getOrderRightsById() {
      const _this = this;
      const params = {
        id: this.$route.query.id
      };
      this.requestRights.getOrderRightsById(params).then((data) => {
        if (data) {
          _this.form.id = data.id;
          _this.form.channelType = data.channelType || 1;
          _this.form.step = 3;
          _this.form.rightBigType = data.rightBigType;
          _this.form.rightSmallType = data.rightSmallType;

          _this.rightBrandName = data.rightBrandName;
          _this.productCategoryCode = data.productCategoryCode;
          _this.productCategoryName = data.productCategoryName;
          // _this.productCategoryLength =
          //   data.productCategoryCode == "all" ? 5 : 1;

          if (data.rightSmallType == 1) {
            _this.title = '配置单品权益';
          } else if (data.rightSmallType == 2) {
            _this.title = '配置套购权益';
          }

          _this.budgetAmount = data.budgetAmount;

          for (let i = 0; i < _this.productCategoryLength; i++) {
            if (i <= 5 && i >= 2) {
              _this.type3Config.rightList.push({});
            }
          }

          if (data.scoreGiftConfig && data.scoreGiftConfig != '') {
            _this.disableGenerate = false;
          }

          const scoreGiftConfig = data.scoreGiftConfig ? JSON.parse(data.scoreGiftConfig) : {};
          if (data.rightSmallType == 2) {
            _this.radio = parseInt(scoreGiftConfig.type) || 1;
            if (scoreGiftConfig.type == 1) {
              _this.type3Config.rightList = [
                {
                  scoreList: scoreGiftConfig.twoTypes ? [scoreGiftConfig.twoTypes] : []
                },
                {
                  scoreList: scoreGiftConfig.threeTypes ? [scoreGiftConfig.threeTypes] : []
                },
                {
                  scoreList: scoreGiftConfig.fourTypes ? [scoreGiftConfig.fourTypes] : []
                },
                {
                  scoreList: scoreGiftConfig.fiveTypes ? [scoreGiftConfig.fiveTypes] : []
                }
              ];
            } else if (scoreGiftConfig.type == 2) {
              if (_this.type4TabShow == 1) {
                _this.type4Config = scoreGiftConfig;
              } else if (_this.type4TabShow == 2) {
                _this.type6Config = scoreGiftConfig;
              }
            } else if (scoreGiftConfig.type == 3) {
              _this.productList = scoreGiftConfig.productList;
              if (!scoreGiftConfig.rightList[0].scoreList) {
                scoreGiftConfig.rightList[0].scoreList = [];
              }
              if (!scoreGiftConfig.rightList[0].giftList) {
                scoreGiftConfig.rightList[0].giftList = [];
              }
              _this.type5Config = scoreGiftConfig;
            }
          } else if (data.rightSmallType == 1) {
            if (scoreGiftConfig.type == 2) {
              _this.type1Config = scoreGiftConfig;
            } else if (scoreGiftConfig.type == 1) {
              _this.type2Config = scoreGiftConfig;
              _this.type1Config.type = 1;
            }
          }

          if (data.buyNumProductCode) {
            _this.buyNumProductCode = JSON.parse(data.buyNumProductCode).productList;
            _this.type4TabShow = '2';
          }

          // 计算成本
          const params = {
            giftConfig: JSON.stringify(scoreGiftConfig),
            id: data.id
          };
          _this.requestRights.getCostAmountByGiftConfig(params).then((data) => {
            if (data) {
              _this.costAmount = data;
            } else {
              _this.costAmount = 0;
            }

            if (_this.budgetAmount < _this.costAmount) {
              _this.$message({
                type: 'warning',
                message: '预算不足！'
              });
            }
          });

          setTimeout(() => {
            _this.radioChange = function () {
              _this.type3Config = {
                type: 1, // 1-产业下全部产品参加活动   2-单型号产品参加活动
                rightList: [{}]
              };
              _this.type4Config = {
                type: 2, // 1-产业下全部产品参加活动   2-单型号产品参加活动
                rightList: []
              };
              _this.type6Config = {
                type: 2, // 1-产业下全部产品参加活动   2-单型号产品参加活动
                rightList: []
              };
              _this.type5Config = {
                type: 3, // 1-产业下全部产品参加活动   2-单型号产品参加活动
                productList: [],
                rightList: [
                  {
                    scoreList: [],
                    giftList: []
                  }
                ]
              };

              for (let i = 0; i < _this.productCategoryLength; i++) {
                if (i <= 5 && i >= 2) {
                  _this.type3Config.rightList.push({});
                }
              }

              _this.costAmount = 0;
            };

            _this.type1ConfigTypeChange = function (value) {
              _this.type1Config.type = value;
              _this.type1Config.rightList = [];
              _this.type2Config.rightList = [{}];
              _this.disableGenerate = false;
              _this.productName = '';
              _this.costAmount = 0;
            };
          }, 500);
        }
      });
    },
    listProductInfo(queryString, cb) {
      const _this = this;
      const params = {
        brandName: this.rightBrandName,
        code: this.productCategoryCode,
        productName: queryString
      };

      this.requestRights.listProductInfo(params).then((data) => {
        if (data.entities) {
          for (let i = 0; i < data.entities.length; i++) {
            data.entities[i].desc = `${data.entities[i].pro_band
            } | ${
              data.entities[i].mmt_department
            } | ${
              data.entities[i].mmt_material_descrition}`;
          }
          cb(data.entities);
        } else {
          cb([]);
        }
      });
    },
    productSelect(item) {
      let isRepeat = false;
      for (let i = 0; i < this.type1Config.rightList.length; i++) {
        if (this.type1Config.rightList[i].productCode == item.mmt_material_code) {
          isRepeat = true;
        }
      }
      if (!isRepeat) {
        this.type1Config.rightList.push({
          productCode: item.mmt_material_code, // 9位编码
          modelNo: item.mmt_material_descrition, // 型号
          brandName: item.pro_band, // 品牌
          productCategoryCode: item.mmt_department, // 产业名称
          bpp_price: item.bpp_price
        });
        this.disableGenerate = true;
      }

      this.bpp_price = 0;
      for (let i = 0; i < this.type1Config.rightList.length; i++) {
        this.bpp_price += this.type1Config.rightList[i].bpp_price;
      }
    },
    deleteGift(item, index) {
      this.type1Config.rightList.splice(index, 1);
      this.save('temporary', true);
      if (this.type1Config.rightList.length == 0) {
        this.bpp_price = 0;
      } else {
        this.bpp_price = 0;
        for (let i = 0; i < this.type1Config.rightList.length; i++) {
          this.bpp_price += this.type1Config.rightList[i].bpp_price;
        }
      }
    },

    deletepro(index) {
      if (this.productList.length == 2) {
        return;
      }
      this.productList.splice(index, 1);
      this.save('temporary', true);

      this.testnum();
    },
    deletescor(index) {
      this.type4Config.rightList.splice(index, 1);
      this.save('temporary', true);
    },
    deletescor01(index) {
      this.type6Config.rightList.splice(index, 1);
      this.save('temporary', true);
    },
    deletesetmail(index) {
      delete this.type3Config.rightList[index].scoreList;
      this.$forceUpdate();
    },

    deletexh(index) {
      this.buyNumProductCode.splice(index, 1);
      this.save('temporary', true);
    },
    type3ProductSelect(item, e) {
      const isRepeat = false;
      const productArr = [];
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].desc) {
          if ($.inArray(this.productList[i].desc, productArr) < 0) {
            productArr.push(this.productList[i].desc);
          } else {
            this.productList[i].desc = '';
            this.$message({
              type: 'warning',
              message: '产品型号不能重复！'
            });
          }
        }
      }

      this.bpp_price = 0;
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].desc == item.desc) {
          this.productList[i].modelNo = item.mmt_material_descrition;
          this.productList[i].desc = item.desc;
          this.productList[i].productCode = item.mmt_material_code;
          this.productList[i].brandName = item.pro_band;
          this.productList[i].productCategoryCode = item.mmt_department;
          this.productList[i].bpp_price = item.bpp_price || 0;
        }
        this.productList[i].bpp_price = this.productList[i].bpp_price || 0;
        this.bpp_price += this.productList[i].bpp_price;
      }
      this.testnum();
    },
    type3ProductFocus(item, e) {
      console.log(item);
    },
    type4ProductSelect(item, e) {
      let isRepeat = false;
      for (let i = 0; i < this.buyNumProductCode.length; i++) {
        if (this.buyNumProductCode[i].productCode == item.mmt_material_code) {
          isRepeat = true;
        }
      }
      if (!isRepeat) {
        this.buyNumProductCode.push({
          productCode: item.mmt_material_code, // 9位编码
          modelNo: item.mmt_material_descrition, // 型号
          brandName: item.pro_band, // 品牌
          productCategoryCode: item.mmt_department // 产业名称
        });
      }
    },
    configGift(type, index, productCode, scoreList, giftList, modelNo) {
      this.checked1 = '1';

      if (scoreList && scoreList.length > 0) {
        this.scoreList = scoreList;
      } else {
        this.scoreList = [
          {
            rightType: 1, // 1-固定积分数   2-按产品价格比例
            score: '', // 单台积分数   rightType=1时使用
            num: '', // 覆盖范围台数  rightType=1时使用
            priceScale: '', // 价格比例 20表示按照20%比例  rightType=2时使用
            salesAmount: '' // 产出销售额 rightType=2 时使用
          }
        ];
      }

      if (giftList && giftList.length > 0) {
        this.checked1 = '2';
        this.giftList = giftList;
      } else {
        this.giftList = [
          {
            giftType: 1, // 1-推荐   2-自定义
            num: '', // 覆盖范围台数，选择套装的话 2个礼物num一致填写相同数目
            purchasePriceStart: '', // 采购价开始
            purchasePriceEnd: '', // 采购价结束
            giftId: '', // 产品唯一编码
            giftIdUnique: '', // 权益活动产品唯一编码
            picUrl: '', // 图片url
            needScore: '', // 所需积分
            sortId: '', // 排序id
            dataFrom: '', // hbmall/camall
            productUrl: '', // 产品链接
            productName: '', // 产品名称
            exchangeNum: '' // 历史兑换数量
          }
        ];
      }
      this.giftProductInit = false;

      const _this = this;
      if (type == 1 || type == 5) {
        this.giftRightsDialog = true;
        // this.listRecommendGift(productCode);
        this.giftProductCode = productCode;
        if (type == 1) {
          this.modelNo = modelNo;
        } else if (type == 5) {
          console.log(modelNo);
          let modelNos = '';
          for (let a = 0; a < modelNo.length; a++) {
            modelNos += `${modelNo[a].modelNo},`;
          }
          this.modelNo = modelNos.substring(0, modelNos.length - 1);
        }

        this.saveGiftConfig = function () {
          if (_this.checked1 == 1) {
            if (
              (_this.scoreList[0].rightType == 1 && _this.scoreList[0].num != '' && _this.scoreList[0].score != '')
              || (_this.scoreList[0].rightType == 2
                && _this.scoreList[0].priceScale != ''
                && _this.scoreList[0].salesAmount != '')
            ) {
              _this[`type${type}Config`].rightList[index].scoreList = JSON.parse(JSON.stringify(_this.scoreList));
              _this[`type${type}Config`].rightList[index].giftList = [];
            } else {
              _this.$message({
                type: 'warning',
                message: '请配置积分！'
              });
              return false;
            }
          } else if (_this.checked1 == 2) {
            if (_this.giftList[0].giftId == '') {
              _this.$message({
                type: 'warning',
                message: '请选择礼品！'
              });

              return false;
            }

            if (_this.giftList[0].purchasePriceStart == '' || _this.giftList[0].purchasePriceEnd == '') {
              _this.$message({
                type: 'warning',
                message: '请填写价格范围！'
              });

              return false;
            }

            if (_this.giftList[0].num == '') {
              _this.$message({
                type: 'warning',
                message: '请填写礼品总数！'
              });

              return false;
            }

            _this[`type${type}Config`].rightList[index].giftList = JSON.parse(JSON.stringify(_this.giftList));
            _this[`type${type}Config`].rightList[index].scoreList = [];
          }

          _this.save('temporary', true);

          _this.giftRightsDialog = false;
          _this.disableGenerate = false;
        };
      } else if (type == 4 || type == 2 || type == 3 || type == 6) {
        this.scoreRightsDialog = true;
        this.saveGiftConfig = function () {
          if (
            (_this.scoreList[0].rightType == 1 && _this.scoreList[0].num != '' && _this.scoreList[0].score != '')
            || (_this.scoreList[0].rightType == 2
              && _this.scoreList[0].priceScale != ''
              && _this.scoreList[0].salesAmount != '')
          ) {
            _this[`type${type}Config`].rightList[index].scoreList = JSON.parse(JSON.stringify(_this.scoreList));
          } else {
            _this.$message({
              type: 'warning',
              message: '请配置积分！'
            });
            return false;
          }

          _this.save('temporary', true);

          _this.scoreRightsDialog = false;
          _this.disableGenerate = false;
        };
      }
    },
    listRecommendGift(productCode) {
      if (this.giftList[0].purchasePriceStart == '') {
        this.$message({
          type: 'warning',
          message: '请正确填写最低价'
        });
      } else if (this.giftList[0].purchasePriceEnd == '') {
        this.$message({
          type: 'warning',
          message: '请正确填写最高价'
        });
      } else {
        const params = {
          // productCode: productCode || this.giftProductCode,
          productCategoryCodes: this.productCategoryCode,
          brandNames: this.rightBrandName,
          startPrice: this.giftList[0].purchasePriceStart,
          endPrice: this.giftList[0].purchasePriceEnd
        };
        const _this = this;
        this.requestRights.listRecommendGift(params).then((data) => {
          if (data) {
            console.log(data);
            if (data == '') {
              _this.giftProductInit = true;
              _this.nopro02 = true;
              _this.recommendGift = [];
            } else {
              _this.nopro02 = false;
              _this.recommendGift = data;
              _this.giftProductInit = true;
            }
          }
        });
      }
    },
    listRecommendGiftByKeyWords(productCode) {
      const params = {
        keyWords: this.keyWords,
        brandNames: this.rightBrandName,
        startPrice: this.giftList[0].purchasePriceStart,
        endPrice: this.giftList[0].purchasePriceEnd,
        pageNo: 1,
        pageSize: 50
      };
      const _this = this;
      this.requestRights.listRecommendGiftByKeyWords(params).then((data) => {
        if (data && data.total !== undefined) {
          _this.recommendGiftByKeyWords = data;
          _this.giftProductInit = true;
          _this.nopro = false;
        } else {
          _this.recommendGiftByKeyWords = [];
          _this.giftProductInit = true;
          _this.nopro = true;
        }
      });
    },
    searchGift() {
      if (this.giftList[0].giftType == 1) {
        this.listRecommendGift();
      } else if (this.giftList[0].giftType == 2) {
        this.listRecommendGiftByKeyWords();
      }
    },
    saveGiftConfig() {},
    selectProduct(gift) {
      this.giftList[0].giftId = gift.productCode;
      this.giftList[0].picUrl = gift.photoLink;
      this.giftList[0].needScore = gift.needScore;
      this.giftList[0].sortId = gift.sort;
      this.giftList[0].dataFrom = gift.dataSource;
      this.giftList[0].productUrl = gift.productLink;
      this.giftList[0].productName = gift.productName;
      this.giftList[0].exchangeNum = gift.amount;
    },
    changeGift() {
      this.giftList = [
        {
          giftType: 1, // 1-推荐   2-自定义
          num: '', // 覆盖范围台数，选择套装的话 2个礼物num一致填写相同数目
          purchasePriceStart: '', // 采购价开始
          purchasePriceEnd: '', // 采购价结束
          giftId: '', // 产品唯一编码
          giftIdUnique: '', // 权益活动产品唯一编码
          picUrl: '', // 图片url
          needScore: '', // 所需积分
          sortId: '', // 排序id
          dataFrom: '', // hbmall/camall
          productUrl: '', // 产品链接
          productName: '', // 产品名称
          exchangeNum: '' // 历史兑换数量
        }
      ];
    },
    addType3() {
      if (this.buyAmount != '' && this.buyAmount > 0) {
        if (this.type4TabShow == 1) {
          this.type4Config.rightList.push({
            buyAmount: this.buyAmount // 购买达到金额
          });
          this.buyAmount = '';
        } else if (this.type4TabShow == 2) {
          this.type6Config.rightList.push({
            buyAmount: this.buyAmount // 购买达到金额
          });
          this.buyAmount = '';
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请正确填写金额！'
        });
      }
    },
    //      cleardata:function(){
    //          this.type4Config.rightList = []
    //      },
    listIndustry() {
      const _this = this;
      this.requestRights.listIndustry().then((data) => {
        if (data) {
          _this.listIndustryArr = [];
          for (const item in data) {
            console.log(item);
            _this.listIndustryArr.push({
              label: item,
              value: data[item]
            });
          }
        }
      });
    },
    addType3Product() {
      this.productList.push({
        desc: ''
      });
      this.testnum();
    },
    testnum() {
      let test = true;
      for (let c = 0; c < this.productList.length; c++) {
        if (this.productList[c].desc == '') {
          test = false;
        }
      }
      if (test) {
        this.prozh = true;
      } else this.prozh = false;
    },
    setType3Product() {
      console.log(this.productList);
      let isSave = true;
      for (let i = 0; i < this.productList.length; i++) {
        if (!this.productList[i].productCategoryCode) {
          isSave = false;
          break;
        }
      }

      if (isSave) {
        this.type5Config.productList = JSON.parse(JSON.stringify(this.productList));
      } else {
        this.$message({
          type: 'warning',
          message: '请选择正确的产品型号！'
        });
      }
    },
    handlePreview() {},
    handleRemove() {
      this.form.uuid = '';
    },
    uuidAdd(ele) {
      const self = this;
      //          self.form.userIds = '';
      //          self.form.uuid = ele.data.uuid;
    }
  },
  mounted() {
    this.getOrderRightsById();
    this.listIndustry();
  }
};
</script>
<style scoped>
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
</style>
<style>
.gift-rights-dialog .el-dialog {
  width: 803px;
}
.select-product .el-select {
  margin: 0 5px 0 4px;
}

.gift-rights-div .score-rights-input .el-input,
.score-rights-div .score-rights-input .el-input {
  vertical-align: top;
}

.gift-rights-div .score-rights-input .el-input {
  vertical-align: middle;
}

.gift-rights-div .score-rights-input .el-input .el-input__inner,
.score-rights-div .score-rights-input .el-input .el-input__inner {
  height: 32px;
  vertical-align: top;
  border-radius: 2px;
}

.gift-rights-dialog .el-dialog__body {
  padding-top: 10px;
  padding-left: 23px;
}

.gift-select-list .el-radio-button {
  width: 194px;
  background: #ecedee;
  /* display:inline-block; */
  /* line-height: 28px; */
  /* border: 1px solid #cccccc; */
  /* text-align: center; */
  /* margin: 0 -2px; */
}

.gift-select-list .el-radio-button .el-radio-button__inner {
  background: #ecedee;
}

.gift-select-list .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background: #20a0ff;
}

.gift-select-list .el-radio-button span {
  width: 100%;
}

.gift-select-list .el-radio-button .el-radio-button__inner {
  border-radius: 0;
}

.gift-select-list .el-radio-group {
  margin-left: -2px;
  height: 36px;
}

.gift-select-list .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  border-color: #3278bc;
}

.gift-select-list > a.active {
  /* background: #45a0f8; */
  /* color: #fff; */
  /* border-color: #45a0f8; */
}

.disableGenerate label {
  display: inline-block;
  width: 103px;
  line-height: 32px;
  background: #e0f0ff;
  text-align: center;
  margin-right: 2px;
}

.disableGenerate > div {
  margin: 15px 0;
}
.disableGenerate > div a {
  vertical-align: top;
  line-height: 14px;
}
.disableGenerate > div > div {
  display: inline-block;
  vertical-align: top;
  width: 225px;
}
.disableGenerate > div > div img {
  vertical-align: top;
  margin-right: 10px;
}
.disableGenerate > div > div div {
  display: inline-block;
  line-height: 19px;
}
.disableGenerate div img {
  width: 58px;
  height: 58px;
  border: 1px solid #aeaeae;
}

.type5-product-name {
  width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gift-item .ico-del {
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

.cost-bar {
  height: 46px;
  line-height: 46px;
  background: #bde3ff;
  /* position: fixed; */
  bottom: 40px;
  padding: 0 12px;
  left: -1px;
  right: -1px;

  width: 898px;
  margin: auto;
  /* left: 243px; */
}

.type4-tooltip {
  max-width: 328px !important;
}
.type4-tab-panel .product-tap div {
  width: auto;
  display: inline-block;
  position: relative;
  margin-top: 10px;
  margin-right: 10px;
  width: 174px;
}
.type4-tab-panel .product-tap div span {
  display: inline-block;
  line-height: 26px;
  border: 1px solid #c3e0fd;
  background: #fff;
  width: 174px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
}

.type4-tab-panel .product-tap div .ico-del {
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
.m-prozh {
  height: 32px;
  line-height: 32px;
  padding: 0;
  overflow: hidden;
  color: #fff;
  background-color: #a6aaad;
  border-color: #a6aaad;
  border-radius: 3px;
  width: 161px;
  text-align: center;
}
.m-leftbtn {
  float: left;
  border-radius: 3px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  margin: 0;
  padding: 7px 10px;
  background: #20a0ff;
  border: 1px solid #20a0ff;
  color: #fff;
}
.m-leftbtn:hover {
  background: #4db3ff;
  border: 1px solid #4db3ff;
  color: #fff;
}
.m-leftbtn .ico-down {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: -2px;
  background: url('../../assets/images/ico-down.png') no-repeat;
}
.m-vipinbtn {
  float: left;
  margin-left: 410px;
  border-radius: 3px;
}
.m-vipinbtn .ico-vipin {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: -2px;
  background: url('../../assets/images/ico-vipin.png') no-repeat;
}
.el-upload-list__item {
  width: auto;
  display: inline-block;
  float: left;
  margin-right: 10px;
  margin-top: 10px;
}
.el-progress {
  display: none;
}
.el-upload-list {
  display: inline-block;
}
</style>
