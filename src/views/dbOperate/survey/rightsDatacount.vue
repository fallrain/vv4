<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>数据统计 (问卷名称：{{ questionnaireName }})
        <el-button type="primary" class="last" @click="last">上一步</el-button>
      </p>
      <div class="clear"></div>
    </div>
    <div class="wenjuan">
      <span class="wenjuanTitle">问卷内容</span>
      <div class="question-list" v-for="(item, key) in qusList">
        <!-- <div class="question-item">
                    <div class="survey-question">
                      {{key+1}}.{{item.questionContent}}
                      ({{item.questionType==1?"单选题":(item.questionType==2?"多选题":"问答题")}})
                    </div>
                    <div class="survey-answer-select" v-for="(optionscount,key) in item.option">
                        <div class="survey-answer-select_box">
                            <div>{{optionscount.name?optionscount.name:turnIndex(key)}}.&nbsp;</div><div>{{optionscount.optionContent}}</div>
                            <div class="usernumber">（{{optionscount.selectNum}}人）</div>
                        </div>
                    </div>
                </div> -->
        <div class="question-item">
          <div class="survey-question">
            {{ key + 1 }}.{{ item.questionContent }} ({{
              item.questionType == 1 ? '单选题' : item.questionType == 2 ? '多选题' : '问答题'
            }})
            <!-- <div class="userpeople">(共100人参与)</div> -->
          </div>
          <div class="survey-answer-select" v-for="(optionscount, key) in item.option">
            <div class="survey-answer-select_box" v-if="key < max">
              <div class="survey-answer-option">
                {{ optionscount.answerUserName ? optionscount.answerUserName : turnIndex(key) }}：&nbsp;
              </div>
              <div class="survey-answer-option1">
                {{ item.questionType == 3 ? optionscount.answerContent : optionscount.optionContent }}
              </div>
              <div class="usernumber">{{ item.questionType == 3 ? '' : optionscount.selectNum }}</div>
            </div>
          </div>
          <el-button class="showmore" type="text" @click="showMore(item)" v-show="item.option.length > 10">
            显示更多...
          </el-button>
        </div>
      </div>
      <!-- <div class="question-list" v-for="(item, key) in questionList">
                <div class="question-item">
                    <div>
                        <div class="survey-question">{{key+1}}.{{item.question}}</div>
                        <div class="survey-answer-select" v-for="(optionscount,key) in item.optionscount">
                            <div class="survey-answer-select_box">
                                <div class="username">{{optionscount.name}}：</div><div>{{optionscount.option}}</div>
                            </div>
                        </div>
                    </div>
                </div>
              </div> -->
      <el-dialog
        class="trs-dialog"
        title="问卷内容"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        style="width: 100%;padding-right: 30%;"
        v-for="item in showquestion"
      >
        <div class="dialogstyle">
          <div class="survey-question">
            {{ item.questiontitle }}
            <!-- <div class="userpeople">(共100人参与)</div> -->
          </div>
          <div class="survey-answer-select" v-for="(state, index) in item.showoptions">
            <div class="survey-answer-select_box">
              <div class="dialogindex">{{ index + 1 }}、</div>
              <div class="survey-answer-option-dialog">{{ state.answerUserName }}：</div>
              <div class="survey-answer-option-dialog2">{{ state.answerContent }}</div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';

export default {
  data() {
    return {
      qusList: [],
      max: 10,
      dialogVisible: false,
      questionnaire: {},
      showquestion: [],
      questionnaireName: ''
    };
  },
  methods: {
    last() {
      this.$router.go(-1);
    },
    getDatacount() {
      const that = this;
      axios
        .post(`${this.apiUrl}vipcenter/research/getQuestionnaireStatistics`, {
          id: this.id
        })
        .then((response) => {
          that.questionnaire = response.data.data.questionnaire;
          that.questionnaireName = that.questionnaire.questionnaireName;
          that.qusList = response.data.data.questionList;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    turnIndex(val) {
      const alphabet = String.fromCharCode(65 + parseInt(val));
      return alphabet;
    },
    showMore(e) {
      this.showquestion = [];
      this.dialogVisible = true;
      const obj = {};
      obj.questiontitle = e.questionContent;
      obj.showoptions = e.option;
      obj.opstype = e.questionType;
      this.showquestion.push(obj);
    }
    // retract(e) {
    //     e.max = e.max-e.max+4;
    // }
  },
  created() {
    this.id = this.$route.query.id;
    // console.log(typeof this.id);
    this.getDatacount();
  },
  computed: {
    // showFlag: function(index) {
    //     return index < this.max;
    // },
  }
};
</script>
<style scoped>
.username {
  width: 50px;
}
.last {
  position: fixed;
  right: 200px;
  top: 160px;
}
.usernumber {
  position: absolute;
  color: red;
  margin-left: 300px;
  margin-top: 5px;
}
.showmore {
  margin-left: 60px;
  color: #ccc;
}
.retract {
  margin-left: 60px;
  color: #ccc;
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
.dialogstyle {
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}
.question-list {
  width: 400px;
  margin-top: 40px;
}
.survey-question {
  width: 350px;
  font-weight: 1000;
  word-break: break-word;
  display: flex;
}
.survey-answer-option {
  margin-top: 5px;
}
.survey-answer-option1 {
  margin-top: 5px;
  width: 340px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dialogindex {
  width: 30px;
}
.survey-answer-option-dialog {
  width: 80px;
  margin-left: 10px;
}
.survey-answer-option-dialog2 {
  width: 350px;
}
.question-item {
  margin-top: 15px;
}
.survey-answer-select {
  width: 100%;
}
.userpeople {
  color: red;
  position: absolute;
  margin-left: 480px;
}
.survey-answer-select_box {
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
}
</style>
