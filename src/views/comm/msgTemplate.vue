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
        <p>短信</p>
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
      <el-form-item label="原链接" prop="originUrl">
        <el-input v-model="form.originUrl" style="width: 432px;" :disabled="isView"></el-input>
        <el-button type="primary" @click="smsShort" :disabled="isView || form.originUrl.length == 0"
          >生成短链接</el-button
        >
        <br />
        <el-input
          v-model="form.shortUrl"
          style="width: 432px;margin-top: 20px;margin-bottom: 5px;"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="模板内容" prop="templateContent">
        <el-button v-if="!isView" type="primary" style="margin-bottom: 15px" @click="addVar">添加变量</el-button>
        <div></div>
        <el-input type="textarea" v-model="form.templateContent" :disabled="isView" @input.native="temInput"></el-input>
        <p style="width:610px;text-align:right;color:#999;">已输入 {{ form.templateContent.length }} 个字</p>
      </el-form-item>
      <!--  <el-form-item v-for="(domain, index) in form.detectUrlsArr" :label="'监测URL'" :key="domain.key" :prop="'detectUrlsArr.' + index + '.value'" :rules="{message: '域名不能为空', trigger: 'blur'}">
            <el-input v-model="domain.value"  style="width: 300px;" :disabled="isView"></el-input>
            <a href="javascript:;" v-if="form.detectUrlsArr.length > 1" class="color-link" @click.prevent="removeDomain(domain)" style="margin-right: 5px">删除</a>
            <a href="javascript:;" v-if="index == form.detectUrlsArr.length - 1 && !isView"  class="color-link" @click="addDomain">继续添加监测URL</a>
          </el-form-item> -->
      <el-form-item v-if="jurisdiction['marketingOperations:smsManager:edit'] && !isView">
        <el-button type="primary" @click="sendTest()">发送预览</el-button>
        <el-button type="primary" :loading="saveing" @click="smsAdd">保存</el-button>
      </el-form-item>
    </el-form>

    <mobtest
      :form="form"
      :random="testDialog.random"
      :display="testDialog.display"
      :jurisdiction="jurisdiction"
      :close="testClose"
    ></mobtest>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import mobtest from './components/mobtest.vue';

