<template>
  <div class="vip-content msg-template">
    <p class="template-brand">
      <i></i>{{ title }}
      <a href="javascript:;" class="color-link fr" @click="goback">
        <i class="iconfont icon-chevron-copy-copy"></i>返回</a
      >
    </p>
    <el-form ref="form" :model="form" :rules="rules" label-width="165px">
      <el-form-item label="用户手机号" prop="mobile">
        <el-input v-model.number="form.mobile" style="width: 300px" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="需添加的积分值" prop="point">
        <el-input v-model.number="form.point" style="width: 300px"></el-input>
      </el-form-item>

      <el-form-item label="上传相关资料" class="is-required">
        <el-upload
          class="upload-demo"
          :action="gUtils.getApiUrl() + 'vipcenter/addpointmanager/uploadAddPointFile'"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList1"
          list-type="text"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :before-upload="beforeAvatarUpload"
          style="width:300px"
        >
          <el-button v-if="form.path == ''" size="small" type="primary">点击上传</el-button>
          <!-- <div v-if="form.path == ''" slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，尺寸600*300</div> -->
        </el-upload>
      </el-form-item>

      <!-- <el-form-item v-if="jurisdiction['strategy:rightsStrategy:save'] || jurisdiction['strategy:rightsStrategy:edit']"> -->
      <el-form-item>
        <el-button type="primary" @click="addItem" :loading="saveing">保存</el-button>
        <el-button @click="goback">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import groupSelect from '../care/dialog/member.vue';
import gUtils from '../../utils/gUtils.js';
import ueditor from '../comm/components/ueditor.vue';


export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  components: {
    groupSelect,
    ueditor
  },
  data() {
    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };
    const isUrl = (rule, value, callback) => {
      const strRegex = '^((https|http|ftp|rtsp|mms)?://)';
      const re = new RegExp(strRegex);
      if (re.test(value)) {
        callback();
      } else if (value != '') {
        return callback(new Error(''));
      } else {
        callback();
      }
    };
    return {
      isEdit: false,
      title: '新增积分',
      saveing: false,
      radio: '1',
      form: {
        path: '',
        mobile: '',
        point: ''
      },
      rules: {
        mobile: [
          {
            required: true,
            type: 'number',
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '手机号必须为数字',
            trigger: 'blur'
          }
        ],
        point: [
          {
            required: true,
            type: 'number',
            message: '请输入积分',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '积分必须为数字',
            trigger: 'blur'
          }
        ]
      },
      fileList1: []
    };
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      if (response.isSuccess) {
        this.form.path = response.data;
      } else {
        this.fileList1 = [];
        this.$message({
          type: 'warning',
          message: response.msg
        });
      }
    },
    uploadError() {
      this.$message({
        type: 'warning',
        message: '文件不符合要求！'
      });
    },
    handleRemove(file, fileList) {
      const self = this;
      setTimeout(() => {
        self.form.path = '';
      }, 500);
    },
    handlePreview(file) {},
    beforeAvatarUpload(file) {
      console.log(file.type);
      const isExl = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        || file.type === 'application/vnd.ms-excel';
      const isLt2M = file.size / 1024 / 1024 <= 10;
      console.log(file.size);

      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 10mb!');
      }

      if (!isExl) {
        this.$message.error('上传文件只能是 xlsx/xls 格式!');
      }

      return isExl && isLt2M;
    },
    handleChange() {},
    goback() {
      history.go(-1);
    },
    addItem() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.path == '') {
            this.$message({
              type: 'warning',
              message: '请上传文件！'
            });
            return false;
          }

          const self = this;
          const data = JSON.parse(JSON.stringify(this.form));

          self.saveing = true;
          this.requestComplaint.saveAddpoint(data).then((data) => {
            self.saveing = false;
            console.log(data);
            if (data.isSuccess) {
              self.$message({
                type: 'success',
                message: '保存成功!'
              });
              self.$router.push({
                path: '/complaint/jfhandle'
              });
            }
          });
        }
      });
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    // if (this.$route.query.id) {
    //   this.title = "新增积分";
    //   this.isEdit = true;
    // }
  }
};
</script>
