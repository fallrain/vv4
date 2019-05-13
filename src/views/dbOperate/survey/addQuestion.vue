<template>
  <div class="addQuestion">
    <div class="vip-content">
      <div class="vip-head-tool">
        <p class="template-brand"><i></i>调研问卷设置</p>
        <div class="clear"></div>
      </div>
      <div class="creatSurvey">
        <el-button class="btn-padding-15" type="primary" @click="toAddQus">新增问题</el-button>
        <el-button class="prev" type="primary" @click="prevUrl">返回</el-button>
        <!-- <el-button type="primary" class="next" @click="nextUrl">确认问卷，继续配置权益</el-button>  -->
        <div class="content-head">
          <div class="content-head1" v-if="showAddQus">
            <span class="survey-type">问题类型:</span>
            <el-select v-model="select_type" placeholder="请选择题型" class="survey-type-select">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <div class="content-question" v-if="showAddQus">
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
            <div class="wenjuanhuadongDiv" v-loading="QUSLoading">
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
                    <button class="deleteOption" @click="deleteQus(key, item)">删除</button>
                    <button class="modifyOption" @click="modifyOption(item)">修改</button>
                  </div>
                </div>
              </div>
              <div v-show="qusList.length == 0" class="kong">空</div>
            </div>
          </div>
        </div>
      </div>
      <div class="diaoyan">
        <h2 class="diaoyan-top">可从已有调研添加问题：</h2>
        <el-table
          :data="tabList"
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
            <template slot-scope="scope">
              {{ scope.row.crTime | formatDate }}
            </template>
          </el-table-column>
          <el-table-column prop="crTime" label="操作" width="135">
            <template slot-scope="scope">
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
              <div><span>调研名称:</span>{{ tmpList.questionnaireName }}</div>
              <div><span>所属产业:</span>{{ tmpList.member }}</div>
              <div><span>创建人:</span>{{ tmpList.crUserName }}</div>
              <div><span>创建时间:</span>{{ tmpList.crTime | formatDate }}</div>
            </div>
            <div style="width: 100%;height: 1px;background-color: #bbb;"></div>
            <ul>
              <li>
                <div class="question-list" v-for="(item, index) in tmpList.qusList">
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
  name: 'addQuestion',
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
      QUSLoading: false,
      tmpForm: {},
      entityCount: 0,
      pageSize: 5,
      pageNo: 1,
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
      tabList: [],
      checkAll: false,
      xinzengArray: [],
      id: 0,
      disCheckAll: false
    };
  },
  created() {
    this.id = this.id = parseInt(this.$route.query.id);
    this.getList();
    this.getTab();
  },

  // qusList:this.qusList,
  // questionairName:this.surveyName,
  // member:this.scene
  mounted() {},
  methods: {
    handleCheckAllChange(val) {
      const canSelectArr = [];
      for (let i = 0; i < this.newQusList.qusList.length; i++) {
        if (this.newQusList.qusList[i].canCopyFlag == false) {
          canSelectArr.push(this.newQusList.qusList[i]);
        }
      }
      // this.tmpList = this.checkAll? canSelectArr : [];
      // 新需求：复制问卷
      this.tmpList = this.checkAll ? canSelectArr : canSelectArr;
    },
    handleSelectionChange(val) {},
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getTab();
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.getTab();
    },
    prevUrl() {
      this.$router.go(-1);
    },
    addOption() {
      this.optionsList.push({});
    },
    turnIndex(val) {
      const alphabet = String.fromCharCode(65 + parseInt(val));
      return alphabet;
    },
    // 关闭预览：
    closePreview() {},
    // 取消复制是清空临时数组：
    cancelCopy() {
      this.copyFlag = false;
      this.checkAll = false;
      this.tmpList = [];
    },
    // 点击确定复制：
    copy() {
      // this.qusList = this.qusList.concat(this.tmpList);
      // console.log(this.tmpList);
      // this.xinzengArray.push(this.tmpList);
      const copyList = [];
      // console.log(this.xinzengArray);
      const that = this;
      for (let i = 0; i < this.tmpList.length; i++) {
        const obj = {};
        const tmpArr = [];
        for (let j = 0; j < this.tmpList[i].options.length; j++) {
          tmpArr.push(this.tmpList[i].options[j].optionContent);
        }
        obj.options = tmpArr;
        obj.questionContent = this.tmpList[i].questionContent;
        obj.questionType = this.tmpList[i].questionType;
        copyList.push(obj);
      }

      // console.log('this.tmpList',this.tmpList.length);
      // return;
      if (copyList.length == 0 && this.newQusList.qusList.length > 0) {
        this.$message.warning('该问卷的所有问题都已存在');
        return;
      }
      if (this.newQusList.qusList.length == 0) {
        this.$message.warning('问卷为空');
        return;
      }

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        target: '#app-view',
        background: 'rgba(255, 255, 255, 0.7)'
      });

      axios
        .post(
          `${this.apiUrl}vipcenter/research/addQuestion`,
          {
            qusList: copyList,
            questionnaireId: this.id
          },
          { headers: { 'Content-Type': 'application/json;charset=utf-8' } }
        )
        .then((response) => {
          loading.close();
          if (copyList.length == that.newQusList.qusList.length) {
            that.$message.success('添加成功');
          }
          if (copyList.length > 0 && copyList.length != that.newQusList.qusList.length) {
            that.$message.success('添加成功，已过滤重复问题');
          }

          if (response.data.isSuccess == true) {
            that.getList();
          } else {
            that.getList();
          }
        })
        .catch((error) => {
          console.log(error);
          loading.close();
        });
      this.tmpList = [];
      this.checkAll = false;
      this.copyFlag = false;
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
    deleteQus(key, o) {
      const that = this;
      this.$confirm('此操作将永久删除该问题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // let loading = this.$loading({
          //   lock: true,
          //   text: 'Loading',
          //   spinner: 'el-icon-loading',
          //
          //   background: 'rgba(255, 255, 255, 0.7)'
          // });
          this.qusList.splice(key, 1);
          axios
            .post(`${that.apiUrl}vipcenter/research/deleteQuestion`, {
              questionnaireId: this.id,
              questionId: o.questionId
            })
            .then((response) => {
              if (response.data.isSuccess == true) {
                that.getList();
                that.$message({
                  type: 'success',
                  message: '删除成功'
                });
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
        })
        .catch(() => {});
    },
    // 确认修改问题：
    gg() {
      const that = this;
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

      this.modifyList.options = list;
      const optionArray = [];
      for (var i = 0; i < list.length; i++) {
        const str = list[i].optionContent;
        optionArray.push(str);
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        target: '#app-view',
        background: 'rgba(255, 255, 255, 0.7)'
      });
      axios
        .post(`${that.apiUrl}vipcenter/research/updateQuestion`, {
          questionId: this.modifyList.questionId,
          questionType: this.modifyList.questionType,
          optionArray,
          questionContent: this.modifyList.questionContent
        })
        .then((response) => {
          loading.close();
          if (response.data.isSuccess == true) {
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
            that.tmpList = [];
            that.tmpList.questionnaireName = o.questionnaireName;
            that.tmpList.member = o.member;
            that.tmpList.crUserName = o.crUserName;
            that.tmpList.crTime = o.crTime;

            that.tmpList.qusList = response.data.data.question;
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
        if (this.optionsList.length < 2) {
          this.$message({
            type: 'warning',
            message: '请新增至少2个选项'
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
        this.xinzengArray.push(this.addtmpList);

        var that = this;
        for (var i = 0; i < this.xinzengArray.length; i++) {
          const tmpArr = [];
          for (let j = 0; j < this.xinzengArray[i].options.length; j++) {
            tmpArr.push(this.xinzengArray[i].options[j].optionContent);
          }
          this.xinzengArray[i].options = tmpArr;
        }

        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',

          background: 'rgba(255, 255, 255, 0.7)'
        });
        axios
          .post(
            `${this.apiUrl}vipcenter/research/addQuestion`,
            {
              qusList: this.xinzengArray,
              questionnaireId: this.id
            },
            { headers: { 'Content-Type': 'application/json;charset=utf-8' } }
          )
          .then((response) => {
            loading.close();
            if (response.data.isSuccess == true) {
              that.xinzengArray.pop();
              that.getList();
            } else {
              that.qusList.pop();
              that.xinzengArray.pop();
              that.getList();
            }
          })
          .catch((error) => {
            console.log(error);
          });
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
        this.xinzengArray.push(this.addtmpList);

        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',

          background: 'rgba(255, 255, 255, 0.7)'
        });
        axios
          .post(
            `${this.apiUrl}vipcenter/research/addQuestion`,
            {
              qusList: this.xinzengArray,
              questionnaireId: this.id
            },
            { headers: { 'Content-Type': 'application/json;charset=utf-8' } }
          )
          .then((response) => {
            loading.close();
            if (response.data.isSuccess == true) {
              that.xinzengArray.pop();
              that.getList();
            } else {
              that.qusList.pop();
              that.xinzengArray.pop();
              that.getList();
            }
          })
          .catch((error) => {
            console.log(error);
          });
        this.addtmpList.options = [];
        this.addtmpList.questionType = this.select_type;
        this.qusList.push(this.addtmpList);
        this.addtmpList = {};
        this.xinzengArray = [];
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

            // let canSelectArr = [];
            // for(var i=0;i<that.newQusList["qusList"].length;i++){
            //     if(that.newQusList.qusList[i].canCopyFlag == false){
            //         canSelectArr.push(that.newQusList.qusList[i]);
            //     }
            // }
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
    },
    isSelectAll() {
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
    },

    getTab() {
      this.tabLoading = true;
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/research/getQuestionnaireList`, {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          id: this.id
        })
        .then((response) => {
          that.tabLoading = false;
          if (response.data.isSuccess == true) {
            that.tabList = response.data.data.entities;
            that.entityCount = response.data.data.entityCount;
            // that.tabList.forEach((item,index,arr)=>{
            //   if(item.id==that.id){
            //     arr.splice(index,1);
            //   }

            // })
          } else {
            that.$message({
              type: 'error',
              message: response.data.msg
            });
          }
        })
        .catch((error) => {
          that.tabLoading = false;
          console.log(error);
        });
    },
    getList() {
      const that = this;
      this.id = parseInt(this.$route.query.id);
      // 请求预览的问卷：
      this.QUSLoading = true;
      axios
        .post(
          `${this.apiUrl}vipcenter/research/queryQuestionnaire`,
          { id: this.id },
          { headers: { 'Content-Type': 'application/json;charset=utf-8' } }
        )
        .then((response) => {
          that.QUSLoading = false;
          if (response.data.isSuccess == true) {
            that.qusList = response.data.data.question;
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
  width: 21%;
}
.question-name {
  margin-left: 50px;
}
.checkBoxDivMarginLeft {
  margin-left: 15px;
  display: flex;
}
.question-content {
  width: 25%;
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
  border: 1px dashed #bbb;
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
  margin-top: 15px;
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
  top: 20px;
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
  bottom: -100px;
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
</style>
<style>
.addQuestion .tianjiaBox .el-checkbox-group .checkBox .el-checkbox__label {
  /*color: red !important;*/
  width: 90%;
  white-space: pre-wrap;
}
.addQuestion .previewBox .el-dialog--small {
  width: 30% !important;
  min-height: 300px;
}
.addQuestion .tianjiaBox .el-dialog--small {
  width: 30% !important;
  min-height: 300px;
}
.addQuestion .previewBox .el-dialog__body {
  padding: 15px 20px 60px;
}
.addQuestion .tianjiaBox .el-dialog__body {
  padding: 15px 20px;
}
.addQuestion .xiugaiForm .el-dialog__body {
  padding: 10px 20px;
}
.addQuestion .xiugaiForm .el-dialog__body .xiugaiFormOP {
}
.addQuestion .xiugaiForm .el-dialog--small {
  width: 30%;
}
.addQuestion .xiugaiForm .el-dialog__body .el-form-item__content {
  line-height: 1.5;
}
.addQuestion .xiugaiForm .el-dialog__body .el-form-item__content .el-input {
  /*background-color: red;*/
}
</style>
