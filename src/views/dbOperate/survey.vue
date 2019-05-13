<template>
  <div>
    <router-view></router-view>
    <div class="top surveyStyle" v-show="showSurvey">
      <div class="header">
        <p class="template-brand">
          <i></i>调研配置
          <el-button type="primary" @click="add" class="fr">新建调研</el-button>
        </p>
      </div>
      <el-table class="resources-table" :data="surveyList" style="width: 100%" v-loading="tabLoading">
        <el-table-column align="center" prop="researchName" label="调研名称" min-width="200"> </el-table-column>
        <el-table-column align="center" prop="member" :formatter="showEmpty" label="所属产业" min-width="150">
        </el-table-column>
        <el-table-column align="center" prop="crUserId" label="创建人" min-width="150"> </el-table-column>
        <el-table-column
          align="center"
          prop="crTime"
          label="创建时间"
          empty-text="未设置"
          min-width="150"
          :formatter="formatDate"
        >
        </el-table-column>
        <el-table-column align="center" label="审核状态" min-width="150">
          <!--prop="audiStatusName" -->
          <template slot-scope="scope">
            <!--               <el-popover trigger="hover" placement="top" v-if="scope.row.audiStatus==0">
                <div >
                  <p>原因: {{scope.row.audiResult}}</p>
                </div>

                <div slot="reference" class="name-wrapper">
                  {{ scope.row.audiStatusName }}
                </div>
              </el-popover>  -->
            <el-popover trigger="hover" placement="top" v-if="scope.row.audiStatus == 3">
              <div>
                <p>调研名称：{{ scope.row.researchName }}</p>
                <p>原因: {{ scope.row.audiResult }}</p>
                <div style="text-align:center;margin-top: 15px;">
                  <el-button type="primary" size="mini" @click="sendExamine(scope.row.id)">推送审核</el-button>
                </div>
              </div>

              <div slot="reference" class="name-wrapper">
                {{ scope.row.audiStatusName }}
              </div>
            </el-popover>
            <el-popover trigger="hover" placement="top" v-if="scope.row.audiStatus == 0">
              <div>
                <p>调研名称：{{ scope.row.researchName }}</p>
                <div style="text-align:center;margin-top: 15px;margin-bottom: 15px;">
                  <el-button type="primary" size="mini" @click="sendExamine(scope.row.id)">推送审核</el-button>
                </div>
              </div>

              <div slot="reference" class="name-wrapper">
                {{ scope.row.audiStatusName }}
              </div>
            </el-popover>
            <div class="name-wrapper" v-if="scope.row.audiStatus != 3 && scope.row.audiStatus != 0">
              {{ scope.row.audiStatusName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="300">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="previewSurvey(scope.row)">查看</el-button>
              <el-button
                type="text"
                :class="{ ingGrayFont: scope.row.audiStatus == 1, hadGrayFont: scope.row.audiStatus == 2 }"
                @click="modify(scope.row)"
                >修改</el-button
              >
              <el-button
                type="text"
                :class="{ ingGrayFont: scope.row.audiStatus == 1, hadGrayFont: scope.row.audiStatus == 2 }"
                @click="zxdelete(scope.row)"
                >删除</el-button
              >
              <el-button type="text" @click="questionSetup(scope.row.questionId)">问卷设置</el-button>
              <el-button type="text" @click="countData(scope.row.id)">数据统计</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNo"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
      <div class="previewBox">
        <el-dialog
          :visible.sync="dialogVisible"
          :modal-append-to-body="false"
          title="调研配置信息："
          class="trs-dialog"
        >
          <!-- 指定直销员 -->
          <div class="dialogFlexBox">
            <div class="baseInfo">
              <h2 style="font-weight: 600">基础信息：</h2>
              <div class="infoBox">
                <div class="infoBoxC">
                  <span>调研名称：</span>
                  <div class="infoBoxR">{{ details.researchName == null ? '未设置' : details.researchName }}</div>
                </div>
                <div class="infoBoxC">
                  <span>创建人：</span>
                  <div class="infoBoxR">{{ details.crUserId }}</div>
                </div>
                <div class="infoBoxC">
                  <span>调研创建时间：</span>
                  <div class="infoBoxR">{{ details.crTime == null ? '未设置' : details.crTime }}</div>
                </div>
                <div class="infoBoxC">
                  <span>礼品申请时间：</span>
                  <div class="infoBoxR">
                    {{
                      details.sendStartTime == null && details.sendEndTime == null
                        ? '未设置'
                        : details.sendStartTime + ' 至 ' + details.sendEndTime
                    }}
                  </div>
                </div>
                <div class="infoBoxC">
                  <span>上门调研时间：</span>
                  <div class="infoBoxR">
                    {{
                      details.startTime == null && details.endTime == null
                        ? '未设置'
                        : details.startTime + ' 至 ' + details.endTime
                    }}
                  </div>
                </div>
                <!-- <div class="infoBoxC"><span>权益总份数：</span><div class="infoBoxR">{{details.num==null?'未设置':details.num}}</div></div> -->
                <div class="infoBoxC">
                  <span>资源位类型：</span>
                  <div class="infoBoxR">{{ details.sourceType == 0 ? '权益券资源位' : '实物资源位' }}</div>
                </div>
              </div>
            </div>

            <div class="baseInfo">
              <h2 style="font-weight: 600">审核信息：</h2>
              <div class="infoBox">
                <div class="infoBoxC">
                  <span>审核状态：</span>
                  <div class="infoBoxR">{{ details.audiStatus | audiStatusFilter }}</div>
                </div>
                <div class="infoBoxC" v-if="details.audiStatus != 0">
                  <span>审核结果：</span>
                  <div class="infoBoxR" v-if="details.audiStatus == 3">{{ details.audiResult }}</div>
                  <div class="infoBoxR" v-if="details.audiStatus == 1">推送积分商城审核中</div>
                  <div class="infoBoxR" v-if="details.audiStatus == 2">积分商城审核通过</div>
                </div>
                <!-- <div class="infoBoxC"><span>投入预算：</span><div class="infoBoxR">{{details.budget==null?'未设置':details.budget}}</div></div> -->
              </div>
            </div>

            <div class="baseInfo">
              <h2 style="font-weight: 600">活动范围：</h2>
              <div class="infoBox">
                <div class="infoBoxC" v-if="details.ruleType == 1">
                  <span>活动渠道：</span>
                  <div class="infoBoxR">
                    {{
                      details.channel == null || '' ? '未设置' : details.channel == 'all' ? '全部渠道' : details.channel
                    }}
                  </div>
                </div>
                <div class="infoBoxC" v-if="details.ruleType == 1">
                  <span>活动产业：</span>
                  <div class="infoBoxR">
                    {{
                      details.productCategoryName == null || ''
                        ? '未设置'
                        : details.productCategoryName == 'all'
                        ? '全部产业'
                        : details.productCategoryName
                    }}
                  </div>
                </div>
                <div class="infoBoxC" v-if="details.ruleType == 1">
                  <span>活动门店：</span>
                  <div class="infoBoxR">{{ details.shopName == null ? '未设置' : details.shopName }}</div>
                </div>
                <div
                  class="infoBoxC"
                  v-if="details.ruleType == 1 && details.province != null && details.province != ''"
                >
                  <span>活动地点：</span>
                  <div class="infoBoxR">{{ details.province }} {{ details.city }} {{ details.district }}</div>
                </div>
                <div class="infoBoxC" v-if="details.ruleType == 1 && details.xwGroupIds != ''">
                  <span>指定的小微组：</span>
                  <div class="infoBoxR">{{ details.xwGroupIds }}</div>
                </div>
                <!-- userGroup -->
                <div class="infoBoxC" v-if="details.ruleType == 3">
                  <span>指定的用户组：</span>
                  <div class="infoBoxR">{{ details.userGroup }}</div>
                </div>
                <div class="infoBoxC" v-if="details.ruleType == 2">
                  <span>指定的直销员组：</span>
                  <div class="infoBoxR">{{ details.sellerGroup }}</div>
                </div>
                <!-- sellersCount 直销员数量 -->
                <!-- userCount 用户数量-->
                <div class="infoBoxC">
                  <span>活动直销员数量：</span>
                  <div class="infoBoxR">
                    {{
                      details.sellersCount == 0 || details.sellersCount == null
                        ? '尚无直销员'
                        : details.sellersCount + '人'
                    }}
                  </div>
                </div>
                <div class="infoBoxC">
                  <span>活动用户数量：</span>
                  <div class="infoBoxR">
                    {{ details.userCount == 0 || details.userCount == null ? '尚无用户' : details.userCount + '人' }}
                  </div>
                </div>
                <div class="infoBoxC" v-if="details.ruleType == 1 && details.xiaoweiId != ''">
                  <span>小微：</span>
                  <div class="infoBoxR">
                    {{ details.xiaoweiId == 'all' || xwLength == 42 ? '全部小微' : details.xiaoweiId }}
                  </div>
                </div>
                <!--  <div class="infoBoxC"><span>用户注册时长：</span><div class="infoBoxR">{{details.userRegisterDuration | userRegisterDurationFilter}}</div></div> -->
                <!-- <div class="infoBoxC"><span>用户购机型号限制：</span><div class="infoBoxR">{{(details.userOrderLimit==null||details.userOrderLimit=='')?'未设置':details.userOrderLimit}}</div></div> -->

                <!-- <div class="infoBoxC"><span>奖励内容：</span><div class="infoBoxR">{{(details.rewardContent==null||details.rewardContent=='')?'未设置':details.rewardContent}}</div></div>  -->
              </div>
            </div>
            <div class="baseInfo">
              <h2 style="font-weight: 600">预算金额：</h2>
              <div class="infoBox">
                <!--     <div class="infoBoxC"><span>奖励总预算：</span><div class="infoBoxR">{{details.rewardBudget==null?'未设置':details.rewardBudget}}</div></div> -->
                <div class="infoBoxC">
                  <span>权益成本金额：</span>
                  <div class="infoBoxR">
                    {{ details.costAmount == null || details.costAmount == '' ? '未设置' : details.costAmount + '元' }}
                  </div>
                </div>
                <div class="infoBoxC">
                  <span>投入总预算：</span>
                  <div class="infoBoxR">
                    {{
                      details.giftConfigBudget == null || details.giftConfigBudget == ''
                        ? '未设置'
                        : details.giftConfigBudget + '元'
                    }}
                  </div>
                </div>
                <!-- <div class="infoBoxC"><span>投入预算：</span><div class="infoBoxR">{{details.budget==null?'未设置':details.budget}}</div></div> -->
              </div>
            </div>
            <div class="baseInfo">
              <h2 style="font-weight: 600">约束限制：</h2>
              <div class="infoBox">
                <!-- <div class="infoBoxC"><span>直销员发送方式：</span><div class="infoBoxR">{{details.sendChannelType | sendChannelTypeFilter}}</div></div> -->
                <div class="infoBoxC">
                  <span>奖励方式：</span>
                  <div class="infoBoxR">
                    {{ details.rewardWay | rewardWayFilter }}奖励{{ details | rewardMoneyFilter }}
                  </div>
                </div>
                <div class="infoBoxC">
                  <span>奖励类型：</span>
                  <div class="infoBoxR">{{ details.rewardType | rewardTypeFilter }}</div>
                </div>
                <div class="infoBoxC">
                  <span>发放规则类型：</span>
                  <div class="infoBoxR">{{ details.ruleType | ruleTypeFilter }}</div>
                </div>
                <div class="infoBoxC">
                  <span>发放限制：</span>
                  <div
                    style="padding: 0;margin-top: -3px;"
                    v-if="fafanxianzhi.length > 0 && fafanxianzhi[0] != '未设置'"
                  >
                    <div
                      class="infoBoxR btntip"
                      v-for="item in fafanxianzhi"
                      style="display: flex;flex-direction: row;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 400px;"
                    >
                      <!-- <div style="overflow:hidden;width:300px;text-overflow: ellipsis;">{{item.name}}：{{item.content}}</div> -->
                      <el-tooltip placement="bottom-end" :visible-arrow="false">
                        <div slot="content">{{ item.name }}：{{ item.content }}</div>
                        <el-button>{{ item.name }}：{{ item.content }}</el-button>
                      </el-tooltip>
                    </div>
                  </div>
                  <span v-if="fafanxianzhi[0] == '未设置'" class="weishezhi">未设置</span>
                </div>
              </div>
            </div>
            <div class="pic">
              <div class="subPic">
                <h2>banner图</h2>
                <a :href="details.bannerImageUrl" target="_blank"><img v-bind:src="details.bannerImageUrl"/></a>
              </div>
              <div class="subPic">
                <h2>banner详情图</h2>
                <a :href="details.bannerDetails" target="_blank"><img v-bind:src="details.bannerDetails"/></a>
              </div>
              <div class="subPic">
                <h2>预算审批图</h2>
                <a :href="details.auditPics" target="_blank"><img v-bind:src="details.auditPics"/></a>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
  data() {
    return {
      showSurvey: true,
      surveyList: [],
      pageNo: 1,
      pageSize: 10,
      dialogVisible: false,
      tabLoading: false,
      total: 0,
      details: {},
      rightsGrantModelId: 0,
      xwLength: 0,
      fafanxianzhi: []
    };
  },
  updated() {
    if (this.$route.path == '/dbOperate/survey/addQuestion') {
      this.showSurvey = false;
    } else if (this.$route.path == '/dbOperate/survey/rightsDatacount') {
      this.showSurvey = false;
    } else if (this.$route.path == '/dbOperate/survey/addSurvey') {
      this.showSurvey = false;
    } else if (this.$route.path == '/dbOperate/survey/updateSurvey') {
      this.showSurvey = false;
    } else {
      this.showSurvey = true;
    }
  },
  mounted() {
    this.tabLoading = true;
    const that = this;
    this.queryAll();
    //   axios.post(
    //       this.apiUrl + 'vipcenter/researchconfig/getResearchConfigList',{
    //                   pageSize:this.pageSize,
    //                   pageNo:this.pageNo
    //               }
    //   )
    // .then(function (response) {
    //       if(true == response.data.isSuccess){
    //           that.surveyList = response.data.data.entities;
    //           that.total = response.data.data.entityCount;
    //       }else{
    //           that.$message({
    //               type:"error",
    //               message:response.data.msg
    //           })
    //       }

    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    // let rightsGrantModelId = this.$route.query.rightsGrantModelId;
    // this.rightsGrantModelId = this.$route.query.rightsGrantModelId;

    // axios.post(
    //       this.apiUrl + 'vipcenter/vipUserManageConfigModel/getVipConfigModelDetail',qs.stringify({
    //                           id:rightsGrantModelId
    //                       })
    //   )
    // .then(function (response) {
    //       if(true == response.data.isSuccess){
    //           that.toUrl = response.data.data.url;
    //       }else{
    //           that.$message({
    //               type:"error",
    //               message:response.data.msg
    //           })
    //       }

    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  },
  filters: {
    formatDate(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
      const hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
      const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
      return `${year}年${month}月${day}日 ${hour}:${minutes}`;
    },
    // 直销员发放方式方法：
    sendChannelTypeFilter(type) {
      const arr = [];
      let str = '';
      if (type == undefined || type == null || type == '') {
        str = '未设置';
        return str;
      }
      if (type.indexOf('1') >= 0) {
        arr.push('兑呗已录单用户');
      }
      if (type.indexOf('2') >= 0) {
        arr.push('微信好友');
      }
      if (type.indexOf('3') >= 0) {
        arr.push('通讯录好友');
      }
      str = arr.join('、');
      return str;
    },
    // 发放规则类型方法：
    ruleTypeFilter(type) {
      let str = '';
      if (type == undefined || type == null || type == '') {
        str = '未设置';
        return str;
      }
      if (type == 1) {
        str = '按直销员均分';
      } else if (type == 2) {
        str = '指定直销员';
      } else if (type == 3) {
        str = '按指定用户';
      }
      return str;
    },
    // 发放限制:
    // sendLimitFilter:function(type){
    //     var arr = [];
    //     var str = "";
    //     if(type == undefined||type == null||type==''){
    //         str = '未设置'
    //         return str;
    //     }else{
    //         if(type.indexOf("1")>=0){
    //           if(this.details.userComsumptionMin==''||this.details.userComsumptionMin==null||this.details.userComsumptionMax==''||this.details.userComsumptionMax==null){
    //             arr.push("用户消费金额:未设置");
    //           }else{

    //             arr.push("用户消费金额:"+this.details.userComsumptionMin+"--"+details.userComsumptionMax);
    //           }
    //         }
    //         if(type.indexOf("2")>=0){
    //             if(this.details.userOrderLimit==''||this.details.userOrderLimit==null){
    //               arr.push("用户购机限制:未设置");
    //             }else{
    //               arr.push("用户购机限制:"+this.details.userOrderLimit);
    //             }
    //         }
    //     }
    //         str = arr.join("、");
    //         return str;

    // },
    // 用户注册时长：
    userRegisterDurationFilter(type) {
      let str = '';
      if (type == undefined || type == null || type == '') {
        str = '未设置';
        return str;
      }
      if (type == 1) {
        str = '6个月以下';
      } else if (type == 2) {
        str = '6个月以上12个月以下';
      } else if (type == 3) {
        str = '1年以上';
      }
      return str;
    },
    // 奖励方式：
    rewardWayFilter(type) {
      let str = '';
      // if(type == undefined||type == null||type==''){
      //     str = '未设置'
      //     return str;
      // }else{
      if (type == 0) {
        str = '每张问卷';
      } else if (type == 1) {
        str = '每个活动';
      }
      return str;
      // }
    },
    // 审核状态：
    audiStatusFilter(value) {
      let str = '';
      if (value == 0) {
        str = '未审核';
      } else if (value == 1) {
        str = '审核中';
      } else if (value == 2) {
        str = '已审核';
      } else if (value == 3) {
        str = '审核失败';
      } else if (value == 6) {
        str = '已驳回';
      } else if (value == 7) {
        str = '待执行';
      } else if (value == 9) {
        str = '已结束';
      } else {
      }
      return str;
    },
    // 奖励类型:
    rewardTypeFilter(type) {
      let str = '';
      if (type == undefined || type == null || type == '') {
        str = '未设置';
        return str;
      }
      if (type == 0) {
        str = '实物奖励';
      } else if (type == 1) {
        str = '海贝奖励';
      } else if (type == 2) {
        str = '现金奖励';
      }
      return str;
    },
    // 奖励内容
    rewardMoneyFilter(obj) {
      let str = '';
      if (obj.rewardType == 0) {
        str = `${obj.rewardMoney}件`;
      } else if (obj.rewardType == 1) {
        str = `${obj.rewardMoney}海贝`;
      } else if (obj.rewardType == 2) {
        str = `${obj.rewardMoney}元`;
      }
      return str;
    }
  },
  watch: {
    showSurvey: 'delayQueryAll'
  },
  methods: {
    delayQueryAll() {
      this.tabLoading = true;
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/researchconfig/getResearchConfigList`, {
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
        .then((response) => {
          that.queryAll();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 推送审核
    sendExamine(id) {
      const that = this;
      this.$confirm('将推送到积分商城审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      })
        .then(() => {
          this.tabLoading = true;
          axios
            .get(`${this.apiUrl}vipcenter/researchAudit/pushOneStopConfig`, { params: { id } })
            .then((response) => {
              // console.log(response);
              // that.tabLoading = false;
              if (response.data.isSuccess) {
                that.$message.success('推送积分商城成功');
              } else {
                that.$message.error(response.data.msg);
              }
              that.queryAll();
            })
            .catch((error) => {
              that.tabLoading = false;
              console.log(error);
            });
        })
        .catch(() => {});
    },

    sendLimitFilter(type) {
      const arr = [];
      let str = '';
      if (type == undefined || type == null || type == '') {
        str = '未设置';
        arr.push(str);
      } else {
        if (type.indexOf('1') >= 0) {
          if (
            this.details.userComsumptionMin === ''
            || this.details.userComsumptionMin === null
            || this.details.userComsumptionMax === ''
            || this.details.userComsumptionMax === null
          ) {
            const obj = {};
            obj.name = '用户消费金额';
            obj.content = '未设置';
            arr.push(obj);
          } else {
            const obj = {};
            obj.name = '用户消费金额';
            obj.content = `${this.details.userComsumptionMin}元~~${this.details.userComsumptionMax}元`;
            arr.push(obj);
          }
        }
        if (type.indexOf('2') >= 0) {
          if (this.details.userOrderLimit == '' || this.details.userOrderLimit == null) {
            const obj = {};
            obj.name = '用户购机限制';
            obj.content = '未设置';
            arr.push(obj);
          } else {
            const reg = new RegExp("'", 'g');
            let newstr = this.details.userOrderLimit.replace(reg, '');
            if (newstr.indexOf(',')) {
              newstr = newstr.replace(/\,/g, '、');
            }
            const obj = {};
            obj.name = '用户购机限制';
            obj.content = newstr;
            arr.push(obj);
          }
        }
      }
      return arr;
    },
    showEmpty(row, column) {
      let str = '';
      if (row.member == '' || row.member == null) {
        str = '无';
      } else {
        str = row.member;
      }
      return str;
    },
    formatDate(row, column) {
      const date = new Date(row.crTime);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
      const hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
      const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
      return `${year}年${month}月${day}日 ${hour}:${minutes}`;
    },

    // 新建调研
    add() {
      this.$router.push('/dbOperate/rightsconfigrution');
    },
    // 修改
    modify(row) {
      if (row.audiStatus == 1) {
        this.$message.warning('审核中无法修改');
        return;
      }
      if (row.audiStatus == 2) {
        this.$message.warning('已审核无法修改');
        return;
      }
      if (row.audiStatus == 9) {
        this.$message.warning('已结束无法修改');
        return;
      }
      const { id } = row;
      this.$router.push({
        path: '/dbOperate/survey/addSurvey',
        query: { id, rightsGrantModelId: this.rightsGrantModelId }
      });
    },

    // 删除
    zxdelete(row) {
      if (row.audiStatus == 1) {
        this.$message.warning('审核中无法删除');
        return;
      }
      if (row.audiStatus == 2) {
        this.$message.warning('已审核无法删除');
        return;
      }
      if (row.audiStatus == 9) {
        this.$message.warning('已结束无法删除');
        return;
      }
      const { id } = row;
      const that = this;
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // alert("删除！")
          // 向后端发送删除请求
          axios
            .post(
              `${this.apiUrl}vipcenter/researchconfig/deleteResearchConfig`,
              qs.stringify({
                id
              })
            )
            .then((response) => {
              if (response.data.isSuccess == true) {
                that.$message({
                  type: 'success',
                  message: response.data.msg
                });
                that.queryAll();
              } else {
                that.$message({
                  type: 'error',
                  message: response.data.msg
                });
                that.tabLoading = false;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {});
    },

    // 查看
    previewSurvey(e) {
      // 请求查询接口

      this.details = e;
      this.fafanxianzhi = this.sendLimitFilter(e.sendLimit);
      const tmpArr = e.xiaoweiId.split(',');
      this.xwLength = tmpArr.length;

      this.dialogVisible = true;
    },

    // 改变当前最多显示多少页
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.tabLoading = true;
      this.queryAll();
    },

    // 翻页
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      const that = this;
      this.tabLoading = true;
      this.queryAll();
    },

    // 问题设置
    questionSetup(id) {
      this.$router.push({ path: '/dbOperate/survey/addQuestion', query: { id } });
    },

    // 数据统计
    countData(id) {
      this.$router.push({ path: '/dbOperate/survey/rightsDatacount', query: { id } });
    },
    queryAll() {
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/researchconfig/getResearchConfigList`, {
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
        .then((response) => {
          that.tabLoading = false;
          if (response.data.isSuccess == true) {
            that.surveyList = response.data.data.entities;
            that.total = response.data.data.entityCount;
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
    }
  }
};
</script>

<style scoped>
.dialogFlexBox {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.infoBoxC {
  display: flex;
  margin: 5px 0;
}
.infoBoxC .infoBoxR {
  padding: 0;
}
.infoBoxC span {
  white-space: nowrap;
}
.baseInfo {
  width: 100%;
  /*padding: 0 5px;*/
  color: #333;
  font-size: 18px;
  /*margin-top: 10px;*/
  padding-top: 10px;
  margin: 0 10px;
  border-top: 1px dashed #bbb;
}
.infoBox {
  /*border: 1px solid #ccc;*/
  margin-top: 10px;
  /*padding-left: 10px;*/
  padding: 0 15px;
}
.infoBox div {
  padding: 2px 0;
  color: #48576a;
  font-size: 14px;
}
.infoBox div span {
  font-weight: 600;
  font-size: 14px;
}
.pic {
  width: 100%;
  /*margin-top: 10px;*/
  padding-left: 10px;
}
.subPic {
  margin-right: 10px;
  padding: 10px 0px;
  border-top: 1px dashed #bbb;
  box-sizing: border-box;
}
.subPic h2 {
  width: 130px;
  color: #333;
  font-size: 18px;
  font-weight: 700;
  display: inline-block;
}
.pic img {
  height: 100px;
}
.previewBox .dialogFlexBox h2 {
  border-left: 5px solid orange;
  padding-left: 8px;
}
.top {
  padding: 20px;
}
.el-pager li:hover {
  color: #409eff;
}
.el-pager li.active {
  color: #ffffff !important;
  cursor: default;
}
.el-dialog__body {
  color: #48576a;
  font-size: 14px;
}
.el-dialog--small {
  width: 100%;
}
</style>
<style>
.surveyStyle .el-dialog__header .el-dialog__title {
  font-size: 26px;
  color: #6495ed;
}
.surveyStyle .el-dialog__body {
  padding-top: 10px;
}
.surveyStyle .previewBox .el-dialog--small {
  top: 10% !important;
  width: 34%;
  background-color: #eee;
}
.surveyStyle .el-table .el-table__row .cell .ingGrayFont {
  color: #bbb !important;
  text-decoration: line-through;
}
.surveyStyle .el-table .el-table__row .cell .hadGrayFont {
  color: #bbb !important;
  text-decoration: line-through;
}
.surveyStyle .btntip button {
  border: none;
  background-color: #eee;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  padding: 6px 0;
}
.surveyStyle .weishezhi {
  color: #48576a;
  font-weight: 500 !important;
}
</style>
