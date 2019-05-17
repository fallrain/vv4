<template>
  <div class="vip-content openreddetails">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>开门红</p>
      <div class="clear"></div>
    </div>
    <div style="">
      <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="上传">
          <el-upload
            class="avatar-uploader"
            :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadPicToPortalUser'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker
            v-model="yxtime"
            type="datetimerange"
            placeholder="选择有效期范围"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="getTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="$router.push({ path: '/complaint/openred' })">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import gUtils from '../../utils/gUtils.js';

export default {
  name: 'openRedDetails',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      form: {
        startTime: '',
        endTime: '',
        imageUrl: ''
      },
      yxtime: []
    };
  },
  created(e) {
    if (this.$route.query.id) {
      const data = {
        id: this.$route.query.id
      };
      const _this = this;
      this.requestComplaint.getOpenRedById(data).then((data) => {
        if (data.isSuccess) {
          _this.form.imageUrl = data.data.imageUrl;
          _this.form.startTime = data.data.startTime;
          _this.form.endTime = data.data.endTime;
          _this.yxtime.push(new Date(data.data.startTime));
          _this.yxtime.push(new Date(data.data.endTime));
        }
      });
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.isSuccess) {
        this.form.imageUrl = res.data.portalUserImageUrl;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 <= 1024 * 5;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isJPG && isLt2M;
    },
    getTime(data) {
      let range = data;
      if (!range) {
        range = ['', ''];
      }
      [this.form.startTime, this.form.endTime] = range;
    },
    onSubmit() {
      const _this = this;
      const data = this.form;
      if (this.$route.query.id) {
        data.id = this.$route.query.id;
        this.requestComplaint.udateOpenRed(data).then((data) => {
          if (data.isSuccess) {
            _this.$message({
              message: data.msg,
              type: 'success'
            });
            _this.$router.push({ path: '/complaint/openred' });
          }
        });
      } else {
        this.requestComplaint.saveOpenRed(data).then((data) => {
          if (data.isSuccess) {
            _this.$message({
              message: data.msg,
              type: 'success'
            });
            _this.$router.push({ path: '/complaint/openred' });
          }
        });
      }
    }
  }
};
</script>

<style>
.openreddetails .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.openreddetails .avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.openreddetails .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.openreddetails .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
