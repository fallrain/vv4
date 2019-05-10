<template>
  <div class="fourtop" v-loading="load">
    <!-- <el-steps :active="4" align-center style="width: 900px;margin: 0 0 10px 50%;transform: translateX(-50%);">
      <el-step title="步骤1" description="选择发放场景"></el-step>
      <el-step title="步骤2" description="问卷配置"></el-step>
      <el-step title="步骤3" description="直销员和用户筛选"></el-step>
      <el-step title="步骤4" description="详情配置"></el-step>
      <el-step title="步骤5" description="奖励配置"></el-step>
      <el-step title="步骤6" description="配置成功"></el-step>
    </el-steps> -->
    <div class="rights-config-header-box">
      <div class="rights-config-header">
        <div class="header-title">
          <span>一站式调研配置</span>
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
        <div class="rights-config-step" style="margin-left:335px">
          <div class="step-index">
            <span>3</span>
          </div>
          <div class="step-title">
            <span>直销员和用户筛选</span>
          </div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step setted" style="margin-left:485px">
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

    <!-- <div class="header">
      <p class="template-brand">
        <i></i>一站式权益配置STEP 4 —— 详情配置
      </p>
    </div> -->
    <div class="headertop">
      <el-form v-model="date" style="min-width: 950px;">
        <div>
          礼品申请时间：
          <el-date-picker
            v-model="date.sendDate"
            style="min-width: 320px"
            type="date"
            :picker-options="pickerOptions0"
            placeholder="选择日期"
          >
          </el-date-picker>
          &nbsp;&nbsp;————&nbsp;&nbsp;
          <el-date-picker
            v-model="date.sendDateEnd"
            style="min-width: 320px"
            type="date"
            :picker-options="pickerOptions0"
            placeholder="选择日期"
            :disabled="noDate1"
          >
          </el-date-picker>
          <el-checkbox v-model="unlimitedSendDate" label="1">不限结束时间</el-checkbox>
        </div>

        <div class="day">
          上门调研时间：
          <el-date-picker
            v-model="date.useDate"
            style="min-width: 320px"
            type="date"
            :picker-options="pickerOptions0"
            placeholder="选择日期"
          >
          </el-date-picker>
          &nbsp;&nbsp;————&nbsp;&nbsp;
          <el-date-picker
            v-model="date.useDateEnd"
            style="min-width: 320px"
            type="date"
            :picker-options="pickerOptions0"
            placeholder="选择日期"
            :disabled="noDate2"
          >
          </el-date-picker>
          <el-checkbox v-model="unlimitedUseDate" label="2">不限结束时间</el-checkbox>
        </div>
      </el-form>

      <!-- 选择上传banner图片得方式 -->
      <div class="uploadBanner">
        <div class="upload">
          上传Banner方式：
          <el-radio style="margin-left: 20px;" v-model="uploadBannerRadio" label="1">上传Banner图片</el-radio>
          <el-radio v-model="uploadBannerRadio" label="2">上传Banner描述</el-radio>
        </div>
        <!-- 上传 -->
        <div class="upload" v-if="this.uploadBannerRadio == 1">
          上传Banner图片：
          <el-upload
            class="upload-demo"
            v-if="imgFlag"
            :action="this.apiUrl + 'vipcenter/upload/uploadCotentBannerImage'"
            :data="uploadData"
            list-type="picture-card"
            :on-success="onSuccess"
            :limit="1"
          >
            <!-- :before-upload="beforeAvatarUpload" 设置图片上传限制-->
            <i class="el-icon-plus"></i>
            <!-- <el-button class="upload-button" size="small" type="primary">点击上传</el-button> -->
          </el-upload>
          <div v-if="!imgFlag" class="bannerUpload">
            <img class="upload-img" :src="contentBannerImageUrl" @click="checkImgone" />
            <!-- <div class="upload-img-title">*{{title}}</div> -->
            <i class="el-icon-delete" @click="cancelimg"></i>
          </div>
          <div class="imglimit">*只能上传jpg/jpeg/png文件，尺寸800*400，且不能超过500KB</div>
        </div>
        <div class="upload" v-if="this.uploadBannerRadio == 2">
          上传Banner描述：
          <!-- <el-button type="primary" @click="uploadbanner">上传</el-button> -->
          <el-input
            type="textarea"
            :rows="6"
            v-model="uploadbannerinput"
            placeholder="请输入内容"
            class="uploadbannerinputbody"
          ></el-input>
        </div>
      </div>
      <!-- <el-dialog
          class="trs-dialog"
          title="上传banner图描述（800*400）"
          style="width: 100%;padding-right: 10%;"
          :visible.sync="uploadbannervisible"
          :modal-append-to-body='false'>
          <div class="upload-banner">
            <el-input type="textarea" :rows="18" v-model="uploadbannerinput" placeholder="请输入内容" class="uploadbannerinputbody"></el-input>
          </div>
        </el-dialog> -->
      <el-dialog
        class="trs-dialog"
        title="查看图片详情"
        style="width: 100%;padding-right: 10%;"
        :visible.sync="checkImgvisibleone"
        :modal-append-to-body="false"
      >
        <div class="dialog-body-checkimg">
          <img class="dialog-checkimg" :src="contentBannerImageUrl" />
        </div>
      </el-dialog>
      <!-- 上传banner详情 -->
      <div class="upload-Banner-Detail">
        <div class="upload">
          Banner详情上传：
          <el-radio style="margin-left: 20px;" v-model="uploadBannerDetailRadio" label="1">Banner详情图片</el-radio>
          <el-radio v-model="uploadBannerDetailRadio" label="2">Banner详情描述</el-radio>
        </div>
        <div class="upload" v-if="this.uploadBannerDetailRadio == 1">
          上传Banner详情：
          <el-upload
            class="upload-demo"
            :action="this.apiUrl + 'vipcenter/uploadfile/uploadBannerDetail'"
            v-if="imgFlagone"
            list-type="picture-card"
            :on-success="onSuccessone"
            :limit="1"
          >
            <i class="el-icon-plus"></i>
            <!-- <el-button class="upload-button" size="small" type="primary">点击上传</el-button> -->
          </el-upload>
          <div v-if="!imgFlagone" class="bannerUpload">
            <img class="upload-img" :src="bannerDetails" @click="checkImgtwo" />
            <!-- <div class="upload-img-title">*{{titleone}}</div> -->
            <i class="el-icon-delete" @click="cancelimgone"></i>
          </div>
          <div class="imglimit">*只能上传jpg/jpeg/png文件，宽度为800px，且不能超过2MB</div>
        </div>
        <div class="upload" v-if="this.uploadBannerDetailRadio == 2">
          Banner详情描述：
          <!-- <el-button type="primary" @click="uploadbannerdetails">上传</el-button> -->
          <el-input
            type="textarea"
            :rows="6"
            v-model="uploadbannerdetailsinput"
            placeholder="请输入内容"
            class="uploadbannerinputbody"
          ></el-input>
        </div>
      </div>
      <!-- <el-dialog
          class="trs-dialog"
          title="上传banner图详情描述（宽度800，高度不限）"
          style="width: 100%;padding-right: 10%;"
          :visible.sync="uploadbannerdetailsvisible"
          :modal-append-to-body='false'>
          <div class="upload-banner-details">
            <el-input type="textarea" :rows="18" v-model="uploadbannerdetailsinput" placeholder="请输入内容" class="uploadbannerinputbody"></el-input>
          </div>
        </el-dialog> -->
      <el-dialog
        class="trs-dialog"
        title="查看图片详情"
        style="width: 100%;padding-right: 10%;"
        :visible.sync="checkImgvisibletwo"
        :modal-append-to-body="false"
      >
        <div class="dialog-body-checkimg">
          <img class="dialog-checkimg" :src="bannerDetails" />
        </div>
      </el-dialog>
      <div class="upload-budget">
        上传预算审批：
        <el-upload
          class="upload-demo"
          :action="this.apiUrl + 'vipcenter/upload/uploadOrderRightsImage'"
          v-if="imgFlagtwo"
          list-type="picture-card"
          :data="uploadDatatwo"
          :on-success="onSuccesstwo"
          :limit="1"
        >
          <i class="el-icon-plus"></i>
          <!-- <el-button class="upload-button" size="small" type="primary">点击上传</el-button> -->
        </el-upload>
        <div v-if="!imgFlagtwo" class="bannerUpload">
          <img class="upload-img" :src="auditPics" @click="checkImgthree" />
          <!-- <div class="upload-img-title">*{{titletwo}}</div> -->
          <i class="el-icon-delete" @click="cancelimgtwo"></i>
        </div>
        <div class="imglimit">*只能上传jpg/jpeg/png文件</div>
      </div>
      <el-dialog
        class="trs-dialog"
        title="查看图片详情"
        style="width: 100%;padding-right: 10%;"
        :visible.sync="checkImgvisiblethree"
        :modal-append-to-body="false"
      >
        <div class="dialog-body-checkimg">
          <img class="dialog-checkimg" :src="auditPics" />
        </div>
      </el-dialog>
      <div class="relation">
        资源位关联：
        <el-select class="select" v-model="sourcevalue" placeholder="请选择" @visible-change="selectChange">
          <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id"> </el-option>
        </el-select>
      </div>
      <!-- 投入预算 -->
      <div class="budget">
        投入总预算：
        <el-input
          class="vipinput"
          v-model="budgetinput"
          type="number"
          placeholder="请输入预算（只能输入数字）"
          :maxlength="9"
        >
        </el-input>
        <!-- <div class="limit">*积分中心剩余预算：</div>
          <div class="budget-text">{{this.remainmoney}}元</div> -->
      </div>
      <el-button class="btm" type="primary" @click="last">上一步</el-button>
      <el-button class="but" type="primary" @click="handleClickNext">配置下一步</el-button>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import Qs from 'qs';

