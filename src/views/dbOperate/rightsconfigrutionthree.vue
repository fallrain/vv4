<template>
  <div class="rightsconfigrutionthree" v-loading="loadingB">
    <div class="rights-config-header-box">
      <div class="rights-config-header">
        <div class="header-title">
          <span>{{ title }}</span>
        </div>
        <div class="rights-config-step" style="margin-left:35px">
          <div class="step-index">
            <span>1</span>
          </div>
          <div class="step-title">
            <span>选择发放场景</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step " style="margin-left:185px">
          <div class="step-index">
            <span>2</span>
          </div>
          <div class="step-title">
            <span>问卷配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step setted" style="margin-left:335px">
          <div class="step-index">
            <span>3</span>
          </div>
          <div class="step-title">
            <span>直销员和用户筛选</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:485px">
          <div class="step-index">
            <span>4</span>
          </div>
          <div class="step-title">
            <span>详情配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:635px">
          <div class="step-index">
            <span>5</span>
          </div>
          <div class="step-title">
            <span>奖励配置</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:785px">
          <div class="step-index">
            <span>6</span>
          </div>
          <div class="step-title">
            <span>配置成功</span>
          </div>
          <div class="step-bg"></div>
        </div>
      </div>
    </div>

    <div class="headertop" v-loading="loadingA">
      <div class="rule">
        <span>发放规则：</span>
        <el-radio-group v-model="rule" style="margin-top: -21px;">
          <div class="appoint"><el-radio :label="1">按直销员均分（余数随机发放）</el-radio></div>

          <div>
            <el-radio class="appoint" :label="2">指定直销员</el-radio>
            <el-button type="text" @click="handleClick_sellerGroup" class="choice-seller">选择直销员组</el-button>
            <span style="font-size: 14px;margin-left: 25px;">已选直销员组{{ sellerCount }}个</span>
          </div>

          <div>
            <el-radio class="appoint" :label="3">&nbsp;指定用户&nbsp;&nbsp;&nbsp;</el-radio>
            <el-button type="text" @click="selectUserStart" class="choice-user">选择用户组</el-button>
            <span style="font-size: 14px;margin-left: 25px;">已选直销员组{{ userCount }}个</span>
          </div>
        </el-radio-group>
      </div>

      <div class="xiaowei-x">
        小微配置：
        <el-button class="choice" @click="displayXiaoweiList" :disabled="BB">选择小微</el-button>
        <span style="margin-left: 25px;">已选小微{{ xwCount }}个，小微组{{ xwGroupCount }}个</span>
      </div>

      <div class="category">
        <div>经营产业：</div>
        <el-input
          style="width: 410px"
          :disabled="md"
          type="textarea"
          v-model="categoryName"
          @focus="pickerCategory"
        ></el-input>
      </div>

      <div class="channel">
        渠道配置：
        <el-checkbox-group v-model="selectChannel">
          <el-checkbox v-for="(item, index) in channel" :label="item" :disabled="BB">{{ item }}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="address">
        <div>地址：</div>
        <el-cascader
          style="margin-left: 3px;"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange"
          :disabled="BB"
          :change-on-select="true"
          :clearable="true"
        >
        </el-cascader>
      </div>

      <div class="store">
        <div>门店：</div>
        <el-input
          style="width: 410px"
          :disabled="md"
          type="textarea"
          v-model="shopName"
          @focus="pickerStores"
        ></el-input>
      </div>

      <div class="limit">
        发放限制：
        <el-checkbox v-model="amount" :disabled="CC"
          >用户消费金额 <el-input class="vip-input" v-model="minAmount" type="number" :disabled="CC"></el-input> ————
          <el-input class="vip-input" v-model="maxAmount" type="number" :disabled="CC"></el-input>
        </el-checkbox>

        <div style="display: flex;">
          <el-checkbox class="userlimit" v-model="goujixianzhi" :disabled="CC">用户购机限制： </el-checkbox>
          <div class="model-list">
            <el-autocomplete
              style="width: 464px;margin-top:3px;"
              placeholder="输入参加活动的产品型号"
              :fetch-suggestions="listProductInfo"
              @select="productSelect"
              v-model="productKeyWord"
              value-key="desc"
              :disabled="CC"
              :trigger-on-focus="false"
            >
            </el-autocomplete>
            <div class="stores-dialog productList">
              <p>已经选定的产品型号：</p>
              <div class="selected-stores product">
                <div v-for="product of productType" class="m-box">
                  <el-tooltip class="item" effect="light" :content="product" placement="top">
                    <div class="m-contbox">
                      <span>{{ product }}</span>
                      <i class="ico-del" @click="deleteproduct(product)"></i>
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <el-button type="primary" @click="getUserAndSeller" style="margin: 20px 27px 0;">计算本次权益的统计</el-button>

      <div class="bottom">
        <div class="bottom-text">
          本次权益预计发放
          <span style="font-size: 18px;margin: 0 5px;">{{ zxy }}</span>
          位直销员，共覆盖
          <span style="font-size: 18px;margin: 0 5px;">{{ users }}</span>
          名用户
        </div>
      </div>

      <div class="step-choose">
        <el-button type="primary" class="btm" @click="handleClickPrev">上一步</el-button>
        <el-button type="primary" class="but" @click="handleClickNext">下一步</el-button>
      </div>
    </div>

    <!-- 选择小微 -->
    <el-dialog
      class="xiaowei trs-dialog"
      :visible.sync="xuanzexiaowei"
      :modal-append-to-body="false"
      center
      :before-close="select_finish"
    >
      <div>
        <span style="font-size: 16px;font-weight: 550;">选择小微</span>
        <span style="text-align: center;margin-bottom: 5px;">*可将鼠标移至组名处查看筛选条件</span>
      </div>
      <div class="df-xiaowei-list">
        <div class="select-xiaowei-left">
          <span class="xw">小微</span>
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange" class="xw-checkAll">全选</el-checkbox>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" class="xiaowei-list">
            <el-checkbox v-for="(city, index) in cities" :label="index" :key="city.xwName" class="df-xiaowei">{{
              city.xwName
            }}</el-checkbox>
          </el-checkbox-group>
        </div>

        <div class="select-xiaowei-right">
          <span class="xw">小微组</span>
          <el-checkbox v-model="checkGroupAll" @change="handleGroupCheckAllChange" class="xw-checkAll"
            >全选</el-checkbox
          >
          <el-checkbox-group v-model="checkedGroups" @change="handleCheckedGroupChange" class="xiaowei-list">
            <el-checkbox v-for="(group, index) in groups" :label="index" :key="group.xwGroupName" class="df-xiaowei">
              <span :title="group.filter">{{ group.xwGroupName }}</span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>

      <div class="creat-xiaoweiGroup">
        <el-checkbox v-model="checkNewGroup">同时将全部所选加入新组</el-checkbox>
        <el-input placeholder="新小微组" v-model="newGroupName" ref="creatNewGroup"></el-input>
      </div>
      <el-button type="primary" class="newGroup-submit" @click="select_finish">完成</el-button>
    </el-dialog>

    <!-- 添加权益活动门店： -->
    <el-dialog
      class="stores-dialog trs-dialog"
      :visible.sync="storesDialog"
      :before-close="storesSelect"
      :modal-append-to-body="false"
    >
      <div class="xiaowei-dialog-header">
        <p>添加权益活动门店：</p>
        <el-autocomplete
          v-if="selectStoreShow"
          :fetch-suggestions="listShopInfo"
          placeholder="输入门店名称添加"
          @select="storeSelect"
          :props="{ value: 'shopName', label: 'shopName' }"
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

    <!-- 选择用户组 -->
    <el-dialog class="xiaowei-dialog trs-dialog" :visible.sync="select_user" center :modal-append-to-body="false">
      <div class="xiaowei-dialog-header">
        <p>
          选择用户组：<el-checkbox v-model="checkAllUsers" @change="handleCheckAllUsers" class="xw-checkAll"
            >全选</el-checkbox
          >
        </p>
        <el-checkbox-group v-model="checkUserList" @change="handleCheckUsers">
          <el-checkbox v-for="(user, index) of userList" :label="index" :key="user.id">
            <span :title="user.filter">{{ user.userGroupName }}</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="text-align: center;padding-top: 15px;">将鼠标移至组名处查看筛选条件</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="remanageUser" style="width:90px;">重新管理</el-button>
        <el-button type="primary" @click="selectUserFinish" style="width:90px;">确认选择</el-button>
      </div>
    </el-dialog>

    <!-- 选择直销员群组 -->
    <el-dialog
      class="xiaowei-dialog trs-dialog"
      :visible.sync="select_sellerGroup"
      center
      :modal-append-to-body="false"
    >
      <div class="xiaowei-dialog-header">
        <p>
          选择直销员组：<el-checkbox v-model="checkAllSellers" @change="handleCheckAllSellers" class="xw-checkAll"
            >全选</el-checkbox
          >
        </p>
        <el-checkbox-group v-model="checkList" @change="handleCheckSellers">
          <el-checkbox v-for="(group, index) of sellerGroup" :label="index" :key="group.id">
            <span :title="group.filter">{{ group.sellerGroupName }}</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div style="text-align: center;padding-top: 15px;">将鼠标移至组名处查看筛选条件</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="remanageSeller" style="width:90px;">重新管理</el-button>
        <el-button type="primary" @click="selectSellerGroup_finish" style="width:90px;">确认选择 </el-button>
      </div>
    </el-dialog>

    <!-- 选择经营产业 -->
    <el-dialog
      class="xiaowei-dialog trs-dialog"
      :visible.sync="categoryDialog"
      :modal-append-to-body="false"
      :before-close="categorySelect"
    >
      <div class="xiaowei-dialog-header">
        <p>
          添加产品类别：<el-checkbox v-model="checkAllCategory" @change="categoryCheckAll" class="xw-checkAll"
            >全选</el-checkbox
          >
        </p>
        <el-checkbox-group v-model="category" @change="checkCategory">
          <el-checkbox v-for="(value, key, index) in industryList" :label="key">{{ key }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="categorySelect" style="width:95px;">确认选择 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Qs from 'qs';
import { mapGetters } from 'vuex';
import axios from 'axios';
import gUtils from '../../utils/gUtils.js';
import data from '../../json/cities.js';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    }),
    xwCount() {
      return this.checkedCities.length;
    },
    xwGroupCount() {
      return this.checkedGroups.length;
    },
    sellerCount() {
      return this.checkList.length;
    },
    userCount() {
      return this.checkUserList.length;
    }
  },
  data() {
    return {
      title: '一站式调研配置',
      rule: 1, // 发放规则
      BB: false, // 是否禁用小微选择，渠道选择
      selectChannel: [], // 选择的渠道名称
      channel: [], // 所有渠道列表
      md: false, // 门店输入框是否可用
      shopName: '', // 选择的门店名称
      amount: '', // 是否选择发限制
      CC: false, // 是否禁用发放限制
      minAmount: '', // 最小金额
      maxAmount: '', // 最大金额
      goujixianzhi: '', // 是否选择用户购机限制
      buyLimit: '', // 限制的购机型号
      zxy: '???', // 筛选出来的直销员数量
      users: '???', // 筛选出来的用户数量
      xuanzexiaowei: false, // 小微弹框是否显示
      checkAll: false, // 是否全选小微
      checkedCities: [], // 选择的小微在使用小微的索引index
      cities: [], // 所有小微
      checkGroupAll: false, // 是否全选小微组
      checkedGroups: [], // 选择的小微组在使用小微组的索引index
      groups: [], // 所有小微组
      checkNewGroup: false, // 选择新建小微组
      newGroupName: '', // 新建小微组的组名
      newGroupId: 0, // 新建小微组的id
      select_user: false, // 是否显示用户弹框
      checkUserList: [], // 选择的用户的index
      userList: [], // 用户列表
      checkAllUsers: false, // 选择所有的用户
      select_sellerGroup: false, // 是否显示直销员组弹框
      checkList: [], // 选择的直销员组
      sellerGroup: [], // 所有的直销员组
      checkAllSellers: false, // 选择所有的直销员组
      loadingB: false, // 加载中
      storesDialog: false, // 门店选择弹层
      selectStoreShow: true,
      stores: [],
      allXwfromXwGroup: [], // 所有选择的小微组下的小微
      xwFromNewGroup: [], // 获取新建小微组下的小微
      categoryName: '', // 选择的产业名称
      categoryDialog: false, // 是否显示产业
      checkAllCategory: false, // 是否全选产业
      category: [], // 选择的产业
      industryList: [], // 所有产业
      loadingA: false, // 加载中
      productName: '', // 产品型号
      productType: [], // 产品型号
      productKeyWord: '', // 产品型号搜索关键字
      selectedOptions: [], // 选择的地址
      options: [], // 所有的地址
      province: '', // 省份
      city: '', // 城市
      district: '' // 县区
    };
  },
  methods: {
    getXiaoWeiGroupList() {
      // 获取所有小微组
      const _this = this;
      axios({
        url: `${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwGroupAll`,
        method: 'post'
      })
        .then((response) => {
          if (response.data.isSuccess) {
            _this.groups = response.data.data;
            _this.groups.forEach((e) => {
              if (e.filter == null) {
                e.filter = '暂无信息！';
              } else {
                e.filter = e.filter.replace(/#/g, '\n');
              }
            });
            _this.groupOptions = _this.groups;
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
    getXiaoWeiList() {
      // 获取所有小微
      const _this = this;
      axios({
        url: `${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwAll`,
        method: 'post'
      }).then((response) => {
        if (response.data.isSuccess) {
          _this.cities = response.data.data;
          _this.cityOptions = response.data.data;
        } else {
          _this.$message({
            type: 'warning',
            message: response.data.msg
          });
        }
      });
    },
    getDirectSeller() {
      // 获取所有直销员组
      const _this = this;
      axios({
        url: `${this.apiUrl}vipcenter/sellerGroupr/querySellerGroupAll`,
        method: 'post'
      })
        .then((response) => {
          if (response.data.isSuccess) {
            _this.sellerGroup = response.data.data;
            _this.sellerGroup.forEach((e) => {
              if (e.filter == null) {
                e.filter = '暂无信息!';
              } else {
                e.filter = e.filter.replace(/#/g, '\n');
              }
            });
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
    getUserGroup() {
      // 获取所有的用户组
      const _this = this;
      axios
        .post(`${this.apiUrl}vipcenter/userGroup/listUserGroupUsing`)
        .then((response) => {
          if (response.data.isSuccess) {
            _this.userList = response.data.data;
            _this.userList.forEach((e) => {
              if (e.filter == null) {
                e.filter = '暂无信息!';
              } else {
                e.filter = e.filter.replace(/#/g, '\n');
              }
            });
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
    handleClick_sellerGroup() {
      // 点击选择直销员
      if (this.rule == 2) {
        this.getDirectSeller();
        this.select_sellerGroup = true;
        this.select_user = false;
      } else {
        this.$message('请选择指定直销员！');
      }
    },
    selectUserStart() {
      // 点击选择用户组
      if (this.rule == 3) {
        this.getUserGroup();
        this.select_user = true;
        this.select_sellerGroup = false;
      } else {
        this.$message('请选择指定用户！');
      }
    },
    displayXiaoweiList() {
      // 点击选择小微
      this.getXiaoWeiGroupList();
      this.getXiaoWeiList();
      this.xuanzexiaowei = true;
    },
    pickerStores() {
      // 点击选择门店
      if (
        (this.checkedCities.length <= 0 || !this.checkedCities)
        && (this.checkedGroups.length <= 0 || !this.checkedGroups)
      ) {
        this.$message({
          type: 'warning',
          message: '请选择小微和渠道!'
        });
        return false;
      }
      if (this.selectChannel.join(',') == '') {
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
    getUserAndSeller() {
      // 获取筛选的直销员和用户数
      const channel = this.selectChannel.join(',');
      const _this = this;
      let sendLimit = [];
      let zxGroup = [];
      let userGroup = [];
      let categoryName = '';

      if (this.amount) {
        sendLimit.push('1');
        if (this.minAmount || this.maxAmount) {
          if (parseInt(this.minAmount) > parseInt(this.maxAmount)) {
            this.$message({
              type: 'warning',
              message: '请输入正确的金额范围！'
            });
            return;
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请输入用户消费金额'
          });
          return;
        }
      } else {
        this.minAmount = null;
        this.maxAmount = null;
      }

      let buyLimit = [];
      if (this.goujixianzhi) {
        sendLimit.push('2');
        if (this.productName && this.productName.length > 0) {
          buyLimit = this.productName;
        } else {
          this.$message({
            type: 'warning',
            message: '请输入用户购机限制'
          });
          return;
        }
      } else {
        buyLimit = null;
      }
      sendLimit = sendLimit.join(',');

      this.checkList.forEach((e) => {
        e = _this.sellerGroup[e];
        zxGroup.push(e.id);
      });
      zxGroup = zxGroup.join(',');

      this.checkUserList.forEach((e) => {
        e = _this.userList[e];
        userGroup.push(e.id);
      });
      userGroup = userGroup.join(',');

      let xiaoweiId = '';
      let xwGroupIds = '';
      if (this.checkNewGroup) {
        xiaoweiId = null;
        xwGroupIds = this.newGroupId.toString();
      } else {
        xiaoweiId = this.getxwIdsByIndex(this.checkedCities);
        xwGroupIds = this.getxwGroupIdsByIndex(this.checkedGroups);
        if (xiaoweiId == null) {
          xiaoweiId = null;
        } else if (xiaoweiId.length == this.cities.length) {
          xiaoweiId = 'all';
        } else {
          xiaoweiId = xiaoweiId.join(',');
        }
        if (xwGroupIds == null) {
          xwGroupIds = null;
        } else {
          xwGroupIds = xwGroupIds.join(',');
        }
      }

      this.loadingB = true;
      if (this.rule == 1) {
        if (channel.length < 1 || channel == null) {
          this.$message({
            type: 'warning',
            message: '请选择门店！'
          });
          this.loadingB = false;
          return;
        }
        if (this.categoryName == '所有产业') {
          categoryName = 'all';
        } else if (this.category.length > 0) {
          categoryName = this.categoryName;
        } else {
          this.loadingB = false;
          this.$message({
            type: 'warning',
            message: '请选择产业！'
          });
          return;
        }

        return axios({
          url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/getSellersAndUserCount`,
          method: 'post',
          transformRequest: [
            function (data) {
              // 对 data 进行任意转换处理
              return Qs.stringify(data);
            }
          ],
          // headers: {
          //   'deviceCode': 'A95ZEF1-47B5-AC90BF3'
          // },
          data: {
            xiaoweiId,
            channel,
            shopCode: this.shopCode,
            xwGroupIds,
            productCategoryName: categoryName,
            province: this.province,
            city: this.city,
            district: this.district,
            sendLimit, // 发放限制
            max: this.maxAmount, // 消费金额上限
            min: this.minAmount, // 消费金额下限
            userOrderLimit: buyLimit // 用户购机限制
          }
        })
          .then((data) => {
            if (data.data.isSuccess) {
              _this.loadingB = false;
              _this.zxy = data.data.data.sellersCount;
              _this.users = data.data.data.userCount;
            } else {
              _this.loadingB = false;
              _this.$message({
                type: 'error',
                message: data.data.msg
              });
            }
          })
          .catch((error) => {
            _this.loadingB = false;
            console.log(error);
          });
      } if (this.rule == 2) {
        if (zxGroup.length < 1 || zxGroup == null) {
          this.$message({
            type: 'warning',
            message: '请选择直销员！'
          });
          this.loadingB = false;
          return;
        }
        return axios({
          url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/getSellerAndUserSumBySellerGroup`,
          method: 'post',
          transformRequest: [
            function (data) {
              return Qs.stringify(data);
            }
          ],
          // headers: {
          //   'deviceCode': 'A95ZEF1-47B5-AC90BF3'
          // },
          data: {
            sellerGroup: zxGroup, // 直销员组id
            sendLimit, // 发放限制
            max: this.maxAmount, // 消费金额上限
            min: this.minAmount, // 消费金额下限
            userOrderLimit: buyLimit // 用户购机限制
          }
        })
          .then((data) => {
            if (data.data.isSuccess) {
              _this.loadingB = false;
              _this.zxy = data.data.data.sellersCount;
              _this.users = data.data.data.userCount;
            } else {
              _this.loadingB = false;
              _this.$message({
                type: 'error',
                message: data.data.msg
              });
            }
          })
          .catch((error) => {
            _this.loadingB = false;
            console.log(error);
          });
      } if (this.rule == 3) {
        if (userGroup.length < 1 || userGroup == null) {
          this.$message({
            type: 'warning',
            message: '请选择用户！'
          });
          this.loadingB = false;
          return;
        }
        return axios({
          url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/getSellerAndUserSumByUserGroup`,
          method: 'post',
          transformRequest: [
            function (data) {
              // 对 data 进行任意转换处理
              return Qs.stringify(data);
            }
          ],
          // headers: {
          //   'deviceCode': 'A95ZEF1-47B5-AC90BF3'
          // },
          data: {
            userGroup
          }
        })
          .then((data) => {
            if (data.data.isSuccess) {
              _this.loadingB = false;
              _this.zxy = data.data.data.sellersCount;
              _this.users = data.data.data.userCount;
            } else {
              _this.loadingB = false;
              _this.$message({
                type: 'error',
                message: data.data.msg
              });
            }
          })
          .catch((error) => {
            _this.loadingB = false;
            console.log(error);
          });
      }
    },
    handleClickPrev() {
      // 返回上一步
      if (this.categoryName == '所有产业' && this.category) {
        this.categoryName = this.category.join(',');
      }
      const ppap = {
        cities: this.cities, // 所有小微
        checkAll: this.checkAll, // 是否全选小微
        checkedCities: this.checkedCities, // 选择的小微
        groups: this.groups, // 所有小微组
        checkGroupAll: this.checkGroupAll, // 是否全选小微组
        checkedGroups: this.checkedGroups, // 选择的小微组
        checkNewGroup: this.checkNewGroup, // 是否新建小微组
        newGroupName: this.newGroupName, // 新建小微组名称
        selectChannel: this.selectChannel, // 选择的渠道
        shopName: this.shopName, // 选择的门店
        rule: this.rule, // 发放规则
        checkList: this.checkList, // 选择的直销员组
        checkAllSellers: this.checkAllSellers, // 是否全选直销员组
        checkUserList: this.checkUserList, // 选择的用户组
        checkAllUsers: this.checkAllUsers, // 是否全选用户组
        userList: this.userList, // 用户组
        amount: this.amount, // 发放规则1
        minAmount: this.minAmount, // 最小额度
        maxAmount: this.maxAmount, // 最大额度
        goujixianzhi: this.goujixianzhi, // 发放规则2
        buyLimit: this.buyLimit, // 购机限制
        stores: this.stores, // 选择的门店
        sellerGroup: this.sellerGroup, // 直销员组
        sellersCount: this.zxy, // 筛选的直销员数量
        shopCode: this.shopCode, // 门店id
        shopName: this.shopName, // 门店名称
        userCount: this.users, // 筛选的用户数量
        checkAllCategory: this.checkAllCategory, // 是否全选产业
        // "category": this.category,//选择的产业
        categoryName: this.categoryName, // 选择的产业名称
        productName: this.productName, // 选择的产品型号
        province: this.province, // 省份
        city: this.city, // 城市
        district: this.district // 县区
      };
      const storage = window.localStorage;
      const storageObj = ppap;
      const storageThree = JSON.stringify(storageObj);
      storage.setItem('storageThree', storageThree);
      this.$router.push({ path: '/dbOperate/rightsconfigrutiontwo' });
      // this.$router.go(-1);
    },
    updateStepThree() {
      // 跟新数据
      const _this = this;
      let channel = ''; // 渠道
      let sendLimit = []; // 发放限制

      // 渠道配置
      if (this.selectChannel.length == 7) {
        channel = 'all';
      } else {
        channel = this.selectChannel.join(',');
      }

      if (this.amount) {
        sendLimit.push('1');
        if (this.minAmount || this.maxAmount) {
          if (parseInt(this.minAmount) > parseInt(this.maxAmount)) {
            this.$message({
              type: 'warning',
              message: '请输入正确的金额范围！'
            });
            return;
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请输入用户消费金额'
          });
          return;
        }
      } else {
        this.minAmount = null;
        this.maxAmount = null;
      }

      let buyLimit = [];
      if (this.goujixianzhi) {
        sendLimit.push('2');
        if (this.productName && this.productName.length > 0) {
          buyLimit = this.productName;
        } else {
          this.$message({
            type: 'warning',
            message: '请输入用户购机限制'
          });
          return;
        }
      } else {
        buyLimit = null;
      }
      sendLimit = sendLimit.join(',');

      let xiaoweiId = '';
      let xwGroupIds = '';
      if (this.checkNewGroup) {
        xiaoweiId = null;
        xwGroupIds = this.newGroupId.toString();
      } else {
        xiaoweiId = this.getxwIdsByIndex(this.checkedCities);
        xwGroupIds = this.getxwGroupIdsByIndex(this.checkedGroups);
        if (xiaoweiId == null) {
          xiaoweiId = null;
        } else if (xiaoweiId.length == this.cities.length) {
          xiaoweiId = 'all';
        } else {
          xiaoweiId = xiaoweiId.join(',');
        }
        if (xwGroupIds == null) {
          xwGroupIds = null;
        } else {
          xwGroupIds = xwGroupIds.join(',');
        }
      }

      // 发放规则
      let sellerGroup = '';
      let userGroup = [];
      let categoryName = '';
      if (this.rule == 1) {
        // 门店
        if (this.shopName.length < 1) {
          this.$message({
            type: 'warning',
            message: '请选择门店'
          });
          return;
        }
        if (this.categoryName == '所有产业') {
          categoryName = 'all';
        } else if (this.category.length > 0) {
          categoryName = this.categoryName;
        } else {
          this.$message({
            type: 'warning',
            message: '请选择产业！'
          });
          return;
        }
        sellerGroup = null;
        userGroup = null;
      }
      if (this.rule == 2) {
        if (this.checkList.length >= 1) {
          for (let i = 0; i < this.checkList.length; i++) {
            let abc = this.checkList[i];
            abc = this.sellerGroup[abc];
            sellerGroup = `${sellerGroup},${abc.id}`;
          }
          sellerGroup = sellerGroup.substr(1);
          xiaoweiId = null;
          xwGroupIds = null;
          channel = null;
          this.shopCode = null;
          this.shopName = null;
          userGroup = null;
          this.category = null;
          this.province = null;
          this.city = null;
          this.district = null;
        } else {
          this.$message({
            type: 'warning',
            message: '请选择直销员'
          });
          return;
        }
      }
      if (this.rule == 3) {
        if (this.checkUserList.length > 0) {
          this.checkUserList.forEach((e) => {
            e = _this.userList[e];
            userGroup.push(e.id);
          });
          userGroup = userGroup.join(',');
          xiaoweiId = null;
          xwGroupIds = null;
          channel = null;
          this.shopCode = null;
          this.shopName = null;
          sendLimit = null;
          this.maxAmount = null;
          this.minAmount = null;
          buyLimit = null;
          sellerGroup = null;
          this.category = null;
          this.province = null;
          this.city = null;
          this.district = null;
        } else {
          this.$message({
            type: 'warning',
            message: '请选择用户'
          });
          return;
        }
      }

      if (this.zxy == 0) {
        this.$message({
          type: 'warning',
          message: '请选择直销员！'
        });
        return;
      }

      if (this.users == 0) {
        this.$message({
          type: 'warning',
          message: '请选择用户！'
        });
        return;
      }
      _this.loadingA = true;
      const params = {
        channel, // 渠道名称
        id: parseInt(_this.id), // 问卷id
        ruleType: _this.rule, // 发放规则
        sellerGroup, // 直销员组id
        sendLimit, // 发放限制
        shopCode: _this.shopCode, // 门店id
        shopName: _this.shopName, // 门店名称
        userComsumptionMax: _this.maxAmount, // 消费金额上限
        userComsumptionMin: _this.minAmount, // 消费金额下限
        userGroup, // 用户组id
        userOrderLimit: buyLimit, // 用户购机限制
        xiaoweiId, // 小微id
        xwGroupIds, // 小微组id
        productCategoryName: categoryName, // 产业
        province: this.province, // 省份
        city: this.city, // 城市
        district: this.district // 县区
      };
      axios
        .post(`${_this.apiUrl}vipcenter/oneStopQuestionnaireConfig/updateOneStopStepThree`, params)
        .then((data) => {
          if (data.data.code == '0') {
            if (_this.categoryName == '所有产业' && _this.category) {
              _this.categoryName = _this.category.join(',');
            }
            const ppap = {
              cities: _this.cities, // 所有小微
              checkAll: _this.checkAll, // 是否全选小微
              checkedCities: _this.checkedCities, // 选择的小微
              groups: _this.groups, // 所有小微组
              checkGroupAll: _this.checkGroupAll, // 是否全选小微组
              checkedGroups: _this.checkedGroups, // 选择的小微组
              checkNewGroup: _this.checkNewGroup, // 是否新建小微组
              newGroupName: _this.newGroupName, // 新建小微组名称
              selectChannel: _this.selectChannel, // 选择的渠道
              shopName: _this.shopName, // 选择的门店
              rule: _this.rule, // 发放规则
              checkList: _this.checkList, // 选择的直销员组
              checkAllSellers: _this.checkAllSellers, // 是否全选直销员
              checkUserList: _this.checkUserList, // 选择的用户组
              userList: _this.userList, // 用户组
              checkAllUsers: _this.checkAllUsers, // 是否全选用户组
              amount: _this.amount, // 发放规则1
              minAmount: _this.minAmount, // 最小额度
              maxAmount: _this.maxAmount, // 最大额度
              goujixianzhi: _this.goujixianzhi, // 发放规则2
              buyLimit, // 购机限制
              stores: _this.stores, // 选择的门店
              sellerGroup: _this.sellerGroup, // 直销员组
              sellersCount: _this.zxy, // 筛选的直销员数
              shopCode: _this.shopCode, // 选择的门店id
              shopName: _this.shopName, // 选择的门店名称
              userCount: _this.users, // 筛选的用户数
              // "category" : _this.category,//选择的产业
              checkAllCategory: _this.checkAllCategory, // 是否全选产业
              categoryName: _this.categoryName, // 选择的产业名
              productName: _this.productName, // 选择的产品型号
              province: _this.province, // 省份
              city: _this.city, // 城市
              district: _this.district // 县区
            };
            const storage = window.localStorage;
            const storageObj = ppap;
            const storageThree = JSON.stringify(storageObj);
            storage.setItem('storageThree', storageThree);
            _this.loadingA = false;
            _this.$router.push({ path: '/dbOperate/rightsconfigrutionfour', query: { id: _this.id } });
          } else {
            _this.$message({
              type: 'error',
              message: data.data.msg
            });
            _this.loadingA = false;
            // 礼品数比直销员小,无法均分,请增加礼品!
          }
        })
        .catch((errror) => {
          _this.loadingA = false;
          console.log(error);
        });
    },
    handleClickNext() {
      // 进入下一步
      this.getUserAndSeller().then(this.updateStepThree);
    },
    handleCheckAllChange() {
      // 选择所有小微
      if (this.checkedCities.length != this.cities.length) {
        const arr = [];
        for (let i = 0; i < this.cityOptions.length; i++) {
          arr.push(i);
        }
        this.checkedCities = arr;
      } else {
        this.checkedCities = [];
      }
    },
    handleCheckedCitiesChange(value) {
      // 选择小微
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
    },
    handleCheckAllUsers() {
      // 选择所有用户
      if (this.checkUserList.length != this.userList.length) {
        const arr = [];
        for (let i = 0; i < this.userList.length; i++) {
          arr.push(i);
        }
        this.checkUserList = arr;
      } else {
        this.checkUserList = [];
      }
    },
    handleCheckUsers(value) {
      // 选择用户
      const checkedCount = value.length;
      this.checkAllUsers = checkedCount === this.userList.length;
    },
    handleGroupCheckAllChange() {
      // 选择所有小微组
      if (this.checkedGroups.length != this.groups.length) {
        const arr = [];
        for (let i = 0; i < this.groupOptions.length; i++) {
          arr.push(i);
        }
        this.checkedGroups = arr;
      } else {
        this.checkedGroups = [];
      }
    },
    handleCheckedGroupChange(value) {
      // 选择小微组
      const checkedCounts = value.length;
      this.checkGroupAll = checkedCounts === this.groups.length;
    },
    handleCheckAllSellers() {
      // 选择所有直销员组
      if (this.checkList.length != this.sellerGroup.length) {
        const arr = [];
        for (let i = 0; i < this.sellerGroup.length; i++) {
          arr.push(i);
        }
        this.checkList = arr;
      } else {
        this.checkList = [];
      }
    },
    handleCheckSellers(value) {
      // 选择直销员组
      const checkedCounts = value.length;
      this.checkAllSellers = checkedCounts === this.sellerGroup.length;
    },
    select_finish() {
      // 小微选择完成
      const _this = this;
      const checkedXwIds = this.getxwIdsByIndex(this.checkedCities); // 没问题
      const checkedXwGroupIds = this.getxwGroupIdsByIndex(this.checkedGroups); // 没问题
      const param = {
        xwIds: checkedXwIds,
        xwGroupIds: checkedXwGroupIds,
        xwGroupName: this.newGroupName
      };
      if (this.checkedGroups.length > 0) {
        const groupIds = this.getxwGroupIdsByIndex(this.checkedGroups);
        this.getSelectedXwGroupIds(groupIds);
      }
      if (this.checkedCities.length > 0 || this.checkedGroups.length > 0) {
        if (this.checkNewGroup) {
          // 新建小微组
          if (this.newGroupName.length < 1 || this.newGroupName == null) {
            this.$message({
              type: 'warning',
              message: '请输入新建的小微组名！'
            });
            return;
          }
          axios
            .post(`${this.apiUrl}vipcenter/xiaoWeiGroup/addXwGroupByxwIdsAndxwGroupIds`, param)
            .then((response) => {
              if (response.data.isSuccess) {
                _this.xuanzexiaowei = false;
                _this.$message({
                  type: 'success',
                  message: response.data.msg
                });
                _this.newGroupId = response.data.data;
                _this.getXwFromNewGroup([_this.newGroupId]);
              } else {
                _this.xuanzexiaowei = false;
                _this.$message({
                  type: 'error',
                  message: response.data.msg
                });
              }
            })
            .catch((error) => {
              _this.xuanzexiaowei = false;
              console.log(error);
            });
        } else {
          _this.xuanzexiaowei = false;
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请选择小微或小微组'
        });
        _this.xuanzexiaowei = false;
      }
    },
    getxwIdsByIndex(index) {
      // 根据小微的索引index获取小微id
      const _this = this;
      if (index.length < 1 || index == null) {
        return null;
      }
      const checkedXwIds = [];
      index.forEach((e) => {
        checkedXwIds.push(_this.cities[e].xwId);
      });
      return checkedXwIds;
    },
    getxwGroupIdsByIndex(index) {
      // 根据小微组的索引index获取小微组id
      const _this = this;
      if (index.length < 1 || index == null) {
        return null;
      }
      const checkedXwGroupIds = [];
      index.forEach((e) => {
        checkedXwGroupIds.push(_this.groups[e].id);
      });
      return checkedXwGroupIds;
    },
    getChannelById() {
      // 获取所有渠道
      const _this = this;
      axios({
        url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/listChannelById`,
        method: 'post',
        transformRequest: [
          function (data) {
            return Qs.stringify(data);
          }
        ],
        data: { id: 2 }
      })
        .then((response) => {
          if (response.data.isSuccess) {
            _this.channel = response.data.data;
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
    selectUserFinish() {
      // 完成用户的选择
      this.select_user = false;
    },
    selectSellerGroup_finish() {
      // 完成直销员组的选择
      this.select_sellerGroup = false;
    },
    listShopInfo(queryString, cb) {
      // 获取门店列表
      const _this = this;
      if (this.selectChannel.length <= 0) {
        this.$message('请选择渠道！');
        return;
      }
      const allXwIds = [];
      if (this.checkNewGroup) {
        this.xwFromNewGroup.forEach((e) => {
          allXwIds.push(e.xwId);
        });
      } else {
        const xw = this.allXwfromXwGroup;
        if (xw.length > 0) {
          xw.forEach((e) => {
            allXwIds.push(e.xwId);
          });
        }
        if (this.checkedCities.length > 0) {
          this.checkedCities.forEach((e) => {
            if (allXwIds.indexOf(_this.cities[e].xwId) >= 0) {
              // alert();
            } else {
              allXwIds.push(_this.cities[e].xwId);
            }
          });
        }
      }
      let str = '';
      if (allXwIds.length == 42) {
        str = 'all';
      } else {
        str = allXwIds.join(',');
      }
      axios({
        url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/listShopInfo`,
        method: 'post',
        transformRequest: [
          function (data) {
            return Qs.stringify(data);
          }
        ],
        data: {
          xwId: str,
          channelName: this.selectChannel.join(','),
          shopName: ' '
        }
      })
        .then((response) => {
          if (response.data.isSuccess) {
            if (response.data.data.entities) {
              cb(response.data.data.entities);
            } else {
              cb([]);
            }
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
      // 删除已选门店
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
    storesSelect() {
      // 点击选择门店
      const shopName = [];
      const shopCode = [];
      for (let i = 0; i < this.stores.length; i++) {
        shopName.push(this.stores[i].shopName);
        shopCode.push(this.stores[i].shopCode);
      }
      this.shopCode = shopCode.join(',');
      this.shopName = shopName.join(',');
      this.storesDialog = false;
      this.md = false;
    },
    getSelectedXwGroupIds(xwGroupIds) {
      // 获取所选小微组的小微
      const _this = this;
      this.allXwfromXwGroup = [];
      axios
        .post(`${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwByGroupIds`, {
          xwGroupIds
        })
        .then((response) => {
          if (response.data.isSuccess) {
            _this.allXwfromXwGroup = response.data.data;
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
    getXwFromNewGroup(newGroupIds) {
      // 获取新建的小微组下的所有小微
      const _this = this;
      this.xwFromNewGroup = [];
      axios
        .post(`${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwByGroupIds`, {
          xwGroupIds: newGroupIds
        })
        .then((response) => {
          if (response.data.isSuccess) {
            _this.xwFromNewGroup = response.data.data;
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
    pickerCategory() {
      // 点击选择经营产业
      this.listIndustry();
      this.categoryDialog = true;
    },
    listIndustry() {
      // 获取所有经营产业
      const _this = this;
      axios
        .post(`${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/listSellersProduct`)
        .then((response) => {
          if (response.data.isSuccess) {
            _this.industryList = response.data.data;
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
    categoryCheckAll() {
      // 全选产业
      let industryCount = 0;
      for (const key in this.industryList) {
        industryCount++;
      }
      if (!this.category.length || this.category.length != industryCount) {
        const arr = [];
        for (const key in this.industryList) {
          arr.push(key);
        }
        this.category = arr;
      } else {
        this.category = [];
      }
    },
    checkCategory(value) {
      // 选择产业
      const checkedCounts = value.length;
      let industryCount = 0;
      for (const key in this.industryList) {
        industryCount++;
      }
      this.checkAllCategory = checkedCounts === industryCount;
    },
    categorySelect() {
      // 完成选择产业
      let categoryCount = 0;
      for (const key in this.industryList) {
        categoryCount++;
      }
      if (this.category) {
        if (this.category.length != categoryCount) {
          this.categoryName = this.category.join(',');
        } else {
          this.categoryName = '所有产业';
        }
      } else {
        this.categoryName = '';
        this.category = [];
      }
      this.categoryDialog = false;
    },
    remanageSeller() {
      // 重新管理直销员组
      if (this.categoryName == '所有产业' && this.category) {
        this.categoryName = this.category.join(',');
      }
      const ppap = {
        cities: this.cities, // 所有小微
        checkAll: this.checkAll, // 是否全选小微
        checkedCities: this.checkedCities, // 选择的小微
        groups: this.groups, // 所有小微组
        checkGroupAll: this.checkGroupAll, // 是否全选小微组
        checkedGroups: this.checkedGroups, // 选择的小微组
        checkNewGroup: this.checkNewGroup, // 是否新建小微组
        newGroupName: this.newGroupName, // 新建小微组名称
        selectChannel: this.selectChannel, // 选择的渠道
        shopName: this.shopName, // 选择的门店
        rule: this.rule, // 发放规则
        checkList: this.checkList, // 选择的直销员组
        checkAllSellers: this.checkAllSellers, // 是否全选直销员组
        checkUserList: this.checkUserList, // 选择的用户组
        checkAllUsers: this.checkAllUsers, // 是否全选用户组
        userList: this.userList, // 用户组
        amount: this.amount, // 发放规则1
        minAmount: this.minAmount, // 最小额度
        maxAmount: this.maxAmount, // 最大额度
        goujixianzhi: this.goujixianzhi, // 发放规则2
        buyLimit: this.buyLimit, // 购机限制
        stores: this.stores, // 选择的门店
        sellerGroup: this.sellerGroup, // 直销员组
        sellersCount: this.zxy, // 筛选的直销员数量
        shopCode: this.shopCode, // 门店id
        shopName: this.shopName, // 门店名称
        userCount: this.users, // 筛选的用户数量
        checkAllCategory: this.checkAllCategory, // 是否全选产业
        // "category": this.category,//选择的产业
        categoryName: this.categoryName, // 选择的产业名称
        productName: this.productName, // 选择的产品型号
        province: this.province, // 省份
        city: this.city, // 城市
        district: this.district // 县区
      };
      const storage = window.localStorage;
      const storageObj = ppap;
      const storageThree = JSON.stringify(storageObj);
      storage.setItem('storageThree', storageThree);
      this.$router.push({ path: '/dbOperate/sellerGroupManage', query: { id: this.id, onestepThree: 1 } });
    },
    remanageUser() {
      // 重新管理用户组
      if (this.categoryName == '所有产业' && this.category) {
        this.categoryName = this.category.join(',');
      }
      const ppap = {
        cities: this.cities, // 所有小微
        checkAll: this.checkAll, // 是否全选小微
        checkedCities: this.checkedCities, // 选择的小微
        groups: this.groups, // 所有小微组
        checkGroupAll: this.checkGroupAll, // 是否全选小微组
        checkedGroups: this.checkedGroups, // 选择的小微组
        checkNewGroup: this.checkNewGroup, // 是否新建小微组
        newGroupName: this.newGroupName, // 新建小微组名称
        selectChannel: this.selectChannel, // 选择的渠道
        shopName: this.shopName, // 选择的门店
        rule: this.rule, // 发放规则
        checkList: this.checkList, // 选择的直销员组
        checkAllSellers: this.checkAllSellers, // 是否全选直销员组
        checkUserList: this.checkUserList, // 选择的用户组
        checkAllUsers: this.checkAllUsers, // 是否全选用户组
        userList: this.userList, // 用户组
        amount: this.amount, // 发放规则1
        minAmount: this.minAmount, // 最小额度
        maxAmount: this.maxAmount, // 最大额度
        goujixianzhi: this.goujixianzhi, // 发放规则2
        buyLimit: this.buyLimit, // 购机限制
        stores: this.stores, // 选择的门店
        sellerGroup: this.sellerGroup, // 直销员组
        sellersCount: this.zxy, // 筛选的直销员数量
        shopCode: this.shopCode, // 门店id
        shopName: this.shopName, // 门店名称
        userCount: this.users, // 筛选的用户数量
        checkAllCategory: this.checkAllCategory, // 是否全选产业
        // "category": this.category,//选择的产业
        categoryName: this.categoryName, // 选择的产业名称
        productName: this.productName, // 选择的产品型号
        province: this.province, // 省份
        city: this.city, // 城市
        district: this.district // 县区
      };
      const storage = window.localStorage;
      const storageObj = ppap;
      const storageThree = JSON.stringify(storageObj);
      storage.setItem('storageThree', storageThree);
      this.$router.push({ path: '/dbOperate/userGroupManage', query: { id: this.id, onestepThree: 1 } });
    },
    listProductInfo(queryString, cb) {
      // 搜索型号
      const _this = this;
      axios({
        url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/listProductInfo`,
        method: 'post',
        transformRequest: [
          function (data) {
            return Qs.stringify(data);
          }
        ],
        data: {
          brandName: 'haier,casarte,tongshuai',
          code: 'all',
          productName: queryString
        }
      })
        .then((response) => {
          if (response.data.isSuccess) {
            if (response.data.data.entities) {
              for (let i = 0; i < response.data.data.entities.length; i++) {
                response.data.data.entities[i].desc =
                  // data.entities[i].pro_band +
                  // " | " +
                  // data.entities[i].mmt_department +
                  // " | " +
                  response.data.data.entities[i].mmt_material_descrition;
              }
              cb(response.data.data.entities);
            } else {
              cb([]);
            }
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
    productSelect(item) {
      // 点击选择型号
      // this.productType.push(item.desc);
      if (this.productType && this.productType.length > 0) {
        let noting = false;
        for (let a = 0; a < this.productType.length; a++) {
          if (this.productType[a] == item.desc) {
            noting = true;
            break;
          }
        }
        if (noting == false) {
          this.productType.push(item.desc);
        }
      } else {
        this.productType.push(item.desc);
      }
      this.productName = this.productType.join(',');
      this.productKeyWord = '';
    },
    deleteproduct(productName) {
      // 删除已选的型号
      const index = this.productType.indexOf(productName);
      this.productType.splice(index, 1);
      this.productName = this.productType.join(',');
    },
    handleChange(value) {
      // 选择地址
      this.province = value[0];
      this.city = value[1];
      this.district = value[2];
    }
  },
  mounted() {
    this.getChannelById();
    this.listIndustry();
    this.getXiaoWeiGroupList();
    this.getXiaoWeiList();
    this.getDirectSeller();
    this.getUserGroup();
    const storage = window.localStorage;
    if (storage.storageThree) {
      let { storageThree } = storage;
      storageThree = JSON.parse(storageThree);
      this.zxy = storageThree.sellersCount;
      this.shopCode = storageThree.shopCode;
      this.shopName = storageThree.shopName;
      this.users = storageThree.userCount;
      this.cities = storageThree.cities; // 所有小微
      this.checkAll = storageThree.checkAll; // 是否全选小微
      this.checkedCities = storageThree.checkedCities; // 选择的小微userList
      this.userList = storageThree.userList; // 选择的用户
      this.checkAllUsers = storageThree.checkAllUsers; // 选择的用户
      this.checkUserList = storageThree.checkUserList; // 用户
      this.groups = storageThree.groups; // 所有的小微组
      this.checkGroupAll = storageThree.checkGroupAll; // 是否全选小微组
      this.checkedGroups = storageThree.checkedGroups; // 选择的小微组
      this.checkNewGroup = storageThree.checkNewGroup; // 是否新建小微组
      this.newGroupName = storageThree.newGroupName; // 新建小微组名称
      this.selectChannel = storageThree.selectChannel; // 选择的渠道
      this.shopName = storageThree.shopName; // 选择的门店
      this.rule = storageThree.rule; // 发放规则
      this.checkList = storageThree.checkList; // 选择的直销员组
      this.amount = storageThree.amount; // 发放规则1
      this.minAmount = storageThree.minAmount; // 最小额度
      this.maxAmount = storageThree.maxAmount; // 最大额度
      this.goujixianzhi = storageThree.goujixianzhi; // 发放规则2
      this.buyLimit = storageThree.buyLimit; // 购机限制
      this.stores = storageThree.stores; // 选择的门店
      this.sellerGroup = storageThree.sellerGroup; // 直销员组
      this.checkAllSellers = storageThree.checkAllSellers; // 全选直销员组
      this.checkAllCategory = storageThree.checkAllCategory; // 全选产业
      // this.category = storageThree.category;//选择产业
      if (storageThree.categoryName && storageThree.categoryName != '') {
        this.category = storageThree.categoryName.split(',');
        this.categoryName = storageThree.categoryName; // 选择产业名
      } else {
        this.category = [];
        this.categoryName = '';
      }
      this.productName = storageThree.productName; // 选择的产品型号
      if (this.productName && this.productName.length > 0) {
        this.productType = this.productName.split(',');
      } else {
        this.productType = [];
      }
      this.province = storageThree.province; // 省份
      this.city = storageThree.city; // 城市
      this.district = storageThree.district; // 县区
      this.selectedOptions = [];
      this.selectedOptions.push(this.province, this.city, this.district);
    }
  },
  watch: {
    minAmount() {
      if (this.minAmount > 0 || this.maxAmount > 0) {
        this.amount = true;
      } else {
        this.amount = false;
      }
    },
    maxAmount() {
      if (this.minAmount > 0 || this.maxAmount > 0) {
        this.amount = true;
      } else {
        this.amount = false;
      }
    },
    rule() {
      if (this.rule == 2) {
        this.BB = true;
        this.md = true;
        this.CC = false;
      } else if (this.rule == 3) {
        this.BB = true;
        this.md = true;
        this.CC = true;
        this.goujixianzhi = false;
        this.amount = false;
        this.productName = null;
      } else {
        this.BB = false;
        this.md = false;
        this.CC = false;
      }
    },
    checkAllCategory() {
      if (this.checkAllCategory) {
        this.categoryName = '所有产业';
      }
    },
    productName() {
      if (this.productName && this.productName.length > 0) {
        this.goujixianzhi = true;
      } else {
        this.goujixianzhi = false;
      }
    }
  },
  created() {
    this.id = this.$route.query.id;
    const address = data[0];
    for (let i = 0; i < address.China.length; i++) {
      this.options[i] = {};
      this.options[i].label = address.China[i];
      this.options[i].value = this.options[i].label;
      const a = address.China[i];
      if (address[a]) {
        this.options[i].children = [];
        for (let j = 0; j < address[a].length; j++) {
          const b = this.options[i].children;
          b[j] = {};
          b[j].label = address[a][j];
          b[j].value = b[j].label;
          const c = address[a][j];
          if (address[c]) {
            b[j].children = [];
            for (let n = 0; n < address[c].length; n++) {
              const d = b[j].children;
              d[n] = {};
              d[n].label = address[c][n];
              d[n].value = d[n].label;
            }
          }
        }
      }
    }
  }
};
</script>

<style scoped>
/*.xiaowei .el-dialog*/
.rightsconfigrutionthree {
  padding: 20px;
}
.header {
  margin-top: 30px;
}
.headertop {
  margin-left: 50px;
}
.vip-input {
  width: 180px;
  margin-left: 20px;
  margin-right: 20px;
}
.vipinput {
  width: 320px;
  margin-left: 3px;
}
.bottom {
  height: 30px;
  margin: 20px 0 20px 95px;
}
.bottom-text {
  /*padding-top: 30px;*/
  margin-bottom: 10px;
}
.btm {
  width: 150px;
  margin-bottom: 20px;
}
.but {
  width: 150px;
  background: #409eff;
  color: white;
  margin-bottom: 20px;
}
.day {
  padding-top: 20px;
}
.total {
  padding-top: 20px;
  margin-left: 16px;
}
.xiaowei-x {
  padding-top: 20px;
  margin-left: 16px;
}
.channel {
  display: flex;
  padding-top: 20px;
  margin-left: 16px;
}
.grant {
  padding-top: 20px;
  margin-left: 18px;
}
.rule {
  display: flex;
  padding-top: 20px;
  margin-left: 16px;
}
.store {
  padding-top: 20px;
  margin-left: 44px;
}
.store .el-textarea {
  margin-top: -20px;
  margin-left: 45px;
  min-height: 48px;
}
.address {
  padding-top: 20px;
  margin-left: 44px;
  display: flex;
}
.address .el-cascader {
  width: 350px;
}
.category {
  padding-top: 20px;
  margin-left: 16px;
}
.category .el-textarea {
  margin-top: -20px;
  margin-left: 73px;
  min-height: 48px;
}
.appoint {
  margin-left: 75px;
  margin-top: 20px;
}
.choice {
  padding: 5px;
  width: 80px;
  color: white;
  font-size: 10px;
  background: #409eff;
}
.choice-seller {
  margin-left: 8px;
  padding: 5px;
  width: 85px;
  color: white;
  font-size: 10px;
  background: #409eff;
}
.choice-user {
  margin-left: 6px;
  padding: 5px;
  width: 78px;
  color: white;
  font-size: 10px;
  background: #409eff;
}
.limit {
  padding-top: 20px;
  margin-left: 16px;
}
.productList {
  margin: 10px 0 0 -108px;
}
.product {
  margin-left: 160px;
  margin-top: -20px !important;
  border: 1px dotted #ccc;
  width: 411px;
  padding: 10px 12px;
}
.time-length {
  margin-left: 75px;
}
.time-son {
  margin-left: 150px;
}
.userlimit {
  margin-left: 75px;
  margin-top: 10px;
}
.el-dialog--small {
  width: 30%;
}
.step-choose {
  width: 100%;
  text-align: center;
}
.select-xiaowei {
  font-size: 20px;
  color: #208adb;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.xw {
  font-size: 16px;
  font-weight: 500;
}
.xw-checkAll {
  float: right;
}
.select-xiaowei-left {
  width: 48%;
  margin-top: 10px;
  padding-right: 5px;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
}
.xiaowei-list {
  /*margin-left: 10px;*/
  height: 285px;
  width: 100%;
  overflow-y: scroll;
}
.df-xiaowei {
  margin-left: 15px;
  padding-right: 10px;
  width: 90%;
  box-sizing: border-box;
}
.select-xiaowei-right {
  width: 48%;
  margin-top: 10px;
  padding-left: 15px;
  border-left: 1px solid #ccc;
  box-sizing: border-box;
}
.df-xiaowei-list {
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  display: flex;
}
.creat-xiaoweiGroup {
  display: flex;
  padding: 10px 0;
}
.creat-xiaoweiGroup label {
  height: 36px;
  line-height: 36px;
  margin-right: 15px;
}
.newGroup-submit {
  margin: 0 0 0 50%;
  transform: translate(-50%, 0);
}
.select_sellerGroup {
  width: 210px;
  padding: 15px 25px;
  border: 1px solid #8e8c8c;
  position: absolute;
  top: 515px;
  left: 162px;
  background-color: #fff;
  z-index: 6666666;
}
.select_userGroup {
  width: 210px;
  padding: 15px 25px;
  border: 1px solid #8e8c8c;
  position: absolute;
  top: 566px;
  left: 162px;
  background-color: #fff;
  z-index: 6666666;
}
.select_sellerGroup_head {
  padding: 10px 0;
}
/*.el-checkbox+ .el-checkbox{
      margin: 0;
    }*/
.sellerGroup .el-checkbox {
  margin: 7px 0 0 25px;
}
.sellerGroup {
  padding: 15px 0;
  box-shadow: 1px 0px 1px 2px #ccc;
  width: 230px;
  overflow: hidden;
}
.select_sellerGroup_finish {
  margin: 10px 50% 0;
  transform: translate(-50%, 0);
}
.hide-scroll {
  width: 178px;
  height: 255px;
  overflow: hidden;
}
.channel .el-checkbox {
  margin: 0 5px 0 3px;
}
.appoint {
  margin-left: 5px !important;
}
.required .el-form-item__label:before {
  content: '*';
  color: #ff4949;
  margin-right: 4px;
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
.trs-btn {
  margin-left: 159px;
}
.sellerGroup .el-checkbox {
  display: flex;
  line-height: 18px;
}
.filterCondition {
  width: 200px;
  word-break: break-all;
  white-space: normal;
}
.rightsconfigrutionthree .rights-config-header-box {
  margin-bottom: 30px;
}
.rightsconfigrutionthree .rights-config-step .step-title {
  width: 123px;
  background: #e2e2e2;
  z-index: 1;
  margin-top: 6px;
  color: #252525;
  margin-left: 8px;
}
.rightsconfigrutionthree .rights-config-step .step-index {
  width: 30px;
  background: #cecece;
  font-size: 12px;
  color: #252525;
  font-weight: bold;
  z-index: 2;
  text-align: center;
  line-height: 30px;
}
.rightsconfigrutionthree .rights-config-header {
  transform: skewX(-45deg);
  background: #e0f0ff;
  /*width: 1000px;*/
  width: 1133px;
  /*margin-left: -45px;*/
}
.rightsconfigrutionthree .rights-config-header .step-bg {
  width: 74px;
  margin-top: 16px;
  background: #fff;
  margin-left: 65px;
}
.rightsconfigrutionthree .vip-head-tool {
  margin-top: 30px;
}
.rightsconfigrutionthree .rights-config-step .step-title span {
  transform: skewX(45deg);
  font-size: 10px;
  display: block;
  line-height: 30px;
  text-align: center;
  padding-left: 20px;
}
.rightsconfigrutionthree .rights-config-step.setted .step-index {
  background: #196acf;
  color: #fff;
}
.rightsconfigrutionthree .rights-config-step.setted .step-title {
  background: #45a0f8;
  color: #fff;
  margin-left: 10px;
  width: 123px;
}
.rightsconfigrutionthree .rights-config-step .step-index span {
  font-size: 12px;
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
.model-list {
  width: 464px;
  margin-left: 9px;
  position: relative;
}
.model-list .gift-item {
  width: 480px;
  padding-right: 10px;
  margin-top: 5px;
  min-height: 20px;
}
.model-list .gift-item > div {
  position: relative;
  width: 464px;
  padding: 10px 16px;
  background: #f5f5f5;
  margin: 10px 0;
}
.model-list .gift-item .ico-del {
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: -5px;
  top: -5px;
  background: url('../../assets/images/ico-del.png') no-repeat;
  background-size: 100% 100%;
}
</style>
<style>
.rightsconfigrutionthree .xiaowei .el-dialog--small {
  width: 470px;
}
.rightsconfigrutionthree .directSeller .el-dialog--small {
  width: 270px;
}
.rightsconfigrutionthree .user_dialog .el-dialog--small {
  width: 270px;
}
.rightsconfigrutionthree .sellerGroup .el-checkbox__label {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rightsconfigrutionthree .el-button {
  border: 1px solid #20a0ff !important;
}
.rightsconfigrutionthree .el-button:hover {
  background: #4db3ff !important;
  border-color: #4db3ff !important;
  color: #fff !important;
}
.rightsconfigrutionthree .xiaowei-dialog .el-dialog {
  width: 240px;
}
.rightsconfigrutionthree .xiaowei-dialog .el-checkbox-group {
  height: 206px;
  overflow: auto;
}
.rightsconfigrutionthree .xiaowei-dialog .el-checkbox {
  display: block;
  margin-left: 0;
}
.rightsconfigrutionthree .xiaowei-dialog .el-dialog__body {
  margin-top: -30px;
  padding-bottom: 10px;
}
.rightsconfigrutionthree .xiaowei-dialog .xiaowei-dialog-header > p {
  margin-bottom: 12px;
  font-weight: bold;
}
.rightsconfigrutionthree .model-list .xiaowei-dialog-header > p {
  margin-bottom: 12px;
  font-weight: bold;
}
.rightsconfigrutionthree .address .el-cascader .el-input__inner {
  width: 350px !important;
}
</style>
