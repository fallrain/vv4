<template>
  <div class="vip-content">
    <div>
      <div class="rights-config-header" style="display: inline-block;">
        <div class="header-title">
          <span>直销员星级评定</span>
        </div>
      </div>
      <el-button style="float: right;margin-top: 8px;" type="primary" :loading="dcloading" @click="exportExcel">
        <em v-if="!dcloading">导出详情</em>
        <em v-if="dcloading">导出中...</em>
      </el-button>
    </div>
    <div style="margin-top: 15px;">
      <el-row>
        <el-col :span="5">
          <span class="cx-title">小微：</span>
          <el-select class="cx-content" v-model="form.xwId" placeholder="请选择小微">
            <el-option v-for="item in xwoptions" :key="item.xwId" :label="item.xwName" :value="item.xwId"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <span class="cx-title">渠道：</span>
          <el-select class="cx-content" v-model="form.channelName" placeholder="请选择渠道">
            <el-option v-for="item in channeloptions" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <span class="cx-title">产业：</span>
          <el-select class="cx-content" v-model="form.productCategoryName" placeholder="请选择产业">
            <el-option v-for="item in productoptions" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="cx-title">星级：</span>
          <el-select class="cx-content" v-model="form.level" placeholder="请选择星级">
            <el-option label="全部" value=""> </el-option>
            <el-option label="一星" :value="1"> </el-option>
            <el-option label="二星" :value="2"> </el-option>
            <el-option label="三星" :value="3"> </el-option>
            <el-option label="四星" :value="4"> </el-option>
            <el-option label="五星" :value="5"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <!--<el-button @click="reset">重置</el-button>-->
          <el-button type="primary" @click="query">搜索</el-button>
          <el-button type="text" @click="isYC = false">高级搜索</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;" v-show="!isYC">
        <el-col :span="5">
          <span class="cx-title">工号：</span>
          <el-input :maxlength="10" class="cx-content" v-model="form.hmcId" placeholder="请输入工号"></el-input>
        </el-col>
        <el-col :span="5">
          <span class="cx-title">门店：</span>
          <el-autocomplete
            v-model="shopName"
            class="cx-content"
            :fetch-suggestions="listShopInfo"
            placeholder="请输入门店"
            @select="storeSelect"
            :props="{ value: 'shopName', label: 'shopName' }"
          >
          </el-autocomplete>
        </el-col>
        <el-col :span="5">
          <span class="cx-title">工龄：</span>
          <el-input
            style="width: 41%;"
            :maxlength="5"
            class="cx-content"
            v-model="form.month"
            placeholder="请输入工龄"
            @input.native="form.month = form.month.replace(/[^\d]/g, '')"
          ></el-input
          >（月）以上
        </el-col>
        <el-col :span="6">
          <span class="cx-title">见证性资料：</span>
          <el-select
            style="width: 188px;"
            class="cx-content"
            v-model="form.informationSign"
            placeholder="是否有见证性资料"
          >
            <el-option label="全部" value=""> </el-option>
            <el-option label="有" :value="2"> </el-option>
            <el-option label="没有" :value="1"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button type="text" @click="shouqi" style="margin-left: 102px;">收起</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px;" v-show="!isYC">
        <el-col :span="5">
          <span class="cx-title">在职状态：</span>
          <el-select class="cx-content" style="width: 58%;" v-model="form.sTATUS" placeholder="请选择在职状态">
            <el-option label="不限" value=""></el-option>
            <el-option label="在职" value="Y"></el-option>
            <el-option label="离职" value="N"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>

    <el-table :data="tableData" style="width: 100%;margin-top: 20px;" border>
      <el-table-column prop="hMCID" label="直销员工号" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="hNAME" label="直销员姓名" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="pHONE" label="手机号" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="hSEX" label="性别" width="80" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="seniority" label="工龄（月）" width="100" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="birthday" label="出生年月日" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="sTATUS" label="在职状态" width="80" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="sHOPNAME" label="门店" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="tRADE_CODE_NAME" label="小微" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="cUSTOMER_CATEGORY_NAME" label="渠道" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="zYPRODUCTLINE" label="产业" width="120" show-overflow-tooltip> </el-table-column>
      <el-table-column
        prop="precipitationUserNumber"
        label="沉淀用户数（海尔+卡萨帝）"
        width="220"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="level" label="星级" width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="cursor:pointer;" @click="details(scope.row)">
            <img :src="scope.row.level > 0 ? './static/images/star-m.png' : './static/images/star-k.png'" alt="" />
            <img :src="scope.row.level > 1 ? './static/images/star-m.png' : './static/images/star-k.png'" alt="" />
            <img :src="scope.row.level > 2 ? './static/images/star-m.png' : './static/images/star-k.png'" alt="" />
            <img :src="scope.row.level > 3 ? './static/images/star-m.png' : './static/images/star-k.png'" alt="" />
            <img :src="scope.row.level > 4 ? './static/images/star-m.png' : './static/images/star-k.png'" alt="" />
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <span
            @click="pingji(scope.row)"
            style="cursor:pointer;"
            v-if="jurisdiction['systemOperations:sellersStarRating:edit']"
          >
            <img src="../../assets/images/grade.png" alt="" />
            <span style="color:#1fb5fc;vertical-align: middle;">评级</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      border
      :current-page.sync="pageNo"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>

    <!--评级-->
    <el-dialog
      :title="isDetails ? '星级详情' : '星级评定'"
      :visible.sync="starDialog"
      :modal-append-to-body="false"
      class="starPing-dialog"
    >
      <div class="starDialog-box">
        <p class="starDialog-title" style="margin-top: 0">
          <span v-if="!isDetails" style="color: #ff4949;margin-right: 2px;">*</span>星级：
        </p>
        <p v-if="isDetails" class="star-star">
          <img :src="staring.level > 0 ? './static/images/star-m.png' : './static/images/star-k.png'" alt="" />
          <img :src="staring.level > 1 ? './static/images/star-m.png' : './static/images/star-k.png'" alt="" />
          <img :src="staring.level > 2 ? './static/images/star-m.png' : './static/images/star-k.png'" alt="" />
          <img :src="staring.level > 3 ? './static/images/star-m.png' : './static/images/star-k.png'" alt="" />
          <img :src="staring.level > 4 ? './static/images/star-m.png' : './static/images/star-k.png'" alt="" />
          <span v-if="staring.level == 1">（懂产品，会讲解）</span>
          <span v-if="staring.level == 2">（门店现场有经验，会讲价值）</span>
          <span v-if="staring.level == 3">（走出去，进社区，会送方案）</span>
          <span v-if="staring.level == 4">（走进用户家深交互，能持续）</span>
          <span v-if="staring.level == 5">（建有黏度圈层社群，能迭代）</span>
        </p>
        <p v-if="!isDetails" style="cursor:pointer;" class="star-star">
          <img
            :src="staring.level > 0 ? './static/images/star-m.png' : './static/images/star-k.png'"
            alt=""
            @mouseenter="changeStarLevel(1)"
          />
          <img
            :src="staring.level > 1 ? './static/images/star-m.png' : './static/images/star-k.png'"
            alt=""
            @mouseenter="changeStarLevel(2)"
          />
          <img
            :src="staring.level > 2 ? './static/images/star-m.png' : './static/images/star-k.png'"
            alt=""
            @mouseenter="changeStarLevel(3)"
          />
          <img
            :src="staring.level > 3 ? './static/images/star-m.png' : './static/images/star-k.png'"
            alt=""
            @mouseenter="changeStarLevel(4)"
          />
          <img
            :src="staring.level > 4 ? './static/images/star-m.png' : './static/images/star-k.png'"
            alt=""
            @mouseenter="changeStarLevel(5)"
          />
          <span v-if="staring.level == 1">（懂产品，会讲解）</span>
          <span v-if="staring.level == 2">（门店现场有经验，会讲价值）</span>
          <span v-if="staring.level == 3">（走出去，进社区，会送方案）</span>
          <span v-if="staring.level == 4">（走进用户家深交互，能持续）</span>
          <span v-if="staring.level == 5">（建有黏度圈层社群，能迭代）</span>
        </p>
        <p class="starDialog-title">评定理由：</p>
        <p>
          <el-input
            resize="none"
            :disabled="isDetails"
            class="starDialog-reason"
            :maxlength="200"
            type="textarea"
            :placeholder="!isDetails ? '请输入评定理由' : ''"
            v-model="staring.ratingReason"
            @input.native="staring.ratingReason = staring.ratingReason.replace(/\s+/g, '')"
          >
          </el-input>
        </p>
        <p class="starDialog-title" style="margin-bottom: 0;">见证性资料：</p>
        <span style="font-size: 12px;color: #999999;"
          >(最多10个，10M以内，格式为：jpg、png、ppt、pdf、excel、word)</span
        >
        <div class="starDialog-chuanbox">
          <span
            v-loading="item.loading"
            element-loading-text="上传中..."
            :class="isDetails ? 'zl-node' : 'zl-scz'"
            v-for="(item, index) in path"
          >
            <i data-v-25e6c1ce="" class="close iconfont icon-bohui" @click="deletePath(index)"></i>
            <img
              style="cursor:pointer;"
              v-if="item.path == 'doc' || item.path == 'docx'"
              src="../../assets/images/W.png"
              alt=""
              @click="downloadJzx(index)"
            />
            <img
              style="cursor:pointer;"
              v-if="item.path == 'ppt' || item.path == 'pptx'"
              src="../../assets/images/P.png"
              alt=""
              @click="downloadJzx(index)"
            />
            <img
              style="cursor:pointer;"
              v-if="item.path == 'xls' || item.path == 'xlsx'"
              src="../../assets/images/X.png"
              alt=""
              @click="downloadJzx(index)"
            />
            <img
              style="cursor:pointer;"
              v-if="item.path == 'jpg' || item.path == 'jpeg'"
              src="../../assets/images/JPG.png"
              alt=""
              @click="downloadJzx(index)"
            />
            <img
              style="cursor:pointer;"
              v-if="item.path == 'png'"
              src="../../assets/images/PNG.png"
              alt=""
              @click="downloadJzx(index)"
            />
            <img
              style="cursor:pointer;"
              v-if="item.path == 'pdf'"
              src="../../assets/images/PDF.png"
              alt=""
              @click="downloadJzx(index)"
            />
          </span>
          <el-upload
            v-if="path.length < 10 && !isDetails"
            :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadinformationFile'"
            :multiple="true"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <span v-loading="loading" element-loading-text="上传中..." class="starDialog-jia">+</span>
          </el-upload>
          <span v-if="path.length == 0 && isDetails" style="margin-left: 5px;">暂无见证性资料</span>
          <!--<div class="starDialog-cright" v-if="!isDetails">-->
          <!--<el-upload :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadinformationFile'" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">-->
          <!--<el-button size="small" type="primary" class="starDialog-rictext"><i class="ico-vipin"></i><em v-if="staring.isSc">重新上传</em><em v-else>上传</em></el-button>-->
          <!--</el-upload>-->
          <!--<p>(10M以内，格式为：jpg、png、ppt、pdf、excel、word)</p>-->
          <!--</div>-->
        </div>
      </div>
      <span slot="footer" class="dialog-footer" v-if="!isDetails">
        <el-button @click="starDialog = false">取 消</el-button>
        <el-button type="primary" @click="starTrue">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import gUtils from '../../utils/gUtils.js';

