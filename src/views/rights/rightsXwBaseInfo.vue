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
        <div class="rights-config-step" style="margin-left:242px">
          <div class="step-index"><span>2</span></div>
          <div class="step-title"><span>活动范围配置</span></div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:449px">
          <div class="step-index"><span>3</span></div>
          <div class="step-title"><span>赠送礼品配置</span></div>
          <div class="step-bg"></div>
        </div>
      </div>
      <div class="save-draft" style="display:none;">
        <span>有急事？先</span>
        <a href="javascript:;" @click="next('temporary')">存草稿</a>
        <span>回来继续配置</span>
      </div>
    </div>
    <div style="width: 898px; margin: auto;">
      <div class="config-form">
        <div class="config-form-header">
          <span>基础信息配置</span>
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="权益活动名称" prop="rightName">
            <el-input style="width: 544px" v-model="form.rightName" :maxlength="15" :disabled="isXw"></el-input>
          </el-form-item>
          <el-form-item label="活动有效期" prop="" class="required">
            <el-date-picker
              v-model="form.startTime"
              type="date"
              placeholder="选择日期范围"
              :picker-options="pickerOptions"
              :disabled="isXw"
            >
            </el-date-picker
            ><!--:disabled="edit"-->
            <span>-</span>
            <el-date-picker
              v-model="form.endTime"
              v-if="!notime"
              :disabled="isXw"
              type="date"
              placeholder="选择日期范围"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <el-date-picker
              v-model="notimeData"
              v-if="notime"
              :disabled="isXw"
              type="text"
              placeholder="选择日期范围"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <el-checkbox v-model="form.dateSign" v-if="!isXw" :true-label="2" :false-label="1"
              >不限结束时间</el-checkbox
            >
          </el-form-item>
          <el-form-item label="礼品兑换有效期" prop="" class="required">
            <el-date-picker
              v-model="form.startTime"
              :disabled="true"
              type="date"
              placeholder="选择日期范围"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <span>-</span>
            <el-date-picker
              v-model="form.exchangeEndTime"
              v-if="!notime"
              :disabled="isXw"
              type="date"
              placeholder="选择日期范围"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <el-date-picker
              v-model="notimeData"
              v-if="notime"
              :disabled="isXw"
              type="text"
              placeholder="选择日期范围"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <span style="color:#ff4949;font-size:12px;">超出权益兑换时间未兑换，权益自动失效</span>
          </el-form-item>
          <el-form-item label="投入预算" prop="budgetAmount">
            <el-input
              style="width: 200px;margin-right:6px;"
              :disabled="isXw"
              v-model="form.budgetAmount"
              @keyup.native="inputEntry(form.budgetAmount)"
              placeholder="输入预算金额"
            ></el-input>
            <span>元</span>
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
      title: '配置单品权益',
      isXw: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      notime: false,
      notimeData: '',
      form: {
        rightName: '', // 权益名称
        startTime: '', // 权益开始时间
        endTime: '', // 权益结束时间
        exchangeStartTime: '', // 权益兑换开始时间
        exchangeEndTime: '', // 权益兑换结束时间
        budgetAmount: '', // 预算金额
        auditPics: '', // 权益审计报告图片
        dateSign: 1, // 权益时间标记 当权益不限结束时间时传2 正常情况传1 ,
        step: 1,
        rightBigType: 1,
        rightSmallType: 1,
        crTime: ''
      },

      rules: {
        rightName: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入权益活动名称',
            trigger: 'blur'
          }
        ],
        budgetAmount: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入投入预算',
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
    handleAvatarSuccess(res, file) {
      if (res.isSuccess && this.imageUrl.length < 3) {
        this.imageUrl.push(res.data.orderRightsImageUrl);
      }
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 <= 1024 * 15;

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 15M!');
      }

      if (!isImg) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }

      return isImg && isLt2M;
    },
    removeImg(index) {
      this.imageUrl.splice(index, 1);
    },
    // //      deleteImg:function(){
    // //          alert(this.imageUrl);
    // //      },
    //       handleRemove(file, fileList) {
    //           console.log(file, fileList);
    //       },
    //       handlePictureCardPreview(file) {
    //           this.dialogImageUrl = file.url;
    //           this.dialogVisible = true;
    //       },
    //       handleExceed(files, fileList) {
    //           this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    //       },
    //       beforeRemove(file, fileList) {
    //           return this.$confirm(`确定移除 ${ file.name }？`);
    //       },
    // 输入校验
    inputEntry(data) {
      // console.log(data)
      data += '';
      // data = data.replace(/(?!^0*(\.0{1,2})?$)^\d{1,13}(\.\d{1,2})?$/,'')
      data = data.replace(/[^\d.]/g, '');

      const dataArr = data.split('.');
      if (dataArr[1]) {
        dataArr[1] = dataArr[1].substring(0, 2);
        data = `${dataArr[0]}.${dataArr[1]}`;
      }
      this.form.budgetAmount = data;
    },
    // 下一步
    next(temporary) {
      const _this = this;
      _this.form.exchangeStartTime = _this.form.startTime;
      if (_this.form.rightName == '') {
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
      if (_this.form.exchangeStartTime == '') {
        this.$message({
          type: 'warning',
          message: '请选择礼品兑换开始日期'
        });
        return;
      }
      if (_this.form.exchangeEndTime == '') {
        if (_this.form.dateSign == '1') {
          this.$message({
            type: 'warning',
            message: '请选择礼品兑换结束日期'
          });
          return;
        }
      }
      if (_this.imageUrl == '') {
        this.$message({
          type: 'warning',
          message: '请上传预算审批报告'
        });
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form));

          data.startTime = data.startTime != '' ? gUtils.dateFormat(Date.parse(data.startTime), 'yyyy-MM-dd') : '';
          data.endTime = data.endTime != '' ? gUtils.dateFormat(Date.parse(data.endTime), 'yyyy-MM-dd') : '';
          data.exchangeStartTime = data.exchangeStartTime != '' ? gUtils.dateFormat(Date.parse(data.exchangeStartTime), 'yyyy-MM-dd') : '';
          data.exchangeEndTime = data.exchangeEndTime != '' ? gUtils.dateFormat(Date.parse(data.exchangeEndTime), 'yyyy-MM-dd') : '';

          // console.log(temporary);
          data.auditPics = this.imageUrl.join('|');
          if (temporary == 'temporary') {
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
            this.requestRights.saveXwNextOrderRights(data).then((data) => {
              self.saveing = false;
              if (data) {
                _this.$router.push({
                  path: '/strategy/rightsxwrange',
                  query: { id: _this.$route.query.id }
                });
              }
            });
          }
        }
      });
    },
    // 获取账户剩余金额
    getRemainAmount() {
      const self = this;
      this.requestRights.getRemainAmount().then((data) => {
        if (data) {
          self.remainAmountLoading = false;
          const keyHaier = '海尔';
          self.remainAmount.remainHaier = data[keyHaier];
          if (self.remainAmount.remainHaier == 'null') {
            self.remainAmount.remainHaier = '暂未获取';
          }
          const keyCasarte = '卡萨帝';
          self.remainAmount.remainCasarte = data[keyCasarte];
          if (self.remainAmount.remainCasarte == 'null') {
            self.remainAmount.remainCasarte = '暂未获取';
          }
        } else {
          self.remainAmountLoading = true;
        }
      });
    },
    // 获取详情
    getOrderRightsById(id) {
      const _this = this;
      const params = {
        id
      };
      this.requestRights.getOrderRightsById(params).then((data) => {
        if (data) {
          _this.form.id = data.id;
          _this.form.channelType = data.channelType || 1;
          _this.form.rightBigType = data.rightBigType;
          _this.form.rightSmallType = data.rightSmallType;
          // _this.edit = true;
          _this.form.crTime = data.crTime;

          _this.rightBrandName = data.rightBrandName;
          _this.productCategoryCode = data.productCategoryCode;

          _this.productCategoryLength = data.productCategoryName ? data.productCategoryName.split(',').length : '';

          _this.form.rightName = data.rightName; // 权益名称
          _this.form.startTime = data.startTime.substring(0, 10); // 权益开始时间
          _this.form.exchangeStartTime = data.exchangeStartTime.substring(0, 10); // 权益兑换开始时间
          _this.form.budgetAmount = data.budgetAmount; // 预算金额
          //   auditPics: '', //权益审计报告图片
          //   dateSign: 1, // 权益时间标记 当权益不限结束时间时传2 正常情况传1 ,

          _this.imageUrl = data.auditPics.split('|');

          if (data.endTime.indexOf('2099') == 0) {
            _this.form.dateSign = 2;
            _this.notime = true;
            _this.notimeData = '不限结束时间';
          } else {
            _this.form.exchangeEndTime = data.exchangeEndTime.substring(0, 10); // 权益兑换结束时间
            _this.form.endTime = data.endTime.substring(0, 10); // 权益结束时间
            _this.notime = false;
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

    if (this.$route.query.id && this.$route.query.rightSmallType == 1) {
      this.title = '配置单品权益';
    } else if (this.$route.query.id && this.$route.query.rightSmallType == 2) {
      this.title = '配置套购权益';
    } else if (!this.$route.query.id && this.$route.query.rightSmallType == 1) {
      this.title = '配置单品权益';
    } else if (!this.$route.query.id && this.$route.query.rightSmallType == 2) {
      this.title = '配置套购权益';
    }
    this.getRemainAmount();
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
