<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>模范顾问维护
        <el-button type="primary" @click="add" class="fr">新建</el-button>
      </p>
      <div class="clear"></div>
    </div>
    <div class="model-ssbox">
      <el-row>
        <el-col :span="6">
          <span class="cx-title">产业：</span>
          <el-select class="cx-content" v-model="form.productLine" placeholder="请选择产业" style="width: 60%;">
            <el-option v-for="item in productLineOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="cx-title">星级：</span>
          <el-select class="cx-content" v-model="form.starLv" placeholder="请选择星级" style="width: 60%;">
            <el-option key="" label="全部星级" value=""> </el-option>
            <el-option :key="3" label="三星顾问" :value="3"> </el-option>
            <el-option :key="4" label="四星顾问" :value="4"> </el-option>
            <el-option :key="5" label="五星顾问" :value="5"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="cx-title">优先级：</span>
          <el-select class="cx-content" v-model="form.sort" placeholder="请选择优先级" style="width: 60%;">
            <el-option v-for="item in sortoptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="cx-title">小微：</span>
          <el-select class="cx-content" v-model="form.xwName" placeholder="请选择小微" style="width: 60%;">
            <el-option v-for="item in gUtils.getXWname" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;">
        <el-col :span="6">
          <span class="cx-title">直销员工号：</span>
          <el-input
            :maxlength="20"
            v-model="form.hmcId"
            placeholder="请输入直销员工号"
            style="width: 60%;"
            @input.native="form.hmcId = form.hmcId.replace(/[^\w\.\/]/gi, '')"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <span class="cx-title">直销员姓名：</span>
          <el-input
            :maxlength="20"
            v-model="form.hmcName"
            placeholder="请输入直销员姓名"
            style="width: 60%;"
            @input.native="form.hmcName = form.hmcName.replace(/\s+/g, '')"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="getAdviserList">搜索</el-button>
          <el-button @click="chongzhi">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" style="width: 100%;margin-top: 20px;" border>
      <el-table-column prop="productLine" label="产业" width="130"> </el-table-column>
      <el-table-column prop="textstarLv" label="星级" width="130"> </el-table-column>
      <el-table-column prop="sort" label="优先级" width="130"> </el-table-column>
      <el-table-column prop="xwName" label="小微" width="130" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="hmcId" label="直销员工号" width="130" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="hmcName" label="直销员姓名" width="130" show-overflow-tooltip> </el-table-column>
      <el-table-column label="附件" width="130">
        <template slot-scope="scope">
          <el-button type="text" @click="preview(scope.row.videoLink)" v-if="scope.row.videoLink">点击预览</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="textstatus" label="状态" width="130"> </el-table-column>
      <el-table-column label="上下架" width="130">
        <template slot-scope="scope">
          <el-switch
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
      <el-table-column prop="crUserName" label="创建人" width="130" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="lastUpdateUserName" label="最后操作人" width="130" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="详情" width="130">
        <template slot-scope="scope">
          <el-button type="text" @click="detailsView(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="130">
        <template slot-scope="scope">
          <el-button @click="view(scope.row.id)" type="text" v-if="scope.row.status == 2">修改</el-button>
          <el-button @click="deletered(scope.row.id)" type="text" v-if="scope.row.status != 1">删除</el-button>
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

    <!--预览-->
    <el-dialog title="附件" :visible.sync="encDialog" :modal-append-to-body="false" class="modadv-encbox">
      <video controls :src="videoLink" width="640" height="480" v-if="encDialog">
        <source type="video/mp4" />
      </video>
    </el-dialog>

    <!--查看详情-->
    <el-dialog title="查看详情" :visible.sync="detailsDialog" :modal-append-to-body="false" class="mod-details-box">
      <el-row class="userdetails-elrow">
        <el-col :span="8"
          ><span>产业：</span><span>{{ details.productLine }}</span></el-col
        >
        <el-col :span="8"
          ><span>星级：</span><span>{{ details.textstarLv }}</span></el-col
        >
        <el-col :span="8"
          ><span>优先级：</span><span>{{ details.sort }}</span></el-col
        >
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8">
          <span style="float: left">小微：</span>
          <el-tooltip class="item" effect="dark" :content="details.xwName" placement="top">
            <span class="pz-tool">{{ details.xwName }}</span>
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <span style="float: left">直销员工号：</span>
          <el-tooltip class="item" effect="dark" :content="details.hmcId" placement="top">
            <span class="pz-tool">{{ details.hmcId }}</span>
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <span style="float: left">直销员姓名：</span>
          <el-tooltip class="item" effect="dark" :content="details.hmcId" placement="top">
            <span class="pz-tool">{{ details.hmcName }}</span>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="8">
          <span style="float: left">创建人：</span>
          <el-tooltip class="item" effect="dark" :content="details.crUserName" placement="top">
            <span class="pz-tool">{{ details.crUserName }}</span>
          </el-tooltip>
        </el-col>
        <el-col :span="8">
          <span style="float: left">最后操作人：</span>
          <el-tooltip class="item" effect="dark" :content="details.lastUpdateUserName" placement="top">
            <span class="pz-tool">{{ details.lastUpdateUserName }}</span>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24"
          ><span style="float: left;">头像：</span
          ><span
            ><a :href="details.headImageUrl" target="_blank" class="voucher-imgbox"
              ><img :src="details.headImageUrl"/></a></span
        ></el-col>
      </el-row>
      <el-row class="userdetails-elrow">
        <el-col :span="24" style="display: flex;"
          ><span style="width: 42px;">内容：</span
          ><span v-html="details.content" style="width: 650px; overflow-x: auto;"></span
        ></el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import gUtils from '../../utils/gUtils.js';

