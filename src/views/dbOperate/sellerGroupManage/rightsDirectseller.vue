<template>
  <div class="rightsDirectseller" v-loading="load">
    <div class="body">
      <div class="current-direct-seller">
        <div class="current-direct-seller-group">当前直销员组</div>
        <div class="group-info">{{ sellerGroupList.sellerGroupName }}</div>
      </div>
      <div class="current-state">
        <div class="current-state-number">当前组内直销员数：</div>
        <div class="seller-number">{{ sellerGroupList.sellerAccount }}</div>
        <div class="describe">当前组描述：</div>
        <!-- <div class="sellerGroupList-desc"><div class="sellerGroupList-desc-info">{{sellerGroupList.desc}}</div></div> -->
        <el-input class="describe-input" type="textarea" v-model="sellerGroupList.desc"></el-input>
        <el-button type="primary" class="preservation" @click="updateDesc">保存描述</el-button>
        <el-button type="primary" class="preservation" @click="checkscreen">查看筛选条件</el-button>
        <el-button type="primary" class="preservation" @click="last">完成</el-button>
      </div>
      <div class="add-direct-seller">添加直销员</div>
      <div>
        <div class="add-current">
          <el-radio v-model="radio" label="1" value="1" class="addradio"
            ><div class="add-current-group">从当前已有组添加</div></el-radio
          >
          <el-button type="primary" class="select-button" @click="selectsellerGroup" :disabled="disabledFlag1"
            >选择</el-button
          >
        </div>
        <div class="screen-direct-seller">
          <el-radio v-model="radio" label="2" value="2" class="screenradio"
            ><div class="screen-seller">筛选直销员</div></el-radio
          >
          <el-button type="primary" class="screen-button" @click="screen" :disabled="disabledFlag2">筛选</el-button>
        </div>
        <div class="direct-seller-screen-condition">直销员筛选条件：</div>
      </div>
      <el-dialog
        class="trs-dialog"
        title="筛选结果"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        style="width: 100%;padding-right: 30%;"
      >
        <div class="screen-result">
          本次筛选结果：
          <div class="screen-people-number">{{ entityCount }}人</div>
        </div>
        <el-button type="primary" class="add-to-current-group" @click="addSeller">新增到当前组</el-button>
        <el-button type="primary" class="replace-to-current-group" @click="replaceSeller">替换到当前组</el-button>
      </el-dialog>
      <el-dialog
        class="trs-dialog"
        title="查看筛选条件"
        :visible.sync="check_screen"
        :modal-append-to-body="false"
        style="width: 100%;padding-right: 30%;"
      >
        <div v-for="item in filter" class="dialogcheckscreen">{{ item }}</div>
      </el-dialog>
      <el-dialog
        :visible.sync="select_sellerGroup"
        title="选择直销员群组"
        :modal-append-to-body="false"
        class="directSeller"
        center
        :show-close="false"
      >
        <div class="sellerGroup">
          <el-checkbox-group v-model="checkList" style="height: 300px;width: 210px; overflow-y: scroll;">
            <el-checkbox v-for="group of selectsellerGroupList" :label="group" :key="group.id">
              <div :title="group.filter">{{ group.sellerGroupName }}</div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="remarks">*可将鼠标移至组名处查看筛选条件</div>
        <el-button @click="selectSellerGroup_finish" class="select_sellerGroup_finish">完成</el-button>
      </el-dialog>
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
              <el-checkbox
                v-for="(city, index) in xiaoweiList"
                :label="city.xwId"
                :key="city.xwName"
                class="df-xiaowei"
                >{{ city.xwName }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
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
            value-key="shopCode"
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
      <table>
        <tr>
          <td><div class="ceshis">选择小微：</div></td>
          <td>
            <el-button class="choice" type="primary" @click="displayXiaoweiList">选择小微</el-button>
            <span style="margin-left: 25px;">*已选小微{{ xwCount }}个</span>
            <!-- <el-select v-model="checkedCities" placeholder="请选择">
          <el-option
            v-for="item in xiaoweiList"
            :key="item.value"
            :label="item.xwName"
            :value="item.xwId">
          </el-option>
        </el-select> -->
          </td>
        </tr>
        <tr>
          <td><div class="ceshis">渠道：</div></td>
          <td>
            <el-checkbox-group v-model="selectChannel">
              <el-checkbox class="checkboxwidth" v-for="(item, index) in qudaoList" :label="item">{{
                item
              }}</el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
        <!-- <el-select v-model="value6" placeholder="请选择">
      <el-option
        v-for="item in qudaoList"
        :key="item"
        :label="item"
        :value="item">
        </el-option>
      </el-select></td></tr> -->
        <tr>
          <td>
            <div class="ceshis">产业：</div>
          </td>
          <td>
            <el-checkbox-group v-model="productname">
              <el-checkbox class="checkboxwidth" v-for="(item, index) in chanyeList" :label="item">{{
                item
              }}</el-checkbox>
            </el-checkbox-group>
            <!-- <el-select v-model="productname" placeholder="请选择">
          <el-option
            v-for="item in chanyeList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select> -->
          </td>
        </tr>

        <tr>
          <td>
            <div class="ceshis">星级：</div>
          </td>
          <td>
            <el-checkbox-group v-model="level">
              <el-checkbox class="checkboxwidth" v-for="(item, index) in xingji" :label="item.value">{{
                item.label
              }}</el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
        <!-- <el-option
        v-for="item in xingji"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select></td></tr> -->
        <tr>
          <td><div class="ceshis">员工号：</div></td>
          <td><el-input v-model="input2" placeholder="请输入员工号" class="userinput"></el-input></td>
        </tr>
        <tr>
          <td><div class="ceshis">工龄：</div></td>
          <td>
            <el-input
              class="userinput"
              v-model="input3"
              type="number"
              :maxlength="4"
              placeholder="请输入工龄"
            ></el-input
            >&nbsp;&nbsp;(月) 以上
          </td>
        </tr>
        <!-- <tr><td><div class="ceshis">在职状态：</div></td><td><el-select v-model="value5" placeholder="请选择">
      <el-option
        v-for="item in zaizhizhuangtai"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
      </el-select></td></tr>   -->
      </table>

      <div style="margin-top: 15px;">
        <el-row style="margin-top: 15px;">
          <el-col :span="5">
            <div class="cx-title">
              门店名称：
              <el-input
                class="inline-input"
                style="width: 410px"
                type="textarea"
                v-model="shopName"
                @focus="pickerStores"
              ></el-input>
            </div>
            <!-- <el-autocomplete
                  class="inline-input"
                  v-model="shopName"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入门店"
                  @select="handleSelect"
                ></el-autocomplete> -->
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import { mapGetters } from 'vuex';
import { Loading } from 'element-ui';
import gUtils from '../../../utils/gUtils.js';

export default {
  computed: {
    xwCount() {
      return this.checkedCities.length;
    }
  },
  name: 'rightsDirectseller',
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      mendianList: [],
      xingji: [
        {
          value: '1',
          label: '一星'
        },
        {
          value: '2',
          label: '二星'
        },
        {
          value: '3',
          label: '三星'
        },
        {
          value: '4',
          label: '四星'
        },
        {
          value: '5',
          label: '五星'
        }
      ],
      dialogVisible: false,
      select_sellerGroup: false,
      check_screen: false,
      xuanzexiaowei: false,
      checkAll: false, // 是否全选小微
      checkedCities: [], // 选择的小微在使用小微的索引index
      cities: [], // 所有小微
      storesDialog: false, // 门店选择弹层
      selectStoreShow: true,
      stores: [],
      selectsellerGroupList: [],
      checkList: [],
      filter: [],
      value: '',
      // checkedCities:[],
      productname: [],
      level: [], // 星级
      selectChannel: [],
      chanyeList: [],
      qudaoList: [],
      screencondition: {},
      shopName: '',
      shopCode: '',
      shopNames: [],
      shopCodes: [],
      checkListid: '',
      xiaoweiList: [],
      entityCount: '',
      disabledFlag1: false,
      disabledFlag2: false,
      sellerGroup: [],
      sellerGroupList: {},
      radio: '',
      restaurants: [],
      load: false
    };
  },
  methods: {
    // 获取直销员组详情
    getsellerGroup() {
      const that = this;
      axios({
        url: `${this.apiUrl}vipcenter/sellerGroupr/querySellerGroupDetail`,
        method: 'post',
        transformRequest: [
          function (data) {
            // 对 data 进行任意转换处理
            return Qs.stringify(data);
          }
        ],
        headers: {
          deviceCode: 'A95ZEF1-47B5-AC90BF3'
        },
        data: {
          id: that.id
        }
      })
        .then((response) => {
          that.sellerGroupList = response.data.data;
          that.filter = that.sellerGroupList.filter;
          that.filter = that.filter.split('#');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    last() {
      this.$router.go(-1);
    },
    updateDesc() {
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/sellerGroupr/updateDesc`, {
          desc: this.sellerGroupList.desc,
          id: this.id
        })
        .then((response) => {
          // that.code=response.data.code
          console.log(response);
          if (response.data.isSuccess == true) {
            that.$message({
              message: '保存成功',
              type: 'success'
            });
          } else {
            that.$message({
              message: response.data.msg,
              type: 'warning'
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    pickerStores() {
      // 点击选择门店
      if (this.checkedCities.length <= 0 || !this.checkedCities) {
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
    storesDialogCloas() {
      this.shopName = this.beforeshopName;
      this.storesDialog = false;
    },
    listShopInfo(queryString, cb) {
      // 获取门店列表
      const _this = this;
      if (this.selectChannel.length <= 0) {
        this.$message('请选择渠道！');
        return;
      }
      const params = {
        xwId: this.checkedCities.join(','),
        channelName: this.selectChannel.join(','),
        shopName: ' '
      };
      this.requestRights.listShopInfo(params).then((data) => {
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
    },
    displayXiaoweiList() {
      // 点击选择小微
      this.selectxiaowei();
      this.xuanzexiaowei = true;
    },
    handleCheckAllChange() {
      // 选择所有小微
      if (this.checkedCities.length != this.xiaoweiList.length) {
        const arr = [];
        for (let i = 0; i < this.xiaoweiList.length; i++) {
          arr.push(this.xiaoweiList[i].xwId);
        }
        this.checkedCities = arr;
        this.checkAll = true;
      } else {
        this.checkedCities = [];
        this.checkAll = false;
      }
    },
    handleCheckedCitiesChange(value) {
      // 选择小微
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.xiaoweiList.length;
    },
    // 获取小微
    selectxiaowei() {
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/xiaoWeiGroup/queryXwAll`)
        .then((response) => {
          that.xiaoweiList = response.data.data;
          // let obj={};
          // obj.xwId="all";
          // obj.xwName="所有小微";
          // that.xiaoweiList.unshift(obj);
          // that.qusList=response.data.data.questionList;
          // that.questionnaire=response.data.data.questionnaire;
          // console.log(that.qusList);
          // console.log(that.questionnaire);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    select_finish() {
      // 小微选择完成
      this.xuanzexiaowei = false;
    },
    selectqudao() {
      const that = this;
      axios({
        url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/listChannelById`,
        method: 'post',
        transformRequest: [
          function (data) {
            // 对 data 进行任意转换处理
            return Qs.stringify(data);
          }
        ],
        headers: {
          deviceCode: 'A95ZEF1-47B5-AC90BF3'
        },
        data: {
          id: 2
        }
      })
        .then((response) => {
          that.qudaoList = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectchanye() {
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/sellerGroupr/listSellersProduct`)
        .then((response) => {
          that.chanyeList = response.data.data;
          // that.xiaoweiList=response.data.data
          // that.qusList=response.data.data.questionList;
          // that.questionnaire=response.data.data.questionnaire;
          // console.log(that.qusList);
          // console.log(that.questionnaire);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkscreen() {
      this.check_screen = true;
    },
    screen() {
      this.radio = '2';
      this.dialogVisible = true;
      // Loading.service({ fullscreen: true });
      this.load = true;
      const that = this;
      if (this.shopName.length > 0) {
        this.shopCodes = this.shopCode.split(',');
        this.shopNames = this.shopName.split(',');
        that.load = false;
      } else {
        that.load = false;
      }
      // if(this.checkedCities=="all"){
      //   this.checkedCities="";
      // };
      // if(this.value6=="超市,五星,国美,综合店,社区专卖,苏宁,VIP用户"){
      //   this.value6='';
      // }
      axios
        .post(`${this.apiUrl}vipcenter/sellerGroupr/pageSellersMoreInfo`, {
          channelNames: this.selectChannel, // 渠道
          hmcId: this.input2, // 工号
          levels: this.level, // 星级
          month: this.input3, // 工龄
          sellerGroupId: this.id,
          productCategoryNames: this.productname, // 产业名字
          status: 'Y', // 在职状态
          shopCodes: this.shopCodes, // 门店Code
          shopNames: this.shopNames,
          xwIds: this.checkedCities // 小微ID
        })
        .then((response) => {
          // let loadingInstance = Loading.service({ fullscreen: true });
          //   that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          //     loadingInstance.close();
          //   });
          that.load = false;
          that.entityCount = response.data.data.entityCount;
          // let obj={};
          // obj.channelName=that.selectChannel;
          // obj.hmcId= that.input2;
          // obj.level= that.level;
          // obj.month= that.input3;
          // obj.productCategoryName = that.productname;
          // obj.shopCode=that.shopName;
          // obj.xwId=that.checkedCities;
          // that.screencondition=obj;
          // that.sellerGroupList.desc=that.sellerGroupList.desc+"渠道:"+that.screencondition.channelName+"；员工号:"+that.screencondition.hmcId+"；星级:"+that.screencondition.level+"；工龄:"+that.screencondition.month+"；产业:"+that.screencondition.productCategoryName+"；门店:"+that.screencondition.shopCode+"；小微组:"+that.screencondition.xwId;
          // that.xiaoweiList=response.data.data
          // that.qusList=response.data.data.questionList;
          // that.questionnaire=response.data.data.questionnaire;
          // console.log(that.qusList);
          // console.log(that.questionnaire);
        })
        .catch((error) => {
          // let loadingInstance = Loading.service({ fullscreen: true });
          //   that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          //     loadingInstance.close();
          //   });
          that.load = false;
          console.log(error);
        });
    },
    addSeller() {
      // Loading.service({ fullscreen: true });
      this.load = true;
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/sellerGroupr/addSellersGroupBySellerIds`, {
          channelNames: this.selectChannel, // 渠道
          hmcId: this.input2, // 工号
          levels: this.level, // 星级
          month: this.input3, // 工龄
          sellerGroupId: this.id,
          productCategoryNames: this.productname, // 产业名字
          status: 'Y', // 在职状态
          shopCodes: this.shopCodes, // 门店Code
          shopNames: this.shopNames,
          xwIds: this.checkedCities // 小微ID
        })
        .then((response) => {
          if (response.data.isSuccess == true) {
            // let loadingInstance = Loading.service({ fullscreen: true });
            // that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            //   loadingInstance.close();
            // });
            that.load = false;
            that.$message({
              message: '增加成功',
              type: 'success'
            });
            that.getsellerGroup();
          } else {
            // let loadingInstance = Loading.service({ fullscreen: true });
            // that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            //   loadingInstance.close();
            // });
            that.load = false;
            that.$message({
              message: response.data.msg,
              type: 'warning'
            });
          }
        })
        .catch((error) => {
          // let loadingInstance = Loading.service({ fullscreen: true });
          //   that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          //     loadingInstance.close();
          //   });
          that.load = false;
          console.log(error);
        });
      this.dialogVisible = false;
    },
    replaceSeller() {
      // Loading.service({ fullscreen: true });
      this.load = true;
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/sellerGroupr/replaceSellersBySellerGroupId`, {
          channelNames: this.selectChannel, // 渠道
          hmcId: this.input2, // 工号
          levels: this.level, // 星级
          month: this.input3, // 工龄
          sellerGroupId: this.id,
          productCategoryNames: this.productname, // 产业名字
          status: 'Y', // 在职状态
          shopCodes: this.shopCodes, // 门店Code
          shopNames: this.shopNames,
          xwIds: this.checkedCities // 小微ID
        })
        .then((response) => {
          if (response.data.isSuccess == true) {
            // let loadingInstance = Loading.service({ fullscreen: true });
            // that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            //   loadingInstance.close();
            // });
            that.load = false;
            that.$message({
              message: '替换成功',
              type: 'success'
            });
            that.getsellerGroup();
          } else {
            // let loadingInstance = Loading.service({ fullscreen: true });
            // that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            //   loadingInstance.close();
            // });
            that.load = false;
            that.$message({
              message: response.data.msg,
              type: 'warning'
            });
          }
        })
        .catch((error) => {
          // let loadingInstance = Loading.service({ fullscreen: true });
          //   that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          //     loadingInstance.close();
          //   });
          that.load = false;
          console.log(error);
        });
      // this.sellerGroupList.sellerAccount=this.entityCount
      this.dialogVisible = false;
    },
    selectSellerGroup_finish() {
      // Loading.service({ fullscreen: true });
      this.load = true;
      // console.log(this.checkList);
      const arr = [];
      this.checkList.forEach((e) => {
        arr.push(e.id);
      });
      // arr=arr.join();
      // console.log(arr);
      const that = this;
      for (let i = 0; i < this.checkList.length; i++) {
        const checkListid = this.checkList[i];
      }
      // console.log(checkListid.id);
      // axios({
      //   url: this.apiUrl+'vipcenter/sellerGroupr/addSellersByOtherSellerGroup',
      //   method: 'post',
      //   transformRequest: [function (data) {
      //       // 对 data 进行任意转换处理
      //       return Qs.stringify(data)
      //   }],
      //   headers: {
      //     'deviceCode': 'A95ZEF1-47B5-AC90BF3'
      //   },
      //   data: {
      //     "fromSellerGroupId":arr,
      //     "toSellerGroupId":this.id,
      //   }
      // })
      axios
        .post(`${this.apiUrl}vipcenter/sellerGroupr/addSellersByOtherSellerGroup`, {
          fromSellerGroupId: arr,
          toSellerGroupId: this.id
        })
        .then((response) => {
          // console.log(response);
          if (response.data.isSuccess == true) {
            // let loadingInstance = Loading.service({ fullscreen: true });
            // that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            //   loadingInstance.close();
            // });
            that.load = false;
            that.$message({
              message: '添加成功',
              type: 'success'
            });
            that.getsellerGroup();
          } else {
            // let loadingInstance = Loading.service({ fullscreen: true });
            // that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            //   loadingInstance.close();
            // });
            that.load = false;
            that.$message({
              message: response.data.msg,
              type: 'warning'
            });
          }
        })
        .catch((error) => {
          // let loadingInstance = Loading.service({ fullscreen: true });
          //   that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          //     loadingInstance.close();
          //   });
          that.load = false;
          console.log(error);
        });
      this.select_sellerGroup = false;
    },
    querySearch(queryString, cb) {
      const { restaurants } = this;
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    },
    // loadAll() {
    //   var that=this;
    //   let one=this.checkedCities;
    //   let two=this.selectChannel;
    //         axios({
    //           url: that.apiUrl+'vipcenter/orderRights/listShopInfo',
    //           method: 'post',
    //           transformRequest: [function (data) {
    //               // 对 data 进行任意转换处理
    //               return Qs.stringify(data)
    //           }],
    //           headers: {
    //             'deviceCode': 'A95ZEF1-47B5-AC90BF3'
    //           },
    //           data: {
    //             xwId: one,
    //             channelName: two,
    //             shopName: ''
    //                   }
    //               })
    //               .then(function (response) {
    //                 if(response.data.isSuccess){
    //                   let obj=response.data.data.entities;
    //                   obj.forEach(function(e){
    //                     e.value=e.shopName;
    //                     that.restaurants=obj;
    //                   });
    //                 }else{
    //                   that.$message(response.data.msg);
    //                 }
    //               })
    //               .catch(function (error) {
    //                 console.log(error);
    //               });
    //         },
    handleSelect(item) {
      console.log(item);
    },
    // 从当前已有组添加
    selectsellerGroup() {
      this.checkList = [];
      // console.log(this.id);
      this.radio = '1';
      this.selectsellerGroupList = [];
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/sellerGroupr/getSellerGroupAllExcludeOne`, {
          id: this.id
        })
        .then((response) => {
          // console.log(response);
          that.selectsellerGroupList = response.data.data;
          that.selectsellerGroupList.forEach((e) => {
            e.filter = e.filter.replace(/#/g, '\n'); // #号换行
          });
        })
        .catch((error) => {
          console.log(error);
        });
      this.select_sellerGroup = true;
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.getsellerGroup();
    this.selectxiaowei();
    this.selectqudao();
    this.selectchanye();
  },

  watch: {
    radio(val) {
      if (val === '1') {
        this.disabledFlag2 = true;
        this.disabledFlag1 = false;
      } else {
        this.disabledFlag2 = false;
        this.disabledFlag1 = true;
      }
    }
    // selectChannel(){
    //   if(this.selectChannel.length>0){
    //     this.restaurants=[];
    //     // this.loadAll();
    //   };
    //   if(this.selectChannel=="全部渠道"){
    //     return this.selectChannel="超市,五星,国美,综合店,社区专卖,苏宁,VIP用户";
    //   }
    // },
  }
};
</script>

<style scoped>
.ceshi {
  width: 186px;
}
.sellerGroupList-desc {
  height: 80px;
  width: 250px;
  margin-top: -25px;
  margin-left: 20px;
  border: 1px solid #000;
}
.sellerGroupList-desc-info {
  height: 70px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}
.body {
  padding: 50px;
}
.current-direct-seller {
  display: flex;
}
.dialogcheckscreen {
  line-height: 50px;
}
.current-direct-seller-group {
  font-size: 20px;
}
.cx-content {
  width: 68%;
}
.ceshis {
  margin-left: 100px;
}
.group-info {
  font-size: 20px;
  margin-left: 20px;
  color: #409eff;
}
.cx-title {
  margin-left: 105px;
  display: flex;
}
.current-state {
  display: flex;
  margin-top: 30px;
}
.current-state-number {
  margin-left: 50px;
  width: 150px;
}
.inline-input {
  margin-left: 20px;
}
.el-col-5 {
  width: 70%;
}
.seller-number {
  margin-left: 5px;
  font-size: 30px;
  margin-top: -10px;
  color: red;
}
.describe {
  margin-left: 50px;
  width: 100px;
}
.describe-input {
  width: 300px;
  line-height: 50px;
  margin-left: 20px;
  margin-top: -13px;
}
.preservation {
  margin-top: -8px;
  margin-left: 30px;
  width: 150px;
  height: 40px;
}
.add-direct-seller {
  margin-top: 20px;
  height: 50px;
  width: 100%;
  border-bottom: 3px solid #ccc;
  font-size: 20px;
}
.add-current {
  display: flex;
  margin-top: 50px;
  margin-left: 20px;
}
.select-button {
  margin-left: 30px;
  margin-top: -10px;
  width: 150px;
}
.addradio {
  display: flex;
}
.screen-direct-seller {
  display: flex;
  margin-top: 50px;
  margin-left: 20px;
}
.screen-button {
  margin-left: 40px;
  width: 150px;
  margin-top: -10px;
}
.add-current-group {
  font-size: 18px;
  margin-left: 10px;
}
.screen-seller {
  font-size: 18px;
  margin-left: 10px;
}
.screenradio {
  display: flex;
}
.direct-seller-screen-condition {
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 80px;
  font-size: 18px;
  color: #ccc;
}
.screen-result {
  display: flex;
  margin-bottom: 20px;
  margin-left: 30px;
}
.remarks {
  font-size: 10px;
  margin-top: 2px;
  color: #ff0033;
}
.screen-people-number {
  font-size: 20px;
  margin-top: -5px;
  color: red;
}
.add-to-current-group {
  margin-left: 30px;
  margin-right: 60px;
}

.sellerGroup .el-checkbox {
  display: flex;
  line-height: 18px;
}
.sellerGroup {
  padding: 15px 0;
  box-shadow: 1px 0px 1px 2px #ccc;
  width: 200px;
  overflow: hidden;
}
.sellerGroup .el-checkbox {
  margin: 7px 0 0 25px;
}
.select_sellerGroup_finish {
  margin: 10px 50% 0;
  transform: translate(-50%, 0);
}
.channel[data-v-1a304e92] {
  padding-top: 10px;
}
table tr td {
  padding: 8px !important;
}
table tr td .el-button .el-button--default {
  margin-left: 19px;
}
.userinput {
  width: 184px;
}
.choice {
  /*margin-left: 10px;*/
  padding: 5px;
  width: 80px;
  color: white;
  font-size: 10px;
  background: #409eff;
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
  width: 98%;
  margin-top: 10px;
  padding-right: 5px;
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
.df-xiaowei-list {
  padding-bottom: 15px;
  border-bottom: 1px solid #ccc;
  display: flex;
}
.newGroup-submit {
  margin: 0 0 0 50%;
  transform: translate(-50%, 0);
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
.checkboxwidth {
  width: 70px;
}
</style>

<style>
.rightsDirectseller .directSeller .el-dialog--small {
  width: 250px;
}
.rightsDirectseller .xiaowei .el-dialog--small {
  width: 350px;
}
.rightsDirectseller .sellerGroup .el-checkbox__label {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rightsDirectseller .el-dialog__body {
  padding: 30px 25px !important;
}
</style>
