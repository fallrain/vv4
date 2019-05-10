<template>
  <div style="overflow-x:auto">
    <table class="g-table" style="margin-top:10px;width:1290px">
      <thead>
        <tr>
          <th v-show="ckshow"><input type="checkbox" @click="checkedAll()" :checked="checked" /></th>
          <th class="pointerDefault w80">序号</th>
          <th v-for="key in columns" @click="sortBy(key)" :class="{ active: sortKey == key }">
            {{ key.split('|')[1] | capitalize }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"> </span>
          </th>
          <th class="pointerDefault w150" v-if="czTD">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in filteredData">
          <td v-show="ckshow">
            <input type="checkbox" name="checkboxinput" v-model="checkboxModel" :value="entry.id" />
          </td>
          <td>{{ index + 1 }}</td>
          <td v-for="key in columns">
            {{ entry[key.split('|')[0]] | changeDateForamt(key.split('|')[0]) }}
          </td>
          <td v-if="czTD">
            <a @click="showDiglog(entry, 'edit')" v-if="!!jur()['system:sysUserManager:update'] || !!jur()['isAdmin']"
              >编辑</a
            >
            <!--<a v-else class="readonly">编辑</a>-->
            <!--修改-->
            <diglog :ref="'edit' + entry.id" my-style="width:600px;" :is-Out="isOut">
              <h2 slot="header">编辑用户</h2>
              <div slot="body" class="digbox">
                <form data-vv-scope="form-1">
                  <div class="col">
                    <span>真实姓名：</span
                    ><input
                      type="text"
                      placeholder="请输入真实姓名"
                      class="g-input"
                      autocomplete="off"
                      style="width:260px;"
                      v-model="entry.trueName"
                    />
                  </div>
                  <div class="col">
                    <span>英文名：</span>
                    <input
                      v-validate
                      data-vv-rules="alpha"
                      name="英文名"
                      type="text"
                      placeholder="请输入英文名"
                      class="g-input"
                      autocomplete="off"
                      style="width:260px;"
                      v-model="entry.enName"
                    />
                    <p v-show="errors.has('英文名')" class="error">{{ errors.first('英文名') }}</p>
                  </div>
                  <div class="col">
                    <span>邮箱：</span>
                    <input
                      v-validate
                      data-vv-rules="email"
                      name="邮箱"
                      type="text"
                      placeholder="请输入邮箱"
                      class="g-input"
                      autocomplete="off"
                      style="width:260px;"
                      v-model="entry.email"
                    />
                    <p v-show="errors.has('邮箱')" class="error">{{ errors.first('邮箱') }}</p>
                  </div>
                  <div class="col">
                    <span>手机号：</span>
                    <input
                      v-validate
                      data-vv-rules="numeric"
                      name="手机号"
                      type="text"
                      placeholder="请输入手机号"
                      class="g-input"
                      autocomplete="off"
                      style="width:260px;"
                      v-model="entry.phone"
                      maxlength="11"
                    />
                    <p v-show="errors.has('手机号')" class="error">{{ errors.first('手机号') }}</p>
                  </div>
                  <div class="col">
                    <span>性别：</span>
                    <p class="radiobox">
                      <input type="radio" name="gender" v-model="entry.gender" value="1" />男<input
                        type="radio"
                        name="gender"
                        value="2"
                        v-model="entry.gender"
                      />女
                    </p>
                  </div>
                  <div class="col">
                    <span>备注：</span>
                    <input
                      type="text"
                      placeholder="请输入备注"
                      class="g-input"
                      autocomplete="off"
                      style="width:260px;"
                      v-model="entry.remark"
                      maxlength="200"
                    />
                  </div>
                </form>
              </div>
              <div slot="footer">
                <g-button @click="confirmEdit(entry)" type="2">保存</g-button>
                <g-button @click="closeDiglog(entry, 'edit')" type="3">取消</g-button>
              </div>
            </diglog>
            <!--修改-->
            <a @click="showDiglog(entry, 'del')" v-if="!!jur()['system:sysUserManager:delete'] || !!jur()['isAdmin']"
              >删除</a
            >
            <!--<a v-else class="readonly">删除</a>-->
            <!--删除-->
            <diglog :ref="'del' + entry.id" my-style="width:450px;height:150px" :is-Out="isOut">
              <div slot="body" style="font-size:16px;text-align:center;margin:0">
                <i class="iconfont icon icon-shuoming"></i><span class="desc">确认删除用户?</span>
              </div>
              <div slot="footer">
                <g-button @click="confirmDel(entry)" type="2">确认</g-button>
                <g-button @click="closeDiglog(entry, 'del')" type="3">取消</g-button>
              </div>
            </diglog>
            <!--删除-->
            <!--启用-->
            <a
              @click="showDiglog(entry, 'enable')"
              v-if="entry.status == '已停用' && (!!jur()['system:sysUserManager:enable'] || !!jur()['isAdmin'])"
              >启用</a
            >
            <!--<a v-else class="readonly">启用</a>-->
            <diglog :ref="'enable' + entry.id" my-style="width:450px;height:150px" :is-Out="isOut">
              <div slot="body" style="font-size:16px;text-align:center;margin:0">
                <i class="iconfont icon icon-shuoming"></i><span class="desc">确认启用用户?</span>
              </div>
              <div slot="footer">
                <g-button @click="confirmEnable(entry)" type="2">确认</g-button>
                <g-button @click="closeDiglog(entry, 'enable')" type="3">取消</g-button>
              </div>
            </diglog>
            <!--启用-->
            <!--停用-->
            <a
              @click="showDiglog(entry, 'disable')"
              v-if="entry.status == '已启用' && (!!jur()['system:sysUserManager:disable'] || !!jur()['isAdmin'])"
              >停用</a
            >
            <!--<a v-else class="readonly">停用</a>-->
            <diglog :ref="'disable' + entry.id" my-style="width:450px;height:150px" :is-Out="isOut">
              <div slot="body" style="font-size:16px;text-align:center;margin:0">
                <i class="iconfont icon icon-shuoming"></i><span class="desc">确认停用用户?</span>
              </div>
              <div slot="footer">
                <g-button @click="confirmDisable(entry)" type="2">确认</g-button>
                <g-button @click="closeDiglog(entry, 'disable')" type="3">取消</g-button>
              </div>
            </diglog>
            <!--停用-->
            <!--重置密码-->
            <a
              @click="showDiglog(entry, 'repassword')"
              v-if="!!jur()['system:sysUserManager:resetPwd'] || !!jur()['isAdmin']"
              >重置密码</a
            >
            <!--<a v-else class="readonly">重置密码</a>-->
            <diglog :ref="'repassword' + entry.id" my-style="width:600px;" :is-Out="isOut">
              <h2 slot="header">重置密码</h2>
              <div slot="body" class="digbox">
                <form data-vv-scope="form-2">
                  <div class="col">
                    <span>新密码：</span
                    ><input
                      v-validate
                      data-vv-rules="required"
                      name="新密码"
                      type="password"
                      placeholder="请输入密码"
                      class="g-input"
                      autocomplete="off"
                      style="width:260px;"
                      v-model="entry.password"
                    />
                    <p v-show="errors.has('新密码')" class="error">{{ errors.first('新密码') }}</p>
                  </div>
                  <div class="col">
                    <span>重复密码：</span
                    ><input
                      v-validate
                      data-vv-rules="required"
                      name="重复密码"
                      type="password"
                      placeholder="请输入重复密码"
                      class="g-input"
                      autocomplete="off"
                      style="width:260px;"
                      v-model="entry.rePassword"
                    />
                    <p v-show="errors.has('重复密码')" class="error">{{ errors.first('重复密码') }}</p>
                    <p v-show="pwCheck" class="error">两次密码输入不一致</p>
                  </div>
                </form>
              </div>
              <div slot="footer">
                <g-button @click="confirmPassword(entry)" type="2">保存</g-button>
                <g-button @click="closeDiglog(entry, 'repassword')" type="3">取消</g-button>
              </div>
            </diglog>
            <!--重置密码-->
          </td>
        </tr>
        <tr v-if="filteredData ? filteredData.length <= 0 : true" style="height:482px">
          <td :colspan="columns.length + 1" v-if="!czTD">{{ emptyInfo }}</td>
          <td :colspan="columns.length + 2" v-if="czTD">{{ emptyInfo }}</td>
        </tr>
      </tbody>
      <tfoot>
        <td :colspan="columns.length + 1" v-if="!czTD">
          <pager
            :sort="'crTime'"
            :fn="this.requestUser.requestUserMgrList"
            :pagesize="10"
            :model="this.getUserMgrData()"
            :pid="this.getSelectMgrObj().treeModel ? this.getSelectMgrObj().treeModel.id : 0"
          ></pager>
        </td>
        <td :colspan="columns.length + 2" v-if="czTD">
          <pager
            :sort="'crTime'"
            :fn="this.requestUser.requestUserMgrList"
            :pagesize="10"
            :model="this.getUserMgrData()"
            :pid="this.getSelectMgrObj().treeModel ? this.getSelectMgrObj().treeModel.id : 0"
          ></pager>
        </td>
      </tfoot>
    </table>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import diglog from '../../../components/common/comm.dialog.vue';
import gButton from '../../../components/common/comm.button.vue';
import tree from './move.tree.vue';
import gUtils from '../../../utils/gUtils.js';
import pager from '../../../components/common/comm.pager.vue';

export default {
  components: {
    diglog,
    gButton,
    tree,
    pager
  },
  props: {
    data: [Array, Object],
    columns: Array,
    filterKey: String,
    filterType: Boolean,
    emptyInfo: String,
    ckshow: Boolean
  },
  data() {
    const sortOrders = {};
    this.columns.forEach((key) => {
      sortOrders[key] = 1;
    });
    return {
      sortKey: '',
      sortOrders,
      checkboxModel: [],
      checked: false,
      showDislog: false,
      moveShow: false,
      isOut: false,
      passwordInfo: {
        password: '',
        rePassword: ''
      },
      pwCheck: false
    };
  },
  computed: {
    // 数据过滤

    filteredData() {
      if (this.data.entities) {
        let data = this.data.entities;
        const { sortKey } = this;
        const filterKey = this.filterKey && this.filterKey.toLowerCase();
        const { filterType } = this;
        const order = this.sortOrders[sortKey] || 1;
        gUtils.sortArr(data, 'sort');
        if (filterType) {
          // 查询过滤
          if (filterKey) {
            data = data.filter(row => Object.keys(row).some((key) => {
              if (key == 'status') {
                return String(row[key]) == '1' || String(row[key]) == '已启用'
                  ? (row[key] = '已启用')
                  : (row[key] = '已停用');
              }
              return (
                String(row[key])
                  .toLowerCase()
                  .indexOf(filterKey) > -1
              );
            }));
          }
          // 内部排序
          if (sortKey) {
            data = data.slice().sort((a, b) => {
              a = a[sortKey.split('|')[0]];
              b = b[sortKey.split('|')[0]];
              return (a === b ? 0 : a > b ? 1 : -1) * order;
            });
          }
        }
        return data;
      }
    },
    czTD() {
      const result = !!this.jur()['group:sysUserManager:update']
        || !!this.jur()['group:sysUserManager:delete']
        || !!this.jur()['group:sysUserManager:disable']
        || !!this.jur()['group:sysUserManager:enable']
        || !!this.jur()['group:sysUserManager:resetPwd']
        || !!this.jur().isAdmin;
      return result;
    }
  },
  filters: {
    // 参数过滤器
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    changeDateForamt(value, key) {
      if (key == 'crTime') {
        return gUtils.changeToDate(value);
      }
      return value;
    }
  },
  methods: {
    ...mapGetters({
      getUserMgrData: 'getUserMgrData',
      getSelectMgrObj: 'getSelectMgrObj',
      jur: 'jurisdiction'
    }),
    ...mapActions({
      del: 'delUserMgr',
      edit: 'editUserMgr',
      enable: 'enableUserMgr',
      disable: 'disableUserMgr',
      repw: 'rePasswordMgr',
      setSelectMgrObj: 'setSelectMgrObj',
      setUserCheckbox: 'setUserCheckbox'
    }),
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    checkedAll() {
      const _this = this;
      // //console.log(_this.checkboxModel);
      if (this.checked) {
        // 实现反选
        _this.checkboxModel = [];
        _this.setUserCheckbox(_this.checkboxModel);
      } else {
        // 实现全选
        _this.checkboxModel = [];
        _this.data.entities.forEach((item) => {
          _this.checkboxModel.push(item.id);
          _this.setUserCheckbox(_this.checkboxModel);
        });
      }
    },
    showDiglog(obj, type, data, index) {
      switch (type) {
        case 'del':
          this.$refs[type + obj.id][0].show = true;
          break;
        case 'edit':
          this.$refs[type + obj.id][0].show = true;
          break;
        case 'enable':
          this.$refs[type + obj.id][0].show = true;
          break;
        case 'disable':
          this.$refs[type + obj.id][0].show = true;
          break;
        case 'repassword':
          this.$refs[type + obj.id][0].show = true;
          break;
      }
      this.setSelectMgrObj(obj);
    },
    closeDiglog(obj, type) {
      this.$refs[type + obj.id][0].show = false;
    },
    confirmDel(obj) {
      // this.del(obj);
      // this.$refs['del' + obj.id][0].show = false;
      const params = obj;
      this.$http({
        method: 'POST',
        url: `${this.devUrl}/user/delete`,
        params
      }).then(
        function (data) {
          const result = data.data;
          if (result.isSuccess) {
            // var sJson = {
            //   "orders": [{
            //     "property": "sort",
            //     "desc": false
            //   }]
            // }
            const pm = {
              pageNo: 1,
              pageSize: 10,
              criteria: ''
            };
            this.requestUser.requestUserMgrList(pm);
            // alert("用户删除成功!");
            // 替换原生alert
            $('body').append(this.gUtils.myAlert('用户删除成功!', 'pop'));
            $('.pop').click(() => {
              $('.maskpop').remove();
            });
            this.$refs[`del${obj.id}`][0].show = false;
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
    },
    confirmEdit(obj) {
      // this.edit(obj);
      // this.$refs['edit' + obj.id][0].show = false;

      this.$validator.validateAll('form-1').then((success) => {
        if (!success) {
          // //console.log("校验失败")
        } else {
          obj.status == '已启用' ? (obj.status = 1) : (obj.status = 2);
          const params = obj;

          this.$http({
            method: 'POST',
            url: `${this.devUrl}/user/update`,
            params
          }).then(
            function (data) {
              const result = data.data;
              if (result.isSuccess) {
                // alert("用户修改成功!");
                // 替换原生alert
                $('body').append(this.gUtils.myAlert('用户修改成功!', 'pop'));
                $('.pop').click(() => {
                  $('.maskpop').remove();
                });
                this.$refs[`edit${obj.id}`][0].show = false;
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
        }
      });
    },
    confirmEnable(obj) {
      // this.enable(obj);
      // this.$refs['enable' + obj.id][0].show = false;
      const params = {
        id: obj.id
      };
      this.$http({
        method: 'POST',
        url: `${this.devUrl}/user/enable`,
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
            // alert("用户启用成功!");
            // 替换原生alert
            $('body').append(this.gUtils.myAlert('用户启用成功!', 'pop'));
            $('.pop').click(() => {
              $('.maskpop').remove();
            });
            this.$refs[`enable${obj.id}`][0].show = false;
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
    },
    confirmDisable(obj) {
      // this.disable(obj);
      // this.$refs['disable' + obj.id][0].show = false;
      const params = {
        id: obj.id
      };
      this.$http({
        method: 'POST',
        url: `${this.devUrl}/user/disable`,
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
            // alert("用户停用成功!");
            // 替换原生alert
            $('body').append(this.gUtils.myAlert('用户停用成功!', 'pop'));
            $('.pop').click(() => {
              $('.maskpop').remove();
            });
            this.$refs[`disable${obj.id}`][0].show = false;
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
    },
    confirmPassword(obj) {
      // this.repw(obj);
      // this.$refs['repassword' + obj.id][0].show = false;

      this.$validator.validateAll('form-2').then((success) => {
        if (!success) {
          // //console.log("校验失败")
        } else if (this.passwordInfo.password == this.passwordInfo.rePassword) {
          this.pwCheck = false;
          const params = obj;
          this.$http({
            method: 'POST',
            url: `${this.devUrl}/user/resetPwd`,
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
                // alert("重置密码成功!");
                // 替换原生alert
                $('body').append(this.gUtils.myAlert('重置密码成功!', 'pop'));
                $('.pop').click(() => {
                  $('.maskpop').remove();
                });
                this.$refs[`repassword${obj.id}`][0].show = false;
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
    treeCheckradio(obj) {
      this.setCheckRadObj(obj);
    }
  },
  watch: {
    // 深度 watcher
    checkboxModel: {
      handler(val, oldVal) {
        if (this.checkboxModel.length === this.data.entities.length) {
          this.checked = true;
          this.setUserCheckbox(this.checkboxModel);
        } else {
          this.checked = false;
          this.setUserCheckbox(this.checkboxModel);
        }
        // //console.log(this.checkboxModel);
      },
      deep: true
    }
  },
  mounted() {
    // //console.log(this.data);
  }
};
</script>
