<template>
  <div class="rightsconfigrutionfive" v-loading="loading">
    <div class="rights-config-header-box">
      <div class="rights-config-header">
        <div class="header-title">
          <span>一站式调研配置</span>
        </div>
        <div class="rights-config-step" style="margin-left:35px">
          <div class="step-index">
            <span>1</span>
          </div>
          <div class="step-title">
            <span>选择发放场景</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:185px">
          <div class="step-index">
            <span>2</span>
          </div>
          <div class="step-title">
            <span>问卷配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:335px">
          <div class="step-index">
            <span>3</span>
          </div>
          <div class="step-title">
            <span>直销员和用户筛选</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:485px">
          <div class="step-index">
            <span>4</span>
          </div>
          <div class="step-title">
            <span>详情配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step setted" style="margin-left:635px">
          <div class="step-index">
            <span>5</span>
          </div>
          <div class="step-title">
            <span>奖励配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:785px">
          <div class="step-index">
            <span>6</span>
          </div>
          <div class="step-title">
            <span>配置成功</span>
          </div>
          <div class="step-bg"></div>
        </div>
      </div>
    </div>
    <div>
      <!-- 用户礼品配置 -->
      <div>
        <h2 class="directSeller-title" style="display: inline-block;">用户礼品配置(已筛选出{{ zxy }}个直销员)</h2>
        <el-button type="primary" style="margin-left: 10px;" @click="giftSelect">选择礼品</el-button>
        <span style="margin-left: 5px;">*礼品数量必须是直销员数量的整数倍！！！</span>
      </div>

      <!-- 完整礼品列表 -->
      <div class="addgift-body margin-left" v-show="displayGift">
        <div style="display: flex; height: 46px;line-height: 46px;position: relative;">
          <span class="show-gift">礼品列表：</span>

          <div class="shaixuan">
            <el-input class="gift-input" placeholder="最低价" v-model="startPrice" type="Number"></el-input>
            <div>——</div>
            <el-input class="gift-input" placeholder="最高价" v-model="endPrice" type="Number"></el-input>
            <div class="yuan">(元)</div>
            <el-input class="gift-input" placeholder="礼品关键字" v-model="keyWords"></el-input>
            <el-button type="primary" @click="shaixuanClick">筛选</el-button>
            <el-button type="primary" @click="successClick">完成</el-button>
          </div>
        </div>

        <hr />

        <div
          style="display: flex;flex-wrap: wrap;overflow-y: scroll;max-height: 500px;margin-top: 10px;min-height: 100px;"
          v-loading="giftLoading"
        >
          <div class="addgift-info" v-for="(item, index) in sites" :key="index">
            <img class="addgift-img" :src="item.photoLink" @click="imgDescription(item.productLink)" />
            <div class="info">
              <div class="info-title">{{ item.productName }}</div>
              <div class="info-body">{{ item.needScore }}海贝</div>
              <div class="info-money">库存{{ item.amount }}件</div>
            </div>
            <div style="display: flex;position: absolute;bottom: 10px;right:30px;">
              <span style="height: 36px;line-height: 36px;font-size: 14px;">数量：</span>
              <el-input v-model="item.count" class="giftNumInput" type="Number"></el-input>
              <button @click="handleClickabc(item)" class="sendThis">送这个</button>
            </div>
          </div>
        </div>
      </div>

      <div class="addgift-body margin-left">
        <div>
          <div class="show-gift" style="margin: 20px 0 10px;">已选礼品：(共{{ giftNumberSum }}件）</div>
          <hr />
          <div class="showgift">
            <div style="display: flex;flex-wrap: wrap;">
              <div class="addgift-info" v-for="(item, index) in giftId" :key="index" v-if="item.giftTotal > 0">
                <img
                  class="addgift-img"
                  :src="item.imgUrl"
                  @click="imgDescription(item.productLink)"
                  title="点击查看详情"
                />
                <div class="info">
                  <div class="info-title">{{ item.giftName }}</div>
                  <div class="info-body">{{ item.giftPrice }}海贝</div>
                  <div class="info-money">选了{{ item.giftTotal }}件</div>
                </div>
                <el-button type="primary" @click="deleteClick(index)" class="deleteGift">删除</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 直销员奖励配置 -->
      <div>
        <h2 class="directSeller-title">直销员奖励配置(已筛选出{{ zxy }}个直销员)</h2>
        <div class="margin-left">
          奖励方式：
          <el-radio style="margin-left: 10px;" v-model="surveyOrActivity" :label="0">每份问卷</el-radio>
          <el-radio v-model="surveyOrActivity" :label="1">每个调查活动</el-radio>
        </div>
        <div class="margin-left">
          奖励设置：
          <el-radio class="integralReward" v-model="wards" :label="1" :disabled="true">海贝奖励</el-radio>
          <el-input class="radioinput" :disabled="ba" style="margin-left: 18px" v-model="jifen" type="Number"></el-input
          >海贝
          <div class="cash">
            <el-radio v-model="wards" :label="2">现金奖励</el-radio>
            <el-input
              class="radioinput cash-count"
              :disabled="bb"
              style="margin-left: 28px"
              type="Number"
              v-model="xianjin"
            ></el-input
            >元
          </div>
          <div class="gift">
            <el-radio v-model="wards" :label="0" :disabled="true">实物礼品奖励</el-radio>
            <el-input :disabled="bc" placeholder="输入实物描述" v-model="description" style="width:300px"></el-input>
          </div>
        </div>
        <div class="ward-count margin-left">
          <span>本次奖励配置的权益成本是：</span>
          <span style="font-size: 18px;color: gray;margin: 0 5px;">{{ integralBudget }}</span>
          <span>海贝,</span>
          <span>投入预算是：</span>
          <span style="font-size: 18px;color: gray;margin: 0 5px;">{{ originalBudget }}</span>
          <span>海贝,</span>
          <span>剩余</span>
          <span style="font-size: 18px;color: gray;margin: 0 5px;">{{ remaining }}</span>
          <span>海贝,</span>
        </div>
      </div>
    </div>
    <el-button type="primary" @click="handleClickPrev">上一步</el-button>
    <el-button type="primary" @click="handleClickNext">下一步</el-button>
  </div>
</template>
<script>
import axios from 'axios';
import Qs from 'qs';

export default {
  data() {
    return {
      surveyOrActivity: 0, // 奖励方式
      wards: 2, // 奖励设置
      ba: true, // 海贝奖励是否可选
      jifen: '', // 是否选择海贝奖励
      bb: false, // 现金奖励是否可选
      bc: true, // 实物礼品奖励是否可选
      xianjin: '', // 海贝奖励预算
      description: '', // 实物奖励描述
      displayGift: false, // 是否展示礼品
      sites: [], // 礼品信息
      startPrice: '', // 礼品筛选价格下限
      endPrice: '', // 礼品筛选价格上限
      keyWords: '', // 礼品筛选字段
      giftId: [], // 选择的礼品
      originalBudget: 0, // 投入预算
      giftAmountSum: 0, // 礼品总价
      zxy: 0, // 直销员数量
      id: 0, // 问卷id
      users: 0, // 用户数量
      giftNumberSum: 0, // 礼品数量总和
      giftLoading: false, // 礼品加载中
      title: '一站式权益配置',
      loading: false // 加载中
    };
  },
  computed: {
    integralBudget() {
      if (this.surveyOrActivity == 0) {
        // 每份问卷
        return this.giftNumberSum * this.xianjin * 100 + this.giftAmountSum;
      }
      if (this.surveyOrActivity == 1) {
        // 每个活动
        return this.xianjin * this.zxy * 100 + this.giftAmountSum;
      }
    },
    remaining() {
      return this.originalBudget - this.integralBudget;
    }
  },
  methods: {
    giftSelect() {
      this.displayGift = true;
      this.giftLoading = true;
      const _this = this;
      axios({
        url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/listRecommendGift`,
        method: 'post',
        transformRequest: [
          function (data) {
            return Qs.stringify(data);
          }
        ],
        data: {
          productCategoryCodes: 'AA,AB,BA,BB,CA,DA',
          brandNames: 'haier',
          startPrice: 100,
          endPrice: 10000,
          isVirtual: '1'
        }
      })
        .then((response) => {
          if (response.data.isSuccess) {
            _this.giftLoading = false;
            _this.sites = response.data.data;
            _this.sites.forEach((e) => {
              e.count = 0;
            });
            for (let i = 0; i < _this.giftId.length; i++) {
              for (let j = 0; j < _this.sites.length; j++) {
                if (_this.giftId[i].giftId == _this.sites[j].productCode) {
                  // _this.sites[j].amount-=_this.giftId[i].giftTotal;
                  _this.sites[j].count = _this.giftId[i].giftTotal;
                }
              }
            }
          } else {
            _this.giftLoading = false;
            _this.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          _this.giftLoading = false;
          console.log(error);
        });
    },
    shaixuanClick() {
      this.giftLoading = true;
      const _this = this;
      axios({
        url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/listRecommendGiftByKeyWords`,
        method: 'post',
        transformRequest: [
          function (data) {
            return Qs.stringify(data);
          }
        ],
        headers: {
          deviceCode: 'A95ZEF1-47B5-AC90BF3'
        },
        data: {
          brandNames: 'haier', // 品牌
          keyWords: _this.keyWords, // 搜索关键词
          startPrice: _this.startPrice, // 开始价格
          endPrice: _this.endPrice, // 结束价格
          pageNo: 1, // 页号
          pageSize: 1000, // 页面大小
          isVirtual: '1' // 是否是虚拟商品，1真是物品   2虚拟物品
        }
      })
        .then((response) => {
          _this.giftLoading = false;
          if (response.data.code == '-1') {
            _this.$message({
              message: '请输入价格区间!',
              type: 'warning',
              duration: 2000
            });
          } else if (response.data.data.data == null) {
            _this.$message({
              message: '请输入礼品关键字!',
              type: 'warning',
              duration: 2000
            });
          }
          _this.sites = response.data.data.data;
          _this.sites.forEach((e) => {
            e.count = 0;
          });
          for (let i = 0; i < _this.giftId.length; i++) {
            for (let j = 0; j < _this.sites.length; j++) {
              if (_this.giftId[i].giftId == _this.sites[j].productCode) {
                // _this.sites[j].amount-=_this.giftId[i].giftTotal;
                _this.sites[j].count = _this.giftId[i].giftTotal;
              }
            }
          }
        })
        .catch((error) => {
          _this.giftLoading = false;
          console.log(error);
        });
    },
    successClick() {
      this.displayGift = false;
    },
    handleClickabc(e) {
      if (e.count <= 0) {
        this.$message({
          type: 'warning',
          message: '请输入礼品数量！'
        });
        return;
      }
      const _this = this;
      const obj = {};
      obj.imgUrl = e.photoLink;
      obj.giftId = e.productCode; // productCode
      obj.giftName = e.productName;
      obj.giftNumber = e.amount;
      obj.giftPrice = e.needScore;
      obj.onestopId = this.id;
      obj.giftTotal = this.Num;
      obj.giftRemaining = this.Num;
      obj.count = parseInt(e.count);
      obj.giftDescription = '';
      obj.onestopId = this.id;
      obj.productLink = e.productLink;

      if (this.giftId.length > 0) {
        // 是否已选礼品
        // alert('是否已选礼品')
        for (let i = 0; i < this.giftId.length; i++) {
          if (obj.giftId == this.giftId[i].giftId) {
            // 选的礼品是否有与刚选的相同
            // alert('选的礼品是否有与刚选的相同')
            if (e.amount >= obj.count) {
              // 有相同，是否数量大于库存--已选的数量加上库存
              // alert('有相同，是否数量大于库存--已选的数量加上库存')
              // e.amount=e.amount+this.giftId[i].giftTotal-obj.count;//计算新库存
              this.giftId[i].giftTotal = obj.count; // 更新选择的数量
              this.giftId[i].giftRemaining = obj.count;
              this.$message({
                message: '选择成功!',
                type: 'success',
                duration: 2000
              });
              this.giftAmountSum = 0;
              this.giftNumberSum = 0;
              this.giftId.forEach((e) => {
                _this.giftAmountSum += e.giftTotal * e.giftPrice;
                _this.giftNumberSum += e.giftTotal;
              });
              return;
            }
            // 数量大于库存
            // alert('数量大于库存')
            this.$message({
              message: '数量不足，选择失败!',
              type: 'warning',
              duration: 2000
            });
          } else {
            // 没有相同的
            // alert('没有相同的')
            if (i == this.giftId.length - 1) {
              obj.giftTotal = obj.count;
              obj.giftRemaining = obj.count;
              if (e.amount >= obj.count) {
                // 数量是否超过库存
                // alert('数量是否超过库存')
                this.giftId.push(obj); // 更新礼品单
                // e.amount-=obj.count;
                this.$message({
                  message: '选择成功!',
                  type: 'success',
                  duration: 2000
                });
                this.giftAmountSum = 0;
                this.giftNumberSum = 0;
                this.giftId.forEach((e) => {
                  _this.giftAmountSum += e.giftTotal * e.giftPrice;
                  _this.giftNumberSum += e.giftTotal;
                });
                break;
              } else {
                // 数量超过库存
                // alert('数量超过库存')
                this.$message({
                  message: '数量不足，选择失败!',
                  type: 'warning',
                  duration: 2000
                });
              }
            }
          }
        }
      } else {
        // 礼品单没有礼品，直接添加
        // alert('礼品单没有礼品，直接添加')
        obj.giftTotal = obj.count;
        obj.giftRemaining = obj.count;
        if (e.amount >= obj.count) {
          // 数量是否超过库存
          this.giftId.push(obj);
          // e.amount=e.amount-obj.count;
          this.$message({
            message: '选择成功!',
            type: 'success',
            duration: 2000
          });
        } else {
          // 没有礼品，但数量超过库存
          // alert('没有礼品，但数量超过库存')
          this.$message({
            message: '数量不足，选择失败!',
            type: 'warning',
            duration: 2000
          });
        }
      }

      this.giftAmountSum = 0;
      this.giftNumberSum = 0;
      this.giftId.forEach((e) => {
        _this.giftAmountSum += e.giftTotal * e.giftPrice;
        _this.giftNumberSum += e.giftTotal;
      });
    },
    deleteClick(index) {
      const _this = this;
      // this.sites.forEach(function(e) {
      //   if(e.productCode==_this.giftId[index].giftId){
      //     e.amount+=_this.giftId[index].giftTotal;
      //   }
      // })
      this.giftId.splice(index, 1);
      this.$message({
        message: '删除成功',
        type: 'success'
      });
      this.giftAmountSum = 0;
      this.giftNumberSum = 0;
      this.giftId.forEach((e) => {
        _this.giftAmountSum += e.giftTotal * e.giftPrice;
        _this.giftNumberSum += e.giftTotal;
      });
    },
    getSurveyContent() {
      const _this = this;
      axios({
        url: `${this.apiUrl}vipcenter/rightEdit/queryNextOrderRights`,
        method: 'post',
        transformRequest: [
          function (data) {
            return Qs.stringify(data);
          }
        ],
        headers: {
          deviceCode: 'A95ZEF1-47B5-AC90BF3'
        },
        data: { onestopId: _this.id }
      })
        .then((response) => {
          if (response.data.isSuccess) {
            _this.zxy = response.data.data[0].oneStopQuestionnaireConfigs[0].sellersCount;
            _this.users = response.data.data[0].oneStopQuestionnaireConfigs[0].userCount;
            _this.originalBudget = response.data.data[0].oneStopQuestionnaireConfigs[0].giftConfigBudget * 100;
          } else {
            _this.$message({
              type: 'warning',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleClickPrev() {
      const storage = window.localStorage;
      const storageObj = {
        users: this.users,
        displayGift: this.displayGift,
        surveyOrActivity: this.surveyOrActivity,
        wards: this.wards,
        ba: this.ba,
        bc: this.bc,
        xianjin: this.xianjin,
        description: this.descriptdisplayGiftion,
        displayGift: this.displayGift,
        sites: this.sites,
        startPrice: this.startPrice,
        endPrice: this.endPrice,
        keyWords: this.keyWords,
        giftId: this.giftId,
        originalBudget: this.originalBudget,
        giftAmountSum: this.giftAmountSum,
        zxy: this.zxy,
        // "id": this.id,
        users: this.users,
        integralBudget: this.integralBudget,
        remaining: this.remaining,
        giftNumberSum: this.giftNumberSum
      };
      const storageFive = JSON.stringify(storageObj);
      storage.setItem('storageFive', storageFive);
      this.$router.push({ path: '/dbOperate/rightsconfigrutionfour', query: { id: this.id } });
    },
    handleClickNext() {
      const _this = this;
      if (this.giftId.length < 1) {
        this.$message({
          type: 'warning',
          message: '请选择礼品！'
        });
        return;
      }
      if (this.giftNumberSum % this.zxy != 0) {
        this.$message({
          type: 'warning',
          message: '礼品数必须是直销员数的整数倍！'
        });
        return;
      }
      if (this.xianjin.length < 1) {
        this.$message({
          type: 'warning',
          message: '请设置奖励金额！'
        });
        return;
      }
      if (this.remaining < 0) {
        this.$message({
          type: 'warning',
          message: '权益成本超出投入预算，请重新配置奖励方式！'
        });
        return;
      }
      this.loading = true;
      const param = {
        giftId: this.giftId,
        id: this.id,
        rewardBudget: this.jifen,
        rewardContent: this.description,
        rewardMoney: this.xianjin,
        rewardType: this.wards,
        rewardWay: this.surveyOrActivity,
        costAmount: this.integralBudget / 100
      };
      axios
        .post(`${this.apiUrl}vipcenter/rightEdit/updateOnestopFive`, param)
        .then((response) => {
          if (response.data.isSuccess) {
            _this.loading = false;
            _this.$message({
              type: 'success',
              message: response.data.msg
            });
            const storage = window.localStorage;
            storage.removeItem('storageOne');
            storage.removeItem('storageTwo');
            storage.removeItem('storageThree');
            storage.removeItem('storageFour');
            storage.removeItem('storageFive');
            _this.$router.push({ path: '/dbOperate/rightsconfigrutionsix', query: { id: _this.id } });
          } else {
            _this.loading = false;
            _this.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          _this.loading = false;
          console.log(error);
        });
    },
    imgDescription(e) {
      // console.log(e);
      window.open(e);
    }
  },
  created() {
    this.id = this.$route.query.id;
    const storage = window.localStorage;
    if (storage.storageFive) {
      let { storageFive } = storage;
      storageFive = JSON.parse(storageFive);
      this.users = storageFive.users;
      this.displayGift = storageFive.displayGift;
      this.surveyOrActivity = storageFive.surveyOrActivity;
      this.wards = storageFive.wards;
      this.ba = storageFive.ba;
      this.bc = storageFive.bc;
      this.xianjin = storageFive.xianjin;
      this.description = storageFive.description;
      this.displayGift = storageFive.displayGift;
      this.sites = storageFive.sites;
      this.startPrice = storageFive.startPrice;
      this.endPrice = storageFive.endPrice;
      this.keyWords = storageFive.keyWords;
      this.giftId = storageFive.giftId;
      this.originalBudget = storageFive.originalBudget;
      this.giftAmountSum = storageFive.giftAmountSum;
      this.zxy = storageFive.zxy;
      this.users = storageFive.users;
      this.integralBudget = storageFive.integralBudget;
      this.remaining = storageFive.remaining;
      this.giftAmountSum = storageFive.giftAmountSum;
      this.giftNumberSum = storageFive.giftNumberSum;
    }
  },
  mounted() {
    this.getSurveyContent();
  }
};
</script>
<style scoped>
.rightsconfigrutionfive {
  padding: 20px;
}
.directSeller-title {
  font-size: 20px;
  color: #000;
  font-weight: 600;
  margin: 20px 0;
}
.margin-left {
  margin: 10px 50px;
}
.integralReward {
  margin: 20px 10px;
}
.radioinput {
  width: 200px;
  margin-right: 5px;
}
.cash,
.gift {
  margin-left: 84px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.cash-count {
  margin-left: 10px;
}
.ward-count {
  margin-top: 50px;
  margin-bottom: 20px;
}

.addgift-body {
  width: 980px;
}
.shaixuan {
  display: flex;
  width: 555px;
  padding-bottom: 10px;
  height: 46px;
  line-height: 36px;
  position: absolute;
  right: 0;
  top: 0;
}
.gift-input {
  width: 100px;
  margin-right: 5px;
  margin-left: 5px;
}
.yuan {
  margin-right: 20px;
}
.addgift-img {
  width: 60px;
  height: 60px;
}
.addgift-info {
  height: 100px;
  width: 450px;
  padding: 20px;
  display: flex;
  border: 1px solid #ccc;
  margin: 8px 10px 0 15px;
  position: relative;
  overflow: hidden;
}
.giftNumInput {
  width: 70px;
  margin-right: 5px;
}
.giftNumInput input {
  height: 30px;
  line-height: 30px;
}
.sendThis {
  background-color: #20a0ff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
}
.sendThis:hover {
  background: #4db3ff;
  border-color: #4db3ff;
  color: #fff;
}
.info {
  width: 100%;
  position: relative;
}
.info-title {
  margin-left: 20px;
  font-size: 12px;
  color: #000000;
  width: 200px;
  /*height: 18px;*/
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.info-body {
  margin-left: 20px;
  font-size: 10px;
  margin-top: 5px;
  color: #ccc;
}
.info-money {
  margin-left: 20px;
  font-size: 10px;
  margin-top: 5px;
  color: #ccc;
}
.show-gift {
  font-size: 18px;
  font-weight: 500;
}
.showgift {
  width: 980px;
  min-height: 50px;
  max-height: 500px;
  margin-top: 10px;
  overflow-y: auto;
}
.deleteGift {
  position: absolute;
  bottom: 10px;
  right: 30px;
}
.rightsconfigrutionfive .rights-config-header-box {
  margin-bottom: 30px;
}
.rightsconfigrutionfive .rights-config-step .step-title {
  width: 123px;
  background: #e2e2e2;
  z-index: 1;
  margin-top: 6px;
  color: #252525;
  margin-left: 8px;
}
.rightsconfigrutionfive .rights-config-step .step-index {
  width: 30px;
  background: #cecece;
  font-size: 12px;
  color: #252525;
  font-weight: bold;
  z-index: 2;
  text-align: center;
  line-height: 30px;
}
.rightsconfigrutionfive .rights-config-header {
  transform: skewX(-45deg);
  background: #e0f0ff;
  /*width: 1000px;*/
  width: 1133px;
  /*margin-left: -45px;*/
}
.rightsconfigrutionfive .rights-config-header .step-bg {
  width: 74px;
  margin-top: 16px;
  background: #fff;
  margin-left: 65px;
}
.rightsconfigrutionfive .vip-head-tool {
  margin-top: 30px;
}
.rightsconfigrutionfive .rights-config-step .step-title span {
  transform: skewX(45deg);
  font-size: 10px;
  display: block;
  line-height: 30px;
  text-align: center;
  padding-left: 20px;
}
.rightsconfigrutionfive .rights-config-step.setted .step-index {
  background: #196acf;
  color: #fff;
}
.rightsconfigrutionfive .rights-config-step.setted .step-title {
  background: #45a0f8;
  color: #fff;
  margin-left: 10px;
  width: 123px;
}
.rightsconfigrutionfive .rights-config-step .step-index span {
  font-size: 12px;
}
</style>
