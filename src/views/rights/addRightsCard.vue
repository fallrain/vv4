<template>
  <div class="vip-content msg-template">
    <p class="template-brand">
      <i></i>{{ title }}
      <a href="javascript:;" class="color-link fr" @click="goback">
        <i class="iconfont icon-chevron-copy-copy"></i>返回</a
      >
    </p>
    <el-form ref="form" :model="form" :rules="rules" label-width="165px">
      <el-form-item label="权益品牌" prop="brandName">
        <el-select v-model="form.brandName" style="width: 300px;">
          <el-option label="海尔" value="haier"></el-option>
          <el-option label="卡萨帝" value="casarte"></el-option>
          <el-option label="统帅" value="tongshuai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券名称" prop="cardName">
        <el-input v-model="form.cardName" style="width: 300px"></el-input>
      </el-form-item>

      <el-form-item label="优惠券图片" class="is-required">
        <el-upload
          class="upload-demo"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadRightsImage'"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList1"
          list-type="picture"
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload"
          style="width:300px"
        >
          <el-button v-if="form.imageUrl == ''" size="small" type="primary">点击上传</el-button>
          <div v-if="form.imageUrl == ''" slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="优惠券跳转链接" prop="url">
        <el-input v-model="form.url" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="优惠券状态">
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
      isEdit: false,
      title: '新建优惠券',
      saveing: false,
      radio: '1',
      form: {
        brandName: 'haier',
        cardName: '',
        url: '',
        imageUrl: '',
        status: 1
      },
      rules: {
        cardName: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入优惠券名称',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '长度不可超过30个字符',
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            validator: isUrl,
            message: '请输入正确的优惠券跳转链接',
            trigger: 'blur'
          },
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入优惠券跳转链接',
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
        this.form.imageUrl = response.data.rigthsImageUrl;
      }
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
              message: '请上传优惠券图片！'
            });
            return false;
          }

          const self = this;
          const data = JSON.parse(JSON.stringify(this.form));

          self.saveing = true;
          if (data.id) {
            this.requestComplaint.wechatRightCardUpdate(data).then((data) => {
              self.saveing = false;
              if (data) {
                self.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                self.$router.push({
                  path: '/complaint/rightscard'
                });
              }
            });
          } else {
            this.requestComplaint.wechatRightCardSave(data).then((data) => {
              self.saveing = false;
              if (data) {
                self.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                self.$router.push({
                  path: '/complaint/rightscard'
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
          .getWechatRightsCardById({
            id: self.$route.query.id
          })
          .then((data) => {
            if (data) {
              self.form = {
                brandName: data.brandName,
                id: data.id,
                cardName: data.cardName,
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
            }
          });
      } else {
        this.form = {
          brandName: 'haier',
          cardName: '',
          url: '',
          imageUrl: '',
          status: 1
        };
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    this.getDetail();
    if (this.$route.query.id) {
      this.title = '优惠券详情';
      this.isEdit = true;
    }
  }
};
</script>
