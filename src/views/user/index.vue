<template>
  <div>
    <iframe src="https://tpoint.haier.net/" style="position: absolute; height: 100%; width: 100%;"></iframe>
    <div class="g-juris-right">
      <!--用户-->
      <!-- <transition name="component-fade" mode="out-in">
        <div class="user" style="width: 96%">
          <div class="toolbar">
            <g-button @click="newdigUserShow = true" type="1" v-if="!!jur()['system:sysUserManager:new']||!!jur()['isAdmin']">新建用户</g-button>
            <g-button @click="adSearchShow=!adSearchShow,isSearchShow=!isSearchShow" type="2" style="float:right;min-width:50px;height:30px;margin-left:5px;">高级</g-button>
            <search v-show="isSearchShow" :Fn="this.requestUser.requestUserMgrList" :pm="searchUserMgr.pm" :isbtn-show="searchbtnShow"
              placeholder="请输入用户名称" name="query" my-style="padding-right:22px"></search>
          </div>
          <div class="advanced-search" v-show="adSearchShow">
            <div class="warp">

              <div class="status">
                <el-input v-model="searchInfo['userName'].val" placeholder="用户名"></el-input>
              </div>
              <div class="status">
                <el-select v-model="searchInfo['status'].val" clearable placeholder="选择状态">
                  <el-option v-for="item in statusOptions" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="status">
                <el-input v-model="searchInfo['trueName'].val" placeholder="真实姓名"></el-input>
              </div>
              <div class="status">
                <el-input v-model="searchInfo['enName'].val" placeholder="英文名"></el-input>
              </div>
              <div class="status">
                <el-input v-model="searchInfo['phone'].val" placeholder="手机号"></el-input>
              </div>
              <div class="status">
                <el-input v-model="searchInfo['email'].val" placeholder="邮箱"></el-input>
              </div>
              <div class="status">
                <el-input v-model="searchInfo['groupName'].val" placeholder="所属组织"></el-input>
              </div>
              <div class="status">
                <el-input v-model="searchInfo['roleName'].val" placeholder="所属角色"></el-input>
              </div>
              <div class="timeDate">
                <el-date-picker :editable="false" v-model="searchInfo['crTime_S'].val" type="datetime" placeholder="选择创建开始日期" align="right"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </div>

              <div class="timeDate">
                <el-date-picker :editable="false" v-model="searchInfo['crTime_E'].val" type="datetime" placeholder="选择创建结束日期" align="right"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </div>
            </div>
            <g-button @click="adSeachFn(searchInfo)" type="2" style="float:right">搜索</g-button>
          </div>
          <user-table :data="getUserMgrData()" :columns="userColumns" filter-key="true" :filter-type="filterType" empty-info="没有相关用户"
            :ckshow="ckshow">
          </user-table>
          <diglog v-show="newdigUserShow" @close="newdigUserShow = false" my-style="width:600px;">
            <h2 slot="header">新建用户</h2>
            <div slot="body" class="digbox">
              <div class="col"> <span>用户名：</span>
                <input v-validate data-vv-rules="required" name="用户名" type="text" placeholder="请输入用户名" class="g-input"  autocomplete="off" style="width:260px;"
                  v-model="newUserValue.userName"><b class="star">*</b>
                <p v-show="errors.has('用户名')" class="error">{{ errors.first('用户名') }}</p>
              </div>
              <div class="col"> <span>密码：</span>
                <input v-validate data-vv-rules="required" name="密码" type="password" placeholder="请输入密码" class="g-input"  autocomplete="off" style="width:260px;"
                  v-model="newUserValue.password"><b class="star">*</b>
                <p v-show="errors.has('密码')" class="error">{{ errors.first('密码') }}</p>
              </div>
              <div class="col"> <span>重复密码：</span>
                <input v-validate data-vv-rules="required" name="重复密码" type="password" placeholder="请再次输入密码" class="g-input"  autocomplete="off" style="width:260px;"
                  v-model="newUserValue.rePassword" @blur="passwordCheck(newUserValue.rePassword)"><b class="star">*</b>
                <p v-show="errors.has('重复密码')" class="error">{{ errors.first('重复密码') }}</p>
                <p v-show="pwCheck" class="error">两次密码输入不一致</p>
              </div>
              <div class="col"><span>用户状态：</span>
                <p class="radiobox"><input v-validate data-vv-rules="required" type="radio" name="用户状态" v-model="newUserValue.status" value="1"
                  />启用<input type="radio" name="用户状态" v-model="newUserValue.status" value="2" />停用<b class="star">*</b></p>
                <p v-show="errors.has('用户状态')" class="error">{{ errors.first('用户状态') }}</p>
              </div>
              <div class="col"> <span>真实姓名：</span> <input type="text" placeholder="请输入真实姓名" class="g-input"  autocomplete="off" style="width:260px;" v-model="newUserValue.trueName"></div>
              <div class="col"> <span>英文名：</span>
                <input v-validate data-vv-rules="alpha" name="英文名" type="text" placeholder="请输入英文名" class="g-input"  autocomplete="off" style="width:260px;"
                  v-model="newUserValue.enName">
                <p v-show="errors.has('英文名')" class="error">{{ errors.first('英文名') }}</p>
              </div>
              <div class="col"> <span>邮箱：</span>
                <input v-validate data-vv-rules="email" name="邮箱" type="text" placeholder="请输入邮箱" class="g-input"  autocomplete="off" style="width:260px;" v-model="newUserValue.email">
                <p v-show="errors.has('邮箱')" class="error">{{ errors.first('邮箱') }}</p>
              </div>
              <div class="col"> <span>手机号：</span>
                <input v-validate data-vv-rules="numeric" name="手机号" type="text" placeholder="请输入手机号" class="g-input"  autocomplete="off" style="width:260px;"
                  v-model="newUserValue.phone" maxlength="11">
                <p v-show="errors.has('手机号')" class="error">{{ errors.first('手机号') }}</p>
              </div>
              <div class="col"><span>性别：</span>
                <p class="radiobox"><input type="radio" name="gender" v-model="newUserValue.gender" value="1" />男<input type="radio" name="gender"
                    value="2" v-model="newUserValue.gender"/>女</p>
              </div>
              <div class="col"> <span>备注：</span> <input type="text" placeholder="请输入备注" class="g-input"  autocomplete="off" style="width:260px;" v-model="newUserValue.remark"></div>
            </div>
            <div slot="footer">
              <g-button @click="saveNewUserMgr(newUserValue)" type="2">保存</g-button>
              <g-button @click="newdigUserShow = false" type="3">取消</g-button>
            </div>
          </diglog>
        </div>
      </transition> -->
      <!--用户-->
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import userTable from './components/user.table.vue';
import diglog from '../../components/common/comm.dialog.vue';
import gButton from '../../components/common/comm.button.vue';
import search from '../../components/common/comm.search.vue';


