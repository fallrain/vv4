<template>
  <div class="rightsconfigrutiontwo">
    <div class="vip-content">
      <div class="rights-config-header-box">
        <div class="rights-config-header">
          <div class="header-title">
            <span>一站式调研配置</span>
          </div>
          <div class="rights-config-step " style="margin-left:35px">
            <div class="step-index">
              <span>1</span>
            </div>
            <div class="step-title">
              <span>选择发放场景</span>
            </div>
            <div class="step-bg"></div>
          </div>
          <div class="rights-config-step setted" style="margin-left:185px">
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
      <!-- <div class="vip-head-tool">
          <p class="template-brand">
              <i></i>一站式权益配置 STEP 2 —— 问卷配置
          </p >
          <div class="clear"></div>
        </div> -->
      <div class="creatSurvey">
        <el-button class="btn-padding-15" type="primary" @click="toAddQus">新增问题</el-button>
        <div class="content-head">
          <div class="content-head1" v-if="showAddQus">
            <span class="survey-type">问题类型:</span>
            <el-select v-model="select_type" placeholder="请选择题型" class="survey-type-select">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <div class="content-question" v-if="select_type">
            <span class="question-name">问题:</span>
            <el-input
              placeholder="请输入内容"
              class="question-content"
              v-model="newquestionContent"
              :maxlength="40"
            ></el-input>
          </div>
          <div class="answer-option" v-if="showAddQus">
            <el-button
              class="addOption"
              @click="addOption"
              type="primary"
              v-if="select_type == '1' || select_type == '2'"
              >新增选项</el-button
            >
            <el-button class="survey-submit" type="primary" @click="addQus" v-if="select_type != ''"
              >提交问题</el-button
            >
            <ul v-for="(item, key) in optionsList" v-show="select_type == '1' || select_type == '2'">
              <li>
                <span class="title-name">{{ turnIndex(key) }}</span>
                <el-input class="option" v-model="item.optionContent" :maxlength="40"></el-input>
                <button class="deleteOption" @click="deleteOption(key)">删除</button>
              </li>
            </ul>
          </div>
          <div class="wenjuan">
            <span class="wenjuanTitle">已添加的问题：</span>
            <div style="width: 100%;height: 1px;background-color: #bbb;margin:10px 0 0;"></div>
            <div class="wenjuanhuadongDiv">
              <div class="question-list" v-for="(item, key) in qusList" v-show="qusList.length > 0">
                <div class="question-item">
                  <div>
                    <div class="survey-question">
                      {{ key + 1 }}.{{ item.questionContent }} ({{
                        item.questionType == 1 ? '单选题' : item.questionType == 2 ? '多选题' : '问答题'
                      }})
                    </div>
                    <div class="survey-answer-select" v-for="(op, key) in item.options">
                      <div class="survey-answer-select_box">
                        <span>{{ turnIndex(key) }}</span>
                        <div>{{ op.optionContent }}</div>
                      </div>
                    </div>
                    <button class="deleteOption" @click="deleteQus(key)">删除</button>
                    <button class="modifyOption" @click="modifyOption(item)">修改</button>
                  </div>
                </div>
              </div>
              <div v-show="qusList.length == 0" class="kong">空</div>
            </div>
          </div>
        </div>
        <div class="submit">
          <el-button class="prev" @click="prevUrl">上一步</el-button>
          <el-button type="primary" class="next" @click="nextUrl">提交问卷，继续配置</el-button>
        </div>
      </div>
      <div class="diaoyan">
        <h2 class="diaoyan-top">可从已有调研的问卷添加问题：</h2>
        <el-table
          :data="surveyList"
          border
          v-loading="tabLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <el-table-column type="index" label="序号" width="60" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="questionnaireName" label="调研名称" width="185" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="member" label="所属产业" :formatter="showEmpty" width="80" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="crUserName" label="创建人" width="100" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="crTime" label="创建时间" width="140" show-overflow-tooltip>
            <template scope="scope">
              {{ scope.row.crTime | formatDate }}
            </template>
          </el-table-column>
          <el-table-column prop="crTime" label="操作" width="160">
            <template scope="scope">
              <div class="tab_btnSet">
                <button @click="preViewSurvey(scope.row)">预览</button>
                <button @click="copySurvey(scope.row)">复制问卷</button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          border
          :current-page.sync="pageNo"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="entityCount"
        >
        </el-pagination>
      </div>

      <div class="previewBox">
        <el-dialog title="问卷详情：" :visible.sync="showPreview" :modal-append-to-body="false" class="trs-dialog">
          <div>
            <div class="pre_title">
              <div><span>调研名称:</span>{{ preList.questionnaireName }}</div>
              <div><span>所属产业:</span>{{ preList.member }}</div>
              <div><span>创建人:</span>{{ preList.crUserName }}</div>
              <div><span>创建时间:</span>{{ preList.crTime | formatDate }}</div>
            </div>
            <div style="width: 100%;height: 1px;background-color: #bbb;"></div>
            <ul>
              <li>
                <div class="question-list" v-for="(item, index) in preList.qusList">
                  <div class="question-item">
                    <div>
                      <div class="survey-question">
                        <div style="white-space: nowrap;">{{ index + 1 }}.</div>
                        <div>
                          {{ item.questionContent }}({{
                            item.questionType == 1 ? '单选题' : item.questionType == 2 ? '多选题' : '问答题'
                          }})
                        </div>
                      </div>
                      <div class="survey-answer-select" v-for="(op, index) in item.options">
                        <div class="survey-answer-select_box">
                          <span>{{ turnIndex(index) }}</span>
                          <div>{{ op.optionContent }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-dialog>
      </div>

      <div class="xiugaiForm">
        <el-dialog
          title="修改"
          :visible.sync="modifyFlag"
          :before-close="cancelGg"
          :modal-append-to-body="false"
          class="trs-dialog"
        >
          <div>
            <el-form>
              <el-form-item label="问题">
                <el-input :value="modifyList.questionContent" :maxlength="40"></el-input>
              </el-form-item>
              <div v-for="(item, key) in modifyList.options" class="xiugaiFormOP">
                <el-form-item>
                  <div class="modifyAnswer">
                    <span>{{ turnIndex(key) }}</span>
                    <el-input :value="item.optionContent" :maxlength="40"></el-input>
                  </div>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelGg">取 消</el-button>
            <el-button type="primary" @click="gg">确 定</el-button>
          </span>
        </el-dialog>
      </div>

      <div class="tianjiaBox">
        <el-dialog
          title="可添加问题到问卷："
          :visible.sync="copyFlag"
          :before-close="cancelCopy"
          :modal-append-to-body="false"
          class="trs-dialog"
        >
          <div class="pre_title">
            <div><span>调研名称:</span>{{ newQusList.questionnaireName }}</div>
            <div><span>所属产业:</span>{{ newQusList.member }}</div>
            <div><span>创建人:</span>{{ newQusList.crUserName }}</div>
            <div><span>创建时间:</span>{{ newQusList.crTime | formatDate }}</div>
          </div>
          <div style="width: 100%;height: 1px;background-color: #bbb;"></div>
          <el-checkbox
            :disabled="disCheckAll"
            style="margin-top: 10px;"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选&nbsp;&nbsp;{{
              disCheckAll == true ? '*无法添加相同问题，本问卷的问题都已存在' : '*灰色选框为问卷已存在问题'
            }}</el-checkbox
          >
          <el-checkbox-group v-model="tmpList">
            <el-checkbox
              v-for="(item, index) in newQusList.qusList"
              :label="item"
              :key="index"
              class="checkBox"
              :disabled="item.canCopyFlag"
              >{{ index + 1 }}.{{ item.questionContent }}({{
                item.questionType == 1 ? '单选题' : item.questionType == 2 ? '多选题' : '问答题'
              }})
              <div v-for="(opc, key) in item.options" class="checkBoxDivMarginLeft">
                {{ turnIndex(key) }}.
                <div>{{ opc.optionContent }}</div>
              </div>
            </el-checkbox>
          </el-checkbox-group>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelCopy">取 消</el-button>
            <el-button type="primary" @click="copy">添 加</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * Title:
 * Description:接收传入的场景值和问卷名称，将问卷提交后获取返回的问卷id，将id传入下一个页面
 * Copyright: 2018 惠州巨合电子商务有限公司 版权所有.保留所有权
 * Company:惠州巨合电子商务有限公司(JH)
 * Project:
 * Author: kae
 * Create Time:2018/11/19 19:57
 */
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'rightsconfigrutiontwo',
  data() {
    return {
      options: [
        {
          value: '1',
          label: '单选题'
        },
        {
          value: '2',
          label: '多选题'
        },
        {
          value: '3',
          label: '问答题'
        }
      ],
      select_type: '',
      showPreview: false,
      showAddQus: false,
      copyFlag: false,
      modifyFlag: false,
      tabLoading: false,
      tmpForm: {},
      entityCount: 0,
      pageSize: 5,
      pageNo: 1,
      disCheckAll: false,
      modifyList: {},
      multipleSelection: [],
      optionsList: [], // 存放新增选项的数组
      preList: [], // 预览时的临时数组
      tmpList: [], // 复制时的临时数组
      beforeUpdateObj: {}, // 修改前的问题和答案等
      addtmpList: {}, // 新增问题时的临时数组
      newquestionContent: '',
      newQusList: [],
      questionairName: '', // 问卷名字
      qusList: [],
      surveyName: '',
      scene: '',
      surveyList: [],
      checkAll: false
    };
  },
  created() {
    // var storage=window.localStorage;
  },

  // qusList:this.qusList,
  // questionairName:this.surveyName,
  // member:this.scene
  mounted() {
    const storage = window.localStorage;
    if (storage.storageTwo) {
      let { storageTwo } = storage;
      storageTwo = JSON.parse(storageTwo);
      this.qusList = storageTwo.qusList;
      this.surveyName = storageTwo.surveyName;
      this.scene = storageTwo.scene;
    }
    if (
      this.$route.query.surveyName == ''
      || this.$route.query.surveyName == null
      || this.$route.query.surveyName == undefined
    ) {
    } else {
      this.surveyName = this.$route.query.surveyName;
    }
    if (this.$route.query.scene == '' || this.$route.query.scene == null || this.$route.query.scene == undefined) {
    } else {
      this.scene = this.$route.query.scene;
    }

    const that = this;
    axios
      .post(`${this.apiUrl}vipcenter/research/getQuestionnaireList`, {
        pageSize: this.pageSize,
        pageNo: this.pageNo
      })
      .then((response) => {
        if (response.data.isSuccess == true) {
          that.surveyList = response.data.data.entities;
          that.entityCount = response.data.data.entityCount;
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
  methods: {
    handleCheckAllChange(val) {
      const canSelectArr = [];
      for (let i = 0; i < this.newQusList.qusList.length; i++) {
        if (this.newQusList.qusList[i].canCopyFlag == false) {
          canSelectArr.push(this.newQusList.qusList[i]);
        }
      }
      // this.tmpList = this.checkAll? canSelectArr : [];
      // 新需求：直接复制问卷
      this.tmpList = this.checkAll ? canSelectArr : canSelectArr;
      // console.log('tmpList',this.tmpList);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      this.tabLoading = true;
      const that = this;
      this.pageSize = pageSize;
      axios
        .post(`${this.apiUrl}vipcenter/research/getQuestionnaireList`, {
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
        .then((response) => {
          if (response.data.isSuccess == true) {
            that.surveyList = response.data.data.entities;
            that.entityCount = response.data.data.entityCount;
            that.tabLoading = false;
          } else {
            that.tabLoading = false;
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
    handleCurrentChange(pageNo) {
      this.tabLoading = true;
      const that = this;
      this.pageNo = pageNo;
      axios
        .post(`${this.apiUrl}vipcenter/research/getQuestionnaireList`, {
          pageSize: this.pageSize,
          pageNo: this.pageNo
        })
        .then((response) => {
          if (response.data.isSuccess == true) {
            that.surveyList = response.data.data.entities;
            that.entityCount = response.data.data.entityCount;
            that.tabLoading = false;
          } else {
            that.tabLoading = false;
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
    prevUrl() {
      const storage = window.localStorage;
      const storageObj = {
        qusList: this.qusList,
        surveyName: this.surveyName,
        scene: this.scene
      };
      const storageTwo = JSON.stringify(storageObj);
      storage.setItem('storageTwo', storageTwo);
      this.$router.push({ path: 'rightsconfigrution' });
    },
    nextUrl() {
      const that = this;
      if (this.qusList.length != 0) {
        const loading = this.$loading({
          lock: true,
          text: '提交问卷中',
          spinner: 'el-icon-loading'
        });
        axios
          .post(
            `${this.apiUrl}vipcenter/research/addQuestionnaire`,
            {
              qusList: this.qusList,
              questionairName: this.surveyName,
              member: this.scene
            },
            { headers: { 'Content-Type': 'application/json;charset=utf-8' } }
          )
          .then((response) => {
            if (response.data.isSuccess == true) {
              const storage = window.localStorage;
              const storageObj = {
                qusList: that.qusList,
                surveyName: that.surveyName,
                scene: that.scene
              };
              const storageTwo = JSON.stringify(storageObj);
              storage.setItem('storageTwo', storageTwo);
              that.$message({
                type: 'success',
                message: '问卷提交成功'
              });
              const id = response.data.data;
              loading.close();
              that.$router.push({ path: '/dbOperate/rightsconfigrutionthree', query: { id: response.data.data } });
            } else {
              loading.close();
              that.$message({
                type: 'error',
                message: '提交失败'
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        that.$message({
          type: 'warning',
          message: '请新增问题'
        });
      }
    },
    addOption() {
      this.optionsList.push({});
    },
    turnIndex(val) {
      const alphabet = String.fromCharCode(65 + parseInt(val));
      return alphabet;
    },
    // 关闭预览：
    closePreview() {
      this.showPreview = false;
      this.preList = [];
    },
    // 取消复制是清空临时数组：
    cancelCopy() {
      this.copyFlag = false;
      this.checkAll = false;
      this.tmpList = [];
    },
    // 点击确定复制：
    copy(disSelectArr) {
      this.copyFlag = false;
      if (this.tmpList.length > 0) {
        if (disSelectArr.length != this.newQusList.qusList.length) {
          this.$message({
            type: 'success',
            message: '添加成功，已过滤重复问题'
          });
        } else {
          this.$message({
            type: 'success',
            message: '添加成功'
          });
        }
      } else {
        this.$message({
          type: 'success',
          message: '该问卷的所有问题都已存在'
        });
      }
      this.qusList = this.qusList.concat(this.tmpList);
      this.tmpList = [];
      this.checkAll = false;
    },
    deleteQus(key) {
      this.qusList.splice(key, 1);
    },
    // 确认修改问题：
    gg() {
      const formInput = document.getElementsByTagName('form')[0];
      const questionStr = formInput[0].value.replace(/(^\s*)|(\s*$)/g, '');
      if (questionStr == '' || questionStr == undefined || questionStr == null) {
        this.$message({
          type: 'warning',
          message: '问题不可修改为空'
        });
        return;
      }
      for (var i = 0; i < this.qusList.length; i++) {
        if (i == this.qusList.indexOf(this.modifyList)) {
          continue;
        }
        if (this.qusList[i].questionContent == questionStr) {
          this.$message({
            type: 'warning',
            message: '已存在该问题，请勿重复添加'
          });
          return;
        }
      }
      this.modifyList.questionContent = formInput[0].value;
      const list = [];
      for (var i = 1; i < formInput.length; i++) {
        const obj = {};
        obj.optionContent = formInput[i].value;
        list.push(obj);
      }
      for (var i = 0; i < list.length; i++) {
        const str = list[i].optionContent.replace(/(^\s*)|(\s*$)/g, ''); // 去除空格;
        if (str == '' || str == undefined || str == null) {
          this.$message({
            type: 'warning',
            message: '答案不可修改为空'
          });
          return;
        }
      }
      for (var i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (i == j) {
            continue;
          } else {
            const o1 = list[i].optionContent.replace(/(^\s*)|(\s*$)/g, '');
            const o2 = list[j].optionContent.replace(/(^\s*)|(\s*$)/g, '');
            if (o1 == o2) {
              this.$message.warning('不可修改为相同答案');
              return;
            }
          }
        }
      }
      // for(var i=0;i<list.length;i++){
      //     if(i==list.length-1){
      //         break;
      //     }else{
      //         var o1 = list[i].optionContent.replace(/(^\s*)|(\s*$)/g, '');
      //         var o2 = list[i+1].optionContent.replace(/(^\s*)|(\s*$)/g, '');
      //         if(o1==o2){
      //             this.$message({
      //                 type:"warning",
      //                 message:"不可修改为相同答案"
      //             })
      //             return;
      //         }
      //     }

      // }

      this.modifyList.options = list;
      this.modifyFlag = false;
    },
    // 取消修改：
    cancelGg() {
      this.modifyList = this.tmpForm;
      this.modifyFlag = false;
    },
    preViewSurvey(o) {
      const that = this;
      this.tabLoading = true;
      // 请求预览的问卷：
      axios
        .post(
          `${that.apiUrl}vipcenter/research/queryQuestionnaire`,
          { id: o.id },
          { headers: { 'Content-Type': 'application/json;charset=utf-8' } }
        )
        .then((response) => {
          // that.tmpList[]
          if (response.data.isSuccess == true) {
            that.preList = [];
            that.preList.questionnaireName = o.questionnaireName;
            that.preList.member = o.member;
            that.preList.crUserName = o.crUserName;
            that.preList.crTime = o.crTime;

            that.preList.qusList = response.data.data.question;
            that.tabLoading = false;
            that.showPreview = true;
          } else {
            that.tabLoading = false;
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });

      // this.showPreview = true;放到success里
    },
    loadDialogData(o) {},
    // 删除选项按钮
    deleteOption(key) {
      this.optionsList.splice(key, 1);
    },

    // 新增问题按钮：
    toAddQus() {
      this.showAddQus = true;
    },
    // 提交问题按钮
    addQus() {
      if (this.select_type == '1' || this.select_type == '2') {
        var str = this.newquestionContent.replace(/(^\s*)|(\s*$)/g, ''); // 去除空格;
        if (str == '' || str == undefined || str == null) {
          this.$message({
            type: 'warning',
            message: '请输入问题！'
          });
          return;
        }
        const optionFlag = false;
        const { optionsList } = this;
        if (this.select_type == '1' && this.optionsList.length < 2) {
          this.$message({
            type: 'warning',
            message: '请新增至少2个选项'
          });
          return;
        }
        if (this.select_type == '2' && this.optionsList.length < 3) {
          this.$message({
            type: 'warning',
            message: '请新增至少3个选项'
          });
          return;
        }

        for (var i = 0; i < optionsList.length; i++) {
          if (!optionsList[i].optionContent) {
            this.$message({
              type: 'warning',
              message: '请输入答案'
            });
            return;
          }

          const str1 = optionsList[i].optionContent.replace(/(^\s*)|(\s*$)/g, '');
          if (str1 == '' || str1 == undefined || str1 == null) {
            this.$message({
              type: 'warning',
              message: '请输入答案'
            });
            return;
          }
        }

        const firstOption = optionsList[0].optionContent;
        for (var i = 1; i < optionsList.length; i++) {
          if (firstOption == optionsList[i].optionContent) {
            this.$message({
              type: 'warning',
              message: '请勿输入重复选项'
            });
            return;
          }
        }
        for (var i = 0; i < optionsList.length; i++) {
          if (i == optionsList.length - 1) {
            break;
          }
          const o1 = optionsList[i].optionContent.replace(/(^\s*)|(\s*$)/g, '');
          const o2 = optionsList[i + 1].optionContent.replace(/(^\s*)|(\s*$)/g, '');
          if (o1 == o2) {
            this.$message({
              type: 'warning',
              message: '请勿输入重复选项'
            });
            return;
          }
        }

        this.addtmpList.questionContent = this.newquestionContent;
        for (var i = 0; i < this.qusList.length; i++) {
          if (this.qusList[i].questionContent == this.addtmpList.questionContent) {
            this.$message({
              type: 'warning',
              message: '已存在该问题，请勿重复提交'
            });
            return;
          }
        }
        this.addtmpList.options = this.optionsList;
        this.addtmpList.questionType = this.select_type;
        this.qusList.push(this.addtmpList);
        this.addtmpList = {};
        this.newquestionContent = '';
        this.optionsList = [];
      } else if (this.select_type == '3') {
        var str = this.newquestionContent.replace(/(^\s*)|(\s*$)/g, ''); // 去除空格;
        if (str == '' || str == undefined || str == null) {
          this.$message({
            type: 'warning',
            message: '请输入问题'
          });
          return;
        }
        this.addtmpList.questionContent = this.newquestionContent;
        for (var i = 0; i < this.qusList.length; i++) {
          if (this.qusList[i].questionContent == this.addtmpList.questionContent) {
            this.$message({
              type: 'warning',
              message: '已存在该问题，请勿重复提交'
            });
            return;
          }
        }

        this.addtmpList.options = [];
        this.addtmpList.questionType = this.select_type;
        this.qusList.push(this.addtmpList);
        this.addtmpList = {};
        this.newquestionContent = '';
        this.optionsList = [];
      }
    },
    // 修改问题和答案按钮
    modifyOption(o) {
      this.modifyList = o;
      this.modifyFlag = true;
    },
    copySurvey(o) {
      this.newQusList = [];
      // 这里拿到点击复制拿来的数据来渲染dialog
      const that = this;
      this.tabLoading = true;
      // 请求预览的问卷：
      axios
        .post(
          `${that.apiUrl}vipcenter/research/queryQuestionnaire`,
          { id: o.id },
          { headers: { 'Content-Type': 'application/json;charset=utf-8' } }
        )
        .then((response) => {
          // that.tmpList[]
          if (response.data.isSuccess == true) {
            that.newQusList = [];
            that.newQusList.questionnaireName = o.questionnaireName;
            that.newQusList.member = o.member;
            that.newQusList.crUserName = o.crUserName;
            that.newQusList.crTime = o.crTime;
            that.newQusList.qusList = response.data.data.question;
            for (var i = 0; i < that.newQusList.qusList.length; i++) {
              that.newQusList.qusList[i].canCopyFlag = false;
              for (let j = 0; j < that.qusList.length; j++) {
                if (that.newQusList.qusList[i].questionContent == that.qusList[j].questionContent) {
                  that.newQusList.qusList[i].canCopyFlag = true;
                  break;
                } else {
                  that.newQusList.qusList[i].canCopyFlag = false;
                }
              }
            }

            const disSelectArr = [];
            for (var i = 0; i < that.newQusList.qusList.length; i++) {
              if (that.newQusList.qusList[i].canCopyFlag == false) {
                disSelectArr.push(that.newQusList.qusList[i]);
              }
            }
            if (disSelectArr.length == that.tmpList.length) {
              that.disCheckAll = true;
            } else {
              that.disCheckAll = false;
            }
            // if(that.tmpList.length==canSelectArr.length){
            //     that.checkAll = true;
            // }else{
            //     that.checkAll = false;
            // }
            // if(canSelectArr==0){
            //     that.checkAll = false;
            // }

            // console.log(that.newQusList["qusList"]);
            that.tabLoading = false;
            that.copyFlag = false;
            that.handleCheckAllChange();
            that.copy(disSelectArr);
          } else {
            that.tabLoading = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // this.qusList=this.qusList.concat(newQusList);
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
    isSelectAll() {
      // alert(this.tmpList.length);
      const canSelectArr = [];
      for (let i = 0; i < this.newQusList.qusList.length; i++) {
        if (this.newQusList.qusList[i].canCopyFlag == false) {
          canSelectArr.push(this.newQusList.qusList[i]);
        }
      }

      if (this.tmpList.length == canSelectArr.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
      if (canSelectArr == 0) {
        this.checkAll = false;
      }
    }
  },
  filters: {
    formatDate(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
      const hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
      const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
      return `${year}-${month}-${day} ${hour}:${minutes}`;
    }
  },
  watch: {
    tmpList: 'isSelectAll'
  }
};
</script>
<style scoped>
.el-loading-mask {
  background-color: rgba(0, 0, 0, 0.7);
}
.el-table {
  border: none;
}

.creatSurvey {
  /*margin-left: 10px;*/
  position: relative;
  margin-top: 30px;
}
.next {
  background-color: #20a0ff;
  color: #fff;
  border: #20a0ff;
}
.next:hover {
  color: #fff;
  background-color: rgba(32, 160, 255, 0.7);
}
.survey-title {
  margin: 30px 0;
}
.survey-title-name {
  height: 36px;
  line-height: 36px;
  margin-right: 5px;
}
.title-content {
  width: 20%;
}
.xiugaiForm .modifyAnswer {
  line-height: 30px;
  position: relative;
}
.modifyAnswer span {
  position: absolute;
  line-height: 36px;
  top: 0;
  left: 5px;
  z-index: 999;
}
.modifyAnswer .el-input {
  padding-left: 25px;
}
.btn-padding-15 {
  margin-left: 20px;
}
.content-head {
  margin: 20px 20px;
  margin-top: 10px;
  font-weight: 500;
  min-height: 200px;
}
.checkBox {
  display: flex !important;
  margin-left: 0 !important;
}
.content-head1 {
  margin: 20px 20px;
  margin-top: 10px;
}
.survey-type-select {
  width: 20%;
}
.content-head1 .survey-type {
  display: inline-block;
  width: 80px;
  text-align: right;
}
.content-question .question-name {
  display: inline-block;
  width: 80px;
  text-align: right;
}
.content-question {
  margin: 20px 20px;
}
.question-name {
  /*margin-left: 50px;*/
}
.checkBoxDivMarginLeft {
  margin-left: 15px;
  display: flex;
}
.question-content {
  width: 20%;
}
.btnBr .question-content {
  margin-left: 20px;
  margin-bottom: 10px;
}
.answer-option {
  margin-top: 20px;
}

.answer-option li {
  display: flex;
  margin: 10px 53px;
}
.addOption {
  text-align: center;
}
.content-head .wenjuan {
  margin-top: 20px;
  border: 2px dashed #bbb;
  padding: 10px 10px;
  width: 30%;
  border-radius: 10px;
  box-shadow: 10px 10px 5px #888888;
}
.wenjuanTitle {
  font-size: 18px;
  font-weight: 700;
}
.title-name {
  width: 36px;
  height: 36px;
  line-height: 36px;
  display: inline-block;
  margin-right: 5px;
  text-align: center;
}
.question-item .survey-question {
  width: 90%;
}
.option {
  width: 21%;
}
.survey-submit {
  margin-left: 120px;
}
.wenjuanhuadongDiv .question-list:first-child {
  margin-top: 0px;
}
.question-list {
  width: 90%;
  margin-top: 20px;
}
.survey-question {
  width: 94%;
  display: flex;
  font-weight: 700;
  word-break: break-word;
}
.question-item {
  margin-top: 5px;
}
.survey-answer-select {
  width: 100%;
}
.survey-answer-select_box {
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-left: 20px;
}
.survey-answer-select_box span {
  display: inline-block;
  width: 20px;
}
.survey-answer-select .survey-answer-select_box div {
  margin: 0;
  display: inline-block;
  padding: 0;
  /*overflow: hidden;*/
  max-width: 360px;
  word-wrap: break-word;
  word-break: normal;
}

.diaoyan {
  position: absolute;
  top: 60px;
  left: 38%;
  margin-top: 50px;
}
.diaoyan-top {
  margin-bottom: 10px !important;
  font-size: 18px;
  font-weight: 500;
}
.submit {
  position: absolute;
  left: 50px;
  bottom: -70px;
  margin-left: 0 !important;
}
.tab_btnSet {
  white-space: nowrap;
}
.tab_btnSet button {
  background-color: #fff;
  color: #606266;
  border: 1px solid #dcdfe6;
  padding: 0 10px;
  border-radius: 5px;
  font-size: 12px;
}
.tab_btnSet button:last-child {
  background-color: #20a0ff !important;
  color: #fff;
  border-color: #20a0ff;
}
.tab_btnSet button:first-child:hover {
  background-color: rgba(225, 225, 225, 0.7) !important;
}
.tab_btnSet button:last-child:hover {
  background-color: rgba(32, 160, 255, 0.7) !important;
  color: #fff;
}
.tab_ansSet {
  max-width: 360px;
  display: flex;
}
.tab_ansSet span {
  flex: 1;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.tab_qusSet span {
  max-width: 200px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  width: 100%;
  text-align: center;
}
.deleteOption {
  display: inline-block;
  padding: 2px 20px;
  background-color: #f56c6c;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
}
.modifyOption {
  display: inline-block;
  font-size: 12px;
  padding: 3px 10px;
  background-color: #4395ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
}
.question-item .deleteOption {
  margin-top: 5px;
  font-size: 12px;
  padding: 3px 10px;
}
table td span {
  font-size: 12px;
}
.previewBox {
  border-radius: 10px;
  padding: 10px;
}

.pre_title {
  width: 100%;
  /*display: flex;*/
  flex-wrap: wrap;
  word-wrap: break-word;
  word-break: normal;
  margin-bottom: 10px;
}
.pre_title span {
  white-space: nowrap;
  /*padding: 0 20px;*/
  padding-left: 20px;
  font-weight: 600;
  /*display: block;*/
  display: inline-block;
  width: 30%;
}
.pre_title div {
  width: 100%;
  display: block;
}
.previewBox .question-list {
  width: 100%;
}
.previewBox .question-list .question-item {
  margin-top: -10px;
}
ul .question-list {
  padding-left: 20px;
}
.tianjiaBox .el-checkbox-group {
  /*margin-left: 20px;*/
  width: 90%;
}
.wenjuan .wenjuanhuadongDiv {
  max-height: 400px;
  overflow: auto;
  padding-bottom: 20px;
  min-height: 200px;
  position: relative;
}

.wenjuan .wenjuanhuadongDiv .kong {
  width: 50px;
  height: 50px;
  font-size: 30px;
  font-weight: 600;
  color: #888;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -25px;
  margin-top: -25px;
}

/*滚动条样式*/
.wenjuanhuadongDiv::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/*正常情况下滑块的样式*/

.wenjuanhuadongDiv::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在该类指向的控件上时滑块的样式*/

.wenjuanhuadongDiv:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在滑块上时滑块的样式*/

.wenjuanhuadongDiv::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*正常时候的主干部分*/

.wenjuanhuadongDiv::-webkit-scrollbar-track {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: white;
}
/*鼠标悬浮在滚动条上的主干部分*/

.wenjuanhuadongDiv::-webkit-scrollbar-track:hover {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.01);
}
.rightsconfigrutiontwo .vip-head-tool {
  margin-top: 30px;
}
</style>
<style>
.rightsconfigrutiontwo .tianjiaBox .el-checkbox-group .checkBox .el-checkbox__label {
  /*color: red !important;*/
  width: 90%;
  white-space: pre-wrap;
}
.rightsconfigrutiontwo .previewBox .el-dialog--small {
  width: 30% !important;
  min-height: 300px;
}
.rightsconfigrutiontwo .tianjiaBox .el-dialog--small {
  width: 30% !important;
  min-height: 300px;
}
.rightsconfigrutiontwo .previewBox .el-dialog__body {
  padding: 15px 20px 60px;
}
.rightsconfigrutiontwo .tianjiaBox .el-dialog__body {
  padding: 15px 20px;
}
.rightsconfigrutiontwo .xiugaiForm .el-dialog__body {
  padding: 10px 20px;
}
.rightsconfigrutiontwo .xiugaiForm .el-dialog__body .xiugaiFormOP {
}
.rightsconfigrutiontwo .xiugaiForm .el-dialog--small {
  width: 30%;
}
.rightsconfigrutiontwo .xiugaiForm .el-dialog__body .el-form-item__content {
  line-height: 1.5;
}
.rightsconfigrutiontwo .xiugaiForm .el-dialog__body .el-form-item__content .el-input {
  /*background-color: red;*/
}
.rightsconfigrutiontwo .rights-config-step .step-title {
  width: 123px;
  background: #e2e2e2;
  z-index: 1;
  margin-top: 6px;
  color: #252525;
  margin-left: 8px;
}
.rightsconfigrutiontwo .rights-config-step .step-index {
  width: 30px;
  background: #cecece;
  font-size: 12px;
  color: #252525;
  font-weight: bold;
  z-index: 2;
  text-align: center;
  line-height: 30px;
}
.rightsconfigrutiontwo .rights-config-header {
  transform: skewX(-45deg);
  background: #e0f0ff;
  /*width: 1000px;*/
  width: 1133px;
  /*margin-left: -45px;*/
}
.rightsconfigrutiontwo .rights-config-header .step-bg {
  width: 74px;
  margin-top: 16px;
  background: #fff;
  margin-left: 65px;
}
.rightsconfigrutiontwo .vip-head-tool {
  margin-top: 30px;
}
.rightsconfigrutiontwo .rights-config-step .step-title span {
  transform: skewX(45deg);
  font-size: 10px;
  display: block;
  line-height: 30px;
  text-align: center;
  padding-left: 20px;
}
.rightsconfigrutiontwo .rights-config-step.setted .step-index {
  background: #196acf;
  color: #fff;
}
.rightsconfigrutiontwo .rights-config-step.setted .step-title {
  background: #45a0f8;
  color: #fff;
  margin-left: 10px;
  width: 123px;
}
.rightsconfigrutiontwo .rights-config-step .step-index span {
  font-size: 12px;
}
</style>
