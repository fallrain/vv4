<template>
  <div class="vip-content addresour">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>资源位详情</p>
      <div class="clear"></div>
    </div>
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="资源位名称：" class="required">
        <el-input style="width: 300px" :maxlength="7" v-model="form.name" placeholder="请填写资源位名称"></el-input>
        <span style="margin-left: 5px;">*该名称展示在直销员前端资源位，最长不超过7个汉字</span>
      </el-form-item>
      <el-form-item label="优先级：" class="required">
        <el-select v-model="form.sort" placeholder="请选择优先级">
          <el-option v-for="item in sortoptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
        <span style="margin-left: 5px;">*数字越小位置越靠前，同一数字配置时间越晚优先级越高</span>
      </el-form-item>
      <el-form-item label="小微配置：" class="required">
        <el-tooltip class="item" :disabled="xwtooldis" effect="light" :content="form.xiaoweiName" placement="top">
          <el-input
            style="width: 300px"
            :disabled="disabled"
            v-model="form.xiaoweiName"
            @focus="pickerXiaowei"
            @blur="disabled = false"
          ></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="渠道配置：" class="required">
        <el-checkbox-group v-model="yxchannel" @change="channelchange" style="display: inline-block">
          <el-checkbox v-for="item in channel" :label="item"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="上传资源位图标：" class="required">
        <el-upload
          v-if="!form.icon"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadVipSourceIcon'"
          :show-file-list="false"
          multiple
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <div class="add-img">+</div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，长宽比例为1:1，且不超过500K</div>
        </el-upload>
        <div v-else class="img-display">
          <i class="close iconfont icon-bohui" @click="form.icon = ''"></i>
          <div class="imgbox">
            <img :src="form.icon" />
          </div>
        </div>
        <!--<img v-else :src="imageUrl" alt="" style="width: 80px;height: 80px">-->
      </el-form-item>
      <el-form-item label="说明配置：" class="required">
        <span style="margin-left: 5px;"
          >*该说明在兑呗前端展示给直销员，告知直销员该资源是什么，如何使用，或者是可发给哪些用户对象等等，分行描述</span
        >
        <div>
          <!--<el-input type="textarea" style="width: 800px;"  placeholder="请输入说明配置" v-model="form.desc">-->
          <!--</el-input>-->
          <ueditor
            :value="form.desc"
            :config="config"
            v-on:input="input"
            v-on:ready="ready"
            :random="editorRandom"
          ></ueditor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add(3)">保存</el-button>
        <el-button type="primary" @click="add(1)">提交</el-button>
      </el-form-item>
    </el-form>

    <!--选择小微-->
    <el-dialog
      class="xiaowei-dialog trs-dialog"
      title=""
      :visible.sync="xwdialog"
      :before-close="xiaoweiDialogCloas"
      :modal-append-to-body="false"
    >
      <div class="xiaowei-dialog-header">
        <p>
          选择权益活动小微：<a href="javascript:;" v-show="xiaoweiBtn" @click="areaCheckAll">全选</a
          ><a href="javascript:;" v-show="!xiaoweiBtn" @click="cancelareaCheckAll">取消全选</a>
        </p>
        <el-checkbox-group v-model="xiaowei">
          <el-checkbox v-for="item in areaList" :label="item" @change="areaCheck">{{ item.xwName }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="xiaoweiSelect" class="trs-btn" style="width:194px;">确认选择 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ueditor from '../comm/components/ueditor.vue';
import gUtils from '../../utils/gUtils.js';

export default {
  name: 'addresources',
  components: {
    ueditor
  },
  data() {
    return {
      textContent: '',
      imageUrl: '',
      xwdialog: false,
      disabled: false,
      xwtooldis: true,
      mddis: false,
      shopName: '',
      beforeshopName: '',
      selectStoreShow: true,
      sortoptions: [],
      allxuan: '取消全选',
      xiaowei: [],
      beforexiaowei: [],
      xiaoweiBtn: true,
      areaList: [],
      channel: [],
      yxchannel: [],
      form: {
        name: '',
        sort: '',
        xiaoweiName: '所有小微',
        xiaoweiId: 'all',
        channel: '',
        icon: '',
        desc: '',
        status: ''
      },
      textContent: '',
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
    this.requestRights.listArea().then((data) => {
      if (data) {
        _this.areaList = data;
        if (!_this.$route.query.id) {
          _this.xiaowei = data;
        }
      }
    });
    this.requestRights.listChannelById({ id: 2 }).then((data) => {
      if (data) {
        _this.channel = data;
        if (!_this.$route.query.id) {
          for (const i in data) {
            _this.yxchannel.push(data[i]);
          }
          _this.form.channel = _this.yxchannel.join(',');
        }
      }
    });
    if (this.$route.query.id) {
      this.requestManagement.getVipSourceDetail({ id: this.$route.query.id }).then((data) => {
        if (data.isSuccess) {
          if (data.data.xiaoweiName == '所有小微') {
            setTimeout(() => {
              _this.xiaowei = _this.areaList;
            }, 200);
            _this.xiaoweiBtn = false;
          } else {
            let xwname = [];
            xwname = data.data.xiaoweiName ? data.data.xiaoweiName.split(',') : [];
            setTimeout(() => {
              for (let a = 0; a < xwname.length; a++) {
                for (let b = 0; b < _this.areaList.length; b++) {
                  if (xwname[a] == _this.areaList[b].xwName) {
                    _this.xiaowei.push(_this.areaList[b]);
                  }
                }
              }
            }, 200);
          }
          setTimeout(() => {
            _this.yxchannel = data.data.channel.split(',');
          }, 200);
          // 处理多行文本框
          // let mydesc=data.data.desc.split("<p>")
          // mydesc= mydesc.splice(1,mydesc.length)
          // let a=""
          // for(let i in mydesc){
          //     mydesc[i]=mydesc[i].replace("</p>","");
          //     mydesc[i]=mydesc[i]+"\n"
          //     a=a+ mydesc[i]
          // }
          // if(a=="\n"){
          //     a=""
          // }
          // data.data.desc=a

          _this.form = data.data;
        }
      });
    }
  },
  methods: {
    channelchange(e) {
      this.form.channel = e.join(',');
    },
    handleAvatarSuccess(res, file) {
      if (res.isSuccess) {
        this.form.icon = res.data.vipSourceIconUrl;
      } else {
        this.$message.warning(res.msg);
      }
    },
    beforeAvatarUpload(file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 <= 500;
      console.log(file);
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 500K!');
      }

      if (!isImg) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }

      return isImg && isLt2M;
    },
    xiaoweiDialogCloas() {
      this.xiaowei = this.beforexiaowei;
      this.xwdialog = false;
    },
    pickerXiaowei() {
      this.xwdialog = true;
      this.beforexiaowei = this.xiaowei;
      if (this.xiaowei.length == this.areaList.length) {
        this.xiaoweiBtn = false;
      } else {
        this.xiaoweiBtn = true;
      }
    },
    areaCheckAll() {
      this.xiaowei = this.areaList;
      this.xiaoweiBtn = false;
    },
    cancelareaCheckAll() {
      this.xiaowei = [];
      this.xiaoweiBtn = true;
    },
    areaCheck() {
      if (this.xiaowei.length == 42) {
        this.allxuan = '取消全选';
      } else {
        this.allxuan = '全选';
      }
    },
    xiaoweiSelect() {
      const _this = this;
      if (this.xiaowei.length == 0) {
        this.$message({
          message: '请选择小微',
          type: 'warning'
        });
        return;
      }
      if (this.xiaowei.length == 42) {
        this.form.xiaoweiName = '所有小微';
        this.form.xiaoweiId = 'all';
      } else {
        const xiaoweiName = [];
        const xiaoweiId = [];
        this.xiaowei.forEach((el) => {
          xiaoweiName.push(el.xwName);
          xiaoweiId.push(el.xwId);
        });
        this.form.xiaoweiName = xiaoweiName.join(',');
        this.form.xiaoweiId = xiaoweiId.join(',');
      }
      this.xwdialog = false;
      this.xwtooldis = false;
    },
    input(content) {
      this.textContent = content.content;
    },
    ready() {},
    add(e) {
      const self = this;
      const a = '';
      this.editorRandom = Math.random();
      const data = JSON.parse(JSON.stringify(self.form));
      setTimeout(() => {
        self.form.desc = self.textContent;
        const data = JSON.parse(JSON.stringify(self.form));
        // data.desc = data.desc.replace(/\n/g, '<br/>').split("<br/>")
        // for(let i in data.desc){
        //     data.desc[i]="<p>"+data.desc[i]+"</p>"
        //     a=a+data.desc[i]
        // }
        // if(a=="<p></p>"){
        //     a=""
        // }
        // data.desc=a
        data.status = e;

        if (data.name == '') {
          self.$message({
            type: 'warning',
            message: '请填写资源位名称！'
          });
          return;
        }
        if (e == 1) {
          if (data.sort == '') {
            self.$message({
              type: 'warning',
              message: '请选择优先级！'
            });
            return;
          }
          if (data.channel == []) {
            self.$message({
              type: 'warning',
              message: '请选择渠道！'
            });
            return;
          }
          if (data.desc == '') {
            self.$message({
              type: 'warning',
              message: '请填写说明配置！'
            });
            return;
          }
          if (data.icon == '') {
            self.$message({
              type: 'warning',
              message: '请上传Icon！'
            });
            return;
          }
        }
        if (self.$route.query.id) {
          // 修改
          data.id = self.$route.query.id;
          self.requestManagement.updateVipSource(data).then((data) => {
            if (data.isSuccess) {
              self.$router.push({
                path: '/rights/resources'
              });
            }
          });
        } else {
          // 新增
          self.requestManagement.addVipSource(data).then((data) => {
            if (data.isSuccess) {
              self.$router.push({
                path: '/rights/resources'
              });
            }
          });
        }
      }, 500);
    }
  }
};
</script>

