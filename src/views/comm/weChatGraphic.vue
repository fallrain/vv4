<template>
  <div class="vip-content msg-template">
    <p class="template-brand">
      <i></i>当前品牌：{{ getUserInfo.brandName | brandFilter
      }}<a href="javascript:;" class="color-link fr" @click="goback"
        ><i class="iconfont icon-chevron-copy-copy"></i>返回</a
      >
    </p>
    <el-form ref="form" :model="form" :rules="rules" label-width="160px">
      <el-form-item label="沟通渠道">
        <p>微信</p>
      </el-form-item>
      <el-form-item label="图文模板分类">
        <el-select v-model="form.templateType" placeholder="请选择模板分类" style="width: 300px;" :disabled="isView">
          <el-option label="营销类" value="2"></el-option>
          <el-option label="关怀类" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图文模板名称" prop="templateName">
        <el-input v-model="form.templateName" style="width: 300px;" :disabled="isView"></el-input>
      </el-form-item>

      <p class="template-brand"><i></i>首页</p>
      <el-form-item label="首页标题" prop="homeTitle">
        <el-input v-model="form.homeTitle" style="width: 432px;" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="首页图片" class="is-required">
        <el-upload
          class="upload-demo"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadFile?api_key=upload'"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList2"
          list-type="picture"
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload"
          :disabled="isView"
        >
          <el-button v-if="form.homePic == ''" size="small" type="primary">点击上传</el-button>
          <div v-if="form.homePic == ''" slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="首页摘要" prop="homeRemark">
        <el-input v-model="form.homeRemark" style="width: 432px;" :disabled="isView"></el-input>
      </el-form-item>

      <p class="template-brand"><i></i>详情页</p>
      <el-form-item label="标题" prop="templateTitle">
        <el-input v-model="form.templateTitle" style="width: 432px;" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="form.author" style="width: 432px;" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="模板内容" prop="templateContent">
        <ueditor
          :value="form.templateContent"
          :config="config"
          v-on:input="input"
          v-on:ready="ready"
          :disabled="isView"
          :random="editorRandom"
        ></ueditor>
      </el-form-item>
      <el-form-item label="阅读原文链接" prop="readMoreUrl">
        <el-input v-model="form.readMoreUrl" style="width: 432px;" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item
        v-if="
          jurisdiction['marketingOperations:weChatManager:graphicsEdit'] ||
            jurisdiction['marketingOperations:weChatManager:graphicsSave']
        "
      >
        <el-button v-if="form.id" type="primary" @click="sendTest">发送预览</el-button>
        <el-button v-if="!isView" type="primary" :loading="saveing" @click="weChatAdd">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ueditor from './components/ueditor.vue';