export default {
  name: 'modelAdviser',
  data() {
    return {
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      encDialog: false,
      videoLink: '',
      detailsDialog: false,
      details: [],
      productLineOptions: [
        {
          id: '',
          name: '全部产业'
        },
        {
          id: '综合',
          name: '综合'
        },
        {
          id: '制冷',
          name: '制冷'
        },
        {
          id: '洗护',
          name: '洗护'
        },
        {
          id: '空调',
          name: '空调'
        },
        {
          id: '热水器',
          name: '热水器'
        },
        {
          id: '厨电',
          name: '厨电'
        },
        {
          id: '彩电',
          name: '彩电'
        }
      ],
      sortoptions: [],
      form: {
        productLine: '',
        starLv: '',
        sort: '',
        hmcId: '',
        hmcName: '',
        xwName: '所有小微'
      }
    };
  },
  created(e) {
    this.sortoptions.push({
      id: '',
      name: '全部'
    });
    for (let i = 1; i < 21; i++) {
      this.sortoptions.push({
        id: i,
        name: i
      });
    }
  },
  methods: {
    chongzhi() {
      this.form = {
        productLine: '',
        starLv: '',
        sort: '',
        hmcId: '',
        hmcName: '',
        xwName: '所有小微'
      };
      this.getAdviserList();
    },
    detailsView(e) {
      this.details = [];
      this.details = e;
      this.detailsDialog = true;
    },
    preview(e) {
      // this.$refs.video.src = e
      this.encDialog = true;
      this.videoLink = '';
      this.videoLink = e;
    },
    getAdviserList() {
      this.tableData = [];
      const _this = this;
      const data = JSON.parse(JSON.stringify(this.form));
      if (data.xwName == '所有小微') {
        data.xwName = '';
      }
      data.pageSize = this.pageSize;
      data.pageNo = this.pageNo;
      this.requestComplaint.getAdviserList(data).then((data) => {
        if (data.isSuccess) {
          if (data.data && data.data.entities) {
            data.data.entities.forEach((el) => {
              if (el.starLv == 3) {
                el.textstarLv = '三星顾问';
              }
              if (el.starLv == 4) {
                el.textstarLv = '四星顾问';
              }
              if (el.starLv == 5) {
                el.textstarLv = '五星顾问';
              }
              if (el.status == 1) {
                el.textstatus = '上架';
              }
              if (el.status == 2) {
                el.textstatus = '下架';
              }
            });
          }
          _this.tableData = data.data.entities;
          _this.total = data.data.entityCount;
        }
      });
    },
    add() {
      this.$router.push({
        path: '/complaint/addmodeladv'
      });
    },
    switchChange(id, status) {
      const _this = this;
      const data = {
        id,
        status
      };
      this.requestComplaint.updateAdviserStatus(data).then((data) => {
        _this.getAdviserList();
      });
    },
    view(e) {
      this.$router.push({
        path: '/complaint/addmodeladv',
        query: {
          id: e
        }
      });
    },
    deletered(e) {
      const _this = this;
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            id: e
          };
          this.requestComplaint.deleteAdviser(data).then((data) => {
            _this.getAdviserList();
          });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.pageNo = 1;
      this.pageSize = val;
      if (this.tableData.length != 0) {
        this.getAdviserList();
      }
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      if (this.tableData.length != 0) {
        this.getAdviserList();
      }
    }
  },
  mounted(e) {
    this.getAdviserList();
  }
};
</script>
<style scoped>
.modadv-encbox video {
  background-color: white;
}
.userdetails-elrow {
  margin-top: 10px;
}
.userdetails-elrow div span:nth-child(1) {
  color: #ccc;
}
.userdetails-elrow div span:nth-child(2) {
  color: #333;
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
.pz-tool {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 145px;
  display: inline-block;
  float: left;
}
.cx-title {
  width: 85px;
  display: inline-block;
}
</style>
<style>
.modadv-encbox .el-dialog--small {
  width: 680px;
}
.modadv-encbox .el-dialog__body {
  background-color: white;
}
.mod-details-box .el-dialog--small {
  width: 770px;
}
</style>
