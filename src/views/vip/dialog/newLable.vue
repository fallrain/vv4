<template>
  <div>
    <el-form :model="customer" :rules="rules" ref="customer" label-width="100px">
      <el-form-item label="标签名称" prop="tagName">
        <el-input
          v-model="customer.tagName"
          auto-complete="off"
          @change="dialogFormChange(customer)"
          :maxlength="30"
          style="width: 320px;"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="tagDesc">
        <el-input
          type="textarea"
          v-model="customer.tagDesc"
          auto-complete="off"
          @change="dialogFormChange(customer)"
          :maxlength="200"
          style="width: 320px;"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['dialogFormChange', 'form', 'formData'],
  data() {
    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };
    return {
      customer: this.formData,
      rules: {
        tagName: [
          {
            required: true, validator: isNotEmpty, message: '请输入标签名称', trigger: 'blur'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ],
        tagDesc: [
          {
            required: true, validator: isNotEmpty, message: '请输入描述', trigger: 'blur'
          },
          { max: 200, message: '长度不可超过200个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {},
  mounted() {
    this.form(this.$refs.customer);
  }
};
</script>
