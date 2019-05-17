<template>
  <div class="vip-content">
    <el-row>
      <el-col :span="8">
        活动名称：
        <el-input
          style="width: 60%;"
          v-model="data.activityName"
          :maxlength="20"
          placeholder="请输入活动名称"
        ></el-input>
      </el-col>
      <el-col :span="8">
        使用渠道：
        <el-select style="width: 60%;" v-model="data.channel" placeholder="请选择使用渠道">
          <el-option v-for="item in channeloptions" :key="item.id" :label="item.value" :value="item.id"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        抽奖形式：
        <el-select style="width: 60%;" v-model="data.type" placeholder="请选择抽奖形式" @change="shapechange">
          <el-option v-for="item in shapeoptions" :key="item.id" :label="item.value" :value="item.id"> </el-option>
        </el-select>
      </el-col>
    </el-row>
    <p class="template-brand" style="margin-top: 10px;">
      <i></i>奖品详情配置
      <em v-if="data.type == 2" style="font-size: 13px;"
        >备注：当选择奖品类型为“海贝积分”时“奖品名称”只能填数字。icon大小不能超过5M，尺寸为80*80</em
      >
    </p>
    <div class="lucky-box">
      <p v-if="data.type == '' || !data.type" class="lucky-noshapetext">请选择抽奖形式</p>
      <el-row v-if="data.type == 2" v-for="(item, index) in jackpot" style="margin-bottom: 15px;">
        <el-col :span="5">
          奖品名称：
          <el-input
            style="width: 150px;"
            :type="item.type"
            v-model="item.giftName"
            :maxlength="20"
            placeholder="请输入奖品名称"
          ></el-input>
        </el-col>
        <el-col :span="4">
          中奖概率：
          <el-input
            style="width: 60px;"
            :maxlength="6"
            v-model="item.probability"
            :disabled="item.disabled"
            @keyup.native="clearNoNum(item.probability, index)"
            @change="probabilitychange"
          ></el-input>
          <span style="margin-left: 10px">%</span>
        </el-col>
        <el-col :span="5">
          奖品类型：
          <el-select
            v-if="index < 8"
            style="width:150px;"
            v-model="item.giftType"
            placeholder="请选择奖品类型"
            @change="prizechange(item)"
          >
            <el-option v-for="item in prizeoptions" :key="item.id" :label="item.value" :value="item.id"> </el-option>
          </el-select>
          <el-select
            v-else
            style="width:150px;"
            v-model="item.giftType"
            placeholder="请选择奖品类型"
            @change="prizechange(item)"
          >
            <el-option v-for="item in prizeoptions2" :key="item.id" :label="item.value" :value="item.id"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          奖品兑换上限：
          <el-input
            style="width:80px;"
            :maxlength="6"
            v-model="item.giftNum"
            placeholder=""
            @keyup.native="item.giftNum = item.giftNum.replace(/\D/g, '').slice(0, 6)"
          ></el-input>
          <span style="margin-left: 5px">个</span>
        </el-col>
        <el-col :span="5">
          <el-upload
            class="upload-demo"
            :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadActivityLuckyDrawIcon'"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :on-progress="
              res => {
                return handleProgress(res, item);
              }
            "
            :on-success="
              res => {
                return handleSuccess(res, item);
              }
            "
            :on-remove="
              res => {
                return handleRemove(res, item);
              }
            "
          >
            <el-button size="small" type="primary" v-if="item.is_tu">上传icon</el-button>
          </el-upload>
          <div v-if="!item.is_tu" class="img-display">
            <i class="close iconfont icon-bohui" @click="handleRemove(1, item)"></i>
            <div class="imgbox">
              <img :src="item.icon" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <p class="template-brand" style="margin-top: 10px;">
      <i></i>活动有效期配置
      <em style="font-size: 13px;">备注：有效期可设置活动有效期内固定哪天可用（有效期内未指定的时间不可用）</em>
    </p>
    <div>
      有效期：
      <el-date-picker
        disabledDate
        v-model="time"
        :picker-options="pickerOptions0"
        type="daterange"
        placeholder="选择有效期范围"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="getTime"
      >
      </el-date-picker>
    </div>
    <div style="margin-top: 15px;">
      有效期内具体哪天可用（选填）：
      <el-radio-group v-model="data.specialDaySign" @change="dayradiochange">
        <el-radio class="radio" :label="2">
          固定每周
          <el-select :disabled="weekdis" v-model="data.specialWeekDay" placeholder="请选择">
            <el-option v-for="item in dataoptions" :key="item.id" :label="item.value" :value="item.id"> </el-option>
          </el-select>
        </el-radio>
        <el-radio class="radio" :label="3">
          固定每月
          <el-select :disabled="monthdis" v-model="data.specialMonthDay" placeholder="请选择">
            <el-option v-for="item in dayoptions" :key="item.id" :label="item.value" :value="item.id"> </el-option>
          </el-select>
        </el-radio>
      </el-radio-group>
      <el-button type="text" style="margin-left: 10px" @click="cancaldayradio">取消选择</el-button>
    </div>
    <p class="template-brand" style="margin-top: 10px;"><i></i>抽奖规则配置</p>
    <div>
      <el-radio-group v-model="data.ruleSign" @change="numradiochange">
        <el-radio class="radio" :label="2">
          每人每周期限制次数（不选则默认无限制）
          <el-button type="text" @click="rulesignclick(1)" style="margin-left: 10px">取消选择</el-button>
          <br />
          <div style="margin-top: 15px;">
            每
            <el-input
              :maxlength="6"
              :disabled="everyweekdis"
              style="width: 80px;margin:0px 10px;"
              @keyup.native="data.ruleDay = data.ruleDay.replace(/\D/g, '').slice(0, 20)"
              v-model="data.ruleDay"
            ></el-input>
            天，最多抽奖
            <el-input
              :maxlength="6"
              :disabled="everyweekdis"
              style="width: 80px;margin:0px 10px;"
              @keyup.native="data.ruleTimes = data.ruleTimes.replace(/\D/g, '').slice(0, 20)"
              v-model="data.ruleTimes"
            ></el-input>
            次
          </div>
        </el-radio>
        <el-radio style="margin-left: 180px;" class="radio" :label="3">
          每人总限制次数（不选则默认无限制）
          <el-button type="text" @click="rulesignclick(2)" style="margin-left: 10px">取消选择</el-button>
          <br />
          <div style="margin-top: 15px;">
            每人最多抽奖
            <el-input
              :maxlength="6"
              style="width: 80px;margin:0px 10px;"
              :disabled="everymenalldis"
              @keyup.native="data.totalTimes = data.totalTimes.replace(/\D/g, '').slice(0, 20)"
              v-model="data.totalTimes"
            ></el-input>
            次
          </div>
        </el-radio>
      </el-radio-group>
    </div>
    <p class="template-brand" style="margin-top: 10px;"><i></i>抽奖是否消耗积分配置</p>
    <div>
      前
      <el-input
        :maxlength="6"
        @change="conchange"
        placeholder="选填"
        style="width: 80px;margin:0px 10px;"
        v-model="data.consumeFreeTimes"
        @keyup.native="data.consumeFreeTimes = data.consumeFreeTimes.replace(/\D/g, '').slice(0, 20)"
      ></el-input>
      次抽奖不消耗积分，第
      <el-input
        :maxlength="6"
        :disabled="true"
        placeholder="选填"
        style="width: 80px;margin:0px 10px;"
        v-model="data.consumeStartTimes"
        @keyup.native="data.consumeStartTimes = data.consumeStartTimes.replace(/\D/g, '').slice(0, 20)"
      ></el-input>
      次开始，每抽奖1次消耗
      <el-input
        :maxlength="6"
        placeholder="选填"
        style="width: 80px;margin:0px 10px;"
        v-model="data.consumeScore"
        @keyup.native="data.consumeScore = data.consumeScore.replace(/\D/g, '').slice(0, 20)"
      ></el-input>
      积分（不填则默认不消耗积分）
      <el-button
        type="text"
        @click="
          data.consumeFreeTimes = '';
          data.consumeStartTimes = '';
          data.consumeScore = '';
        "
        style="margin-left: 10px"
        >取消选择
      </el-button>
    </div>
    <p class="template-brand" style="margin-top: 10px;"><i></i>适用人群配置</p>
    <div>
      <el-radio-group v-model="data.peopleType" @change="peoplechange">
        <el-radio class="radio" v-for="(item, index) in usergtoup" :label="item.id">
          {{ item.value }}
        </el-radio>
      </el-radio-group>
      <p style="margin-top: 20px">
        <el-radio
          class="radio"
          v-for="(item, index) in usergtoup2"
          v-model="data.rankType"
          :label="item.id"
          :disabled="kadis"
        >
          {{ item.value }}
        </el-radio>
        <el-button style="margin-left: 15px;" type="text" @click="data.rankType = ''">取消选择</el-button>
      </p>
      <div style="margin-top: 25px;">
        账号注册时间为近
        <el-input
          :maxlength="6"
          placeholder="选填"
          style="width: 80px;margin:0px 10px;"
          v-model="data.regTime"
          @keyup.native="data.regTime = data.regTime.replace(/\D/g, '').slice(0, 20)"
        ></el-input>
        天
        <span style="margin-left: 150px;">
          最近一次认证产品时间为近<el-input
            :maxlength="6"
            placeholder="选填"
            style="width: 80px;margin:0px 10px;"
            @keyup.native="data.authenticationTime = data.authenticationTime.replace(/\D/g, '').slice(0, 20)"
            v-model="data.authenticationTime"
          ></el-input
          >天
        </span>
        <el-button
          type="text"
          @click="
            data.regTime = '';
            data.authenticationTime = '';
          "
          style="margin-left: 10px"
          >取消选择
        </el-button>
      </div>
    </div>
    <p class="template-brand" style="margin-top: 10px;"><i></i>生成抽奖链接</p>
    <div>
      <el-radio-group v-model="data.urlBrand">
        <el-radio label="casarte" disabled>卡萨帝</el-radio>
        <el-radio label="haier">海知友</el-radio>
      </el-radio-group>
    </div>
    <p class="template-brand" style="margin-top: 10px;"><i></i>抽奖说明配置</p>
    <div>
      <ueditor
        :value="data.instruction"
        :config="config"
        v-on:input="input"
        v-on:ready="ready"
        :random="editorRandom"
      ></ueditor>
    </div>

    <div style="margin-top: 15px;display: flex;justify-content: center">
      <el-button type="primary" @click="draft" v-if="data.status == 5 || !$route.query.id">存草稿</el-button>
      <el-button type="primary" @click="$router.push({ path: '/communication/luckyactivity' })">返回</el-button>
      <el-button type="primary" @click="save">提交</el-button>
    </div>
  </div>
