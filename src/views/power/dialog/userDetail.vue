<template>
  <div class="userDetail">
    <el-dialog
      title="用户详情"
      ref="userDialog"
      :visible.sync="dialogDisplay"
      custom-class="add-personnel"
      :modal-append-to-body="false"
      @close="dialogClose"
    >
      <div>
        <p class="template-brand" style="border-top: none"><i></i>基本信息</p>
      </div>
      <el-row class="userdetails-elrow">
        <el-col :span="12"
          ><span>工号：</span><span>{{ data.employeeNumber | dataFile }}</span></el-col
        >
        <el-col :span="12"
          ><span>用户名：</span><span>{{ data.userName | dataFile }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="12"
          ><span>邮箱：</span><span>{{ data.email | dataFile }}</span></el-col
        >
        <el-col :span="12"
          ><span>手机号：</span><span>{{ data.mobile | dataFile }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="12"
          ><span>所属品牌：</span><span>{{ data.allBrandName | dataFile }}</span></el-col
        >
        <el-col :span="12" style="display: flex;"
          ><span style="width: 130px;">用户来源：</span><span>{{ data.userFrom | dataFile }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24"
          ><span>用户角色：</span><span>{{ data.roleName | dataFile }}</span></el-col
        >
      </el-row>
      <div>
        <p class="template-brand" style="border-top: none"><i></i>平台部门</p>
      </div>
      <el-row class="userdetails-elrow">
        <el-col :span="12"
          ><span>小微：</span><span>{{ data.xwName | dataFile }}</span></el-col
        >
        <el-col :span="12"
          ><span>产业：</span><span>{{ data.industryName | dataFile }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="12"
          ><span>渠道：</span><span>{{ data.channelName | dataFile }}</span></el-col
        >
        <el-col :span="12"
          ><span>是否中国区营销：</span><span>{{ data.chineseArea | ChinaFile }}</span></el-col
        >
      </el-row>
      <div>
        <p class="template-brand" style="border-top: none"><i></i>预算体信息</p>
      </div>
      <el-row class="userdetails-elrow">
        <el-col :span="12"
          ><span>积分中心预算体：</span><span>{{ data.platformName | dataFile }}</span></el-col
        >
        <el-col :span="12"
          ><span>商城预算体：</span><span>{{ data.budgetName | dataFile }}</span></el-col
        >
      </el-row>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogClose">取 消</el-button> -->
        <el-button type="primary" @click="dialogClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['data', 'random', 'display', 'jurisdiction', 'close'],
  data() {
    return {
      dialogDisplay: false
    };
  },
  filters: {
    dataFile(val) {
      if (val == null || val == '') {
        val = '无';
      }
      return val;
    },
    ChinaFile(val) {
      if (val == 1) {
        val = '是';
      } else {
        val = '否';
      }
      return val;
    }
  },
  methods: {
    dialogClose() {
      this.close();
    }
  },

  mounted() {
    this.dialogDisplay = this.display;
  },
  watch: {
    random() {},
    display(curValue) {
      this.dialogDisplay = curValue;
    }
  }
};
</script>
<style scoped>
.userdetails-elrow {
  margin-top: 10px;
}
.userdetails-elrow div span:nth-child(1) {
  color: #ccc;
}
.userdetails-elrow div span:nth-child(2) {
  color: #333;
}
.template-brand {
  margin-bottom: 0;
  margin-top: 10px;
}
.template-brand > i {
  margin-top: 8px;
}
</style>
<style>
.userDetail .el-dialog__body {
  padding: 0 20px;
}
</style>
