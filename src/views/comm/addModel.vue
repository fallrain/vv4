<template>
  <div class="vip-content msg-template">
    <p class="template-brand"><i></i>{{ title }}</p>
    <el-form ref="form" :model="form" :rules="rules" label-width="180px">
      <el-form-item label="任务描述" prop="title">
        <el-input v-model="form.title" :maxlength="15" style="width: 300px;" @input.native="titleInput"></el-input>
      </el-form-item>
      <el-form-item label="用户openId集合" class="is-required">
        <div style="margin-top: 2.5px;">
          <el-radio-group v-model="form.type" @change="typeChange">
            <el-radio label="1">所有关注过服务号用户</el-radio>
            <!--<el-radio label="2">所有注册过海尔帐号</el-radio>-->
            <el-radio label="3">指定用户</el-radio>
          </el-radio-group>
        </div>
        <el-input
          v-if="form.type == 3"
          @input.native="useridsInput"
          type="textarea"
          v-model="form.userIds"
          placeholder="多个openid以英文逗号隔开，最多支持输入20个openid"
          :disabled="isUpload"
        ></el-input>
        <!--<div class="m-tipbox">*（多个userid以英文逗号隔开）</div>-->
        <div v-if="form.type == 3" style="width: 100%;margin-top: 15px;">
          <el-button size="small" type="primary" class="m-leftbtn" @click="temDown" :disabled="isDownload"
            ><i class="ico-down"></i>模板下载</el-button
          >
          <!--<el-button type="primary" @click="upload" :loading="saveing"><i class="ico-vipin"></i>导入用户</el-button>-->
          <el-upload
            class="upload-demo"
            :action="gUtils.getApiUrl() + 'vipcenter/batchUserController/uploadCustomerFile'"
            :on-progress="upload"
            :on-preview="handlePreview"
            :on-success="uuidAdd"
            :on-remove="handleRemove"
            :multiple="false"
            :show-file-list="false"
          >
            <el-button size="small" type="primary" class="m-rightbtn" :disabled="!isDownload"
              ><i class="ico-vipin"></i>导入用户</el-button
            >
          </el-upload>
          <ul class="el-upload-list el-upload-list--text" style="float: left;" v-if="isUpload">
            <li class="el-upload-list__item is-success" style="margin-top: 4px;margin-right: 0;margin-left: 5px;">
              <a class="el-upload-list__item-name" style="cursor: default;">
                <i class="el-icon-document"></i>{{ xmlName }}
              </a>
              <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-circle-check"></i>
              </label>
              <i class="el-icon-close" @click="delTme"></i>
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="模板选择" class="is-required">
        <el-button v-if="form.templateName == ''" type="text" @click="selectModel">点击选择模板</el-button>
        <el-tag v-if="!form.templateName == ''" type="primary" :closable="true" @close="removeItem">
          {{ form.templateName }}
        </el-tag>
      </el-form-item>
      <el-form-item
        v-if="jurisdiction['member:memberGroupManager:save'] || jurisdiction['member:memberGroupManager:update']"
      >
        <el-button type="primary" @click="missionAdd">发送</el-button>
        <el-button @click="goback">返回</el-button>
      </el-form-item>
    </el-form>
    <up-load
      :dialogDisplay="upLoadDialog.display"
      :closeDialog="closeUpLoadDialog"
      :memberCount="memberCount"
    ></up-load>
    <proving
      :dialogDisplay="provingIdDialog.display"
      :closeDialog="closeProvingIdDialog"
      :exitCount="exitCount"
      :totalCount="totalCount"
      :saveModel="saveModel"
    ></proving>
    <select-model
      :type="modelDialog.type"
      :random="modelDialog.random"
      :dialogDisplay="modelDialog.display"
      :closeDialog="closeModelDialog"
      :selectedModel="selectedModel"
    ></select-model>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import gUtils from '../../utils/gUtils.js';
