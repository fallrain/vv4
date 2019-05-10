<template>
  <div style="padding: 20px;" class="addResourceConfigure">
    <div class="header">
      <p class="template-brand"><i></i>新增实物资源位配置</p>
    </div>
    <div class="body">
      <el-form ref="form" label-width="130px">
        <el-form-item label="资源位名称：">
          <el-input v-model="newObj.name" style="width: 40%" :maxlength="7"></el-input>
          <span style="padding-left: 20px">*该名称展示在直销员前端资源位，最长不超过7个字</span>
        </el-form-item>
        <el-form-item label="优先级：">
          <el-input v-model.number="newObj.sort" style="width: 15%" type="text" :maxlength="2"></el-input>
          <span style="padding-left: 20px">*数字越小位置越靠前，同一数字配置时间越晚优先级越高</span>
        </el-form-item>
        <el-form-item label="资源位类型：">
          <el-radio-group v-model="newObj.sourceType">
            <el-radio :label="0">权益券资源位</el-radio>
            <el-radio :label="1">实物资源位</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动区域：">
          <!-- <el-button  style="backgroundColor: #20a0ff ;color:#fff;border: none" class="xzXW" @click="selectXw">选择小微</el-button> -->

          <el-tooltip class="item" effect="light" :content="showXwName" placement="top">
            <el-input v-model="showXwName" style="width: 15%;cursor: pointer;" @focus="selectXw" readonly></el-input>
          </el-tooltip>
          <span style="padding-left: 20px">*点击可选择小微</span>
        </el-form-item>
        <el-form-item label="渠道配置：" class="qudao">
          <el-checkbox-group v-model="channelArr">
            <el-checkbox label="超市" name="channel"></el-checkbox>
            <el-checkbox label="五星" name="channel"></el-checkbox>
            <el-checkbox label="国美" name="channel"></el-checkbox>
            <el-checkbox label="综合店" name="channel"></el-checkbox>
            <el-checkbox label="社区专卖" name="channel"></el-checkbox>
            <el-checkbox label="苏宁" name="channel"></el-checkbox>
            <el-checkbox label="VIP客户" name="channel"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="上传资源位图标：">
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

        <!-- <el-form-item label="权益描述：" >
        <ueditor v-model="newObj.desc" :config="config" v-on:input="input" v-on:ready="ready" :random="editorRandom"></ueditor>
      </el-form-item> -->
        <!-- <el-form-item label="配置说明：">
			  	<span>* 该说明在兑呗前端展示给直销员，告知直销员该资源是什么，如何使用，或者是可发给那些用户对象等等</span>
			    <el-input type="textarea" v-model="newObj.desc" style="margin-top: 10px;width: 80%"></el-input>
			  </el-form-item> -->
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
      <el-dialog
        title="选择小微"
        :visible.sync="selectxwFlag"
        width="30%"
        :before-close="qxSelectXw"
        :modal-append-to-body="false"
      >
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="selectXwArr">
          <el-checkbox v-for="item in xwArr" :label="item" :key="item.xwName">{{ item.xwName }}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="qdSelectXw">确 定</el-button>
          <el-button type="primary" style="background-color: #909399;border-color: #909399" @click="qxSelectXw"
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
      newObj: {
        name: '',
        status: 0,
        icon: '',
        sort: '',
        xiaoweiId: '',
        xiaoweiName: '',
        channel: '',
        desc: '',
        sourceType: 0
      },
      picFlag: true,
      channelArr: [],
      selectxwFlag: false,
      checkAll: false,
      xwArr: [],
      beforSelectArr: [],
      selectXwArr: [],
      imageUrlFlag: false,
      imageUrl: '',
      xwNum: 0,
      showXwName: '未选择',
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
      this.selectXwArr = this.checkAll ? this.xwArr : [];
    },
    checkRate(input) {
      const re = /^[0-9]+.?[0-9]*$/; // 判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/

      if (!re.test(input)) {
        return true;
      }
      return false;
    },
    onSubmit() {
      this.editorRandom = Math.random();
      // console.log('rightsDesc',this.rightsDesc)
      if (this.checkRate(this.newObj.sort)) {
        this.$message({
          type: 'warning',
          message: '优先级需为非负数字'
        });
        return;
      } if (this.newObj.sort < 0) {
        this.$message({
          type: 'warning',
          message: '优先级需为非负数字'
        });
        return;
      }
      const qudaoStr = this.channelArr.join(',');
      if (this.newObj.name == '' || this.newObj.name == null) {
        this.$message({
          type: 'warning',
          message: '请输入资源位名称'
        });
        return;
      }

      // if(this.newObj.sort==''||this.newObj.sort==null){
      // 	this.$message({
      // 		type:"warning",
      // 		message:"请输入优先级"
      // 	})
      // 	return;
      // }
      if (this.selectXwArr.length == 0) {
        this.$message({
          type: 'warning',
          message: '请选择小微'
        });
        return;
      }
      if (qudaoStr == '' || qudaoStr == null) {
        this.$message({
          type: 'warning',
          message: '请选择渠道'
        });
        return;
      }
      if (this.newObj.icon == '' || this.newObj.icon == null) {
        this.$message({
          type: 'warning',
          message: '请上传资源位图'
        });
        return;
      }
      if (this.rightsDesc == '' || this.rightsDesc == null) {
        this.$message({
          type: 'warning',
          message: '请输入配置说明'
        });
        return;
      }

      const loading = this.$loading({
        lock: true,
        text: '提交中',
        spinner: 'el-icon-loading',
        target: '#app-view',
        background: 'rgba(255, 255, 255, 0.7)'
      });

      const params = new Object();
      params.name = this.newObj.name;
      params.sort = this.newObj.sort;

      if (this.checkAll == true) {
        params.xiaoweiName = '所有小微';
        params.xiaoweiId = 'all';
      } else {
        params.xiaoweiName = this.newObj.xiaoweiName;
        params.xiaoweiId = this.newObj.xiaoweiId;
      }

      params.channel = qudaoStr;
      params.desc = this.rightsDesc;
      params.sourceType = this.newObj.sourceType;
      params.status = 2;
      params.icon = this.newObj.icon;
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/vipUserManageSource/addVipSourceByJH`, params)
        .then((response) => {
          if (response.data.isSuccess == true) {
            loading.close();
            that.$message({
              type: 'success',
              message: '新增成功'
            });
            that.$router.go(-1);
          } else {
            loading.close();
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
    // 选择小微：
    selectXw() {
      this.selectxwFlag = true;
      this.beforSelectArr = this.selectXwArr;
    },
    deletePic(file, fileList) {
      this.imageUrlFlag = false;
      this.imageUrl = '';
      this.newObj.icon = '';
    },
    handleAvatarSuccess(res, file, fileList) {
      if (res.isSuccess == true) {
        this.imageUrl = URL.createObjectURL(file.raw);
        if (this.imageUrlFlag == true && fileList.length > 1) {
          fileList.shift();
          this.newObj.icon = res.data.vipSourceIconUrl;
        } else {
          if (res.isSuccess) {
            this.imageUrlFlag = true;
          } else {
            this.$message({
              type: 'warning',
              message: res.msg
            });
          }
          this.newObj.icon = res.data.vipSourceIconUrl;
        }
      } else {
        fileList.pop();
        this.$message.warning(res.msg);
      }
    },
    qxSelectXw() {
      this.selectXwArr = this.beforSelectArr;
      // this.checkAll = false;
      this.selectxwFlag = false;
    },
    qdSelectXw() {
      let str = '';
      let idStr = '';
      for (var i = 0; i < this.selectXwArr.length; i++) {
        if (i == 0) {
          str += this.selectXwArr[i].xwName;
        } else {
          str = `${str},${this.selectXwArr[i].xwName}`;
        }
      }
      for (var i = 0; i < this.selectXwArr.length; i++) {
        if (i == 0) {
          idStr += this.selectXwArr[i].xwId;
        } else {
          idStr = `${idStr},${this.selectXwArr[i].xwId}`;
        }
      }
      if (this.selectXwArr.length == this.xwNum) {
        this.showXwName = '全部小微';
      } else if (this.selectXwArr.length == 0) {
        this.showXwName = '未选择';
      } else {
        this.showXwName = str;
      }

      this.newObj.xiaoweiName = str;
      this.newObj.xiaoweiId = idStr;
      this.selectxwFlag = false;
    },

    getXw() {
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwAll`)
        .then((response) => {
          if (response.data.isSuccess == true) {
            that.xwArr = response.data.data;
            that.xwNum = response.data.data.length;
            // that.beforSelectArr = that.xwArr;
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
      if (this.selectXwArr.length == this.xwNum) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    }
  },
  mounted() {
    this.getXw();
  },
  watch: {
    selectXwArr: 'isSelectAll'
  }
};
</script>
<style>
.addResourceConfigure .editArea .el-form-item .el-form-item__content {
  margin-left: 130px !important;
}
.addResourceConfigure .editArea .el-form-item .el-form-item__label {
  width: 130px !important;
}
.addResourceConfigure .btnQuery {
  text-align: center;
}
</style>
<style scoped>
.addResourceConfigure .selectPic {
  width: 100px;
  border: 1px dashed #ccc;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #ccc;
  padding: 0;
}
.addResourceConfigure .selectPic:hover {
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
.addResourceConfigure .qudao .el-checkbox {
  width: 80px;
  margin-left: 5px;
}
.addResourceConfigure .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.addResourceConfigure .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.addResourceConfigure .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.addResourceConfigure .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
