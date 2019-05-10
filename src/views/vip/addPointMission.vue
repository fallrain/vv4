<template>
  <div class="vip-content msg-template">
    <p class="template-brand"><i></i>{{ title }}</p>
    <el-form ref="form" :model="form" :rules="rules" label-width="180px">
      <el-form-item label="任务描述" prop="title">
        <el-input v-model="form.title" :maxlength="15" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="用户ID集合">
        <el-input type="textarea" v-model="form.userIds"></el-input>
        <div class="m-tipbox">*（多个userid以英文逗号隔开）</div>
        <div style="width: 100%">
          <a href="http://testvip.haier.net/wechat/batchtempuser/userIds.xls" class="m-leftbtn"
            ><i class="ico-down"></i>模版下载</a
          >
          <!--<el-button type="primary" @click="upload" :loading="saveing"><i class="ico-vipin"></i>导入用户</el-button>-->
          <el-upload
            class="upload-demo"
            action="http://testvip.haier.net/vipcenter/batchUserController/uploadCustomerFile"
            :on-progress="upload"
            :on-preview="handlePreview"
            :on-success="uuidAdd"
            :on-remove="handleRemove"
            multiple
            :limit="1"
          >
            <el-button size="small" type="primary" class="m-rightbtn"><i class="ico-vipin"></i>导入用户</el-button>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="每人赠送积分数量" prop="pointNum">
        <el-input v-model="form.pointNum" :maxlength="9" style="width: 300px;"></el-input>
        <span>积分</span>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import gUtils from '../../utils/gUtils.js';
import upLoad from './dialog/upLoad.vue';

export default {
  components: {
    upLoad
  },
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
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
      title: '新建积分任务',
      memberCount: 0,
      form: {
        title: '', // 任务描述
        pointNum: '', // 赠送积分数量
        userIds: '',
        uuid: ''
      },
      upLoadDialog: {
        display: false
      },
      rules: {
        title: [
          {
            required: true,
            validator: isNotEmpty,
            trigger: 'blur',
            message: '请输入任务描述'
          },
          { max: 15, message: '长度不可超过15个字符', trigger: 'blur' }
        ],
        pointNum: [
          {
            required: true,
            validator: isNotEmpty,
            trigger: 'blur',
            message: '请输入赠送积分数'
          },
          { max: 9, message: '长度不可超过9个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
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
      self.form.userIds = '';
      self.form.uuid = ele.data.uuid;
    },

    missionAdd() {
      const self = this;
      if (self.form.title == '') {
        this.$message({
          type: 'info',
          message: '请填写任务描述'
        });
        return;
      }
      if (self.form.userIds == '' && self.form.uuid == '') {
        this.$message({
          type: 'info',
          message: '请填写用户ID或批量上传'
        });
        return;
      }
      if (self.form.pointNum == '') {
        this.$message({
          type: 'info',
          message: '请填写赠送积分数量'
        });
        return;
      }
      self.memberCount = '1';
      self.upLoadDialog.display = true;
      const data = {
        title: self.form.title,
        score: self.form.pointNum,
        userIds: self.form.userIds,
        uuid: self.form.uuid
      };
      this.requestVip.addScore(data).then((data) => {
        if (data) {
          self.upLoadDialog.display = false;
          self.$message({
            type: 'success',
            message: '保存成功!'
          });
          self.$router.push({
            path: '/vip/quickCommunication'
          });
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
  padding: 10px 15px;
  background: #1d90e6;
  border: 1px solid #1d90e6;
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
  margin-left: 382px;
  border-radius: 3px;
}
.m-rightbtn .ico-vipin {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: -2px;
  background: url('../../assets/images/ico-vipin.png') no-repeat;
}
</style>
<style>
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
