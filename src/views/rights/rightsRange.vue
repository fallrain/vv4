<template>
  <div class="vip-content rightsRange" style="min-width:1230px;">
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
          <el-form-item label="活动小微" prop="" class="required">
            <el-tooltip class="item" :disabled="disabled" effect="light" :content="xiaoweiAllName" placement="top">
              <el-input style="width: 410px" v-model="xiaoweiName" @focus="pickerXiaowei"></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="活动渠道" prop="" class="required">
            <div>
              <!-- <div style="margin-left:159px;"> -->
              <!--<el-radio-group v-model="form.channelType" @change="channelTypeChange">-->
              <!--<el-radio :label="1">线上渠道</el-radio>-->
              <!--<el-radio :label="2">线下渠道</el-radio>-->
              <!--<el-radio :label="-1">线上线下渠道</el-radio>-->
              <!--</el-radio-group>-->
              <el-checkbox v-model="allchannel" @change="changeAllChannel">全选</el-checkbox>
              <el-checkbox-group
                v-model="form.channelName"
                style="display: inline-block;margin-left: 10px;"
                @change="channelChange"
              >
                <el-checkbox v-for="(index, item) in channel" :label="index">{{ index }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-form-item label="活动门店" prop="" class="required">
            <el-input
              placeholder="所有门店或手动选择门店，请点这里"
              style="width: 410px"
              :disabled="md"
              type="textarea"
              v-model="shopName"
              @focus="pickerStores"
            ></el-input>
            <div class="men-but">
              <el-button type="text" @click="exportShopTemplet" :disabled="xzdisabled">下载模板</el-button>
              <el-upload
                class="avatar-uploader"
                :action="gUtils.getApiUrl() + 'vipcenter/BatchAssignController/uploadShopCodes '"
                :show-file-list="false"
                :data="{ rightsId: $route.query.id, channelName: form.channelName.join(','), xwId: form.xiaoweiId }"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-button type="text" :disabled="scdisabled"
                  ><em v-if="!scloading">批量上传</em><em v-if="scloading">上传中</em>
                  <img
                    v-if="scloading"
                    style="display: inline-block;margin-top: -2px;"
                    src="../../assets/images/loading.gif"
                    alt=""
                /></el-button>
              </el-upload>
              <el-button type="text" :disabled="yldisabled" @click="shopPreview">门店预览</el-button>
            </div>
          </el-form-item>
          <el-form-item label="活动品牌" prop="" class="required">
            <el-checkbox-group v-model="form.rightBrandName">
              <el-checkbox v-for="item in brandList" :label="item.code">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="产品类别" prop="" class="required">
            <el-input style="width: 410px" v-model="categoryName" @focus="pickerCategory"></el-input>
          </el-form-item>

          <el-form-item label="是否与其他活动不同享" prop="" class="required">
            <el-radio-group v-model="isMutex">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item v-if="isMutex" label="选择不同享活动类型" prop="" class="required">
            <el-radio-group v-model="mutexType">
              <el-radio :label="1">与单品活动不同享</el-radio>
              <el-radio :label="2">与套购活动不同享</el-radio>
              <el-radio :label="3">与部分活动同享</el-radio>
              <el-radio :label="4">与单品和套购均不同享</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="同享活动" prop="" class="required" v-if="isMutex && mutexType === 3">
            <el-input
              placeholder="所有活动或手动选择活动，请点这里"
              style="width: 410px"
              :disabled="gxMutex"
              type="textarea"
              v-model="escapeMutexActivity"
              @focus="pickerMutex"
            ></el-input>
          </el-form-item>
          <!--<el-form-item
            label="选择同享活动"

            v-show="!isMutex && form.giftType === 5"
          >
            <el-checkbox-group
              v-model="form.actShareType"
            >
              <el-checkbox
                :label="1"
              >与任意活动同享
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>-->
          <el-form-item>
            <el-button class="trs-btn" style="width:109px;margin-top:14px;" @click="prev">上一步</el-button>
            <el-button
              type="primary"
              class="trs-btn"
              style="width:109px;margin-top:14px;margin-left:11px;"
              @click="next"
              >下一步
            </el-button>
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
        <el-button type="primary" @click="xiaoweiSelect" class="trs-btn" style="width:194px;">确认选择</el-button>
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
        <el-button type="primary" @click="categorySelect" class="trs-btn" style="width:194px;">确认选择</el-button>
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
        <el-button type="primary" class="trs-btn" @click="storesSelect" style="width:194px;">确认选择</el-button>
      </div>
    </el-dialog>

    <!-- 选择同享活动弹框 -->
    <el-dialog
      class="stores-dialog trs-dialog"
      title=""
      :visible.sync="mutexDialog"
      :before-close="mutexDialogCloas"
      :modal-append-to-body="false"
    >
      <div class="xiaowei-dialog-header">
        <p>添加共享活动：</p>
        <el-autocomplete
          v-if="selectMutexShow"
          :fetch-suggestions="listMutexInfo"
          placeholder="输入活动名称添加"
          @select="mutexSelect"
          value-key="rightName"
          style="width:407px"
        >
        </el-autocomplete>
        <a href="javascript:;" class="select-all-shop" @click="mutexSelect({ rightName: '所有活动' })">选择所有活动</a>
        <p>已经选定的活动：</p>
        <div class="selected-stores">
          <div v-for="item in mutex" class="m-box">
            <el-tooltip class="item" effect="light" :content="item.rightName" placement="top">
              <div class="m-contbox">
                <span>{{ item.rightName }}</span>
                <i class="ico-del" @click="deleteMutex(item.rightName)"></i>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="trs-btn" @click="mutexQrSelect" style="width:194px;">确认选择</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      title: '配置单品权益',
      form: {
        channelType: 2,
        channelName: [],
        xiaoweiId: '',
        rightBrandName: [],
        shopCode: '',
        productCategoryCode: '',
        actShareType: [] // 尊享卡的时候，活动不同享类型
      },
      rules: {},
      radio2: 3,
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
      scdisabled: true,
      yldisabled: true,
      xzdisabled: false,
      allchannel: false,
      scloading: false,
      isMutex: false, // 是否互斥
      mutexType: 1, // 互斥类型
      escapeMutexActivity: '', // 可同享活动
      mutexDialog: false,
      gxMutex: false, // 共享活动输入框是否可以
      selectMutexShow: true,
      mutex: [],
      beforeMutex: []
    };
  },
  methods: {
    changeAllChannel() {
      if (this.allchannel) {
        const arr = [];
        for (const i in this.channel) {
          arr.push(this.channel[i]);
        }
        this.form.channelName = arr;
      } else {
        this.form.channelName = [];
      }
    },
    channelChange() {
      const arr = { a: 0 };
      for (const i in this.channel) {
        arr.a += 1;
      }
      if (this.form.channelName.length == arr.a) {
        this.allchannel = true;
      } else {
        this.allchannel = false;
      }
    },
    shopPreview() {
      const _this = this;
      const params = {
        id: this.$route.query.id
      };
      this.requestRights.getOrderRightsById(params).then((data) => {
        if (data) {
          window.location.href = data.excelPath;
        }
      });
    },
    beforeAvatarUpload(file) {
      this.scloading = true;
    },
    handleAvatarSuccess(res, file) {
      this.scloading = false;
      if (file.response.isSuccess) {
        this.$message({
          message: file.response.msg,
          type: 'success'
        });
        this.stores = [];
        this.form.shopCode = '';
        this.form.shopName = '';
        this.shopName = '已批量上传';
        this.form.shopSign = 1;
        this.yldisabled = false;
        this.xzdisabled = true;
      } else if (file.response.data) {
        const name = { n: '' };
        let data = JSON.parse(JSON.stringify(file.response.data));
        data = data.splice(0, 10);
        for (const i in data) {
          name.n = `${name.n + data[i]}，`;
        }
        if (file.response.data.length > 10) {
          name.n = `${name.n.substring(0, name.n.length - 1)}等`;
        } else {
          name.n = name.n.substring(0, name.n.length - 1);
        }
        this.$alert(name.n, '以下门店超出约束范围', {
          confirmButtonText: '确定',
          callback: (action) => {}
        });
      } else {
        this.$message({
          message: file.response.msg,
          type: 'warning'
        });
      }
    },
    exportShopTemplet() {
      if (!this.form.xiaoweiId) {
        this.$message({
          message: '请选择活动小微',
          type: 'warning'
        });
        return;
      }
      if (this.form.channelName.length == 0) {
        this.$message({
          message: '请选择活动渠道',
          type: 'warning'
        });
        return;
      }
      const _this = this;
      this.requestRights.exportShopTemplet().then((data) => {
        if (data.isSuccess) {
          window.location.href = data.data.showPath;
          _this.scdisabled = false;
          _this.yldisabled = true;
        }
      });
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
          message: '请选择活动小微'
        });
      } else {
        this.disabled = false;
        let xiaoweiName = [];
        let xiaoweiAllName = [];
        const xiaoweiId = [];
        for (let i = 0; i < this.xiaowei.length; i++) {
          //            if (i<3) {
          //                xiaoweiName.push(this.xiaowei[i].xwName)
          //            } else if (i == 4) {
          //                xiaoweiName.push('...')
          //            }
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
        return;
      }
      let categoryName = [];
      let productCategoryCode = [];
      for (let i = 0; i < this.category.length; i++) {
        //            if (i<3) {
        //                categoryName.push(this.category[i].split(':')[1])
        //            } else if (i == 4)  {
        //                categoryName.push('...')
        //            }
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
    listShopInfo(queryString, cb) {
      const _this = this;
      const params = {
        xwId: this.form.xiaoweiId,
        channelName: this.form.channelName.join(','),
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
      this.form.shopSign = 2;
      this.scdisabled = true;
      this.yldisabled = true;
      this.xzdisabled = false;
    },
    pickerStores() {
      if (this.form.xiaoweiId == '') {
        this.$message({
          type: 'warning',
          message: '请选择活动小微!'
        });
        return false;
      }
      if (this.form.channelName.join(',') == '') {
        this.$message({
          type: 'warning',
          message: '请选择活动渠道!'
        });
        return false;
      }

      this.storesDialog = true;
      this.md = true;
      this.beforeshopName = this.shopName;
    },
    getOrderRightsById() {
      const _this = this;
      const params = {
        id: this.$route.query.id
      };
      this.requestRights.getOrderRightsById(params).then((data) => {
        if (data) {
          _this.form.id = data.id;
          _this.form.channelType = data.channelType || 2;
          _this.form.step = 2;
          _this.form.rightBigType = data.rightBigType;
          _this.form.rightSmallType = data.rightSmallType;
          _this.form.shopSign = data.shopSign || 2;
          _this.form.giftType = data.giftType;

          _this.isMutex = data.exclusive == 1;
          if (data.exclusiveType != null && data.exclusiveType != '') {
            _this.mutexType = data.exclusiveType;
          }
          if (data.allowedRightNameList != null) {
            if (data.allowedRightNameList.indexOf(',')) {
              const tmpMutex = data.allowedRightNameList.split(',');
              const tmpMutexId = data.allowedRightIdList.split(',');
              _this.mutex = [];
              for (let i = 0; i < tmpMutex.length; i++) {
                const obj = {};
                obj.rightName = tmpMutex[i];
                obj.id = tmpMutexId[i];
                _this.mutex.push(obj);
              }
              _this.escapeMutexActivity = data.allowedRightNameList;
            } else {
              _this.mutex = [];
              const obj = {};
              obj.rightName = data.allowedRightNameList;
              obj.id = data.allowedRightIdList;
              _this.mutex.push(obj);
              _this.escapeMutexActivity = data.allowedRightNameList;
            }
          }

          if (data.rightSmallType == 1) {
            _this.title = '配置单品权益';
          } else if (data.rightSmallType == 2) {
            _this.title = '配置套购权益';
          }

          setTimeout(() => {
            const channelName = [];
            if (data.channelName) {
              _this.form.channelName = channelName.concat(data.channelName.split(','));
            }
            const arr = { a: 0 };
            for (const i in _this.channel) {
              arr.a += 1;
            }

            if (_this.form.channelName.length && _this.form.channelName.length == arr.a) {
              _this.allchannel = true;
            } else {
              _this.allchannel = false;
            }
          }, 200);
          if (data.shopSign == 2) {
            _this.shopName = data.shopName;
            let lstores = [];
            lstores = data.shopName ? data.shopName.split(',') : [];
            for (let c = 0; c < lstores.length; c++) {
              _this.stores.push({ shopName: lstores[c] });
            }
            _this.form.shopCode = data.shopCode;
          }
          if (data.shopSign == 1) {
            _this.shopName = '已批量上传';
            _this.scdisabled = false;
          }
          if (!data.shopSign) {
            _this.shopName = '';
            _this.form.shopName = '';
            _this.form.shopCode = '';
          }
          _this.form.rightBrandName = data.rightBrandName ? data.rightBrandName.split(',') : [];
          _this.categoryName = data.productCategoryName;

          _this.xiaoweiName = data.xiaoweiName;
          _this.xiaoweiAllName = data.xiaoweiName;

          if (data.xiaoweiName == '所有小微') {
            setTimeout(() => {
              _this.xiaowei = _this.areaList;
            }, 200);
            _this.xiaoweiBtn = false;
          } else {
            let xwname = [];
            xwname = data.xiaoweiName ? data.xiaoweiName.split(',') : [];
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
          if (data.xiaoweiName != null) {
            _this.disabled = false;
          }
          _this.form.xiaoweiId = data.xiaoweiId;

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
      if (this.xiaoweiName == '' || this.xiaoweiName == undefined) {
        this.$message({
          type: 'warning',
          message: '请选择活动小微'
        });
        return;
      }
      if (this.form.channelName.join(',') == '') {
        this.$message({
          type: 'warning',
          message: '请选择活动渠道!'
        });
        return;
      }
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
      data.exclusive = this.isMutex ? 1 : 0;
      // todo 此处为临时代码，业务要求而加，以后视需求再改
      if (this.form.giftType === 5 && data.exclusive === 0) {
        data.actShareType = [1];
      }
      const AllowedRightIdList = '';
      if (this.isMutex == true) {
        data.exclusiveType = this.mutexType;
        if (this.mutexType == 3) {
          const AllowedRightIdListArr = [];
          if (this.escapeMutexActivity == '所有活动') {
            data.allowedRightIdList = 'all';
            data.allowedRightNameList = '所有活动';
          } else if (this.mutex.length > 0) {
            for (let i = 0; i < this.mutex.length; i++) {
              AllowedRightIdListArr.push(this.mutex[i].id);
            }
            data.allowedRightIdList = AllowedRightIdListArr.join(',');
            data.allowedRightNameList = this.escapeMutexActivity;
          } else {
            this.$message({
              type: 'warning',
              message: '请选择共享活动'
            });
          }
        }
      }
      const _this = this;

      if (temporary == 'temporary') {
        this.requestRights.saveMomentOrderRights(data).then((data) => {
          self.saveing = false;
          if (data) {
            _this.$message({
              type: 'success',
              message: '暂存成功'
            });
          }
        });
      } else {
        this.requestRights.saveNextOrderRights(data).then((data) => {
          if (data) {
            // console.log(data)
            _this.$router.push({
              path: '/rights/rightsgift',
              query: { id: data }
            });
          }
        });
      }
    },
    prev() {
      const { id } = this.$route.query;
      this.$router.push({
        path: '/rights/rightsbaseinfo',
        query: {
          id,
          rightSmallType: this.form.rightSmallType
        }
      });
    },

    // 巨合添加互斥功能：

    pickerMutex() {
      this.beforeMutex = [];
      this.mutexDialog = true;
      this.gxMutex = true;
      // this.beforeMutex = this.mutex;
      let obj = {};
      for (let i = 0; i < this.mutex.length; i++) {
        obj = this.mutex[i];
        this.beforeMutex.push(obj);
      }
      this.beforeEscapeMutexActivity = this.escapeMutexActivity;
    },
    mutexDialogCloas() {
      this.mutexDialog = false;
      this.escapeMutexActivity = this.beforeEscapeMutexActivity;
      this.mutex = [];
      this.mutex = this.beforeMutex;
      this.gxMutex = false;
    },
    mutexSelect(item) {
      if (item.rightName == '所有活动') {
        this.mutex = [item];
        this.selectMutexShow = false;
      } else if (this.mutex.length > 0) {
        let notin = false;
        for (let a = 0; a < this.mutex.length; a++) {
          if (this.mutex[a].rightName == item.rightName) {
            notin = true;
            break;
          }
        }
        if (notin == false) {
          this.mutex.push(item);
        }
      } else {
        this.mutex.push(item);
      }
    },
    deleteMutex(name) {
      // deleteMutex
      let index = '';
      for (let c = 0; c < this.mutex.length; c++) {
        if (this.mutex[c].escapeMutexActivity == name) {
          index = c;
        }
      }
      this.mutex.splice(index, 1);

      if (this.mutex.length == 0) {
        this.selectMutexShow = true;
      }
    },
    listMutexInfo(queryString, cb) {
      const that = this;
      if (that.form.rightSmallType == 1) {
        axios
          .post(`${this.apiUrl}vipcenter/orderRights/listExclusiveRights`, {})
          .then(function (response) {
            // console.log(response)
            const tmpCb = response.data.data.entities;
            tmpCb.forEach((currentValue, index, arr) => {
              if (currentValue.chinaRegionFlag == 1) {
                currentValue.rightName = `${currentValue.rightName}-${currentValue.xiaoweiName}`;
              }
            }, this);
            cb(tmpCb);
            // console.log('mutex',that.mutex);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .post(`${this.apiUrl}vipcenter/orderRights/listCoupleExclusiveRights`, {})
          .then(function (response) {
            // console.log(response)
            const tmpCb = response.data.data.entities;
            tmpCb.forEach((currentValue, index, arr) => {
              if (currentValue.chinaRegionFlag == 1) {
                currentValue.rightName = `${currentValue.rightName}-${currentValue.xiaoweiName}`;
              }
            }, this);
            cb(tmpCb);
            // console.log('mutex',that.mutex);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    mutexQrSelect() {
      // console.log('mutex',this.mutex)
      const arr = [];
      for (let i = 0; i < this.mutex.length; i++) {
        arr.push(this.mutex[i].rightName);
      }

      if (arr.length > 1) {
        this.escapeMutexActivity = arr.join(',');
      } else if (arr.length == 1) {
        this.escapeMutexActivity = arr[0];
      } else {
        this.escapeMutexActivity = '';
      }
      this.beforeEscapeMutexActivity = this.escapeMutexActivity;
      this.mutexDialog = false;
      this.gxMutex = false;
    }
  },
  mounted() {
    this.getOrderRightsById();

    this.listArea();
    this.listIndustry();
  }
};
</script>
<style scoped lang="scss">
.men-but {
  margin-left: 25px;
  margin-top: 5px;
  width: 410px;
  display: flex;
  justify-content: space-between;
}

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
<style scoped>
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