import upLoad from '../vip/dialog/upLoad.vue';
import proving from '../vip/dialog/proving.vue';
import selectModel from '../vip/dialog/model.vue';
import config from '../../config/config';

export default {
  components: {
    upLoad,
    proving,
    selectModel
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
    const titleEmpty = (rule, value, callback) => {
      const result = value.match('^[a-zA-Z0-9_\u4e00-\u9fa5]+$');
      if (!result) {
        callback(new Error('请勿输入特殊字符'));
      } else {
        callback();
      }
    };
    return {
      xmlName: '',
      isUpload: false,
      isDownload: false,
      title: '新建任务',
      memberCount: 0,
      exitCount: '',
      totalCount: '',
      form: {
        title: '', // 任务描述
        type: '1',
        userIds: '',
        uuid: '',
        fileName: '',
        tempId: '',
        templateName: ''
      },
      provingIdDialog: {
        display: false
      },
      upLoadDialog: {
        display: false
      },
      modelDialog: {
        type: 1,
        display: false,
        random: Math.random()
      },
      flow: [
        {},
        {
          flowtype: 2,
          modelTemplate: '',
          modelTemplateName: ''
        }
      ],
      rules: {
        title: [
          {
            required: true,
            validator: isNotEmpty,
            trigger: 'blur',
            message: '请输入任务描述'
          },
          { max: 15, message: '长度不可超过15个字符', trigger: 'blur' },
          { validator: titleEmpty, trigger: 'blur' }
        ]
      }
    };
  },
  filters: {
    nameFilter(value) {
      if (value && value != '') {
        if (value.indexOf(':') > 0) {
          value = value.split(':')[1];
        }
      } else {
        value = '点击选择模板';
      }
      return value;
    }
  },
  methods: {
    useridsInput() {
      this.form.userIds = this.form.userIds.replace(/，/g, ',');
    },
    titleInput() {
      this.form.title = this.form.title.replace(/\s+/g, '');
    },
    delTme() {
      this.isUpload = false;
      this.form.uuid = '';
      this.form.fileName = '';
    },
    temDown() {
      window.location.href = `${config.apiUrl}wechat/openId.xls`;
      this.isDownload = true;
    },
    goback() {
      history.go(-1);
    },
    handlePreview() {},
    handleRemove() {
      this.form.uuid = '';
    },
    uuidAdd(ele) {
      const self = this;
      this.upLoadDialog.display = false;
      if (ele.isSuccess) {
        self.form.userIds = '';
        self.form.uuid = ele.data.uuid;
        this.isUpload = true;
        this.xmlName = ele.data.originalName;
        this.form.userIds = '';
        this.form.fileName = ele.data.newName;
      } else {
        this.$message({
          message: ele.msg,
          type: 'warning'
        });
      }
    },

    missionAdd() {
      const self = this;
      if (self.form.title == '') {
        this.$message({
          type: 'info',
          message: '请输入任务描述'
        });
        return;
      }
      if (self.form.type == 3 && self.form.userIds == '' && self.form.uuid == '') {
        this.$message({
          type: 'info',
          message: '请填写用户openId或批量上传'
        });
        return;
      }
      if (self.form.tempId == '') {
        this.$message({
          type: 'info',
          message: '请选择模板'
        });
        return;
      }
      if (self.form.type == 3 && self.form.userIds != '' && self.form.userIds.split(',').length > 20) {
        this.$message({
          type: 'info',
          message: 'openId最多输入20个'
        });
        return;
      }

      const promise = {
        type: self.form.type,
        userIds: self.form.userIds,
        uuid: self.form.uuid
      };
      let name = '';
      if (this.getUserInfo.brandName == 'haier') {
        name = '海知友';
      } else if (this.getUserInfo.brandName == 'casarte') {
        name = '卡萨帝';
      }
      this.requestVip.getCount(promise).then((data) => {
        if (data) {
          self.exitCount = data.exitCount;
          self.totalCount = data.totalCount;
          const h = self.$createElement;
          self
            .$msgbox({
              title: '提示',
              message: h('p', null, [
                h('span', null, `消息将发送至关注${name}服务号的用户，发送数量为 `),
                h('i', { style: 'color: red;font-size:16px' }, self.exitCount),
                h('span', null, ' 条，是否继续？')
              ]),
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            })
            .then((action) => {
              self.saveModel();
            })
            .catch((action) => {});
        }
      });
    },

    upload() {
      this.memberCount = 0;
      this.upLoadDialog.display = true;
    },
    // 关闭上传弹层
    closeUpLoadDialog() {
      this.upLoadDialog.display = false;
    },
    // 关闭保存前校验弹层
    closeProvingIdDialog() {
      this.provingIdDialog.display = false;
    },

    saveModel() {
      this.provingIdDialog.display = false;
      const self = this;
      const data = {
        title: self.form.title,
        type: self.form.type,
        userIds: self.form.userIds,
        uuid: self.form.uuid,
        tempId: self.form.tempId,
        fileName: self.form.fileName
      };
      this.requestVip.sendTemplate(data).then((data) => {
        if (data.isSuccess) {
          self.$message({
            type: 'success',
            message: '发送中'
          });
          self.$router.push({
            path: '/communication/quickcomm'
          });
        }
      });
    },

    // type切换
    typeChange(type) {
      this.form.type = type;
    },

    // 选择模板
    selectModel(type) {
      this.modelDialog.type = type;
      this.modelDialog.display = true;
      this.modelDialog.random = Math.random();
    },
    closeModelDialog() {
      this.modelDialog.display = false;
    },
    selectedModel(type, row) {
      if (row.id && row.templateName) {
        this.form.templateName = row.templateName;
        this.form.tempId = row.id;
      }
      this.modelDialog.display = false;
    },
    removeItem() {
      this.form.templateName = '';
      this.form.tempId = '';
    }
  },
  mounted() {
    // this.groupGet();
    //    setTimeout(function() {
    //      $(".msg-template")
    //        .find(".el-radio__input")
    //        .each(function() {
    //          if ($(this).hasClass("is-disabled")) {
    //            $(this)
    //              .parent(".el-radio")
    //              .css("cursor", "default");
    //          }
    //        });
    //    }, 50);
  }
};
</script>
<style scoped>
.m-tipbox {
  width: 622px;
  display: inline-block;
  text-align: right;
  font-size: 12px;
  color: #e12323;
}
.m-leftbtn {
  float: left;
  border-radius: 3px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  margin: 0;
  padding: 7px 15px;
  background: #20a0ff;
  border: 1px solid #20a0ff;
  color: #fff;
}
.m-leftbtn:hover {
  background: #4db3ff;
  border: 1px solid #4db3ff;
  color: #fff;
}
.m-leftbtn .ico-down {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: -2px;
  background: url('../../assets/images/ico-down.png') no-repeat;
}
.m-rightbtn {
  float: left;
  /*margin-left: 382px;*/
  border-radius: 3px;
}
.upload-demo {
  margin-left: 423px;
  float: left;
}
.m-rightbtn .ico-vipin {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: -2px;
  background: url('../../assets/images/ico-vipin.png') no-repeat;
}
.el-upload-list__item {
  width: auto;
  display: inline-block;
  float: left;
  margin-right: 10px;
  margin-top: 10px;
}
.el-progress {
  display: none;
}
</style>
<style>
/*.msg-template .el-table td{*/
/*position: static;*/
/*}*/
/*.msg-template .el-checkbox__input{*/
/*position: static;*/
/*}*/
/*.msg-template .el-checkbox__inner{*/
/*position: static;*/
/*}*/
/*.msg-template .el-checkbox{*/
/*position: static;*/
/*}*/
</style>
