<template>
    <div style="background: #eff4f8;height: 100%;">
        <div class="step-line">
            <el-steps v-if="fixNum == 1" :active="2" finish-status="success" align-center center>
                <el-step v-if="!isEdit" title="创建活动"></el-step>
                <el-step v-if="isEdit" title="修改活动"></el-step>
                <el-step title="选择会员"></el-step>
                <el-step title="选择沟通渠道"></el-step>
                <el-step title="选择通知客服"></el-step>
                <el-step title="配置多波次"></el-step>
                <el-step title="活动创建完成"></el-step>
            </el-steps>
            <el-steps v-if="fixNum == -1" :active="2" finish-status="success" align-center center>
                <el-step v-if="!isEdit" title="创建活动"></el-step>
                <el-step v-if="isEdit" title="修改活动"></el-step>
                <el-step title="选择会员"></el-step>
                <el-step title="选择沟通渠道"></el-step>
                <el-step title="选择通知客服"></el-step>
                <el-step title="活动创建完成"></el-step>
            </el-steps>
        </div>
        <div class="vip-content msg-template activity-flow" style="width:85%;float:left;padding:0">
            <div class="acqd" style="background:#fff;height:100%">
                <p class="template-brand" style="padding:20px 40px 10px">
                    <i></i>沟通渠道选择
                </p>
                <div class="con">
                    <div class="box" @click="selectModel(4)">
                        <span>
                            <i class="iconfont icon-weixin"></i>微信</span>
                        </span>
                        <!-- <p>{{flow[0].weChatTemplateName}}</p> -->
                        <el-tag type="primary"> {{flow[0].weChatTemplateName | nameFilter}} </el-tag>

                    </div>
                    <div class="box" @click="selectModel(3)">
                        <span>
                            <i class="iconfont icon-msg"></i>短信</span>
                        <!-- <p>{{flow[0].smsTemplateName}}</p> -->
                        <el-tag type="primary"> {{flow[0].smsTemplateName | nameFilter}} </el-tag>
                    </div>
                    <div class="box" @click="selectModel(2)">
                        <span>
                            <i class="iconfont icon-zhanneixin"></i>站内信</span>
                        <!-- <p>{{flow[0].siteMsgTemplateName}}</p> -->
                        <el-tag type="primary"> {{flow[0].siteMsgTemplateName | nameFilter}} </el-tag>
                    </div>
                </div>
                <div class="con" style="text-align: left; margin-left: 30px; margin-top: 30px;">
                <el-radio-group v-model="hasCustomerService">
                    <el-radio :label="1">配置客服模块</el-radio>
                    <el-radio v-if="fixNum == 1" :label="2">配置多波次</el-radio>
                </el-radio-group>
                    <!--<el-checkbox v-model="hasCustomerService">是否配置客服模块</el-checkbox>-->
                </div>
                <div style="text-align: center;margin-top:50px;">
                    <div style="display:inline-block;margin-right:20px;">
                        <el-button type="primary" @click="goPrev" style="background:#40dfa6;border-color:#40dfa6">上一步</el-button>
                    </div>
                    <div v-if="hasCustomerService" style="display:inline-block;margin-right:20px;">
                        <el-button type="primary" @click="save('next')">下一步</el-button>
                    </div>
                    <div v-if="!hasCustomerService" style="display:inline-block;margin-right:20px;">
                        <el-button type="primary" @click="save('finish')">完成</el-button>
                    </div>
                    <div style="display:inline-block;margin-right:20px;">
                        <el-button type="primary" @click="save" style="background:#7ebe26;border-color:#7ebe26">暂存</el-button>
                    </div>
                    <!-- <div style="display:inline-block"> -->
                    <!-- <el-button type="primary" @click="pause" style="background:#7ebe26;border-color:#7ebe26">暂存</el-button> -->
                    <!-- </div> -->
                </div>
            </div>


            <select-model :type="modelDialog.type" :random="modelDialog.random" :dialogDisplay="modelDialog.display" :closeDialog="closeModelDialog"
                :selectedModel="selectedModel"></select-model>
        </div>
        <div style="width:15%;float:right" class="plhy-right">
            <div class="group">
                <a class="i1" @click="open(1)" style="cursor:pointer">内容运营</a>
                <a class="i2" @click="open(2)" style="cursor:pointer">策略运营</a>
                <a class="i3" @click="open(3)" style="cursor:pointer">客服运营</a>
                <a class="i4" @click="open(4)" style="cursor:pointer">数据运营</a>
            </div>
        </div>
    </div>
</template>

<script>
import selectModel from './dialog/model.vue';

