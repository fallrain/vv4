<template>
  <div style="padding: 20px;" class="xwGroupA">
    <div class="header">
      <p class="template-brand">
        <i></i>小微组管理
        <el-button type="primary" class="newGroup" @click="dialogVisible = true">新建组</el-button>
      </p>
    </div>
    <div class="body">
      <el-table v-loading="loading" :data="xwGroupList" style="width: 100%">
        <el-table-column prop="xwGroupName" label="小微组名称"> </el-table-column>
        <el-table-column prop="desc" label="小微组描述"> </el-table-column>
        <el-table-column prop="xwAccount" label="小微数量"> </el-table-column>
        <el-table-column label="启动状态" center prop="status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              on-color="#13ce66"
              off-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="switchChange(scope.row.id, scope.row.status)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="crTime" label="创建时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a class="btn" @click="handleChange(scope.row)">修改</a>
            <a class="btn" @click="handleDelete(scope.row)">删除</a>
            <a class="btn" @click="handleManage(scope.row)">管理</a>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="entityCount"
        border
        style="margin-top: 20px;"
      >
      </el-pagination>
    </div>

    <el-dialog
      title="新建组"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      class="creatGroup1 trs-dialog"
      top="40%"
    >
      <div style="display: flex;">
        <span style="height: 36px;line-height: 36px;">组名：</span>
        <el-input style="width: 200px;" v-model="newGroupName"></el-input>
      </div>
      <div style="display: flex;margin-top: 10px;">
        <span style="height: 36px;line-height: 36px;">描述：</span>
        <el-input
          style="width: 200px;"
          v-model="newGroupdesc"
          :maxlength="14"
          placeholder="描述不超过14个字"
        ></el-input>
      </div>
      <div style="margin: 20px auto 0; text-align: center;">
        <el-button type="primary" @click="crGroupFinish">确认添加</el-button>
        <el-button type="primary" @click="dialogVisible = false"> 取 消 </el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改小微组信息"
      :visible.sync="dialogVisible1"
      class="creatGroup1  trs-dialog"
      top="40%"
      :modal-append-to-body="false"
    >
      <div style="display: flex;">
        <span style="height: 36px;line-height: 36px;">组名：</span>
        <el-input style="width: 200px;" v-model="changeGroupName" :maxlength="14"></el-input>
      </div>
      <div style="display: flex;margin-top: 10px;">
        <span style="height: 36px;line-height: 36px;">描述：</span>
        <el-input style="width: 200px;" v-model="changeGroupdesc" :maxlength="14"></el-input>
      </div>
      <div style="margin: 20px auto 0; text-align: center;">
        <el-button type="primary" @click="changeGroupFinish">确认修改</el-button>
        <el-button type="primary" @click="dialogVisible1 = false">取消编辑</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="管理小微组"
      :visible.sync="dialogVisible2"
      class="creatGroup trs-dialog"
      top="25%"
      :modal-append-to-body="false"
    >
      <div>
        <span class="xw">{{ manageGroupName }}</span>
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange" class="xw-checkAll">全选</el-checkbox>
        <div style="display: flex;width: 100%;">
          <div class="hide-scroll">
            <div style="font-size: 16px;font-weight: 500;margin: 5px 15px 0;">已选小微:</div>
            <div style="padding-right: 5px;border-right: 1px solid #ccc;">
              <ul class="xiaowei-list">
                <li
                  v-for="xw in newxwList"
                  :key="xw.xwName"
                  style="cursor: pointer;"
                  class="df-xiaowei"
                  @click="xwDelete(xw)"
                >
                  {{ xw.xwName }}
                </li>
              </ul>
            </div>
          </div>
          <!-- <span class="come">＋</span> -->
          <div class="hide-scroll">
            <div style="font-size: 16px;font-weight: 500;margin-left: 10px;margin-top: 5px;">可添加小微:</div>
            <el-checkbox-group v-model="xwCheckList" @change="handleCheckedCitiesChange" class="xiaowei-list">
              <el-checkbox v-for="xw in xwList" :label="xw" class="df-xiaowei">
                <span :title="xw.filter">{{ xw.xwName }}</span>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div style="margin: 20px auto 0; text-align: center;">
        <el-button type="primary" @click="manageGroupFinish">确认添加</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">取消编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import Qs from 'qs';

