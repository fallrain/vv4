<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>星级升级路径维护</p>
      <div class="clear"></div>
    </div>
    <el-form ref="form" :model="form" label-width="165px">
      <el-form-item label="产业" class="required">
        <el-select
          v-model="form.productLine"
          placeholder="请选择产业"
          style="width: 340px;"
          :disabled="$route.query.id != null"
          @change="jychange"
        >
          <el-option v-for="item in productLineOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类" class="required">
        <el-select
          v-model="form.upCategory"
          placeholder="请选择分类"
          style="width: 340px;"
          :disabled="$route.query.id != null"
          @change="jychange"
        >
          <el-option :key="1" label="升级标准" :value="1"> </el-option>
          <el-option :key="2" label="升级路径" :value="2"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传附件">
        <el-upload
          v-if="!form.videoLink"
          class="upload-demo"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadStarUpVideo'"
          :show-file-list="false"
          :before-upload="beforeAvatarUploadVideo"
          :on-success="handleSuccessVideo"
        >
          <el-button size="small" type="primary" :loading="loading">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只支持MP4格式视频，且不超过50M</div>
        </el-upload>
        <div v-else class="video-lvbox">
          <i class="close iconfont icon-bohui" @click="form.videoLink = ''"></i>
          <video width="320" height="240" controls>
            <source :src="form.videoLink" type="video/mp4" />
          </video>
        </div>
      </el-form-item>
      <el-form-item label="内容" class="required">
        <span>*不能添加链接，不能使用表格</span>
        <div>
          <ueditor
            :value="form.content"
            :config="config"
            v-on:input="input"
            v-on:ready="ready"
            :random="editorRandom"
          ></ueditor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add" :loading="saveing">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import gUtils from '../../utils/gUtils.js';
import ueditor from '../comm/components/ueditor.vue';

export default {
  components: {
    ueditor
  },
  data() {
    return {
      form: {
        productLine: '',
        upCategory: '',
        videoLink: '',
        content: ''
      },
      loading: false,
      saveing: false,
      productLineOptions: ['综合', '制冷', '洗护', '空调', '热水器', '厨电', '彩电'],
      config: {
        initialFrameWidth: 1000,
        initialFrameHeight: 320
      },
      editorRandom: Math.random()
    };
  },
  created(e) {
    const _this = this;
    if (this.$route.query.id) {
      this.requestComplaint.getStarUpDetail({ id: this.$route.query.id }).then((data) => {
        if (data.isSuccess) {
          _this.form = data.data;
        }
      });
    }
  },
  methods: {
    jychange(e) {
      if (this.form.productLine && this.form.upCategory) {
        const data = {
          productLine: this.form.productLine,
          upCategory: this.form.upCategory
        };
        this.requestComplaint.isThereStarUp(data).then((data) => {
          if (data.isSuccess) {
          }
        });
      }
    },
    input(content) {
      this.textContent = content.content;
    },
    ready() {},
    beforeAvatarUploadVideo(file) {
      const isImg = file.type === 'video/mp4';
      const isLt2M = file.size / 1024 <= 1024 * 50;
      if (!isLt2M) {
        this.$message.error('上传视频大小不能超过 50M!');
        return isLt2M;
      }

      if (!isImg) {
        this.$message.error('上传视频只能是 MP4 格式!');
        return isImg;
      }
      this.loading = true;
    },
    handleSuccessVideo(res) {
      this.loading = false;
      if (res.isSuccess) {
        this.form.videoLink = res.data.starUpVideoUrl;
      } else {
        this.$message.warning(res.msg);
      }
    },
    add() {
      const _this = this;
      this.editorRandom = Math.random();
      setTimeout(() => {
        _this.form.content = _this.textContent;
        const data = JSON.parse(JSON.stringify(_this.form));
        if (data.productLine == '') {
          _this.$message.warning('产业不能为空');
          return false;
        }
        if (data.upCategory == '') {
          _this.$message.warning('分类不能为空');
          return false;
        }
        if (data.content == '') {
          _this.$message.warning('内容不能为空');
          return false;
        }
        if (data.content.length > 15000) {
          _this.$message.warning('内容过长，请确认后重新输入');
          return false;
        }
        if (_this.$route.query.id) {
          _this.requestComplaint.updateStarUp(data).then((data) => {
            if (data.isSuccess) {
              _this.$router.push({
                path: '/complaint/starmaintain'
              });
            }
          });
        } else {
          _this.requestComplaint.addStarUp(data).then((data) => {
            if (data.isSuccess) {
              _this.$router.push({
                path: '/complaint/starmaintain'
              });
            }
          });
        }
      }, 500);
    }
  },
  mounted(e) {}
};
</script>

<style scoped>
.video-lvbox {
  display: inline-block;
  width: 320px;
  height: 240px;
  position: relative;
}
.video-lvbox .close {
  border-radius: 19px;
  display: block;
  position: absolute;
  right: -12px;
  top: -11px;
  font-size: 22px;
  line-height: 20px;
  z-index: 9;
}
.add-img {
  width: 80px;
  height: 80px;
  font-size: 32px;
  color: #eee;
  line-height: 80px;
  border: 1px dashed #20a0ff;
}
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
  height: 80px;
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
.gui-bianji {
  float: right;
  color: #1fb5fc;
  line-height: 1 !important;
}
.gui-bianji i {
  margin-right: 5px;
  color: #1fb5fc;
}
</style>
