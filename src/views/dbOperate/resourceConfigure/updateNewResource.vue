<template>
  <div style="padding: 20px;" class="updateResourceConfigure">
    <div class="header">
      <p class="template-brand"><i></i>修改实物资源位配置</p>
    </div>
    <div class="body">
      <el-form ref="form" label-width="130px">
        <el-form-item label="资源位名称：">
          <el-input v-model="updateObj.name" style="width: 40%" :maxlength="7"></el-input>
          <span style="padding-left: 20px">*该名称展示在直销员前端资源位，最长不超过7个字</span>
        </el-form-item>
        <el-form-item label="优先级：">
          <el-input v-model.number="updateObj.sort" style="width: 15%" :maxlength="2" type="text"></el-input>
          <span style="padding-left: 20px">*数字越小位置越靠前，同一数字配置时间越晚优先级越高</span>
        </el-form-item>
        <el-form-item label="资源位类型：">
          <!-- <el-radio-group v-model="sourceType">
				    <el-radio :label="0">权益券资源位</el-radio>
				    <el-radio :label="1">实物资源位</el-radio>

				  </el-radio-group> -->
          <el-radio-group v-model="sourceType">
            <el-radio :label="0">权益券资源位</el-radio>
            <el-radio :label="1">实物资源位</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动区域：">
          <el-tooltip class="item" effect="light" :content="showXwName" placement="top">
            <el-input v-model="showXwName" style="width: 15%;cursor: pointer;" @focus="selectXw" readonly></el-input>
          </el-tooltip>
          <span style="padding-left: 20px">*点击可选择小微</span>
        </el-form-item>
        <el-form-item label="渠道配置：" class="qudao">
          <el-checkbox-group v-model="updateObj.channel">
            <el-checkbox label="超市" name="channel"></el-checkbox>
            <el-checkbox label="五星" name="channel"></el-checkbox>
            <el-checkbox label="国美" name="channel"></el-checkbox>
            <el-checkbox label="综合店" name="channel"></el-checkbox>
            <el-checkbox label="社区专卖" name="channel"></el-checkbox>
            <el-checkbox label="苏宁" name="channel"></el-checkbox>
            <el-checkbox label="VIP客户" name="channel"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="资源位图标：">
          <el-upload
            class="avatar-uploader"
            :action="this.apiUrl + 'vipcenter/upload/uploadVipSourceIcon'"
            :show-file-list="true"
            :on-remove="deletePic"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrlFlag" :src="imageUrl" class="avatar" />
            <i v-if="!imageUrlFlag" class="el-icon-plus avatar-uploader-icon" style="border: 1px dashed #ccc;"></i>
          </el-upload>
          <span>*只能上传jpg/png文件，长宽比例为1:1</span>
        </el-form-item>
      </el-form>
      <div class="editArea">
        <el-form ref="form" :model="form" :rules="rules" label-width="165px">
          <el-form-item label="配置说明：" prop="rightsDesc"
            ><p>* 该说明在兑呗前端展示给直销员，告知直销员该资源是什么，如何使用，或者是可发给那些用户对象等等</p>
            <ueditor
              :value="form.rightsDesc"
              :config="config"
              v-on:input="input"
              v-on:ready="ready"
              :random="editorRandom"
            ></ueditor>
          </el-form-item>
        </el-form>
      </div>

      <el-form class="btnQuery">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="quit">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="selectxiaoweiDialog">
      <el-dialog title="选择小微" :visible.sync="selectxwFlag" :before-close="qxSelectXw" :modal-append-to-body="false">
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="updateXwArr">
          <el-checkbox v-for="item in xwArr" :label="item" v-bind:checked="isChecked(item.xwName)" :key="item.xwName">{{
            item.xwName
          }}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="qdSelectXw">确 定</el-button>
          <el-button type="primary" @click="qxSelectXw" style="background-color: #909399;border-color: #909399"
            >取 消</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
import ueditor from '../../comm/components/ueditor.vue';

