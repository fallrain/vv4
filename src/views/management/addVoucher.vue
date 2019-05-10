<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>权益券配置</p>
      <div class="clear"></div>
    </div>
    <el-form class="voucher-form" ref="form" :model="form" :rules="rules" label-width="160px">
      <el-form-item label="权益券名称" prop="" class="required">
        <el-input
          style="display: inline-block;width: 400px;"
          v-model="form.name"
          placeholder="请输入权益券名称"
          :maxlength="30"
        ></el-input>
        <span>*最多不超过30字</span>
      </el-form-item>
      <el-form-item label="使用限制说明" class="required">
        <el-input
          style="display: inline-block;width: 400px;"
          v-model="form.useInstruction"
          placeholder="请输入使用限制说明"
          :maxlength="20"
        ></el-input>
        <span>*最多不超过20字</span>
      </el-form-item>
      <el-form-item label="用途" class="required">
        <el-radio-group style="display: inline-block;width: 400px;" v-model="form.useFor">
          <el-radio :label="0">权益券</el-radio>
          <el-radio :label="1">认筹券</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权益券类型" prop="" class="required">
        <el-select
          v-model="form.typeId"
          placeholder="请选择权益券类型"
          style="display: inline-block;width: 400px;"
          :disabled="selectType"
        >
          <el-option v-for="item in typeoptions" :key="item.id" :label="item.value" :value="item.id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权益券Logo" prop="" class="required">
        <el-upload
          v-if="!form.cardLogoUrl"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadVipUserManageCard '"
          :data="{ type: 1 }"
          :show-file-list="false"
          multiple
          :on-success="
            res => {
              return handleAvatarSuccess(res, 1);
            }
          "
          :before-upload="
            res => {
              return beforeAvatarUpload(res, 1);
            }
          "
        >
          <div class="add-img">+</div>
          <div style="margin-left: 20px;" class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，长宽比例为1:1，且不超过500K
          </div>
        </el-upload>
        <div v-else class="img-display">
          <i class="close iconfont icon-bohui" @click="form.cardLogoUrl = ''"></i>
          <div class="imgbox">
            <img :src="form.cardLogoUrl" />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="权益券价格" prop="" class="required">
        <el-input
          style="display: inline-block;width: 400px;"
          :maxlength="8"
          v-model="form.price"
          placeholder="请输入权益券价格"
          @keyup.native="form.price = form.price.replace(/\D/g, '').slice(0, 8)"
        ></el-input>
        <span>(元)</span>
      </el-form-item>
      <el-form-item label="配置说明" prop="" class="required">
        <el-input
          style="display: inline-block;width: 400px;"
          :maxlength="30"
          v-model="form.useRemark"
          placeholder="请输入配置说明"
        ></el-input>
        <span>*最多不超过30字</span>
      </el-form-item>
      <el-form-item label="核销方式" prop="" class="required">
        <el-radio-group v-model="form.useType">
          <el-radio :label="0">第三方核销</el-radio>
          <el-radio :label="1">扫一扫核销</el-radio>
          <el-radio :label="2">录单核销</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="点击跳转第三方核销链接" prop="" v-if="form.useType == 0">
        <el-input
          :maxlength="150"
          style="display: inline-block;width: 400px;"
          v-model="form.cardUrl"
          placeholder="请输入跳转链接"
        ></el-input>
      </el-form-item>
      <el-form-item label="点击跳转认筹详情" prop="" v-if="form.useType == 2">
        <el-input
          :maxlength="150"
          style="display: inline-block;width: 400px;"
          v-model="form.detailsUrl"
          placeholder="请输入跳转链接"
        ></el-input>
      </el-form-item>
      <div class="vip-head-tool">
        <p class="template-brand"><i></i>微信分享信息配置</p>
        <div class="clear"></div>
      </div>
      <!--<el-form-item label="上传分享头像" prop="" class="required" >-->
      <!--<el-upload v-if="!form.shareHeadUrl" :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadVipUserManageCard'" :data="{type:2}" :show-file-list="false" multiple :on-success="(res)=>{return handleAvatarSuccess(res,2)}" :before-upload="(res)=>{return beforeAvatarUpload(res,2)}">-->
      <!--<div class="add-img">+</div>-->
      <!--<div style="margin-left: 20px;" class="el-upload__tip" slot="tip">只能上传jpg/png文件，长宽比例为1:1，且不超过500K</div>-->
      <!--</el-upload>-->
      <!--<div v-else class="img-display" >-->
      <!--<i class="close iconfont icon-bohui" @click="form.shareHeadUrl=''"></i>-->
      <!--<div class="imgbox">-->
      <!--<img :src="form.shareHeadUrl" />-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-form-item>-->
      <el-form-item label="微信分享标题" prop="" class="required">
        <el-input
          style="display: inline-block;width: 400px;"
          v-model="form.shareTitle"
          :maxlength="30"
          placeholder="请输入微信分享标题"
        ></el-input>
        <span>*最多不超过30字</span>
      </el-form-item>
      <!--<el-form-item label="微信分享摘要" prop="" class="required" >-->
      <!--<el-input style="display: inline-block;width: 400px;" v-model="form.shareAbstract" :maxlength="30" placeholder="请输入微信分享摘要"></el-input>-->
      <!--<span>*最多不超过30字</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="上传分享H5内容页banner" prop="" class="required h5-banner">-->
      <!--<el-upload v-if="!form.bannerUrl" :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadVipUserManageCard'" :data="{type:3}" :show-file-list="false" multiple :on-success="(res)=>{return handleAvatarSuccess(res,3)}" :before-upload="(res)=>{return beforeAvatarUpload(res,3)}">-->
      <!--<div class="add-img" style="width: 240px">+</div>-->
      <!--<div style="margin-left: 20px;" class="el-upload__tip" slot="tip">只能上传jpg/png文件，长宽为800*300，且不超过500K</div>-->
      <!--</el-upload>-->
      <!--<div v-else class="img-display"  style="width: 240px">-->
      <!--<i class="close iconfont icon-bohui" @click="form.bannerUrl=''"></i>-->
      <!--<div class="imgbox" style="width: 240px;height: 78px;">-->
      <!--<img :src="form.bannerUrl" />-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-form-item>-->
      <el-form-item label="用户领券页面" prop="" class="required">
        <el-upload
          v-if="!form.bannerSkipImage"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadVipUserManageCard'"
          :data="{ type: 4 }"
          :show-file-list="false"
          multiple
          :on-success="
            res => {
              return handleAvatarSuccess(res, 4);
            }
          "
          :before-upload="
            res => {
              return beforeAvatarUpload(res, 4);
            }
          "
        >
          <div class="add-img">+</div>
          <div style="margin-left: 20px;" class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
        </el-upload>
        <div v-else class="img-display">
          <i class="close iconfont icon-bohui" @click="form.bannerSkipImage = ''"></i>
          <div class="imgbox">
            <img :src="form.bannerSkipImage" />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="上传分享缩略图" prop="" class="required">
        <el-upload
          v-if="!form.thumbnailUrl"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadVipUserManageCard'"
          :data="{ type: 5 }"
          :show-file-list="false"
          multiple
          :on-success="
            res => {
              return handleAvatarSuccess(res, 5);
            }
          "
          :before-upload="
            res => {
              return beforeAvatarUpload(res, 5);
            }
          "
        >
          <div class="add-img">+</div>
          <div style="margin-left: 20px;" class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，长宽比例为1:1，且不超过500K
          </div>
        </el-upload>
        <div v-else class="img-display">
          <i class="close iconfont icon-bohui" @click="form.thumbnailUrl = ''"></i>
          <div class="imgbox">
            <img :src="form.thumbnailUrl" />
          </div>
        </div>
      </el-form-item>
      <!--<el-form-item label="内容配置" prop="" class="required" >-->
      <!--<span style="margin-left: 5px;">*最多不超过200字</span>-->
      <!--<div style="margin-left: 27px;">-->
      <!--<ueditor style="display: inline-block" :value="form.contentConfig" :config="config" v-on:input="input2" v-on:ready="ready" :random="editorRandom"></ueditor>-->
      <!--</div>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button type="primary" style="margin-left: 25px;" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ueditor from '../comm/components/ueditor.vue';
