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
        <p>站内信</p>
      </el-form-item>
      <el-form-item label="模板分类">
        <el-select v-model="form.templateType" placeholder="请选择模板分类" style="width: 300px;" :disabled="isView">
          <el-option label="营销类" value="2"></el-option>
          <el-option label="关怀类" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推送应用" class="com-sitemsg">
        <el-select
          v-model="form.selectedApp"
          multiple
          placeholder="请选择"
          style="width: 300px;"
          :disabled="isView || isEdit"
        >
          <el-option v-for="app in pushappArr" :key="'' + app.id" :label="app.appName" :value="'' + app.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模板名称" prop="templateName">
        <el-input v-model="form.templateName" style="width: 300px;" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="模板内容" prop="templateContent">
        <!-- <el-button v-if="!isView" type="primary" style="margin-bottom: 15px" @click="addVar">添加变量</el-button> -->
        <el-input type="textarea" v-model="form.templateContent" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item
        v-if="
          jurisdiction['marketingOperations:siteMsgManager:save'] ||
            (jurisdiction['marketingOperations:siteMsgManager:edit'] && !isView)
        "
      >
        <!-- <el-button type="primary">发送预览</el-button> -->
        <el-button v-if="!isView" type="primary" :loading="saveing" @click="siteMsgAdd">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
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
        brandName: 'haier',
        templateName: '', // 模板名称
        templateType: '1',
        templateContent: '',
        selectedApp: [],
        pushapp: '' // 推送应用
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
      isView: false,
      isEdit: false,
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
          // ,{
          //   key: '$User.score',
          //   desc: '用户当前积分数'
          // }
        ]
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
      }
    };
  },
  methods: {
    getApp() {
      const self = this;
      this.requestComm.getApp().then((data) => {
        self.pushappArr = data;
        self.siteMsgGet();
      });
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
                '复制'
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
                '复制'
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
      // index = parseInt(index) + 1
      // this.form.valueArr.splice(index, 0, {
      //   key: 'keyword' + index,
      //   value: ''
      // })
    },
    goback() {
      history.go(-1);
    },
    siteMsgAdd() {
      const self = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form));

          data.pushapp = data.selectedApp.join(',');

          if (data.pushapp == '') {
            this.$message({
              type: 'warning',
              message: '请选择应用！'
            });
            return false;
          }

          self.saveing = true;
          if (data.id) {
            this.requestComm.siteMsgUpdate(data).then((data) => {
              self.$message({
                type: 'success',
                message: '保存成功'
              });
              self.saveing = false;
              self.$router.push({
                path: '/communication/sitemsglist'
              });
            });
          } else {
            this.requestComm.siteMsgAdd(data).then((data) => {
              self.$message({
                type: 'success',
                message: '保存成功'
              });
              self.saveing = false;
              self.$router.push({
                path: '/communication/sitemsglist'
              });
            });
          }
        }
      });
    },
    siteMsgGet() {
      const self = this;
      if (self.$route.query.id) {
        this.requestComm
          .siteMsgGet({
            id: self.$route.query.id
          })
          .then((data) => {
            self.form = {
              id: data.id,
              brandName: data.brandName,
              templateName: data.templateName,
              templateType: `${data.templateType}`,
              templateContent: data.templateContent, // 模板内容
              pushapp: data.pushapp,
              selectedApp: data.pushapp.split(',')
            };

            // 去重
            Array.prototype.unique = function () {
              const res = [];
              const json = {};
              for (let i = 0; i < this.length; i++) {
                if (!json[this[i]]) {
                  res.push(this[i]);
                  json[this[i]] = 1;
                }
              }
              return res;
            };

            const appArr = [];
            for (var i = 0; i < self.pushappArr.length; i++) {
              appArr.push(self.pushappArr[i].id);
            }

            const pushAppName = data.pushAppName.split(',');
            for (var i = 0; i < self.form.selectedApp.length; i++) {
              if ($.inArray(parseInt(self.form.selectedApp[i]), appArr) == -1) {
                self.form.selectedApp[i] = pushAppName[i];
              }
            }
          });
      } else {
        this.form = {
          brandName: 'haier',
          templateName: '', // 模板名称
          templateType: `${self.$route.query.templateType}` || 1,
          templateContent: '',
          pushapp: '', // 推送应用
          selectedApp: []
        };
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    this.getApp();
    this.isView = !!this.$route.query.type;
    this.isEdit = !!this.$route.query.id;
  }
};
</script>
