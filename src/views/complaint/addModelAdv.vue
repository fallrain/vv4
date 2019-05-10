<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>模范顾问维护</p>
      <div class="clear"></div>
    </div>
    <el-form ref="form" :model="form" label-width="165px">
      <el-form-item label="产业" class="required">
        <el-select v-model="form.productLine" placeholder="请选择产业" style="width: 340px;">
          <el-option v-for="item in productLineOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="星级" class="required">
        <el-select v-model="form.starLv" placeholder="请选择星级" style="width: 340px;">
          <el-option :key="3" label="三星顾问" :value="3"> </el-option>
          <el-option :key="4" label="四星顾问" :value="4"> </el-option>
          <el-option :key="5" label="五星顾问" :value="5"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优先级：" class="required">
        <el-select v-model="form.sort" placeholder="请选择优先级">
          <el-option v-for="item in sortoptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
        <span style="margin-left: 5px;">*数字越小位置越靠前，同一数字配置时间越晚优先级越高</span>
      </el-form-item>
      <el-form-item label="小微：" class="required">
        <el-autocomplete
          style="width: 340px;"
          v-model="form.xwName"
          :props="{ value: 'xwName', label: 'xwName' }"
          :fetch-suggestions="querySearch"
          placeholder="请输入小微进行检索"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="直销员工号" class="required">
        <el-input
          :maxlength="20"
          style="width: 340px;"
          v-model="form.hmcId"
          placeholder="请输入直销员工号"
          @input.native="form.hmcId = form.hmcId.replace(/[^\w\.\/]/gi, '')"
        ></el-input>
      </el-form-item>
      <el-form-item label="直销员姓名" class="required">
        <el-input
          :maxlength="20"
          style="width: 340px;"
          v-model="form.hmcName"
          placeholder="请输入直销员姓名"
          @input.native="form.hmcName = form.hmcName.replace(/\s+/g, '')"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传头像：" class="required">
        <el-upload
          v-if="!form.headImageUrl"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadAdviserHeadImage'"
          :show-file-list="false"
          multiple
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <div class="add-img">+</div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，长宽比例为1:1，且不超过500K</div>
        </el-upload>
        <div v-else class="img-display">
          <i class="close iconfont icon-bohui" @click="form.headImageUrl = ''"></i>
          <div class="imgbox">
            <img :src="form.headImageUrl" />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="上传附件">
        <el-upload
          v-if="!form.videoLink"
          class="upload-demo"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadAdviserVideo'"
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
        starLv: '',
        sort: '',
        hmcId: '',
        hmcName: '',
        headImageUrl: '',
        videoLink: '',
        content: '',
        xwName: '',
        xwId: ''
      },
      xwName: '',
      loading: false,
      saveing: false,
      sortoptions: [],
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
    for (let i = 1; i < 21; i++) {
      this.sortoptions.push(i);
    }
    if (this.$route.query.id) {
      this.requestComplaint.getAdviserDetail({ id: this.$route.query.id }).then((data) => {
        if (data.isSuccess) {
          _this.form = data.data;
        }
      });
    }
  },
  methods: {
    querySearch(queryString, cb) {
      const _this = this;
      const params = {
        xwName: this.form.xwName
      };
      this.requestReport.getXiaoWeiList(params).then((data) => {
        if (data.data) {
          cb(data.data);
        } else {
          cb([]);
        }
      });
    },
    handleSelect(item) {
      console.log(item);
      this.form.xwName = item.xwName;
      this.form.xwId = item.xwId;
    },
    input(content) {
      this.textContent = content.content;
    },
    ready() {},
    handleAvatarSuccess(res, file) {
      if (res.isSuccess) {
        this.form.headImageUrl = res.data.adviserHeadImageUrl;
      } else {
        this.$message.warning(res.msg);
      }
    },
    beforeAvatarUpload(file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 <= 500;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 500K!');
      }

      if (!isImg) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }

      return isImg && isLt2M;
    },
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
        this.form.videoLink = res.data.adviserVideoUrl;
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
          _this.$message.warning('请选择产业');
          return false;
        }
        if (data.starLv == '') {
          _this.$message.warning('请选择星级');
          return false;
        }
        if (data.sort == '') {
          _this.$message.warning('请选择优先级');
          return false;
        }
        if (data.xwId == '' || data.xwName == '') {
          _this.$message.warning('请选择小微');
          return false;
        }
        if (data.hmcId == '') {
          _this.$message.warning('请填写直销员工号');
          return false;
        }
        if (data.hmcName == '') {
          _this.$message.warning('请填写直销员姓名');
          return false;
        }
        if (data.headImageUrl == '') {
          _this.$message.warning('请上传头像');
          return false;
        }
        if (data.content == '') {
          _this.$message.warning('请填写内容');
          return false;
        }
        if (data.content.length > 15000) {
          _this.$message.warning('内容过长，请确认后重新输入');
          return false;
        }
        if (_this.$route.query.id) {
          _this.requestComplaint.updateAdviser(data).then((data) => {
            if (data.isSuccess) {
              _this.$router.push({
                path: '/complaint/modeladviser'
              });
            }
          });
        } else {
          _this.requestComplaint.addAdviser(data).then((data) => {
            if (data.isSuccess) {
              _this.$router.push({
                path: '/complaint/modeladviser'
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
