<template>
  <div class="vip-content" style="min-width:1230px;">
    <div class="rights-config-header-box">
      <div class="rights-config-header">
        <div class="header-title">
          <span>{{ title }}</span>
        </div>
        <div class="rights-config-step" style="margin-left:35px">
          <div class="step-index">
            <span>1</span>
          </div>
          <div class="step-title">
            <span>基础信息配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step setted" style="margin-left:242px">
          <div class="step-index">
            <span>2</span>
          </div>
          <div class="step-title">
            <span>活动范围配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:449px">
          <div class="step-index">
            <span>3</span>
          </div>
          <div class="step-title">
            <span>赠送礼品配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
      </div>
      <div class="save-draft" style="display: none;">
        <span>有急事？先</span>
        <a href="javascript:;" @click="next('temporary')">存草稿</a>
        <span>回来继续配置</span>
      </div>
    </div>

    <div class="config-form">
      <div class="config-form-header">
        <span>活动范围配置</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="活动小微" prop="" class="required">
          <el-tooltip class="item" :disabled="disabled" effect="light" :content="xiaoweiAllName" placement="top">
            <el-input style="width: 410px" v-model="xiaoweiName" disabled></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="活动渠道" prop="" class="required">
          <div style="margin-left:159px;">
            <el-radio-group v-model="form.channelType" :disabled="true">
              <el-radio :label="2">线下渠道</el-radio>
            </el-radio-group>
            <el-checkbox-group v-model="form.channelName">
              <el-checkbox v-for="(index, item) in channel" :label="index" @change="deployChang(index)">{{
                index
              }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="渠道配置" v-if="deployShow" prop="" class="required" style="margin-top:-10px;">
          <div style="margin-left:159px;">
            <!--<el-radio-group v-model="isDeploy" @change="deployChange" style="display:inline-block; width:100%;">-->
            <!--<el-radio label="渠道配置"></el-radio>-->
            <!--<el-radio label="门店配置"></el-radio>-->
            <!--</el-radio-group>-->

            <!--<div v-if="deployNum == 1">-->
            <div>
              <el-tabs type="border-card" v-model="isDeploytype" style="width:520px;">
                <el-tab-pane v-for="(item, num) in form.config" :label="item.channel" :name="item.channel">
                  <div style="width: 100%; margin-bottom: 5px; display: inline-block;">
                    <div style="width: 100%;display: inline-block; float: left;  margin-left: 10px;">
                      <p class="m-plist" v-for="(item, index) in form.config[num].rightList">
                        满<span style="margin: 0 5px;">{{ item.buyAmount }}</span
                        >元送<span style="margin: 0 5px; color: #ee5851"
                          ><i v-if="type == 2">{{ item.scoreList[0].score }}</i
                          ><i v-if="type == 1">{{ item.scoreList[0].productName }}</i></span
                        ><span v-if="type == 2">积分</span>
                        <el-input
                          v-model="item.scoreList[0].num"
                          style="width: 60px; margin: 0 5px;"
                          @change="inputChange(item, index, num)"
                        ></el-input
                        >份
                        <span style="margin-left:5px;" v-if="item.scoreList[0].residueNum >= item.scoreList[0].inputNum"
                          >剩余份额{{ item.scoreList[0].residueNum - item.scoreList[0].inputNum }}份</span
                        >
                        <span v-if="item.scoreList[0].residueNum < item.scoreList[0].inputNum" class="color-red"
                          >剩余份额不足!</span
                        >
                      </p>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <!--<div v-if="deployNum == 2">-->
            <!--<a href="http://10.159.56.10:8080/wechat/batchtempuser/userIds.xls" class="m-leftbtn m-leftmod">模版下载</a>-->
            <!--<el-upload class="upload-demo" action="http://10.159.56.10:15600/vipcenter/batchUserController/uploadCustomerFile" :on-preview="handlePreview"-->
            <!--:on-success="uuidAdd" :on-remove="handleRemove" multiple :limit="1">-->
            <!--<el-button size="mini" type="primary" class="m-mdbtn">导入配置</el-button>-->
            <!--</el-upload>-->
            <!--</div>-->
          </div>
        </el-form-item>
        <!--<el-form-item label="活动门店" prop="" class="required">-->
        <!--<el-input style="width: 410px" :disabled="md"  type="textarea" v-model="shopName" @focus="pickerStores"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="活动品牌" prop="" class="required">
          <el-checkbox-group v-model="form.rightBrandName">
            <el-checkbox v-for="item in brandList" :label="item.code" disabled>{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="产品类别" prop="" class="required">
          <el-input style="width: 410px" v-model="categoryName" disabled></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="trs-btn" style="width:109px;margin-top:14px;" @click="prev">上一步</el-button>
          <el-button
            type="primary"
            class="trs-btn"
            style="width:109px;margin-top:14px;margin-left:11px;"
            :disabled="budgetAmount < costAmount || (costAmount == 0 && form.channelName.length == 0)"
            @click="next"
            >下一步</el-button
          >
        </el-form-item>
      </el-form>
      <div class="cost-bar" style="width:100%;">
        权益成本：
        <b class="color-red">{{ costAmount }}</b> &nbsp;&nbsp;|&nbsp;&nbsp; 投入预算：
        <b class="color-red">{{ budgetAmount }}</b> &nbsp;&nbsp;|&nbsp;&nbsp; 剩余金额：
        <b class="color-red" v-if="budgetAmount >= costAmount">{{
          parseFloat(budgetAmount - costAmount).toFixed(2)
        }}</b>
        <b class="color-red" v-if="budgetAmount < costAmount">0</b> &nbsp;&nbsp;
        <i
          v-if="budgetAmount >= costAmount"
          style="display:inline-block;height:16px;width:16px;border-radius: 16px;background:#00df60;vertical-align: text-top;margin-right:6px;margin-left:16px;"
        ></i>
        <span v-if="budgetAmount >= costAmount">正常</span>
        <i
          v-if="budgetAmount < costAmount"
          style="display:inline-block;height:16px;width:16px;border-radius: 16px;background:#ee5851;vertical-align: text-top;margin-right:6px;margin-left:16px;"
        ></i>
        <span v-if="budgetAmount < costAmount">超预算</span>
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
      budgetAmount: 0,
      costAmount: 0,
      title: '配置套购权益',
      isDeploy: '',
      isDeploytype: '',
      deployDialog: false,
      deployShow: false,
      deployNum: '',
      form: {
        channelType: '2',
        channelName: [],
        xiaoweiId: '',
        rightBrandName: [],
        shopCode: '',
        productCategoryCode: '',
        scoreGiftConfig: {
          buyAmountList: '',
          rightList: {
            buyAmount: '',
            scoreList: []
          }
        },
        config: [] // 小微渠道数据
      },
      rules: {},
      brandList: [
        {
          name: '海尔',
          code: 'haier'
        },
        {
          name: '卡萨帝',
          code: 'casarte'
        },
        {
          name: '统帅',
          code: 'tongshuai'
        }
      ],
      areaList: [], // 小微列表
      channel: [], // 渠道列表
      xiaoweiDialog: false,
      xiaoweiBtn: true,
      xiaowei: [],
      beforexiaowei: [], // 记录选择之前的小微值当用户选择关闭小微弹窗时回置xiaowei值
      xiaoweiName: '',
      xiaoweiAllName: '',
      categoryDialog: false,
      catBtn: true,
      industryList: [], // 产线列表
      category: [],
      beforecategory: [], // 记录选择之前的小微值当用户选择关闭小微弹窗时回置category值
      categoryName: '',
      storesDialog: false, // 门店选择弹层
      shopName: '',
      beforeshopName: '', // 记录选择之前的门店值当用户选择关闭小微弹窗时回置shopName值
      stores: [],
      disabled: true, // hover是否显示
      md: false, // 门店输入框是否可用
      selectStoreShow: true,
      queryString: '',
      changechannel: false,
      type: 2,
      newdata: []
    };
  },
  methods: {
    pickerCategory() {
      this.categoryDialog = true;
      this.beforecategory = this.category;
      let length = 0;
      for (const item in this.industryList) {
        length += 1;
      }
      if (this.category.length == length) {
        this.catBtn = false;
      } else {
        this.catBtn = true;
      }
    },
    categoryDialogCloas() {
      this.category = this.beforecategory;
      this.categoryDialog = false;
    },
    categoryCheckAll() {
      const category = [];
      for (const item in this.industryList) {
        category.push(`${this.industryList[item]}:${item}`);
      }
      this.category = category;
      this.catBtn = false;
    },
    cancelCheckAll() {
      this.category = [];
      this.catBtn = true;
    },
    listIndustry() {
      const _this = this;
      this.requestRights.listIndustry().then((data) => {
        if (data) {
          _this.industryList = data;
        }
      });
    },
    // 输入份数触发权益成本
    inputChange(value, index, num) {
      const self = this;
      setTimeout(() => {
        self.form.config[num].rightList[index].scoreList[0].num = self.form.config[num].rightList[
          index
        ].scoreList[0].num.replace(/[^\d]/g, '');
      });

      setTimeout(() => {
        if (!self.form.config[num].rightList[index].scoreList[0].num) {
          self.form.config[num].rightList[index].scoreList[0].num = 0;
        }
      });
      // debugger
      let inputNumber = 0;
      for (let a = 0; a < self.form.config.length; a++) {
        inputNumber += self.form.config[a].rightList[index].scoreList[0].num * 1;
      }
      for (let b = 0; b < self.form.config.length; b++) {
        self.form.config[b].rightList[index].scoreList[0].inputNum = inputNumber;
      }
      setTimeout(() => {
        self.next('', true); // 走权益成本方法
      });
    },
    categorySelect() {
      if (this.category.length == 0) {
        this.$message({
          type: 'warning',
          message: '请选择产品类别'
        });
        return;
      }
      let categoryName = [];
      let productCategoryCode = [];
      for (let i = 0; i < this.category.length; i++) {
        categoryName.push(this.category[i].split(':')[1]);
        productCategoryCode.push(this.category[i].split(':')[0]);
      }
      categoryName = categoryName.join(',');
      productCategoryCode = productCategoryCode.join(',');

      let length = 0;
      for (const item in this.industryList) {
        length += 1;
      }
      if (this.category.length == length && length > 3) {
        categoryName = '所有类别';
        productCategoryCode = 'all';
      }

      this.form.productCategoryCode = productCategoryCode;
      this.categoryName = categoryName;
      this.categoryDialog = false;
    },

    listChannelById(id) {
      const _this = this;
      const params = {
        id
      };
      this.requestRights.listChannelById(params).then((data) => {
        if (data) {
          _this.channel = data;
        }
      });
    },
    channelTypeChange(channelType) {
      this.listChannelById(channelType);
      this.form.channelName = [];
      if (this.changechannel == true) {
        this.shopName = '';
        this.stores = [];
      }
      this.changechannel = true;
    },

    getOrderRightsById() {
      const _this = this;
      const params = {
        id: this.$route.query.id
      };
      this.requestRights.getOrderRightsById(params).then((data) => {
        if (data) {
          _this.form.id = data.id;
          // _this.form.channelType = data.channelType || 2
          _this.form.channelType = 2;
          _this.form.step = 3;
          _this.form.type = 2;
          _this.form.rightBigType = data.rightBigType;
          _this.form.rightSmallType = data.rightSmallType;

          _this.budgetAmount = data.budgetAmount;

          const rightsdata = JSON.parse(data.scoreGiftConfig);
          rightsdata.rightList.forEach((el) => {
            if (el.scoreList == null) {
              _this.type = 1;
              el.scoreList = el.giftList;
            }
          });
          _this.form.scoreGiftConfig = rightsdata;

          _this.shopName = data.shopName;
          _this.xiaoweiName = data.xiaoweiName;
          let lstores = [];
          lstores = data.shopName ? data.shopName.split(',') : [];
          for (let c = 0; c < lstores.length; c++) {
            _this.stores.push({
              shopName: lstores[c]
            });
          }
          _this.form.rightBrandName = data.rightBrandName ? data.rightBrandName.split(',') : [];
          _this.categoryName = data.productCategoryName;

          _this.form.shopCode = data.shopCode;
          _this.form.productCategoryCode = data.productCategoryCode;

          for (let a = 0; a < _this.form.scoreGiftConfig.rightList.length; a++) {
            _this.form.scoreGiftConfig.rightList[a].scoreList[0].residueNum = _this.form.scoreGiftConfig.rightList[a].scoreList[0].num;
            _this.form.scoreGiftConfig.rightList[a].scoreList[0].num = 0;
            _this.form.scoreGiftConfig.rightList[a].scoreList[0].inputNum = 0;
            // if(_this.form.scoreGiftConfig.rightList[a].scoreList!=null){}
          }

          _this.listChannelById(_this.form.channelType);

          // 计算成本
          // console.log(_this.form.config)
          // console.log(data.scoreGiftConfig)
          // let onemoney=  JSON.parse(data.scoreGiftConfig)
          // onemoney.config=JSON.parse(JSON.stringify(_this.form.config))
          // if(_this.type==1){
          //     console.log(onemoney.config[0].rightList)
          //    // delete onemoney.config[0].rightList[0].scoreList
          // }
          // let params = {
          //     json: JSON.stringify(onemoney)
          // };
          // _this.requestRights
          //         .getCostAmount(params)
          //         .then(function(data) {
          //             if (data) {
          //                 _this.costAmount = data;
          //             } else {
          //                 _this.costAmount = 0;
          //             }
          //
          //             if (_this.budgetAmount < _this.costAmount) {
          //                 _this.$message({
          //                     type: "warning",
          //                     message: "预算不足！"
          //                 });
          //             }
          //
          //         });
        }
      });
    },
    // 下一步
    next(temporary, getCostAmount) {
      const data = JSON.parse(JSON.stringify(this.form));

      data.rightBrandName = data.rightBrandName.join(',');
      data.channelName = data.channelName.join(',');
      const _this = this;
      if (_this.form.config == '') {
        _this.$message({
          type: 'warning',
          message: '请选择渠道！'
        });
      }
      data.scoreGiftConfig.config = _this.form.config;
      const ajaxdata = JSON.parse(JSON.stringify(data));
      if (_this.type == 1) {
        ajaxdata.scoreGiftConfig.rightList.forEach((e) => {
          e.giftList = e.scoreList;
          delete e.scoreList;
        });
        ajaxdata.config.forEach((el) => {
          el.rightList.forEach((e) => {
            e.giftList = e.scoreList;
            delete e.scoreList;
          });
          // el.rightList[0].giftList=ajaxdata.config[0].rightList[0].scoreList
          // delete el.rightList[0].scoreList
        });
        ajaxdata.scoreGiftConfig.config.forEach((el) => {
          el.rightList.forEach((e) => {
            e.giftList = e.scoreList;
            delete e.scoreList;
          });
        });
      }

      if (getCostAmount) {
        const giftdata = JSON.parse(JSON.stringify(data.scoreGiftConfig));
        if (_this.type == 1) {
          giftdata.rightList.forEach((el) => {
            el.giftList = el.scoreList;
            delete el.scoreList;
          });
          giftdata.config.forEach((el) => {
            el.rightList.forEach((e) => {
              e.giftList = e.scoreList;
              delete e.scoreList;
            });
          });
        }
        const params = {
          json: JSON.stringify(giftdata)
        };
        this.requestRights.getCostAmount(params).then((data) => {
          // _this.disableGenerate = false
          if (data) {
            _this.costAmount = data;
          }

          if (_this.budgetAmount < _this.costAmount) {
            _this.$message({
              type: 'warning',
              message: '预算不足！'
            });
          }
        });
      } else {
        // data改为ajaxdata
        if (temporary == 'temporary') {
          this.requestRights.saveMomentOrderRights(ajaxdata).then((data) => {
            self.saveing = false;
            if (data) {
              _this.$message({
                type: 'success',
                message: '暂存成功'
              });
            }
          });
        } else {
          this.requestRights.saveXwNextOrderRights(ajaxdata).then((data) => {
            if (data) {
              _this.$router.push({
                path: '/strategy/rightsxwconfirm',
                query: { id: _this.$route.query.id }
              });
            }
          });
        }
      }
    },
    prev() {
      const { id } = this.$route.query;
      this.$router.push({
        path: '/strategy/rightsxwbaseinfo',
        query: {
          id,
          rightSmallType: this.form.rightSmallType
        }
      });
    },
    // 获取小微渠道配置信息
    getDeploy() {
      const self = this;
      const data = {
        rightsId: self.$route.query.id
      };
      this.requestRights.getDetailByRightsId(data).then((data) => {
        if (data) {
          if (data.data && data.data != '') {
            self.deployShow = true;
            let xwdata = [];
            const xwqddata = {
              channel: '',
              type: 2,
              rightList: []
            };
            const chickChannelName = [];
            let chickChannel = '';
            for (let c = 0; c < data.data.length; c++) {
              xwqddata.channel = data.data[c].channelName;
              chickChannel = data.data[c].channelName;
              const laidata = JSON.parse(data.data[c].scoreGiftConfig);
              if (laidata.rightList[0].scoreList == null) {
                laidata.rightList.forEach((el) => {
                  el.scoreList = el.giftList;
                });
              }
              const con = laidata;
              xwqddata.rightList = con.rightList;
              xwdata.push(xwqddata);
              xwdata = JSON.parse(JSON.stringify(xwdata));
              chickChannelName.push(chickChannel);
            }
            self.form.config = xwdata;

            // 重新计算已配置份数
            const Number = [];
            for (let a = 0; a < self.form.config[0].rightList.length; a++) {
              let reinputNumber = 0;
              for (const i in self.form.config) {
                reinputNumber += self.form.config[i].rightList[a].scoreList[0].num * 1;
              }
              Number.push(reinputNumber);
            }
            for (let b = 0; b < self.form.config[0].rightList.length; b++) {
              for (const o in self.form.config) {
                self.form.config[o].rightList[b].scoreList[0].inputNum = Number[b];
              }
            }

            self.form.channelName = chickChannelName;
            self.isDeploytype = self.form.channelName[0];
            if (self.form.channelName != '') {
              self.next('', true);
            }
          }
        }
      });
    },
    // 渠道添加删除
    deployChang(ele) {
      const self = this;

      const data = {
        channel: ele,
        type: 2,
        rightList: JSON.parse(JSON.stringify(self.form.scoreGiftConfig.rightList))
      };

      if (self.form.channelName == '') {
        self.deployShow = false;
        self.deployNum = '';
        self.isDeploytype = '';
        self.form.config = [];
      } else {
        const xwalldata = JSON.parse(JSON.stringify(self.form.config));

        if (xwalldata.length < 1) {
          xwalldata.push(data);
          self.form.config = xwalldata;
        } else {
          let flag = true;
          for (let c = 0; c < self.form.config.length; c++) {
            if (self.form.config[c].channel == ele) {
              xwalldata[c].isDelete = true;
              flag = false;
            }
          }
          if (flag) {
            xwalldata.push(data);
          }
          const newXWData = [];
          for (let c = 0; c < xwalldata.length; c++) {
            if (!xwalldata[c].isDelete) {
              newXWData.push(xwalldata[c]);
            }
          }

          self.form.config = newXWData;
        }
        self.deployShow = true;
        self.isDeploytype = self.form.channelName[0];
        self.recalculate();
      }
      this.getmoney();
    },
    // 重新计算渠道份数
    recalculate() {
      const self = this;
      // debugger
      const Number = [];
      for (let a = 0; a < self.form.config[0].rightList.length; a++) {
        let reinputNumber = 0;
        for (const i in self.form.config) {
          reinputNumber += self.form.config[i].rightList[a].scoreList[0].num * 1;
        }
        Number.push(reinputNumber);
      }
      for (let b = 0; b < self.form.config[0].rightList.length; b++) {
        for (const o in self.form.config) {
          self.form.config[o].rightList[b].scoreList[0].inputNum = Number[b];
        }
      }
    },
    // 计算成本
    getmoney() {
      const self = this;
      const data = JSON.parse(JSON.stringify(this.form));
      data.scoreGiftConfig.config = self.form.config;
      const giftdata = JSON.parse(JSON.stringify(data.scoreGiftConfig));
      if (self.type == 1) {
        giftdata.rightList.forEach((el) => {
          el.giftList = el.scoreList;
          delete el.scoreList;
        });
        giftdata.config.forEach((el) => {
          el.rightList.forEach((e) => {
            e.giftList = e.scoreList;
            delete e.scoreList;
          });
        });
      }
      const params = {
        json: JSON.stringify(giftdata)
      };
      this.requestRights.getCostAmount(params).then((data) => {
        // self.disableGenerate = false
        self.costAmount = data;
        if (self.budgetAmount < self.costAmount) {
          self.$message({
            type: 'warning',
            message: '预算不足！'
          });
        }
      });
    },
    deployChange(ele) {
      if (ele == '渠道配置') {
        // this.deployDialog = true;
        this.deployNum = '1';
        this.isDeploytype = this.form.channelName[0];
      } else {
        this.deployNum = '2';
      }
    },
    deployDialogCloas() {},
    deployDialogSelect() {
      this.deployDialog = false;
    },

    handlePreview() {},
    handleRemove() {
      this.form.uuid = '';
    }
  },
  mounted() {
    this.getOrderRightsById();
    // this.listArea()
    this.listIndustry();
    this.getDeploy();
  }
};
</script>
<style scoped>
.config-form {
  max-height: 525px;
  top: 20px;
  bottom: 20px;
  overflow: auto;
  margin: 40px auto 0;
  padding-bottom: 0;
}

