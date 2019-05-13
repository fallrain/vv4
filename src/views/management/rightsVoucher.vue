<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>权益券配置
        <el-button type="primary" @click="add" class="fr">新建权益券</el-button>
      </p>
      <div class="clear"></div>
    </div>
    <el-table
      class="cares-table"
      v-loading="loading"
      border
      :data="tableData"
      style="width: 100%;margin-top: 15px;text-align: center;"
    >
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          {{ (pageNo - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="权益券名称" width="180" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="price" label="权益券价格（元）" width="180" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="点击券跳转链接" width="180" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <a style="color: #20a0ff;" :href="scope.row.cardUrl" target="_blank" v-if="scope.row.useType == 0">{{
            scope.row.cardUrl
          }}</a>
          <a style="color: #20a0ff;" :href="scope.row.detailsUrl" target="_blank" v-if="scope.row.useType == 2">{{
            scope.row.detailsUrl
          }}</a>
        </template>
      </el-table-column>
      <el-table-column label="上下架" width="180">
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
      <el-table-column label="查看详情" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="seedetails(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="modify(scope.row.id)" v-if="scope.row.status == 2">修改</el-button>
          <a href="javascript:;" @click="statusdelete(scope.row.id)" v-if="scope.row.status == 2">删除</a>
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

    <el-dialog
      class="trs-dialog rightsvou-dialog"
      title="提示"
      :visible.sync="statusdialog"
      :modal-append-to-body="false"
      @close="closedialog"
    >
      <span>该权益券正在被以下权益使用，无法下架该权益券。</span>
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

    <!--查看详情-->
    <el-dialog
      class="trs-dialog vou-detailsdialog"
      title=""
      :visible.sync="detailsdialog"
      :modal-append-to-body="false"
    >
      <div class="vip-head-tool" style="margin-bottom: 0;">
        <p class="template-brand" style="margin-bottom: 0;"><i></i>权益券信息</p>
        <div class="clear"></div>
      </div>
      <el-row style="margin: 10px 0">
        <el-col :span="12">
          <span>权益券名称：</span>
          <el-tooltip class="item" effect="dark" :content="details.name" placement="top">
            <span>{{ details.name }}</span>
          </el-tooltip>
        </el-col>
        <el-col :span="12">
          <span>权益券类型：</span>
          <span v-if="details.useFor == 0 && details.typeId == 1">挂式空调清洗券</span>
          <span v-if="details.useFor == 0 && details.typeId == 2">立式空调清洗券</span>
          <span v-if="details.useFor == 0 && details.typeId == 3">冰箱清洗券</span>
          <span v-if="details.useFor == 0 && details.typeId == 4">洗衣机清洗券</span>
          <span
            v-if="
              details.useFor == 0 &&
                details.typeId != 1 &&
                details.typeId != 2 &&
                details.typeId != 3 &&
                details.typeId != 4
            "
            >权益券</span
          >
          <span v-if="details.useFor == 1">认筹券</span>
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="12">
          <span>权益券价格：</span>
          {{ details.price }}（元）
        </el-col>
        <el-col :span="12" style="display: flex">
          <span>核销方式：</span>
          <span style="max-width: 624px;overflow-x: auto" v-if="details.useType == 0">第三方核销</span>
          <span style="max-width: 624px;overflow-x: auto" v-if="details.useType == 1">扫一扫核销</span>
          <span style="max-width: 624px;overflow-x: auto" v-if="details.useType == 2">录单核销</span>
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="12" style="display: flex">
          <span>使用限制说明：</span>
          <el-tooltip class="item" effect="dark" :content="details.useInstruction" placement="top">
            <span>{{ details.useInstruction }}</span>
          </el-tooltip>
        </el-col>
        <el-col :span="12" style="display: flex">
          <span>配置说明：</span>
          <el-tooltip class="item" effect="dark" :content="details.useRemark" placement="top">
            <span>{{ details.useRemark }}</span>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="12">
          <span class="gh-name">权益券Logo：</span>
          <a :href="details.cardLogoUrl" target="_blank" class="voucher-imgbox"
            ><img :src="details.cardLogoUrl" alt=""
          /></a>
        </el-col>
        <el-col :span="12" v-if="details.useType == 0">
          <span>点击跳转第三方核销链接：</span>
          <el-tooltip class="item" effect="dark" :content="details.cardUrl" placement="top">
            <a :href="details.cardUrl" target="_blank" style="color: #20a0ff;">{{ details.cardUrl }}</a>
          </el-tooltip>
        </el-col>
        <el-col :span="12" v-if="details.useType == 2">
          <span>点击跳转认筹详情：</span>
          <el-tooltip class="item" effect="dark" :content="details.detailsUrl" placement="top">
            <a :href="details.detailsUrl" target="_blank" style="color: #20a0ff;">{{ details.detailsUrl }}</a>
          </el-tooltip>
        </el-col>
      </el-row>
      <div class="vip-head-tool" style="margin-bottom: 0;">
        <p class="template-brand" style="margin-bottom: 0;"><i></i>微信分享信息</p>
        <div class="clear"></div>
      </div>
      <el-row style="margin: 10px 0">
        <el-col :span="12">
          <span>微信分享标题：</span>
          <el-tooltip
            class="item"
            effect="dark"
            :content="details.shareTitle"
            placement="top"
            style="max-width: 252px;"
          >
            <span>{{ details.shareTitle }}</span>
          </el-tooltip>
        </el-col>
        <!--<el-col :span="12">-->
        <!--<span >微信分享摘要：</span>-->
        <!--<el-tooltip class="item" effect="dark" :content="details.shareTitle" placement="top" style="max-width: 252px;">-->
        <!--<span>{{details.shareAbstract}}</span>-->
        <!--</el-tooltip>-->
        <!--</el-col>-->
      </el-row>
      <el-row style="margin: 10px 0">
        <!--<el-col :span="12" >-->
        <!--<span class="gh-name">分享头像：</span>-->
        <!--<a :href="details.shareHeadUrl" target="_blank" class="voucher-imgbox"><img :src="details.shareHeadUrl"></a>-->
        <!--</el-col>-->
        <el-col :span="12">
          <span class="gh-name">分享缩略图：</span>
          <a :href="details.thumbnailUrl" target="_blank" class="voucher-imgbox"><img :src="details.thumbnailUrl"/></a>
        </el-col>
        <el-col :span="12">
          <span class="gh-name">用户领券页面：</span>
          <a :href="details.bannerSkipImage" target="_blank" class="voucher-imgbox"
            ><img :src="details.bannerSkipImage"
          /></a>
        </el-col>
      </el-row>
      <!--<el-row style="margin: 10px 0">-->
      <!--<el-col :span="12" >-->
      <!--<span class="gh-name">分享H5内容页banner：</span>-->
      <!--<a style="width: 240px;" :href="details.bannerUrl" target="_blank" class="voucher-imgbox"><img :src="details.bannerUrl"></a>-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row style="margin: 10px 0">-->
      <!--<el-col :span="24" style="display: flex">-->
      <!--<span >内容配置：</span>-->
      <!--<div style="max-width: 650px;overflow-x: auto;" v-html="details.contentConfig"></div>-->
      <!--</el-col>-->
      <!--</el-row>-->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'rightsVoucher',
  data() {
    return {
      loading: false,
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      isPage: false,
      statusdialog: false,
      is_status: true,
      statusData: [],
      id: '',
      status: '',
      detailsdialog: false,
      details: []
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
    seedetails(e) {
      this.detailsdialog = true;
      this.details = e;
    },
    switchChange(id, status) {
      const _this = this;
      _this.statusData = [];
      _this.id = id;
      _this.status = status;
      if (status == 2) {
        this.requestManagement.checkConfig({ id }).then((data) => {
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
        this.requestManagement.updateUserManageCardStatus({ id, status }).then((data) => {
          if (!data.isSuccess) {
            for (const i in _this.tableData) {
              if (_this.tableData[i].id == _this.id) {
                _this.tableData[i].status = _this.status == 1 ? 2 : 1;
              }
            }
          }
        });
      }
    },
    lower() {
      this.is_status = false;
      const _this = this;
      this.requestManagement.updateUserManageCardStatus({ id: this.id, status: this.status }).then((data) => {
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
    cancel() {
      const _this = this;
      for (const i in this.tableData) {
        if (_this.tableData[i].id == _this.id) {
          _this.tableData[i].status = _this.status == 1 ? 2 : 1;
        }
      }
      this.statusdialog = false;
      this.is_status = true;
    },
    closedialog() {
      const _this = this;
    },
    modify(e) {
      this.$router.push({
        path: '/management/addvoucher',
        query: {
          id: e
        }
      });
    },
    statusdelete(e) {
      const _this = this;
      this.$confirm('此操作将永久删除该权益券, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            id: e,
            status: -1
          };
          this.requestManagement.updateUserManageCardStatus(data).then((data) => {
            if (data.isSuccess) {
              _this.pageVipUserManageCardType();
            }
          });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      if (this.isPage) {
        this.pageNo = 1;
        this.pageSize = val;
        this.pageVipUserManageCardType();
      }
    },
    handleCurrentChange(val) {
      if (this.isPage) {
        this.pageNo = val;
        this.pageVipUserManageCardType();
      }
    },
    add() {
      this.$router.push({
        path: '/management/addvoucher'
      });
    },
    pageVipUserManageCardType() {
      this.tableData = [];
      this.isPage = false;
      const _this = this;
      const data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      this.requestManagement.pageVipUserManageCardType(data).then((data) => {
        if (data.isSuccess) {
          _this.tableData = data.data.entities;
          _this.isPage = true;
          _this.total = data.data.entityCount;
        }
      });
    }
  },
  mounted() {
    this.pageVipUserManageCardType();
  }
};
</script>

<style scoped>
.voudialog-quanyi {
  margin-top: 10px;
}
.voudialog-quanyi li {
  border: 1px solid #1fb5fc;
  padding: 5px 5px;
  border-bottom: none;
}
.voudialog-quanyi li:last-child {
  border-bottom: 1px solid #1fb5fc;
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
.rightsvou-dialog .el-dialog--small {
  width: 600px;
}
.vou-detailsdialog .el-tooltip {
  max-width: 253px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
</style>