import gUtils from '../../utils/gUtils.js';

export default {
  name: 'addVoucher',
  components: {
    ueditor
  },
  data() {
    return {
      form: {
        name: '',
        useInstruction: '',
        typeId: '',
        price: '',
        useRemark: '',
        useType: 0,
        cardLogoUrl: '',
        cardUrl: '',
        detailsUrl: '',
        shareHeadUrl: '',
        shareTitle: '',
        shareAbstract: '',
        bannerUrl: '',
        contentConfig: '',
        bannerSkipImage: '',
        thumbnailUrl: '',
        useFor: 0
      },
      typeoptions: [
        {
          id: 1,
          value: '挂式空调清洗券'
        },
        {
          id: 2,
          value: '立式空调清洗券'
        },
        {
          id: 3,
          value: '冰箱清洗券'
        },
        {
          id: 4,
          value: '洗衣机清洗券'
        }
      ],
      rules: {},
      config: {
        initialFrameWidth: 900,
        initialFrameHeight: 220
      },
      editorRandom: Math.random(),
      textContent: '',
      textContent2: '',
      selectType: false
    };
  },
  created(e) {
    const _this = this;
    if (this.$route.query.id) {
      this.requestManagement.getVipUserManageCardTypeVoById({ id: this.$route.query.id }).then((data) => {
        if (data.isSuccess) {
          data.data.useType = data.data.useType || 0;
          _this.form = data.data;
        }
      });
    }
  },
  methods: {
    handleAvatarSuccess(res, e) {
      if (res.isSuccess) {
        if (e == 1) {
          this.form.cardLogoUrl = res.data.vipSourceIconUrl;
        }
        if (e == 2) {
          this.form.shareHeadUrl = res.data.vipSourceIconUrl;
        }
        if (e == 3) {
          this.form.bannerUrl = res.data.vipSourceIconUrl;
        }
        if (e == 4) {
          this.form.bannerSkipImage = res.data.vipSourceIconUrl;
        }
        if (e == 5) {
          this.form.thumbnailUrl = res.data.vipSourceIconUrl;
        }
      } else {
        this.$message.warning(res.msg);
      }
    },
    beforeAvatarUpload(file, e) {
      if (e == 4) {
        var isLt2M = file.size / 1024 <= 1024;

        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1M!');
        }
      } else {
        var isLt2M = file.size / 1024 <= 500;

        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 500K!');
        }
      }
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';

      if (!isImg) {
        this.$message.error('上传图片只能是 jpg/png 格式!');
      }
      return isImg && isLt2M;
    },
    input(content) {
      this.textContent = content.content;
    },
    input2(content) {
      this.textContent2 = content.content;
    },
    ready() {},
    // 提交的时候this.editorRandom = Math.random();
    submit() {
      if (this.form.useType == 0) {
        this.form.detailsUrl = '';
      }
      if (this.form.useType == 2) {
        this.form.cardUrl = '';
      }
      if (this.form.useFor == 1) {
        this.form.typeId = 1;
      }
      const _this = this;
      this.editorRandom = Math.random();
      setTimeout(() => {
        const data = JSON.parse(JSON.stringify(_this.form));
        data.contentConfig = _this.textContent2;
        if (_this.$route.query.id) {
          data.id = _this.$route.query.id;
          _this.requestManagement.updateUserManageCarType(data).then((data) => {
            if (data.isSuccess) {
              _this.$router.push({
                path: '/management/rightsvoucher'
              });
            }
          });
        } else {
          _this.requestManagement.saveUserManageCarTyep(data).then((data) => {
            if (data.isSuccess) {
              _this.$router.push({
                path: '/management/rightsvoucher'
              });
            }
          });
        }
      }, 500);
    }
  },
  computed: {
    useFor() {
      return this.form.useFor;
    }
  },
  watch: {
    useFor() {
      if (this.form.useFor == 1) {
        this.form.typeId = '';
        this.selectType = true;
      } else {
        this.selectType = false;
      }
    }
  }
};
</script>

