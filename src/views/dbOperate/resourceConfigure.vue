<template>
  <div>
    <router-view></router-view>
    <div style="padding: 20px;" class="resourceConfigure" v-show="showResource">
        <div class="header">
          <p class="template-brand">
            <i></i>实物资源位配置
            <el-button type="primary" class="newGroup" @click="addNew">新建资源位</el-button>
          </p>
        </div>
        <div class="body">
            <div class="sourceType">根据资源位筛选&nbsp;&nbsp;
              <el-select v-model="selectValue"  @change="optionChange(item)">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>

            <el-table
              :data="resourceList"
              v-loading="tabLoading"
              style="width: 100%">
              <el-table-column prop="sort" label="优先级" min-width="10%"  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
              min-width="15%"
              prop="name"
                label="资源位名称">
              </el-table-column>

                    <!-- 1实物资源位 -->
                    <!-- 0权益券资源位 -->
              <el-table-column
              min-width="15%"
              prop="sourceType"
              :formatter="formatSourceType"
                label="资源位类型">
              </el-table-column>
              <el-table-column
                label="上下架状态"
                center
                min-width="10%"
                prop="status">
                <template scope="scope">
                    <el-switch
                      v-model="scope.row.status"
                      on-color="#13ce66"
                      off-color="#ff4949"
                      @change="switchChange(scope.row)"
                      :on-value="1"
                      :off-value="2">
                    </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="channel"
                min-width="25%"
                label="渠道配置">
              </el-table-column>
              <el-table-column
              min-width="30%"
                label="操作">
                <template scope="scope">
                    <a class="btn" @click="handleWatch(scope.row.id)">查看</a>
                    <a class="btn" @click="handleChange(scope.row)">修改</a>
                    <a class="btn" @click="handleDelete(scope.row.id)">删除</a>
                    <!-- <a class="btn" @click="handleManage(scope.row.id)">卡券设置</a> -->
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
          :total="total">
        </el-pagination>
      </div>


        </div>

        <div class="resourceDetails">
            <el-dialog
            title="查看详情"
            :visible.sync="resourceDetailsFlag"
            class="trs-dialog"
            :before-close="handleClose"
            :show-close="true"
            :modal-append-to-body='false'
            width="30%">
            <div style="width: 100%;height: 1px;background-color: #bbb;margin-bottom: 10px"></div>
          <div class="baseInfo">
                    <div>
                        <a :href="resourceDetails.icon" target="_blank"><img :src="resourceDetails.icon" width="100px;"></a>
                    </div>
                  <div class="infoBox">
                    <div class="infoBoxC"><span>资源位名称：</span><div class="infoBoxR">{{resourceDetails.name}}</div></div>
                    <div class="infoBoxC"><span>优先级：</span><div class="infoBoxR">{{resourceDetails.sort}}</div></div>
                    <div class="infoBoxC"><span>小微配置名称：</span><div class="infoBoxR">{{tmpXWname}}</div></div>
                    <div class="infoBoxC"><span>渠道配置：</span><div class="infoBoxR">{{resourceDetails.channel}}</div></div>
                    <div class="infoBoxC infoHtml"><span>配置说明：</span><div class="infoBoxR" v-html="resourceDetails.desc"></div></div>
                    <div class="infoBoxC"><span>状态：</span><div class="infoBoxR">{{resourceDetails.status | statusFilter}}</div></div>
                  </div>
                </div>
             </el-dialog>
        </div>


    </div>


    </div>
    </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';

