<template>
  <div>
    <el-form :model="customer" :rules="rules" ref="customer" label-width="110px">
      <el-form-item label="角色中文名" prop="name">
        <el-input v-model="customer.name" auto-complete="off" @change="dialogFormChange(customer)"></el-input>
      </el-form-item>
      <el-form-item label="角色英文名" prop="enName" v-if="!edit">
        <el-input v-model="customer.enName" auto-complete="off" @change="dialogFormChange(customer)"></el-input>
      </el-form-item>
      <el-form-item label="角色备注" prop="remark">
        <el-input v-model="customer.remark" auto-complete="off" @change="dialogFormChange(customer)"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['dialogFormChange', 'form', 'formData', 'edit', 'random'],
  data() {
    const chnName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入角色中文名称'));
      }
      if (/^[\u4E00-\u9FA5]+$/.test(value) == false) {
        callback(new Error('请输入中文'));
      }

      callback();
    };
    const engName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入角色英文名称'));
      }
      if (/^[A-Za-z]+$/.test(value) == false) {
        callback(new Error('请输入英文'));
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
      customer: {},
      rules: {
        name: [
          { required: true, validator: chnName, trigger: 'blur' },
          { min: 2, message: '角色中文名称不可少于2个字', trigger: 'blur' },
          { max: 20, message: '角色中文名称不可超过20个字', trigger: 'blur' }
        ],
        enName: [
          { required: true, validator: engName, trigger: 'blur' },
          { min: 2, message: '角色英文名称不可少于2个字符', trigger: 'blur' },
          { max: 20, message: '角色英文名称不可超过20个字符', trigger: 'blur' }
        ],
        remark: [
          {
            required: true, validator: isNotEmpty, message: '请输入角色备注', trigger: 'blur'
          },
          { max: 200, message: '角色备注不可超过200个字', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {},
  mounted() {
    this.form(this.$refs.customer);
    this.customer = this.formData;
    this.dialogFormChange(this.customer);
  },
  watch: {
    random(curValue) {
      if (this.customer.name) {
        this.customer = this.formData;
        this.dialogFormChange(this.customer);
      } else {
        this.$refs.customer.resetFields();
      }
    }
  }
};
</script>
