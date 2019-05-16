<template>
  <div class="vip-content" style="min-width:1230px;">
    <div class="rights-config-header-box">
      <div class="rights-config-header">
        <div class="header-title">
          <span>{{ title }}</span>
        </div>
        <div class="rights-config-step" style="margin-left:35px">
          <div class="step-index"><span>1</span></div>
          <div class="step-title"><span>基础信息配置</span></div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step setted" style="margin-left:242px">
          <div class="step-index"><span>2</span></div>
          <div class="step-title"><span>发放范围配置</span></div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:449px">
          <div class="step-index"><span>3</span></div>
          <div class="step-title"><span>发放规则配置</span></div>
          <div class="step-bg"></div>
        </div>
      </div>
      <!--<div class="save-draft">-->
      <!--<span>有急事？先</span>-->
      <!--<a href="javascript:;" @click="next('temporary')">存草稿</a>-->
      <!--<span>回来继续配置</span>-->
      <!--</div>-->
    </div>
    <div style="width: 898px; margin: auto;">
      <div class="config-form">
        <div class="config-form-header">
          <span>发放范围配置</span>
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="小微" prop="" class="required">
            <el-tooltip class="item" :disabled="disabled" effect="light" :content="xiaoweiAllName" placement="top">
              <el-input style="width: 410px" v-model="xiaoweiName" @focus="pickerXiaowei"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="渠道" prop="" class="required">
            <div style="margin-left:159px;">
              <el-checkbox-group v-model="form.channel">
                <el-checkbox v-for="(index, item) in channel" :label="index">{{ index }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-form-item label="门店" prop="" class="required">
            <el-input
              style="width: 410px"
              :disabled="md"
              type="textarea"
              v-model="shopName"
              @focus="pickerStores"
            ></el-input>
          </el-form-item>
          <el-form-item label="经营产业" prop="" class="required">
            <el-input style="width: 410px" v-model="categoryName" @focus="pickerCategory"></el-input>
          </el-form-item>
          <el-form-item label="资源发放形式" prop="" class="required">
            <el-select
              v-model="form.resourceForm"
              placeholder="请选择资源发放形式"
              style="width: 410px"
              @change="resourceFormChange"
            >
              <el-option :key="1" label="资源位" :value="1"> </el-option>
              <el-option :key="2" label="入户服务" :value="2"> </el-option>
              <el-option :key="3" label="潜在顾客" :value="3"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联资源位" prop="" v-if="!sourceIdDis">
            <el-select
              v-model="form.sourceId"
              placeholder="请选择资源位"
              @visible-change="listSource"
              @change="sourceChange"
              style="width: 410px"
            >
              <el-option v-for="item in sourceoptions" :key="item.id" :label="item.value" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发送方式" prop="" class="required">
            <el-checkbox-group v-model="form.sendChannelType">
              <el-checkbox label="1">兑呗已录单用户</el-checkbox>
              <el-checkbox label="2">微信好友</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item>
            <el-button class="trs-btn" style="width:109px;margin-top:14px;" @click="prev">上一步</el-button>
            <el-button
              type="primary"
              class="trs-btn"
              style="width:109px;margin-top:14px;margin-left:11px;"
              @click="next"
              >下一步</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-dialog
      class="xiaowei-dialog trs-dialog"
      title=""
      :visible.sync="xiaoweiDialog"
      :before-close="xiaoweiDialogCloas"
      :modal-append-to-body="false"
    >
      <div class="xiaowei-dialog-header">
        <p>
          选择权益活动小微：<a href="javascript:;" v-show="xiaoweiBtn" @click="areaCheckAll">全选</a
          ><a href="javascript:;" v-show="!xiaoweiBtn" @click="cancelareaCheckAll">取消全选</a>
        </p>
        <el-checkbox-group v-model="xiaowei">
          <el-checkbox v-for="item in areaList" :label="item" @change="areaCheck">{{ item.xwName }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="xiaoweiSelect" class="trs-btn" style="width:194px;">确认选择 </el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="xiaowei-dialog trs-dialog"
      title=""
      :visible.sync="categoryDialog"
      :before-close="categoryDialogCloas"
      :modal-append-to-body="false"
    >
      <div class="xiaowei-dialog-header">
        <p>
          添加产品类别：<a href="javascript:;" v-show="catBtn" @click="categoryCheckAll">全选</a
          ><a href="javascript:;" v-show="!catBtn" @click="cancelCheckAll">取消全选</a>
        </p>
        <el-checkbox-group v-model="category">
          <el-checkbox v-for="(index, item) in industryList" :label="index + ':' + item">{{ item }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="categorySelect" class="trs-btn" style="width:194px;">确认选择 </el-button>
      </div>
    </el-dialog>

    <el-dialog
      class="stores-dialog trs-dialog"
      title=""
      :visible.sync="storesDialog"
      :before-close="storesDialogCloas"
      :modal-append-to-body="false"
    >
      <div class="xiaowei-dialog-header">
        <p>添加权益活动门店：</p>
        <el-autocomplete
          v-if="selectStoreShow"
          :fetch-suggestions="listShopInfo"
          placeholder="输入门店名称添加"
          @select="storeSelect"
          value-key="shopName"
          style="width:407px"
        >
        </el-autocomplete>
        <a href="javascript:;" class="select-all-shop" @click="storeSelect({ shopName: '所有门店', shopCode: 'all' })"
          >选择所有门店</a
        >
        <p>已经选定的门店：</p>
        <div class="selected-stores">
          <div v-for="store in stores" class="m-box">
            <el-tooltip class="item" effect="light" :content="store.shopName" placement="top">
              <div class="m-contbox">
                <span>{{ store.shopName }}</span>
                <i class="ico-del" @click="deleteShop(store.shopName)"></i>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="trs-btn" @click="storesSelect" style="width:194px;">确认选择 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      title: '直销员经营权益配置',
      form: {
        channel: [],
        xiaoweiId: '',
        shopCode: '',
        productCategoryName: [],
        sendChannelType: [],
        sourceId: '',
        resourceForm: ''
      },
      sourceId: '',
      sourceName: '',
      rules: {},
      radio2: 3,
      sourceoptions: [],
      brandList: [
        {
          name: '海尔',
          code: 'haier'
        },
        {
          name: '卡萨帝',
          code: 'casarte'
        },
        {
          name: '统帅',
          code: 'tongshuai'
        }
      ],
      areaList: [], // 小微列表
      channel: [], // 渠道列表
      xiaoweiDialog: false,
      xiaoweiBtn: true,
      xiaowei: [],
      beforexiaowei: [], // 记录选择之前的小微值当用户选择关闭小微弹窗时回置xiaowei值
      xiaoweiName: '',
      xiaoweiAllName: '',
      categoryDialog: false,
      catBtn: true,
      industryList: [], // 产线列表
      category: [],
      beforecategory: [], // 记录选择之前的小微值当用户选择关闭小微弹窗时回置category值
      categoryName: '',
      storesDialog: false, // 门店选择弹层
      shopName: '',
      beforeshopName: '', // 记录选择之前的门店值当用户选择关闭小微弹窗时回置shopName值
      stores: [],
      disabled: true, // hover是否显示
      md: false, // 门店输入框是否可用
      selectStoreShow: true,
      queryString: '',
      changechannel: false,
      sourceIdDis: false
    };
  },
  methods: {
    resourceFormChange(e) {
      if (e == 1) {
        this.sourceIdDis = false;
      } else {
        this.sourceIdDis = true;
        this.form.sourceId = '';
      }
    },
    pickerXiaowei() {
      this.xiaoweiDialog = true;
      this.beforexiaowei = this.xiaowei;
      if (this.xiaowei.length == this.areaList.length) {
        this.xiaoweiBtn = false;
      } else {
        this.xiaoweiBtn = true;
      }
    },
    listArea() {
      const _this = this;
      this.requestRights.listArea().then((data) => {
        if (data) {
          _this.areaList = data;
        }
      });
    },
    areaCheckAll() {
      this.xiaowei = this.areaList;
      this.xiaoweiBtn = false;
    },
    cancelareaCheckAll() {
      this.xiaowei = [];
      this.xiaoweiBtn = true;
    },
    areaCheck() {
      if (this.xiaowei.length == this.areaList.length) {
        this.xiaoweiBtn = false;
      }
    },
    xiaoweiSelect() {
      if (this.xiaowei.length == 0) {
        this.$message({
          type: 'warning',
          message: '请选择小微'
        });
      } else {
        this.disabled = false;
        let xiaoweiName = [];
        let xiaoweiAllName = [];
        const xiaoweiId = [];
        for (let i = 0; i < this.xiaowei.length; i++) {
          xiaoweiName.push(this.xiaowei[i].xwName);
          xiaoweiId.push(this.xiaowei[i].xwId);
          xiaoweiAllName.push(this.xiaowei[i].xwName);
        }
        xiaoweiName = xiaoweiName.join(',');
        xiaoweiAllName = xiaoweiAllName.join(',');
        this.form.xiaoweiId = xiaoweiId.join(',');

        if (this.xiaowei.length == this.areaList.length && this.areaList.length > 3) {
          (xiaoweiName = '所有小微'), (xiaoweiAllName = '所有小微'), (this.form.xiaoweiId = 'all');
        }
        (this.xiaoweiName = xiaoweiName), (this.xiaoweiAllName = xiaoweiAllName), (this.xiaoweiDialog = false);
      }
    },
    xiaoweiDialogCloas() {
      this.xiaowei = this.beforexiaowei;
      this.xiaoweiDialog = false;
    },
    storesDialogCloas() {
      this.shopName = this.beforeshopName;
      this.storesDialog = false;
      this.md = false;
    },

    pickerCategory() {
      this.categoryDialog = true;
      this.beforecategory = this.category;
      let length = 0;
      for (const item in this.industryList) {
        length += 1;
      }
      if (this.category.length == length) {
        this.catBtn = false;
      } else {
        this.catBtn = true;
      }
    },
    categoryDialogCloas() {
      this.category = this.beforecategory;
      this.categoryDialog = false;
    },
    categoryCheckAll() {
      const category = [];
      for (const item in this.industryList) {
        category.push(`${this.industryList[item]}:${item}`);
      }
      this.category = category;
      this.catBtn = false;
    },
    cancelCheckAll() {
      this.category = [];
      this.catBtn = true;
    },
    listIndustry() {
      const _this = this;
      this.requestManagement.listSellersProduct().then((data) => {
        if (data.isSuccess) {
          _this.industryList = data.data;
        }
      });
    },
    categorySelect() {
      if (this.category.length == 0) {
        this.$message({
          type: 'warning',
          message: '请选择经营产业'
        });
        return;
      }
      let categoryName = [];
      let productCategoryName = [];
      for (let i = 0; i < this.category.length; i++) {
        categoryName.push(this.category[i].split(':')[1]);
        productCategoryName.push(this.category[i].split(':')[1]);
      }
      categoryName = categoryName.join(',');
      productCategoryName = productCategoryName.join(',');

      let length = 0;
      for (const item in this.industryList) {
        length += 1;
      }
      if (this.category.length == length && length > 3) {
        categoryName = '所有类别';
        productCategoryName = 'all';
      }

      this.form.productCategoryName = productCategoryName;
      // this.form.productCategoryCode = productCategoryCode
      this.categoryName = categoryName;
      this.categoryDialog = false;
    },
    listChannelById(id) {
      const _this = this;
      const params = {
        id
      };
      this.requestRights.listChannelById(params).then((data) => {
        if (data) {
          _this.channel = data;
        }
      });
    },

    listShopInfo(queryString, cb) {
      const _this = this;
      const params = {
        xwId: this.form.xiaoweiId,
        channelName: this.form.channel.join(','),
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
    storeSelect(item) {
      if (item.shopName == '所有门店') {
        this.stores = [item];
        this.selectStoreShow = false;
      } else if (this.stores.length > 0) {
        let notin = false;
        for (let a = 0; a < this.stores.length; a++) {
          if (this.stores[a].shopName == item.shopName) {
            notin = true;
            break;
          }
        }
        if (notin == false) {
          this.stores.push(item);
        }
      } else {
        this.stores.push(item);
      }
    },
    deleteShop(name) {
      let index = '';
      for (let c = 0; c < this.stores.length; c++) {
        if (this.stores[c].shopName == name) {
          index = c;
        }
      }
      this.stores.splice(index, 1);

      if (this.stores.length == 0) {
        this.selectStoreShow = true;
      }
    },
    storesSelect(item) {
      const shopName = [];
      const shopCode = [];

      for (let i = 0; i < this.stores.length; i++) {
        shopName.push(this.stores[i].shopName);
        shopCode.push(this.stores[i].shopCode);
      }

      this.form.shopCode = shopCode.join(',');
      this.shopName = shopName.join(',');

      this.storesDialog = false;
      this.md = false;
    },
    pickerStores() {
      if (this.form.xiaoweiId == '' || !this.form.xiaoweiId) {
        this.$message({
          type: 'warning',
          message: '请选择小微!'
        });
        return false;
      }
      if (this.form.channel.join(',') == '') {
        this.$message({
          type: 'warning',
          message: '请选择渠道!'
        });
        return false;
      }

      this.storesDialog = true;
      this.md = true;
      this.beforeshopName = this.shopName;
    },
    listSource(e) {
      if (e) {
        const _this = this;
        this.sourceoptions = [];
        if (this.form.xiaoweiId == '' || !this.form.xiaoweiId) {
          this.$message({
            type: 'warning',
            message: '请选择小微!'
          });
          return false;
        }
        if (this.form.channel.join(',') == '') {
          this.$message({
            type: 'warning',
            message: '请选择渠道!'
          });
          return false;
        }
        const data = {
          xiaoweiId: this.form.xiaoweiId,
          channelName: this.form.channel.join(',')
        };
        this.requestManagement.listSource(data).then((data) => {
          if (data.isSuccess) {
            if (data.data) {
              data.data.forEach((el) => {
                _this.sourceoptions.push({
                  id: el.id,
                  value: el.name
                });
              });
            }
          }
        });
      }
    },
    sourceChange(e) {
      this.form.sourceId = e;
      // this.sourceName=e
    },
    getOrderRightsById() {
      const _this = this;
      const params = {
        id: this.$route.query.id
      };
      this.requestManagement.getVipUserManageConfigVOById(params).then((data) => {
        if (data.isSuccess) {
          _this.form.id = data.data.id;
          _this.form.resourceForm = data.data.resourceForm;
          _this.form.step = 2;
          if (data.data.sendChannelType) {
            _this.form.sendChannelType = data.data.sendChannelType.split(',');
          }
          setTimeout(() => {
            const channel = [];
            if (data.data.channel) {
              _this.form.channel = channel.concat(data.data.channel.split(','));
            }
          }, 200);
          _this.shopName = data.data.shopName;
          let lstores = [];
          lstores = data.data.shopName ? data.data.shopName.split(',') : [];
          let codestores = [];
          codestores = data.data.shopCode ? data.data.shopCode.split(',') : [];
          for (let c = 0; c < lstores.length; c++) {
            _this.stores.push({ shopName: lstores[c], shopCode: codestores[c] });
          }
          if (data.data.productCategoryName == 'all') {
            _this.categoryName = '所有类别';
          } else {
            _this.categoryName = data.data.productCategoryName;
          }
          _this.xiaoweiName = data.data.xiaoweiName;
          _this.xiaoweiAllName = data.data.xiaoweiName;

          if (data.data.xiaoweiName == '所有小微') {
            setTimeout(() => {
              _this.xiaowei = _this.areaList;
            }, 200);
            _this.xiaoweiBtn = false;
          } else {
            let xwname = [];
            xwname = data.data.xiaoweiName ? data.data.xiaoweiName.split(',') : [];
            setTimeout(() => {
              for (let a = 0; a < xwname.length; a++) {
                for (let b = 0; b < _this.areaList.length; b++) {
                  if (xwname[a] == _this.areaList[b].xwName) {
                    _this.xiaowei.push(_this.areaList[b]);
                  }
                }
              }
            }, 200);
          }
          if (data.data.xiaoweiName != null) {
            _this.disabled = false;
          }
          _this.form.xiaoweiId = data.data.xiaoweiId;
          _this.form.shopCode = data.data.shopCode;
          if (data.data.shopCode == 'all') {
            _this.selectStoreShow = false;
          }
          // _this.form.productCategoryCode = data.data.productCategoryCode
          _this.form.productCategoryName = data.data.productCategoryName;

          _this.listChannelById(2);
          if (data.data.productCategoryName == 'all') {
            setTimeout(() => {
              const catname01 = _this.industryList;
              for (const p in catname01) {
                _this.category.push(`${catname01[p]}:${p}`);
              }
            }, 200);
            _this.catBtn = false;
          } else {
            let catname = [];
            catname = data.data.productCategoryName ? data.data.productCategoryName.split(',') : [];
            setTimeout(() => {
              const catname02 = _this.industryList;
              for (let p = 0; p < catname.length; p++) {
                for (const q in catname02) {
                  if (catname[p] == q) {
                    // _this.category.push(catname02[q])
                    _this.category.push(`${catname02[q]}:${q}`);
                  }
                }
              }
            }, 200);
          }

          setTimeout(() => {
            _this.form.sourceId = data.data.sourceId;
            if (data.data.sourceId) {
              _this.listSource(true);
            }
            // _this.sourceId=data.data.sourceId
            _this.sourceName = data.data.sourceName;
          }, 200);
        }
      });
    },
    // 下一步
    next(temporary) {
      if (this.xiaoweiName == '' || this.xiaoweiName == undefined) {
        this.$message({
          type: 'warning',
          message: '请选择小微'
        });
        return;
      }
      if (this.form.channel.join(',') == '') {
        this.$message({
          type: 'warning',
          message: '请选择渠道!'
        });
        return;
      }
      if (this.shopName == '' || this.shopName == undefined) {
        this.$message({
          type: 'warning',
          message: '请选择门店'
        });
        return;
      }
      if (this.categoryName == '' || this.categoryName == undefined) {
        this.$message({
          type: 'warning',
          message: '请选择经营产业'
        });
        return;
      }

      const data = JSON.parse(JSON.stringify(this.form));
      if (data.sendChannelType.length == 2) {
        if (data.sendChannelType[0] == 2) {
          data.sendChannelType[0] = 1;
          data.sendChannelType[1] = 2;
        }
      }
      data.channel = data.channel.join(',');
      data.sendChannelType = data.sendChannelType.join(',');

      const _this = this;

      this.requestManagement.saveupdateVipUserManageConfig(data).then((data) => {
        if (data.isSuccess) {
          _this.$router.push({
            path: '/management/rightsrulerange',
            query: { id: data.data }
          });
        }
      });
    },
    prev() {
      const { id } = this.$route.query;
      this.$router.push({
        path: '/management/rightsdirect',
        query: {
          id,
          rightSmallType: this.form.rightSmallType
        }
      });
    }
  },
  mounted() {
    this.getOrderRightsById();
    this.listArea();
    this.listIndustry();
  }
};
</script>
<style scoped>
.config-form {
  max-height: 525px;
  position: absolute;
  top: 20px;
  bottom: 20px;
  overflow: auto;
}
.config-form .trs-btn {
  margin-left: 159px;
}
.config-form .img-list {
  margin-left: 159px;
}
.xiaowei-dialog .xiaowei-dialog-header > p a {
  width: auto;
  padding: 0 5px;
  height: 18px;
  border: 1px solid #cccccc;
  border-radius: 2px;
  color: #45a0f8;
  font-weight: normal;
  display: inline-block;
  text-align: center;
  line-height: 18px;
  float: right;
}
.select-all-shop {
  width: auto;
  padding: 0 5px;
  height: 24px;
  border: 1px solid #ccc;
  border-radius: 2px;
  color: #45a0f8;
  font-weight: normal;
  display: inline-block;
  text-align: center;
  line-height: 24px;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
<style>
.xiaowei-dialog .el-dialog {
  width: 240px;
}
.xiaowei-dialog .el-checkbox-group {
  height: 206px;
  overflow: auto;
}
.xiaowei-dialog .el-checkbox {
  display: block;
  margin-left: 0;
}
.xiaowei-dialog .el-dialog__body {
  margin-top: -30px;
  padding-bottom: 10px;
}
.xiaowei-dialog .xiaowei-dialog-header > p {
  margin-bottom: 12px;
  font-weight: bold;
}

.stores-dialog .el-dialog {
  width: 476px;
}
.stores-dialog .el-dialog__body {
  margin-top: -30px;
  padding: 30px;
  padding-bottom: 10px;
}
.stores-dialog div .el-input__inner {
  height: 32px;
  border-radius: 2px;
  margin: 5px 0;
}
.stores-dialog div .el-input__inner input {
  height: 32px;
  line-height: 32px;
}

.stores-dialog .selected-stores {
  margin-top: 5px;
  display: inline-block;
  height: auto;
  min-height: 70px;
}
.stores-dialog .selected-stores .m-box {
  display: inline-block;
  float: left;
}
.stores-dialog .selected-stores .m-contbox {
  display: inline-block;
  position: relative;
  margin-right: 5px;
  text-align: center;
}
.stores-dialog .selected-stores .m-contbox span {
  display: inline-block;
  width: 115px;
  border-radius: 2px;
  margin-right: 8px;
  padding: 0 15px;
  line-height: 32px;
  background: #f5f5f5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.stores-dialog .selected-stores .m-contbox .ico-del {
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: 0px;
  top: -5px;
  background: url('../../assets/images/ico-del.png') no-repeat;
  background-size: 100% 100%;
}
.stores-dialog .dialog-footer {
  text-align: center;
}

.required .el-form-item__label:before {
  content: '*';
  color: #ff4949;
  margin-right: 4px;
}
.el-tooltip__popper {
  max-width: 600px;
}
.el-input__inner {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.el-textarea textarea {
  font-size: 12px;
}
</style>