export default {
  data() {
    return {
      showResource: true,
      resourceList: [],
      total: 0,
      pageSize: 10,
      pageNo: 1,
      dialogVisible: false,
      resourceDetailsFlag: false,
      resourceDetails: {},
      tabLoading: false,
      options: [{
        value: 2,
        label: '全部'
      }, {
        value: 0,
        label: '权益券资源'
      }, {
        value: 1,
        label: '实物资源'
      }],
      selectValue: 2,
      tmpXWname: '',
    };
  },
  filters: {
    statusFilter(value) {
      if (value == -1) {
        return '删除';
      } if (value == 1) {
        return '已上架';
      } if (value == 2) {
        return '已下架';
      } if (value == 3) {
        return '草稿';
      }
    },
  },
  methods: {
    optionChange(item) {
      this.pageSize = 10;
      this.pageNo = 1;
      if (this.selectValue == 2) {
        this.getSellersList();
      } else {
        this.getSellersBySourceType(this.selectValue);
      }
    },
    // 根据资源类型请求列表
    getSellersBySourceType(type) {
      this.tabLoading = true;
      const that = this;
      axios.post(`${this.apiUrl}vipcenter/vipUserManageSource/getVipSourceListBysourceType`, {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        sourceType: type
      })
        .then((response) => {
          that.tabLoading = false;
          if (response.data.isSuccess == true) {
            that.resourceList = response.data.data.entities;
            that.total = response.data.data.entityCount;
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
    getSellersList() {
      this.tabLoading = true;
      const that = this;
      axios.post(`${this.apiUrl}vipcenter/vipUserManageSource/getVipSourceLists`, {
        pageSize: this.pageSize,
        pageNo: this.pageNo
      })
        .then((response) => {
          that.tabLoading = false;
          if (response.data.isSuccess == true) {
            that.resourceList = response.data.data.entities;
            that.total = response.data.data.entityCount;
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
    handleSizeChange(pageSize) {
      const that = this;
      this.pageSize = pageSize;
      this.getSellersList();
    },
    handleCurrentChange(pageNo) {
      const that = this;
      this.pageNo = pageNo;
      this.getSellersList();
    },
    handleClose() {
      this.resourceDetailsFlag = false;
      this.resourceDetails = {};
      this.tmpXWname = '';
    },
    // 资源位类型过滤器
    formatSourceType(row, column) {
      return row.sourceType == 1 ? '实物资源位' : '权益券资源位';
    },
    // 查看
    handleWatch(id) {
      // alert(id);
      // vipcenter/vipUserManageSource/getVipSourceDetail

      this.resourceDetails = {};
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        target: '#app-view',
        background: 'rgba(255, 255, 255, 0.7)'
      });
      const that = this;
      axios.post(`${this.apiUrl}vipcenter/vipUserManageSource/getVipSourceDetail`, qs.stringify({
        id
      }))
        .then((response) => {
          loading.close();
          if (response.data.isSuccess == true) {
            that.resourceDetailsFlag = true;
            that.resourceDetails = response.data.data;
            const ttmpStr = that.resourceDetails.xiaoweiName.replace(/,/g, '、');
            // let ttmpStr = '';
            // for(var i=0;i<ttmpArr.length;i++){
            //   ttmpStr+=ttmpArr[i];
            //   ttmpStr+="、";
            // }
            // ttmpStr.substr(-1,1);
            that.tmpXWname = ttmpStr;
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
    // 修改
    handleChange(o) {
      this.$router.push({ path: '/dbOperate/resourceConfigure/updateNewResource', query: { id: o.id, sourceType: o.sourceType } });
    },
    // 删除
    handleDelete(id) {
      const that = this;
      this.$confirm('此操作将删除该资源位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          target: '#app-view',
          background: 'rgba(255, 255, 255, 0.7)'
        });
        axios.post(`${this.apiUrl}vipcenter/vipUserManageSource/updateVipSourceStatus`, {
          id,
          status: -1
        })
          .then((response) => {
            loading.close();
            if (response.data.isSuccess == true) {
              that.$message({
                type: 'success',
                message: '删除成功'
              });
              that.getSellersList();
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
      });
    },
    // 卡券设置
    handleManage(id) {
      // alert(id);
    },
    // 新增实物资源位
    addNew() {
      this.$router.push('/dbOperate/resourceConfigure/addNewResource');
    },
    getList() {
      if (this.selectValue == 2) {
        this.getSellersList();
      } else {
        this.getSellersBySourceType(this.selectValue);
      }
    },
    // switch状态改变：
    switchChange(o) {
      const that = this;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        target: '#app-view',
        background: 'rgba(255, 255, 255, 0.7)'
      });
      axios.post(`${this.apiUrl}vipcenter/vipUserManageSource/updateVipSourceStatus`, {
        id: o.id,
        status: o.status
      })
        .then((response) => {
          loading.close();
          if (response.data.isSuccess == true) {
            // that.resourceList = response.data.data.entities;
            that.$message({
              type: 'success',
              message: '修改成功'
            });
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
    if (this.$route.path == '/dbOperate/resourceConfigure/updateNewResource') {
      this.showResource = false;
    } else if (this.$route.path == '/dbOperate/resourceConfigure/addNewResource') {
      this.showResource = false;
    } else {
      this.showResource = true;
    }
  },
  watch: {
    showResource: 'getList'
  },
  mounted() {
    const that = this;
    this.tabLoading = true;
    axios.post(`${this.apiUrl}vipcenter/vipUserManageSource/getVipSourceLists`, {
      pageSize: this.pageSize,
      pageNo: this.pageNo
    })
      .then((response) => {
        that.tabLoading = false;
        if (response.data.isSuccess == true) {
          that.resourceList = response.data.data.entities;
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
};
</script>
<style scoped>

    .btn{
        color:#1fb5fc !important;
        margin: 0 5px;
    }
    .btn:hover{
        cursor: pointer;
    }
    .newGroup{
        float: right;
        width: 120px;
        margin: 0 15px 10px 0;
    }
    .sellerGroup .el-checkbox{
      margin: 7px 0 0 25px;
    }
    .sellerGroup{
      padding: 15px 0;
      box-shadow: 1px 0px 1px 2px #ccc;
      width: 200px;
      overflow: hidden;
    }
    .sellerGroup .el-checkbox{
      display: flex;
      line-height: 18px;
    }
    .infoBoxC{
  display: flex;
  margin: 20px 0;
}
.infoBoxC .infoBoxR{
  padding: 0;
}
.infoBoxC span{
  white-space: nowrap;
}
.baseInfo{
  width: 96%;
  padding: 0 10px;
  color: #333;
  font-size: 16px;
}
.infoBox{
  margin-top: 10px;
  padding-left: 5px;
}
.infoBox div{
  padding: 2px 0;
  color: #48576a;
  font-size: 16px;
}
.infoBox div span{
  font-weight: 600;
  font-size: 16px;
}
.resourceConfigure .sourceType{
  text-align: left;
  margin: 10px 0;
}
.resourceConfigure .infoHtml .infoBoxR{
  word-break:break-all; width:400px;
}

</style>
<style>
.resourceConfigure .el-dialog__body{
  padding: 10px 20px 20px;
}
    .resourceConfigure .creatGroup .el-dialog{
        width: 300px;
    }
    .resourceConfigure .directSeller .el-dialog--small{
        width: 250px;
    }
    .resourceConfigure .el-table table .cell{
      white-space: nowrap !important;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .resourceConfigure .resourceDetails .el-dialog--small {
          width: 32%;
      }
</style>
