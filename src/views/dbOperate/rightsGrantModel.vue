<template>
  <div class="top rightsGrantModel">
    <div class="header">
      <p class="template-brand">
        <i></i>权益发放模型
        <el-button type="primary" @click="add" class="fr">新建权益发放模型</el-button>
      </p>
    </div>
    <el-table
      class="resources-table"
      :data="modelList"
      show-overflow-tooltip
      style="width: 100%"
      v-loading="tabLoading"
    >
      <el-table-column align="center" prop="name" label="发放模型" show-overflow-tooltip width="250"> </el-table-column>
      <el-table-column align="center" prop="serviceFlowDesc" show-overflow-tooltip label="业务流描述" width="400">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="previewSurvey(scope.row)">查看</el-button>
            <el-button type="text" @click="modify(scope.row)">修改</el-button>
            <el-button type="text" @click="zxdelete(scope.row.id)">删除</el-button>
            <el-button type="text" @click="countData(scope.row.id)">已有配置</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <div class="previewModel">
      <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" class="trs-dialog" width="30%">
        <div class="baseInfo">
          <div class="infoBox">
            <div class="infoBoxC">
              <span>发放模型：</span>
              <div class="infoBoxR">{{ previewList.name }}</div>
            </div>
            <div class="infoBoxC">
              <span>业务流描述：</span>
              <div class="infoBoxR">{{ previewList.serviceFlowDesc }}</div>
            </div>
            <div class="infoBoxC">
              <span>下一步Url：</span>
              <div class="infoBoxR">{{ previewList.url }}</div>
            </div>
            <div class="infoBoxC">
              <span>标题描述：</span>
              <div class="infoBoxR">{{ previewList.title }}</div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="modifyBox">
      <el-dialog
        title="修改"
        :visible.sync="modifyFlag"
        :before-close="cancelGg"
        :modal-append-to-body="false"
        class="trs-dialog"
      >
        <div>
          <el-form label-width="100px">
            <el-form-item label="发放模型">
              <el-input v-model="modifyName" :maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="业务流描述">
              <el-input v-model="modifyDesc" :maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="url">
              <el-input v-model="SurveyUrl" disabled></el-input>
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="Surveytitle" :maxlength="30"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelGg">取 消</el-button>
          <el-button type="primary" @click="gg">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="addNewRights">
      <el-dialog title="新增" :visible.sync="addDialogFlag" :before-close="cancelAdd" :modal-append-to-body="false">
        <div>
          <el-form label-width="100px">
            <el-form-item label="发放模型">
              <!-- <el-input :value="addTmpObj.name" ></el-input> -->
              <el-input v-model="addName" :maxlength="10"></el-input>
            </el-form-item>
            <!-- SurveyUrl -->
            <!-- Surveytitle -->
            <el-form-item label="业务流描述">
              <el-input v-model="addDesc" :maxlength="30"></el-input>
            </el-form-item>
            <!-- <el-form-item label="Url">
                    <el-input v-model="SurveyUrl" disabled></el-input>
                  </el-form-item> -->
            <el-form-item label="标题">
              <el-input v-model="Surveytitle" :maxlength="30"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelAdd">取 消</el-button>
          <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';

