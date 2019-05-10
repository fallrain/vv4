<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <el-button v-if="jurisdiction['servicesOperations:customerManager:save']" type="primary" @click="addPersonnel()"
        >新增客服</el-button
      >
      <el-upload
        class="upload-demo"
        style="display:inline-block"
        :action="gUtils.getApiUrl() + 'vipcenter/batchCustomerController/uploadCustomerFile'"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :show-file-list="false"
        :on-success="handleSuccess"
      >
        <el-button type="primary">批量导入</el-button>
      </el-upload>
      <el-button v-if="jurisdiction['servicesOperations:customerManager:save']" type="primary" @click="download()"
        >模板下载</el-button
      >
      <el-input
        placeholder="请输入关键词检索"
        icon="search"
        v-model="searchEmail"
        :on-icon-click="handleIconClick"
        @keyup.enter.native="handleIconClick"
        style="width: 300px"
        class="fr"
      >
      </el-input>
      <div class="clear"></div>
    </div>
    <div v-loading="msgListLoading">
      <el-table :data="msgListData.entities" style="width: 100%">
        <el-table-column prop="templateName" label="序号" width="50">
          <template scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="姓名" min-width="20%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="20%"> </el-table-column>
        <el-table-column prop="mobile" label="手机号" min-width="20%"> </el-table-column>
        <el-table-column prop="groupName" label="分组" min-width="20%"> </el-table-column>
        <el-table-column prop="crUserName" label="创建人" min-width="17%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="crTime" label="创建时间" min-width="17%">
          <template scope="scope">
            {{ gUtils.dateFormat(scope.row.crTime, 'yyyy-MM-dd') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="20%">
          <template scope="scope">
            <a
              v-if="jurisdiction['servicesOperations:customerManager:delete']"
              href="javascript:;"
              class="operation-btn"
              @click="deleteCustomer(scope.row.id)"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import customer from './dialog/newCustomer.vue';
import gUtils from '../../utils/gUtils.js';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  components: {
    customer
  },
  data() {
    return {
      msgListLoading: false,
      msgListData: [],
      pageNo: 1,
      pageSize: 10,
      searchEmail: '',
      customer: {
        name: '',
        email: '',
        mobile: ''
      },
      form: ''
    };
  },
  filters: {},
  methods: {
    download() {
      window.location.href = `${gUtils.getApiUrl()}wechat/image/customer_template.xls`;
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
    // 邮箱检索
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    dialogFormChange(customer) {
      this.customer = {
        name: customer.name,
        email: customer.email,
        mobile: customer.mobile
      };
    },
    getForm(form) {
      this.form = form;
    },
    // 新增客服
    addPersonnel() {
      const self = this;
      const h = this.$createElement;

      this.$msgbox({
        title: '新增客服人员',
        customClass: 'add-personnel',
        message: h(
          'customer',
          {
            props: {
              dialogFormChange: this.dialogFormChange,
              form: this.getForm,
              random: Math.random()
            }
          },
          []
        ),
        showCancelButton: true,
        // showConfirmButton: true,
        beforeClose: (action, instance, done) => {
          if (action != 'cancel') {
            self.form.validate((valid) => {
              if (valid) {
                if (action === 'confirm') {
                  // instance.confirmButtonLoading = true;
                  // instance.confirmButtonText = '执行中...';

                  self.requestService
                    .addCustomer({
                      email: self.customer.email,
                      mobile: self.customer.mobile,
                      userName: self.customer.name
                    })
                    .then((data) => {
                      if (data) {
                        self.$message({
                          type: 'success',
                          message: '添加成功!'
                        });
                        // instance.confirmButtonLoading = false;
                        done();
                        self.listSearch();
                      } else {
                        // instance.confirmButtonLoading = false;
                      }
                    });
                } else {
                  done();
                }
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          } else {
            if (action === 'cancel') {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            }
            done();
          }
        }
      });
      /* .then(action => {
        if (action === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        }
      }); */
    },
    // 模板删除
    deleteCustomer(id) {
      const self = this;

      this.$confirm('您确定要删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.requestService
            .deleteCustomer({
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
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        whereCondition: self.searchEmail
      };

      this.msgListLoading = true;
      this.requestService.queryCustomer(data).then((data) => {
        self.msgListData = data;
        self.msgListLoading = false;
      });
    },
    typeChange() {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.listSearch();
      }
    },
    handleSizeChange(pageSize) {
      console.log(1);
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.pageSize = pageSize;
        this.listSearch();
      }
    },
    handleCurrentChange(pageNo) {
      console.log(2);
      if (!this.msgListLoading) {
        this.pageNo = pageNo;
        this.listSearch();
      }
    }
  },
  mounted() {
    this.listSearch();
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