export default {
  components: {
    mobtest
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
        id: '',
        brandName: 'haier',
        templateName: '', // 模板名称
        templateType: '1',
        templateContent: '【海尔】', // 模板内容
        originUrl: '', // 原链接
        shortUrl: '', // 短链接
        detectUrlsArr: [
          {
            value: ''
          }
        ]
      },
      isView: false,
      variable: {
        base: [
          {
            key: '$User.userName',
            desc: '用户名'
          },
          {
            key: '$User.mobile',
            desc: '手机号'
          }
        ],
        extend: [
          {
            key: '$User.rights',
            desc: '享受权益'
          },
          {
            key: '$User.level',
            desc: '用户等级'
          },
          {
            key: '$User.growth',
            desc: '用户成长值'
          }
        ]
      },
      testDialog: {
        display: false,
        random: Math.random()
      },
      rules: {
        templateName: [
          {
            required: true, validator: isNotEmpty, message: '请输入模板名称', trigger: 'blur'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ],
        templateContent: [
          {
            required: true, validator: isNotEmpty, message: '请输入模板内容', trigger: 'blur'
          },
          { max: 200, message: '长度不可超过200个字符', trigger: 'blur' }
        ]
        //        originUrl: [
        //          { required: false, validator: isNotEmpty, message: '请输入url', trigger: 'blur' },
        //          { max: 200, message: '长度不可超过200个字符', trigger: 'blur' }
        //        ]
      }
    };
  },
  methods: {
    temInput() {
      if (this.form.templateContent.substring(0, 4) != '【海尔】') {
        this.form.templateContent = `【海尔】${this.form.templateContent.substring(4)}`;
      }
    },
    varCopy(key) {
      this.form.templateContent += key;
      this.$message({
        type: 'info',
        message: '添加成功'
      });
    },
    addVar(index) {
      const self = this;
      const h = this.$createElement;

      const baseNode = [h('tr', null, [h('th', { attrs: { colspan: 2 } }, '用户基本属性类')])];
      const extendNode = [h('tr', null, [h('th', { attrs: { colspan: 2 } }, '用户积分/等级/权益/成长值类')])];

      for (let i = 0; i < self.variable.base.length; i++) {
        baseNode.push(
          h('tr', null, [
            h('td', null, [
              h('span', null, self.variable.base[i].key),
              h(
                'el-button',
                {
                  attrs: { type: 'primary' },
                  on: {
                    click() {
                      self.varCopy(self.variable.base[i].key);
                    }
                  }
                },
                '添加'
              )
            ]),
            h('td', null, [h('span', null, self.variable.base[i].desc)])
          ])
        );
      }

      for (let i = 0; i < self.variable.extend.length; i++) {
        extendNode.push(
          h('tr', null, [
            h('td', null, [
              h('span', null, self.variable.extend[i].key),
              h(
                'el-button',
                {
                  attrs: { type: 'primary' },
                  on: {
                    click() {
                      self.varCopy(self.variable.extend[i].key);
                    }
                  }
                },
                '添加'
              )
            ]),
            h('td', null, [h('span', null, self.variable.extend[i].desc)])
          ])
        );
      }

      this.$msgbox({
        title: '添加变量',
        customClass: 'add-var',
        message: h('div', null, [h('table', null, baseNode), h('table', null, extendNode)]),
        showCancelButton: false,
        showConfirmButton: false
      });
    },
    goback() {
      history.go(-1);
    },
    removeDomain(item) {
      const index = this.form.detectUrlsArr.indexOf(item);
      if (index !== -1) {
        this.form.detectUrlsArr.splice(index, 1);
      }
    },
    addDomain() {
      this.form.detectUrlsArr.push({
        value: '',
        key: Date.now()
      });
    },
    // 生成短链接
    smsShort() {
      const self = this;
      const data = this.form;

      data.detectUrls = [];
      for (let i = 0; i < this.form.detectUrlsArr.length; i++) {
        data.detectUrls.push(this.form.detectUrlsArr[i].value);
      }
      data.detectUrls = data.detectUrls.join(',');

      this.requestComm.smsShort(data).then((data) => {
        self.form.shortUrl = data.data;
      });
    },
    // 发送预览弹层
    sendTest() {
      this.testDialog = {
        display: true,
        random: Math.random()
      };
    },
    // 发送预览弹层关闭
    testClose() {
      this.testDialog.display = false;
    },
    //    sendTest: function () {
    //      let self = this
    //      this.$prompt('请输入接收者手机号', '接收者', {
    //        confirmButtonText: '确定',
    //        cancelButtonText: '取消',
    //        inputPattern: /^[1][2-8][0-9]{9}$/,
    //        inputErrorMessage: '手机号格式不正确'
    //      }).then(({ value }) => {
    //        let data = {
    //          contact: value,
    //          content: self.form.templateContent,
    //          title: self.form.templateName
    //        }
    //
    //        self.requestComm.smsSendTest(data).then(function(data){
    //        self.$message({
    //          type: 'success',
    //          message: '发送成功'
    //        });
    //      })
    //    }).catch(() => {
    //        this.$message({
    //        type: 'info',
    //        message: '取消输入'
    //      });
    //    });
    //    },
    smsAdd() {
      const self = this;

      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form));
          data.detectUrls = [];
          for (let i = 0; i < this.form.detectUrlsArr.length; i++) {
            data.detectUrls.push(this.form.detectUrlsArr[i].value);
          }
          data.detectUrls = data.detectUrls.join(',');

          self.saveing = true;
          if (data.id) {
            this.requestComm.smsUpdate(data).then((data) => {
              self.saveing = false;
              if (data) {
                self.$message({
                  type: 'success',
                  message: '保存成功'
                });
                self.$router.push({
                  path: '/communication/msglist'
                });
              }
            });
          } else {
            this.requestComm.smsAdd(data).then((data) => {
              self.saveing = false;
              if (data) {
                self.$message({
                  type: 'success',
                  message: '保存成功'
                });
                self.$router.push({
                  path: '/communication/msglist'
                });
              }
            });
          }
        }
      });
    },
    smsGet() {
      const self = this;
      if (self.$route.query.id) {
        this.requestComm
          .smsGet({
            id: self.$route.query.id
          })
          .then((data) => {
            self.form = {
              id: data.id,
              brandName: data.brandName,
              templateName: data.templateName,
              templateType: `${data.templateType}`,
              templateContent: data.templateContent, // 模板内容
              originUrl: data.originUrl, // 原链接
              shortUrl: data.shortUrl, // 短链接
              detectUrlsArr: []
            };

            const urlArr = data.detectUrls.split(',');
            for (let i = 0; i < urlArr.length; i++) {
              self.form.detectUrlsArr.push({
                value: urlArr[i]
              });
            }
          });
      } else {
        this.form = {
          id: '',
          brandName: 'haier',
          templateName: '', // 模板名称
          templateType: `${self.$route.query.templateType}` || 1,
          templateContent: '【海尔】', // 模板内容
          originUrl: '', // 原链接
          shortUrl: '', // 短链接
          detectUrlsArr: [
            {
              value: ''
            }
          ]
        };
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    this.isView = !!this.$route.query.type;
    this.smsGet();
  }
};
</script>
