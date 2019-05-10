<template>
  <div class="vip-content msg-template">
    <p class="template-brand"><i></i>{{ title }}</p>
    <el-form ref="form" :model="form" :rules="rules" label-width="165px">
      <el-form-item label="所属栏目" prop="column">
        <el-select v-model="form.columnId" style="width: 300px;" :disabled="isEdit" @change="colchange">
          <el-option label="家电优选" value="0"></el-option>
          <el-option label="企业咨询" value="1"></el-option>
          <el-option label="家电课堂" value="2"></el-option>
          <el-option label="落地页" value="3"></el-option>
          <el-option label="个人中心" value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="品牌" prop="brandName">
        <el-select v-model="form.brandName" style="width: 300px;">
          <el-option label="海尔" value="haier"></el-option>
          <el-option label="卡萨帝" value="casarte"></el-option>
          <el-option label="统帅" value="tongshuai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="bannerName">
        <el-input v-model="form.bannerName" :maxlength="15" style="width: 300px"></el-input>
      </el-form-item>

      <el-form-item label="图片" class="is-required">
        <el-upload
          class="upload-demo"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadCotentBannerImage'"
          :on-preview="handlePreview"
          :data="{ columnId: form.columnId }"
          :on-remove="handleRemove"
          :file-list="fileList1"
          list-type="picture"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :before-upload="beforeAvatarUpload"
          style="width:300px"
        >
          <el-button v-if="form.imageUrl == ''" size="small" type="primary">点击上传</el-button>
          <div v-if="form.imageUrl == ''" slot="tip" class="el-upload__tip">{{ pdtext }}</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="图片跳转链接" prop="url">
        <el-input v-model="form.url" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="是否上架">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">上架</el-radio>
          <el-radio :label="2">下架</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-if="
          jurisdiction['rightsOperations:rightsStrategy:save'] || jurisdiction['rightsOperations:rightsStrategy:edit']
        "
      >
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
      pdtext: '只能上传jpg/png文件，且不超过500kb，尺寸600*300',
      isEdit: false,
      title: '新建banner图',
      saveing: false,
      radio: '1',
      form: {
        columnId: '0',
        brandName: 'haier',
        bannerName: '',
        url: '',
        imageUrl: '',
        status: 1
      },
      rules: {
        bannerName: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入名称',
            trigger: 'blur'
          },
          {
            max: 15,
            message: '长度不可超过15个字符',
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            validator: isUrl,
            message: '请输入正确的图片跳转链接',
            trigger: 'blur'
          },
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入图片跳转链接',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '长度不可超过200个字符',
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
        this.form.imageUrl = response.data.contentBannerImageUrl;
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
        message: '图片不符合要求！'
      });
    },
    handleRemove(file, fileList) {
      const self = this;
      setTimeout(() => {
        self.form.imageUrl = '';
      }, 500);
    },
    handlePreview(file) {},
    beforeAvatarUpload(file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 <= 500;

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 500kb!');
      }

      if (!isImg) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }

      return isImg && isLt2M;
    },
    handleChange() {},
    goback() {
      history.go(-1);
    },
    addItem() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.imageUrl == '') {
            this.$message({
              type: 'warning',
              message: '请上传图片！'
            });
            return false;
          }

          const self = this;
          const data = JSON.parse(JSON.stringify(this.form));

          self.saveing = true;
          if (data.id) {
            this.requestComplaint.updateContentBanner(data).then((data) => {
              self.saveing = false;
              if (data) {
                self.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                self.$router.push({
                  path: '/complaint/bannermanage',
                  query: { column: self.form.columnId }
                });
              }
            });
          } else {
            this.requestComplaint.saveContentBanner(data).then((data) => {
              self.saveing = false;
              if (data) {
                self.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                self.$router.push({
                  path: '/complaint/bannermanage',
                  query: { column: self.form.columnId }
                });
              }
            });
          }
        }
      });
    },
    getDetail() {
      const self = this;
      if (self.$route.query.id) {
        this.requestComplaint
          .getContentBannerById({
            id: self.$route.query.id
          })
          .then((data) => {
            self.form = {
              columnId: `${data.columnId}`,
              brandName: data.brandName,
              id: data.id,
              bannerName: data.bannerName,
              imageUrl: data.imageUrl,
              status: data.status,
              url: data.url
            };

            if (data.imageUrl && data.imageUrl != '') {
              self.fileList1 = [
                {
                  url: data.imageUrl
                }
              ];
            }
          });
      } else {
        this.form = {
          columnId: '0',
          brandName: 'haier',
          bannerName: '',
          url: '',
          imageUrl: '',
          status: 1
        };
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    colchange(e) {
      if (e == 3) {
        this.pdtext = '只能上传jpg/png文件，且不超过500kb，尺寸800*400';
      } else if (e == 4) {
        this.pdtext = '只能上传jpg/png文件，且不超过500kb，建议800*300';
      } else {
        this.pdtext = '只能上传jpg/png文件，且不超过500kb，尺寸600*300';
      }
    }
  },
  mounted() {
    this.getDetail();
    if (this.$route.query.id) {
      this.title = 'banner图维护';
      this.isEdit = true;
    }
  }
};
</script>