</template>

<script>
import gUtils from '../../utils/gUtils.js';
import ueditor from './components/ueditor.vue';

export default {
  components: {
    ueditor
  },
  data() {
    return {
      data: {
        activityName: '',
        channel: '',
        type: '',
        startTime: '',
        endTime: '',
        specialDaySign: 1,
        specialWeekDay: '',
        specialMonthDay: '',
        ruleSign: 1,
        ruleDay: '',
        ruleTimes: '',
        totalTimes: '',
        consumeFreeTimes: '',
        consumeStartTimes: '',
        consumeScore: '',
        peopleType: '',
        rankType: '',
        regTime: '',
        authenticationTime: '',
        urlBrand: 'haier',
        instruction: '',
        jackpot: {
          jackpot: ''
        }
      },
      instruction: '',
      editorRandom: Math.random(),
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 320
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      kadis: false,
      everyweekdis: true,
      everymenalldis: true,
      time: [],
      channeloptions: [
        {
          id: 2,
          value: '关注公众号'
        }
      ],
      shapeoptions: [
        {
          id: 2,
          value: '九宫格'
        }
      ],
      dataoptions: [
        {
          id: 1,
          value: '周一'
        },
        {
          id: 2,
          value: '周二'
        },
        {
          id: 3,
          value: '周三'
        },
        {
          id: 4,
          value: '周四'
        },
        {
          id: 5,
          value: '周五'
        },
        {
          id: 6,
          value: '周六'
        },
        {
          id: 7,
          value: '周天'
        }
      ],
      prizeoptions: [
        {
          id: 3,
          value: '海贝积分'
        }
      ],
      prizeoptions2: [
        {
          id: 1,
          value: '未中奖'
        },
        {
          id: 3,
          value: '海贝积分'
        }
      ],
      usergtoup: [
        {
          id: 1,
          value: '全部用户'
        },
        {
          id: 2,
          value: '已认证产品的用户'
        },
        {
          id: 3,
          value: '未认证产品的用户'
        },
        {
          id: 4,
          value: '首次认证产品的用户'
        },
        {
          id: 5,
          value: '通过订单上网认证的用户'
        }
      ],
      usergtoup2: [
        {
          id: 6,
          value: '金卡'
        },
        {
          id: 7,
          value: '银卡'
        },
        {
          id: 8,
          value: '普卡'
        }
      ],
      weekdis: true,
      monthdis: true,
      dayoptions: [],
      jackpot: []
    };
  },
  created(e) {
    const _this = this;
    for (let i = 1; i < 32; i++) {
      _this.dayoptions.push({
        id: i,
        value: `${i}号`
      });
    }
    for (let i = 0; i < 9; i++) {
      this.jackpot.push({
        giftName: '',
        probability: '',
        giftType: '',
        giftNum: '',
        icon: '',
        type: '',
        is_tu: true,
        disabled: false
      });
    }
    this.jackpot[8].giftType = 1;
    this.jackpot[8].disabled = true;

    if (this.$route.query.id) {
      const _this = this;
      const data = {
        id: this.$route.query.id
      };
      this.requestActivity.getLuckyDetails(data).then((data) => {
        if (data.isSuccess) {
          data.data.jackpot = JSON.parse(data.data.jackpot);
          data.data.jackpot.jackpot.forEach((el) => {
            if (el.giftType == 3) {
              el.type = 'number';
            } else {
              el.type = 'string';
            }
            if (el.icon != '') {
              el.is_tu = false;
            } else {
              el.is_tu = true;
            }
            el.disabled = false;
          });
          data.data.jackpot.jackpot[8].disabled = true;
          _this.jackpot = data.data.jackpot.jackpot;

          if (data.data.startTime) {
            _this.time.push(new Date(data.data.startTime));
            _this.time.push(new Date(data.data.endTime));
          }

          _this.instruction = data.data.instruction;
          _this.data = data.data;
        }
      });
    }
  },
  methods: {
    clearNoNum(obj, index) {
      obj = obj.toString();
      obj = obj.replace(/[^\d.]/g, ''); // 清除“数字”和“.”以外的字符
      obj = obj.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
      obj = obj
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.');
      // obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
      if (obj.indexOf('.') != -1 && obj.split('.')[1].length >= 3) {
        obj = `${obj.split('.')[0]}.${obj.split('.')[1].substr(0, 3)}`;
      }
      if (obj.indexOf('.') < 0 && obj != '') {
        // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        obj = parseFloat(obj);
      }
      this.jackpot[index].probability = obj;

      const a = 1.1;
      const _this = this;
      let allnum = 0;
      if (
        this.jackpot[0].probability != ''
        && this.jackpot[1].probability != ''
        && this.jackpot[2].probability != ''
        && this.jackpot[3].probability != ''
        && this.jackpot[4].probability != ''
        && this.jackpot[5].probability != ''
        && this.jackpot[6].probability != ''
        && this.jackpot[7].probability != ''
      ) {
        let gonum = 0;
        for (let i = 0; i < 8; i++) {
          gonum += parseFloat(_this.jackpot[i].probability);
        }
        _this.jackpot[8].probability = (100 - gonum).toFixed(3);
        if (_this.jackpot[8].probability < 0) {
          _this.jackpot[8].probability = 0;
        }
      }
      this.jackpot.forEach((el, i) => {
        if (el.probability != '') {
          allnum += parseFloat(el.probability);
        }
        if (allnum > 100) {
          _this.$message({
            message: '中奖概率大于100%',
            type: 'warning'
          });
        }
      });
    },
    beforeAvatarUpload(file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 <= 1024 * 5;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5M!');
      }

      if (!isImg) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }

      return isImg && isLt2M;
    },
    handleProgress(res, e) {
      e.is_tu = false;
    },
    handleRemove(res, e) {
      e.icon = '';
      e.is_tu = true;
    },
    handleSuccess(res, e) {
      if (res.isSuccess) {
        e.icon = res.data.wechatRightsCardImageUrl;
        e.is_tu = false;
      } else {
        e.is_tu = true;
        this.$message({
          message: res.msg,
          type: 'warning'
        });
      }
    },
    shapechange(e) {},
    isRealNum(val) {
      if (!isNaN(val)) {
        return true;
      }
      return false;
    },
    prizechange(e) {
      e.type = 'string';
      if (e.giftType == 3) {
        if (!this.isRealNum(e.giftName)) {
          this.$message({
            message: '当选择为海贝积分时，商品名称应为数字',
            type: 'warning'
          });
          e.giftName = '';
        }
        e.type = 'number';
      }
    },
    probabilitychange(e) {},
    getTime(data) {
      let range = data;
      if (!range) {
        range = ['', ''];
      }
      [this.data.startTime, this.data.endTime] = range;
    },
    dayradiochange(e) {
      if (e == 2) {
        this.weekdis = false;
        this.monthdis = true;
        this.data.specialMonthDay = '';
      } else if (e == 3) {
        this.weekdis = true;
        this.monthdis = false;
        this.data.specialWeekDay = '';
      } else {
        this.weekdis = true;
        this.monthdis = true;
      }
    },
    cancaldayradio() {
      this.data.specialWeekDay = '';
      this.data.specialMonthDay = '';
      this.data.specialDaySign = 1;
    },
    numradiochange(e) {
      if (e == 1) {
        this.everyweekdis = true;
        this.everymenalldis = true;
        this.data.ruleDay = '';
        this.data.ruleTimes = '';
        this.data.totalTimes = '';
      } else if (e == 2) {
        this.everyweekdis = false;
        this.everymenalldis = true;
        this.data.totalTimes = '';
      } else if (e == 3) {
        this.everyweekdis = true;
        this.everymenalldis = false;
        this.data.ruleDay = '';
        this.data.ruleTimes = '';
      }
    },
    save() {
      const _this = this;
      this.editorRandom = Math.random();
      setTimeout(() => {
        const data = JSON.parse(JSON.stringify(_this.data));
        data.instruction = _this.instruction;
        const jackpot = JSON.parse(JSON.stringify(_this.jackpot));
        if (jackpot != '') {
          jackpot.forEach((el) => {
            delete el.type;
            delete el.is_tu;
            delete el.disabled;
          });
        }
        data.jackpot.jackpot = jackpot;
        data.jackpot = JSON.stringify(data.jackpot);
        if (_this.$route.query.id) {
          // 修改
          data.id = _this.$route.query.id;
          _this.requestActivity.updateLuckyDetails(data).then((data) => {
            if (data.isSuccess) {
              _this.$router.push({
                path: '/communication/luckyactivity'
              });
            }
          });
        } else {
          // 新增
          _this.requestActivity.saveLuckyDetails(data).then((data) => {
            if (data.isSuccess) {
              _this.$router.push({
                path: '/communication/luckyactivity'
              });
            }
          });
        }
      }, 500);
    },
    rulesignclick(e) {
      if (this.data.ruleSign == 2 && e == 1) {
        this.data.ruleSign = 1;
      } else if (this.data.ruleSign == 3 && e == 2) {
        this.data.ruleSign = 1;
      }
    },
    conchange(item) {
      if (item != '') {
        this.data.consumeStartTimes = parseInt(item) + 1;
      } else {
        this.data.consumeStartTimes = '';
      }
    },
    input(content) {
      this.instruction = content.content;
    },
    ready() {},
    peoplechange(e) {
      if (e == 1 || e == 3) {
        this.kadis = true;
        this.data.rankType = '';
      } else {
        this.kadis = false;
      }
    },
    draft() {
      const _this = this;
      this.editorRandom = Math.random();
      setTimeout(() => {
        const data = JSON.parse(JSON.stringify(_this.data));
        data.instruction = _this.instruction;
        const jackpot = JSON.parse(JSON.stringify(_this.jackpot));
        jackpot.forEach((el) => {
          delete el.type;
          delete el.is_tu;
          delete el.disabled;
        });
        data.jackpot.jackpot = jackpot;
        data.jackpot = JSON.stringify(data.jackpot);
        _this.requestActivity.draftLuckyDetails(data).then((data) => {
          if (data.isSuccess) {
            _this.$router.push({
              path: '/communication/luckyactivity'
            });
          }
        });
      }, 500);
    }
  }
};
</script>

<style scoped>
.lucky-details {
  display: flex;
  justify-content: flex-start;
}

.lucky-details p {
  margin-left: 30px;
}

.lucky-details p:first-child {
  margin-left: 0px;
}

.lucky-noshapetext {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
  font-size: 20px;
  border: 1px dashed #ccc;
}

.img-display {
  position: relative;
  height: 40px;
  width: 100px;
  border: 1px solid #fff;
}

.img-display .close {
  border-radius: 19px;
  display: block;
  color: #45a0f8;
  position: absolute;
  right: -12px;
  top: -11px;
  font-size: 22px;
  line-height: 20px;
  display: none;
  z-index: 9;
}

.img-display:hover .close {
  display: block;
}

.img-display:hover {
  border-color: #45a0f8;
}

.imgbox {
  text-align: center;
  width: 100%;
  height: 100%;
}

.imgbox img {
  width: 100%;
  height: 100%;
}

.upload-demo {
  height: 0px;
}
</style>
<style>
.lucky-box .el-upload-list__item {
  margin-top: 0px !important;
  margin-right: 0px;
}
</style>
