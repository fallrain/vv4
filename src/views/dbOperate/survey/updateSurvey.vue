<template>
    <div class="newSurvey" v-loading="loadingB">


        <div class="vip-head-tool">
          <p class="template-brand">
              <i></i>实物调研基本配置
          </p>
          <div class="clear"></div>
        </div>


        <div class="directSeller" v-loading="loadingC">

            <h2 class="directSeller-title">直销员配置</h2>


            <div class="rule grant">
              <div>发放规则：</div>
              <el-radio-group v-model="rule" style="margin-top: -40px;">
                <div class="appoint"><el-radio :label="1">按直销员均分（余数随机发放）</el-radio></div>

                <div>
                  <el-radio class="appoint" :label="2">指定直销员</el-radio>
                  <el-button type="text" @click="handleClick_sellerGroup" class="choice-seller" plain>选择直销员组</el-button>
                  <span style="font-size: 14px;margin-left: 25px;">已选直销员组{{sellerCount}}个</span>
                </div>


                <div>
                  <el-radio class="appoint" :label="3">&nbsp;指定用户&nbsp;&nbsp;&nbsp;</el-radio>
                  <el-button type="text" @click="selectUserStart" class="choice-user" plain>选择用户组</el-button>
                  <span style="font-size: 14px;margin-left: 25px;">已选直销员组{{userCount}}个</span>
                </div>
              </el-radio-group>
            </div>


            <div class="xiaowei-x grant">小微配置：
              <el-button plain class="choice" @click="displayXiaoweiList" :disabled="BB">选择小微</el-button>
              <span style="margin-left: 25px;">已选小微{{xwCount}}个，小微组{{xwGroupCount}}个</span>
            </div>

            <div class="category">
              <div>经营产业：</div>
              <el-input style="width: 410px" :disabled="md"  type="textarea" v-model="categoryName" @focus="pickerCategory"></el-input>
            </div>

            <div class="channel">渠道配置：
              <el-checkbox-group v-model="selectChannel">
                <el-checkbox v-for="(item, index) in channel" :label="item" :disabled="BB">{{item}}</el-checkbox>
              </el-checkbox-group>
            </div>

            <div class="address">
              <div>地址：</div>
              <el-cascader
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
                :disabled="BB"
                :change-on-select='true'
                :clearable='true'>
              </el-cascader>
            </div>

            <div class="store">
              <div>门店：</div>
              <el-input style="width: 410px" :disabled="md"  type="textarea" v-model="shopName" @focus="pickerStores"></el-input>
            </div>


            <div class="limit">发放限制：
              <el-checkbox v-model="amount" :disabled="CC">用户消费金额
                <el-input class="vip-input" v-model="minAmount" type="number" :disabled="CC"></el-input> ———— <el-input class="vip-input" v-model="maxAmount" type="number" :disabled="CC"></el-input>
              </el-checkbox>

              <div style="display: flex;">
                <el-checkbox class="userlimit" v-model="goujixianzhi" :disabled="CC">用户购机限制：
                </el-checkbox>
                <div class="model-list">
                  <el-autocomplete style="width: 464px;margin-top:3px;" placeholder="输入参加活动的产品型号"
                                   v-model="productKeyWord"
                                   :fetch-suggestions="listProductInfo"
                                   @select="productSelect"
                                   value-key="desc"
                                   :disabled="CC"
                                   :trigger-on-focus="false">
                  </el-autocomplete>
                  <div class="stores-dialog productList">
                    <p>已经选定的产品型号：</p>
                    <div class="selected-stores product">
                        <div v-for="product of productType" class="m-box">
                            <el-tooltip class="item" effect="light" :content="product" placement="top">
                                <div class="m-contbox">
                                    <span>{{product}}</span>
                                    <i class="ico-del" @click="deleteproduct(product)"></i>
                                </div>
                            </el-tooltip>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <el-button type="primary" style="margin: 20px 0 0 20px;" @click="getUserAndSeller">计算此次直销员和用户的数量</el-button>

            <div class="bottom">
              <div class="bottom-text">本次权益预计发放
              <span style="font-size: 18px;margin: 0 5px;">{{zxy}}</span>
              位直销员，共覆盖
              <span style="font-size: 18px;margin: 0 5px;">{{users}}</span>
              名用户</div>
            </div>

            <hr />


            <div>
                <h2 class="directSeller-title">奖励配置</h2>

                <div class="margin-left">奖励方式：
                  <el-radio style="margin-left: 10px;" v-model="surveyOrActivity" :label=0>每份问卷</el-radio>
                  <el-radio v-model="surveyOrActivity" :label=1>每个调查活动</el-radio>
                </div>

                <div class="margin-left">奖励设置：
                    <el-radio class="integralReward" v-model="wards" :label=1 :disabled=true>海贝奖励</el-radio>
                    <el-input class="radioinput" :disabled="ba" style="margin-left: 18px" v-model="jifen" type="Number"></el-input>海贝
                    <div class="cash">
                        <el-radio v-model="wards" :label=2>现金奖励</el-radio>
                        <el-input class="radioinput cash-count" :disabled="bb" style="margin-left: 28px" type="Number" v-model="xianjin"></el-input>元
                    </div>
                    <div class="gift">
                        <el-radio v-model="wards" :label=0 :disabled=true>实物礼品奖励</el-radio>
                        <el-input :disabled="bc" placeholder="输入实物描述" v-model="description" style="width:300px;"></el-input>
                    </div>
                </div>
                <div class="ward-count margin-left">本次奖励配置需要：
                  <span style="font-size: 18px;margin: 0 5px;">{{integralBudget}}</span>
                  海贝预算</div>
            </div>

            <div>
                <div class="giftConfiguration">
                    <h2 class="directSeller-title">实体礼品列表 (礼品数必须是直销员数的整数倍)</h2>
                    <el-button type="primary" class="addGift" @click="giftSelect">添加礼品</el-button>
                </div>
                <el-table class="cares-table" :data="giftId" style="width: 100%;margin-top: 15px;text-align: center;" >
                    <el-table-column prop="giftId" label="编号" width="70" style="padding-left: 10px;">
                    </el-table-column>
                    <el-table-column label="礼品图片">
                      <template slot-scope="scope">
                          <img :src="scope.row.imgUrl" style="width:60px;height:80px;padding: 10px 0;" @click="imgDescription(scope.row)" title="点击查看详情">
                      </template>
                    </el-table-column>
                    <el-table-column prop="giftName" label="礼品名称、型号">
                    </el-table-column>
                    <el-table-column prop="price" label="礼品单价(元)">
                    </el-table-column>
                    <el-table-column prop="giftTotal" label="数量" width="100">
                    </el-table-column>
                    <el-table-column prop="giftPrice" label="海贝单价(积分)">
                    </el-table-column>
                    <el-table-column prop="budget" label="海贝总预算">
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button type="primary" @click="deleteClick(scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="margin-auto">本次礼品配置需要
            <span style="font-size: 18px;margin: 0 5px;">{{giftAmountSum}}</span>
            海贝预算　　＋　　直销员奖励
            <span style="font-size: 18px;margin: 0 5px;">{{integralBudget}}</span>
            海贝预算</div>
            <div class="margin-auto">共需
            <span style="font-size: 18px;margin: 0 5px;">{{allAcount}}</span>
            海贝预算   当前允许预算为
            <span style="font-size: 18px;margin: 0 5px;">{{remain}}海贝</span>
            </div>
            <div class="margin-auto">
                <el-button type="primary" @click="prev">上一步</el-button>
                <el-button type="primary" @click="update">提交</el-button>
            </div>
        </div>


        <!-- 活动门店 -->
        <el-dialog
          class="stores-dialog trs-dialog"
          :visible.sync="storesDialog"
          :before-close="storesSelect"
          :modal-append-to-body="false">
          <div class="xiaowei-dialog-header">
              <p>添加权益活动门店：</p>
              <el-autocomplete
                v-if="selectStoreShow" :fetch-suggestions="listShopInfo" placeholder="输入门店名称" @select="storeSelect"
                               :props="{'value':'shopName','label':'shopName'}" value-key="shopName" style="width:407px">
              </el-autocomplete>
              <a href="javascript:;" class="select-all-shop" @click="storeSelect({'shopName':'所有门店','shopCode':'all'})">选择所有门店</a>
              <p>已经选定的门店：</p>
              <div class="selected-stores">
                  <div v-for="store in stores" class="m-box">
                      <el-tooltip class="item" effect="light" :content="store.shopName" placement="top">
                          <div class="m-contbox">
                              <span>{{store.shopName}}</span>
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


        <!-- 实物礼品 -->
        <el-dialog
            title="选择实物礼品"
            :visible.sync="dialogVisible"
            :modal-append-to-body='false'
            style="width: 100%;padding-right: 10%;"
            :before-close="successClick"
            class="min-width trs-dialog">
              <div class="shaixuan" style="height: 36px;line-height: 36px;">
                <el-input  class="gift-input" placeholder="最低价" v-model="startPrice"></el-input>
                ——
                <el-input class="gift-input" placeholder="最高价" v-model="endPrice"></el-input>
                元
                <el-input class="gift-input" placeholder="礼品关键字" v-model="keyWords"></el-input>
                <el-button type="primary" @click="shaixuanClick" style="height: 36px;">筛选</el-button>
                <el-button type="primary" @click="successClick" style="height: 36px;">完成</el-button>
                已选了<span style="font-size: 20px;color:gray;margin: 0 10px;">{{giftNumberSum}}</span>件
              </div>
              <div class="addgift-body" v-loading="loadingA">
                <div class="addgift-info" v-for="(item,index) in sites" :key="index" >
                  <img class="addgift-img" :src="item.photoLink" />
                  <div class="info">
                    <div class="info-title">{{item.productName}}</div>
                    <div class="info-body">{{item.needScore}}海贝</div>
                    <div class="info-money">库存{{item.amount}}件</div>
                  </div>
                  <div style="position: absolute;bottom: 10px;right:0;">
                    <el-input v-model="item.count" class="giftNumInput" type="Number"></el-input>
                    <button @click="sendThisGift(item)" class="sendThis">送这个</button>
                  </div>
                </div>
              </div>
        </el-dialog>


        <!-- 选择用户组 -->
        <el-dialog
          class="xiaowei-dialog trs-dialog"
          :visible.sync="select_user"
          center
          :modal-append-to-body="false"
          >
            <div class="xiaowei-dialog-header">
                <p>选择用户组：<el-checkbox v-model="checkAllUsers" @change="handleCheckAllUsers" class="xw-checkAll">全选</el-checkbox></p>
                <el-checkbox-group v-model="checkUserList" @change="handleCheckUsers">
                  <el-checkbox v-for="(user,index) of userList" :label="index" :key="user.id">
                    <span :title="user.filter">{{user.userGroupName}}</span>
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
                <p>选择直销员组：<el-checkbox v-model="checkAllSellers" @change="handleCheckAllSellers" class="xw-checkAll">全选</el-checkbox></p>
                <el-checkbox-group v-model="checkList" @change="handleCheckSellers">
                  <el-checkbox v-for="(group,index) of sellerGroup" :label="index" :key="group.id">
                    <span :title="group.filter">{{group.sellerGroupName}}</span>
                  </el-checkbox>
                </el-checkbox-group>
            </div>
            <div style="text-align: center;padding-top: 15px;">将鼠标移至组名处查看筛选条件</div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="remanageSeller" style="width:90px;">重新管理</el-button>
                <el-button type="primary" @click="selectSellerGroup_finish" style="width:90px;">确认选择 </el-button>
            </div>
        </el-dialog>


        <!-- 选择小微 -->
        <el-dialog
          class="xiaowei trs-dialog"
          :visible.sync="xuanzexiaowei"
          :modal-append-to-body=false
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
                    <el-checkbox v-for="(city,index) in cities" :label="index" :key="city.xwName" class="df-xiaowei">{{city.xwName}}</el-checkbox>
                  </el-checkbox-group>
              </div>

              <div class="select-xiaowei-right">
                <span class="xw">小微组</span>
                <el-checkbox v-model="checkGroupAll" @change="handleGroupCheckAllChange" class="xw-checkAll">全选</el-checkbox>
                <el-checkbox-group v-model="checkedGroups" @change="handleCheckedGroupChange" class="xiaowei-list">
                  <el-checkbox v-for="(group,index) in groups" :label="index" :key="group.xwGroupName" class="df-xiaowei">
                    <span :title="group.filter">{{group.xwGroupName}}</span>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>


            <div class="creat-xiaoweiGroup">
              <el-checkbox v-model="checkNewGroup">同时将全部所选加入新组</el-checkbox>
              <el-input placeholder="新小微组" v-model="newGroupName" ref="creatNewGroup""></el-input>
            </div>
            <el-button type="primary" class="newGroup-submit" @click="select_finish">完成</el-button>
        </el-dialog>


        <!-- 选择经营产业 -->
        <el-dialog
          class="xiaowei-dialog trs-dialog"
          :visible.sync="categoryDialog"
          :modal-append-to-body="false"
          :before-close = "categorySelect"
          >
            <div class="xiaowei-dialog-header">
                <p>添加产品类别：<el-checkbox v-model="checkAllCategory" @change="categoryCheckAll" class="xw-checkAll">全选</el-checkbox></p>
                <el-checkbox-group v-model="category" @change="checkCategory">
                    <el-checkbox v-for="(value, key, index) in industryList" :label="key">{{key}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="categorySelect" style="width:194px;">确认选择 </el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import axios from 'axios';
import Qs from 'qs';
import data from '../../../json/cities.js';

export default {
  name: 'newSurvey',
  data() {
    return {
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
      select_sellerGroup: false, // 是否显示直销员组弹框
      checkList: [], // 选择的直销员组
      sellerGroup: [], // 所有的直销员组
      loadingB: false, // 加载中
      storesDialog: false, // 门店选择弹层
      selectStoreShow: true,
      stores: [],
      allXwfromXwGroup: [], // 所有选择的小微组下的小微
      xwFromNewGroup: [], // 获取新建小微组下的小微
      rightsGrantModelId: 0, // 调研id
      id: 0, // 问卷id
      surveyOrActivity: 0, // 奖励方式
      directSellers: -1, // 直销员配置选择
      flag1: false, // 直销员按键是否可用
      flag2: false, // 直销员星级、小微配置、渠道配置、门店是否可用
      wards: 1, // 奖励设置
      ba: true, // 海贝奖励是否可选
      bb: false, // 现金奖励是否可选
      bc: true, // 实物礼品奖励是否可选
      jifen: '', // 是否选择海贝奖励
      xianjin: '', // 海贝奖励预算
      dialogVisible: false,
      startPrice: '', // 礼品搜索的下限
      endPrice: '', // 礼品搜索的上限
      keyWords: '', // 礼品搜索的关键字
      sites: [], // 搜索出来的礼品单
      giftId: [], // 选择的礼品单
      temp2: [], // 选择的小微组下的小微id
      description: '', // 实物奖励描述
      remain: '???', // 剩余可用积分
      giftAmountSum: 0, // 礼品单积分总和
      giftNumberSum: 0, // 礼品总数量
      loadingA: false, // 礼品加载中
      checkAllUsers: false, // 选择所有的用户
      checkAllSellers: false, // 选择所有的直销员组
      categoryName: '', // 选择的产业名称
      categoryDialog: false, // 是否显示产业
      checkAllCategory: false, // 是否全选产业
      category: [], // 选择的产业
      industryList: [], // 所有产业
      productName: '', // 产品型号
      productType: [], // 产品型号
      productKeyWord: '', // 产品型号搜索关键字
      selectedOptions: [], // 选择的地址
      selectedOptions: [], // 选择的地址
      options: [], // 所有的地址
      province: '', // 省份
      city: '', // 城市
      district: '', // 县区
      loadingC: false, // 加载中
    };
  },
  computed: {
    integralBudget() {
      if (this.surveyOrActivity == 0) { // 每份问卷
        return this.giftNumberSum * this.xianjin * 100;
      }
      if (this.surveyOrActivity == 1) { // 每个活动
        return this.xianjin * this.zxy * 100;
      }
    },
    allAcount() {
      return this.integralBudget + this.giftAmountSum;
    },
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
    },
  },
  methods: {
    getXiaoWeiGroupList() { // 获取所有小微组
      const _this = this;
      axios({
        url: `${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwGroupAll`,
        method: 'post'
      }).then((response) => {
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
      }).catch((error) => {
        console.log(error);
      });
    },
    getXiaoWeiList() { // 获取所有小微
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
    getDirectSeller() { // 获取所有直销员组
      const _this = this;
      axios({
        url: `${this.apiUrl}vipcenter/sellerGroupr/querySellerGroupAll`,
        method: 'post'
      }).then((response) => {
        if (response.data.isSuccess) {
          _this.sellerGroup = response.data.data;
          _this.sellerGroup.forEach((e) => {
            if (e.filter == null) {
              e.filter = '暂无信息！';
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
      }).catch((error) => {
        console.log(error);
      });
    },
    getUserGroup() { // 获取所有的用户组
      const _this = this;
      axios.post(`${this.apiUrl}vipcenter/userGroup/listUserGroupUsing`).then((response) => {
        if (response.data.isSuccess) {
          _this.userList = response.data.data;
          _this.userList.forEach((e) => {
            if (e.filter == null) {
              e.filter = '暂无信息！';
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
      }).catch((error) => { console.log(error); });
    },
    handleClick_sellerGroup() { // 点击选择直销员
      if (this.rule == 2) {
        this.getDirectSeller();
        this.select_sellerGroup = true;
        this.select_user = false;
      } else {
        this.$message('请选择指定直销员！');
      }
    },
    selectUserStart() { // 点击选择用户组
      if (this.rule == 3) {
        this.getUserGroup();
        this.select_user = true;
        this.select_sellerGroup = false;
      } else {
        this.$message('请选择指定用户！');
      }
    },
    displayXiaoweiList() { // 点击选择小微
      this.getXiaoWeiGroupList();
      this.getXiaoWeiList();
      this.xuanzexiaowei = true;
    },
    pickerStores() { // 点击选择门店
      if ((this.checkedCities.length <= 0 || !this.checkedCities) && (this.checkedGroups.length <= 0 || !this.checkedGroups)) {
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
    getUserAndSeller() { // 获取筛选的直销员和用户数
      const channel = this.selectChannel.join(',');
      const _this = this;
      let sendLimit = [];

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

      let zxGroup = [];
      this.checkList.forEach((e) => {
        e = _this.sellerGroup[e];
        zxGroup.push(e.id);
      });
      zxGroup = zxGroup.join(',');

      let userGroup = [];
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
      let categoryName = '';
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
          this.$message({
            type: 'warning',
            message: '请选择产业！'
          });
          thi.loadingB = false;
          return;
        }
        return axios({
          url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/getSellersAndUserCount`,
          method: 'post',
          transformRequest: [function (data) {
            // 对 data 进行任意转换处理
            return Qs.stringify(data);
          }],
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
            userOrderLimit: buyLimit, // 用户购机限制
          }
        }).then((data) => {
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
        }).catch((error) => {
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
          transformRequest: [function (data) {
            return Qs.stringify(data);
          }],
          // headers: {
          //   'deviceCode': 'A95ZEF1-47B5-AC90BF3'
          // },
          data: {
            sellerGroup: zxGroup, // 直销员组id
            sendLimit, // 发放限制
            max: this.maxAmount, // 消费金额上限
            min: this.minAmount, // 消费金额下限
            userOrderLimit: buyLimit, // 用户购机限制
          }
        }).then((data) => {
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
        }).catch((error) => {
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
          transformRequest: [function (data) {
            // 对 data 进行任意转换处理
            return Qs.stringify(data);
          }],
          // headers: {
          //   'deviceCode': 'A95ZEF1-47B5-AC90BF3'
          // },
          data: {
            userGroup
          }
        }).then((data) => {
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
        }).catch((error) => {
          _this.loadingB = false;
          console.log(error);
        });
      }
    },
    handleCheckAllChange() { // 选择所有小微
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
    handleCheckedCitiesChange(value) { // 选择小微
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
    },
    handleGroupCheckAllChange(val) { // 选择所有小微组
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
    handleCheckedGroupChange(value) { // 选择小微组
      const checkedCounts = value.length;
      this.checkGroupAll = checkedCounts === this.groups.length;
    },
    select_finish() { // 小微选择完成
      const _this = this;
      const checkedXwIds = this.getxwIdsByIndex(this.checkedCities);// 没问题
      const checkedXwGroupIds = this.getxwGroupIdsByIndex(this.checkedGroups);// 没问题
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
        if (this.checkNewGroup) { // 新建小微组
          if (this.newGroupName.length < 1 || this.newGroupName == null) {
            this.$message({
              type: 'warning',
              message: '请输入新建的小微组名！'
            });
            return;
          }
          axios.post(`${this.apiUrl}vipcenter/xiaoWeiGroup/addXwGroupByxwIdsAndxwGroupIds`, param).then((response) => {
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
          }).catch((error) => {
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
    getxwIdsByIndex(index) { // 根据小微的索引index获取小微id
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
    getxwGroupIdsByIndex(index) { // 根据小微组的索引index获取小微组id
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
    getChannelById() { // 获取所有渠道
      const _this = this;
      axios({
        url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/listChannelById`,
        method: 'post',
        transformRequest: [function (data) {
          return Qs.stringify(data);
        }],
        data: { id: 2 }
      }).then((response) => {
        if (response.data.isSuccess) {
          _this.channel = response.data.data;
        } else {
          _this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    selectUserFinish() { // 完成用户的选择
      this.select_user = false;
    },
    selectSellerGroup_finish() { // 完成直销员组的选择
      this.select_sellerGroup = false;
    },
    storesDialogCloas() {
      this.shopName = this.beforeshopName;
      this.storesDialog = false;
      this.md = false;
    },
    listShopInfo(queryString, cb) { // 获取门店列表
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
        transformRequest: [function (data) {
          return Qs.stringify(data);
        }],
        data: {
          xwId: str,
          channelName: this.selectChannel.join(','),
          shopName: ' '
        }
      }).then((response) => {
        if (response.data.msg) {
          if (response.data.data.entities) {
            cb(response.data.data.entities);
          } else {
            cb([]);
          }
        } else {
          _this.$message({
            type: error,
            message: response.data.msg
          });
        }
      }).catch((error) => {
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
    deleteShop(name) { // 删除已选门店
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
    storesSelect() { // 点击选择门店
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
    getSelectedXwGroupIds(xwGroupIds) { // 获取所选小微组的小微
      const _this = this;
      this.allXwfromXwGroup = [];
      axios.post(`${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwByGroupIds`, {
        xwGroupIds
      }).then((response) => {
        if (response.data.isSuccess) {
          _this.allXwfromXwGroup = response.data.data;
        } else {
          _this.$message({
            type: 'warning',
            message: response.data.msg
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getXwFromNewGroup(newGroupIds) { // 获取新建的小微组下的所有小微
      const _this = this;
      this.xwFromNewGroup = [];
      axios.post(`${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwByGroupIds`, {
        xwGroupIds: newGroupIds
      }).then((response) => {
        if (response.data.isSuccess) {
          _this.xwFromNewGroup = response.data.data;
        } else {
          _this.$message({
            type: 'warning',
            message: response.data.msg
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    update() { // 更新
      const _this = this;
      this.getUserAndSeller().then(_this.submit);
    },
    successClick() { // 完成礼品选择
      this.dialogVisible = false;
    },
    shaixuanClick() { // 点击礼品筛选
      const _this = this;
      this.loadingA = true;
      axios({
        url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/listRecommendGiftByKeyWords`,
        method: 'post',
        transformRequest: [function (data) {
          return Qs.stringify(data);
        }],
        headers: {
          deviceCode: 'A95ZEF1-47B5-AC90BF3'
        },
        data: {
          brandNames: 'haier', // 品牌
          keyWords: _this.keyWords, // 搜索关键词
          startPrice: _this.startPrice, // 开始价格
          endPrice: _this.endPrice, // 结束价格
          pageNo: 1, // 页号
          pageSize: 1000, // 页面大小
          isVirtual: '1' // 是否是虚拟商品，1真是物品   2虚拟物品
        }
      }).then((response) => {
        _this.loadingA = false;
        if (response.data.code == '-1') {
          _this.$message({
            message: '请输入价格区间!',
            type: 'warning',
            duration: 2000
          });
        } else if (response.data.data.data == null) {
          _this.$message({
            message: '请输入礼品关键字!',
            type: 'warning',
            duration: 2000
          });
        }
        _this.sites = response.data.data.data;
        _this.sites.forEach((e) => {
          e.count = 0;
        });
        for (let i = 0; i < _this.giftId.length; i++) {
          for (let j = 0; j < _this.sites.length; j++) {
            if (_this.giftId[i].giftId == _this.sites[j].productCode) {
              // _this.sites[j].amount-=_this.giftId[i].giftTotal;
              _this.sites[j].count = _this.giftId[i].giftTotal;
            }
          }
        }
      }).catch((error) => {
        _this.loadingA = false;
        console.log(error);
      });
    },
    giftSelect() { // 点击添加礼品
      this.giftNumberSum = 0;
      for (let i = 0; i < this.giftId.length; i++) {
        this.giftNumberSum += this.giftId[i].giftTotal;
      }
      const _this = this;
      this.loadingA = false;
      axios({
        url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/listRecommendGift`,
        method: 'post',
        transformRequest: [function (data) {
          // 对 data 进行任意转换处理
          return Qs.stringify(data);
        }],
        headers: {
          deviceCode: 'A95ZEF1-47B5-AC90BF3'
        },
        data: {
          productCategoryCodes: 'AA,AB,BA,BB,CA,DA',
          brandNames: 'haier',
          startPrice: 100,
          endPrice: 10000,
          isVirtual: '1'
        }
      }).then((response) => {
        if (response.data.isSuccess) {
          _this.loadingA = false;
          _this.sites = response.data.data;
          _this.sites.forEach((e) => {
            e.price = e.giftPrice / 100;
            e.count = 0;
          });
          for (let i = 0; i < _this.giftId.length; i++) {
            for (let j = 0; j < _this.sites.length; j++) {
              if (_this.giftId[i].giftId == _this.sites[j].productCode) {
                // _this.sites[j].amount-=_this.giftId[i].giftTotal;
                _this.sites[j].count = _this.giftId[i].giftTotal;
              }
            }
          }
        } else {
          _this.loadingA = false;
          _this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      }).catch((error) => {
        _this.loadingA = false;
        console.log(error);
      });
      this.dialogVisible = true;
    },
    sendThisGift(e) { // 点击送这个礼品
      if (e.count <= 0) {
        this.$message({
          type: 'warning',
          message: '请输入礼品数！'
        });
        return;
      }
      const _this = this;
      const obj = {};
      obj.imgUrl = e.photoLink;
      obj.giftId = e.productCode; // productCode
      obj.giftName = e.productName;
      obj.giftNumber = e.amount;
      obj.giftPrice = e.needScore;
      obj.onestopId = this.id;
      obj.giftTotal = e.count;
      obj.giftRemaining = e.count;
      obj.count = parseInt(e.count);
      obj.onestopId = this.id;
      obj.productLink = e.productLink;

      if (this.giftId.length > 0) { // 是否已选礼品
        // alert('是否已选礼品')
        for (let i = 0; i < this.giftId.length; i++) {
          if (obj.giftId == this.giftId[i].giftId) { // 选的礼品是否有与刚选的相同
            // alert('选的礼品是否有与刚选的相同')
            if (e.amount >= obj.count) { // 有相同，是否数量大于库存--已选的数量加上库存
              // alert('有相同，是否数量大于库存--已选的数量加上库存')
              // e.amount=e.amount+this.giftId[i].giftTotal-obj.count;//计算新库存

              const obj1 = JSON.parse(JSON.stringify(this.giftId[i]));
              obj1.giftTotal = obj.count;
              obj1.giftRemaining = obj.count;
              obj1.budget = obj.count * obj.giftPrice;
              obj1.giftNumber = obj.giftNumber;
              this.$set(this.giftId, i, obj1);

              this.giftAmountSum = 0;
              this.giftNumberSum = 0;
              this.giftId.forEach((e) => {
                e.price = e.giftPrice / 100;
                e.budget = e.giftTotal * e.giftPrice;
                _this.giftAmountSum += e.budget;
                _this.giftNumberSum += e.giftTotal;
              });
              this.$message({
                message: '选择成功!',
                type: 'success',
                duration: 2000
              });
              return;
            }// 数量大于库存
            // alert('数量大于库存')
            this.$message({
              message: '数量不足，选择失败!',
              type: 'warning',
              duration: 2000
            });
          } else { // 没有相同的
            // alert('没有相同的')
            if (i == this.giftId.length - 1) {
              obj.giftTotal = obj.count;
              obj.giftRemaining = obj.count;
              if (e.amount >= obj.count) { // 数量是否超过库存
                // alert('数量是否超过库存')
                this.giftId.push(obj);// 更新礼品单
                // e.amount-=obj.count;
                this.$message({
                  message: '选择成功!',
                  type: 'success',
                  duration: 2000
                });
                break;
              } else { // 数量超过库存
                // alert('数量超过库存')
                this.$message({
                  message: '数量不足，选择失败!',
                  type: 'warning',
                  duration: 2000
                });
              }
            }
          }
        }
      } else { // 礼品单没有礼品，直接添加
        // alert('礼品单没有礼品，直接添加')
        obj.giftTotal = obj.count;
        obj.giftRemaining = obj.count;
        if (e.amount >= obj.count) { // 数量是否超过库存
          this.giftId.push(obj);
          // e.amount=e.amount-obj.count;
          this.$message({
            message: '选择成功!',
            type: 'success',
            duration: 2000
          });
        } else { // 没有礼品，但数量超过库存
          // alert('没有礼品，但数量超过库存')
          this.$message({
            message: '数量不足，选择失败!',
            type: 'warning',
            duration: 2000
          });
        }
      }

      this.giftAmountSum = 0;
      this.giftNumberSum = 0;
      this.giftId.forEach((e) => {
        e.price = e.giftPrice / 100;
        e.budget = e.giftTotal * e.giftPrice;
        _this.giftAmountSum += e.budget;
        _this.giftNumberSum += e.giftTotal;
      });
    },
    deleteClick(e) { // 删除已选的指定礼品
      const index = this.giftId.indexOf(e);
      const _this = this;
      // this.sites.forEach(function(e) {
      //   if(e.productCode==_this.giftId[index].giftId){
      //     e.amount+=_this.giftId[index].giftTotal;
      //   }
      // })
      this.giftId.splice(index, 1);
      this.$message({
        message: '删除成功',
        type: 'success'
      });
      this.giftAmountSum = 0;
      this.giftNumberSum = 0;
      this.giftId.forEach((e) => {
        _this.giftAmountSum += e.giftTotal * e.giftPrice;
        _this.giftNumberSum += e.giftTotal;
      });
    },
    imgDescription(e) { // 点击图片跳转详情页面
      // console.log(e);
      if (e.productLink) {
        window.open(e.productLink);
      }
    },
    submit() { // 提交奖励配置
      const _this = this;
      let channel = '';// 渠道
      let sendLimit = [];// 发放限制

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
          channel = null;
          this.shopCode = null;
          this.shopName = null;
          userGroup = null;
          this.category = null;
          this.province = null;
          this.city = null;
          this.district = null;
          xiaoweiId = null;
          xwGroupIds = null;
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
          channel = null;
          this.shopCode = null;
          this.shopName = null;
          sendLimit = null;
          this.maxAmount = null;
          this.minAmount = null;
          this.buyLimit = null;
          sellerGroup = null;
          this.category = null;
          this.province = null;
          this.city = null;
          this.district = null;
          xiaoweiId = null;
          xwGroupIds = null;
        } else {
          this.$message({
            type: 'warning',
            message: '请选择用户'
          });
          return;
        }
      }


      if (this.surveyOrActivity < 0) {
        this.$message('请选择奖励方式！');
        return;
      }
      // console.log(this.surveyOrActivity);//选择的奖励方式
      //
      const gift = [];
      if (this.wards == 1) {
        if (this.jifen) {
          // console.dir(this.jifen);//海贝奖励
        } else {
          this.$message('请输入海贝奖励数量！');
          return;
        }
      } else if (this.wards == 2) {
        if (this.xianjin) {
          // console.log(this.xianjin);//现金奖励
        } else {
          this.$message('请输入现金奖励！');
          return;
        }
      } else if (this.wards == 0) {
        if (this.description) {
          // 实物描述
        } else {
          this.$message('请输入实物描述!');
        }
      } else {
        this.$message('请选择奖励设置！');
        return;
      }

      // console.log(this.giftId);
      if (this.giftId.length < 1) {
        this.$message({
          type: 'warning',
          message: '请选择礼品！'
        });
        return;
      }
      for (let i = 0; i < this.giftId.length; i++) {
        gift[i] = { giftDescription: this.giftId[i].giftDescription };
        gift[i].giftId = this.giftId[i].giftId;
        gift[i].giftName = this.giftId[i].giftName;
        gift[i].giftNumber = this.giftId[i].giftNumber;
        gift[i].giftRemaining = this.giftId[i].giftTotal;
        gift[i].imgUrl = this.giftId[i].imgUrl;
        gift[i].giftTotal = this.giftId[i].giftTotal;
        gift[i].giftPrice = this.giftId[i].giftPrice;
        gift[i].onestopId = this.giftId[i].onestopId;
        gift[i].productLink = this.giftId[i].productLink;
      }


      if (this.zxy <= 0) {
        this.$message({
          type: 'error',
          message: '直销员数量为0，请重新选择！'
        });
        return;
      }

      if (this.users <= 0) {
        this.$message({
          type: 'error',
          message: '直销员数量为0，请重新选择！'
        });
        return;
      }

      if ((this.giftNumberSum % this.zxy) != 0 || this.giftNumberSum == 0) {
        this.$message({
          type: 'error',
          message: '礼品数量必须是直销员数量的整数倍！'
        });
        return;
      }

      if (this.allAcount > this.remain) {
        this.$message({
          type: 'error',
          message: '奖励预算超出总预算，请重新配置奖励！'
        });
        return;
      }

      const param2 = {
        giftId: gift,
        id: this.id, // 配置表id号，来源于上一步配置
        costAmount: this.allAcount / 100, // 奖励预算
        rewardBudget: this.jifen, // 海贝预算数量
        rewardContent: this.description, // 实物奖励描述
        rewardType: this.wards, // 若是海贝奖励请回1，若是实物奖励回0，若是现金奖励回2
        rewardWay: this.surveyOrActivity, // 奖励方式（0是问卷，1是活动）
        rewardMoney: this.xianjin // 现金奖励
      };

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
        province: _this.province,
        city: _this.city,
        district: _this.district,
      };
      this.loadingC = true;
      axios.post(`${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/updateOneStopStepThree`, params).then((data) => {
        if (data.data.code == '0') {
          axios.post(`${_this.apiUrl}vipcenter/rightEdit/updateConfig`, param2).then((response) => {
            if (response.data.isSuccess) {
              _this.loadingC = false;
              _this.$router.push({ path: '/dbOperate/survey', query: { rightsGrantModelId: _this.rightsGrantModelId } });
            } else {
              _this.loadingC = false;
              _this.$message({
                type: 'error',
                message: response.data.msg
              });
            }
          }).catch((error) => {
            _this.loadingC = false;
            console.log(error);
          });
        } else {
          _this.loadingC = false;
          _this.$message({
            type: 'error',
            message: data.data.msg
          });
        }
      }).catch((errror) => {
        _this.loadingC = false;
        console.log(error);
      });
    },
    getSurveyById() { // 根据id获取配置信息
      const _this = this;
      axios({
        url: `${this.apiUrl}vipcenter/rightEdit/queryNextOrderRights`,
        method: 'post',
        transformRequest: [function (data) {
          // 对 data 进行任意转换处理
          return Qs.stringify(data);
        }],
        headers: {
          deviceCode: 'A95ZEF1-47B5-AC90BF3'
        },
        data: {
          onestopId: this.id
        }
      }).then((response) => {
        if (response.data.isSuccess) {
          // console.log(response);
          const data = response.data.data[0].oneStopQuestionnaireConfigs[0];
          // 发放规则
          _this.rule = data.ruleType;


          let sellerGroup = [];
          if (data.sellerGroup == null) {
            sellerGroup = [];
          } else {
            sellerGroup = data.sellerGroup.split(',');
          }
          const arr3 = [];
          _this.sellerGroup.forEach((e) => {
            arr3.push(e.id);
          });
          _this.checkList = [];
          if (sellerGroup.length > 0) {
            sellerGroup.forEach((e) => {
              const index = arr3.indexOf(parseInt(e));
              if (index >= 0) {
                _this.checkList.push(index);
              }
            });
          }

          let userGroup = [];
          if (data.userGroup == null) {
            userGroup = [];
          } else {
            userGroup = data.userGroup.split(',');
          }
          const arr4 = [];
          _this.userList.forEach((e) => {
            arr4.push(e.id);
          });
          _this.checkUserList = [];
          if (userGroup.length > 0) {
            userGroup.forEach((e) => {
              const index = arr4.indexOf(parseInt(e));
              if (index >= 0) {
                _this.checkUserList.push(index);
              }
            });
          }

          if (data.channel == null || data.channel.length < 1) {
            _this.selectChannel = [];
          } else if (data.channel == 'all') {
            _this.selectChannel = [];
            for (const key in _this.channel) {
              _this.selectChannel.push(_this.channel[key]);
            }
          } else {
            _this.selectChannel = data.channel.split(',');
          }


          // 小微
          let xwIds = [];
          if (data.xiaoweiId == null || data.xiaoweiId.length < 1) {
            xwIds = [];
          } else if (data.xiaoweiId == 'all') {
            _this.checkAll = true;
            _this.checkedCities = [];
            for (let i = 0; i < _this.cities.length; i++) {
              _this.checkedCities.push(i);
            }
          } else {
            xwIds = data.xiaoweiId.split(',');
            const arr = [];
            _this.cities.forEach((e) => {
              arr.push(e.xwId);
            });// 所有小微的id
            _this.checkedCities = [];
            xwIds.forEach((e) => {
              const index = arr.indexOf(e);
              if (index >= 0) {
                _this.checkedCities.push(index);
              }
            });
            if (_this.checkedCities.length == _this.cities.length) {
              _this.checkAll = true;
            }
          }

          // 小微组
          let xwGroupIds = [];
          if (data.xwGroupIds == null || data.xwGroupIds.length < 1) {
            xwGroupIds = [];
          } else {
            xwGroupIds = data.xwGroupIds.split(',');
          }
          const arr1 = [];
          _this.groups.forEach((e) => {
            arr1.push(e.id);
          });
          xwGroupIds.forEach((e) => {
            const index = arr1.indexOf(parseInt(e));
            if (index >= 0) {
              _this.checkedGroups.push(index);
            }
          });
          if (_this.checkedGroups.length == _this.groups.length) {
            _this.checkGroupAll = true;
          } else {
            _this.checkGroupAll = false;
          }

          // 经营产业
          const categoryName = data.productCategoryName;
          if (categoryName == null || categoryName == '') {
            _this.category = [];
            _this.categoryName = '';
          } else if (categoryName == 'all') {
            _this.categoryName = '所有产业';
            for (const key in _this.industryList) {
              _this.category.push(key);
            }
            _this.checkAllCategory = true;
          } else {
            _this.category = categoryName.split(',');
            _this.categoryName = categoryName;
          }

          // 地址
          _this.province = data.province;
          _this.city = data.city;
          _this.district = data.district;
          _this.selectedOptions = [];
          _this.selectedOptions.push(_this.province, _this.city, _this.district);

          // 门店
          _this.shopName = data.shopName;
          if (data.shopCode == null) {
            _this.shopCode = [];
          } else if (data.shopCode == 'all') {
            _this.shopCode = 'all';
          } else {
            _this.shopCode = data.shopCode;
          }
          // 发放限制
          let arr2 = [];
          if (data.sendLimit == null) {
            data.sendLimit = [];
          } else {
            arr2 = data.sendLimit.split(',');
          }
          if (arr2.indexOf('1') >= 0) {
            _this.amount = true;
            _this.minAmount = data.userComsumptionMin;
            _this.maxAmount = data.userComsumptionMax;
          } else {
            _this.amount = false;
          }
          if (arr2.indexOf('2') >= 0) {
            _this.goujixianzhi = true;
            _this.productName = data.userOrderLimit;
            if (_this.productName && _this.productName.length > 0) {
              _this.productType = _this.productName.split(',');
            } else {
              _this.productType = [];
            }
          } else {
            _this.amount = false;
          }
          // 奖励方式
          _this.surveyOrActivity = data.rewardWay;
          _this.wards = data.rewardType;

          _this.zxy = data.sellersCount;
          _this.users = data.userCount;
          _this.xianjin = data.rewardMoney;
          _this.description = data.rewardContent;
          _this.jifen = data.rewardBudget;
          _this.remain = data.giftConfigBudget * 100;

          const gift = response.data.data[0].giftId;
          for (let i = 0; i < gift.length; i++) {
            _this.giftId[i] = { giftId: gift[i].giftId };
            _this.giftId[i].productLink = gift[i].productLink;
            _this.giftId[i].giftName = gift[i].giftName;
            _this.giftId[i].price = gift[i].giftPrice / 100;
            _this.giftId[i].giftTotal = gift[i].giftTotal;
            _this.giftId[i].giftNumber = gift[i].giftNumber;
            _this.giftId[i].giftPrice = gift[i].giftPrice;
            _this.giftId[i].imgUrl = gift[i].imgUrl;
            _this.giftId[i].onestopId = gift[i].onestopId;
            _this.giftId[i].id = gift[i].id;
            _this.giftId[i].budget = gift[i].giftTotal * gift[i].giftPrice;
            _this.giftId[i].giftDescription = '';
          }
          for (let i = 0; i < _this.giftId.length; i++) {
            _this.giftAmountSum += _this.giftId[i].budget;
            _this.giftNumberSum += _this.giftId[i].giftTotal;
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    handleCheckAllUsers() { // 选择所有用户
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
    handleCheckUsers(value) { // 选择用户
      const checkedCount = value.length;
      this.checkAllUsers = checkedCount === this.userList.length;
    },
    handleCheckAllSellers() { // 选择所有直销员组
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
    handleCheckSellers(value) { // 选择直销员组
      const checkedCounts = value.length;
      this.checkAllSellers = checkedCounts === this.sellerGroup.length;
    },
    pickerCategory() { // 点击选择经营产业
      this.listIndustry();
      this.categoryDialog = true;
    },
    listIndustry() { // 获取所有经营产业
      const _this = this;
      return axios.post(`${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/listSellersProduct`).then((response) => {
        if (response.data.isSuccess) {
          _this.industryList = response.data.data;
        } else {
          _this.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    categoryCheckAll() { // 全选产业
      let industryCount = 0;
      for (const key in this.industryList) {
        industryCount++;
      }
      if (this.category.length != industryCount) {
        const arr = [];
        for (const key in this.industryList) {
          arr.push(key);
        }
        this.category = arr;
      } else {
        this.category = [];
      }
    },
    checkCategory(value) { // 点击产业
      const checkedCounts = value.length;
      let industryCount = 0;
      for (const key in this.industryList) {
        industryCount++;
      }
      this.checkAllCategory = checkedCounts === industryCount;
    },
    categorySelect() { // 产业选择完毕
      let categoryCount = 0;
      for (const key in this.industryList) {
        categoryCount++;
      }
      if (this.category.length == categoryCount) {
        this.categoryName = '所有产业';
      } else {
        this.categoryName = this.category.join(',');
      }
      this.categoryDialog = false;
    },
    remanageSeller() { // 重新管理直销员组
      this.$router.push({ path: '/dbOperate/sellerGroupManage', query: { id: this.id, onestepThree: 2 } });
    },
    remanageUser() { // 重新管理用户组
      this.$router.push({ path: '/dbOperate/userGroupManage', query: { id: this.id, onestepThree: 2 } });
    },
    listProductInfo(queryString, cb) { // 搜索型号
      const _this = this;
      axios({
        url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/listProductInfo`,
        method: 'post',
        transformRequest: [function (data) {
          return Qs.stringify(data);
        }],
        data: {
          brandName: 'haier,casarte,tongshuai',
          code: 'all',
          productName: queryString
        }
      }).then((response) => {
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
      }).catch((error) => {
        console.log(error);
      });
    },
    productSelect(item) { // 点击选择型号
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
    deleteproduct(productName) { // 删除已选的型号
      const index = this.productType.indexOf(productName);
      this.productType.splice(index, 1);
      this.productName = this.productType.join(',');
    },
    handleChange(value) { // 选择地址
      // console.log(value);
      this.province = value[0];
      this.city = value[1];
      this.district = value[2];
    },
    prev() {
      this.$router.push({ path: '/dbOperate/survey/addSurvey', query: { id: this.id, rightsGrantModelId: this.rightsGrantModelId } });
    }
  },
  mounted() {
    const _this = this;
    this.getChannelById();
    this.getXiaoWeiGroupList();
    this.getXiaoWeiList();
    this.getDirectSeller();
    this.getUserGroup();
    this.listIndustry().then(() => { _this.getSurveyById(); });
  },
  watch: {
    directSellers() {
      if (this.directSellers == 0) {
        this.flag2 = true;
        this.md = true;
        this.flag1 = false;
      } else if (this.directSellers == 1) {
        this.flag1 = true;
        this.flag2 = false;
        this.md = false;
      }
    },
    wards() {
      if (this.wards == 0) {
        this.ba = true;
        this.bb = true;
        this.bc = false;
      } else if (this.wards == 1) {
        this.ba = false;
        this.bb = true;
        this.bc = true;
      } else if (this.wards == 2) {
        this.ba = true;
        this.bb = false;
        this.bc = true;
      }
    },
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
    this.rightsGrantModelId = this.$route.query.rightsGrantModelId;
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
  hr{
      color: #000;
  }
  .newSurvey{
      padding: 20px;
      box-sizing: border-box;
      font-size: 14px;
  }
  .directSeller-title{
      font-size: 20px;
      color: #000;
      font-weight: 600;
      margin-top: 20px;
  }
  .directSeller-content{
      width: 80%;
      padding: 20px 0 20px 50px;
  }
  .directSeller-select{
      display: flex;
      margin: 20px 0 50px;
  }
  .directSeller-select-name{
      color: #000;
      height: 30px;
      line-height: 30px;
      padding-right: 10px;
  }
  .directSeller-type{
      margin-left: 50px;
  }
  .vip-input{
      width: 300px;
  }
  .radioinput{
      width: 200px;
      margin-right: 5px;
  }
  .cash-count{
      margin-left: 10px;
  }
  .exit-directSeller{
      margin: 30px 50px 20px;
  }
  .margin-left{
      margin: 10px 50px;
  }
  .integralReward{
      margin: 20px 10px;
  }
  .cash, .gift{
      margin-left: 84px;
      margin-right: 10px;
      margin-bottom: 10px;
  }
  .select-group{
      height: 100px;
      display: block;
  }
  .ward-count{
      margin-top: 50px;
      margin-bottom: 20px;
  }
  .giftConfiguration{
      position: relative;
  }
  .addGift{
      position: absolute;
      top: -8px;
      right: 5px;
  }
  .margin-auto{
      text-align: center;
      margin: 10px auto;
  }
  /*小微组*/
  .choice-user{
    margin-left: 6px;
    padding: 5px;
    width: 78px;
    color: white;
    font-size: 10px;
    background: #409EFF;
  }
   .choice{
    padding: 5px;
    width: 80px;
    color: white;
    font-size: 10px;
    background: #409EFF;
  }
  .df-xiaowei-list{
    padding-bottom: 15px;
    border-bottom: 1px solid #ccc;
    display: flex;
  }
  .select-xiaowei-left{
    width: 48%;
    margin-top: 10px;
    padding-right: 5px;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
  }
  .xw{
    font-size: 16px;
    font-weight: 500;
  }
  .xw-checkAll{
    float: right;
  }
  .hide-scroll{
    width: 178px;
    height: 255px;
    overflow: hidden;
  }
  .xiaowei-list{
    height: 285px;
    width: 100%;
    overflow-y: scroll;
  }
  .df-xiaowei{
    width: 80%;
    height: 18px;
    line-height: 18px;
    margin-left: 30px;
    display: flex;
  }
  .filterCondition{
      width: 120px;
      display: inline-block;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
  }
  .creat-xiaoweiGroup{
    display: flex;
    padding: 10px 0;
  }
  .creat-xiaoweiGroup .el-checkbox{
    height: 36px;
    line-height: 36px;
    padding-bottom: 0;
    margin-right: 5px;
  }
  .newGroup-submit{
    margin: 0 0 0 50%;
    transform: translate(-50%,0);
  }
  .select-xiaowei-right{
    width: 48%;
    margin-top: 10px;
    padding-left: 5px;
    border-left: 1px solid #ccc;
    box-sizing: border-box;
  }
  .channel .el-checkbox{
    margin: 0 5px 0 3px;
  }
  .channel{
    display: flex;
    padding-top: 20px;
    margin-left: 18px;
  }
  .select_sellerGroup_finish{
    margin: 10px 50% 0;
    transform: translate(-50%,0);
  }
  .df-xiaowei-list{
    padding-bottom: 15px;
    border-bottom: 1px solid #ccc;
    display: flex;
  }
  .store{
    padding-top: 20px;
    margin-left: 45px;
  }
  .xw{
    font-size: 16px;
    font-weight: 500;
  }
  .store .el-textarea{
    margin-top: -20px;
    margin-left: 47px;
  }
  .xiaowei-dialog .xiaowei-dialog-header>p a{
    width: auto;
    padding:0 5px;
    height: 18px;
    border:1px solid #cccccc;
    border-radius: 2px;
    color:#45a0f8;
    font-weight:normal;
    display:inline-block;
    text-align: center;
    line-height: 18px;
    float:right;
  }
  .select-all-shop{
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
  .trs-btn{
    margin-left:159px;
  }
  .addgift-body{
    max-height: 500px;
    min-height: 200px;
    display: flex;
    flex-wrap: wrap;
  }
  .shaixuan{
    display: flex;
    width: 100%;
  }
  .shaixuan-but{
    width: 80px;
    background: #409EFF;
    color: white;
    margin-left: 12px;
    border-radius: 5px;
  }
  .shaixuan-text{
    font-size: 10px;
  }
  .gift-input{
    width: 100px;
    margin-right: 5px;
    margin-left: 5px;
  }
  .shaixuanlimit{
    margin-left: 10px;
    font-size: 10px;
    color: red;
    height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .info{
    width: 100%;
    position: relative;
  }
  .addgift-info{
    height: 80px;
    width: 45%;
    padding: 10px ;
    display: flex;
    border-bottom: 1px solid #ccc;
    margin: 8px 10px 0 15px;
    position: relative;
    overflow: hidden;
  }
  .addgift-img{
    width: 60px;
    height: 60px;
  }
  .info-title{
    margin-left: 20px;
    font-size: 12px;
    color: #000000;
    width: 200px;
    /*height: 18px;*/
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .info-body{
    margin-left: 20px;
    font-size: 10px;
    margin-top: 5px;
    color: #ccc;
  }
  .info-money{
    margin-left: 20px;
    font-size: 10px;
    margin-top: 5px;
    color: #ccc;
  }
  .giftNumInput {
    width: 55px;
    margin-right: 5px;
  }
  .sendThis{
    background-color: #20a0ff;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    height: 36px;
  }
  .sendThis:hover{
    background: #4db3ff;
    border-color: #4db3ff;
    color: #fff;
  }
  .delete{
    margin-top: -5px;
    margin-left: 25%;
  }
  .grant{
    padding-top: 20px;
    margin-left: 18px;
  }
  .appoint{
    margin-left: 75px;
    margin-top: 20px;
  }
  .choice-seller{
    margin-left: 8px;
    padding: 5px;
    width: 85px;
    color: white;
    font-size: 10px;
    background: #409EFF;
  }
  .sellerGroup .el-checkbox{
    margin: 7px 0 0 25px;
  }
  .sellerGroup{
    padding: 15px 0;
    box-shadow: 1px 0px 1px 2px #ccc;
    width: 230px;
    overflow: hidden;
  }
  .sellerGroup .el-checkbox{
    display: flex;
    line-height: 18px;
  }
  .limit{
    padding-top: 20px;
    margin-left: 20px;
  }
  .vip-input{
    width: 180px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .userlimit{
    margin-left: 75px;
    margin-top: 10px;
  }
  .bottom{
    height: 30px;
    margin: 20px 0 20px 95px;
  }
  .bottom-text{
    /*padding-top: 30px;*/
    margin-bottom: 10px;
  }
  .xiaowei-dialog .xiaowei-dialog-header>p a{
    width: auto;
    padding:0 5px;
    height: 18px;
    border:1px solid #cccccc;
    border-radius: 2px;
    color:#45a0f8;
    font-weight:normal;
    display:inline-block;
    text-align: center;
    line-height: 18px;
    float:right;
  }
  .category{
    padding-top: 20px;
    margin-left: 16px;
  }
  .category .el-textarea{
    margin-top: -20px;
    margin-left: 75px;
    min-height: 48px;
  }
  .model-list{
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
  .model-list .gift-item>div{
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
      background: url("../../../assets/images/ico-del.png") no-repeat;
      background-size: 100% 100%;
  }
  .productList{
    margin: 10px 0 0 -108px;
  }
  .product{
    margin-left: 160px;
    margin-top: -20px!important;
    border: 1px dotted #ccc;
    width: 411px;
    padding: 10px 12px;
  }
  .address{
    padding-top: 20px;
    margin-left: 44px;
    display: flex;
  }
  .address .el-cascader{
    width: 350px;
    margin-left: 5px;
  }
</style>
<style>
    .newSurvey .xiaowei .el-dialog--small{width: 470px!important;}
    .newSurvey .directSeller .el-dialog--small{width: 270px;}
    .newSurvey .user_dialog .el-dialog--small{width: 270px;}
    .newSurvey .stores-dialog .selected-stores{margin-top:5px; display: inline-block; height: auto; min-height: 70px;}
    .newSurvey .xiaowei-dialog .xiaowei-dialog-header>p{margin-bottom:12px;font-weight:bold;}
    .newSurvey .sellerGroup .el-checkbox{display: flex;line-height: 18px;}
    .newSurvey .sellerGroup .el-checkbox__label{width: 160px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
    .newSurvey .min-width .el-dialog{min-width: 800px; max-height: 600px; overflow-y: scroll;}
    .newSurvey .el-button{border: 1px solid #409EFF;}
    .newSurvey .el-button:hover{background: #4db3ff;border-color: #4db3ff;color: #fff;}
    .newSurvey .xiaowei-dialog .el-dialog{width: 240px;}
    .newSurvey .xiaowei-dialog .el-checkbox-group{height:206px;overflow:auto;}
    .newSurvey .xiaowei-dialog .el-checkbox {display:block;margin-left:0;}
    .newSurvey .xiaowei-dialog .el-dialog__body{margin-top:-30px;padding-bottom:10px;}
    .newSurvey .xiaowei-dialog .xiaowei-dialog-header>p{margin-bottom:12px;font-weight:bold;}
    .newSurvey .address .el-cascader .el-input__inner{width: 350px!important;}
</style>