export default {
  components: {
    ueditor
  },
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction',
      getUserInfo: 'getUserInfo'
    })
  },
  data() {
    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };
    return {
      editorRandom: Math.random(),
      saveing: false,
      form: {
        brandName: 'haier',
        templateName: '', // 模板名称
        templateType: '1',
        msgType: 2,
        templateTitle: '', // 标题
        templateContent: '',
        author: '',
        homeTitle: '',
        homeRemark: '',
        readMoreUrl: '',
        homePic: ''
      },
      templateContent: '',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 320
      },
      fileList2: [],
      isView: false,
      rules: {
        templateName: [
          {
            required: true, validator: isNotEmpty, message: '请输入模板名称', trigger: 'blur'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ],
        homeTitle: [
          {
            required: true, validator: isNotEmpty, message: '请输入首页标题', trigger: 'blur'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ],
        homeRemark: [
          {
            required: true, validator: isNotEmpty, message: '请输入首页摘要', trigger: 'blur'
          },
          { max: 200, message: '长度不可超过200个字符', trigger: 'blur' }
        ],
        templateTitle: [
          {
            required: true, validator: isNotEmpty, message: '请输入标题', trigger: 'blur'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ],
        templateContent: [
          {
            required: true, validator: isNotEmpty, message: '请输入模板内容', trigger: 'blur'
          }
          //          { max: 50, message: '长度不可超过50个字', trigger: 'blur' }
        ],
        author: [
          {
            required: true, validator: isNotEmpty, message: '请输入作者', trigger: 'blur'
          },
          { max: 50, message: '长度不可超过50个字', trigger: 'blur' }
        ],
        readMoreUrl: [
          {
            required: true, validator: isNotEmpty, message: '请输入阅读原文链接', trigger: 'blur'
          },
          { max: 200, message: '长度不可超过200个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      if (response.isSuccess) {
        this.form.homePic = response.data.url;
      } else {
        fileList.splice(0, 1);
        this.$message({
          type: 'warning',
          message: response.msg
        });
      }
    },
    handleRemove(file, fileList) {
      const self = this;
      setTimeout(() => {
        self.form.homePic = '';
      }, 500);
    },
    handlePreview(file) {},
    input(content) {
      this.templateContent = content.content;
    },
    ready() {},
    goback() {
      history.go(-1);
    },
    weChatAdd() {
      const self = this;
      this.editorRandom = Math.random();
      setTimeout(() => {
        self.form.templateContent = self.templateContent;

        self.$refs.form.validate((valid) => {
          if (valid) {
            const data = JSON.parse(JSON.stringify(self.form));

            if (data.homePic == '') {
              self.$message({
                type: 'warning',
                message: '请上传图片！'
              });
              return false;
            }
            self.saveing = true;

            if (data.id) {
              self.requestComm.weChatUpdate(data).then((data) => {
                self.saveing = false;
                if (data) {
                  const h = self.$createElement;
                  self.$notify({
                    message: h('p', {}, '保存成功'),
                    duration: 1000
                  });
                  self.$router.push({
                    path: '/communication/wechatlist',
                    query: {
                      type: 2
                    }
                  });
                }
              });
            } else {
              self.requestComm.weChatAdd(data).then((data) => {
                self.saveing = false;
                if (data) {
                  const h = self.$createElement;
                  self.$notify({
                    message: h('p', {}, '保存成功'),
                    duration: 1000
                  });
                  self.$router.push({
                    path: '/communication/wechatlist',
                    query: {
                      type: 2
                    }
                  });
                }
              });
            }
          }
        });
      }, 500);
    },
    weChatGet() {
      const self = this;
      if (self.$route.query.id) {
        this.requestComm
          .weChatGet({
            id: self.$route.query.id
          })
          .then((data) => {
            self.form = {
              id: data.id,
              brandName: data.brandName,
              templateName: data.templateName,
              templateType: `${data.templateType}`,
              msgType: data.msgType,
              templateContent: data.templateContent, // 模板内容
              templateTitle: data.templateTitle,
              author: data.author,
              homeTitle: data.homeTitle,
              homeRemark: data.homeRemark,
              readMoreUrl: data.readMoreUrl,
              homePic: data.homePic,
              mediaId: data.mediaId
            };

            if (data.homePic != '') {
              self.fileList2 = [
                {
                  url: data.homePic
                }
              ];
            }
          });
      } else {
        this.form = {
          brandName: 'haier',
          templateName: '', // 模板名称
          templateType: '1',
          templateTitle: '',
          templateContent: '',
          msgType: 2,
          author: '',
          homeTitle: '',
          homeRemark: '',
          readMoreUrl: '',
          homePic: ''
        };
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {},
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
    sendTest() {
      const self = this;
      this.$prompt('请输入接收者UserId', '接收者', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          const data = {
            mediaId: self.form.mediaId,
            msgType: 2,
            userIdStr: value
          };

          self.requestComm.weChatSendTest(data).then((data) => {
            if (data) {
              self.$message({
                type: 'success',
                message: '发送成功'
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
    }
  },
  mounted() {
    this.weChatGet();
    this.isView = !!this.$route.query.type;
  }
};
</script>
