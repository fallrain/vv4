<template>
  <div class="edit-role">
    <el-dialog
      title="角色管理"
      ref="userDialog"
      :visible.sync="dialogDisplay"
      @open="roleDialogOpen"
      custom-class="edit-role"
      :modal-append-to-body="false"
      @close="roleDialogClose"
    >
      <el-radio-group v-model="tab" style="margin-bottom: 5px;">
        <el-radio-button label="角色详情"></el-radio-button>
        <el-radio-button
          v-if="jurisdiction['setting:roleManager:saveRights'] && detailForm.enName != 'admin'"
          label="权限分配"
        ></el-radio-button>
        <el-radio-button
          v-if="jurisdiction['setting:roleManager:saveUser'] || jurisdiction['setting:roleManager:deleteUser']"
          label="用户管理"
        ></el-radio-button>
      </el-radio-group>

      <div v-if="tab == '角色详情'" style="border:1px solid #f1f1f1;padding: 20px 0;">
        <el-form :model="detailForm" ref="customer" label-width="220px">
          <el-form-item label="角色中文名：" prop="name">
            <p class="form-p">{{ detailForm.name }}</p>
          </el-form-item>
          <el-form-item label="角色英文名：" prop="enName">
            <p class="form-p">{{ detailForm.enName }}</p>
          </el-form-item>
          <el-form-item label="角色备注：" prop="remark">
            <p class="form-p">{{ detailForm.remark }}</p>
          </el-form-item>
          <el-form-item label="角色创建时间：" prop="crTime">
            <p class="form-p">{{ gUtils.dateFormat(detailForm.crTime, 'yyyy-MM-dd') }}</p>
          </el-form-item>
          <el-form-item label="角色创建人：" prop="crUserId">
            <p class="form-p">{{ detailForm.crUserName }}</p>
          </el-form-item>
          <el-form-item label="最后编辑时间：" prop="upTime">
            <p class="form-p">{{ gUtils.dateFormat(detailForm.upTime, 'yyyy-MM-dd') }}</p>
          </el-form-item>
          <el-form-item label="最后编辑人：" prop="upUserId">
            <p class="form-p">{{ detailForm.upUserName }}</p>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="tab == '权限分配'" style="border:1px solid #f1f1f1;height: 416px;">
        <ul class="role-model-ul">
          <li v-for="model in menuList">
            <a href="javascript:;" @click="toggle(model)">
              <i
                class="iconfont g-left-menu-icon-arr jt"
                v-if="model.children"
                :class="{ 'icon-chevron-copy-copy-copy-copy-copy': isOpen, 'icon-chevron-copy-copy-copy': !isOpen }"
              ></i>
              {{ model.name }}
            </a>
            <ul v-if="isOpen">
              <li v-for="menu in model.children" @click="selectMenu($event, menu)">
                <a href="javascript:;">{{ menu.name }}</a>
              </li>
            </ul>
          </li>
        </ul>
        <div class="permissions-list">
          <div v-for="group in permissions">
            <el-checkbox v-model="group.hasRight" @change="groupPermissionsChange(group)">{{ group.name }}</el-checkbox>
            <el-checkbox-group v-model="group.select" @change="permissionsChange(group)">
              <el-checkbox v-for="p in group.permissionList" :label="p.id"><span v-html="p.name"></span></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div v-if="tab == '用户管理'" style="border:1px solid #f1f1f1;padding: 10px 15px;">
        <div style="margin-bottom: 10px">
          <el-button v-if="jurisdiction['setting:roleManager:saveUser']" type="primary" @click="addUser"
            >添加用户</el-button
          >
        </div>
        <div>
          <el-table :data="userList.entities" style="width: 100%" max-height="300px">
            <el-table-column prop="id" label="ID" min-width="10%"> </el-table-column>
            <el-table-column prop="employeeNumber" label="用户工号" min-width="19%"> </el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="19%"> </el-table-column>
            <el-table-column prop="mobile" label="手机号" min-width="21%" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="19%" show-overflow-tooltip> </el-table-column>
            <el-table-column label="操作" min-width="12%">
              <template slot-scope="scope">
                <a
                  v-if="jurisdiction['setting:roleManager:deleteUser']"
                  href="javascript:;"
                  class="color-link"
                  @click="removeUser(scope.row.id)"
                  >移除</a
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
            :total="userList.entityCount"
          >
          </el-pagination>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="closeDialog">取 消</el-button> -->
        <el-button type="primary" @click="updateRole">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加用户"
      ref="userDialog"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      custom-class="user-dialog"
      :modal-append-to-body="false"
    >
      <div class="user-transfer power-role">
        <el-transfer
          filterable
          :filter-method="filterMethod"
          filter-placeholder="用户名检索"
          :render-content="renderFunc"
          v-model="user"
          :data="allUser"
          :props="{ key: 'id', label: 'userName' }"
          :titles="['筛选用户列表', '已选用户列表']"
          :left-default-checked="leftChecked"
        >
        </el-transfer>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import gUtils from '../../../utils/gUtils.js';

