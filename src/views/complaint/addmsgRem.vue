<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>消息提醒设置</p>
      <div class="clear"></div>
    </div>
    <el-form ref="form" :model="form" label-width="165px">
      <el-form-item label="标题" class="required">
        <el-input :maxlength="20" style="width: 340px;" v-model="form.title" placeholder="请输入标题"></el-input>
        <span>*最多不超过20字</span>
      </el-form-item>
      <el-form-item label="栏目" class="required">
        <el-select v-model="form.columnId" placeholder="请选择栏目" style="width: 340px;">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.columnTitle"
            :value="item.id"
            class="addguibox"
          >
            <span style="float: left">
              <img style="width: 20px;height: 20px;" :src="item.columnIcon" alt="" /><span
                style="vertical-align: middle;margin-left: 5px;"
                >{{ item.columnTitle }}</span
              ></span
            >
            <span class="gui-bianji" @click="bianji(item)"><i class="iconfont icon-xiugai"></i>编辑</span>
          </el-option>
        </el-select>
        <el-button @click="addcolumn" type="primary" style="margin-left: 10px;padding: 5px 15px;">新增栏目</el-button>
      </el-form-item>
      <el-form-item label="发送时间" class="required">
        <el-date-picker
          class="msgrem-sendtime"
          style="width: 340px;"
          :editable="false"
          v-model="sendTime"
          @change="timeChange"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择发送时间"
          :picker-options="pickerOptions0"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="服务通知" class="required">
        <el-radio-group v-model="form.serviceNotify" style="margin-bottom: -5px;" @change="tzChange">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="-1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="短信提醒内容" class="required" v-if="form.serviceNotify == 1">
        <el-input
          :maxlength="100"
          style="width: 340px;"
          v-model="form.smsContent"
          placeholder="请输入短信提醒内容"
        ></el-input>
        <span>*最多不超过100字</span>
      </el-form-item>
      <el-form-item label="上传附件">
        <el-upload
          v-if="!form.videoLink"
          class="upload-demo"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadMessageRemindingVideo'"
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
      <el-form-item label="内容">
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

    <!--编辑栏目-->
    <el-dialog :title="columntitle" :visible.sync="columnDialog" :modal-append-to-body="false">
      <el-form ref="column" :model="column" label-width="165px">
        <el-form-item label="栏目标题" class="required">
          <el-input
            :maxlength="20"
            style="width: 340px;"
            v-model="column.columnTitle"
            placeholder="请输入栏目标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="栏目Icon" class="required">
          <el-upload
            v-if="!column.columnIcon"
            class="columnicon"
            :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadMessageRemindingIcon'"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleSuccess"
          >
            <div class="add-img">+</div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，长度比例1:1，长宽在30px内，且不超过1M</div>
          </el-upload>
          <div v-else class="img-display">
            <i class="close iconfont icon-bohui" @click="column.columnIcon = ''"></i>
            <div class="imgbox">
              <img :src="column.columnIcon" />
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="cuncolumn">保存</el-button>
          <em v-if="is_del">
            <el-button type="primary" @click="delcolumn">删除</el-button
            ><span style="margin-left: 10px;">*删除栏目将会删除栏目下的消息提醒，请谨慎删除</span>
          </em>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import gUtils from '../../utils/gUtils.js';
import ueditor from '../comm/components/ueditor.vue';