export default {
  name: 'starRating',
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      value: '',
      xwoptions: [],
      channeloptions: [],
      productoptions: [],
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 1,
      starDialog: false,
      form: {
        xwId: '',
        channelName: '',
        productCategoryName: '',
        shopCode: '',
        level: '',
        month: '',
        hmcId: '',
        informationSign: '',
        sTATUS: ''
      },
      shopName: '',
      queryString: '',
      staring: {
        hmcId: '',
        level: '',
        ratingReason: '',
        informationFilePath: '',
        isSc: false,
        path: ''
      },
      informationFilePath: [],
      path: [],
      isDetails: false,
      isYC: true,
      loading: false,
      dcloading: false
    };
  },
  created(e) {
    const _this = this;
    // 小微
    this.requestRights.listArea().then((data) => {
      if (data) {
        const arr = [];
        if (data.length != 1) {
          arr[0] = { xwId: 'all', xwName: '所有小微' };
        }
        for (const i in data) {
          arr.push(data[i]);
        }
        _this.xwoptions = arr;
        _this.form.xwId = arr[0].xwId;
      }
    });
    // 渠道
    this.requestRights.listChannel().then((data) => {
      if (data.isSuccess) {
        data.data = Object.values(data.data);
        if (data.data.length == 1) {
          _this.channeloptions = data.data;
        } else {
          const arr = ['全部渠道'];
          for (const i in data.data) {
            arr.push(data.data[i]);
          }
          _this.channeloptions = arr;
        }
        _this.form.channelName = _this.channeloptions[0];
      }
    });
    // 产业
    this.requestRights.listSellersProduct().then((data) => {
      if (data) {
        const arr = [];
        if (data.length > 1) {
          arr[0] = '全部产业';
        }
        for (const i in data) {
          arr.push(data[i]);
        }
        _this.productoptions = arr;
        _this.form.productCategoryName = arr[0];
      }
    });
  },
  methods: {
    deletePath(i) {
      this.path.splice(i, 1);
    },
    exportExcel() {
      const _this = this;
      this.dcloading = true;
      const data = JSON.parse(JSON.stringify(this.form));
      if (data.channelName == '全部渠道') {
        data.channelName = '';
      }
      if (data.productCategoryName == '全部产业') {
        data.productCategoryName = '';
      }
      if (data.xwId == 'all') {
        data.xwId = '';
      }
      data.pageNo = this.pageNo;
      data.pageSize = this.pageSize;
      this.requestComplaint.exportSellersInfo(data).then((data) => {
        if (data.isSuccess) {
          window.location.href = data.data.showPath;
        }
        _this.dcloading = false;
      });
    },
    shouqi() {
      this.isYC = true;
      this.form.hmcId = '';
      this.shopName = '';
      this.form.shopCode = '';
      this.form.month = '';
      this.form.informationSign = '';
      this.form.sTATUS = '';
    },
    levelMouse(e) {
      this.form.level = e;
    },
    details(e) {
      this.isDetails = true;
      if (e.ratingReason == '' || e.ratingReason == null) {
        this.staring.ratingReason = '未填写评定理由';
      } else {
        this.staring.ratingReason = e.ratingReason;
      }
      this.grade(e);
    },
    pingji(e) {
      this.isDetails = false;
      this.staring.ratingReason = e.ratingReason;
      this.grade(e);
    },
    starTrue() {
      const _this = this;
      const staringPath = [];
      for (const i in this.path) {
        staringPath.push(this.path[i].informationFilePath);
      }
      const data = this.staring;
      data.informationFilePath = staringPath.join(',');
      this.requestComplaint.ratingSellers(data).then((data) => {
        if (data.isSuccess) {
          _this.starDialog = false;
          _this.pageSellersInfo();
        }
      });
    },
    downloadJzx(i) {
      window.open(this.path[i].informationFilePath);
    },
    changeStarLevel(e) {
      this.staring.level = e;
    },
    reset() {
      this.form = {
        xwId: '',
        channelName: '',
        productCategoryName: '',
        shopCode: '',
        level: '',
        month: '',
        hmcId: '',
        informationSign: '',
        sTATUS: ''
      };
      this.shopName = '';
      this.pageSellersInfo();
    },
    query() {
      this.pageNo = 1;
      this.pageSize = 10;
      if (this.shopName == '') {
        this.form.shopCode = '';
      }
      this.pageSellersInfo();
    },
    pageSellersInfo() {
      const _this = this;
      _this.tableData = [];
      const data = JSON.parse(JSON.stringify(this.form));
      if (data.channelName == '全部渠道') {
        data.channelName = '';
      }
      if (data.productCategoryName == '全部产业') {
        data.productCategoryName = '';
      }
      if (data.xwId == 'all') {
        data.xwId = '';
      }
      data.pageNo = this.pageNo;
      data.pageSize = this.pageSize;
      this.requestComplaint.pageSellersInfo(data).then((data) => {
        for (const i in data.data.entities) {
          if (data.data.entities[i].sTATUS == 'Y') {
            data.data.entities[i].sTATUS = '在职';
          }
          if (data.data.entities[i].sTATUS == 'N') {
            data.data.entities[i].sTATUS = '离职';
          }
        }
        _this.tableData = data.data.entities;
        _this.pageNo = data.data.pageNo;
        _this.pageSize = data.data.pageSize;
        _this.total = data.data.entityCount;
      });
    },
    changeLevel(e) {
      this.form.level = e;
    },
    storeSelect(item) {
      this.form.shopCode = item.shopCode;
    },
    listShopInfo(queryString, cb) {
      const _this = this;
      let { channelName } = this.form;
      const channeloptions = JSON.parse(JSON.stringify(this.channeloptions));
      channeloptions.splice(0, 1);
      if (channelName == '全部渠道') {
        channelName = channeloptions.join(',');
      }
      const params = {
        xwId: this.form.xwId,
        channelName,
        shopName: queryString || queryString == '' ? queryString : _this.queryString
      };
      this.requestRights.listShopInfo(params).then((data) => {
        _this.queryString = queryString || queryString == '' ? queryString : _this.queryString;
        if (data) {
          cb(data.entities);
        } else {
          cb([]);
        }
      });
    },
    handleSizeChange(val) {
      this.pageNo = 1;
      this.pageSize = val;
      if (this.tableData.length != 0) {
        this.pageSellersInfo();
      }
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      if (this.tableData.length != 0) {
        this.pageSellersInfo();
      }
    },
    grade(e) {
      this.starDialog = true;
      this.staring.hmcId = e.hMCID;
      this.staring.level = e.level;
      const staringPath = [];
      if (e.informationFilePath) {
        this.staring.isSc = true;
        const path = e.informationFilePath.split(',');
        for (const i in path) {
          staringPath.push({
            path: path[i].split('.')[path[i].split('.').length - 1],
            informationFilePath: path[i],
            loading: false
          });
        }
        this.path = staringPath;
      } else {
        this.staring.isSc = false;
        this.path = [];
      }
    },
    handleAvatarSuccess(res, file) {
      if (res.isSuccess) {
        this.staring.isSc = true;
        const path = res.data.imagesPath.split('.')[res.data.imagesPath.split('.').length - 1];
        this.path.push({
          path,
          informationFilePath: res.data.url,
          loading: false
        });
      } else {
        this.$message.error(res.msg);
      }
      this.loading = false;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error('上传文件不能超过 10MB!');
        return isLt2M;
      }
      this.loading = true;
    }
  },
  mounted(e) {
    this.pageSellersInfo();
  }
};
</script>

