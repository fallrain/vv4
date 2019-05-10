<template>
  <div class="vip-content msg-template">
    <p class="template-brand">
      <i></i>策略基本信息<a href="javascript:;" class="color-link fr" @click="goback"
        ><i class="iconfont icon-chevron-copy-copy"></i>返回</a
      >
    </p>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="策略名称" label-width="180px" prop="strategyName">
        <el-input v-model="form.strategyName" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="策略描述" label-width="180px" prop="strategyDesc">
        <el-input type="textarea" v-model="form.strategyDesc"></el-input>
      </el-form-item>
      <el-form-item label="数据来源" label-width="180px">
        <el-select v-model="form.dataFrom" placeholder="请选择使用系统" style="width: 300px;">
          <el-option label="积分中心" value="1"></el-option>
          <el-option label="购买金额" value="2"></el-option>
          <el-option label="生态小微" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用" label-width="180px">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="-3">否</el-radio>
        </el-radio-group>
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
        brandName: 'haier',
        dataFrom: '',
        strategyDesc: '',
        strategyName: '',
        status: 1
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
    weChatAdd() {
      const self = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form));

          self.saveing = true;
          if (data.id) {
            this.requestStrategy.updateStrategy(data).then((data) => {
              if (data) {
                self.saveing = false;
                self.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                self.$router.push({
                  path: '/strategy/growup'
                });
              }
            });
          } else {
            this.requestStrategy.insertGrowUp(data).then((data) => {
              if (data) {
                self.saveing = false;
                self.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                self.$router.push({
                  path: '/strategy/growup'
                });
              }
            });
          }
        }
      });
    },
    weChatGet() {
      const self = this;
      if (self.$route.query.id) {
        this.requestStrategy
          .growUpQueryById({
            id: self.$route.query.id,
            brandName: self.$route.query.brandName
          })
          .then((data) => {
            self.form = {
              id: data.id,
              brandName: data.brandName,
              dataFrom: data.dataFrom ? `${data.dataFrom}` : '',
              strategyDesc: data.strategyDesc,
              strategyName: data.strategyName,
              status: data.status
            };
          });
      } else {
        this.form = {
          brandName: 'haier',
          dataFrom: '',
          strategyDesc: '',
          strategyName: '',
          status: 1
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