export default {
  components: {
    ueditor
  },
  name: 'addmsgRem',
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      sendTime: '',
      form: {
        id: '',
        columnId: '',
        title: '',
        videoLink: '',
        content: '',
        sendTime: '',
        serviceNotify: -1,
        smsContent: ''
      },
      textContent: '',
      column: {
        id: '',
        columnIcon: '',
        columnTitle: ''
      },
      saveing: false,
      columnDialog: false,
      details: [],
      options: [],
      is_del: false,
      columntitle: '新增栏目',
      config: {
        initialFrameWidth: 1000,
        initialFrameHeight: 320
      },
      editorRandom: Math.random(),
      loading: false
    };
  },
  created(e) {
    if (this.$route.query.id) {
      const _this = this;
      this.requestComplaint.selectMessageRemindingTitle({ id: this.$route.query.id }).then((data) => {
        if (data.isSuccess) {
          _this.form.id = data.data.id;
          _this.form.columnId = data.data.columnId;
          _this.form.title = data.data.title;
          _this.form.videoLink = data.data.videoLink;
          _this.form.content = data.data.content;
          _this.sendTime = data.data.sendTime;
          _this.form.serviceNotify = data.data.serviceNotify;
          _this.form.smsContent = data.data.smsContent;
        }
      });
    }
  },
  methods: {
    tzChange(e) {
      if (e == -1) {
        this.form.smsContent = '';
      }
    },
    timeChange(e) {
      this.form.sendTime = e;
    },
    input(content) {
      this.textContent = content.content;
    },
    ready() {},
    add() {
      const _this = this;
      this.editorRandom = Math.random();
      setTimeout(() => {
        _this.form.content = _this.textContent;
        const data = JSON.parse(JSON.stringify(_this.form));
        if (data.serviceNotify == 1 && data.smsContent == '') {
          _this.$message.warning('请输入短信提醒内容');
          return false;
        }
        _this.requestComplaint.saveMessageRemindingTitle(data).then((data) => {
          if (data.isSuccess) {
            _this.$router.push({
              path: '/complaint/msgremind'
            });
          }
        });
      }, 500);
    },
    cuncolumn() {
      const _this = this;
      const data = JSON.parse(JSON.stringify(this.column));
      if (data.columnTitle == '') {
        this.$message.warning('请输入栏目标题');
        return false;
      }
      if (data.columnIcon == '') {
        this.$message.warning('请上传栏目Icon');
        return false;
      }
      this.requestComplaint.saveMessageRemindingColumn(data).then((data) => {
        if (data.isSuccess) {
          _this.form.columnId = data.data.id;
          _this.querycolumn();
          _this.columnDialog = false;
        }
      });
    },
    querycolumn() {
      const _this = this;
      this.requestComplaint.selectMessageRemindingColumn().then((data) => {
        if (data.isSuccess) {
          _this.options = data.data;
        }
      });
    },
    delcolumn() {
      const _this = this;
      _this.columnDialog = false;
      this.$confirm('此操作将永久删除该栏目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.requestComplaint.deleteMessageRemindingColumnAndTitle({ id: this.column.id }).then((data) => {
            _this.columnDialog = false;
            _this.form.columnId = '';
            if (data.isSuccess) {
              _this.querycolumn();
            }
          });
        })
        .catch(() => {
          _this.columnDialog = true;
        });
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
    beforeAvatarUpload(file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 <= 1024;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 1M!');
      }

      if (!isImg) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }

      return isImg && isLt2M;
    },
    handleSuccess(res) {
      if (res.isSuccess) {
        this.column.columnIcon = res.data.useHelpImageUrl;
      } else {
        this.$message.warning(res.msg);
      }
    },
    handleSuccessVideo(res) {
      this.loading = false;
      if (res.isSuccess) {
        this.form.videoLink = res.data.useHelpVideoUrl;
      } else {
        this.$message.warning(res.msg);
      }
    },
    addcolumn() {
      this.columntitle = '新增栏目';
      this.is_del = false;
      this.columnDialog = true;
      this.column = {
        id: '',
        columnIcon: '',
        columnTitle: ''
      };
    },
    bianji(e) {
      this.columntitle = '编辑栏目';
      this.is_del = true;
      this.columnDialog = true;
      this.column.id = e.id;
      this.column.columnIcon = e.columnIcon;
      this.column.columnTitle = e.columnTitle;
    }
  },
  mounted(e) {
    this.querycolumn();
  }
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
<style>
.addguibox + .el-select-dropdown__item.selected .gui-bianji {
  color: white;
}
.addguibox + .el-select-dropdown__item.selected .gui-bianji i {
  color: white;
}
.el-time-spinner.has-seconds .el-time-spinner__wrapper {
  width: 33.1%;
}
</style>