export default {
  props: [
    'dialogFormChange',
    'form',
    'roleId',
    'groupId',
    'random',
    'roleDialogDisplay',
    'jurisdiction',
    'closeDialog'
  ],
  data() {
    return {
      dialogVisible: false,
      user: [],
      allUser: [],
      tab: '角色详情',
      userFromArr: [],
      detailForm: {},
      customer: {
        name: '',
        email: '',
        mobile: ''
      },
      userList: [],
      pageNo: 1,
      pageSize: 10,
      menuList: [],
      isOpen: true,
      permissions: [],
      filterMethod(query, item) {
        return item.userName.indexOf($.trim(query)) > -1;
      },
      renderFunc(h, option) {
        function HTMLDecode(text) {
          let temp = document.createElement('div');
          temp.innerHTML = text;
          const output = temp.innerText || temp.textContent;
          temp = null;
          return output;
        }
        return h('span', null, HTMLDecode(option.userName));
      },
      objectType: '',
      leftChecked: [],
      dialogDisplay: false
    };
  },
  methods: {
    queryRole() {
      const self = this;
      if (this.roleId) {
        this.requestPower
          .queryAllRole({
            roleId: this.roleId
          })
          .then((data) => {
            self.detailForm = data[0];
          });
      }
    },
    queryUserByRoleId() {
      const self = this;

      this.requestPower
        .queryUserByRoleId({
          roleId: this.roleId,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        })
        .then((data) => {
          self.userList = data;
        });
    },
    handleSizeChange(pageSize) {
      this.pageNo = 1;
      this.pageSize = pageSize;
      this.queryUserByRoleId();
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.queryUserByRoleId();
    },
    queryRightList() {
      const self = this;
      this.requestPower
        .queryRightList({
          roleId: this.roleId
        })
        .then((data) => {
          self.menuList = self.gUtils.jsonFormat(data, 0);
        });
    },
    toggle(model) {
      this.isOpen = !this.isOpen;
    },
    permissionsChange(group) {
      let permissionsArr = [];
      const self = this;
      for (let i = 0; i < this.permissions.length; i++) {
        permissionsArr = permissionsArr.concat(self.permissions[i].select);
      }

      if (group.select.length == group.permissionList.length) {
        group.hasRight = true;
      } else {
        group.hasRight = false;
      }

      this.requestPower
        .saveRight({
          roleId: this.roleId,
          objectType: this.objectType,
          permissionIds: permissionsArr.join(',')
        })
        .then((data) => {});
    },
    selectMenu(event, menu) {
      if ($(event.target).hasClass('active')) {
        return false;
      }

      const self = this;

      $('.role-model-ul a').removeClass('active');
      $('.role-model-ul li').removeClass('active');
      $(event.target)
        .addClass('active')
        .parent('li')
        .addClass('active');

      self.objectType = menu.objectType;
      self.requestPower
        .queryRight({
          roleId: self.roleId,
          objectType: menu.objectType
        })
        .then((data) => {
          self.objectType = menu.objectType;

          // for (var i = 0; i < data.length; i++) {
          //   data[i].select = []
          // }
          // group.select
          self.permissions = [];
          // self.permissions = data

          for (let i = 0; i < data.length; i++) {
            data[i].select = [];
            for (let j = 0; j < data[i].permissionList.length; j++) {
              if (data[i].permissionList[j].hasRight) {
                data[i].select.push(data[i].permissionList[j].id);
              }
            }
            self.permissions.push(data[i]);
          }
        });
    },
    groupPermissionsChange(group) {
      if (group.hasRight) {
        group.select = [];
        for (var i = 0; i < group.permissionList.length; i++) {
          group.select.push(group.permissionList[i].id);
        }
      } else {
        group.select = [];
      }

      let permissionsArr = [];
      const self = this;
      for (var i = 0; i < this.permissions.length; i++) {
        permissionsArr = permissionsArr.concat(self.permissions[i].select);
      }

      this.requestPower
        .saveRight({
          roleId: this.roleId,
          objectType: this.objectType,
          permissionIds: permissionsArr.join(',')
        })
        .then((data) => {});
    },
    // 添加用户
    addUser(id) {
      this.dialogVisible = true;
      this.user = [];
      this.leftChecked = [];
      this.queryAllUser();
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 角色管理-角色添加用户-获取全部用户列表
    queryAllUser() {
      const self = this;
      this.requestPower
        .queryUserFuzzyMatch({
          pageNo: 1,
          roleId: self.roleId,
          pageSize: 99999
        })
        .then((data) => {
          self.allUser = data.entities;
        });
    },
    // 角色添加用户
    addRoleUser() {
      const self = this;
      this.requestPower
        .addRoleUser({
          roleId: this.roleId,
          userIds: this.user.join(',')
          // groupId: this.groupId
        })
        .then((data) => {
          self.dialogVisible = false;
          self.queryUserByRoleId();
        });
    },
    // 移除用户
    removeUser(userId) {
      const self = this;
      this.requestPower
        .removeUser({
          roleId: this.roleId,
          userIds: userId,
          groupId: this.groupId
        })
        .then((data) => {
          self.queryUserByRoleId();
        });
    },
    roleDialogOpen() {
      this.tab = '角色详情';
      this.queryRole();
      this.queryUserByRoleId();
      this.queryRightList();
    },
    updateRole() {
      const self = this;
      // self.requestPower.updateRole({
      // "roleId": this.roleId,
      // "name": self.detailForm.name,
      // "remark": self.detailForm.remark,
      // }).then(function(data){
      // self.closeDialog()
      self.roleDialogClose();
      //   self.$message({
      //     type: 'success',
      //     message: '保存成功!'
      //   });
      // })
    },
    roleDialogClose() {
      this.closeDialog();
    }
  },
  mounted() {
    this.queryRole();
    this.queryUserByRoleId();
    this.queryRightList();
    this.dialogDisplay = this.roleDialogDisplay;
  },
  watch: {
    random() {
      this.tab = '角色详情';
      this.permissions = [];
      this.queryRole();
      this.queryUserByRoleId();
      this.queryRightList();
    },
    roleDialogDisplay(curValue) {
      this.dialogDisplay = curValue;
    }
  }
};
</script>
