<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>分组名称<a href="javascript:;" class="color-link fr" @click="goback"
          ><i class="iconfont icon-chevron-copy-copy"></i>返回</a
        >
      </p>
      <p style="margin-bottom: 20px">{{ tagName }}</p>
      <p class="template-brand fl"><i></i>分组人员</p>
      <span style="line-height: 36px; margin-left: 15px;"
        >人数：{{ msgListData.entityCount }} （由于系统数据同步，分组人员信息最多会有5分钟延时）</span
      >
      <el-input
        placeholder="请输入手机号"
        icon="search"
        v-model="mobile"
        :on-icon-click="handleIconClick"
        @keyup.enter.native="handleIconClick"
        style="width: 300px"
        class="fr"
      >
      </el-input>

      <div class="clear"></div>
    </div>
    <div>
      <el-table :data="msgListData.entities" style="width: 100%;text-align: center;">
        <el-table-column prop="loginAccountName" label="用户名" min-width="20%"> </el-table-column>
        <el-table-column prop="mobile" label="手机号" min-width="20%"> </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="40%"> </el-table-column>
        <!--           <el-table-column label="操作" min-width="20%">
              <template slot-scope="scope">
                <a v-if="jurisdiction['member:memberTabManger:update']" href="javascript:;" class="color-link operation-btn" @click="addLabel(scope.row.id, scope.row)"><i class="iconfont icon-xiugai"></i>修改</a>
                <a v-if="jurisdiction['member:memberTabManger:delete']" href="javascript:;" class="color-link operation-btn" @click="deleteCustomer(scope.row.id)"><i class="iconfont icon-shanchu-copy"></i>删除</a>
              </template>
            </el-table-column> -->
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
      tagName: '',
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      searchEmail: '',
      customer: {
        tagName: '',
        tagDesc: ''
      },
      form: '',
      mobile: ''
    };
  },
  filters: {},
  methods: {
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
    goback() {
      history.go(-1);
    },
    // 新增客服
    addLabel(id, row) {
      const self = this;
      const h = this.$createElement;

      if (!id) {
        self.customer.tagDesc = '';
        self.customer.tagName = '';
      } else {
        self.customer.tagDesc = row.tagDesc;
        self.customer.tagName = row.tagName;
      }

      this.$msgbox({
        title: '新建标签',
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
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';

                if (id) {
                  self.requestVip
                    .updateVipMembersTag({
                      id,
                      tagDesc: self.customer.tagDesc,
                      tagName: self.customer.tagName
                    })
                    .then((data) => {
                      self.$message({
                        type: 'success',
                        message: '添加成功!'
                      });
                      done();
                      instance.confirmButtonLoading = false;
                      self.customer.tagDesc = '';
                      self.customer.tagName = '';
                      self.listSearch();
                    });
                } else {
                  self.requestVip
                    .insertVipMembersTag({
                      tagDesc: self.customer.tagDesc,
                      tagName: self.customer.tagName
                    })
                    .then((data) => {
                      self.$message({
                        type: 'success',
                        message: '添加成功!'
                      });
                      done();
                      instance.confirmButtonLoading = false;
                      self.customer.tagDesc = '';
                      self.customer.tagName = '';
                      self.listSearch();
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
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        groupId: self.$route.query.id,
        type: self.$route.query.type,
        mobile: self.mobile
      };

      this.msgListLoading = true;
      this.requestVip.getGroupMember(data).then((data) => {
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
    this.tagName = this.$route.query.name;
  }
};
</script>
