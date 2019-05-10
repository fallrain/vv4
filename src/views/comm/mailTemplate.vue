<template>
  <div class="vip-content msg-template">
    <p class="template-brand">
      <i></i>当前品牌：{{ getUserInfo.brandName | brandFilter
      }}<a href="javascript:;" class="color-link fr" @click="goback"
        ><i class="iconfont icon-chevron-copy-copy"></i>返回</a
      >
    </p>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="沟通渠道">
        <p>邮件</p>
      </el-form-item>
      <el-form-item label="模板分类">
        <el-select v-model="form.templateType" placeholder="请选择模板分类" style="width: 300px;" :disabled="isView">
          <el-option label="营销类" value="2"></el-option>
          <el-option label="关怀类" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模板名称" prop="templateName">
        <el-input v-model="form.templateName" style="width: 300px;" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="templateTitle">
        <el-input v-model="form.templateTitle" style="width: 432px;" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="模板内容" prop="templateContent">
        <ueditor
          :value="form.templateContent"
          :config="config"
          v-on:input="input"
          v-on:ready="ready"
          :disabled="isView"
        ></ueditor>
      </el-form-item>
      <el-form-item v-if="jurisdiction['communication:emailManager:edit'] && !isView">
        <el-button type="primary" @click="sendTest">发送预览</el-button>
        <el-button type="primary" :loading="saveing" @click="emailAdd">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ueditor from './components/ueditor.vue';

export default {
  components: {
    ueditor
  },
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction',
      getUserInfo: 'getUserInfo'
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
      saveing: false,
      form: {
        // brandName: 'haier',
        templateName: '', // 模板名称
        templateType: '1',
        templateTitle: '', // 标题
        templateContent: ''
      },
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 320
      },
      isView: false,
      rules: {
        templateName: [
          {
            required: true, validator: isNotEmpty, message: '请输入模板名称', trigger: 'blur'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ],
        templateTitle: [
          {
            required: true, validator: isNotEmpty, message: '请输入标题', trigger: 'blur'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ],
        templateContent: [
          {
            required: true, validator: isNotEmpty, message: '请输入内容', trigger: 'blur'
          },
          { min: 1, message: '长度不可少于1个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    input(content) {
      this.form.templateContent = content.content;
    },
    ready() {},
    goback() {
      history.go(-1);
    },
    sendTest() {
      const self = this;
      this.$prompt('请输入接收者邮箱', '接收者', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          const data = {
            contact: value,
            content: self.form.templateContent,
            title: self.form.templateTitle
          };

          self.requestComm.emailSendTest(data).then((data) => {
            self.$message({
              type: 'success',
              message: '发送成功'
            });
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
    },
    emailAdd() {
      const self = this;

      this.$refs.form.validate((valid) => {
        if (valid) {
          self.saveing = true;

          const data = JSON.parse(JSON.stringify(this.form));

          if (data.id) {
            this.requestComm.emailUpdate(data).then((data) => {
              if (data) {
                const h = self.$createElement;
                self.$notify({
                  message: h('p', {}, '保存成功'),
                  duration: 1000
                });
                self.saveing = false;
                self.$router.push({
                  path: '/communication/maillist'
                });
              }
            });
          } else {
            this.requestComm.emailAdd(data).then((data) => {
              if (data) {
                if (data) {
                  const h = self.$createElement;
                  self.$notify({
                    message: h('p', {}, '保存成功'),
                    duration: 1500
                  });
                  self.saveing = false;
                  self.$router.push({
                    path: '/communication/maillist'
                  });
                }
              }
            });
          }
        }
      });
    },
    emailGet() {
      const self = this;
      if (self.$route.query.id) {
        this.requestComm
          .emailGet({
            id: self.$route.query.id
          })
          .then((data) => {
            self.form = {
              id: data.id,
              brandName: data.brandName,
              templateName: data.templateName,
              templateType: `${data.templateType}`,
              templateContent: data.templateContent, // 模板内容
              templateTitle: data.templateTitle
            };
          });
      } else {
        this.form = {
          // brandName: 'haier',
          templateName: '', // 模板名称
          templateType: `${self.$route.query.templateType}` || 1,
          templateTitle: '',
          templateContent: ''
        };
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    this.isView = !!this.$route.query.type;
    this.emailGet();
  }
};
</script>