export default {
  components: {
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
      detailsObj: {},
      updateObj: {},
      selectxwFlag: false,
      checkAll: false,
      isIndeterminate: true,
      xwArr: [],
      beforSelectArr: [],
      updateXwArr: [],
      sourceType: 0,
      imageUrl: '',
      imageUrlFlag: false,
      xwNum: 0,
      showXwName: '',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 200
      },
      editorRandom: Math.random(),
      form: {
        rightsDesc: ''
      },
      rightsDesc: '',
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
      }
    };
  },
  methods: {
    input(content) {
      // this.form.rightsDesc = content.content;
      this.rightsDesc = content.content;
    },
    ready(content) {},
    handleCheckAllChange(val) {
      this.updateXwArr = this.checkAll ? this.xwArr : [];
    },
    checkRate(input) {
      const re = /^[0-9]+.?[0-9]*$/; // 判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/

      if (!re.test(input)) {
        return true;
      }
      return false;
    },
    onSubmit() {
      if (this.checkRate(this.updateObj.sort)) {
        this.$message({
          type: 'warning',
          message: '优先级需为非负数字'
        });
        return;
      } if (this.updateObj.sort < 0) {
        this.$message({
          type: 'warning',
          message: '优先级需为非负数字'
        });
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        target: '#app-view',
        background: 'rgba(255, 255, 255, 0.7)'
      });
      if (this.updateXwArr.length > this.xwArr.length) {
        this.updateXwArr.splice(0, this.updateXwArr.length / 2);
      }
      let str = '';
      let idStr = '';
      for (var i = 0; i < this.updateXwArr.length; i++) {
        if (i == 0) {
          str += this.updateXwArr[i].xwName;
        } else {
          str = `${str},${this.updateXwArr[i].xwName}`;
        }
      }
      for (var i = 0; i < this.updateXwArr.length; i++) {
        if (i == 0) {
          idStr += this.updateXwArr[i].xwId;
        } else {
          idStr = `${idStr},${this.updateXwArr[i].xwId}`;
        }
      }
      this.updateObj.xiaoweiName = str;
      this.updateObj.xiaoweiId = idStr;
      const qudaoStr = this.updateObj.channel.join(',');
      const params = new Object();
      params.id = this.detailsObj.id;
      params.name = this.updateObj.name;
      params.sort = this.updateObj.sort;
      const nameArr = this.updateObj.xiaoweiName.split(',');
      if (nameArr.length == this.xwArr.length) {
        params.xiaoweiId = 'all';
        params.xiaoweiName = '所有小微';
      } else {
        params.xiaoweiId = this.updateObj.xiaoweiId;
        params.xiaoweiName = this.updateObj.xiaoweiName;
      }
      params.channel = qudaoStr;
      params.desc = this.rightsDesc;
      params.status = this.detailsObj.status;
      // params.icon = "https://vipcent.haier.net/wechat/vipSourceIcon/3948eb3a7427413bbaf60c6fbbbfd5ae.jpeg";
      params.icon = this.detailsObj.icon;
      params.sourceType = this.sourceType;
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/vipUserManageSource/updateVipSourceByJH`, params)
        .then((response) => {
          loading.close();
          if (response.data.isSuccess == true) {
            that.$message({
              type: 'success',
              message: '修改成功'
            });
            that.$router.push('/dbOperate/resourceConfigure');
          } else {
            that.$message({
              type: 'warning',
              message: '选项都为必填，请填写完整'
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleAvatarSuccess(res, file, fileList) {
      if (res.isSuccess == true) {
        this.imageUrl = URL.createObjectURL(file.raw);
        if (this.imageUrlFlag == true && fileList.length > 1) {
          fileList.shift();
        } else {
          this.imageUrlFlag = true;
        }
        this.detailsObj.icon = res.data.vipSourceIconUrl;
      } else {
        fileList.pop();
        this.$message.warning(res.msg);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M && isPNG;
    },
    // 选择小微：
    selectXw() {
      this.beforSelectArr = this.updateXwArr;
      this.selectxwFlag = true;
      if (this.updateXwArr.length == this.xwNum) {
        this.checkAll = true;
      }
      // console.log(this.updateObj.xiaoweiName);
      // if(this.updateObj.xiaoweiName=="所有小微"){
      // 	this.checkAll = true;
      // }
    },
    deletePic(file, fileList) {
      this.imageUrlFlag = false;
      this.imageUrl = '';
      this.detailsObj.icon = '';
    },
    handlePreview() {},
    qxSelectXw() {
      this.updateXwArr = this.beforSelectArr;

      this.selectxwFlag = false;
    },
    qdSelectXw() {
      if (this.updateXwArr.length > this.xwArr.length) {
        this.updateXwArr.splice(0, this.updateXwArr.length / 2);
      }
      let str = '';
      for (let i = 0; i < this.updateXwArr.length; i++) {
        if (i == 0) {
          str += this.updateXwArr[i].xwName;
        } else {
          str = `${str},${this.updateXwArr[i].xwName}`;
        }
      }
      if (this.updateXwArr.length == 0) {
        this.showXwName = '未选择';
      } else if (this.updateXwArr.length >= this.xwArr.length) {
        this.showXwName = '所有小微';
      } else {
        this.showXwName = str;
      }
      this.selectxwFlag = false;
    },
    getDetails() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        target: '#app-view',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      });
      const { id } = this.$route.query;
      this.sourceType = this.$route.query.sourceType;
      const that = this;
      axios
        .post(
          `${this.apiUrl}vipcenter/vipUserManageSource/getVipSourceDetail`,
          qs.stringify({
            id
          })
        )
        .then((response) => {
          loading.close();
          if (response.data.isSuccess == true) {
            that.detailsObj = response.data.data;
            that.updateObj = that.detailsObj;
            // 渲染小微：
            that.showXwName = response.data.data.xiaoweiName;
            that.form.rightsDesc = response.data.data.desc;
            that.rightsDesc = response.data.data.desc;
            if (that.updateObj.xiaoweiName == '所有小微') {
              for (var i = 0; i < that.xwArr.length; i++) {
                var obj = {};
                obj.xwName = that.xwArr[i].xwName;
                obj.xwId = that.xwArr[i].xwId;
                that.updateXwArr.push(obj);
              }
            } else {
              const tmpArr = that.updateObj.xiaoweiName.split(',');
              const tmpIdArr = that.updateObj.xiaoweiId.split(',');
              for (var i = 0; i < tmpArr.length; i++) {
                var obj = {};
                obj.xwName = tmpArr[i];
                obj.xwId = tmpIdArr[i];
                that.updateXwArr.push(obj);
              }
            }
            that.detailsObj.channel = that.detailsObj.channel.split(',');
            const str = that.detailsObj.icon.replace(/(^\s*)|(\s*$)/g, '');
            if (str == '' || str == null || str == undefined) {
              that.imageUrlFlag = false;
            } else {
              that.imageUrlFlag = true;
              that.imageUrl = that.detailsObj.icon;
            }
          } else {
            that.$message({
              type: 'warning',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getXw() {
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwAll`)
        .then((response) => {
          if (response.data.isSuccess == true) {
            that.xwArr = response.data.data;
            that.xwNum = response.data.data.length;
          } else {
            that.$message({
              type: 'warning',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    quit() {
      this.$router.go(-1);
    },
    isSelectAll() {
      if (this.updateXwArr.length > this.xwNum) {
        this.updateXwArr.splice(0, this.updateXwArr.length / 2);
        this.checkAll = true;
      } else if (this.updateXwArr.length == this.xwNum) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    isChecked(name) {
      for (let i = 0; i < this.updateXwArr.length; i++) {
        if (name == this.updateXwArr[i].xwName) {
          return true;
        }
      }
      return false;
    },
    mountedGet() {
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwAll`)
        .then((response) => {
          if (response.data.isSuccess == true) {
            that.xwArr = response.data.data;
            that.xwNum = response.data.data.length;

            that.getDetails();
          } else {
            that.$message({
              type: 'warning',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mounted() {
    // vipcenter/xiaoWeiGroup/queryXwAll
    // if()
    // this.getXw();
    this.mountedGet();
  },
  watch: {
    updateXwArr: 'isSelectAll'
  }
};
</script>
<style>
.updateResourceConfigure .el-textarea textarea {
  height: 100px;
}
.updateResourceConfigure .editArea .el-form-item .el-form-item__content {
  margin-left: 130px !important;
}
.updateResourceConfigure .editArea .el-form-item .el-form-item__label {
  width: 130px !important;
}
.updateResourceConfigure .btnQuery {
  text-align: center;
}
</style>
<style scoped>
.updateResourceConfigure .selectPic {
  width: 100px;
  border: 1px dashed #ccc;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #ccc;
  padding: 0;
}
.updateResourceConfigure .selectPic:hover {
  border-color: #20a0ff;
  color: #20a0ff;
  cursor: pointer;
}

.xzXW:hover {
  background-color: rgba(32, 160, 255, 0.8) !important;
}
.picSelect img {
  width: 100px;
  height: 100px;
}
.picSelect {
  width: 30%;
  padding: 5px;
}
.picSelect {
  position: relative;
}
.picSelect span {
  width: 60px;
  background-color: rgb(245, 108, 108);
  border-radius: 5px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  position: absolute;
  right: 30px;
  top: 20px;
  cursor: pointer;
}
.picSelect span:hover {
  background-color: rgba(245, 108, 108, 0.8);
}
.borderClass {
  border: 1px dashed #ccc;
}
.selectxiaoweiDialog .el-checkbox {
  width: 100px;
  margin-left: 15px;
}
.qudao .el-checkbox {
  width: 80px;
  margin-left: 5px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
