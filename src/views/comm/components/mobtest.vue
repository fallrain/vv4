<template>
  <div>
    <el-dialog
      title="接收者"
      ref="testDialog"
      :visible.sync="dialogDisplay"
      custom-class="add-personnel"
      :modal-append-to-body="false"
      @close="dialogClose"
    >
      <el-form :model="customer" :rules="rules" ref="newTest">
        <el-form-item prop="mobile">
          <div style="width: 100%; text-align: left;">请输入接收者手机号</div>
          <el-input v-model.number="customer.mobile" style="width: 400px;" :maxlength="11"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="save" :loading="saveing">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['form', 'random', 'display', 'jurisdiction', 'close', 'change'],
  data() {
    const moblieValidator = (rule, value, callback) => {
      if (!value) {
        // return callback(new Error('请输入客服手机号'));
        callback();
      } else {
        if (/^[1][2-8][0-9]{9}$/.test(value) == false) {
          callback(new Error('手机号格式有误'));
        }
        callback();
      }
    };

    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };

    return {
      saveing: false,
      dialogDisplay: false,
      customer: {
        mobile: ''
      },
      rules: {
        //          employeeNumber: [
        //            { required: true, validator: isNotEmpty, message: '请输入工号', trigger: 'blur' },
        //            { max: 20, message: '长度不可超过20个字符', trigger: 'blur' }
        //          ],
        mobile: [{ required: false, validator: moblieValidator, trigger: 'blur' }]
      }
    };
  },
  methods: {
    dialogClose() {
      this.close();
    },
    save() {
      const self = this;
      this.$refs.newTest.validate((valid) => {
        if (valid) {
          self.saveing = true;
          self.requestComm
            .smsSendTest({
              contact: self.customer.mobile,
              content: self.form.templateContent,
              title: self.form.templateName
            })
            .then((data) => {
              self.saveing = false;
              if (data) {
                self.$message({
                  type: 'success',
                  message: '发送成功!'
                });
                self.close();
              }
            });
          // }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted() {
    this.dialogDisplay = this.display;
  },
  watch: {
    random() {
      if (this.$refs.newTest) {
        this.$refs.newTest.resetFields();
      }
    },
    display(curValue) {
      this.dialogDisplay = curValue;
    }
  }
};
</script>