export default {
  data() {
    return {
      queryQuery: '',
      userQuery: '',
      userColumns: [
        'userName|用户名',
        'status|当前状态',
        'trueName|真实姓名',
        'enName|英文名',
        'groupName|所属组织',
        'roleName|所属角色',
        'phone|手机号',
        'email|邮箱',
        'crTime|创建时间'
      ],
      newdigShow: false,
      newdigUserShow: false,
      removedigUserShow: false,
      selectDigUserShow: false,
      filterType: true,
      ckshow: false,
      newUserValue: {
        userName: '',
        password: '',
        rePassword: '',
        status: '',
        trueName: '',
        enName: '',
        email: '',
        phone: '',
        gender: '',
        pic: 'jjjj.jpg',
        remark: ''
      },
      userList: {
        entities: []
      },
      searchbtnShow: false,
      searchUserMgr: {
        pm: {
          criterions: [
            {
              property: 'userName',
              dataType: 'String',
              expression: ''
            }
          ]
        }
      },
      pwCheck: false,
      searchInfo: {
        crTime_S: {
          type: 'Date',
          val: ''
        },
        crTime_E: {
          type: 'Date',
          val: ''
        },
        status: {
          type: 'String',
          val: ''
        },
        userName: {
          type: 'String',
          val: ''
        },
        trueName: {
          type: 'String',
          val: ''
        },
        enName: {
          type: 'String',
          val: ''
        },
        phone: {
          type: 'String',
          val: ''
        },
        email: {
          type: 'String',
          val: ''
        },
        roleName: {
          type: 'String',
          val: ''
        },
        groupName: {
          type: 'String',
          val: ''
        }
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }
        ]
      },
      adSearchShow: false,
      statusOptions: [
        {
          value: 1,
          label: '已启用'
        },
        {
          value: 2,
          label: '已停用'
        }
      ],
      isSearchShow: true
    };
  },
  components: {
    userTable,
    diglog,
    gButton,
    search
  },
  methods: {
    ...mapActions({
      setUserMgrData: 'setUserMgrData',
      newUserMgr: 'newUserMgr',
      disableUserMgr: 'disableUserMgr',
      enableUserMgr: 'enableUserMgr',
      userTreeDataADD: 'userTreeDataADD',
      setSelectData: 'setSelectData',
      saveAddUserData: 'saveAddUserData',
      closeRemoveData: 'closeRemoveData'
    }),
    ...mapGetters({
      getUserMgrData: 'getUserMgrData',
      getSelectMgrObj: 'getSelectMgrObj',
      getAddUserDefaultData: 'getAddUserDefaultData',
      getAddUserSelectData: 'getAddUserSelectData',
      jur: 'jurisdiction'
    }),
    treeCallBack(obj) {
      this.add(obj);
    },
    addUserTreeCallBack(obj) {
      this.userTreeDataADD(obj);
    },
    saveNewUserMgr(obj) {
      const params = obj;

      this.$validator.validateAll().then((success) => {
        if (!success) {
          // //console.log("校验失败")
        } else if (this.newUserValue.password == this.newUserValue.rePassword) {
          this.pwCheck = false;
          this.$http({
            method: 'POST',
            url: `${this.devUrl}/user/add`,
            params
          }).then(
            function (data) {
              const result = data.data;
              if (result.isSuccess) {
                const pm = {
                  pageNo: 1,
                  pageSize: 10,
                  criteria: ''
                };
                this.requestUser.requestUserMgrList(pm);
                // alert("新建用户成功!");
                // 替换原生alert
                $('body').append(this.gUtils.myAlert('新建用户成功!', 'pop'));
                $('.pop').click(() => {
                  $('.maskpop').remove();
                });
                this.newdigUserShow = false;
                this.newUserValue = {
                  userName: '',
                  password: '',
                  rePassword: '',
                  status: '',
                  trueName: '',
                  enName: '',
                  email: '',
                  phone: '',
                  gender: '',
                  pic: '',
                  remark: ''
                };
              }
            },
            function (error) {
              $('body').append(this.gUtils.myAlert(error.data.resultMsg, 'pop'));
              $('.pop').click(() => {
                $('.maskpop').remove();
              });
              // console.log(error.data.resultMsg);
            }
          );
        } else {
          this.pwCheck = true;
        }
      });
    },

    saveSelectUser() {
      this.saveAddUserData();
    },
    disable() {
      this.disableUserMgr();
    },
    enable() {
      this.enableUserMgr();
    },
    passwordCheck(v) {
      if (v != this.newUserValue.password) {
        this.pwCheck = true;
      } else {
        this.pwCheck = false;
      }
    },
    adSeachFn(pm) {
      // 高级搜索
      this.gUtils.adSearchCommFn(pm, this.requestUser.requestUserMgrList, {
        key: '',
        desc: false
      });
    }
  },
  created() {
    // 将初始json加载到vue
    // var params = {
    //   criteria: "",
    //   pageNo: 1,
    //   pageSize: 10
    // }
    // this.$http({
    //   method: 'POST',
    //   url: this.devUrl + '/user/list',
    //   params: params
    // }).then(function (data) {
    //   var result = data.data
    //   if (result.isSuccess) {
    //     this.setUserMgrData(result.data);
    //   }
    // }, function (error) {
    //   //console.log(error);
    // });
  }
};
</script>
