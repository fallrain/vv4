<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <el-button v-if="jurisdiction['setting:roleManager:save']" type="primary" class="fr" @click="addUser()"
        >新建角色</el-button
      >
      <div class="clear"></div>
    </div>
    <div v-loading="msgListLoading">
      <el-table :data="msgListData" style="width: 100%">
        <el-table-column prop="templateName" label="序号" width="50">
          <template scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称" min-width="25%"> </el-table-column>
        <el-table-column prop="enName" label="角色英文名" min-width="25%">
          <template scope="scope">
            <a href="javascript:;" class="color-link" @click="editRole(scope.row.id, scope.row.groupId)">{{
              scope.row.enName
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="角色备注" min-width="25%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="crUserName" label="创建人" min-width="17%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="crTime" label="创建时间" min-width="17%">
          <template scope="scope">
            {{ gUtils.dateFormat(scope.row.crTime, 'yyyy-MM-dd') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="25%">
          <template scope="scope">
            <a
              v-if="jurisdiction['setting:roleManager:edit']"
              href="javascript:;"
              class="color-link operation-btn"
              @click="addUser(scope.row.id, scope.row)"
              ><i class="iconfont icon-xiugai"></i>修改</a
            >
            <a
              v-if="jurisdiction['setting:roleManager:delete'] && scope.row.enName != 'admin'"
              href="javascript:;"
              class="operation-btn"
              @click="deleteRole(scope.row.id, scope.row.delFlag)"
              ><i class="iconfont icon-shanchu-copy"></i>删除</a
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" border :current-page.sync="pageNo" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="msgListData.entityCount">
          </el-pagination> -->
    </div>

    <edit-role
      :dialogFormChange="dialogFormChange"
      :form="getForm"
      :roleId="roleInfo.roleId"
      :groupId="roleInfo.groupId"
      :random="roleInfo.random"
      :roleDialogDisplay="roleDialogDisplay"
      :jurisdiction="jurisdiction"
      :closeDialog="closeEditRole"
    ></edit-role>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import role from './dialog/newRole.vue';
import gUtils from '../../utils/gUtils.js';
import editRole from './dialog/editRole.vue';


export default {
  components: {
    role,
    editRole
  },
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      searchEmail: '',
      role: {
        name: '',
        enName: '',
        remark: ''
      },
      form: '',
      brandArr: [
        {
          tagName: '海尔品牌',
          tagId: 'haier'
        },
        {
          tagName: '卡萨帝',
          tagId: 'casarte'
        }
      ],
      fromArr: [],
      roleInfo: {
        roleId: '',
        groupId: '',
        random: Math.random()
      },
      roleDialogDisplay: false
    };
  },
  filters: {},
  methods: {
    // 邮箱检索
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    dialogFormChange(role) {
      this.role = {
        name: role.name,
        enName: role.enName,
        remark: role.remark
      };
    },
    getForm(form) {
      this.form = form;
    },
    editLabel() {},
    // 新增／修改角色
    addUser(id, row) {
      const self = this;
      const h = this.$createElement;

      if (!id) {
        self.role.name = '';
        self.role.enName = '';
        self.role.remark = '';
      } else {
        self.role.name = row.name;
        self.role.enName = row.enName;
        self.role.remark = row.remark;
      }

      const title = id ? '修改角色' : '新建角色';
      this.$msgbox({
        title,
        customClass: 'add-personnel',
        message: h(
          'role',
          {
            props: {
              dialogFormChange: this.dialogFormChange,
              form: this.getForm,
              formData: self.role,
              edit: id, // enName不可修改
              random: Math.random()
            }
          },
          []
        ),
        showCancelButton: true,
        // showConfirmButton: true,
        beforeClose: (action, instance, done) => {
          console.log(self.role);
          instance.$children[2].customer = self.role; // user重新复值

          if (action == 'cancel') {
            self.role.name = '';
            self.role.enName = '';
            self.role.remark = '';
            done();
            return false;
          }

          self.form.validate((valid) => {
            if (valid) {
              // self.form.resetFields()
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                // instance.confirmButtonText = '执行中...';

                if (id) {
                  self.requestPower
                    .updateRole({
                      roleId: id,
                      name: self.role.name,
                      enName: self.role.enName,
                      remark: self.role.remark
                    })
                    .then((data) => {
                      instance.confirmButtonLoading = false;
                      if (data) {
                        self.$message({
                          type: 'success',
                          message: '修改成功!'
                        });
                        done();
                        self.role.name = '';
                        self.role.enName = '';
                        self.role.remark = '';
                        self.listSearch();
                      }
                    });
                } else {
                  self.requestPower
                    .addRole({
                      name: self.role.name,
                      enName: self.role.enName,
                      remark: self.role.remark
                    })
                    .then((data) => {
                      instance.confirmButtonLoading = false;
                      if (data) {
                        self.$message({
                          type: 'success',
                          message: '添加成功!'
                        });
                        done();
                        self.role.name = '';
                        self.role.enName = '';
                        self.role.remark = '';
                        self.listSearch();
                      }
                    });
                }
              } else {
                self.role.name = '';
                self.role.enName = '';
                self.role.remark = '';
                done();
              }
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      })
        .then((action) => {
          if (action === 'cancel') {
            self.form.resetFields();
            this.$message({
              type: 'info',
              message: '已取消'
            });
          }
        })
        .catch((action) => {});
    },
    // 角色设置
    editRole(id, groupId) {
      this.roleDialogDisplay = true;
      console.log(groupId);
      this.roleInfo = {
        roleId: id,
        groupId,
        random: Math.random()
      };
    },
    closeEditRole() {
      this.roleDialogDisplay = false;
    },
    // 模板删除
    deleteRole(id, delFlag) {
      const self = this;

      this.$confirm('您确定要删除该角色吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.requestPower
            .deleteRole({
              roleId: id
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
      this.requestPower.queryAllRole().then((data) => {
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
    },
    getUserFromTag() {
      const self = this;
      this.requestPower.getUserFromTag().then((data) => {
        self.fromArr = data;
      });
    }
  },
  mounted() {
    this.listSearch();
    this.getUserFromTag();
    console.log(this);
  }
};
</script>
