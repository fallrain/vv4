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
          <div class="step-title"><span>活动范围配置</span></div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:449px">
          <div class="step-index"><span>3</span></div>
          <div class="step-title"><span>赠送礼品配置</span></div>
          <div class="step-bg"></div>
        </div>
      </div>
      <div class="save-draft">
        <span>有急事？先</span>
        <a href="javascript:;" @click="next('temporary')">存草稿</a>
        <span>回来继续配置</span>
      </div>
    </div>

    <div style="width: 898px; margin: auto;">
      <div class="config-form">
        <div class="config-form-header">
          <span>活动范围配置</span>
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="活动品牌" prop="" class="required">
            <el-checkbox-group v-model="form.rightBrandName">
              <el-checkbox v-for="item in brandList" :label="item.code">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="产品类别" prop="" class="required">
            <el-input
              style="width: 410px"
              v-model="categoryName"
              :disabled="categoryDisable"
              @focus="pickerCategory"
            ></el-input>
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
      budgetAmount: '',
      costAmount: '',
      title: '配置套购权益',
      isDeploy: '',
      isDeploytype: '',
      deployDialog: false,
      deployShow: false,
      deployNum: '',
      form: {
        channelType: '',
        channelName: [],
        xiaoweiId: '',
        rightBrandName: [],
        shopCode: '',
        productCategoryCode: ''
      },
      rules: {},
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
      categoryDisable: false,
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
      changechannel: false
    };
  },
  methods: {
    //    pickerXiaowei: function(){
    //        this.xiaoweiDialog = true
    //        this.beforexiaowei = this.xiaowei
    //        if(this.xiaowei.length == this.areaList.length){
    //            this.xiaoweiBtn = false
    //        }else{
    //            this.xiaoweiBtn = true
    //        }
    //    },
    //    listArea: function() {
    //        let _this = this
    //        this.requestRights.listArea().then(function(data) {
    //            if (data) {
    //                _this.areaList = data
    //            }
    //        });
    //    },
    //    areaCheckAll: function() {
    //        this.xiaowei = this.areaList
    //        this.xiaoweiBtn = false
    //    },
    //      cancelareaCheckAll: function() {
    //          this.xiaowei = []
    //          this.xiaoweiBtn = true
    //      },
    //      areaCheck: function() {
    //          if(this.xiaowei.length == this.areaList.length){
    //              this.xiaoweiBtn = false
    //          }
    //      },
    //    xiaoweiSelect: function () {
    //        if(this.xiaowei.length == 0){
    //            this.$message({
    //                type: "warning",
    //                message: "请选择活动小微"
    //            });
    //            return;
    //        }else{
    //            this.disabled = false;
    //            let xiaoweiName = []
    //            let xiaoweiAllName = []
    //            let xiaoweiId = []
    //            for (let i = 0; i < this.xiaowei.length; i++) {
    //                xiaoweiName.push(this.xiaowei[i].xwName)
    //                xiaoweiId.push(this.xiaowei[i].xwId)
    //                xiaoweiAllName.push(this.xiaowei[i].xwName)
    //            }
    //            xiaoweiName = xiaoweiName.join(',')
    //            xiaoweiAllName = xiaoweiAllName.join(',')
    //            this.form.xiaoweiId = xiaoweiId.join(',')
    //            if (this.xiaowei.length == this.areaList.length && this.areaList.length > 3) {
    //                xiaoweiName = '所有小微',
    //                xiaoweiAllName = '所有小微',
    //                this.form.xiaoweiId = 'all'
    //            }
    //            this.xiaoweiName = xiaoweiName,
    //            this.xiaoweiAllName = xiaoweiAllName,
    //            this.xiaoweiDialog = false
    //        }
    //    },
    //      xiaoweiDialogCloas: function() {
    //           this.xiaowei = this.beforexiaowei
    //          this.xiaoweiDialog = false
    //    },
    //      storesDialogCloas: function() {
    //          this.shopName = this.beforeshopName
    //          this.storesDialog = false
    //          this.md = false
    //      },

    pickerCategory() {
      this.categoryDialog = true;
      this.categoryDisable = true;
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
      this.categoryDisable = false;
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
      this.requestRights.listIndustry().then((data) => {
        if (data) {
          _this.industryList = data;
        }
      });
    },
    categorySelect() {
      if (this.category.length == 0) {
        this.$message({
          type: 'warning',
          message: '请选择产品类别'
        });
      } else {
        let categoryName = [];
        let productCategoryCode = [];
        for (let i = 0; i < this.category.length; i++) {
          categoryName.push(this.category[i].split(':')[1]);
          productCategoryCode.push(this.category[i].split(':')[0]);
        }
        categoryName = categoryName.join(',');
        productCategoryCode = productCategoryCode.join(',');

        let length = 0;
        for (const item in this.industryList) {
          length += 1;
        }
        if (this.category.length == length && length > 3) {
          categoryName = '所有类别';
          productCategoryCode = 'all';
        }

        this.form.productCategoryCode = productCategoryCode;
        this.categoryName = categoryName;
        this.categoryDialog = false;
        this.categoryDisable = false;
      }
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
    channelTypeChange(channelType) {
      this.listChannelById(channelType);
      this.form.channelName = [];
      if (this.changechannel == true) {
        this.shopName = '';
        this.stores = [];
      }
      this.changechannel = true;
    },
    //    listShopInfo: function (queryString, cb) {
    //        let _this = this
    //        let params = {
    //            xwId: this.form.xiaoweiId,
    //            channelName: this.form.channelName.join(','),
    //            shopName: queryString || queryString == '' ? queryString : _this.queryString
    //        }
    //        this.requestRights.listShopInfo(params).then(function(data) {
    //            _this.queryString = queryString || queryString == '' ? queryString : _this.queryString
    //            if (data) {
    //                cb(data.entities)
    //            } else {
    //                cb([])
    //            }
    //        });
    //    },
    //    storeSelect: function(item) {
    //
    //        if (item.shopName == '所有门店') {
    //            this.stores = [item]
    //            this.selectStoreShow = false
    //        } else {
    //            if(this.stores.length > 0){
    //                var notin = false;
    //                for (let a = 0; a < this.stores.length; a++) {
    //                    if(this.stores[a].shopName == item.shopName){
    //                        notin = true;
    //                        break;
    //                    }
    //                }
    //                if( notin == false){
    //                    this.stores.push(item)
    //                }
    //            }else{
    //                this.stores.push(item)
    //            }
    //        }
    //    },
    //    deleteShop:function(name) {
    //        var index = '';
    //        for (let c = 0; c < this.stores.length; c++) {
    //            if(this.stores[c].shopName == name){
    //                index = c;
    //            }
    //        }
    //        this.stores.splice(index, 1);
    //
    //        if (this.stores.length == 0) {
    //            this.selectStoreShow = true
    //        }
    //    },
    //    storesSelect: function(item) {
    //        let shopName = []
    //        let shopCode = []
    //
    //        for (let i = 0; i < this.stores.length; i++) {
    //            shopName.push(this.stores[i].shopName)
    //            shopCode.push(this.stores[i].shopCode)
    //        }
    //
    //        this.form.shopCode = shopCode.join(',')
    //        this.shopName = shopName.join(',')
    //
    //        this.storesDialog=false
    //        this.md = false
    //    },
    //    pickerStores: function () {
    //        if (this.form.xiaoweiId == '') {
    //            this.$message({
    //              type: 'warning',
    //              message: '请选择活动小微!'
    //            });
    //            return false
    //        }
    //        if (this.form.channelName.join(',') == '') {
    //            this.$message({
    //              type: 'warning',
    //              message: '请选择活动渠道!'
    //            });
    //            return false
    //        }
    //
    //        this.storesDialog=true
    //        this.md = true;
    //        this.beforeshopName = this.shopName
    //    },
    getOrderRightsById() {
      const _this = this;
      const params = {
        id: this.$route.query.id
      };
      this.requestRights.getRightsById(params).then((data) => {
        if (data) {
          _this.form.id = data.id;
          _this.form.channelType = data.channelType || 2;
          _this.form.step = 2;
          _this.form.rightBigType = data.rightBigType;
          _this.form.rightSmallType = data.rightSmallType;
          _this.form.giftType = data.giftType;

          setTimeout(() => {
            const channelName = [];
            if (data.channelName) {
              _this.form.channelName = channelName.concat(data.channelName.split(','));
            }
          }, 200);
          _this.shopName = data.shopName;
          let lstores = [];
          lstores = data.shopName ? data.shopName.split(',') : [];
          for (let c = 0; c < lstores.length; c++) {
            _this.stores.push({ shopName: lstores[c] });
          }
          _this.form.rightBrandName = data.rightBrandName ? data.rightBrandName.split(',') : [];
          _this.categoryName = data.productCategoryName;

          //                _this.xiaoweiName = data.xiaoweiName
          //                _this.xiaoweiAllName = data.xiaoweiName

          //                if(data.xiaoweiName == '所有小微'){
          //                    setTimeout(function(){
          //                        _this.xiaowei = _this.areaList
          //                    },200)
          //                    _this.xiaoweiBtn = false
          //                }else{
          //                    var xwname = []
          //                    xwname = data.xiaoweiName ? data.xiaoweiName.split(',') : []
          //                    setTimeout(function(){
          //                        for (let a = 0; a < xwname.length; a++) {
          //                            for(let b = 0; b < _this.areaList.length; b++){
          //                                if(xwname[a] == _this.areaList[b].xwName){
          //                                    _this.xiaowei.push(_this.areaList[b])
          //                                }
          //                            }
          //                        }
          //                    },200)
          //                }
          //                if(data.xiaoweiName != null){
          //                    _this.disabled = false;
          //                }
          //                _this.form.xiaoweiId = data.xiaoweiId
          //                _this.form.shopCode = data.shopCode
          _this.form.productCategoryCode = data.productCategoryCode;

          _this.listChannelById(_this.form.channelType);

          if (data.productCategoryName == '所有产业') {
            setTimeout(() => {
              const catname01 = _this.industryList;
              for (const p in catname01) {
                _this.category.push(`${catname01[p]}:${p}`);
              }
            }, 200);
            _this.catBtn = false;
          } else {
            let catname = [];
            catname = data.productCategoryName ? data.productCategoryName.split(',') : [];
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
        }
      });
    },
    // 下一步
    next(temporary) {
      if (this.form.rightBrandName == '') {
        this.$message({
          type: 'warning',
          message: '请选择活动品牌'
        });
        return;
      }
      if (this.categoryName == '' || this.categoryName == undefined) {
        this.$message({
          type: 'warning',
          message: '请选择产品类别'
        });
        return;
      }
      // 暂时判断
      if (this.form.rightBrandName.length == 1) {
        if (this.form.rightBrandName[0] == 'casarte' && this.form.giftType == 1) {
          this.$message({
            type: 'warning',
            message: '当礼品类型为海贝积分时，活动品牌不能仅为卡萨帝'
          });
          return;
        }
        if (this.form.rightBrandName[0] == 'casarte' && (this.form.giftType == 3 || this.form.giftType == 4)) {
          this.$message({
            type: 'warning',
            message: '当礼品类型为礼品时，活动品牌不能仅为卡萨帝'
          });
          return;
        }
      }
      if (this.form.giftType == 2) {
        if (this.form.rightBrandName.length != 1) {
          this.$message({
            type: 'warning',
            message: '当礼品类型为卡萨帝积分时，活动品牌只能为卡萨帝'
          });
          return;
        }
        if (this.form.rightBrandName.length == 1 && this.form.rightBrandName[0] != 'casarte') {
          this.$message({
            type: 'warning',
            message: '当礼品类型为卡萨帝积分时，活动品牌只能为卡萨帝'
          });
          return;
        }
      }
      // end 暂时判断

      const data = JSON.parse(JSON.stringify(this.form));

      data.rightBrandName = data.rightBrandName.join(',');
      data.channelName = data.channelName.join(',');
      const _this = this;

      if (temporary == 'temporary') {
        this.requestRights.saveChinaMomentOrderRights(data).then((data) => {
          self.saveing = false;
          if (data) {
            _this.$message({
              type: 'success',
              message: '暂存成功'
            });
          }
        });
      } else {
        //            let id = this.$route.query.id
        //            _this.$router.push({
        //                path: '/rights/rightschinagift',
        //                query: {
        //                    //id: data
        //                    id: id,
        //                }
        //            })
        this.requestRights.saveChinaNextOrderRights(data).then((data) => {
          if (data) {
            // console.log(data)
            _this.$router.push({
              path: '/rights/rightschinagift',
              query: { id: data }
            });
          }
        });
      }
    },
    prev() {
      const { id } = this.$route.query;
      this.$router.push({
        path: '/rights/rightschinabaseinfo',
        query: {
          id,
          rightSmallType: this.form.rightSmallType
        }
      });
    }
  },
  mounted() {
    this.getOrderRightsById();
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
.m-leftmod {
  padding: 4px !important;
}
.m-mdbtn {
  float: left;
  margin-left: 20px;
  border-radius: 3px;
}
.m-mdbtn .ico-vipin {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: -2px;
  background: url('../../assets/images/ico-vipin.png') no-repeat;
}
.el-upload-list__item {
  width: auto;
  display: inline-block;
  float: left;
  margin-right: 10px;
  margin-top: 10px;
}
.el-progress {
  display: none;
}
.el-upload-list {
  display: inline-block;
}
.m-plist {
  margin: 5px 0 5px 10px;
  padding-left: 10px;
  width: 100%;
  display: inline-block;
  border-left: 2px solid #e0f0ff;
}
</style>
