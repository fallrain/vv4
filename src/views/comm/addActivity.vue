<template>
  <div>
    <div class="step-line">
      <el-steps :active="0" finish-status="success" align-center center>
        <el-step v-if="!isEdit" title="创建活动"></el-step>
        <el-step v-if="isEdit" title="修改活动"></el-step>
        <el-step title="选择会员"></el-step>
        <el-step title="选择沟通渠道"></el-step>
        <el-step title="选择通知客服"></el-step>
        <el-step title="活动创建完成"></el-step>
      </el-steps>
    </div>
    <div class="vip-content msg-template">
      <p class="template-brand">
        <i></i>{{ title }}
        <a href="javascript:;" class="color-link fr" @click="goback">
          <i class="iconfont icon-chevron-copy-copy"></i>返回</a
        >
      </p>
      <el-form ref="form" :model="form" :rules="rules" label-width="170px">
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="form.activityName" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="活动描述" prop="activityDesc">
          <el-input type="textarea" v-model="form.activityDesc"></el-input>
        </el-form-item>
        <el-form-item label="沟通次数">
          <el-radio class="radio" v-model="form.fixNum" label="1">仅发送一次</el-radio>
          <el-radio class="radio" v-model="form.fixNum" label="-1">每天</el-radio>
          <div v-if="form.fixNum == 1">
            <el-date-picker
              v-model="form.fixCommunicationTime"
              :picker-options="pickerOptions0"
              type="datetime"
              placeholder="选择日期时间"
              :editable="false"
            >
            </el-date-picker>
            <!-- <el-radio class="radio" v-model="form.fixCommunicationType" label="1">仅发送一次</el-radio> -->
            <!-- <el-radio class="radio" v-model="form.fixCommunicationType" label="2">每年这个时间发送</el-radio> -->
          </div>
          <div v-if="form.fixNum == -1">
            <span>每天</span>
            <el-time-select
              v-model="form.unSetCommunicationTime"
              :picker-options="{ start: '08:30', step: '00:15', end: '18:30' }"
              placeholder="选择时间"
              :editable="false"
            >
            </el-time-select>
            <span>开始沟通</span>
          </div>
        </el-form-item>
        <el-form-item
          v-if="
            jurisdiction['marketingOperations:activityManager:save'] ||
              jurisdiction['marketingOperations:activityManager:edit']
          "
        >
          <el-button type="primary" @click="nextStep">下一步</el-button>
          <el-button type="primary" :loading="saveing" @click="siteMsgAdd">保存</el-button>
        </el-form-item>
      </el-form>
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
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      isEdit: false,
      title: '创建活动',
      saveing: false,
      value1: '',
      form: {
        activityName: '', // 活动名称
        activityDesc: '', // 活动描述
        fixNum: '1',
        fixCommunicationType: '1',
        fixCommunicationTime: '',
        unSetCommunicationTime: ''
      },
      pushappArr: [
        {
          name: '海尔官网',
          value: 'haier',
          selected: false
        },
        {
          name: '卡萨帝官网',
          value: 'casarte',
          selected: false
        }
      ],
      app: {
        name: '',
        url: ''
      },
      rules: {
        activityName: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入活动名称',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '长度不可超过30个字符',
            trigger: 'blur'
          }
        ],
        activityDesc: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入活动描述',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '长度不可超过200个字符',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    nextStep(id) {
      const self = this;

      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form));

          data.fixCommunicationTime = data.fixCommunicationTime
            ? gUtils.dateFormat(Date.parse(data.fixCommunicationTime), 'yyyy-MM-dd HH:mm:ss')
            : '';

          if (data.fixNum == 1) {
            data.unSetCommunicationTime = '';
            if (data.fixCommunicationTime == '') {
              self.$message({
                type: 'warning',
                message: '请选择沟通时间!'
              });
              return false;
            }
          } else {
            data.fixCommunicationTime = '';
            data.unSetCommunicationTime = data.unSetCommunicationTime ? `${data.unSetCommunicationTime}:00` : '';
            if (data.unSetCommunicationTime == '') {
              self.$message({
                type: 'warning',
                message: '请选择沟通时间!'
              });
              return false;
            }
          }

          if (this.$route.query.id) {
            // 活动修改
            data.id = this.$route.query.id;
            this.requestCare.updateActivity(data).then((data) => {
              if (data) {
                self.$router.push({
                  path: '/activity/activityFlow',
                  query: {
                    id: self.$route.query.id,
                    fixNum: self.form.fixNum
                  }
                });
              }
            });
          } else {
            // 活动新增
            this.requestCare.addActivity(data).then((data) => {
              if (data.id) {
                self.$router.push({
                  path: '/activity/activityFlow',
                  query: {
                    id: data.id,
                    fixNum: self.form.fixNum
                  }
                });
              }
            });
          }
        }
      });
    },
    goback() {
      history.go(-1);
    },
    siteMsgAdd() {
      const self = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form));

          data.fixCommunicationTime = data.fixCommunicationTime
            ? gUtils.dateFormat(Date.parse(data.fixCommunicationTime), 'yyyy-MM-dd HH:mm:ss')
            : '';

          if (data.fixNum == 1) {
            data.unSetCommunicationTime = '';
            if (data.fixCommunicationTime == '') {
              self.$message({
                type: 'warning',
                message: '请选择沟通时间!'
              });
              return false;
            }
          } else {
            data.fixCommunicationTime = '';
            data.unSetCommunicationTime = data.unSetCommunicationTime ? `${data.unSetCommunicationTime}:00` : '';
            if (data.unSetCommunicationTime == '') {
              self.$message({
                type: 'warning',
                message: '请选择沟通时间!'
              });
              return false;
            }
          }

          self.saveing = true;
          if (this.$route.query.id) {
            data.id = this.$route.query.id;
            this.requestCare.updateActivity(data).then((data) => {
              self.saveing = false;
              if (data) {
                self.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                self.$router.push({
                  path: '/communication/activity',
                  query: {
                    id: self.$route.query.id
                  }
                });
              }
            });
          } else {
            this.requestCare.addActivity(data).then((data) => {
              self.$message({
                type: 'success',
                message: '保存成功!'
              });
              self.saveing = false;
              self.$router.push({
                path: '/care/activity'
              });
            });
          }
        }
      });
    },
    siteMsgGet() {
      const self = this;
      if (self.$route.query.id) {
        this.requestCare
          .getActivity({
            id: self.$route.query.id
          })
          .then((data) => {
            self.form = {
              activityName: data.activityName, // 活动名称
              activityDesc: data.activityDesc, // 活动描述
              fixNum: `${data.fixNum}`,
              fixCommunicationType: data.fixCommunicationType ? `${data.fixCommunicationType}` : '1',
              fixCommunicationTime: data.fixCommunicationTime
                ? new Date(data.fixCommunicationTime.replace(/\-/g, '/'))
                : '',
              unSetCommunicationTime: data.unSetCommunicationTime ? data.unSetCommunicationTime.substring(0, 5) : ''
            };
          });
      } else {
        this.form = {
          activityName: '', // 活动名称
          activityDesc: '', // 活动描述
          fixNum: '1',
          fixCommunicationType: '1',
          fixCommunicationTime: '',
          unSetCommunicationTime: ''
        };
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    this.isEdit = this.$route.query.id;
    this.siteMsgGet();
    if (this.$route.query.id) {
      this.title = '修改活动';
    }
  }
};
</script>
<style scoped>
.step-line {
  width: 100%;
}
</style>
