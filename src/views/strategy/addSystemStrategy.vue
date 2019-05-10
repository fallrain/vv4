<template>
  <div class="vip-content msg-template">
    <p class="template-brand">
      <i></i>策略基本信息<a href="javascript:;" class="color-link fr" @click="goback"
        ><i class="iconfont icon-chevron-copy-copy"></i>返回</a
      >
    </p>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="权益简称" label-width="180px" prop="strategyName">
        <el-input v-model="form.strategyName" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="策略描述" label-width="180px" prop="strategyDesc">
        <el-input type="textarea" v-model="form.strategyDesc"></el-input>
      </el-form-item>
      <el-form-item label="适用系统" label-width="180px">
        <el-select v-model="form.dataForSystem" placeholder="请选择使用系统" style="width: 300px;">
          <el-option label="积分中心" value="1"></el-option>
          <el-option label="购买金额" value="2"></el-option>
          <el-option label="生态小微" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="平台" label-width="180px">
        <el-select v-model="form.platform" placeholder="请选择平台" style="width: 300px;">
          <el-option label="海贝商城" value="1"></el-option>
          <el-option label="二维码入口" value="2"></el-option>
          <el-option label="海尔消费金融" value="3"></el-option>
          <el-option label="海尔会员俱乐部" value="4"></el-option>
          <el-option label="SCRM" value="5"></el-option>
          <el-option label="新海贝商城" value="6"></el-option>
          <el-option label="创客实验室" value="7"></el-option>
          <el-option label="海尔优家" value="8"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="积分品牌" label-width="180px">
        <el-select v-model="form.integrationBrand" placeholder="请选择积分品牌" style="width: 300px;">
          <el-option label="海贝积分" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规则" label-width="180px">
        <el-select v-model="form.rule" placeholder="请选择规则" style="width: 300px;">
          <el-option label="随机" value="1"></el-option>
          <el-option label="固定" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="级别" label-width="180px">
        <el-select v-model="form.level" placeholder="请选择级别" style="width: 300px;">
          <el-option label="积分卡" value="1"></el-option>
          <el-option label="交互积分" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="每次行为获得" label-width="180px">
        <el-input v-model="form.score" style="width: 300px"></el-input>
        <span style="margin-left: 5px">积分</span>
      </el-form-item>
      <el-form-item label="积分有效期" label-width="180px">
        <el-input v-model="form.validTime" style="width: 432px"></el-input>
        <span style="margin-left: 5px">个月</span>
      </el-form-item>

      <el-form-item label-width="180px">
        <el-button type="primary" @click="weChatAdd" :loading="saveing">保存</el-button>
        <el-button @click="goback">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
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
        strategyName: '',
        strategyDesc: '',
        dataForSystem: '',
        platform: '',
        integrationBrand: '',
        rule: '',
        level: '',
        score: '',
        validTime: ''
      },
      rules: {
        strategyName: [
          {
            required: true, validator: isNotEmpty, message: '请输入策略名称', trigger: 'blur'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ],
        strategyDesc: [
          {
            required: true, validator: isNotEmpty, message: '请输入策略描述', trigger: 'blur'
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
    propFilter(value, type) {
      value = parseInt(value) - 1;
      switch (type) {
        case 'platform':
          const platformArr = [
            '海贝商城',
            '二维码入口',
            '海尔消费金融',
            '海尔会员俱乐部',
            'SCRM',
            '新海贝商城',
            '创客实验室',
            '海尔优家'
          ];
          value = platformArr[value];
          break;
        case 'integrationBrand':
          const integrationBrandArr = ['海贝积分'];
          value = integrationBrandArr[value];
          break;
        case 'level':
          const levelArr = ['积分卡', '交互积分'];
          value = levelArr[value];
          break;
        case 'rule':
          const ruleArr = ['随机', '固定'];
          value = ruleArr[value];
          break;
        case 'dataForSystem':
          const dataForSystemArr = ['积分中心', '购买金额', '生态小微'];
          value = dataForSystemArr[value];
          break;
      }
      return value;
    },
    weChatAdd() {
      const self = this;

      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form));

          self.saveing = true;
          if (data.id) {
            data.templateType = this.typefilter(data.templateType, 'template');
            this.requestStrategy.updateSystemStrategy(data).then((data) => {
              const h = self.$createElement;
              self.$notify({
                message: h('p', {}, '保存成功'),
                duration: 1000
              });
              self.saveing = false;
              self.$router.push({
                path: '/strategy/system'
              });
            });
          } else {
            this.requestStrategy.insertSystemStrategy(data).then((data) => {
              const h = self.$createElement;
              self.$notify({
                message: h('p', {}, '保存成功'),
                duration: 1000
              });
              self.saveing = false;
              self.$router.push({
                path: '/strategy/system'
              });
            });
          }
        }
      });
    },
    weChatGet() {
      const self = this;
      if (self.$route.query.id) {
        this.requestStrategy
          .findById({
            id: self.$route.query.id,
            brandName: self.$route.query.brandName
          })
          .then((data) => {
            self.form = {
              strategyName: data.strategyName,
              strategyDesc: data.strategyDesc,
              dataForSystem: self.propFilter(data.dataForSystem, 'dataForSystem'),
              platform: self.propFilter(data.platform, 'dataForSystem'),
              integrationBrand: self.propFilter(data.integrationBrand, 'dataForSystem'),
              rule: self.propFilter(data.rule, 'dataForSystem'),
              level: self.propFilter(data.level, 'dataForSystem'),
              score: data.score,
              validTime: data.validTime
            };
          });
      } else {
        this.form = {
          strategyName: '',
          strategyDesc: '',
          dataForSystem: '',
          platform: '',
          integrationBrand: '',
          rule: '',
          level: '',
          score: '',
          validTime: ''
        };
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    this.weChatGet();
  }
};
</script>
