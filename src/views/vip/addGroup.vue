<template>
  <div class="vip-content msg-template">
    <p class="template-brand">
      <i></i>{{ title
      }}<a href="javascript:;" class="color-link fr" @click="goback"
        ><i class="iconfont icon-chevron-copy-copy"></i>返回</a
      >
    </p>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="分组名称" prop="groupName">
        <el-input v-model="form.groupName" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="分组描述" prop="groupDesc">
        <el-input type="textarea" v-model="form.groupDesc"></el-input>
      </el-form-item>
      <el-form-item label="生效时间">
        <el-date-picker v-model="form.dateRange[0]" type="date" placeholder="选择日期范围" :editable="false">
        </el-date-picker>
        <span>—</span>
        <el-date-picker v-model="form.dateRange[1]" type="date" placeholder="选择日期范围" :editable="false">
        </el-date-picker>

        <div style="margin-top: 20px;">
          <el-radio class="radio" v-model="form.isOnline" :label="1" :disabled="isEdit">线上用户</el-radio>
          <el-radio class="radio" v-model="form.isOnline" :label="2" :disabled="isEdit">线下用户</el-radio>
        </div>
      </el-form-item>
      <el-form-item
        v-if="jurisdiction['member:memberGroupManager:save'] || jurisdiction['member:memberGroupManager:update']"
      >
        <el-button type="primary" @click="groupAdd" :loading="saveing">保存</el-button>
      </el-form-item>
    </el-form>
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
      title: '新建分组',
      saveing: false,
      form: {
        brandName: 'haier',
        groupName: '', // 模板名称
        groupDesc: '',
        dateRange: [],
        isOnline: 1
      },
      isEdit: false,
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
        groupName: [
          {
            required: true,
            validator: isNotEmpty,
            trigger: 'blur',
            message: '请输入分组名称'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ],
        groupDesc: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入分组描述',
            trigger: 'blur'
          },
          { max: 200, message: '长度不可超过200个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    goback() {
      history.go(-1);
    },
    groupAdd() {
      const self = this;

      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form));
          data.startTimeString = gUtils.dateFormat(Date.parse(data.dateRange[0]), 'yyyy-MM-dd HH:mm:ss');
          data.endTimeString = gUtils.dateFormat(Date.parse(data.dateRange[1]), 'yyyy-MM-dd HH:mm:ss');

          self.saveing = true;
          if (data.id) {
            this.requestVip.updateVipMembersGroup(data).then((data) => {
              self.saveing = false;
              if (data) {
                self.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                self.saveing = false;
                self.$router.push({
                  path: '/vip/vipgroup'
                });
              }
            });
          } else {
            this.requestVip.insertVipMembersGroup(data).then((data) => {
              self.saveing = false;
              if (data) {
                self.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                self.$router.push({
                  path: '/vip/vipgroup'
                });
              }
            });
          }
        }
      });
    },
    groupGet() {
      const self = this;
      if (self.$route.query.id) {
        this.requestVip
          .groupFindById({
            id: self.$route.query.id
          })
          .then((data) => {
            self.form = {
              id: data.id,
              brandName: data.brandName,
              groupName: data.groupName,
              groupDesc: data.groupDesc, // 模板内容
              dateRange: [data.startTime, data.endTime],
              isOnline: data.isOnline
            };
          });
        this.isEdit = true;
      } else {
        this.form = {
          brandName: 'haier',
          groupName: '', // 模板名称
          groupDesc: '',
          dateRange: [],
          isOnline: 1
        };
        this.isEdit = false;
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    this.groupGet();
    setTimeout(() => {
      $('.msg-template')
        .find('.el-radio__input')
        .each(function () {
          if ($(this).hasClass('is-disabled')) {
            $(this)
              .parent('.el-radio')
              .css('cursor', 'default');
          }
        });
    }, 50);

    if (this.$route.query.id) {
      this.title = '会员分组详情';
    }
  }
};
</script>