.config-form .trs-btn {
  margin-left: 159px;
}

.config-form .img-list {
  margin-left: 159px;
}

.xiaowei-dialog .xiaowei-dialog-header > p a {
  width: auto;
  padding: 0 5px;
  height: 18px;
  border: 1px solid #cccccc;
  border-radius: 2px;
  color: #45a0f8;
  font-weight: normal;
  display: inline-block;
  text-align: center;
  line-height: 18px;
  float: right;
}

.select-all-shop {
  width: auto;
  padding: 0 5px;
  height: 24px;
  border: 1px solid #ccc;
  border-radius: 2px;
  color: #45a0f8;
  font-weight: normal;
  display: inline-block;
  text-align: center;
  line-height: 24px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.color-red {
  color: #ee5851;
}
</style>
<style>
.xiaowei-dialog .el-dialog {
  width: 240px;
}

.xiaowei-dialog .el-checkbox-group {
  height: 206px;
  overflow: auto;
}

.xiaowei-dialog .el-checkbox {
  display: block;
  margin-left: 0;
}

.xiaowei-dialog .el-dialog__body {
  margin-top: -30px;
  padding-bottom: 10px;
}

.xiaowei-dialog .xiaowei-dialog-header > p {
  margin-bottom: 12px;
  font-weight: bold;
}

.stores-dialog .el-dialog {
  width: 476px;
}

.stores-dialog .el-dialog__body {
  margin-top: -30px;
  padding: 30px;
  padding-bottom: 10px;
}

.stores-dialog div .el-input__inner {
  height: 32px;
  border-radius: 2px;
  margin: 5px 0;
}

.stores-dialog div .el-input__inner input {
  height: 32px;
  line-height: 32px;
}

.stores-dialog .selected-stores {
  margin-top: 5px;
  display: inline-block;
  height: auto;
  min-height: 70px;
}

.stores-dialog .selected-stores .m-box {
  display: inline-block;
  float: left;
}

.stores-dialog .selected-stores .m-contbox {
  display: inline-block;
  position: relative;
  margin-right: 5px;
  text-align: center;
}

.stores-dialog .selected-stores .m-contbox span {
  display: inline-block;
  width: 115px;
  border-radius: 2px;
  margin-right: 8px;
  padding: 0 15px;
  line-height: 32px;
  background: #f5f5f5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stores-dialog .selected-stores .m-contbox .ico-del {
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: 0px;
  top: -5px;
  background: url('../../assets/images/ico-del.png') no-repeat;
  background-size: 100% 100%;
}

.stores-dialog .dialog-footer {
  text-align: center;
}

.required .el-form-item__label:before {
  content: '*';
  color: #ff4949;
  margin-right: 4px;
}

.el-tooltip__popper {
  max-width: 600px;
}

.el-input__inner {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.el-textarea textarea {
  font-size: 12px;
}

.m-leftmod {
  padding: 4px !important;
}

.m-mdbtn {
  float: left;
  margin-left: 20px;
  border-radius: 3px;
}

.m-mdbtn .ico-vipin {
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

.m-plist {
  margin: 5px 0 5px 10px;
  padding-left: 10px;
  width: 100%;
  display: inline-block;
  border-left: 2px solid #e0f0ff;
}
</style>
