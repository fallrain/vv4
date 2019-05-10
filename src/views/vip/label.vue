<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>标签列表
        <el-button v-if="jurisdiction['member:memberTabManger:save']" type="primary" class="fr" @click="addLabel()"
          >新建标签</el-button
        >
      </p>
      <div class="clear"></div>
    </div>
    <div v-loading="msgListLoading">
      <el-table :data="msgListData.entities" style="width: 100%">
        <el-table-column prop="templateName" label="序号" width="50">
          <template scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="tagName" label="标签名称" min-width="20%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="tagDesc" label="内容描述" min-width="28%" show-overflow-tooltip> </el-table-column>
        <!-- <el-table-column prop="mobile" label="标签来源" min-width="20%"> </el-table-column> -->
        <el-table-column prop="crUserName" label="创建人" min-width="12%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="crTime" label="创建时间" min-width="20%">
          <template scope="scope">
            <div>{{ gUtils.dateFormat(scope.row.crTime, 'yyyy-MM-dd') }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="标签人员" min-width="12%">
          <template scope="scope">
            <a
              v-if="jurisdiction['member:memberTabManger:update']"
              href="javascript:;"
              class="color-link operation-btn"
              @click="toDetail(scope.row.id, scope.row)"
              >查看</a
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="20%">
          <template scope="scope">
            <a
              v-if="jurisdiction['member:memberTabManger:update']"
              href="javascript:;"
              class="color-link operation-btn"
              @click="addLabel(scope.row.id, scope.row)"
              ><i class="iconfont icon-xiugai"></i>修改</a
            >
            <a
              v-if="jurisdiction['member:memberTabManger:delete']"
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
import customer from './dialog/newLable.vue';
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
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      searchEmail: '',
      customer: {
        tagName: '',
        tagDesc: ''
      },
      form: ''
    };
  },
  filters: {},
  methods: {
    toDetail(id, row) {
      this.$router.push({
        path: '/vip/labeluser',
        query: {
          id,
          name: row.tagName
        }
      });
    },
    // 邮箱检索
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    dialogFormChange(customer) {
      this.customer = {
        tagName: customer.tagName,
        tagDesc: customer.tagDesc
      };
    },
    getForm(form) {
      this.form = form;
    },
    editLabel() {},
    // 新增客服
    addLabel(id, row) {
      const self = this;
      const h = this.$createElement;
      let title = '新建标签';

      if (!id) {
        self.customer.tagDesc = '';
        self.customer.tagName = '';
      } else {
        self.customer.tagDesc = row.tagDesc;
        self.customer.tagName = row.tagName;
        title = '修改标签';
      }

      this.$msgbox({
        title,
        customClass: 'add-personnel',
        message: h(
          'customer',
          {
            props: {
              dialogFormChange: this.dialogFormChange,
              form: this.getForm,
              formData: self.customer
            }
          },
          []
        ),
        showCancelButton: true,
        // showConfirmButton: true,
        beforeClose: (action, instance, done) => {
          instance.$children[2].customer = self.customer; // customer重新复值

          if (action == 'cancel') {
            self.customer.tagDesc = '';
            self.customer.tagName = '';
            done();
            return false;
          }

          self.form.validate((valid) => {
            if (valid) {
              if (action === 'confirm') {
                // instance.confirmButtonLoading = true;
                // instance.confirmButtonText = '执行中...';

                if (id) {
                  self.requestVip
                    .updateVipMembersTag({
                      id,
                      tagDesc: self.customer.tagDesc,
                      tagName: self.customer.tagName
                    })
                    .then((data) => {
                      if (data) {
                        self.$message({
                          type: 'success',
                          message: '修改成功!'
                        });
                        // instance.confirmButtonLoading = false;
                        self.customer.tagDesc = '';
                        self.customer.tagName = '';
                        self.listSearch();
                        done();
                      }
                    });
                } else {
                  self.requestVip
                    .insertVipMembersTag({
                      tagDesc: self.customer.tagDesc,
                      tagName: self.customer.tagName
                    })
                    .then((data) => {
                      if (data) {
                        self.$message({
                          type: 'success',
                          message: '添加成功!'
                        });
                        done();
                        // instance.confirmButtonLoading = false;
                        self.customer.tagDesc = '';
                        self.customer.tagName = '';
                        self.listSearch();
                      } else {
                        // instance.confirmButtonLoading = false;
                      }
                    });
                }
              } else {
                self.customer.tagDesc = '';
                self.customer.tagName = '';
                done();
              }
            } else {
              return false;
            }
          });
        }
      }).then((action) => {
        if (action === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        }
      });
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
          this.requestVip
            .tagChangeStatus({
              id,
              status: '-1'
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
        pageNum: self.pageNo,
        pageSize: self.pageSize
      };

      this.msgListLoading = true;
      this.requestVip.queryCustomer(data).then((data) => {
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
    }
  },
  mounted() {
    this.listSearch();
  }
};
</script>
