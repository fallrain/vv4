<template>
  <div class="vip-content" style="min-width:1230px;">
    <div class="rights-config-header-box">
      <div class="rights-config-header">
        <div class="header-title">
          <span>{{ title }}</span>
        </div>
        <div class="rights-config-step setted" style="margin-left:35px">
          <div class="step-index">
            <span>1</span>
          </div>
          <div class="step-title">
            <span>基础信息配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:242px">
          <div class="step-index">
            <span>2</span>
          </div>
          <div class="step-title">
            <span>发放范围配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:449px">
          <div class="step-index">
            <span>3</span>
          </div>
          <div class="step-title">
            <span>发放规则配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
      </div>
    </div>
    <div style="width: 898px; margin: auto;">
      <div class="config-form">
        <div class="config-form-header">
          <span>基础信息配置</span>
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="权益活动名称" prop="name">
            <el-input
              style="width: 544px"
              v-model="form.name"
              :maxlength="15"
              placeholder="输入权益活动名称  例：空调免费清洗券"
            ></el-input>
          </el-form-item>
          <el-form-item label="权益类型" prop="" class="required">
            <el-select
              v-model="form.buildCardType"
              placeholder="请选择权益类型"
              style="width: 200px;"
              @change="typeChange"
            >
              <el-option v-for="item in typeoptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权益券" prop="" class="required">
            <el-select v-model="form.typeId" placeholder="请选择权益券" style="width: 200px;" @change="typeChange">
              <el-option v-for="item in stateoptions" :key="item.id" :label="item.value" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动有效期" prop="" class="required">
            <el-date-picker
              v-model="form.startTime"
              type="date"
              placeholder="选择日期范围"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <!--:disabled="edit"-->
            <span>-</span>
            <el-date-picker
              v-model="form.endTime"
              type="date"
              placeholder="选择日期范围"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <el-checkbox v-model="form.dateSign" :true-label="2" :false-label="1">不限结束时间</el-checkbox>
          </el-form-item>
          <el-form-item label="权益总量" prop="num">
            <el-input
              style="width: 200px;margin-right:6px;"
              :maxlength="8"
              v-model="form.num"
              @keyup.native="form.num = form.num.replace(/\D/g, '').slice(0, 8)"
              @change="numChange"
              placeholder="输入权益总量"
            ></el-input>
          </el-form-item>
          <el-form-item label="投入预算" prop="budgetAmount">
            <span style="color: rgb(238, 88, 81);font-size: 16px;">{{ budgetAmount }}</span>
            <!--<el-input style="width: 200px;margin-right:6px;" v-model="form.budgetAmount" @keyup.native="inputEntry(form.budgetAmount,1)"-->
            <!--placeholder="输入预算金额"></el-input>-->
            <span> （元）</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="trs-btn" style="width:109px;margin-top:14px;" @click="next"
              >下一步</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import gUtils from '../../utils/gUtils.js';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };
    return {
      stateoptions: [],
      typeoptions: [],
      title: '直销员经营权益配置',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      form: {
        name: '', // 权益名称
        buildCardType: '',
        typeId: '', // 权益类型id
        startTime: '', // 权益开始时间
        endTime: '', // 权益结束时间
        dateSign: 1, // 是否为不限结束时间1-有结束时间 2-不限结束时间
        num: '', // 权益总量
        step: 1,
        price: 1 // 一会儿去掉
      },
      budgetAmount: '',
      rules: {
        name: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入权益活动名称',
            trigger: 'blur'
          }
        ],
        num: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入权益总量',
            trigger: 'blur'
          }
        ]
      },
      imageUrl: [],
      dialogImageUrl: '',
      dialogVisible: false,
      // edit:false,
      remainAmountLoading: true,
      remainAmount: [
        {
          remainHaier: ''
        },
        {
          remainCasarte: ''
        }
      ]
    };
  },
  methods: {
    typeChange(e) {
      if (this.form.num) {
        this.calculateAmount();
      }
    },
    numChange(e) {
      const _this = this;
      const re = /^[0-9]+$/;
      if (re.test(e) && _this.form.typeId) {
        _this.calculateAmount();
      }
      if (e == '') {
        _this.budgetAmount = 0;
      }
    },
    calculateAmount() {
      const _this = this;
      const data = {
        id: this.form.typeId,
        num: this.form.num
      };
      this.requestManagement.calculateAmount(data).then((data) => {
        if (data.isSuccess) {
          _this.budgetAmount = data.data;
        }
      });
    },
    // 输入校验
    inputEntry(data, e) {
      data += '';
      data = data.replace(/[^\d.]/g, '');

      const dataArr = data.split('.');
      if (dataArr[1]) {
        dataArr[1] = dataArr[1].substring(0, 2);
        data = `${dataArr[0]}.${dataArr[1]}`;
      }
      if (e == 1) {
        this.form.budgetAmount = data;
      }
      if (e == 2) {
        this.form.num = data;
      }
    },
    // 下一步
    next() {
      const _this = this;
      if (_this.form.name == '') {
        this.$message({
          type: 'warning',
          message: '请输入权益活动名称'
        });
        return;
      }
      if (_this.form.startTime == '') {
        this.$message({
          type: 'warning',
          message: '请选择活动开始日期'
        });
        return;
      }
      if (_this.form.budgetAmount == '0') {
        this.$message({
          type: 'warning',
          message: '预算不能为0'
        });
        return;
      }
      if (_this.form.endTime == '') {
        if (_this.form.dateSign == '1') {
          this.$message({
            type: 'warning',
            message: '请选择活动结束日期'
          });
          return;
        }
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form));

          data.startTime = data.startTime != '' ? gUtils.dateFormat(Date.parse(data.startTime), 'yyyy-MM-dd') : '';
          data.endTime = data.endTime != '' ? gUtils.dateFormat(Date.parse(data.endTime), 'yyyy-MM-dd') : '';

          this.requestManagement.saveupdateVipUserManageConfig(data).then((data) => {
            if (data.isSuccess) {
              _this.$router.push({
                path: '/management/rightsgrantrange',
                query: {
                  id: data.data
                }
              });
            }
          });
        }
      });
    },
    // 获取详情
    getOrderRightsById(id) {
      const _this = this;
      const params = {
        id
      };
      this.requestManagement.getVipUserManageConfigVOById(params).then((data) => {
        if (data.isSuccess) {
          _this.form.id = data.data.id;
          _this.form.name = data.data.name;
          _this.form.startTime = data.data.startTime.substring(0, 10); // 权益开始时间
          _this.form.budgetAmount = data.data.budgetAmount;
          _this.form.num = data.data.num;
          _this.form.typeId = data.data.typeId;
          _this.form.buildCardType = data.data.buildCardType;
          if (data.data.endTime.indexOf('2099') == 0) {
            _this.form.dateSign = 2;
          } else {
            _this.form.endTime = data.data.endTime.substring(0, 10); // 权益结束时间
          }
        }
      });
    },
    // 权益类型
    listOnExecuteCardType() {
      const _this = this;
      this.requestManagement.listOnExecuteCardType().then((data) => {
        if (data.isSuccess) {
          if (data.data) {
            data.data.forEach((el) => {
              _this.stateoptions.push({
                id: el.id,
                value: el.name,
                price: el.price
              });
            });
          }
        }
      });
    },
    getBuildCardType() {
      const _this = this;
      this.requestManagement.getBuildCardType().then((data) => {
        if (data.isSuccess) {
          if (data.data) {
            for (const i in data.data) {
              data.data[i].id = parseInt(data.data[i].id);
            }
            _this.typeoptions = data.data;
          }
        }
      });
    }
  },
  mounted() {
    this.form.rightSmallType = this.$route.query.rightSmallType;
    if (this.$route.query.id) {
      this.getOrderRightsById(this.$route.query.id);
    }
    this.listOnExecuteCardType();
    this.getBuildCardType();
  }
};
</script>
<style scoped>
.config-form {
  max-height: 514px;
  position: absolute;
  top: 20px;
  bottom: 20px;
  overflow: auto;
}

.config-form .trs-btn {
  margin-left: 159px;
}
</style>
<style>
.config-form .el-form-item .el-form-item__error {
  margin-left: 158px;
}

.required .el-form-item__label:before {
  content: '*';
  color: #ff4949;
  margin-right: 4px;
}

.img-display {
  position: relative;
}

.el-upload--picture-card {
  width: 148px !important;
}

.img-list .img-display .close {
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

.img-list .img-display:hover .close {
  display: block;
}

.img-list .img-display:hover {
  border-color: #45a0f8;
}

.config-form .img-display div.imgbox {
  text-align: center;
}
</style>
