<template>
  <div class="rightsconfigurtion">
    <div class="vip-content">
      <div class="rights-config-header-box">
        <div class="rights-config-header">
          <div class="header-title">
            <span>一站式调研配置</span>
          </div>
          <div class="rights-config-step setted" style="margin-left:35px">
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

      <!--     <div class="vip-head-tool">
          <p class="template-brand">
              <i></i>一站式权益配置STEP 1 —— 选择发放场景
          </p>
          <div class="clear"></div>
      </div> -->
      <div class="vip-body">
        <div class="vip-body-title">发放场景：</div>
        <el-select v-model="scene" @change="changeSelect" placeholder="请选择场景" class="vip-body-select">
          <el-option v-for="item in options" :label="item.name" :value="item.id"> </el-option>
        </el-select>
        <div class="serviceFlowDesc" v-if="serviceFlowDesc">*场景描述：{{ serviceFlowDesc }}</div>
      </div>

      <div class="survey-title">
        <span class="survey-title-name">活动名称：</span>
        <el-input
          placeholder="例如：冰箱产业调研"
          class="title-content"
          v-model="surveyTitle"
          :maxlength="40"
        ></el-input>
        <span style="margin-left: 20px;">*将作为调研活动名称</span>
      </div>
      <button class="vip-body-submit" @click="nextStep">提交并继续</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'rightsconfigrution',
  data() {
    return {
      scene: '',
      options: [],
      surveyTitle: '',
      titleDesc: null,
      sceneUrl: '',
      serviceFlowDesc: ''
    };
  },
  methods: {
    changeSelect() {
      const that = this;
      axios
        .post(
          `${this.apiUrl}vipcenter/vipUserManageConfigModel/getVipConfigModelDetail`,
          qs.stringify({
            id: this.scene
          })
        )
        .then((response) => {
          if (response.data.isSuccess == true) {
            that.titleDesc = response.data.data.title;
            that.sceneUrl = response.data.data.url;
            that.serviceFlowDesc = response.data.data.serviceFlowDesc;
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    nextStep() {
      /**
       * Title:
       * Description:将问卷名称“surveyTitle”传入下一个页面
       * Copyright: 2018 惠州巨合电子商务有限公司 版权所有.保留所有权
       * Company:惠州巨合电子商务有限公司(JH)
       * Project:
       * Author: bella
       * Create Time:2018/11/16 9:57
       */

      const that = this;
      if (this.scene == '' || this.scene == undefined || this.scene == null) {
        this.$message({
          type: 'warning',
          message: '请选择权益券发放场景'
        });
        return;
      }
      const surveyName = this.surveyTitle.replace(/(^\s*)|(\s*$)/g, '');
      if (surveyName == '' || surveyName == undefined || surveyName == null) {
        this.$message({
          type: 'warning',
          message: '请输入标题'
        });
        return;
      }

      const storage = window.localStorage;
      const storageObj = {
        scene: that.scene,
        surveyTitle: that.surveyTitle,
        titleDesc: that.titleDesc,
        serviceFlowDesc: that.serviceFlowDesc
      };
      const storageOne = JSON.stringify(storageObj);
      storage.setItem('storageOne', storageOne);

      this.$router.push({
        path: '/dbOperate/rightsconfigrutiontwo',
        query: { surveyName, scene: this.scene }
      });

      // axios.post(this.apiUrl + 'vipcenter/vipUserManageConfigModel/getVipConfigModelList', {
      //       xxx:xxx
      //     })
      // .then(function (response) {
      //   console.log(response);
      //     if(response.data.isSuccess){
      //         that.
      //     }else{
      //       that.$message({
      //         type:"error",
      //         message:response.data.msg
      //       })
      //     }
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    }
  },
  created() {
    const that = this;
    const params = {
      pageNo: 1,
      pageSize: 10
    };
    axios
      .post(
        `${this.apiUrl}vipcenter/vipUserManageConfigModel/getVipConfigModelList`,
        {
          pageNo: 1,
          pageSize: 100
        },
        { headers: { 'Content-Type': 'application/json;charset=utf-8' } }
      )
      .then((response) => {
        const { data } = response;
        if (data.isSuccess) {
          that.options = response.data.data.entities;
        } else {
          that.$message({
            type: 'error',
            message: response.data.msg
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    const storage = window.localStorage;
    if (storage.storageOne) {
      let { storageOne } = storage;
      storageOne = JSON.parse(storageOne);
      this.scene = storageOne.scene;
      this.surveyTitle = storageOne.surveyTitle;
      this.titleDesc = storageOne.titleDesc;
      this.serviceFlowDesc = storageOne.serviceFlowDesc;
    }
  }
};
</script>

<style scoped>
.vip-content {
  padding: 20px;
  box-sizing: border-box;
}
.vip-body {
  display: flex;
  margin: 25px 50px;
  margin-top: 50px;
}
.vip-body-title {
  font-size: 16px;
  height: 36px;
  line-height: 36px;
}
.vip-body-select {
  width: 240px;
}
.vip-body-select input {
  /*width: 240px;*/
}
.vip-body-submit {
  width: 200px;
  height: 40px;
  border-radius: 8px;
  background-color: #20a0ff;
  color: white;
  font-size: 16px;
  margin: 10px 120px;
  border: none;
}
.vip-body-submit:hover {
  background-color: rgba(32, 160, 255, 0.8);
}
.survey-title {
  margin: 25px 0 25px 100px;
}
.survey-title-name {
  height: 36px;
  display: inline-block;
  line-height: 36px;
  margin-right: 0;
  margin-left: -50px;
  font-size: 16px;
}
.title-content {
  width: 240px;
  margin-left: -3px;
}
.serviceFlowDesc {
  font-size: 14px;
  margin-left: 25px;
  line-height: 36px;
  /*color: #bbb;*/
}
.rightsconfigurtion .rights-config-step .step-title {
  width: 123px;
  background: #e2e2e2;
  z-index: 1;
  margin-top: 6px;
  color: #252525;
  margin-left: 8px;
}
.rightsconfigurtion .rights-config-step .step-index {
  width: 30px;
  background: #cecece;
  font-size: 12px;
  color: #252525;
  font-weight: bold;
  z-index: 2;
  text-align: center;
  line-height: 30px;
}
.rightsconfigurtion .rights-config-header {
  transform: skewX(-45deg);
  background: #e0f0ff;
  /*width: 1000px;*/
  width: 1133px;
  /*margin-left: -45px;*/
}
.rightsconfigurtion .rights-config-header .step-bg {
  width: 74px;
  margin-top: 16px;
  background: #fff;
  margin-left: 65px;
}
.rightsconfigurtion .vip-head-tool {
  margin-top: 30px;
}
.rightsconfigurtion .rights-config-step .step-title span {
  transform: skewX(45deg);
  font-size: 10px;
  display: block;
  line-height: 30px;
  text-align: center;
  padding-left: 20px;
}
.rightsconfigurtion .rights-config-step.setted .step-index {
  background: #196acf;
  color: #fff;
}
.rightsconfigurtion .rights-config-step.setted .step-title {
  background: #45a0f8;
  color: #fff;
  margin-left: 10px;
  width: 123px;
}
.rightsconfigurtion .rights-config-step .step-index span {
  font-size: 12px;
}
</style>
