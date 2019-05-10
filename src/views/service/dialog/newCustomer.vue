<template>
  <div>
    <el-form :model="customer" :rules="rules" ref="customer" label-width="110px">
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="customer.name"
          auto-complete="off"
          :maxlength="20"
          @change="dialogFormChange(customer)"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="customer.email"
          auto-complete="off"
          :maxlength="50"
          @change="dialogFormChange(customer)"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model.number="customer.mobile" :maxlength="11" @change="dialogFormChange(customer)"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['dialogFormChange', 'form', 'random'],
  data() {
    const emailValidator = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error('请输入客服邮箱'));
      }
      if (
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/.test(
          value
        ) == false
      ) {
        callback(new Error('邮箱格式有误'));
      }
      callback();
    };

    const moblieValidator = (rule, value, callback) => {
      if (!value) {
        // return callback(new Error('请输入客服手机号'));
        return callback();
      }
      if (/^[1][2-8][0-9]{9}$/.test(value) == false) {
        callback(new Error('手机号格式有误'));
      }
      callback();
    };

    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };

    return {
      customer: {
        name: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{
          required: true, validator: isNotEmpty, message: '请输入客服姓名', trigger: 'blur'
        }],
        email: [{ required: true, validator: emailValidator, trigger: 'blur' }],
        mobile: [{ required: false, validator: moblieValidator, trigger: 'blur' }]
      }
    };
  },
  methods: {},
  mounted() {
    this.form(this.$refs.customer);
  },
  watch: {
    random(curVal) {
      this.customer = {
        name: '',
        email: '',
        mobile: ''
      };
    }
  }
};
</script>