<style scoped>
.xiaowei-dialog-header > p a {
  width: auto;
  padding: 0 5px;
  height: 18px;
  border: 1px solid #cccccc;
  border-radius: 2px;
  color: #45a0f8;
  font-weight: normal;
  display: inline-block;
  text-align: center;
  line-height: 18px;
  float: right;
}
.xiaowei-dialog .xiaowei-dialog-header > p {
  margin-bottom: 12px;
  font-weight: bold;
}
.xiaowei-dialog .el-dialog {
  width: 240px;
}
.xiaowei-dialog .el-checkbox-group {
  height: 206px;
  overflow: auto;
}
.xiaowei-dialog .el-checkbox {
  display: block;
  margin-left: 0;
}
.xiaowei-dialog .el-dialog__body {
  margin-top: -30px;
  padding-bottom: 10px;
}
.xiaowei-dialog .xiaowei-dialog-header > p {
  margin-bottom: 12px;
  font-weight: bold;
}
.select-all-shop {
  width: auto;
  padding: 0 5px;
  height: 24px;
  border: 1px solid #ccc;
  border-radius: 2px;
  color: #45a0f8;
  font-weight: normal;
  display: inline-block;
  text-align: center;
  line-height: 24px;
  margin-bottom: 10px;
  margin-top: 10px;
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
.add-img {
  width: 80px;
  height: 80px;
  font-size: 32px;
  color: #eee;
  line-height: 80px;
  border: 1px dashed #20a0ff;
}
</style>
<style>
.xwdialog .el-dialog {
  width: 240px;
}
.addresour .el-textarea__inner {
  height: 130px;
}
</style>