export default {
  name: 'rightsconfigrutionfour',
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        } // 设置选择今天以及今天之后的日期
      },
      // 发放日期和使用日期
      date: {
        sendDate: '',
        sendDateEnd: '',
        useDate: '',
        useDateEnd: ''
      },
      uploadBannerRadio: '1',
      uploadBannerDetailRadio: '1',
      noDate1: false,
      noDate2: false,
      unlimitedSendDate: false,
      unlimitedUseDate: false,
      checkImgvisibleone: false,
      checkImgvisibletwo: false,
      checkImgvisiblethree: false,
      uploadbannervisible: false, // banner描述弹框
      uploadbannerdetailsvisible: false, // banner详情描述弹框
      uploadbannerinput: '', // banner描述
      uploadbannerdetailsinput: '', // banner详情描述
      options: [],
      value: '',
      budgetinput: '',
      bannerDetails: '',
      auditPics: '',
      remainmoney: '',
      titletwo: '',
      titleone: '',
      title: '',
      sourcevalue: '', // 资源位
      photoLink: '', // 礼品描述 photoLink
      productCode: '', // productCode
      productName: '',
      imgFlag: true,
      imgFlagone: true,
      imgFlagtwo: true,
      needScore: '',
      load: false,

      successcode: '',
      errorcode: '',
      contentBannerImageUrl: '',
      orderRightsImageUrl: '',
      uploadData: {
        columnId: 3
      },
      // uploadDataone: {
      //   "columnId": 4
      // },
      uploadDatatwo: {
        columnId: 3
      }
    };
  },
  methods: {
    last() {
      const storage = window.localStorage;
      const storageObj = {
        auditPics: this.auditPics,
        bannerDetails: this.bannerDetails,
        bannerImageUrl: this.contentBannerImageUrl,
        giftConfigBudget: this.budgetinput, // 投入预算
        id: this.id,
        startTime: this.date.useDate,
        unlimitedSendDate: this.unlimitedSendDate, // 发放时间
        endTime: this.date.useDateEnd,
        sendStartTime: this.date.sendDate,
        unlimitedUseDate: this.unlimitedUseDate, // 使用时间
        sendEndTime: this.date.sendDateEnd,
        sourceId: this.sourcevalue, // 资源位id，来源于资源位请求id
        options: this.options,
        bannerSign: this.uploadBannerRadio,
        bannerDetailSign: this.uploadBannerDetailRadio,
        bannerDesc: this.uploadbannerinput,
        bannerDetailDesc: this.uploadbannerdetailsinput
      };
      const storageFour = JSON.stringify(storageObj);
      storage.setItem('storageFour', storageFour);
      this.$router.push({ path: '/dbOperate/rightsconfigrutionthree', query: { id: this.id } });
      // this.$router.go(-1)
      // alert(this.date.sendDate);
      // alert(this.date.sendDateEnd);
      // alert(this.date.useDate);
      // alert(this.date.useDateEnd);
    },
    handleClickNext() {
      // if(this.budgetinput>this.remainmoney){
      //   this.$message('积分中心剩余预算不足，请重新输入投入总预算');
      //   return
      // }
      // 发放有效期和使用有效期
      const d1 = new Date(this.date.sendDate).getTime();
      const d2 = new Date(this.date.sendDateEnd).getTime();
      const d3 = new Date(this.date.useDate).getTime();
      const d4 = new Date(this.date.useDateEnd).getTime();
      const d = new Date().getTime();
      if (d1 > d2) {
        this.$message('礼品申请结束时间不能早于礼品申请开始时间');
        return;
      }
      if (d3 > d4) {
        this.$message('上门调研结束时间不能早于上门调研开始时间');
        return;
      }
      if (d1 > d3) {
        this.$message('上门调研时间不能早于礼品申请时间');
        return;
      }
      if (d4 < d2) {
        this.$message('上门调研结束时间不能早于礼品申请结束时间');
        return;
      }
      if (this.unlimitedSendDate == true) {
        var sendDateSign = 2;
        if (this.date.sendDate.length < 1) {
          this.$message('请选择发放开始日期！');
        } else {
          this.date.sendDate = this.formatDate(d1); // nn-yy-rr
        }
        this.date.sendDateEnd = '';
      } else {
        var sendDateSign = 1;
        this.date.sendDate = this.formatDate(d1); // nn-yy-rr
        this.date.sendDateEnd = this.formatDate(d2); // nn-yy-rr
      }
      if (this.unlimitedUseDate == true) {
        var dateSign = 2;
        if (this.date.useDate.length < 1) {
          this.$message('请选择使用开始日期！');
        } else {
          this.date.useDate = this.formatDate(d3); // nn-yy-rr
        }
        this.date.useDateEnd = '';
      } else {
        var dateSign = 1;
        this.date.useDate = this.formatDate(d3); // nn-yy-rr
        this.date.useDateEnd = this.formatDate(d4); // nn-yy-rr
      }
      // Loading.service({ fullscreen: true });
      this.load = true;
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/rightEdit/updateOnestopFour`, {
          auditPics: this.auditPics,
          bannerDetails: this.bannerDetails,
          bannerImageUrl: this.contentBannerImageUrl,
          giftConfigBudget: this.budgetinput,
          id: this.id,
          sourceType: 1,
          startTime: this.date.useDate,
          endTime: this.date.useDateEnd,
          sendStartTime: this.date.sendDate,
          sendEndTime: this.date.sendDateEnd,
          sourceId: this.sourcevalue, // 资源位id，来源于资源位请求id
          bannerSign: this.uploadBannerRadio,
          bannerDetailSign: this.uploadBannerDetailRadio,
          bannerDesc: this.uploadbannerinput,
          bannerDetailDesc: this.uploadbannerdetailsinput
        })
        .then((response) => {
          // console.log(response);
          if (response.data.isSuccess == true) {
            // alert(response.data.msg);
            // let loadingInstance = Loading.service({ fullscreen: true });
            // that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            //   loadingInstance.close();
            // });
            that.load = false;
            const storage = window.localStorage;
            const storageObj = {
              auditPics: that.auditPics,
              bannerDetails: that.bannerDetails,
              bannerImageUrl: that.contentBannerImageUrl,
              giftConfigBudget: that.budgetinput, // 投入预算
              id: that.id,
              startTime: that.date.useDate,
              unlimitedSendDate: that.unlimitedSendDate, // 发放时间
              endTime: that.date.useDateEnd,
              sendStartTime: that.date.sendDate,
              unlimitedUseDate: that.unlimitedUseDate, // 使用时间
              sendEndTime: that.date.sendDateEnd,
              sourceId: that.sourcevalue, // 资源位id，来源于资源位请求id
              options: that.options,
              bannerSign: that.uploadBannerRadio,
              bannerDetailSign: that.uploadBannerDetailRadio,
              bannerDesc: that.uploadbannerinput,
              bannerDetailDesc: that.uploadbannerdetailsinput
            };
            const storageFour = JSON.stringify(storageObj);
            storage.setItem('storageFour', storageFour);
            that.$message({
              message: '提交成功',
              type: 'success',
              duration: 1000
            });
            that.$router.push({ path: '/dbOperate/rightsconfigrutionfive', query: { id: that.id } });
          } else {
            // let loadingInstance = Loading.service({ fullscreen: true });
            //   that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            //     loadingInstance.close();
            //   });
            // alert(response.data.msg);
            that.load = false;
            that.$message({
              message: response.data.msg,
              type: 'error',
              duration: 2000
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
    },
    formatDate(value) {
      if (isNaN(value)) {
        // this.$message({
        //   type: 'error',
        //   message: '请输入正确的日期!'
        // })
        return;
      }
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
      const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
      return `${year}-${month}-${day}`;
    },
    cancelimg() {
      this.imgFlag = true;
      this.contentBannerImageUrl = '';
    },
    cancelimgone() {
      this.imgFlagone = true;
      this.bannerDetails = '';
    },
    cancelimgtwo() {
      this.imgFlagtwo = true;
      this.auditPics = '';
    },
    selectChange() {
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/getVipSourceListBysourceType`, {
          pageNo: 1,
          pageSize: 10,
          sourceType: 1 // 资源位id，来源于资源位请求id
        })
        .then((response) => {
          // console.log(response);
          that.options = response.data.data.entities;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSuccess(response, file, fileList) {
      const params = {
        columnId: 3,
        file
      };
      // console.log(response);
      this.imgFlag = false;
      if (response.isSuccess == true) {
        this.$message({
          message: '上传成功!',
          type: 'success',
          duration: 4000
        });
        this.contentBannerImageUrl = response.data.contentBannerImageUrl;
        this.title = response.data.title;
      } else {
        this.$message({
          message: response.msg,
          type: 'warning',
          duration: 4000
        });
      }
    },
    // 获取用户剩余积分
    getRemainMoney() {
      const that = this;
      axios({
        url: `${this.apiUrl}vipcenter/rightEdit/getRemainMoney`,
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
          type: 1
        }
      })
        .then((response) => {
          if (response.data.isSuccess == true) {
            that.remainmoney = response.data.data;
          } else {
            that.remainmoney = 0;
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
    // 查看图片详情
    checkImgone() {
      this.checkImgvisibleone = true;
    },
    checkImgtwo() {
      this.checkImgvisibletwo = true;
    },
    checkImgthree() {
      this.checkImgvisiblethree = true;
    },
    // 上传banner图描述
    // uploadbanner(){
    //   this.uploadbannervisible=true;
    // },
    // uploadbannerdetails(){
    //   this.uploadbannerdetailsvisible=true;
    // },
    //   beforeAvatarUpload(file) {
    //     var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
    //     const extension = testmsg === 'jpg'
    //     const extension2 = testmsg === 'jpeg'
    //     const extension3 = testmsg === 'png'
    //     const isLt2M = file.size / 1024 / 1024 < 0.5
    //     if(!extension && !extension2 && !extension3) {
    //       this.$message({
    //         message: '上传文件只能是 jpg、jpeg、png格式!',
    //         type: 'warning',
    //         duration:2000
    //       });
    //     }
    //     if(!isLt2M) {
    //       this.$message({
    //         message: '上传文件大小不能超过 500KB!',
    //         type: 'warning',
    //         duration:2000
    //       });
    //     }
    //     return extension || extension2 || extension3 && isLt2M
    // },
    // beforeAvatarUploadone(file){
    //   var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
    //   const extension = testmsg === 'jpg'
    //   const extension2 = testmsg === 'jpeg'
    //   const extension3 = testmsg === 'png'
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //   if(!extension && !extension2 && !extension3) {
    //     this.$message({
    //       message: '上传文件只能是 jpg、jpeg、png格式!',
    //       type: 'warning',
    //       duration:2000
    //     });
    //   }
    //   if(!isLt2M) {
    //     this.$message({
    //       message: '上传文件大小不能超过 2MB!',
    //       type: 'warning',
    //       duration:2000
    //     });
    //   }
    //   return extension || extension2 || extension3 && isLt2M
    // },
    // beforeAvatarUploadtwo(file) {
    //   var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
    //   const extension = testmsg === 'jpg'
    //   const extension2 = testmsg === 'jpeg'
    //   const extension3 = testmsg === 'png'
    //   // const isLt2M = file.size / 1024 / 1024 < 15
    //   if(!extension && !extension2 && !extension3) {
    //     this.$message({
    //       message: '上传文件只能是 jpg、jpeg、png格式!',
    //       type: 'warning',
    //       duration:2000
    //     });
    //   }
    //   // if(!isLt2M) {
    //   //   this.$message({
    //   //     message: '上传文件大小不能超过 15MB!',
    //   //     type: 'warning',
    //   //     duration:2000
    //   //   });
    //   // }
    //   // return extension || extension2 || extension3 && isLt2M
    //   return extension || extension2 || extension3
    // },
    onSuccessone(response, file, fileList) {
      const params = {
        file
      };
      console.log(response);
      this.imgFlagone = false;
      if (response.isSuccess == true) {
        this.$message({
          message: '上传成功!',
          type: 'success',
          duration: 3000
        });
        this.bannerDetails = response.data.bannerDetailUrl;
        this.titleone = response.data.title;
      } else {
        this.$message({
          message: response.msg,
          type: 'warning',
          duration: 4000
        });
      }
    },
    onSuccesstwo(response, file, fileList) {
      const params = {
        columnId: 3,
        file
      };
      // console.log(response);
      this.imgFlagtwo = false;
      if (response.isSuccess == true) {
        this.$message({
          message: '上传成功!',
          type: 'success',
          duration: 3000
        });
        this.auditPics = response.data.orderRightsImageUrl;
        this.titletwo = response.data.title;
      } else {
        this.$message({
          message: response.msg,
          type: 'warning',
          duration: 3000
        });
      }
    }
  },
  mounted() {
    // this.id = this.$route.query.id;
    const storage = window.localStorage;
    if (storage.storageFour) {
      let { storageFour } = storage;
      storageFour = JSON.parse(storageFour);
      this.date.sendDate = storageFour.sendStartTime; // 发放开始时间
      this.date.sendDateEnd = storageFour.sendEndTime; // 发放结束时间
      this.unlimitedSendDate = storageFour.unlimitedSendDate; // 是否限制发放有效时间
      this.date.useDate = storageFour.startTime; // 使用开始时间
      this.date.useDateEnd = storageFour.endTime; // 使用结束时间
      this.unlimitedUseDate = storageFour.unlimitedUseDate; // 是否限制使用有效时间
      this.auditPics = storageFour.auditPics;
      this.bannerDetails = storageFour.bannerDetails;
      this.contentBannerImageUrl = storageFour.bannerImageUrl;
      this.budgetinput = storageFour.giftConfigBudget;
      this.imgFlag = false;
      this.sourcevalue = storageFour.sourceId; // 资源位
      this.options = storageFour.options;
      this.imgFlagone = false;
      this.imgFlagtwo = false;
      this.uploadBannerRadio = storageFour.bannerSign;
      this.uploadbannerinput = storageFour.bannerDesc;
      this.uploadBannerDetailRadio = storageFour.bannerDetailSign;
      this.uploadbannerdetailsinput = storageFour.bannerDetailDesc;
    }
    if (this.auditPics === '') {
      this.imgFlag = true;
    }
    if (this.bannerDetails === '') {
      this.imgFlagone = true;
    }
    if (this.contentBannerImageUrl === '') {
      this.imgFlagtwo = true;
    }
  },
  watch: {
    unlimitedSendDate() {
      if (this.unlimitedSendDate) {
        this.date.sendDateEnd = '';
        this.noDate1 = true;
      } else {
        this.noDate1 = false;
      }
    },
    unlimitedUseDate() {
      if (this.unlimitedUseDate) {
        this.date.useDateEnd = '';
        this.noDate2 = true;
      } else {
        this.noDate2 = false;
      }
    },
    uploadBannerRadio(val) {
      if (val === '1') {
        this.uploadbannerinput = '';
      } else {
        this.imgFlag = true;
        this.contentBannerImageUrl = '';
      }
    },
    uploadBannerDetailRadio(val) {
      if (val === '1') {
        this.uploadbannerdetailsinput = '';
      } else {
        this.imgFlagone = true;
        this.bannerDetails = '';
      }
    }
  },
  created() {
    this.id = this.$route.query.id;
    // this.getRemainMoney();
  }
};
</script>

<style scoped>
/*.xiaowei .el-dialog*/
.fourtop {
  padding: 20px;
}
.rights-config-header-box {
  margin-bottom: 30px;
}
.day {
  padding-top: 20px;
}
.headertop {
  margin-left: 50px;
}
.bannerUpload {
  margin-left: 20px;
  width: 200px;
  height: 100px;
  border: 1px solid #ccc;
  display: flex;
}
.upload-img {
  width: 80%;
  padding: 10px;
}
.upload-img-title {
  margin-top: 30px;
  margin-left: 10px;
  font-size: 12px;
  width: 50%;
  color: #6c6c6c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.limit {
  margin-left: 60px;
  margin-top: 10px;
  font-size: 12px;
}
.imglimit {
  margin-left: 100px;
  margin-top: 10px;
  font-size: 12px;
}
.budget-text {
  margin-top: 6px;
  color: #ff2d2d;
  font-size: 16px;
}
.shaixuanlimit {
  margin-left: 10px;
  font-size: 10px;
  color: red;
}
.addgift {
  margin-left: 18px;
  color: white;
  width: 150px;
  background-color: #409eff;
}
.addgift-img {
  width: 60px;
  height: 60px;
}
.info {
  width: 100%;
  position: relative;
}
.info-title {
  margin-left: 20px;
  font-size: 12px;
  color: #000000;
  width: 200px;
  /*height: 18px;*/
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.info-body {
  margin-left: 20px;
  font-size: 10px;
  margin-top: 5px;
  color: #ccc;
}
.info-money {
  margin-left: 20px;
  font-size: 10px;
  margin-top: 5px;
  color: #ccc;
}
.addgift-but {
  width: 50px;
  background: #409eff;
  color: white;
  height: 30px;
  position: fixed;
  margin-left: 30%;
  margin-top: 15px;
  border-radius: 5px;
}
.gitf-input {
  width: 50px;
  height: 25px;
  margin-top: 19px;
  position: fixed;
  margin-left: 22%;
}
.clickupload {
  margin-left: 20px;
  width: 100px;
}
.choice {
  padding-top: 20px;
  margin-left: 16px;
}
.upload {
  padding-top: 20px;
  display: flex;
  line-height: 40px;
}
.upload-button {
  margin-left: 20px;
}
.upload-budget {
  padding-top: 20px;
  margin-left: 38px;
  display: flex;
  line-height: 40px;
}
.relation {
  padding-top: 20px;
  margin-left: 52px;
}
.select {
  margin-left: 14px;
  width: 182px;
}
.budget {
  padding-top: 20px;
  margin-left: 52px;
  display: flex;
}
.vipinput {
  margin-left: 18px;
}
.bottom {
  height: 270px;
  background: #f0f0f0;
  margin: 60px 120px 20px 30px;
}
.bottom-text {
  margin-top: 20px;
  font-size: 14px;
  display: flex;
  justify-content: center; /*display: flex 水平居中   垂直居中是：align-items: center;*/
}
.textred {
  color: red;
}
.upload-banner {
  width: 800px;
  height: 400px;
  background: #d0d0d0;
}
.upload-banner-details {
  width: 800px;
  background: #d0d0d0;
}
.mode {
  margin-left: 40px;
  padding-top: 20px;
}
.btm {
  width: 10%;
  margin-left: 300px;
  margin-top: 30px;
  margin-right: 50px;
}
.but {
  width: 20%;
}
.el-icon-delete {
  margin-top: 40px;
  margin-left: 10px;
  font-size: 20px;
  color: #ccc;
  cursor: pointer;
}
.el-icon-delete:hover {
  color: #409eff;
}
.giftNumInput {
  width: 55px;
  margin-right: 5px;
}
.giftNumInput input {
  height: 30px;
  line-height: 30px;
}
.sendThis {
  background-color: #20a0ff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
}
.dialog-body-checkimg {
  width: 100%;
  margin-bottom: 10px;
  flex-wrap: wrap;
  overflow-y: auto;
}
.sendThis:hover {
  background: #4db3ff;
  border-color: #4db3ff;
  color: #fff;
}
.fourtop .budget .el-input {
  width: 182px !important;
}
.fourtop .select[data-v-83e08e74] {
  width: 182px !important;
}
.fourtop .rights-config-step .step-title {
  width: 123px;
  background: #e2e2e2;
  z-index: 1;
  margin-top: 6px;
  color: #252525;
  margin-left: 8px;
}
.fourtop .rights-config-step .step-index {
  width: 30px;
  background: #cecece;
  font-size: 12px;
  color: #252525;
  font-weight: bold;
  z-index: 2;
  text-align: center;
  line-height: 30px;
}
.fourtop .rights-config-header {
  transform: skewX(-45deg);
  background: #e0f0ff;
  /*width: 1000px;*/
  width: 1133px;
  margin-left: -75px;
}
.fourtop .rights-config-header .step-bg {
  width: 74px;
  margin-top: 16px;
  background: #fff;
  margin-left: 65px;
}
.fourtop .vip-head-tool {
  margin-top: 30px;
}
.fourtop .rights-config-step .step-title span {
  transform: skewX(45deg);
  font-size: 10px;
  display: block;
  line-height: 30px;
  text-align: center;
  padding-left: 20px;
}
.fourtop .rights-config-step.setted .step-index {
  background: #196acf;
  color: #fff;
}
.fourtop .rights-config-step.setted .step-title {
  background: #45a0f8;
  color: #fff;
  margin-left: 10px;
  width: 123px;
}
.fourtop .rights-config-step .step-index span {
  font-size: 12px;
}
.fourtop .header-title {
  padding-left: 35px;
}
.fourtop .uploadbannerinputbody {
  width: 600px;
  margin-left: 20px;
}
.uploadBanner {
  padding-left: 20px;
  margin-top: 20px;
  width: 820px;
  padding-bottom: 20px;
  border: 1px solid #ccc;
}
.upload-Banner-Detail {
  padding-left: 20px;
  margin-top: 20px;
  width: 820px;
  padding-bottom: 20px;
  border: 1px solid #ccc;
}
</style>
<style>
.fourtop .el-upload {
  margin-left: 20px;
}
.fourtop .el-button {
  border: 1px solid #409eff !important;
}
.fourtop .el-button:hover {
  background: #4db3ff !important;
  border-color: #4db3ff !important;
  color: #fff !important;
}
.fourtop .el-button--primary.is-plain {
  background: #409eff;
  color: #fff;
}

.fourtop .el-dialog--small {
  width: auto;
}
/*  .fourtop .upload[data-v-83e08e74]{
    line-height: 135px;
  }
  .fourtop .upload-budget[data-v-83e08e74]{
    line-height: 135px;
  }*/
/*  .fourtop .rights-config-step .step-title {
        width: 123px;
        background: #e2e2e2;
        z-index: 1;
        margin-top: 6px;
        color: #252525;
        margin-left: 8px;
    }
    .fourtop .rights-config-step .step-index {
    width: 30px;
    background: #cecece;
    font-size: 21px;
    color: #252525;
    font-weight: bold;
    z-index: 2;
    text-align: center;
    line-height: 30px;
}
.fourtop .rights-config-header {
    transform: skewX(-45deg);
    background: #e0f0ff;
    /*width: 1000px;*/
/*width: 100%;
    margin-left: -45px;
}
.fourtop .rights-config-step .step-title span{
  font-size: 10px;
}*/
</style>