export default {
  data() {
    return {
      value2: true,
      xwGroupList: [],
      currentPage: 1,
      dialogVisible: false, // 创建小微组弹框是否显示
      newGroupName: '', // 新建小微组名称
      newGroupdesc: '', // 新建小微组描述
      dialogVisible1: false, // 修改小微组弹框是否显示
      pageNo: 1,
      pageSize: 10,
      entityCount: 0,
      changeGroupName: '', // 修改后的小微组名称
      changeGroupdesc: '', // 修改后的小微组描述
      changeGroupid: '', // 修改的小微组id
      dialogVisible2: false, // 管理小微组弹框是否显示
      manageGroupid: '', // 管理的小微组id
      manageGroupName: '', // 管理的小微组名称
      xwCheckList: [], // 指定小微组下的小微
      xwList: [], // 所有小微
      checkAll: false,
      xwOptions: [],
      newxwList: [],
      deletexwGroupid: '',
      loading: false
    };
  },
  methods: {
    handleSizeChange(pageSize) {
      this.loading = true;
      const _this = this;
      this.pageSize = pageSize;
      axios
        .post(`${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwGroupPage`, {
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
        .then((response) => {
          if (response.data.isSuccess == true) {
            _this.xwGroupList = response.data.data.entities;
            _this.xwGroupList.forEach((e) => {
              e.crTime = _this.formatDate(e.crTime);
            });
            _this.entityCount = response.data.data.entityCount;
            _this.loading = false;
          } else {
            _this.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleCurrentChange(pageNo) {
      const _this = this;
      this.loading = true;
      this.pageNo = pageNo;
      // console.log(this.pageSize);
      axios
        .post(`${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwGroupPage`, {
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
        .then((response) => {
          if (response.data.isSuccess == true) {
            _this.xwGroupList = response.data.data.entities;
            _this.xwGroupList.forEach((e) => {
              e.crTime = _this.formatDate(e.crTime);
            });
            _this.entityCount = response.data.data.entityCount;
            _this.loading = false;
            // _this.$message({
            //   type: 'success',
            //   message: '修改成功！'
            // })
          } else {
            _this.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查看指定小微组的小微
    // handleWatch(){
    //     var _this=this;
    //       axios({
    //         url: this.apiUrl+'vipcenter/xiaoWeiGroup/queryXwGroupDetail',
    //         method: 'post',
    //         transformRequest: [function (data) {
    //             // 对 data 进行任意转换处理
    //             return Qs.stringify(data)
    //         }],
    //         headers: {
    //           'deviceCode': 'A95ZEF1-47B5-AC90BF3'
    //         },
    //         data: {
    //           "id":25
    //         }
    //     })
    //       .then(function (response) {
    //         console.log(response);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //     alert();
    // },
    // 修改小微组
    handleChange(e) {
      // console.log(e);
      this.changeGroupid = e.id;
      this.changeGroupName = e.xwGroupName;
      this.changeGroupdesc = e.desc;
      this.dialogVisible1 = true;
    },

    changeGroupFinish(e) {
      const _this = this;
      axios
        .post(`${this.apiUrl}vipcenter/xiaoWeiGroup/update`, {
          desc: this.changeGroupdesc,
          id: this.changeGroupid,
          xwGroupName: this.changeGroupName
        })
        .then((response) => {
          if (response.data.isSuccess) {
            _this.$message({
              type: 'success',
              message: '修改成功！'
            });
            _this.getXiaoWeiGroup();
            _this.dialogVisible1 = false;
          } else {
            _this.$message({
              type: 'warning',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 删除小微组
    handleDelete(e) {
      const _this = this;
      this.deletexwGroupid = e.id;
      this.$confirm('您确定要删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          axios({
            url: `${_this.apiUrl}vipcenter/xiaoWeiGroup/updateXwGroupStatus`,
            method: 'post',
            transformRequest: [
              function (data) {
                return Qs.stringify(data);
              }
            ],
            headers: {
              deviceCode: 'A95ZEF1-47B5-AC90BF3'
            },
            data: {
              id: _this.deletexwGroupid,
              status: -1
            }
          })
            .then((data) => {
              if (data.data.isSuccess) {
                _this.$message({
                  type: 'success',
                  message: '删除成功！'
                });
                // let index=_this.xwGroupList.indexOf(e);
                // _this.xwGroupList.splice(index,1);
                _this.getXiaoWeiGroup();
              } else {
                _this.$message(data.data.msg);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 管理小微组下的小微
    handleManage(e) {
      this.xwCheckList = [];
      this.newxwList = [];
      this.xwList = [];
      this.manageGroupid = e.id;
      this.manageGroupName = e.xwGroupName;
      this.getxwList();
      const _this = this;
      axios({
        url: `${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwByGroupId`,
        method: 'post',
        transformRequest: [
          function (data) {
            return Qs.stringify(data);
          }
        ],
        data: {
          xwGroupId: this.manageGroupid
        }
      })
        .then((response) => {
          if (response.data.isSuccess) {
            if (response.data.data) {
              const a = response.data.data;
              _this.newxwList = a;
              for (let i = 0; i < a.length; i++) {
                for (let j = 0; j < _this.xwList.length; j++) {
                  if (a[i].xwId == _this.xwList[j].xwId) {
                    _this.xwList.splice(j, 1);
                    j--;
                  }
                }
              }
              _this.xwOptions = _this.xwList;
              _this.dialogVisible2 = true;
            } else {
              _this.newxwList = [];
              _this.dialogVisible2 = true;
            }
            // _this.$message({
            //       type: 'success',
            //       message:  '修改成功！'
            //     });
          } else {
            _this.$message({
              type: 'warning',
              message: data.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleCheckAllChange() {
      if (this.xwCheckList.length != this.xwList.length) {
        const arr = [];
        for (let i = 0; i < this.xwList.length; i++) {
          arr.push(this.xwList[i]);
        }
        this.xwCheckList = arr;
      } else {
        this.xwCheckList = [];
      }
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.xwList.length;
    },
    // 删除小微组中的已有小微
    // xwDelete(e){
    //     let index=this.xwCheckList.indexOf(e);
    //     if(index>=0){
    //         this.xwCheckList.splice(index,1);
    //     }
    // },
    manageGroupFinish() {
      const _this = this;
      const xwIds = [];
      const arr = this.xwCheckList;
      arr.forEach((e) => {
        xwIds.push(e.xwId);
      });
      const params = {
        xwGroupIds: [this.manageGroupid],
        xwIds
      };
      axios.post(`${this.apiUrl}vipcenter/xiaoWeiGroup/addRelate`, params).then((response) => {
        _this.$message(response.data.msg);
        if (response.data.isSuccess) {
          // _this.newxwList=_this.newxwList.concat(_this.xwCheckList);
          _this.getXiaoWeiGroup();
          _this.$message({
            type: 'success',
            message: '修改成功！'
          });
          _this.dialogVisible2 = false;
        } else {
          _this.$message({
            type: 'warning',
            message: data.data.msg
          });
        }
      });
    },
    // 获取小微组，每个小微组的创建时间改变了格式
    getXiaoWeiGroup() {
      const _this = this;
      const params = {
        pageSize: this.pageSize,
        pageNo: this.pageNo
      };
      axios
        .post(`${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwGroupPage`, params)
        .then((data) => {
          // console.log(data);
          if (data.data.isSuccess) {
            _this.xwGroupList = data.data.data.entities;
            _this.xwGroupList.forEach((e) => {
              e.crTime = _this.formatDate(e.crTime);
            });
            _this.entityCount = data.data.data.entityCount;
          } else {
            _this.$message({
              type: 'warning',
              message: data.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 更改时间格式
    formatDate(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
      const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
      return `${year}-${month}-${day}`;
    },
    // 创建小微组
    crGroupFinish() {
      // console.log(this.newGroupName);
      const _this = this;
      // console.log(this.newGroupName);
      if (this.newGroupName.length > 0) {
        const params = {
          desc: this.newGroupdesc,
          xwGroupName: this.newGroupName
        };
        axios
          .post(`${this.apiUrl}vipcenter/xiaoWeiGroup/add`, params)
          .then((data) => {
            if (data.data.isSuccess) {
              // let obj={};
              // obj.crTime=_this.formatDate(new Date());
              // obj.xwGroupName=_this.newGroupName;
              // obj.xwAccount=0;
              // obj.status=-1;
              // obj.desc=_this.newGroupdesc;
              // _this.xwGroupList.push(obj);
              _this.newGroupName = '';
              _this.newGroupdesc = '';
              _this.getXiaoWeiGroup();
              _this.$message({
                type: 'success',
                message: '添加成功！'
              });
            } else {
              _this.$message({
                type: 'warning',
                message: data.data.msg
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        this.dialogVisible = false;
      } else {
        _this.$message('请输入组名！');
      }
    },
    // 改变状态
    switchChange(id, status) {
      const _this = this;
      axios({
        url: `${_this.apiUrl}vipcenter/xiaoWeiGroup/updateXwGroupStatus`,
        method: 'post',
        transformRequest: [
          function (data) {
            return Qs.stringify(data);
          }
        ],
        data: {
          id,
          status
        }
      })
        .then((response) => {
          if (response.data.isSuccess) {
            _this.$message({
              type: 'success',
              message: '修改成功！'
            });
          } else {
            _this.$message({
              type: 'warning',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取所有小薇
    getxwList() {
      const _this = this;
      axios
        .post(`${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwAll`)
        .then((response) => {
          if (response.data.isSuccess) {
            _this.xwList = response.data.data;
            _this.xwOptions = response.data.data;
          } else {
            _this.$message(response.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getXiaoWeiGroup();
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
.xw {
  font-size: 16px;
  font-weight: 600;
}
.xw-checkAll {
  float: right;
}
.hide-scroll {
  width: 50%;
  /*height: 255px;*/
  /*padding-left: 10px; */
}
.xiaowei-list {
  height: 235px;
  width: 100%;
  margin-top: 10px;
  overflow-y: scroll;
}
.df-xiaowei {
  /*margin: 5px 25px;*/
  width: 125px;
  padding-right: 10px;
  margin-left: 35px !important;
  margin-bottom: 2px !important;
  box-sizing: border-box;
}
.come {
  font-size: 30px;
  color: red;
  background-color: white;
  position: absolute;
  top: 45%;
  left: 44%;
}
</style>
<style>
.xwGroupA .creatGroup .el-dialog {
  width: 400px;
}
.xwGroupA .creatGroup1 .el-dialog {
  width: 300px;
}
</style>
