<template>
  <div class="vip-content msg-template">
    <p class="template-brand"><i></i>内容管理</p>
    <el-form ref="form" :model="form" :rules="rules" label-width="160px">
      <el-form-item label="栏目">
        <el-select v-model="form.column" style="width: 300px;" @change="columnChange" :disabled="isView">
          <el-option label="家电优选" value="0"></el-option>
          <el-option label="企业咨询" value="1"></el-option>
          <el-option label="家电课堂" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.column == 2">
        <el-radio-group v-model="form.type" @change="typeChange" :disabled="isView">
          <el-radio label="0">常见故障及解决方法</el-radio>
          <el-radio label="1">小贴士</el-radio>
          <el-radio label="2">新技术</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.column == 2" label="产品大类" class="is-required">
        <el-select v-model="form.productCategoryId" style="width: 300px;">
          <el-option
            v-for="category in productCategory"
            :label="category.productCategoryName"
            :value="category.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" style="width: 432px;"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type != 1 && form.type != 2" label="作者" prop="author">
        <el-input v-model="form.author" style="width: 432px;"></el-input>
      </el-form-item>

      <el-form-item v-if="form.type != 1 && form.type != 2" class="is-required" label="缩略图" style="width:592px">
        <el-upload
          class="upload-demo"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadCotentImage'"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList2"
          list-type="picture"
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button v-if="!uploading && form.imageUrl == ''" size="small" type="primary">点击上传</el-button>
          <div v-if="form.imageUrl == ''" slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item v-if="form.type != 1 && form.type != 2" label="简介" prop="brief">
        <el-input type="textarea" v-model="form.brief"></el-input>
      </el-form-item>

      <el-form-item v-if="form.type == 1 || form.type == 2" label="内容" prop="textContent2">
        <el-input type="textarea" v-model="form.textContent2"></el-input>
      </el-form-item>

      <el-form-item v-if="form.type != 1 && form.type != 2" label="文章内容" prop="textContent">
        <ueditor
          :value="form.textContent"
          :config="config"
          v-on:input="input"
          v-on:ready="ready"
          :random="editorRandom"
        ></ueditor>
      </el-form-item>

      <el-form-item v-if="form.column == 0" label="产品链接" prop="productUrl">
        <el-input v-model="form.productUrl" style="width: 432px;"></el-input>
      </el-form-item>
      <el-form-item v-if="form.column == 0" label="关联标签" prop="productUrl" class="content-label-list">
        <el-checkbox v-for="item in labelList" v-model="item.checked">{{ item.label }}</el-checkbox>
      </el-form-item>
      <el-form-item v-if="form.column == 1" label="是否推荐">
        <el-radio-group v-model="form.type">
          <el-radio label="3">是</el-radio>
          <el-radio label="6">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <!-- <el-button v-if="form.id" type="primary" @click="sendTest">发送预览</el-button> -->
        <el-button type="primary" :loading="saveing" @click="weChatAdd">保存</el-button>
        <el-button v-if="!isView" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ueditor from '../comm/components/ueditor.vue';

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
        column: '0',
        title: '', // 标题
        textContent: '',
        textContent2: '',
        author: '',
        productUrl: '',
        imageUrl: '',
        type: '',
        brief: '',
        productCategoryId: ''
      },
      textContent: '',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 320
      },
      fileList2: [],
      isView: false,
      labelList: [],
      uploading: false,
      rules: {
        title: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入标题',
            trigger: 'blur'
          },
          { max: 15, message: '长度不可超过15个字符', trigger: 'blur' }
        ],
        textContent: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入内容',
            trigger: 'blur'
          }
        ],
        textContent2: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入内容',
            trigger: 'blur'
          },
          { max: 200, message: '长度不可超过200个字符', trigger: 'blur' }
        ],
        brief: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入简介',
            trigger: 'blur'
          },
          { max: 50, message: '长度不可超过50个字符', trigger: 'blur' }
        ],
        author: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入作者',
            trigger: 'blur'
          },
          { max: 50, message: '长度不可超过50个字', trigger: 'blur' }
        ]
      },
      productCategory: []
    };
  },
  methods: {
    typeChange() {
      if (this.$route.query.id) {
        return false;
      }

      this.form.title = '';
      this.form.textContent = '';
      this.form.textContent2 = '';
      this.form.author = '';
      this.form.productUrl = '';
      this.form.imageUrl = '';
      this.form.brief = '';
      this.form.productCategoryId = '';

      for (let i = 0; i < this.labelList.length; i++) {
        this.labelList[i].checked = false;
      }

      this.fileList2 = [];
    },
    reset() {
      if (this.$route.query.id) {
        return false;
      }

      this.form.title = '';
      this.form.textContent = '';
      this.form.textContent2 = '';
      this.form.author = '';
      this.form.productUrl = '';
      this.form.imageUrl = '';
      this.form.brief = '';
      this.form.productCategoryId = '';

      for (let i = 0; i < this.labelList.length; i++) {
        this.labelList[i].checked = false;
      }

      this.fileList2 = [];
    },
    columnChange() {
      if (this.$route.query.id) {
        return false;
      }

      if (this.form.column == 2 && (this.form.type == '' || this.form.type == '3' || this.form.type == '6')) {
        this.form.type = '0';
      } else if (this.form.column == 1) {
        this.form.type = '6';
      } else if (this.form.column != 2) {
        this.form.type = '';
      }

      this.form.title = '';
      this.form.textContent = '';
      this.form.textContent2 = '';
      this.form.author = '';
      this.form.productUrl = '';
      this.form.imageUrl = '';
      this.form.brief = '';
      // this.form.productCategoryId = ''

      for (let i = 0; i < this.labelList.length; i++) {
        this.labelList[i].checked = false;
      }

      this.fileList2 = [];
      // if (this.$refs["form"].resetFields()) {
      //   this.$refs["form"].resetFields()
      // }
    },
    uploadSuccess(response, file, fileList) {
      this.uploading = false;
      this.form.imageUrl = response.data.contentImageUrl;
    },
    handleRemove(file, fileList) {
      const self = this;
      setTimeout(() => {
        self.form.imageUrl = '';
      }, 500);
    },
    handlePreview(file) {
      console.log(file);
    },
    input(content) {
      this.textContent = content.content;
    },
    ready() {},
    goback() {
      history.go(-1);
    },
    weChatAdd() {
      const self = this;
      this.editorRandom = Math.random();
      setTimeout(() => {
        self.form.textContent = self.textContent;

        self.$refs.form.validate((valid) => {
          if (valid) {
            const data = JSON.parse(JSON.stringify(self.form));

            const selectedLabel = [];
            for (let i = 0; i < self.labelList.length; i++) {
              if (self.labelList[i].checked) {
                selectedLabel.push(self.labelList[i].label);
              }
            }

            if (selectedLabel.length > 0) {
              data.label = selectedLabel.join(',');
            }

            if (data.column != 0) {
              data.label = '';
              data.productUrl = '';
            }

            if (data.imageUrl == '' && data.type != 1 && data.type != 2) {
              self.$message({
                type: 'warning',
                message: '请上传图片！'
              });
              return false;
            }

            if (data.column == 2 && data.productCategoryId == '') {
              self.$message({
                type: 'warning',
                message: '请选择产品大类！'
              });
              return false;
            }

            if (data.type == 1 || data.type == 2) {
              data.textContent = data.textContent2;
              delete data.textContent2;
              delete data.author;
              delete data.brief;
              delete data.label;
              delete data.productUrl;
            }

            if (data.column != 2) {
              delete data.productCategoryId;
            }

            const params = data;
            self.saveing = true;
            if (!self.$route.query.id) {
              self.requestComplaint.contentSave(data).then((data) => {
                self.saveing = false;
                if (data) {
                  self.saveing = false;
                  self.$message({
                    type: 'success',
                    message: '保存成功！'
                  });
                  self.$router.push({
                    path: '/contents/content',
                    query: {
                      column: params.column,
                      type: params.type
                    }
                  });
                }
              });
            } else {
              data.id = self.$route.query.id;
              self.requestComplaint.updateContent(data).then((data) => {
                self.saveing = false;
                if (data) {
                  self.saveing = false;
                  self.$message({
                    type: 'success',
                    message: '保存成功！'
                  });
                  self.$router.push({
                    path: '/contents/content',
                    query: {
                      column: params.column,
                      type: params.type
                    }
                  });
                }
              });
            }
          }
        });
      }, 500);
    },

    handleSizeChange() {},
    handleCurrentChange() {},
    beforeAvatarUpload(file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 <= 500;
      this.uploading = true;

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 500kb!');
        this.uploading = false;
      }

      if (!isImg) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
        this.uploading = false;
      }

      return isImg && isLt2M;
    },
    listlabel() {
      const self = this;
      self.requestComplaint.listlabel().then((data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].checked = false;
        }
        self.labelList = data;

        self.getContentById();
      });
    },
    listProductCategory() {
      const self = this;
      self.requestComplaint.listProductCategory().then((data) => {
        self.productCategory = data;
      });
    },
    getContentById() {
      const self = this;
      const params = {
        id: this.$route.query.id
      };
      if (this.$route.query.id) {
        self.requestComplaint.getContentById(params).then((data) => {
          if (data) {
            self.form = {
              column: `${data.column}`,
              title: data.title, // 标题
              textContent: data.textContent,
              textContent2: data.type == 1 || data.type == 2 ? data.textContent : '',
              author: data.author,
              productUrl: data.productUrl || '',
              imageUrl: data.imageUrl || '',
              type: data.type ? `${data.type}` : '',
              brief: data.brief,
              productCategoryId: parseInt(data.productCategoryId)
            };
            self.fileList2 = [
              {
                url: data.imageUrl
              }
            ];

            if (data.label) {
              for (let i = 0; i < self.labelList.length; i++) {
                if (data.label.indexOf(self.labelList[i].label) >= 0) {
                  self.labelList[i].checked = true;
                }
              }
            }
          }
        });
      }
    }
  },
  mounted() {
    this.listlabel();
    this.listProductCategory();
    this.isView = !!this.$route.query.id;
  }
};
</script>

<style scope>
.content-label-list .el-checkbox {
  margin-left: 0;
  margin-right: 15px;
}
</style>
