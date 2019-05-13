<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>资源位配置
        <el-button type="primary" @click="add" class="fr">新建资源位</el-button>
      </p>
      <div class="clear"></div>
    </div>

    <el-table
      class="resources-table"
      v-loading="loading"
      border
      :data="tableData"
      style="width: 100%;margin-top: 15px;text-align: center;"
    >
      <el-table-column prop="sort" label="优先级" width="180"> </el-table-column>
      <el-table-column prop="name" label="资源位名称" width="180"> </el-table-column>
      <el-table-column prop="textstatus" label="状态" width="180"> </el-table-column>
      <el-table-column label="详情" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="getdetails(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="上下架">
        <template slot-scope="scope">
          <el-switch
            v-if="scope.row.status == 1 || scope.row.status == 2"
            v-model="scope.row.status"
            on-color="#13ce66"
            off-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
            @change="switchChange(scope.row.id, scope.row.status)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status != 1"
            type="text"
            @click="$router.push({ path: '/rights/addresources', query: { id: scope.row.id } })"
            >修改</el-button
          >
          <a v-if="scope.row.status != 1" href="javascript:;" @click="zxdelete(scope.row.id)">删除</a>
        </template>
      </el-table-column>
    </el-table>
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

    <!--查看详情-->
    <el-dialog class="trs-dialog" title="" :visible.sync="detailsdialog" :modal-append-to-body="false">
      <div class="vip-head-tool" style="margin-bottom: 0;">
        <p class="template-brand" style="margin-bottom: 0;"><i></i>基础信息</p>
        <div class="clear"></div>
      </div>
      <el-row style="margin: 10px 0">
        <el-col :span="12">资源位名称：{{ details.name }}</el-col>
        <el-col :span="12">优先级：{{ details.sort }}</el-col>
      </el-row>
      <div class="vip-head-tool" style="margin-bottom: 0;">
        <p class="template-brand" style="margin-bottom: 0;"><i></i>适用范围</p>
        <div class="clear"></div>
      </div>
      <el-row style="margin: 10px 0;position: relative">
        <el-col :span="12">
          <span style="float: left">小微配置：</span>
          <el-tooltip class="item" effect="dark" :content="details.xiaoweiName" placement="top">
            <span class="pz-tool">{{ details.xiaoweiName }}</span>
          </el-tooltip>
        </el-col>
        <el-col :span="12">
          <span style="float: left">渠道配置：</span>
          <el-tooltip class="item" effect="dark" :content="details.channel" placement="top">
            <span class="pz-tool">{{ details.channel }}</span>
          </el-tooltip>
        </el-col>
      </el-row>
      <div class="vip-head-tool" style="margin-bottom: 0;">
        <p class="template-brand" style="margin-bottom: 0;"><i></i>详细说明</p>
        <div class="clear"></div>
      </div>
      <el-row style="margin-top: 10px">
        <el-col :span="24"
          ><span class="gh-name">资源位图标：</span
          ><a v-if="details.icon" :href="details.icon" target="_blank" class="voucher-imgbox"
            ><img :src="details.icon"/></a
        ></el-col>
      </el-row>
      <el-row style="margin-top: 20px;">
        <el-col :span="24" style="display: flex">
          <span style="width: 72px;">说明配置：</span>
          <div style="max-width: 650px;overflow-x: auto;" v-html="details.desc"></div>
        </el-col>
      </el-row>
    </el-dialog>

    <!--有资源位正在被使用-->
    <el-dialog
      class="trs-dialog rightsvou-dialog"
      title="提示"
      :visible.sync="statusdialog"
      :modal-append-to-body="false"
      @close="closedialog"
    >
      <span>该资源位正在被以下权益使用，无法下架该资源位。</span>
      <el-table class="cares-table" border :data="statusData" style="width: 100%;margin-top: 15px;text-align: center;">
        <el-table-column prop="name" label="活动名称" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="startTime" label="权益生效期" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="endTime" label="权益失效期" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="textstatus" label="状态" :show-overflow-tooltip="true"> </el-table-column>
      </el-table>
      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="cancel">取 消</el-button>-->
      <!--<el-button type="primary" @click="lower">确 定</el-button>-->
      <!--</span>-->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'resources',
  data() {
    return {
      detailsdialog: false,
      loading: false,
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      isPage: false,
      details: {},
      statusdialog: false,
      is_status: true,
      statusData: [],
      id: '',
      status: ''
    };
  },
  methods: {
    getCreatertime(e) {
      const create_time = parseInt(e);
      const year = new Date(create_time).getFullYear();
      let month = new Date(create_time).getMonth() + 1;
      let date = new Date(create_time).getDate();
      if (month < 10) {
        month = `0${month}`;
      }
      if (date < 10) {
        date = `0${date}`;
      }
      return `${year}-${month}-${date}`;
    },
    switchChange(id, status) {
      const _this = this;
      _this.statusData = [];
      _this.id = id;
      _this.status = status;
      if (status == 2) {
        this.requestManagement.getConfigUseTheSource({ id }).then((data) => {
          if (data.isSuccess) {
            _this.statusdialog = true;
            data.data.forEach((el) => {
              el.startTime = _this.getCreatertime(el.endTime);
              el.endTime = _this.getCreatertime(el.endTime);
              if (el.endTime && el.endTime.indexOf('2099') == 0) {
                el.endTime = '不限结束时间';
              }
              if (el.status == -1) {
                el.textstatus = '已删除';
              }
              if (el.status == 1) {
                el.textstatus = '审核中';
              }
              if (el.status == 2) {
                el.textstatus = '待执行';
              }
              if (el.status == 3) {
                el.textstatus = '进行中';
              }
              if (el.status == 4) {
                el.textstatus = '已结束';
              }
              if (el.status == 5) {
                el.textstatus = '存草稿';
              }
              if (el.status == 6) {
                el.textstatus = '已驳回';
              }
              if (el.status == 7) {
                el.textstatus = '暂停中';
              }
            });
            _this.statusData = data.data;
            for (const i in _this.tableData) {
              if (_this.tableData[i].id == _this.id) {
                _this.tableData[i].status = _this.status == 1 ? 2 : 1;
                if (_this.tableData[i].status == 1) {
                  _this.tableData[i].textstatus = '已上架';
                }
                if (_this.tableData[i].status == 2) {
                  _this.tableData[i].textstatus = '已下架';
                }
                if (_this.tableData[i].status == 3) {
                  _this.tableData[i].textstatus = '草稿';
                }
              }
            }
          } else {
            _this.lower();
          }
        });
      } else {
        this.requestManagement
          .updateVipSourceStatus({
            id,
            status
          })
          .then((data) => {
            if (!data.isSuccess) {
              for (const i in _this.tableData) {
                if (_this.tableData[i].id == _this.id) {
                  _this.tableData[i].status = _this.status == 1 ? 2 : 1;
                  if (_this.tableData[i].status == 1) {
                    _this.tableData[i].textstatus = '已上架';
                  }
                  if (_this.tableData[i].status == 2) {
                    _this.tableData[i].textstatus = '已下架';
                  }
                  if (_this.tableData[i].status == 3) {
                    _this.tableData[i].textstatus = '草稿';
                  }
                }
              }
            } else {
              for (const i in _this.tableData) {
                if (_this.tableData[i].id == _this.id) {
                  if (_this.tableData[i].status == 1) {
                    _this.tableData[i].textstatus = '已上架';
                  }
                  if (_this.tableData[i].status == 2) {
                    _this.tableData[i].textstatus = '已下架';
                  }
                  if (_this.tableData[i].status == 3) {
                    _this.tableData[i].textstatus = '草稿';
                  }
                }
              }
            }
          });
      }
    },
    lower() {
      this.is_status = false;
      const _this = this;
      this.requestManagement.updateVipSourceStatus({ id: this.id, status: this.status }).then((data) => {
        if (!data.isSuccess) {
          for (const i in _this.tableData) {
            if (_this.tableData[i].id == _this.id) {
              _this.tableData[i].status = _this.status == 1 ? 2 : 1;
              if (_this.tableData[i].status == 1) {
                _this.tableData[i].textstatus = '已上架';
              }
              if (_this.tableData[i].status == 2) {
                _this.tableData[i].textstatus = '已下架';
              }
              if (_this.tableData[i].status == 3) {
                _this.tableData[i].textstatus = '草稿';
              }
            }
          }
        } else {
          for (const i in _this.tableData) {
            if (_this.tableData[i].id == _this.id) {
              if (_this.tableData[i].status == 1) {
                _this.tableData[i].textstatus = '已上架';
              }
              if (_this.tableData[i].status == 2) {
                _this.tableData[i].textstatus = '已下架';
              }
              if (_this.tableData[i].status == 3) {
                _this.tableData[i].textstatus = '草稿';
              }
            }
          }
        }
        _this.statusdialog = false;
      });
    },
    // cancel(){
    //     let _this=this
    //     for(let i in this.tableData){
    //         if(_this.tableData[i].id==_this.id){
    //             _this.tableData[i].status=_this.status==1?2:1
    //         }
    //     }
    //     this.statusdialog=false
    //     this.is_status=true
    // },
    closedialog() {
      const _this = this;
    },
    getdetails(e) {
      this.detailsdialog = true;
      this.details = e;
    },
    handleSizeChange(val) {
      if (this.isPage) {
        this.pageNo = 1;
        this.pageSize = val;
        this.getVipSourceList();
      }
    },
    handleCurrentChange(val) {
      if (this.isPage) {
        this.pageNo = val;
        this.getVipSourceList();
      }
    },
    zxdelete(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const _this = this;
          this.requestManagement
            .updateVipSourceStatus({
              id,
              status: -1
            })
            .then((data) => {
              _this.getVipSourceList();
            });
        })
        .catch(() => {});
    },
    getVipSourceList() {
      const _this = this;
      this.loading = true;
      const data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      this.requestManagement.getVipSourceList(data).then((data) => {
        _this.loading = false;
        if (data.isSuccess) {
          if (data.data.entities) {
            _this.isPage = true;
            data.data.entities.forEach((el) => {
              if (el.status == 1) {
                el.textstatus = '已上架';
              }
              if (el.status == 2) {
                el.textstatus = '已下架';
              }
              if (el.status == 3) {
                el.textstatus = '草稿';
              }
            });
          }
          _this.tableData = data.data.entities;
          _this.total = data.data.entityCount;
        } else {
          _this.total = 0;
        }
      });
    },
    add() {
      this.$router.push({
        path: '/rights/addresources'
      });
    }
  },
  mounted(e) {
    this.getVipSourceList();
  }
};
</script>

<style scoped>
.pz-tool {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 278px;
  display: inline-block;
  float: left;
}
.voucher-imgbox {
  display: table-cell;
  vertical-align: middle;
  width: 80px;
  height: 80px;
  margin: 0;
  position: relative;
  background: #0000;
  text-align: center;
  border: 1px solid #cccccc;
}
.voucher-imgbox img {
  max-width: 100%;
  max-height: 100%;
}
.gh-name {
  float: left;
}
</style>
<style>
.resources-table .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
