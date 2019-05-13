<template>
  <div>
    <router-view></router-view>
    <div style="padding: 20px;" class="sellerGroupManage" v-show="showSeller">
      <div class="header">
        <p class="template-brand">
          <i></i>直销员组管理
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
        <el-table :data="sellerGroupList" style="width: 100%">
          <el-table-column prop="sellerGroupName" min-width="15%" show-overflow-tooltip label="直销员组名称">
          </el-table-column>
          <el-table-column prop="sellerAccount" min-width="10%" show-overflow-tooltip label="直销员数量">
          </el-table-column>
          <el-table-column label="启动状态" center min-width="10%" prop="status">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                on-color="#13ce66"
                off-color="#ff4949"
                @change="switchChange(scope.row)"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="crUserName" min-width="10%" show-overflow-tooltip label="创建人"> </el-table-column>
          <el-table-column prop="crTime" min-width="15%" show-overflow-tooltip label="创建时间"> </el-table-column>
          <el-table-column min-width="30%" label="操作">
            <template slot-scope="scope">
              <a class="btn" @click="handleWatch(scope.row.id)">查看</a>
              <a class="btn" @click="handleChange(scope.row)">修改</a>
              <a class="btn" @click="handleDelete(scope.row)">删除</a>
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
      <div class="addGr">
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
          :before-close="previewClose"
          :modal-append-to-body="false"
          class="creatGroup trs-dialog"
          :show-close="true"
        >
          <div style="width: 100%;height: 1px;background-color: #bbb;"></div>
          <div class="baseInfo">
            <div class="infoBox">
              <div class="infoBoxC">
                <span>组名：</span>
                <div class="infoBoxR">{{ previewObj.sellerGroupName }}</div>
              </div>
              <div class="infoBoxC">
                <span>描述：</span>
                <div class="infoBoxR">{{ previewObj.desc }}</div>
              </div>
              <div class="infoBoxC">
                <span>直销员数量：</span>
                <div class="infoBoxR">{{ previewObj.sellerAccount }}</div>
              </div>
              <div class="infoBoxC">
                <span>创建人：</span>
                <div class="infoBoxR">{{ previewObj.crUserName }}</div>
              </div>

              <div class="infoBoxC">
                <span>创建时间：</span>
                <div class="infoBoxR">{{ previewObj.crTime | formatDate }}</div>
              </div>
              <div class="infoBoxC">
                <span>状态：</span>
                <div class="infoBoxR">{{ previewObj.status | statusFilter }}</div>
              </div>
              <div class="infoBoxC">
                <div><span style="white-space: nowrap;">操作历史：</span></div>
                <div class="infoBoxR">
                  <div v-if="selectFilter.length > 0">( 顶部为最新操作 )</div>
                  <div v-if="selectFilter.length == 0">( 无操作记录 )</div>
                  <div v-for="(item, index) in selectFilter">
                    <div style="display:flex;margin-top: 10px;">
                      <div style="font-size: 20px;margin-right: 3px;">◆</div>
                      <div>
                        <div style="">{{ item.timeNumFilt }}</div>
                        <div style="display: flex" v-show="item.otherFit != ''">
                          <div style="white-space: nowrap;">筛选条件：</div>
                          <div style="white-space: normal;">
                            <div
                              v-for="op in item.otherFit"
                              style="display: flex;white-space: normal;"
                              class="iitemClass"
                            >
                              <div style="white-space: nowrap;">◇ {{ op.name }}：</div>
                              <!-- <div>{{op.content}}</div> -->
                              <el-tooltip placement="bottom-end" :visible-arrow="false">
                                <div slot="content">
                                  <!-- <div v-for="iitem in op.contentArr">{{iitem}}、</div> -->
                                  {{ op.name }}：&nbsp;&nbsp;{{
                                    op.contentaddStr == '全部小微'
                                      ? allXwNameStr == ''
                                        ? '全部小微'
                                        : allXwNameStr
                                      : op.contentaddStr
                                  }}
                                </div>
                                <el-button>{{ op.content }}</el-button>
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
// const loadingloadingInstance = Loading.service({
//   lock: true,
//   text: 'Loading',
//   spinner: 'el-icon-loading',
//

