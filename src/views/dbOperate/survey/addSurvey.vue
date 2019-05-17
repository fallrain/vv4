<template>
  <div class="addSurvey" v-loading="load">
    <div class="top">
      <div class="header">
        <p class="template-brand">
          <i></i>调研基本配置
          <div class="headertop">
            <div class="name">调研名称：
              <el-input class="name-input" v-model="surveyName" type="type"  placeholder="请输入调研名称"></el-input>
              <!-- <div class="photo-text">*该名称展示在直销员前端资源位</div> -->
            </div>

            <el-form v-model="date">
              <div class="effect-time">活动有效期：
                <el-date-picker
                style="min-width: 320px"
                v-model="date.sendDate"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions0"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="changeStartTime">
              </el-date-picker>
               &nbsp;&nbsp;————&nbsp;&nbsp;
              <el-date-picker
                style="min-width: 320px"
                v-model="date.sendDateEnd"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions0"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="changeEndTime">
              </el-date-picker>
              </div>
            </el-form>

            <div class="target-describe">调查目标描述：
              <el-input class="describe" v-model="surveyDesc" placeholder="请输入调查目标的描述"></el-input>
            </div>
            <div class="priority">优先级：
              <el-input class="priority-input" type="number" v-model="priority" :maxlength="3"></el-input>
              <div class="photo-text">*数字越小位置越靠前，同一数字配置时间越晚优先级越高</div>
            </div>
            <div class="resources">资源位：
              <el-select class="resources-select" v-model="resourcesvalue" placeholder="请选择" @visible-change="selectChange">
                <el-option
                  v-for="item in states"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                  >
                </el-option>
              </el-select>
                                    <!-- dialogTableVisible = true -->
              <!-- <el-button>预览资源位</el-button> -->
              <el-button class="preview" type="text" @click="previewResources">
                预览资源位
              </el-button>
              <el-dialog
                class="trs-dialog"
                title="预览"
                style="width: 100%;padding-right: 10%;"
                :visible.sync="dialogTableVisible"
                :modal-append-to-body='false'>

                <div class="dialog-body-top">
                  <div class="dialog-top"><div class="bcg"></div> 实物礼品</div>
                  <div class="card-info">
                    <div class="card-info-img" v-for="(item,index) in states" :key="index">
                      <img class="card-img" :src="item.icon" />
                      <div class="txt">{{item.name}}</div>
                    </div>
                  </div>
                </div>
                <div class="dialog-body-bottom">
                  <div class="dialog-bottom"><div class="bcg"></div>卡券礼品</div>
                  <div class="realgift-info">
                    <div class="realgift-info-img" v-for="site in sites">
                      <img class="realgift-img" :src="site.img" />
                      <div class="txt">{{site.name}}</div>
                    </div>
                  </div>
                </div>
              </el-dialog>
            </div>

            <div class="upload">上传Banner图片：
            <el-upload
              class="upload-demo"
              v-if="imgFlag"
              :action="this.apiUrl+ 'vipcenter/upload/uploadCotentBannerImage'"
              :data="uploadData"
              list-type="picture-card"
              :on-success="onSuccess"
              :limit="1"
              >
              <!-- :before-upload="beforeAvatarUpload"  设置图片上传限制 -->
              <i  class="el-icon-plus"></i>
              <!-- <el-button class="upload-button" size="small" type="primary">点击上传</el-button> -->
            </el-upload>
            <div v-if="!imgFlag" class="bannerUpload">
              <img class="upload-img" :src="contentBannerImageUrl" @click="checkImg">
              <i class="el-icon-delete"  @click="cancelimg"></i>
              <!-- <div class="upload-img-title">*{{title}}</div> -->
            </div>
            <div class="limit">*只能上传jpg/jpeg/png文件，且不能超过500KB，尺寸800*400</div>
          </div>
            <el-dialog
              class="trs-dialog"
              title="查看图片详情"
              style="width: 100%;padding-right: 10%;"
              :visible.sync="checkImgvisible"
              :modal-append-to-body='false'>
              <div class="dialog-body-checkimg">
                <img class="dialog-checkimg" :src="contentBannerImageUrl">
              </div>
            </el-dialog>
            <el-button class="cancel" @click="cancelClick">取消</el-button>
            <el-button class="preservation" @click="preservationClick">保存草稿</el-button>
            <el-button class="next-step" type="primary" @click="nextstepClick">下一步</el-button>
          </div>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import Qs from 'qs';

