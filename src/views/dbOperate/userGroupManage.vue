<template>
  <div>
    <router-view></router-view>
    <div style="padding: 20px;" class="userGroupManage" v-show="showManage">
      <div class="header">
        <p class="template-brand">
          <i></i>用户组管理
          <el-button type="primary" class="newGroup" @click="addSellerGroup">新建组</el-button>
          <el-button type="primary" class="newGroup" @click="backtoThree" v-if="onestepThree == 1"
            >返回一站式配置</el-button
          >
          <el-button type="primary" class="newGroup" @click="backtoThree" v-if="onestepThree == 2"
            >返回修改配置</el-button
          >
        </p>
      </div>
      <div class="body">
        <el-table :data="userGroupList" style="width: 100%">
          <el-table-column prop="userGroupName" min-width="20%" show-overflow-tooltip label="用户组名称">
          </el-table-column>
          <el-table-column prop="userAccount" show-overflow-tooltip min-width="10%" label="用户数量"> </el-table-column>
          <el-table-column label="启动状态" center min-width="10%" prop="status">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                on-color="#13ce66"
                off-color="#ff4949"
                @change="switchChange(scope.row)"
                :active-value="1"
                :inactive-value="2"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="crUserName" min-width="10%" show-overflow-tooltip label="创建人"> </el-table-column>
          <el-table-column prop="crTime" min-width="15%" show-overflow-tooltip label="创建时间"> </el-table-column>

          <el-table-column min-width="30%" label="操作">
            <template slot-scope="scope">
              <a class="btn" @click="handleWatch(scope.row)">查看</a>
              <a class="btn" @click="handleChange(scope.row)">修改</a>
              <a class="btn" @click="handleDelete(scope.row)">删除</a>
              <!-- <a class="btn" @click="handleManage(scope.row.id)">管理</a> -->
              <a class="btn" @click="handleManage(scope.row.id)">管理</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      <div class="addBox">
        <el-dialog
          title="新建组"
          :visible.sync="dialogVisible"
          width="60%"
          :before-close="addClose"
          :modal-append-to-body="false"
          class="creatGroup trs-dialog"
          :show-close="true"
          top="30%"
        >
          <!-- <div >
              <div>
                <span style="height: 36px;line-height: 36px;">组名：</span>
                <el-input style="width: 250px;" v-model="newGroupName" :maxlength=10></el-input>
              </div>
              <div style="margin: 20px 0;"></div>
              <div>
                <span style="height: 36px;line-height: 36px;">描述：</span>
                <el-input style="width: 250px;" v-model="newGroupDesc" :maxlength=30></el-input>
              </div>
          </div> -->
          <div class="baseInfo">
            <div class="infoBox">
              <div class="infoBoxC">
                <span style="margin-top: 9px">组名：</span>
                <div class="infoBoxR">
                  <el-input v-model="newGroupName" :maxlength="10"></el-input>
                </div>
              </div>
            </div>
            <div class="infoBox">
              <div class="infoBoxC">
                <span style="margin-top: 9px">描述：</span>
                <div class="infoBoxR">
                  <el-input v-model="newGroupDesc" :maxlength="40"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div style="margin: 20px 0 0 50px">
            <el-button type="primary" @click="crGroupFinish">确认添加</el-button>
            <el-button type="primary" @click="addClose">取消</el-button>
          </div>
        </el-dialog>
      </div>

      <div class="previewBox">
        <el-dialog
          title="查看详情"
          :visible.sync="previewBoxFlag"
          width="30%"
          :before-close="previewClose"
          :modal-append-to-body="false"
          class="creatGroup trs-dialog"
          :show-close="true"
          top="40%"
        >
          <div style="width: 100%;height: 1px;background-color: #bbb;"></div>
          <div class="baseInfo">
            <div class="infoBox">
              <div class="infoBoxC">
                <span>组名：</span>
                <div class="infoBoxR">{{ previewObj.userGroupName }}</div>
              </div>
              <div class="infoBoxC">
                <span>描述：</span>
                <div class="infoBoxR">
                  {{ previewObj.desc == '' || previewObj.desc == null ? '无' : previewObj.desc }}
                </div>
              </div>

              <div class="infoBoxC">
                <span>会员数量：</span>
                <div class="infoBoxR">{{ previewObj.userAccount }}</div>
              </div>
              <div class="infoBoxC">
                <span>创建人：</span>
                <div class="infoBoxR">{{ previewObj.crUserName }}</div>
              </div>
              <div class="infoBoxC">
                <span>创建时间：</span>
                <div class="infoBoxR">{{ previewObj.crTime }}</div>
              </div>
              <div class="infoBoxC">
                <span>状态：</span>
                <div class="infoBoxR">{{ previewObj.status | statusFilter }}</div>
              </div>
              <div class="infoBoxC">
                <span>操作历史：</span>
                <div class="infoBoxR">
                  <div v-if="selectFilter.length > 0">( 顶部为最新操作 )</div>
                  <div v-if="selectFilter.length == 0">( 无操作记录 )</div>
                  <div v-for="(item, index) in selectFilter">
                    <div style="display:flex;">
                      <div style="font-size: 20px;margin-right: 3px;">◆</div>
                      <div>
                        <div style="">{{ item.timeNumFilter }}</div>
                        <div style="display: flex">
                          <div style="white-space: nowrap;">筛选条件：</div>
                          <div>
                            <div v-for="op in item.otherFilter" style="white-space: nowrap;" class="iitemClass">
                              <!--  ◇ {{op}} -->
                              <el-tooltip placement="bottom-end" :visible-arrow="false">
                                <div slot="content">
                                  <!-- <div v-for="iitem in op.contentArr">{{iitem}}、</div> -->
                                  {{ op }}
                                </div>
                                <el-button>◇{{ op }}</el-button>
                              </el-tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-button type="primary" @click="previewClose" style="margin: 20px 50% 0;transform: translateX(-50%);"
            >退出</el-button
          >
        </el-dialog>
      </div>

      <div class="changeBox">
        <el-dialog
          title="修改"
          :visible.sync="changeBoxFlag"
          width="30%"
          :before-close="changeBoxClose"
          :modal-append-to-body="false"
          class="creatGroup trs-dialog"
          :show-close="true"
          top="30%"
        >
          <div class="baseInfo">
            <div class="infoBox">
              <div class="infoBoxC">
                <span style="margin-top: 9px">组名：</span>
                <div class="infoBoxR">
                  <el-input v-model="modifyName" :maxlength="10"></el-input>
                </div>
              </div>
            </div>
            <div class="infoBox">
              <div class="infoBoxC">
                <span style="margin-top: 9px">描述：</span>
                <div class="infoBoxR">
                  <el-input v-model="modifyDesc" :maxlength="40"></el-input>
                </div>
              </div>
            </div>
          </div>

          <div style="margin: 20px 0 0 50px">
            <el-button type="primary" @click="sureChange">确认修改</el-button>
            <el-button type="primary" @click="changeBoxClose">退出</el-button>
          </div>
        </el-dialog>
      </div>

      <!-- <div class="changeBox">
          <el-dialog
          title="查看详情"
          :visible.sync="changeBoxFlag"
          width="30%"
          :modal-append-to-body="false"
          class="creatGroup"
          :show-close="false"
          top="40%">
          <div style="display: flex;">
              <span style="height: 36px;line-height: 36px;">组名：</span><span></span>
          </div>
          <el-button type="primary" @click="cancelModify" style="margin: 20px 50% 0;transform: translateX(-50%);">确认修改</el-button>
        </el-dialog>
        </div> -->

      <!-- <el-dialog
          :visible.sync="delete_sellerGroup"
          title=""
          :modal-append-to-body='false'
          class="directSeller"
          center
          :show-close="false"
          >
          <div class="sellerGroup">
            <el-checkbox-group v-model="checkList" style="height: 300px;width: 210px; overflow-y: scroll;">
              <el-checkbox v-for="group of sellerGroup" :label="group" :key="group.id">{{group.sellerGroupName}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <el-button @click="selectSellerGroup_finish" class="select_sellerGroup_finish">完成</el-button>
        </el-dialog> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
import { Loading } from 'element-ui';

export default {
  data() {
    return {
      showManage: true,
      value2: true,
      userGroupList: [],
      currentPage: 1,
      dialogVisible: false, // 创建弹框是否显示
      newGroupName: '', // 新建小微组名称
      newGroupDesc: '',
      delete_sellerGroup: false, // 删除弹框是否显示
      previewBoxFlag: false,
      changeBoxFlag: false,
      previewObj: {},
      modifyObj: {},
      beforeModifyObj: {},
      modifyName: '',
      modifyDesc: '',
      modifyId: 0,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      beforeModifyName: '',
      beforeModifyDesc: '',
      modifyStatus: 0,
      userAccount: 0,
      selectFilter: [],
      onestepThree: 0,
      onestepId: 0
    };
  },
  filters: {
    formatDate(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
      const hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
      const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
      return `${year}年${month}月${day}日 ${hour}:${minutes}`;
    },
    statusFilter(value) {
      if (value == 2) {
        return '关闭';
      } if (value == 0) {
        return '删除';
      } if (value == 1) {
        return '开启';
      }
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      const that = this;
      this.pageSize = pageSize;
      this.getUserGroupList();
    },
    handleCurrentChange(pageNo) {
      const that = this;
      this.pageNo = pageNo;
      this.getUserGroupList();
    },
    switchChange(o) {
      // app-view
      const loadingInstance = Loading.service({
        target: '#app-view',
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      });
      // 1开 2关 -1删除

      // return;
      const _this = this;
      axios
        .post(`${this.apiUrl}vipcenter/userGroup/updateUserGroup`, {
          id: o.id,
          status: o.status,
          userAccount: o.userAccount,
          desc: o.desc,
          userGroupName: o.userGroupName
        })
        .then((data) => {
          _this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (data.data.isSuccess) {
            _this.$message({
              type: 'success',
              message: '操作成功'
            });
            _this.getUserGroupList();
          } else {
            _this.$message(data.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sureChange() {
      const tmpModifyName = this.modifyName.replace(/(^\s*)|(\s*$)/g, '');
      const tmpModifyDesc = this.modifyDesc.replace(/(^\s*)|(\s*$)/g, '');
      if (tmpModifyName == this.beforeModifyName && tmpModifyDesc == this.beforeModifyDesc) {
        this.changeBoxFlag = false;
        return;
      }
      if (tmpModifyName == '' || tmpModifyName == undefined || tmpModifyName == null) {
        this.$message({
          type: 'warning',
          message: '请输入用户员组名称'
        });
        return;
      }
      if (tmpModifyDesc == '' || tmpModifyDesc == undefined || tmpModifyDesc == null) {
        this.$message({
          type: 'warning',
          message: '请输入用户员组描述'
        });
        return;
      }

      // for(var i=0;i<this.userGroupList.length;i++){
      //   if(tmpModifyName==this.userGroupList[i].sellerGroupName){
      //     this.$message({
      //       type:"warning",
      //       message:"已存在改用户员组名称"
      //     })
      //     return;
      //   }
      // }
      // 这个地方：
      const loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        target: '#app-view'
      });
      const _this = this;
      axios
        .post(`${this.apiUrl}vipcenter/userGroup/updateUserGroup`, {
          id: this.modifyId,
          userGroupName: this.modifyName,
          desc: this.modifyDesc,
          status: this.modifyStatus,
          userAccount: this.userAccount
        })
        .then((data) => {
          _this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (data.data.isSuccess) {
            _this.$message({
              type: 'success',
              message: data.data.msg
            });
            _this.getUserGroupList();
            _this.changeBoxFlag = false;
          } else {
            _this.$message(data.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeBoxClose() {
      this.changeBoxFlag = false;
      this.modifyName = this.beforeModifyName;
    },
    previewClose() {
      this.previewBoxFlag = false;

      // this.selectFilter = [];
    },
    addClose() {
      this.newGroupName = '';
      this.newGroupDesc = '';
      this.dialogVisible = false;
    },
    addSellerGroup() {
      this.dialogVisible = true;
    },
    // 查看指定直销员组的详情
    handleWatch(o) {
      this.selectFilter = [];
      // this.getSellerDetails(o);
      this.previewObj = o;
      if (o.filter == null || o.filter == '') {
      } else {
        const str = o.filter;
        const arr = str.split('#');
        arr.pop();
        const lastTmpArr = [];
        for (let i = 0; i < arr.length; i++) {
          const obj = {};
          const tmpStr = '';
          let timeNumFilter = [];
          const tmpArr = arr[i].split('筛选条件为');
          timeNumFilter = tmpArr[0].split(',');
          timeNumFilter = timeNumFilter.join('');
          let otherFilter = tmpArr[1];
          otherFilter = otherFilter.replace('(', '');
          // otherFilter = otherFilter.replace(")","");
          otherFilter = otherFilter.replace(/(.*)\)(.*)/g, '$1$2', '');
          otherFilter = otherFilter.replace(';', '');
          otherFilter = otherFilter.replace(/\:/g, '：');
          otherFilter = otherFilter.replace(/\[/g, '');
          otherFilter = otherFilter.replace(/\]/g, '');
          const ss = otherFilter.split(',');
          obj.timeNumFilter = timeNumFilter;
          obj.otherFilter = ss;
          lastTmpArr.push(obj);
        }
        this.selectFilter = lastTmpArr.reverse();
      }

      this.previewBoxFlag = true;

      // let showstr = arr[arr.length-1].split("筛选条件为")[1];
      // // alert(showstr);
      // showstr = showstr.replace("(","");
      // showstr = showstr.replace(")","");
      // let showArr = showstr.split(",");
      // showArr.pop();
      // console.log(arr[arr.length-1]);
    },
    // 取消修改
    cancelModify() {
      this.changeBoxFlag = false;
    },
    // 修改
    handleChange(o) {
      this.changeBoxFlag = true;
      this.beforeModifyName = o.userGroupName;
      this.beforeModifyDesc = o.desc;
      this.userAccount = o.userAccount;
      this.modifyObj = this.previewObj;
      this.modifyId = o.id;
      this.modifyDesc = o.desc;
      this.modifyName = o.userGroupName;
      this.modifyStatus = o.status;
    },
    // 删除直销员组
    handleDelete(e) {
      const _this = this;
      this.$confirm('您确定要删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const loadingInstance = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            target: '#app-view'
          });
          const _this = this;
          axios
            .post(`${this.apiUrl}vipcenter/userGroup/updateUserGroup`, {
              id: e.id,
              status: -1,
              userAccount: e.userAccount,
              desc: e.desc,
              userGroupName: e.userGroupName
            })
            .then((data) => {
              _this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close();
              });
              if (data.data.isSuccess) {
                _this.$message({
                  type: 'success',
                  message: '操作成功'
                });
                _this.getUserGroupList();
              } else {
                _this.$message(data.data.msg);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 管理直销员组下的直销员
    handleManage(id) {
      const that = this;
      const loadingInstance = Loading.service({
        target: '#app-view',
        lock: true,
        text: 'Loading',
        target: '#app-view',
        spinner: 'el-icon-loading'
      });
      axios
        .post(`${this.apiUrl}vipcenter/userGroup/checkUserGroup`, {
          groupId: id
        })
        .then((response) => {
          that.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (response.data.data == false) {
            that.$message.warning('该用户组已经关联了一站式配置，不能管理');
          } else if (response.data.data == true) {
            that.$router.push({ name: 'userGroupscreen', query: { id } });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取直销员组，每个直销员组的创建时间改变了格式
    getUserGroupList() {
      const _this = this;
      axios
        .post(`${this.apiUrl}vipcenter/userGroup/selectPage`, {
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
        .then((data) => {
          if (data.data.isSuccess) {
            _this.userGroupList = data.data.data.entities;
            _this.total = data.data.data.entityCount;
            _this.userGroupList.forEach((e) => {
              e.crTime = _this.formatDate(e.crTime);
            });
          } else {
            _this.$message(data.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSellerDetails(o) {
      // let _this=this;
      // let loadingInstance = Loading.service({
      //     lock: true,
      //     text: 'Loading',
      //     spinner: 'el-icon-loading',
      //     target:'#app-view',
      //
      //   });
      //   axios.post(this.apiUrl+'vipcenter/sellerGroupr/querySellerGroupDetail',qs.stringify({
      //               id: id
      //       })).then(function(data) {
      //     _this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      //         loadingInstance.close();
      //       });
      //       if(data.data.isSuccess==true){
      //           _this.previewObj=data.data.data;
      //           _this.previewObj.forEach(function(e) {
      //               e.crTime=_this.formatDate(e.crTime);
      //           });
      //         _this.previewBoxFlag = true;
      //       }else{
      //           _this.$message(data.data.msg);
      //           return
      //       }
      //   }).catch(function (error) {
      //       console.log(error);
      //   });
    },
    handleClose() {},
    // 返回一站式第三步
    backtoThree() {
      if (this.onestepThree == 1) {
        this.$router.push({ path: '/dbOperate/rightsconfigrutionthree', query: { id: this.onestepId } });
      } else if (this.onestepThree == 2) {
        this.$router.push({ path: '/dbOperate/survey/updateSurvey', query: { id: this.onestepId } });
      }
    },
    // 更改时间格式
    formatDate(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
      const hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
      const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
      return `${year}年${month}月${day}日 ${hour}:${minutes}`;
    },
    // 创建用户员组
    crGroupFinish() {
      // /sellerGroupr/addSellerGroup
      const tmpName = this.newGroupName.replace(/(^\s*)|(\s*$)/g, '');

      if (tmpName == '' || tmpName == undefined || tmpName == null) {
        this.$message({
          type: 'warning',
          message: '请输入用户员组名称'
        });
        return;
      }

      const tmpDesc = this.newGroupDesc.replace(/(^\s*)|(\s*$)/g, '');
      if (tmpDesc == '' || tmpDesc == undefined || tmpDesc == null) {
        this.$message({
          type: 'warning',
          message: '请输入用户员组描述'
        });
        return;
      }

      for (let i = 0; i < this.userGroupList.length; i++) {
        if (tmpName == this.userGroupList[i].sellerGroupName) {
          this.$message({
            type: 'warning',
            message: '已存在改用户员组名称'
          });
          return;
        }
      }
      const loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        target: '#app-view'
      });
      const _this = this;
      axios
        .post(`${this.apiUrl}vipcenter/userGroup/addUserGroup`, {
          userGroupName: this.newGroupName,
          desc: this.newGroupDesc,
          status: 2
        })
        .then((data) => {
          _this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          _this.dialogVisible = false;
          if (data.data.isSuccess == true) {
            _this.newGroupName = '';
            _this.newGroupDesc = '';
            _this.$message({
              type: 'success',
              message: '新增成功'
            });
            _this.$router.push({
              path: '/dbOperate/userGroupManage/userGroupscreen',
              query: { id: data.data.data.id }
            });
          } else {
            _this.$message(data.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  updated() {
    if (this.$route.path == '/dbOperate/userGroupManage/userGroupscreen') {
      this.showManage = false;
    } else {
      this.showManage = true;
    }
  },
  mounted() {
    // let loadingInstance = Loading.service({
    //     target:'#app-view',
    //     lock: true,
    //     text: 'Loading',
    //     spinner: 'el-icon-loading',
    //   });
    this.onestepThree = this.$route.query.onestepThree;
    this.onestepId = this.$route.query.id;
    this.getUserGroupList();
    // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
    //   loadingInstance.close();
    // });
  },
  watch: {
    showManage: 'getUserGroupList'
  }
};
</script>
<style scoped>
.btn {
  color: #1fb5fc !important;
  margin: 0 5px;
}
.btn:hover {
  cursor: pointer;
}
.newGroup {
  float: right;
  width: 120px;
  margin: 0 15px 10px 0;
}
.sellerGroup .el-checkbox {
  margin: 7px 0 0 25px;
}
.sellerGroup {
  padding: 15px 0;
  box-shadow: 1px 0px 1px 2px #ccc;
  width: 200px;
  overflow: hidden;
}
.sellerGroup .el-checkbox {
  display: flex;
  line-height: 18px;
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
  padding: 0 10px;
  color: #333;
  font-size: 18px;
  margin-top: 10px;
}
.infoBox {
  margin-top: 10px;
  padding-left: 5px;
}
.infoBox div {
  padding: 2px 0;
  color: #48576a;
  font-size: 14px;
}
.infoBox div span {
  font-weight: 600;
  font-size: 14px;
}
.userGroupManage .changeBox .infoBoxR {
  width: 250px;
}
.userGroupManage .addBox .infoBoxR {
  width: 250px;
}
</style>
<style>
.userGroupManage .creatGroup .el-dialog {
  width: 300px;
}

.userGroupManage .directSeller .el-dialog--small {
  width: 250px;
}
.userGroupManage .el-dialog {
  top: 20% !important;
  width: 450px !important;
}
.userGroupManage .el-dialog__body {
  padding-left: 30px;
}
.userGroupManage .addBox .el-dialog__body {
  padding: 30px 20px;
}
.userGroupManage .changeBox .el-dialog__body {
  padding: 30px 20px;
}
.userGroupManage .el-table__row .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.userGroupManage .previewBox .el-dialog__body {
  padding: 10px 20px 20px;
}
.userGroupManage .addBox .el-dialog {
  top: 20% !important;
  width: 300px !important;
}
.userGroupManage .changeBox .el-dialog {
  top: 20% !important;
  width: 300px !important;
}
.userGroupManage .iitemClass button {
  display: inline-block;
  /* line-height: 1; */
  white-space: nowrap;
  cursor: pointer;
  padding: 0;
  border: none;
  text-align: left;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
