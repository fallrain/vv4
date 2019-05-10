<template>
  <div class="vip-content">
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane label="常用Q&A管理" name="first">
        <div class="vip-head-tool">
          <p class="template-brand">
            <!-- <i></i>常用Q&A管理 -->
            <el-input
              placeholder="请输入查找内容"
              icon="search"
              v-model="searchAQKeywork"
              :on-icon-click="handleIconClick"
              @keyup.enter.native="handleIconClick"
              style="width: 300px"
              class="fr"
            >
            </el-input>
            <el-select
              v-model="categoryId"
              placeholder="请选择分类"
              class="fr"
              style="margin-right: 10px"
              @change="categoryChange"
              clearable
            >
              <el-option v-for="item in category" :key="item.id" :label="item.categoryName" :value="item.id">
              </el-option>
            </el-select>
            <el-button
              v-if="jurisdiction['servicesOperations:customerKnowledgeManager:save']"
              type="primary"
              @click="addQA()"
              style="margin-right:7px"
              >添加常用Q&A</el-button
            >
            <!-- <el-button v-if="jurisdiction['customer:QAManager:save']" type="primary" @click="addQA()" style="margin-right: 10px">批量导入</el-button> -->
            <el-upload
              class="upload-demo"
              style="display:inline-block"
              :action="gUtils.getApiUrl() + 'vipcenter/batchQuestionAndAnswerController/uploadQuestionAndAnswerFile'"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :show-file-list="false"
              :on-success="handleSuccess"
            >
              <el-button type="primary">批量导入</el-button>
            </el-upload>
            <!-- <el-button v-if="jurisdiction['customer:QAManager:save']" type="primary" @click="addQA()" style="margin-right:7px">模板下载</el-button> -->
            <el-button
              v-if="jurisdiction['servicesOperations:customerKnowledgeManager:save']"
              type="primary"
              @click="download()"
              >模板下载</el-button
            >
          </p>
          <div class="clear"></div>
        </div>
        <div v-loading="msgListLoading" style="margin-bottom: 32px">
          <el-table :data="msgListData.entities" style="width: 100%">
            <el-table-column prop="templateName" label="序号" width="50">
              <template scope="scope">
                {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="categoryName" label="分类" min-width="15%" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="question" label="知识内容" min-width="40%">
              <template scope="scope">
                <p class="aq-desc">Q : {{ scope.row.question }}</p>
                <p class="aq-desc">A : {{ scope.row.answer }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="crUserName" label="创建人" min-width="15%" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="crTime" label="创建时间" min-width="15%" show-overflow-tooltip>
              <template scope="scope">
                {{ gUtils.dateFormat(scope.row.crTime, 'yyyy-MM-dd') }}
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="30%">
              <template scope="scope">
                <a
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="editQA(scope.row.question, scope.row.answer, scope.row.id, scope.row.categoryId)"
                  ><i
                    class="iconfont icon-xiugai
                      "
                  ></i
                  >修改</a
                >
                <a
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="addQA(scope.row.question, scope.row.answer, scope.row.categoryId)"
                  ><i class="iconfont icon-chakan"></i>查看</a
                >
                <a
                  v-if="jurisdiction['servicesOperations:customerKnowledgeManager:delete']"
                  href="javascript:;"
                  class="operation-btn"
                  @click="deleteQA(scope.row.id)"
                  ><i class="iconfont icon-shanchu-copy"></i>删除</a
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            border
            :current-page.sync="pageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="msgListData.entityCount"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史发送记录" name="second">
        <div class="vip-head-tool">
          <p class="template-brand">
            <!-- <i></i>历史发送记录 -->
            <el-input
              placeholder="请输入主题"
              icon="search"
              v-model="searchHistoryKeywork"
              :on-icon-click="historyHandleIconClick"
              style="width: 300px"
              class="fr"
            >
            </el-input>
          </p>
          <div class="clear"></div>
        </div>
        <div v-loading="historyListLoading">
          <el-table :data="historyListData.entities" style="width: 100%">
            <el-table-column prop="templateName" label="序号" width="50">
              <template scope="scope">
                {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="subject" label="主题" min-width="20%" show-overflow-tooltip> </el-table-column>
            <!-- <el-table-column prop="content" label="内容" min-width="20%" show-overflow-tooltip>
                  <template scope="scope">
                    <div v-html="scope.row.content"></div>
                  </template>
                </el-table-column> -->
            <el-table-column prop="crUserName" label="维护人" min-width="20%"> </el-table-column>
            <el-table-column prop="crTime" label="发送时间" min-width="20%"> </el-table-column>
            <el-table-column label="操作" min-width="20%">
              <template scope="scope">
                <a href="javascript:;" class="color-link operation-btn" @click="toDetail(scope.row.id, 'view')"
                  ><i class="iconfont icon-chakan"></i>查看</a
                >
                <!-- <a v-if="jurisdiction['customer:sendMessageManager:delete']" href="javascript:;" class="operation-btn" @click="deleteQA(scope.row.id)"><i class="iconfont icon-shanchu-copy"></i>删除</a> -->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="historyHandleSizeChange"
            @current-change="historyHandleCurrentChange"
            border
            :current-page.sync="historyPageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="historyPageSize"
            layout="sizes, prev, pager, next"
            :total="historyListData.entityCount"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="邮件模板" name="third">
        <div class="vip-head-tool">
          <p class="template-brand">
            <!-- <i></i>历史发送记录 -->
            <el-input
              placeholder="请输入主题"
              icon="search"
              v-model="searchMailKeywork"
              :on-icon-click="mailHandleIconClick"
              style="width: 300px"
              class="fr"
            >
            </el-input>
          </p>
          <div class="clear"></div>
        </div>
        <div v-loading="mailListLoading">
          <el-table :data="mailListData.entities" style="width: 100%">
            <el-table-column prop="templateName" label="序号" width="50">
              <template scope="scope">
                {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="templateName" label="主题" min-width="20%" show-overflow-tooltip> </el-table-column>
            <!-- <el-table-column prop="content" label="内容" min-width="20%" show-overflow-tooltip>
                  <template scope="scope">
                    <div v-html="scope.row.content"></div>
                  </template>
                </el-table-column> -->
            <el-table-column prop="crUserName" label="维护人" min-width="20%"> </el-table-column>
            <el-table-column prop="crTime" label="创建时间" min-width="20%"> </el-table-column>
            <el-table-column label="操作" min-width="20%">
              <template scope="scope">
                <a href="javascript:;" class="color-link operation-btn" @click="toDetail(scope.row.id, 'edit')"
                  ><i class="iconfont icon-xiugai"></i>修改</a
                >
                <a href="javascript:;" class="operation-btn" @click="deleteMail(scope.row.id)"
                  ><i class="iconfont icon-shanchu-copy"></i>删除</a
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="mailHandleSizeChange"
            @current-change="mailHandleCurrentChange"
            border
            :current-page.sync="mailPageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="mailPageSize"
            layout="sizes, prev, pager, next"
            :total="mailListData.entityCount"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>

    <add-qa
      :data="qaDialog.data"
      :random="qaDialog.random"
      :display="qaDialog.display"
      :jurisdiction="jurisdiction"
      :close="qaClose"
      :isView="qaDialog.isView"
      :refresh="listSearch"
    ></add-qa>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import gUtils from '../../utils/gUtils.js';
import addQa from './dialog/newQA.vue';

export default {
  components: {
    addQa
  },
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      activeName2: 'first',
      msgListData: [],
      historyListData: [],
      mailListData: [],
      pageNo: 1,
      historyPageNo: 1,
      mailPageNo: 1,
      msgListLoading: false,
      historyListLoading: false,
      mailListLoading: false,
      pageSize: 10,
      historyPageSize: 10,
      mailPageSize: 10,
      searchAQKeywork: '',
      searchHistoryKeywork: '',
      searchMailKeywork: '',
      qaDialog: {
        display: false,
        data: {},
        random: Math.random(),
        isView: false
      },
      category: [],
      categoryId: ''
    };
  },
  filters: {},
  methods: {
    download() {
      window.location.href = `${gUtils.getApiUrl()}wechat/image/QA_template.xls`;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(response, file, fileList) {
      if (response.isSuccess) {
        this.pageNo = 1;
        this.listSearch();
        this.$message({
          type: 'success',
          message: '导入成功!'
        });
      } else if (response.msg) {
        this.$message({
          type: 'warning',
          message: response.msg
        });
      }
    },
    qaClose() {
      this.qaDialog.display = false;
    },
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    historyHandleIconClick() {
      this.historyPageNo = 1;
      this.historySearch();
    },
    mailHandleIconClick() {
      this.mailPageNo = 1;
      this.listCustomerEmail();
    },
    // 添加问答
    addQA(q, a, categoryId) {
      this.qaDialog.display = true;
      this.qaDialog.random = Math.random();
      this.qaDialog.data = {
        question: q,
        answer: a,
        categoryId: categoryId || ''
      };

      this.qaDialog.isView = !!(q || a);
    },
    // 修改回答
    editQA(q, a, id, categoryId) {
      this.qaDialog.display = true;
      this.qaDialog.random = Math.random();
      this.qaDialog.data = {
        question: q,
        answer: a,
        id,
        categoryId
      };

      this.qaDialog.isView = false;
    },
    // 模板删除
    deleteQA(id) {
      const self = this;

      this.$confirm('您确定要删除该问题吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.requestService
            .deleteQA({
              id
            })
            .then((data) => {
              self.listSearch();
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    deleteMail(id) {
      const self = this;

      this.$confirm('您确定要删除该模板吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.requestService
            .deleteCustomerEmail({
              id
            })
            .then((data) => {
              self.listCustomerEmail();
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        whereCondition: self.searchAQKeywork,
        categoryId: self.categoryId
      };

      this.msgListLoading = true;
      this.requestService.queryQA(data).then((data) => {
        self.msgListData = data;
        self.msgListLoading = false;
      });
    },
    // 跳转发送详情
    toDetail(id, type) {
      this.$router.push({
        path: '/service/sendnotice',
        query: {
          id,
          type
        }
      });
    },
    historySearch() {
      const self = this;

      const data = {
        pageNo: self.historyPageNo,
        pageSize: self.historyPageSize,
        whereCondition: self.searchHistoryKeywork
      };

      this.historyListLoading = true;
      this.requestService.historyQA(data).then((data) => {
        self.historyListData = data;
        self.historyListLoading = false;
      });
    },
    typeChange() {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.listSearch();
      }
    },
    handleSizeChange(pageSize) {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.pageSize = pageSize;
        this.listSearch();
      }
    },
    handleCurrentChange(pageNo) {
      if (!this.msgListLoading) {
        this.pageNo = pageNo;
        this.listSearch();
      }
    },
    historyHandleSizeChange(pageSize) {
      if (!this.historyListLoading) {
        this.historyPageNo = 1;
        this.historyPageSize = pageSize;
        this.historySearch();
      }
    },
    historyHandleCurrentChange(pageNo) {
      if (!this.historyListLoading) {
        this.historyPageNo = pageNo;
        this.historySearch();
      }
    },
    listCustomerEmail() {
      const self = this;

      const data = {
        pageNo: self.mailPageNo,
        pageSize: self.mailPageSize,
        whereCondition: self.searchMailKeywork
      };

      this.mailListLoading = true;
      this.requestService.listCustomerEmail(data).then((data) => {
        self.mailListData = data;
        self.mailListLoading = false;
      });
    },
    mailHandleSizeChange(pageSize) {
      if (!this.mailListLoading) {
        this.mailPageNo = 1;
        this.mailPageSize = pageSize;
        this.listCustomerEmail();
      }
    },
    mailHandleCurrentChange(pageNo) {
      if (!this.mailListLoading) {
        this.mailPageNo = pageNo;
        this.listCustomerEmail();
      }
    },
    queryQACategory() {
      const self = this;
      self.requestService
        .queryQACategory({
          pageNo: 1,
          pageSize: 100
        })
        .then((data) => {
          if (data) {
            // let category = [{
            //   id: '',
            //   categoryName: '全部分类'
            // }]
            self.category = data.entities;
          }
        });
    },
    categoryChange() {
      this.listSearch();
    }
  },
  mounted() {
    this.listSearch();
    this.historySearch();
    this.listCustomerEmail();
    this.queryQACategory();
    $('.el-pagination__sizes')
      .find('input')
      .on('click', () => {
        $('.el-pagination__sizes')
          .find('input')
          .blur();
      });
  }
};
</script>
