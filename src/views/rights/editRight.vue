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
        <el-select v-model="form.brandName" style="width: 300px;" @change="columnChange">
          <el-option label="海尔" value="haier"></el-option>
          <el-option label="卡萨帝" value="casarte"></el-option>
          <el-option label="统帅" value="tongshuai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权益名称" prop="rightsName">
        <el-input v-model="form.rightsName" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="权益描述" prop="rightsDesc">
        <ueditor
          :value="form.rightsDesc"
          :config="config"
          v-on:input="input"
          v-on:ready="ready"
          :random="editorRandom"
        ></ueditor>
      </el-form-item>
      <el-form-item label="权益亮图片" class="is-required">
        <el-upload
          class="upload-demo"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadRightsImage'"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList1"
          list-type="picture"
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button v-if="form.imageUrl == ''" size="small" type="primary">点击上传</el-button>
          <div v-if="form.imageUrl == ''" slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="权益暗图片" class="is-required">
        <el-upload
          class="upload-demo"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadRightsImage'"
          :on-preview="handlePreview"
          :on-remove="handleRemove2"
          :file-list="fileList2"
          list-type="picture"
          :on-success="uploadSuccess2"
          :before-upload="beforeAvatarUpload"
        >
          <el-button v-if="form.darkImageUrl == ''" size="small" type="primary">点击上传</el-button>
          <div v-if="form.darkImageUrl == ''" slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="randDisplay" label="权益所属等级" class="is-required">
        <el-checkbox-group v-model="form.rankIds">
          <el-checkbox
            v-if="rank.rankName != '黑名单'"
            v-for="rank in memberRank"
            :key="rank.id"
            :label="rank.id"
            style="margin-right:10px;"
            >{{ rank.rankName }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>

      <el-form-item
        v-if="
          jurisdiction['rightsOperations:rightsStrategy:save'] || jurisdiction['rightsOperations:rightsStrategy:edit']
        "
      >
        <el-button type="primary" @click="weChatAdd" :loading="saveing">保存</el-button>
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
    return {
      isEdit: false,
      title: '新建权益',
      saveing: false,
      form: {
        brandName: 'haier',
        rightsName: '',
        rightsDesc: '',
        rankIds: [],
        imageUrl: '',
        darkImageUrl: ''
      },
      rightsDesc: '',
      memberRank: [],
      randDisplay: false,
      rules: {
        rightsName: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入权益名称',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '长度不可超过30个字符',
            trigger: 'blur'
          }
        ],
        rightsDesc: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入权益描述',
            trigger: 'blur'
          }
        ]
      },
      fileList1: [],
      fileList2: [],
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 320
      },
      editorRandom: Math.random()
    };
  },
  methods: {
    columnChange() {
      if (this.memberRank.length > 0) {
        this.form.rankIds = [];
        this.memberRank = [];
        this.queryMemberRank();
      }
    },
    input(content) {
      // this.form.rightsDesc = content.content;
      this.rightsDesc = content.content;
    },
    ready(content) {},
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
    uploadSuccess2(response, file, fileList) {
      if (response.isSuccess) {
        this.form.darkImageUrl = response.data.rigthsImageUrl;
      }
    },
    handleRemove2(file, fileList) {
      const self = this;
      setTimeout(() => {
        self.form.darkImageUrl = '';
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
    // 变更有效期清空时间
    expiredTimeChange() {
      if (this.form.neverExpired == 1) {
        this.dateRange = [];
      }
    },
    goback() {
      history.go(-1);
    },
    queryMemberRank(rank) {
      const self = this;
      const data = {
        brandName: this.form.brandName
      };
      this.requestComplaint.queryRank(data).then((data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].id = `${data[i].id}`;
        }
        self.memberRank = self.memberRank.concat(data);
        self.randDisplay = true;
      });
    },
    weChatAdd() {
      const self = this;

      this.editorRandom = Math.random();
      setTimeout(() => {
        self.form.rightsDesc = self.rightsDesc;
        self.$refs.form.validate((valid) => {
          if (valid) {
            if (self.form.imageUrl == '') {
              self.$message({
                type: 'warning',
                message: '请上传权益亮图片！'
              });
              return false;
            }

            if (self.form.darkImageUrl == '') {
              self.$message({
                type: 'warning',
                message: '请上传权益暗图片！'
              });
              return false;
            }

            if (self.form.rankIds.length == 0) {
              self.$message({
                type: 'warning',
                message: '请选择权益所属等级'
              });
              return false;
            }

            const data = JSON.parse(JSON.stringify(self.form));

            data.rankIds = data.rankIds.join(',');

            self.saveing = true;
            if (data.id) {
              self.requestComplaint.wechatRightsUpdate(data).then((data) => {
                self.saveing = false;
                if (data) {
                  self.$message({
                    type: 'success',
                    message: '保存成功!'
                  });
                  setTimeout(() => {
                    self.$router.push({
                      path: '/rights/rightsmanage'
                    });
                  }, 800);
                }
              });
            } else {
              self.requestComplaint.wechatRightsSave(data).then((data) => {
                self.saveing = false;
                if (data) {
                  self.$message({
                    type: 'success',
                    message: '保存成功!'
                  });
                  setTimeout(() => {
                    self.$router.push({
                      path: '/rights/rightsmanage'
                    });
                  }, 800);
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
        this.requestComplaint
          .getWechatRightsById({
            id: self.$route.query.id
          })
          .then((data) => {
            if (data) {
              self.form = {
                brandName: data.brandName,
                id: data.id,
                rightsName: data.rightsName,
                rightsDesc: data.rightsDesc,
                rankIds: data.rankIds.split(','),
                imageUrl: data.imageUrl || '',
                darkImageUrl: data.darkImageUrl || ''
              };

              setTimeout(() => {
                self.form.rankIds = data.rankIds.split(',');
              }, 1000);

              if (data.imageUrl && data.imageUrl != '') {
                self.fileList1 = [
                  {
                    url: data.imageUrl
                  }
                ];
              }
              if (data.darkImageUrl && data.darkImageUrl != '') {
                self.fileList2 = [
                  {
                    url: data.darkImageUrl
                  }
                ];
              }

              self.queryMemberRank();

              self.dateRange = [data.startTime, data.expiredTime];
            }
          });
      } else {
        this.form = {
          brandName: 'haier',
          rightsName: '',
          rightsDesc: '',
          rankIds: [],
          imageUrl: '',
          darkImageUrl: ''
        };
        this.queryMemberRank();
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    this.weChatGet();
    if (this.$route.query.id) {
      this.title = '权益详情';
      this.isEdit = true;
    }
  }
};
</script>
