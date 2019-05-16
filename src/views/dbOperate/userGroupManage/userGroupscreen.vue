<template>
  <div class="rightsDirectseller" v-loading="load">
    <div class="body">
      <div class="current-direct-seller">
        <div class="current-direct-seller-group">当前用户组</div>
        <!-- <div class="group-info">{{sellerGroupList.sellerGroupName}}</div> -->
        <div class="group-info">{{userGroupList.userGroupName}}</div>
      </div>
      <div class="current-state">
        <div class="current-state-number">当前组内用户数：</div>
        <!-- <div class="seller-number">{{sellerGroupList.sellerAccount}}</div> -->
        <div class="seller-number">{{userGroupList.userAccount}}</div>
        <div class="describe">当前组描述：</div>
        <!-- <div class="sellerGroupList-desc"><div class="sellerGroupList-desc-info">{{sellerGroupList.desc}}</div></div> -->
        <el-input class="describe-input" type="textarea" v-model="userGroupList.desc"></el-input>
        <el-button type="primary" class="preservation" @click="updateDesc">保存描述</el-button>
        <el-button type="primary" class="preservation" @click="checkscreen">查看筛选条件</el-button>
        <el-button type="primary" class="preservation" @click="last">完成</el-button>
      </div>
      <div class="add-direct-seller">添加用户</div>
      <div>
        <div class="screen-direct-seller">
          <!-- <el-radio v-model="radio" label="2" value='2' class="screenradio"><div class="screen-seller">筛选用户</div></el-radio> -->
          <p class="template-brand">
              <i></i>筛选用户
          </p>
          <el-button type="primary" class="screen-button" @click="screen">筛选</el-button>
        </div>
        <div class="direct-seller-screen-condition">用户筛选条件：</div>
      </div>
      <el-dialog
        class="trs-dialog"
        title="筛选结果"
        :visible.sync="dialogVisible"
        :modal-append-to-body='false'
        style="width: 100%;padding-right: 30%;">
          <div class="screen-result">本次筛选结果：<div class="screen-people-number">{{this.usertotal}}人</div></div>
          <el-button type="primary" class="add-to-current-group" @click="addUser">新增到当前组</el-button>
          <el-button type="primary" class="replace-to-current-group" @click="replaceSeller">替换到当前组</el-button>
        </span>
      </el-dialog>
      <el-dialog
        class="trs-dialog"
        title="查看筛选条件"
        :visible.sync="check_screen"
        :modal-append-to-body='false'
        style="width: 100%;padding-right: 30%;">
          <div v-for="item in filter" class="dialogcheckscreen">{{item}}</div>
      </el-dialog>
      <table>
        <tr><td><div class="ceshis">品牌选择：</div></td><td><el-select v-model="brandSelect" placeholder="请选择">
          <el-option
            v-for="item in pingpaiList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select></td></tr>
        <!-- <tr><td><div class="ceshis">型号选择：</div></td><td><el-select v-model="versionSelect" placeholder="请选择">
          <el-option
            v-for="item in xinghaoList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select></td></tr> -->
        <tr><td><div class="ceshis">金额区间：</div></td><td>
          <div class="money-Section">
            <el-input  class="gift-input" placeholder="最低价" type="number" v-model="startPrice"></el-input>
            <div class="zhi">——</div>
            <el-input class="gift-input" placeholder="最高价" type="number" v-model="endPrice"></el-input>
            <div class="yuan">(元)</div>
          </div>
        </td></tr>
        <tr><td>
          <div class="ceshis">型号筛选：</div>
        </td><td>
          <el-autocomplete style="width: 405px;margin-top:3px;" placeholder="输入产品型号进行筛选"
                           :fetch-suggestions="listProductInfo"
                           @select="productSelect"
                           v-model="productKeyWord"
                           value-key="desc"
                           >
          </el-autocomplete>
        </td></tr>
        <tr><td>
          <div class="ceshis">已经选定的产品型号：</div>
        </td>
        <div class="stores-dialog productList">
        <td>
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
        </td>
      </div>
      </tr>
      </table>
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
  name: 'userGroupscreen',
  data() {
    return {
      // date: {
      //   sendDate: '',
      //   sendDateEnd: '',
      // },
      startPrice: '',
      endPrice: '',
      pingpaiList: [{
        value: 'all',
        label: '全部'
      }, {
        value: 'haier',
        label: '海尔'
      }, {
        value: 'casarte',
        label: '卡萨帝'
      }, {
        value: 'tongshuai',
        label: '统帅'
      }],
      // xinghaoList:[{
      //   value:'BCD',
      //   label:'BCD'
      // },{
      //   value:'ABC',
      //   label:'ABC'
      // },{
      //   value:'CAD',
      //   label:'CAD'
      // }],
      dialogVisible: false,
      check_screen: false,
      id: 1,
      select_sellerGroup: false,
      brandSelect: '', // 品牌选择
      // versionSelect:'',     //型号选择
      conditionSearch: '', // 型号搜索
      productName: '', // 产品型号
      productType: [], // 产品型号
      productKeyWord: '', // 产品型号搜索关键字
      userGroup: [],
      usertotal: 0, // 筛选后用户总数
      userGroupList: {},
      filter: [],
      load: false,
    };
  },
  methods: {
    getuserGroup() { // 换取用户组详情
      const that = this;
      axios({
        url: `${this.apiUrl}vipcenter/userGroup/getUserGroupBygroupId`,
        method: 'post',
        transformRequest: [function (data) {
          // 对 data 进行任意转换处理
          return Qs.stringify(data);
        }],
        headers: {
          deviceCode: 'A95ZEF1-47B5-AC90BF3'
        },
        data: {
          userGroupId: this.id,
        }
      })
        .then((response) => {
          that.userGroupList = response.data.data;
          that.filter = that.userGroupList.filter;
          that.filter = that.filter.split('#');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkscreen() {
      this.check_screen = true;
    },
    screen() { // 筛选
      if (this.brandSelect == '' && this.startPrice == '' && this.endPrice == '' && this.conditionSearch == '' && this.productType == '') {
        this.$message({
          message: '请至少填写一个条件进行筛选',
          type: 'warning'
        });
      } else if (this.startPrice != '' && this.endPrice == '') {
        this.$message({
          message: '请输入完整的价格区间',
          type: 'warning'
        });
      } else if (this.startPrice == '' && this.endPrice != '') {
        this.$message({
          message: '请输入完整的价格区间',
          type: 'warning'
        });
      } else {
        // Loading.service({ fullscreen: true });
        this.load = true;
        this.dialogVisible = true;
        const that = this;
        if (this.brandSelect == 'all') {
          this.brandSelect = '';
        }
        axios.post(`${this.apiUrl}vipcenter/userGroup/listUsers`,
          {
            bccPriceMax: this.endPrice,
            bccPriceMin: this.startPrice,
            brandName: this.brandSelect, // 品牌
            modelNo: this.productType, // 型号
          },)
          .then((response) => {
            // console.log(response);
            that.usertotal = response.data.data.total;
            if (response.data.isSuccess == true) {
              // let loadingInstance = Loading.service({ fullscreen: true });
              // that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              //   loadingInstance.close();
              // });
              that.load = false;
              that.$message({
                type: 'success',
                message: '操作成功'
              });
            } else {
              // let loadingInstance = Loading.service({ fullscreen: true });
              // that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              //   loadingInstance.close();
              // });
              that.load = false;
              that.$message(response.data.msg);
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
      }
    },
    last() {
      this.$router.go(-1);
    },
    updateDesc() { // 修改描述
      const that = this;
      axios.post(`${this.apiUrl}vipcenter/userGroup/updateUserGroup`,
        {
          desc: this.userGroupList.desc,
          id: this.id,
          status: this.userGroupList.status,
          userAccount: this.userGroupList.userAccount,
          userGroupName: this.userGroupList.userGroupName,
        })
        .then((response) => {
          // that.code=response.data.code
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
    // 型号筛选
    listProductInfo(queryString, cb) { // 搜索型号
      const _this = this;
      if (!queryString) {
        return;
      }
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
    addUser() { // 添加
      // Loading.service({ fullscreen: true });
      this.load = true;
      const that = this;
      axios.post(`${this.apiUrl}vipcenter/userGroup/addUsersToGroup`,
        {
          bccPriceMax: this.endPrice,
          bccPriceMin: this.startPrice,
          brandName: this.brandSelect, // 品牌
          modelNo: this.productType, // 型号
          groupId: this.id,
        },)
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
            that.getuserGroup();
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
    replaceSeller() { // 替换
      // Loading.service({ fullscreen: true });
      this.load = true;
      const that = this;
      axios.post(`${this.apiUrl}vipcenter/userGroup/replaceUsersToGroup`,
        {
          bccPriceMax: this.endPrice,
          bccPriceMin: this.startPrice,
          brandName: this.brandSelect, // 品牌
          modelNo: this.productType, // 型号
          groupId: this.id,
        },)
        .then((response) => {
          if (response.data.code == 0) {
            // let loadingInstance = Loading.service({ fullscreen: true });
            // that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            //   loadingInstance.close();
            // });
            that.load = false;
            that.$message({
              message: '替换成功',
              type: 'success'
            });
            that.getuserGroup();
          } else {
            // let loadingInstance = Loading.service({ fullscreen: true });
            // that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            //   loadingInstance.close();
            // });
            that.load = false;
            that.$message({
              message: '替换失败',
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
  },
  created() {
    this.id = this.$route.query.id;
    this.getuserGroup();
  },
  // watch: {
  //   radio(val) {
  //     if (val === '1') {
  //       this.disabledFlag2 = true;
  //       this.disabledFlag1 = false;
  //       this.input3='无';      //string
  //     } else {
  //       this.disabledFlag2 = false;
  //       this.disabledFlag1 = true;
  //       this.input2='0';     //int
  //     }
  //   },
  // }
};
</script>

<style scoped>
  .ceshi{
    width: 186px;
  }
  .money-Section{
    display: flex;
  }
  .zhi{
  margin-top: 7px;
  margin-left: 3px;
  margin-right: 3px;
}
.yuan{
  margin-top: 7px;
}
.gift-input{
  width: 183px;
  margin-right: 5px;
}
.dialogcheckscreen{
    line-height: 50px;
  }
  .sellerGroupList-desc{
    height: 80px;
    width: 250px;
    margin-top: -25px;
    margin-left: 20px;
    border: 1px solid #000;
  }
  .sellerGroupList-desc-info{
    height: 70px;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    overflow-y:auto;
  }
  .body{
    padding: 50px;
  }
  .current-direct-seller{
    display: flex;
  }
  .current-direct-seller-group{
    font-size: 20px;
  }
  .cx-content{
        width: 68%;
    }
  .ceshis{
    margin-left: 100px;
  }
  .search-input{
    width: 250px;
  }
  .group-info{
    font-size: 20px;
    margin-left: 20px;
    color: #409EFF;
  }
  .cx-title{
    margin-left: 105px;
  }
  .current-state{
    display: flex;
    margin-top: 30px;
  }
  .current-state-number{
    margin-left: 50px;
    width: 150px;
  }
  .inline-input{
    margin-left: 15px;
    width: 270px;
  }
  .el-col-5{
    width: 70%
  }
  .seller-number{
    margin-left: 5px;
    font-size: 30px;
    margin-top: -10px;
    color: red;
  }
  .describe{
    margin-left: 40px;
    width: 110px;
  }
  .describe-input{
    width: 300px;
    line-height: 50px;
    margin-left: 20px;
    margin-top: -13px;
  }
  .preservation{
    margin-top: -8px;
    margin-left: 30px;
    width: 150px;
    height: 40px;
  }
  .add-direct-seller{
    margin-top: 20px;
    height: 50px;
    width: 100%;
    border-bottom: 3px solid #ccc;
    font-size: 20px;
  }
  .add-current{
    display: flex;
    margin-top: 50px;
    margin-left: 20px;
  }
  .select-button{
    margin-left: 30px;
    margin-top: -10px;
    width: 150px;
  }
  .addradio{
    display: flex;
  }
  .screen-direct-seller{
    display: flex;
    margin-top: 50px;
    margin-left: 20px;
  }
  .screen-button{
    margin-left: 40px;
    width: 150px;
    margin-top: -2px;
    height: 40px;
  }
  .add-current-group{
    font-size: 18px;
    margin-left: 10px;
  }
  .screen-seller{
    font-size: 18px;
    margin-left: 10px;
  }
  .screenradio{
    display: flex;
  }
  .direct-seller-screen-condition{
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 80px;
    font-size: 18px;
    color: #ccc;
  }
  .screen-result{
    display: flex;
    margin-bottom: 20px;
    margin-left: 30px;
  }
  .screen-people-number{
    font-size: 20px;
    margin-top: -5px;
    color: red;
  }
  .add-to-current-group{
    margin-left: 30px;
    margin-right: 60px;
  }

.sellerGroup .el-checkbox{
      display: flex;
      line-height: 18px;
    }
.sellerGroup{
      padding: 15px 0;
      box-shadow: 1px 0px 1px 2px #ccc;
      width: 200px;
      overflow: hidden;
    }
.sellerGroup .el-checkbox{
      margin: 7px 0 0 25px;
    }
.select_sellerGroup_finish{
      margin: 10px 50% 0;
      transform: translate(-50%,0);
    }
    .channel[data-v-1a304e92]{
      padding-top:10px;
    }
    table tr td{
      padding: 8px !important;
    }
    table tr td .el-button .el-button--default{
      margin-left: 19px;
    }
    .product{
      width: 405px;
      border: 1px dotted #ccc;
      padding: 9px 9px;
    }
    .rightsDirectseller .gift-item {
        width: 480px;
        padding-right: 10px;
        margin-top: 5px;
        min-height: 20px;
    }
    .rightsDirectseller .gift-item>div{
        position: relative;
        width: 464px;
        padding: 10px 16px;
        background: #f5f5f5;
        margin: 10px 0;
    }
    .rightsDirectseller .ico-del {
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
</style>

<style>
  .rightsDirectseller .directSeller .el-dialog--small{width: 250px;}
  .rightsDirectseller .sellerGroup .el-checkbox__label{width:150px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
</style>