<style scoped>
.star-star {
  display: flex;
  align-items: center;
}
.star-star span {
  color: rgb(255, 73, 73);
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.dialog-footer button {
  width: 126px;
}
.ico-vipin {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: -2px;
  background: url('../../assets/images/ico-vipin.png') no-repeat;
}
starDialog-rictext {
  font-size: 15px;
}
.starDialog-chuanbox {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 5px;
}
.starDialog-jia {
  margin: 5px 0 0 5px;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f9fe;
  border-radius: 10px;
  font-size: 40px;
  color: #2ba2fc;
}
.starDialog-cright {
  margin-left: 15px;
}
.starDialog-cright p {
  font-size: 12px;
  color: #999999;
  margin-top: 8px;
}
.starDialog-box {
  padding: 20px;
  border: 1px solid #ccc;
}
.starDialog-title {
  font-weight: bold;
  margin: 10px 0;
}
.rights-config-header {
  background: initial;
}
.cx-star {
  height: 36px;
  display: inline-block;
  line-height: 36px;
}
.cx-title {
}
.cx-content {
  width: 68%;
}
.zl-scz,
.zl-node {
  border: 1px solid white;
  position: relative;
  width: 70px;
  height: 70px;
  margin-left: 5px;
  margin-top: 5px;
}

.zl-scz img,
.zl-node img {
  width: 100%;
  height: 100%;
}
.zl-scz .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.9);
}
.zl-scz:hover .close {
  display: block;
}
.zl-scz .el-loading-spinner {
  margin-top: -27px;
}
.close {
  border-radius: 19px;
  display: block;
  color: #45a0f8;
  position: absolute;
  right: -9px;
  top: -10px;
  font-size: 19px !important;
  line-height: 20px;
  display: none;
  z-index: 9;
}
</style>
<style>
.starDialog-jia .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.9);
}
.starDialog-jia .el-loading-spinner {
  margin-top: -46px;
}
.star-box .el-form-item__label {
  padding-top: 14px;
}
.starPing-dialog .el-dialog--small {
  width: 475px;
}
.starDialog-cright .el-upload {
  text-align: left;
}
.starDialog-reason .el-textarea__inner {
  border: none;
  background-color: #f3f9fe;
}
</style>