export default {
  data() {
    return {
      tabLoading: false,
      pageSize: 10,
      pageNo: 1,
      total: 0,
      id: 0,
      modelList: [],
      modifyFlag: false,
      addDialogFlag: false,
      dialogVisible: false,
      previewList: {},
      modifyObj: {},
      modifyTmpObj: {},
      addTmpObj: {},
      addName: '',
      addDesc: '',
      modifyName: '',
      modifyDesc: '',
      beforModifyDesc: '',
      beforModifyName: '',
      SurveyUrl: '',
      Surveytitle: ''
    };
  },
  created() {
    const that = this;
    this.tabLoading = true;
    axios
      .post(`${this.apiUrl}vipcenter/vipUserManageConfigModel/getVipConfigModelList`, {
        pageSize: this.pageSize,
        pageNo: this.pageNo
      })
      .then((response) => {
        if (response.data.isSuccess == true) {
          that.modelList = response.data.data.entities;
          that.entityCount = response.data.data.entityCount;
          that.total = response.data.data.entityCount;
        } else {
          that.$message({
            type: 'error',
            message: response.data.msg
          });
        }
        that.tabLoading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // 新增权益券：
    add() {
      this.addTmpObj = {};
      this.addDesc = '';
      this.addName = '';
      this.Surveytitle = '';
      this.SurveyUrl = '';
      this.addDialogFlag = true;
    },

    // 取消新增：
    cancelAdd() {
      this.addTmpObj = {};
      this.addDesc = '';
      this.addName = '';
      this.addDialogFlag = false;
    },

    // 确定新增：
    confirmAdd() {
      const that = this;
      this.SurveyUrl = 'rightsconfigrutiontwo';
      const v1 = this.addName.replace(/(^\s*)|(\s*$)/g, '');
      const v2 = this.addDesc.replace(/(^\s*)|(\s*$)/g, '');
      const v3 = this.SurveyUrl.replace(/(^\s*)|(\s*$)/g, '');
      const v4 = this.Surveytitle.replace(/(^\s*)|(\s*$)/g, '');
      if (v1 == '' || v1 == undefined || v1 == null) {
        this.$message({
          type: 'warning',
          message: '请输入发放模型名称'
        });
        return;
      }
      if (v2 == '' || v2 == undefined || v2 == null) {
        this.$message({
          type: 'warning',
          message: '请输入业务流描述'
        });
        return;
      }
      if (v3 == '' || v3 == undefined || v3 == null) {
        this.$message({
          type: 'warning',
          message: '请输入Url'
        });
        return;
      }
      if (v4 == '' || v4 == undefined || v4 == null) {
        this.$message({
          type: 'warning',
          message: '请输入标题'
        });
        return;
      }
      for (let i = 0; i < this.modelList.length; i++) {
        if (this.addName == this.modelList[i].name) {
          this.$message({
            type: 'warning',
            message: '已存在该发放模型名称'
          });
          return;
        }
      }
      this.tabLoading = true;
      axios
        .post(`${this.apiUrl}vipcenter/vipUserManageConfigModel/addVipConfigModel`, {
          name: v1,
          serviceFlowDesc: v2,
          status: 0,
          url: v3,
          title: v4
        })
        .then((response) => {
          if (response.data.isSuccess == true) {
            that.$message({
              type: 'success',
              message: '新增成功'
            });
            axios
              .post(`${that.apiUrl}vipcenter/vipUserManageConfigModel/getVipConfigModelList`, {
                pageSize: that.pageSize,
                pageNo: that.pageNo
              })
              .then((response) => {
                if (response.data.isSuccess == true) {
                  that.modelList = response.data.data.entities;
                  that.entityCount = response.data.data.entityCount;
                  that.total = response.data.data.entityCount;
                } else {
                  that.$message({
                    type: 'error',
                    message: response.data.msg
                  });
                }
                that.tabLoading = false;
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.addTmpObj = {};
      this.addName = '';
      this.addDesc = '';
      this.addDialogFlag = false;
      this.tabLoading = false;
    },

    handleSizeChange(pageSize) {
      this.tabLoading = true;
      const that = this;
      this.pageSize = pageSize;
      axios
        .post(`${this.apiUrl}vipcenter/vipUserManageConfigModel/getVipConfigModelList`, {
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
        .then((response) => {
          if (response.data.isSuccess == true) {
            that.surveyList = response.data.data.entities;
            that.total = response.data.data.entityCount;
            that.tabLoading = false;
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 翻页
    handleCurrentChange(pageNo) {
      this.tabLoading = true;
      const that = this;
      this.pageNo = pageNo;
      axios
        .post(`${this.apiUrl}vipcenter/vipUserManageConfigModel/getVipConfigModelList`, {
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
        .then((response) => {
          if (response.data.isSuccess == true) {
            that.surveyList = response.data.data.entities;
            that.total = response.data.data.entityCount;
            that.tabLoading = false;
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查看
    previewSurvey(o) {
      const loading = this.$loading({
        lock: true,
        text: '提交中',
        spinner: 'el-icon-loading',
        target: '#app-view',
        background: 'rgba(255, 255, 255, 0.7)'
      });
      const that = this;
      axios
        .post(
          `${this.apiUrl}vipcenter/vipUserManageConfigModel/getVipConfigModelDetail`,
          qs.stringify({
            id: o.id
          })
        )
        .then((response) => {
          loading.close();
          if (response.data.isSuccess == true) {
            that.previewList = response.data.data;
            that.dialogVisible = true;
          } else {
            that.$message({
              type: 'error',
              message: '请求失败'
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 修改
    modify(o) {
      const that = this;
      const loading = this.$loading({
        lock: true,
        text: '提交中',
        spinner: 'el-icon-loading',
        target: '#app-view',
        background: 'rgba(255, 255, 255, 0.7)'
      });

      axios
        .post(
          `${this.apiUrl}vipcenter/vipUserManageConfigModel/getVipConfigModelDetail`,
          qs.stringify({
            id: o.id
          })
        )
        .then((response) => {
          loading.close();
          if (response.data.isSuccess == true) {
            that.modifyObj = {};
            that.modifyFlag = true;
            that.modifyName = response.data.data.name;
            that.modifyDesc = response.data.data.serviceFlowDesc;
            that.SurveyUrl = response.data.data.url;
            that.Surveytitle = response.data.data.title;
            that.id = response.data.data.id;
            that.modifyObj = o;
            that.beforModifyName = o.name;
            that.beforModifyDesc = o.serviceFlowDesc;
            that.beforModifyUrl = that.SurveyUrl;
            that.beforModifyTitle = that.Surveytitle;
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 删除
    zxdelete(id) {
      this.tabLoading = true;
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/vipUserManageConfigModel/updateVipConfigModelStatus`, {
          id,
          status: -1
        })
        .then((response) => {
          if (response.data.isSuccess == true) {
            that.$message({
              type: 'success',
              message: '删除成功'
            });
            axios
              .post(`${that.apiUrl}vipcenter/vipUserManageConfigModel/getVipConfigModelList`, {
                pageSize: that.pageSize,
                pageNo: that.pageNo
              })
              .then((response) => {
                if (response.data.isSuccess == true) {
                  that.modelList = response.data.data.entities;
                  that.entityCount = response.data.data.entityCount;
                  that.total = response.data.data.entityCount;
                } else {
                  that.$message({
                    type: 'error',
                    message: response.data.msg
                  });
                }
                that.tabLoading = false;
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 配置
    countData(id) {
      this.$router.push({ path: '/dbOperate/survey', query: { rightsGrantModelId: id } });
    },
    // 取消更改：
    cancelGg() {
      this.modifyObj = {};
      this.modifyFlag = false;
      // this.modifyDesc = this.beforModifyDesc;
      // this.modifyName = this.beforModifyName;
      // this.beforModifyDesc = '';
      // this.beforModifyName = '';
    },
    // 确定更改：
    gg() {
      const that = this;
      const v1 = this.modifyName.replace(/(^\s*)|(\s*$)/g, '');
      const v2 = this.modifyDesc.replace(/(^\s*)|(\s*$)/g, '');
      const v3 = this.SurveyUrl.replace(/(^\s*)|(\s*$)/g, '');
      const v4 = this.Surveytitle.replace(/(^\s*)|(\s*$)/g, '');
      if (v1 == '' || v1 == undefined || v1 == null) {
        this.$message({
          type: 'warning',
          message: '请输入发放模型名称'
        });
        return;
      }
      if (v2 == '' || v2 == undefined || v2 == null) {
        this.$message({
          type: 'warning',
          message: '请输入业务流描述'
        });
        return;
      }
      if (v3 == '' || v3 == undefined || v3 == null) {
        this.$message({
          type: 'warning',
          message: '请输入Url'
        });
        return;
      }
      if (v4 == '' || v4 == undefined || v4 == null) {
        this.$message({
          type: 'warning',
          message: '请输入标题'
        });
        return;
      }
      if (
        this.beforModifyName == v1
        && this.beforModifyDesc == v2
        && this.beforModifyUrl == v3
        && this.beforModifyTitle == v4
      ) {
        this.modifyFlag = false;
        return;
      }
      if (this.beforModifyName != v1) {
        for (let i = 0; i < this.modelList.length; i++) {
          if (v1 == this.modelList[i].name) {
            this.$message({
              type: 'warning',
              message: '已存在该发放模型名称'
            });
            return;
          }
        }
      }
      // rightsconfigrutionthree
      this.tabLoading = true;
      axios
        .post(`${this.apiUrl}vipcenter/vipUserManageConfigModel/updateVipConfigModel`, {
          id: this.modifyObj.id,
          name: v1,
          serviceFlowDesc: v2,
          url: v3,
          title: v4
        })
        .then((response) => {
          if (response.data.isSuccess == true) {
            that.$message({
              type: 'success',
              message: '修改成功'
            });
            axios
              .post(`${that.apiUrl}vipcenter/vipUserManageConfigModel/getVipConfigModelList`, {
                pageSize: that.pageSize,
                pageNo: that.pageNo
              })
              .then((response) => {
                if (response.data.isSuccess == true) {
                  that.modelList = response.data.data.entities;
                  that.entityCount = response.data.data.entityCount;
                  that.total = response.data.data.entityCount;
                } else {
                  that.$message({
                    type: 'error',
                    message: response.data.msg
                  });
                }
                that.tabLoading = false;
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.modifyObj = {};

      this.modifyFlag = false;
      this.tabLoading = false;
    }
  }
};
</script>
<style scoped>
.template-brand .fr {
  margin-top: 10px;
  margin-right: 10px;
}

.rightsGrantModel {
  padding: 0 20px;
}

.rightsGrantModel .header {
  padding-top: 20px;
}
.el-table {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.previewModel {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  line-height: 30px;
}
.infoBoxC {
  display: flex;
  margin: 20px 0;
}
.infoBoxC .infoBoxR {
  padding: 0;
}
.infoBoxC span {
  white-space: nowrap;
}
.baseInfo {
  width: 96%;
  padding: 0 10px;
  color: #333;
  font-size: 16px;
}
.infoBox {
  margin-top: 10px;
  padding-left: 5px;
}
.infoBox div {
  padding: 2px 0;
  color: #48576a;
  font-size: 16px;
}
.infoBox div span {
  font-weight: 600;
  font-size: 16px;
}
</style>
<style>
.rightsGrantModel .modifyBox .el-dialog__body {
  padding: 30px 20px;
  padding-bottom: 0;
  color: #48576a;
  font-size: 14px;
}
.rightsGrantModel .modifyBox .el-dialog__body .el-input {
  width: 96% !important;
}
.rightsGrantModel .previewModel .el-dialog__body {
  padding: 0px 20px;
  color: #48576a;
  font-size: 14px;
}
.rightsGrantModel .addNewRights .el-dialog__body .el-input {
  width: 96% !important;
}
</style>
