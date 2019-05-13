<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <el-button v-if="jurisdiction['setting:userManager:save']" type="primary" @click="addUser()"
          >新建用户</el-button
        >
        <el-input
          class="fr"
          placeholder="请输入关键词检索"
          icon="search"
          v-model="fuzzyMatchStr"
          :on-icon-click="handleIconClick"
          @keyup.enter.native="handleIconClick"
          style="width: 300px"
        >
        </el-input>
      </p>
      <div class="clear"></div>
    </div>
    <div v-loading="msgListLoading">
      <el-table :data="msgListData.entities" style="width: 100%" border>
        <el-table-column prop="templateName" label="序号" width="50">
          <template slot-scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="employeeNumber" label="用户工号">
          <template slot-scope="scope">
            <span v-html="scope.row.employeeNumber"></span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名">
          <template slot-scope="scope">
            <a
              href="javascript:;"
              class="color-link"
              @click="detail(scope.row.id, scope.row)"
              v-html="scope.row.userName"
            ></a>
          </template>
        </el-table-column>
        <el-table-column prop="budgetName" label="商城预算体" show-overflow-tooltip width="130"> </el-table-column>
        <el-table-column prop="roleName" label="用户所具有的角色" show-overflow-tooltip width="150"> </el-table-column>
        <el-table-column prop="allBrandName" label="所属品牌" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="userFrom" label="用户来源" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="crUserName" label="创建人" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="crTime" label="创建时间">
          <template slot-scope="scope">
            {{ gUtils.dateFormat(scope.row.crTime, 'yyyy-MM-dd') }}
          </template>
        </el-table-column>
        <el-table-column label="最后登录时间">
          <template slot-scope="scope">
            <p v-if="scope.row.lastLoginTime != null && scope.row.lastLoginTime != ''">
              {{ gUtils.dateFormat(scope.row.lastLoginTime, 'yyyy-MM-dd') }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <a
              v-if="jurisdiction['setting:userManager:edit'] && scope.row.delFlag == 0"
              href="javascript:;"
              class="color-link operation-btn"
              @click="set(scope.row.id, scope.row)"
              ><i class="iconfont icon-xiugai"></i>设置</a
            >
            <a
              v-if="jurisdiction['setting:userManager:edit']"
              href="javascript:;"
              class="operation-btn"
              @click="disableUser(scope.row.id, scope.row.delFlag)"
              ><i
                class="iconfont"
                :class="{ 'icon-zanting': scope.row.delFlag == 1, 'icon-icon-zanting': scope.row.delFlag == 0 }"
              ></i
              >{{ scope.row.delFlag == 0 ? '停用' : '启用' }}</a
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

    <user
      :data="userDialog.data"
      :random="userDialog.random"
      :display="userDialog.display"
      :jurisdiction="jurisdiction"
      :close="userClose"
      :refresh="listSearch"
    ></user>

    <detail
      :data="datailDialog.data"
      :random="datailDialog.random"
      :display="datailDialog.display"
      :jurisdiction="jurisdiction"
      :close="detailClose"
    ></detail>

    <setting
      :data="settingDialog.data"
      :random="settingDialog.random"
      :display="settingDialog.display"
      :jurisdiction="jurisdiction"
      :close="settingClose"
      :refresh="listSearch"
      :brandArr="settingDialog.brandArr"
      :fromArr="settingDialog.fromArr"
    ></setting>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import user from './dialog/newUser.vue';
import detail from './dialog/userDetail.vue';
import setting from './dialog/setting.vue';
import gUtils from '../../utils/gUtils.js';


export default {
  components: {
    user,
    detail,
    setting
  },
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      fuzzyMatchStr: '',
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      searchEmail: '',
      // user: {
      //   employeeNumber: '',
      //   userName: '',
      //   mobile: '',
      //   email: '',
      // },
      // setting: {
      //   brandName: [],
      //   userFrom: []
      // },
      form: '',
      brandArr: [
        {
          tagName: '海尔品牌',
          tagCode: 'haier'
        },
        {
          tagName: '卡萨帝',
          tagCode: 'casarte'
        }
      ],
      fromArr: [],
      userDialog: {
        display: false,
        data: {
          employeeNumber: '',
          userName: '',
          mobile: '',
          email: ''
        },
        random: Math.random()
      },
      datailDialog: {
        display: false,
        data: {},
        random: Math.random()
      },
      settingDialog: {
        display: false,
        data: {},
        random: Math.random(),
        brandArr: [],
        fromArr: []
      }
    };
  },
  filters: {},
  methods: {
    // 邮箱检索
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    getForm(form) {
      this.form = form;
    },
    editLabel() {},
    // 新增用户
    addUser(id, row) {
      this.userDialog = {
        display: true,
        data: {
          employeeNumber: '',
          userName: '',
          mobile: '',
          email: ''
        },
        random: Math.random()
      };
    },
    // 新增用户弹层关闭
    userClose() {
      this.userDialog.display = false;
    },
    // 用户详情
    detail(id, row) {
      this.datailDialog = {
        display: true,
        data: row,
        random: Math.random()
      };
    },
    // 用户详情弹层关闭
    detailClose() {
      this.datailDialog.display = false;
    },
    settingClose() {
      this.settingDialog.display = false;
    },
    // 用户设置
    set(id, row) {
      this.settingDialog = {
        display: true,
        data: {
          id,
          brandName: [],
          userFrom: []
        },
        random: Math.random(),
        brandArr: this.brandArr,
        fromArr: this.fromArr
      };

      if (row.allBrandName) {
        const allBrandName = row.allBrandName.split(',');
        for (let i = 0; i < this.brandArr.length; i++) {
          for (let j = 0; j < allBrandName.length; j++) {
            if (allBrandName[j] == this.brandArr[i].tagCode) {
              this.settingDialog.data.brandName.push(this.brandArr[i].tagName);
            }
          }
        }
      }

      if (row.userFrom) {
        const userFrom = row.userFrom.split(',');
        this.settingDialog.data.userFrom = userFrom;
      }
    },
    // 模板删除
    disableUser(id, delFlag) {
      const self = this;

      if (delFlag == 0) {
        this.requestPower
          .disableUser({
            userId: id
          })
          .then((data) => {
            self.$message({
              type: 'success',
              message: '已停用!'
            });
            self.listSearch();
          });
      } else {
        this.requestPower
          .enableUser({
            userId: id
          })
          .then((data) => {
            self.$message({
              type: 'success',
              message: '已启用!'
            });
            self.listSearch();
          });
      }
    },
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        fuzzyMatchStr: $.trim(self.fuzzyMatchStr)
      };

      this.msgListLoading = true;
      this.requestPower.queryAllUser(data).then((data) => {
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
  }
};
</script>