<style scoped>
.add-img {
  width: 80px;
  height: 80px;
  font-size: 32px;
  color: #eee;
  line-height: 80px;
  border: 1px dashed #20a0ff;
}
.img-display {
  position: relative;
  width: 80px;
  height: 81px;
  border-radius: 2px;
  border: 1px solid #cccccc;
  display: inline-block;
}
.imgbox {
  display: table-cell;
  vertical-align: middle;
  width: 80px;
  height: 80px;
  margin: 0;
  position: relative;
  background: #0000;
}

.img-display .close {
  border-radius: 19px;
  display: block;
  color: #45a0f8;
  position: absolute;
  right: -12px;
  top: -11px;
  font-size: 22px;
  line-height: 20px;
  display: none;
  z-index: 9;
}
.imgbox img {
  max-width: 100%;
  max-height: 100%;
}
.img-display:hover .close {
  display: block;
}

.img-display:hover {
  border-color: #45a0f8;
}

.img-display div.imgbox {
  text-align: center;
}
</style>
<style>
.voucher-form .el-form-item__label {
  width: 135px;
  background: rgba(242, 242, 242, 1);
  height: 36px;
  line-height: 36px;
  padding: 0;
  margin: 0 12px;
  text-align: center;
  color: #000000;
}
.h5-banner .el-form-item__label {
  line-height: 1;
  padding-top: 7px;
}
</style>