export default {
  data() {
    return {
      hasCustomerService: 0,
      isEdit: false,
      kf: 1,
      fixNum: '',
      modelDialog: {
        type: 1,
        display: false,
        random: Math.random()
      },
      flow: [{}, {
        flowtype: 2,
        siteMsgTemplate: '',
        smsTemplate: '',
        weChatTemplate: '',
        emailTemplate: '',
        siteMsgTemplateName: '',
        smsTemplateName: '',
        weChatTemplateName: '',
        emailTemplateName: '',
        ids: '',
        rankIds: '',
        exceptGroupIds: '',
        excludeBlackList: '',
        isOnline: 1
      }],
      isUpdate: false
    };
  },
  components: {
    selectModel,
  },
  filters: {
    nameFilter(value) {
      if (value && value != '') {
        if (value.indexOf(':') > 0) {
          value = value.split(':')[1];
        }
      } else {
        value = '请选择';
      }
      return value;
    }
  },
  methods: {
    open(type) {
      const _this = this;
      _this.$confirm('将离开当前页面,是否暂存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        switch (type) {
          case 1:
            _this.$router.push({
              path: '/communication/wechatlist',
            });
            break;
          case 2:
            _this.$router.push({
              path: '/strategy/level',
            });
            break;
          case 3:
            _this.$router.push({
              path: '/service/personnel',
            });
            break;
          case 4:
            _this.$router.push({
              path: '/report/operation',
            });
            break;
        }
      }).catch(() => {});
    },
    selectModel(type) {
      this.modelDialog.type = type;
      this.modelDialog.display = true;
      this.modelDialog.random = Math.random();
    },
    closeModelDialog() {
      this.modelDialog.display = false;
    },
    selectedModel(type, row) {
      if (row.id && row.templateName) {
        switch (type) {
          case 1:
            this.flow[0].emailTemplateName = `${row.id}:${row.templateName}`;
            break;
          case 2:
            this.flow[0].siteMsgTemplateName = `${row.id}:${row.templateName}`;
            break;
          case 3:
            this.flow[0].smsTemplateName = `${row.id}:${row.templateName}`;
            break;
          case 4:
            this.flow[0].weChatTemplateName = `${row.id}:${row.templateName}`;
            break;
        }
      }
      this.modelDialog.display = false;
    },
    goPrev() {
      this.$router.push({
        path: '/activity/activityflow',
        query: {
          id: this.$route.query.id,
          fixNum: this.$route.query.fixNum,
        }
      });
    },
    save(type) {
      const self = this;
      this.flow[0].siteMsgTemplate = this.flow[0].siteMsgTemplateName && this.flow[0].siteMsgTemplateName != '请选择' ? this.flow[0].siteMsgTemplateName
        .split(':')[0] : '';
      this.flow[0].smsTemplate = this.flow[0].smsTemplateName && this.flow[0].smsTemplateName != '请选择' ? this.flow[0].smsTemplateName.split(
        ':'
      )[0] : '';
      this.flow[0].weChatTemplate = this.flow[0].weChatTemplateName && this.flow[0].weChatTemplateName != '请选择' ? this.flow[0].weChatTemplateName
        .split(':')[0] : '';
      this.flow[0].emailTemplate = this.flow[0].emailTemplateName && this.flow[0].emailTemplateName != '请选择' ? this.flow[0].emailTemplateName.split(
        ':'
      )[0] : '';
      const params = this.flow[0];

      if (this.flow[0].siteMsgTemplateName == '请选择' && this.flow[0].smsTemplateName == '请选择' && this.flow[0].weChatTemplateName == '请选择') {
        self.$message({
          type: 'warning',
          message: '请选择沟通渠道!'
        });
        return false;
      }

      // 活动是否是最后一步
      if (this.hasCustomerService == 1 || this.hasCustomerService == 2) {
        params.lastFlowFlag = '';
      } else {
        params.lastFlowFlag = 'last';
      }

      if (!this.isUpdate) {
        this.requestCare.saveFlow(params).then((data) => {
          if (data) {
            if (type == 'next') {
              if (self.hasCustomerService == 1) {
                self.$router.push({
                  path: '/care/activityKF',
                  query: {
                    id: self.$route.query.id,
                    fixNum: self.$route.query.fixNum,
                  }
                });
              } else if (self.hasCustomerService == 2) {
                self.$router.push({
                  path: '/care/activityDBC',
                  query: {
                    id: self.$route.query.id,
                    fixNum: self.$route.query.fixNum,
                    kf: self.kf
                  }
                });
              }
            } else if (type == 'finish') {
              self.$router.push({
                path: '/activity/activityadded',
                query: {
                  id: self.$route.query.id,
                  fixNum: self.$route.query.fixNum,
                }
              });
            } else {
              self.$message({
                type: 'success',
                message: '暂存成功!'
              });
            }
          }
        });
      } else {
        this.requestCare.updateFlow(params).then((data) => {
          if (data) {
            if (type == 'next') {
              if (self.hasCustomerService == 1) {
                self.$router.push({
                  path: '/care/activityKF',
                  query: {
                    id: self.$route.query.id,
                    fixNum: self.$route.query.fixNum,
                  }
                });
              } else if (self.hasCustomerService == 2) {
                self.$router.push({
                  path: '/care/activityDBC',
                  query: {
                    id: self.$route.query.id,
                    fixNum: self.$route.query.fixNum,
                    kf: self.kf
                  }
                });
              }
            } else if (type == 'finish') {
              self.$router.push({
                path: '/activity/activityadded',
                query: {
                  id: self.$route.query.id,
                  fixNum: self.$route.query.fixNum,
                }
              });
            } else {
              self.$message({
                type: 'success',
                message: '暂存成功!'
              });
            }
          }
        });
      }
    },
    list() {
      const self = this;
      this.requestCare.listFlow({
        id: self.$route.query.id
      }).then((data) => {
        if (data && data.length > 0) {
          if (data.length == 1) {
            data = [data[0]];
          }

          if (data.length == 2 && data[1].flowtype == 3) {
            self.hasCustomerService = 2;
          } else if (data.length == 2 && data[1].flowtype == 1) {
            self.hasCustomerService = 1;
          } else if (data.length == 3) {
            self.hasCustomerService = 1;
          }

          for (let i = 0; i < data.length; i++) {
            if (data[i].flowtype == 2) {
              data[i].emailTemplateName = data[i].emailTemplate ? `${data[i].emailTemplate}:${
                data[i].emailTemplateName}`
                : '请选择';
              data[i].siteMsgTemplateName = data[i].siteMsgTemplate ? `${data[i].siteMsgTemplate
              }:${
                data[i].siteMsgTemplateName}`
                : '请选择';
              data[i].smsTemplateName = data[i].smsTemplate ? `${data[i].smsTemplate}:${
                data[i]
                  .smsTemplateName}`
                : '请选择';
              data[i].weChatTemplateName = data[i].weChatTemplate ? `${data[i].weChatTemplate
              }:${
                data[i].weChatTemplateName}`
                : '请选择';
            }
          }

          self.flow = data;
          self.isUpdate = true;
        }
        setTimeout(() => {
          self.isInit = false;
        }, 500);
      });
    },
    pause() {

    },
  },
  mounted() {
    this.isEdit = this.$route.query.id;
    this.fixNum = this.$route.query.fixNum;
    this.list();
  }
};
</script>
<style scoped>
    .acqd .con {
        /* padding: 20px 0; */
        position: relative;
        text-align: center;
    }

    .acqd .con .box {
        width: 30.5%;
        height: 174px;
        text-align: center;
        font-size: 18px;
        color: #04bde5;
        background: #f2f6fc;
        /* margin: 0 40px; */
        display: inline-block;
        margin: 0 5px;
        padding-top: 30px;
        cursor: pointer;
    }

    .acqd .con .box span:first-child {
        display: block;
    }

    .acqd .con .box i.icon-weixin::before {
        vertical-align: middle;
        font-size: 50px;
        color: #19d100;
        margin-right: 5px;
    }

    .acqd .con .box i.icon-msg::before {
        vertical-align: middle;
        font-size: 50px;
        color: #7ebe26;
        margin-right: 5px;
    }

    .acqd .con .box i.icon-zhanneixin::before {
        vertical-align: middle;
        font-size: 50px;
        color: #20a0ff;
        margin-right: 5px;
    }

    .acqd .con .box p {
        font-size: 14px;
        color: #fff;
        background: #8391a5;
        padding: 5px;
        border-radius: 5px;
        display: inline-block;
    }


    .activity-flow,
    .plhy-right {
        background: #eff4f8;
        height: 450px;
    }

    .plhy-right .group {
        background: #fff;
        height: 100%;
        margin-left: 20px;
    }

    .plhy-right .group>a {
        padding: 20px 0;
        margin: 0 20px;
        font-size: 16px;
        border-bottom: 1px solid #eaeaea;
        text-align: center;
        display: block;
    }

    .plhy-right .group>a:last-child {
        border-bottom: none;
    }

    .plhy-right .group>a::before {
        width: 100%;
        height: 45px;
        content: "";
        display: block;
        text-align: center;
    }

    .plhy-right .group>a.i1::before {
        background: url("../../assets/images/plxz-icon1.png") center no-repeat;
    }

    .plhy-right .group>a.i2::before {
        background: url("../../assets/images/plxz-icon2.png") center no-repeat;
    }

    .plhy-right .group>a.i3::before {
        background: url("../../assets/images/plxz-icon3.png") center no-repeat;
    }

    .plhy-right .group>a.i4::before {
        background: url("../../assets/images/plxz-icon4.png") center no-repeat;
    }
</style>