export default {
  name: 'addsurvey',
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        } // 设置选择今天以及今天之后的日期
      },
      date: {
        sendDate: '',
        sendDateEnd: '',
      },
      // options: [],//卡券
      sites: [],
      states: [],
      resourcesvalue: '',
      value: '',
      title: '',
      uploadData: {
        columnId: 3
      },
      dialogVisible: false,
      checkImgvisible: false,
      contentBannerImageUrl: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      imgFlag: true,
      surveyList: [],
      surveyName: '',
      surveyDesc: '',
      priority: '',
      resourceId: 0,
      load: false,
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    getOnestopQuestionnaireConfigById() {
      const that = this;
      axios({
        url: `${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/getOnestopQuestionnaireConfigById`,
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
      })
        .then((response) => {
          // console.log(response);
          that.imgFlag = false;
          that.surveyList = response.data.data;
          that.surveyName = that.surveyList.researchName;
          that.date.sendDate = that.surveyList.startTime;
          that.date.sendDateEnd = that.surveyList.endTime;
          that.surveyDesc = that.surveyList.surveyDesc;
          that.priority = that.surveyList.priority;
          // var obj={};
          // obj.name=that.surveyList.sourceName;
          // obj.id=that.surveyList.sourceId;
          that.resourceId = that.surveyList.sourceId;
          that.resourcesvalue = that.surveyList.sourceName;
          that.contentBannerImageUrl = that.surveyList.bannerImageUrl;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeStartTime(time) {
      // console.log('starttime',time);
      this.date.sendDate = time;
    },
    changeEndTime(time) {
      // console.log('starttime',time);
      this.date.sendDateEnd = time;
    },
    cancelimg() {
      this.imgFlag = true;
      this.contentBannerImageUrl = '';
    },
    previewResources() {
      this.dialogTableVisible = true;
      const that = this;
      axios.post(`${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/getVipSourceListBysourceType`,
        {
          pageNo: 1,
          pageSize: 10,
          sourceType: 1 // 资源位id，来源于资源位请求id
        },)
        .then((response) => {
          // console.log(response);
          that.states = response.data.data.entities;
          // for(var i=0;i<that.options.length;i++){
          //   var sourceTypeid= that.options[i];
          //   console.log(sourceTypeid.id)
          // }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancelClick() {
      this.$message({
        message: '取消操作成功！'
      });
      this.$router.push('/dbOperate/survey');
    },
    preservationClick() {
      const d1 = new Date(this.date.sendDate).getTime();
      const d2 = new Date(this.date.sendDateEnd).getTime();
      const d = new Date().getTime();
      if (d1 > d2) {
        this.$message('请输入正确的发放有效期');
        return;
      }
      this.load = true;
      const that = this;
      axios({
        url: `${this.apiUrl}vipcenter/researchconfig/updateToDraft`,
        method: 'post',
        transformRequest: [function (data) {
          // 对 data 进行任意转换处理
          return Qs.stringify(data);
        }],
        headers: {
          deviceCode: 'A95ZEF1-47B5-AC90BF3'
        },
        data: {
          researchName: this.surveyName,
          startTime: this.date.sendDate,
          endTime: this.date.sendDateEnd,
          onestopId: this.id,
          surveyDesc: this.surveyDesc,
          priori: this.priority, // 优先级
          sourceId: this.resourceId, // 资源位id
          bannerImageUrl: this.contentBannerImageUrl,
        }
      })
        .then((response) => {
          // console.log(response);
          if (response.data.isSuccess == true) {
            that.load = false;
            that.$message({
              message: '保存入草稿成功!',
              type: 'success'
            });
          } else {
            that.load = false;
            that.$message({
              message: response.data.msg,
              type: 'warning'
            });
          }
        })
        .catch((error) => {
          that.load = false;
          console.log(error);
        });
    },
    selectChange() {
      const that = this;
      axios.post(`${this.apiUrl}vipcenter/oneStopQuestionnaireConfig/getVipSourceListBysourceType`,
        {
          pageNo: 1,
          pageSize: 10,
          sourceType: 1 // 资源位id，来源于资源位请求id
        },)
        .then((response) => {
          // console.log(response);
          that.states = response.data.data.entities;

          // for(var i=0;i<that.options.length;i++){
          //   var sourceTypeid= that.options[i];
          //   console.log(sourceTypeid.id)
          // }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查看图片
    checkImg() {
      this.checkImgvisible = true;
    },
    onSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      // var that=this;
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
    // beforeAvatarUpload(file) {
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
    nextstepClick() {
      const d1 = new Date(this.date.sendDate).getTime();
      const d2 = new Date(this.date.sendDateEnd).getTime();
      const d = new Date().getTime();
      if (d1 > d2) {
        this.$message('请输入正确的发放有效期');
        return;
      }
      this.load = true;
      const that = this;
      this.states.forEach((e) => {
        if (e.name == that.resourcesvalue) {
          that.resourceId = e.id;
        }
      });
      axios({
        url: `${this.apiUrl}vipcenter/researchconfig/updateResearchConfig`,
        method: 'post',
        transformRequest: [function (data) {
          // 对 data 进行任意转换处理
          return Qs.stringify(data);
        }],
        headers: {
          deviceCode: 'A95ZEF1-47B5-AC90BF3'
        },
        data: {
          researchName: this.surveyName,
          startTime: this.date.sendDate,
          endTime: this.date.sendDateEnd,
          onestopId: this.id,
          surveyDesc: this.surveyDesc,
          priori: this.priority, // 优先级
          sourceId: this.resourceId, // 资源位id
          bannerImageUrl: this.contentBannerImageUrl,
        }
      })
        .then((response) => {
          // console.log(response);
          if (response.data.isSuccess == true) {
            that.load = false;
            that.$message({
              message: '配置成功!',
              type: 'success'
            });
            that.$router.push({ path: '/dbOperate/survey/updateSurvey', query: { id: that.id, rightsGrantModelId: that.rightsGrantModelId } });
          } else {
            that.load = false;
            that.$message({
              message: response.data.msg,
              type: 'warning'
            });
          }
        })
        .catch((error) => {
          that.load = false;
          console.log(error);
        });
    },
  },
  created() {
    this.id = this.$route.query.id;
    this.getOnestopQuestionnaireConfigById();
    this.rightsGrantModelId = this.$route.query.rightsGrantModelId;
  }
};
</script>

<style scoped>
.top{
  padding: 20px;
}
.bcg{
  height: 30px;
  width: 5px;
  background:#000000;
  margin-right: 10px;
}
.dialog-body-top{
  height:255px;
  width: 100%;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  flex-wrap: wrap;
  overflow-y:auto;
}
.dialog-body-checkimg{
  width: 100%;
  margin-bottom: 10px;
  flex-wrap: wrap;
  overflow-y:auto;
}
.txt{
  font-size: 12px;
}
.card-info{
  display: flex;
  flex-wrap: wrap;
  /*overflow-y:auto;*/
}
.card-img{
  height:70px;
  margin-left: 10px;
  margin-right: 10px;
  width: 80%;
}
.realgift-img{
  height:70px;
  margin-left: 10px;
  margin-right: 10px;
  width: 80%;
}
.card-info-img{
  height: 90px;
  width:30%;
  margin:5px;
  text-align: center;
}
.realgift-info-img{
  height: 90px;
  width:30%;
  margin:5px;
  text-align: center;
}
.realgift-info{
  display: flex;
  flex-wrap: wrap;
}
.dialog-top{
  display: flex;
  padding: 10px;
  line-height: 30px;
}
.dialog-body-bottom{
  height:180px;
  width: 100%;
  flex-wrap: wrap;
  overflow-y:auto;
  border: 1px solid #ccc;
}
.dialog-bottom{
  display: flex;
  padding: 10px;
  line-height: 30px;
}
.headertop{
  margin-left: 50px;
}
.vip-input{
  width: 320px;
}
.describe{
  width: 320px;
  margin-left: 2px;
}
.photo-upload{
  width: 60px;
  border: 1px solid #ccc;
  margin-right: 30px;
}
.avatar-uploader .el-upload {
    background: white;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }
  .name{
    margin-left: 20px;
    display: flex;
    line-height: 40px;
  }
  .choice{
    background-color: #409EFF;
    color: white;
    font-size: 10px;
    padding: 5px;
    width: 80px;
  }
  .name-input{
    margin-left: 5px;
    width: 320px;
    margin-right: 30px;
  }
  .effect-time{
    margin-left: 7px;
    padding-top: 20px;
  }
  .target-describe{
    margin-left: -8px;
    padding-top: 20px;
  }
  .priority{
    margin-left: 33px;
    padding-top: 20px;
    display: flex;
    line-height: 40px;
  }
  .priority-input{
    margin-left: 7px;
    width: 183px;
    margin-right: 30px;
  }
  .resources{
    margin-left: 33px;
    padding-top: 20px;
  }
  .resources-select{
    margin-left: 4px;
    margin-right: 22px;
  }
  .photo{
    padding-top: 20px;
    display: flex;
    line-height: 60px;
  }
  .photo-info{
    padding-left: 2px;
    margin-right: 10px;
  }
  .photo-text{
    font-size: 12px;
  }
  .cancel{
    margin-top: 30px;
    width: 10%;
    margin-left: 50px;
    margin-right: 50px;
  }
  .preservation{
    width: 10%;
    margin-right: 50px;
  }
  .next-step{
    width: 25%;
  }
  .preview{
    margin-left: 8px;
    padding: 5px;
    width: 78px;
    color: white;
    font-size: 10px;
    background: #409EFF;
  }
.upload{
  padding-top: 20px;
  margin-left: -18px;
  display: flex;
  line-height: 40px;
}
.limit{
  margin-left: 50px;
  font-size: 12px;
}
.upload-img{
  width: 80%;
  padding: 10px;
}
.upload-img-title{
  margin-top: 30px;
  margin-left: 10px;
  font-size: 12px;
  color: #6C6C6C;
}
.bannerUpload{
  width: 200px;
  height: 100px;
  border: 1px solid #ccc;
  display: flex;
}
.el-icon-delete{
  margin-top: 40px;
  font-size: 20px;
  margin-left: 10px;
  color: #ccc;
  cursor: pointer;
}
.el-icon-delete:hover{
  color: #409EFF;
}
/*.addSurvey .describe el-input{
  width: 320px;
  margin-left: 2px;
}*/
</style>

<style>
  .addSurvey .el-dialog--small{
    width: auto;
  }
</style>