// });
export default {
  data() {
    return {
      showSeller: true,
      value2: true,
      sellerGroupList: [],
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
      selectFilter: [],
      onestepThree: 0,
      onestepId: 0,
      allXwNameStr: '' // 所有小微
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
      if (value == 0) {
        return '关闭';
      } if (value == -1) {
        return '删除';
      } if (value == 1) {
        return '开启';
      }
    }
  },
  methods: {
    // 返回一站式第三步：
    backtoThree() {
      if (this.onestepThree == 1) {
        this.$router.push({ path: '/dbOperate/rightsconfigrutionthree', query: { id: this.onestepId } });
      } else if (this.onestepThree == 2) {
        this.$router.push({ path: '/dbOperate/survey/updateSurvey', query: { id: this.onestepId } });
      }
    },
    handleSizeChange(pageSize) {
      const that = this;
      this.pageSize = pageSize;
      this.getSellerGroup();
    },
    handleCurrentChange(pageNo) {
      const that = this;
      this.pageNo = pageNo;
      this.getSellerGroup();
    },
    switchChange(o) {
      // app-view
      const loadingInstance = Loading.service({
        ftarget: '#app-view',
        lock: true,
        target: '#app-view',
        text: 'Loading',
        spinner: 'el-icon-loading'
      });

      const _this = this;
      axios
        .get(`${this.apiUrl}vipcenter/sellerGroupr/updateState`, {
          params: {
            id: o.id,
            status: o.status
          }
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
            _this.getSellerGroup();
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
          message: '请输入直销员组名称'
        });
        return;
      }
      if (tmpModifyDesc == '' || tmpModifyDesc == undefined || tmpModifyDesc == null) {
        this.$message({
          type: 'warning',
          message: '请输入直销员组描述'
        });
        return;
      }
      // for(var i=0;i<this.sellerGroupList.length;i++){
      //   if(tmpModifyName==this.sellerGroupList[i].sellerGroupName){
      //     this.$message({
      //       type:"warning",
      //       message:"已存在改直销员组名称"
      //     })
      //     return;
      //   }
      // }
      // 这个地方：
      const loadingInstance = Loading.service({
        target: '#app-view',
        lock: true,
        text: 'Loading',
        target: '#app-view',
        spinner: 'el-icon-loading'
      });
      const _this = this;
      axios
        .post(`${this.apiUrl}vipcenter/sellerGroupr/update`, {
          id: this.modifyId,
          sellerGroupName: this.modifyName,
          desc: this.modifyDesc
        })
        .then((data) => {
          _this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (data.data.isSuccess) {
            _this.$message({
              type: 'success',
              message: '修改成功'
            });
            _this.getSellerGroup();
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
    handleWatch(id) {
      this.selectFilter = [];
      this.getSellerDetails(id);
      // this.previewBoxFlag = true;
    },
    // 取消修改
    cancelModify() {
      this.changeBoxFlag = false;
    },
    // 修改
    handleChange(o) {
      this.changeBoxFlag = true;
      this.beforeModifyName = o.sellerGroupName;
      this.beforeModifyDesc = o.desc;
      this.getSellerDetails2(o.id);

      this.modifyObj = this.previewObj;
      this.modifyId = o.id;
      this.modifyDesc = o.desc;
      this.modifyName = o.sellerGroupName;
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
          const o = new Object();
          o.id = e.id;
          o.status = -1;
          this.switchChange(o);
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
        .post(`${this.apiUrl}vipcenter/sellerGroupr/checkSellerGroup`, {
          id
        })
        .then((response) => {
          that.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (response.data.data == false) {
            that.$message.warning('该直销员组已经关联了一站式配置，不能管理');
          } else if (response.data.data == true) {
            that.$router.push({ name: 'rightsDirectseller', query: { id } });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取直销员组，每个直销员组的创建时间改变了格式
    getSellerGroup() {
      const _this = this;
      axios
        .post(`${this.apiUrl}vipcenter/sellerGroupr/querySellerGroupAllByPage`, {
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
        .then((data) => {
          if (data.data.isSuccess) {
            _this.sellerGroupList = data.data.data.entities;
            _this.total = data.data.data.entityCount;
            _this.sellerGroupList.forEach((e) => {
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
    getSellersByGroupId(id) {
      const _this = this;
      const loadingInstance = Loading.service({
        target: '#app-view',
        target: '#app-view',
        background: 'rgba(0,0,0,.7)',
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      });
      axios
        .post(`${this.apiUrl}vipcenter/sellerGroupr/getSellersByGroupId`, { id })
        .then((data) => {
          _this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (data.data.isSuccess) {
            _this.sellerGroupList = data.data.data;
            _this.sellerGroupList.forEach((e) => {
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
    getSellerDetails(id) {
      const _this = this;
      // let loadingInstance = Loading.service({
      //     fullscreen: true,
      //     target:'#app-view',
      //     background: 'rgba(0, 0, 0, 0.7)',
      //     lock: true,
      //     text: 'Loading',
      //     spinner: 'el-icon-loading',

      //   });
      axios
        .post(
          `${this.apiUrl}vipcenter/sellerGroupr/querySellerGroupDetail`,
          qs.stringify({
            id
          })
        )
        .then((data) => {
          // _this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          //     loadingInstance.close();
          //   });
          if (data.data.isSuccess == true) {
            _this.previewObj = data.data.data;
            // _this.previewObj.forEach(function(e) {
            //     e.crTime=_this.formatDate(e.crTime);
            // });
            const showTmp = [];
            if (data.data.data.filter == null || data.data.data.filter == '') {
            } else {
              const showTmpArr = data.data.data.filter.split('#');
              for (let i = 0; i < showTmpArr.length; i++) {
                const obj = {};
                let timeNumFilt = '';
                if (showTmpArr[i].indexOf(',筛选条件') != -1) {
                  const tmpArr = showTmpArr[i].split(',筛选条件');
                  // var reg=/)$/gi;//正则去除最后一个)
                  timeNumFilt = tmpArr[0];
                  let otherFit = tmpArr[1];
                  otherFit = otherFit.replace('(', '');
                  otherFit = otherFit.replace(/\)$/gi, '');
                  const otherArr = otherFit.split(';');
                  var tmptmpObj = {};
                  const lastArr = [];
                  for (let j = 0; j < otherArr.length; j++) {
                    var tmptmpObj = {};
                    const mmarr = otherArr[j].split('：');
                    const contentArr = mmarr[1].split(',');
                    const contentaddStr = contentArr.join('、');
                    tmptmpObj.name = mmarr[0];
                    tmptmpObj.content = mmarr[1];
                    tmptmpObj.contentaddStr = contentaddStr;
                    lastArr.push(tmptmpObj);
                  }
                  obj.timeNumFilt = timeNumFilt;
                  obj.otherFit = lastArr;
                  showTmp.push(obj);
                } else {
                  const tmpArr = showTmpArr[i];
                  timeNumFilt = tmpArr;
                  const otherFit = '';
                  obj.timeNumFilt = timeNumFilt;
                  obj.otherFit = otherFit;
                  showTmp.push(obj);
                }
              }
              _this.selectFilter = showTmp.reverse();
              // _this.previewBoxFlag = true;
            }

            _this.previewBoxFlag = true;

            // alert(showTmpArr);
          } else {
            _this.$message(data.data.msg);
          }
        })
        .catch((error) => {
          // _this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          //     loadingInstance.close();
          //   });
          console.log(error);
        });
    },
    // 修改时触发
    getSellerDetails2(id) {
      const _this = this;
      // let loadingInstance = Loading.service({
      //     fullscreen: true,
      //     target:'#app-view',
      //     background: 'rgba(0, 0, 0, 0.7)',
      //     lock: true,
      //     text: 'Loading',
      //     spinner: 'el-icon-loading',

      //   });
      axios
        .post(
          `${this.apiUrl}vipcenter/sellerGroupr/querySellerGroupDetail`,
          qs.stringify({
            id
          })
        )
        .then((data) => {
          // _this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          //     loadingInstance.close();
          //   });
          if (data.data.isSuccess == true) {
            _this.previewObj = data.data.data;
            // _this.previewObj.forEach(function(e) {
            //     e.crTime=_this.formatDate(e.crTime);
            // });
            const showTmp = [];
            if (data.data.data.filter == null || data.data.data.filter == '') {
            } else {
              const showTmpArr = data.data.data.filter.split('#');
              for (let i = 0; i < showTmpArr.length; i++) {
                const obj = {};
                let timeNumFilt = '';
                if (showTmpArr[i].indexOf(',筛选条件') != -1) {
                  const tmpArr = showTmpArr[i].split(',筛选条件');
                  timeNumFilt = tmpArr[0];
                  let otherFit = tmpArr[1];
                  otherFit = otherFit.replace('(', '');
                  otherFit = otherFit.replace(')', '');
                  const otherArr = otherFit.split(';');
                  obj.timeNumFilt = timeNumFilt;
                  obj.otherFit = otherArr;
                  showTmp.push(obj);
                } else {
                  const tmpArr = showTmpArr[i];
                  timeNumFilt = tmpArr;
                  const otherFit = '';
                  obj.timeNumFilt = timeNumFilt;
                  obj.otherFit = otherFit;
                  showTmp.push(obj);
                }
              }
              // showTmp.reverse();
              _this.selectFilter = showTmp.reverse();
            }

            // alert(showTmpArr);
          } else {
            _this.$message(data.data.msg);
          }
        })
        .catch((error) => {
          // _this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          //     loadingInstance.close();
          //   });
          console.log(error);
        });
    },
    handleClose() {},
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
    // 创建直销员组
    crGroupFinish() {
      // /sellerGroupr/addSellerGroup
      const tmpName = this.newGroupName.replace(/(^\s*)|(\s*$)/g, '');

      if (tmpName == '' || tmpName == undefined || tmpName == null) {
        this.$message({
          type: 'warning',
          message: '请输入直销员组名称'
        });
        return;
      }

      const tmpDesc = this.newGroupDesc.replace(/(^\s*)|(\s*$)/g, '');
      if (tmpDesc == '' || tmpDesc == undefined || tmpDesc == null) {
        this.$message({
          type: 'warning',
          message: '请输入直销员组描述'
        });
        return;
      }
      for (let i = 0; i < this.sellerGroupList.length; i++) {
        if (tmpName == this.sellerGroupList[i].sellerGroupName) {
          this.$message({
            type: 'warning',
            message: '已存在改直销员组名称'
          });
          return;
        }
      }
      const loadingInstance = Loading.service({
        ftarget: '#app-view',
        lock: true,
        target: '#app-view',
        text: 'Loading',
        spinner: 'el-icon-loading'
      });
      const _this = this;
      axios
        .post(`${this.apiUrl}vipcenter/sellerGroupr/addSellerGroup`, {
          sellerGroupName: this.newGroupName,
          desc: this.newGroupDesc
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
              path: '/dbOperate/sellerGroupManage/rightsDirectseller',
              query: { id: data.data.data.id }
            });
          } else {
            _this.$message(data.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sellerGroupGetAllXw() {
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwAll`)
        .then((response) => {
          if (response.data.isSuccess == true) {
            const tmpArr = [];
            for (let i = 0; i < response.data.data.length; i++) {
              tmpArr.push(response.data.data[i].xwName);
            }
            that.allXwNameStr = tmpArr.join('、');
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
  updated() {
    if (this.$route.path == '/dbOperate/sellerGroupManage/rightsDirectseller') {
      this.showSeller = false;
    } else {
      this.showSeller = true;
    }
  },
  mounted() {
    this.onestepThree = this.$route.query.onestepThree;
    this.onestepId = this.$route.query.id;
    this.getSellerGroup();
    this.sellerGroupGetAllXw();
  },
  watch: {
    showSeller: 'getSellerGroup'
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
.sellerGroupManage .changeBox .infoBoxR {
  width: 250px;
}
.sellerGroupManage .addGr .infoBoxR {
  width: 250px;
}
</style>
<style>
.sellerGroupManage .creatGroup .el-dialog {
  width: 300px;
}

.sellerGroupManage .directSeller .el-dialog--small {
  width: 250px;
}
.sellerGroupManage .el-dialog {
  top: 20%;
  width: 480px;
}

.sellerGroupManage .previewBox .el-dialog {
  /*padding-left: 30px;*/
  padding: 10px 20px 20px;
  width: 480px !important;
}
.sellerGroupManage .el-table__row .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sellerGroupManage .iitemClass button {
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
