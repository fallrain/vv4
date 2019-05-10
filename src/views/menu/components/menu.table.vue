<template>
  <div>
    <table class="g-table" style="margin-top:10px">
      <thead>
        <tr>
          <th v-show="ckshow"><input type="checkbox" @click="checkedAll()" :checked="checked" /></th>
          <th class="pointerDefault w80">序号</th>
          <th v-for="key in columns" @click="sortBy(key)" :class="{ active: sortKey == key }">
            {{ key.split('|')[1] | capitalize }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"> </span>
          </th>
          <th class="pointerDefault">操作</th>
          <th class="pointerDefault">调整顺序</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in filteredData">
          <td v-show="ckshow">
            <input type="checkbox" name="checkboxinput" v-model="checkboxModel" :value="entry.id" />
          </td>
          <td>{{ index + 1 }}</td>
          <td v-for="key in columns">
            {{ entry[key.split('|')[0]] | changeDateForamt(key.split('|')[0]) | changeIconToImg(key.split('|')[0]) }}
            <i style="color:#666" class="iconfont" :class="entry.icon" v-if="key.split('|')[0] == 'icon'"></i>
          </td>
          <td>
            <a @click="showDiglog(entry, 'edit')">修改</a>
            <!--修改-->
            <diglog
              :ref="'edit' + entry.id"
              @close="closeDiglog(entry, 'edit')"
              my-style="width:600px;"
              :is-Out="isOut"
            >
              <h2 slot="header">修改菜单</h2>
              <div slot="body" class="digbox">
                <form data-vv-scope="form-2">
                  <div class="col">
                    <span>菜单名称：</span
                    ><input
                      v-validate
                      data-vv-rules="required"
                      name="菜单名称"
                      type="text"
                      placeholder="请输入菜单名称"
                      class="g-input"
                      autocomplete="off"
                      style="width:260px;"
                      v-model="entry.name"
                    /><b class="star">*</b>
                    <p v-show="errors.has('菜单名称')" class="error">{{ errors.first('菜单名称') }}</p>
                  </div>
                  <div class="col">
                    <span>描述：</span
                    ><input
                      type="text"
                      placeholder="请输入描述"
                      class="g-input"
                      autocomplete="off"
                      style="width:260px;"
                      v-model="entry.desc"
                    />
                    <b class="star">&nbsp;</b>
                  </div>
                  <div class="col">
                    <span>链接：</span
                    ><input
                      type="text"
                      placeholder="请输入链接"
                      class="g-input"
                      autocomplete="off"
                      style="width:260px;"
                      v-model="entry.url"
                    />
                    <b class="star">&nbsp;</b>
                  </div>
                  <div class="col">
                    <span>图标：</span
                    ><input
                      type="text"
                      placeholder="请输入图标"
                      class="g-input"
                      autocomplete="off"
                      style="width: 260px;"
                      v-model="entry.icon"
                      @click="selectIcon()"
                      readonly="readonly"
                    />
                    <div
                      class="menu-icon-poplayer"
                      style="margin-left:73px"
                      v-show="menuIconShow"
                      @mouseleave="leaveIcon()"
                    >
                      <b @click="addIcon(entry, i.name)" v-for="i in icons" class="iconfont" :class="i.name"></b>
                    </div>
                    <b class="star">&nbsp;</b>
                  </div>
                </form>
              </div>
              <div slot="footer">
                <g-button @click="confirmEdit(entry)" type="2">保存</g-button>
                <g-button @click="closeDiglog(entry, 'edit')" type="3">取消</g-button>
              </div>
            </diglog>
            <!--修改-->
            <a @click="showDiglog(entry, 'del')">删除</a>
            <!--删除-->
            <diglog
              :ref="'del' + entry.id"
              @close="closeDiglog(entry, 'del')"
              @commit="confirmDel()"
              my-style="width:450px;height:150px"
              :is-Out="isOut"
            >
              <div slot="body" style="font-size:16px;text-align:center;margin:0">
                <i class="iconfont icon icon-shuoming"></i><span class="desc">确认删除菜单?</span>
              </div>
              <div slot="footer">
                <g-button @click="confirmDel(entry)" type="2">确认</g-button>
                <g-button @click="closeDiglog(entry, 'del')" type="3">取消</g-button>
              </div>
            </diglog>
            <!--删除-->
            <a @click="showDiglog(entry, 'move')">移动</a>
          </td>
          <td>
            <a @click="showDiglog(entry, 'sort', filteredData, index)">调整到</a>
            <!--顺序调整-->
            <diglog :ref="'sort' + entry.id" my-style="width:450px;height:150px" :is-Out="isOut">
              <h2 slot="header">菜单顺序调整</h2>
              <div slot="body" style="text-align:center;margin: 20px 0;padding: 0 40px">
                将菜单【{{ entry.name }}】调整到：<input
                  type="text"
                  class="g-input"
                  autocomplete="off"
                  v-model="entry.newSort"
                  style="width:40px;margin-right: 5px"
                />
              </div>
              <div slot="footer">
                <g-button @click="confirmSort(entry)" type="2">确认</g-button>
                <g-button @click="closeDiglog(entry, 'sort')" type="3">取消</g-button>
              </div>
            </diglog>
            <!--顺序调整-->
          </td>
        </tr>
        <tr v-if="filteredData.length <= 0" style="height:482px">
          <td :colspan="columns.length + 3">{{ emptyInfo }}</td>
        </tr>
      </tbody>
      <tfoot>
        <td :colspan="columns.length + 3">
          <pager
            :fn="this.requestMenu.requestMenuTable"
            :pagesize="10"
            :model="this.getSubMenuData()"
            :pid="this.getMenuSelectObj().treeModel ? this.getMenuSelectObj().treeModel.id : 0"
          ></pager>
        </td>
      </tfoot>
    </table>
    <!--移动-->
    <diglog v-show="moveShow" @close="closeDiglog(entry, 'move')" my-style="width:300px;" bottom="bottom:50px;">
      <h2 slot="header">移动菜单</h2>
      <div slot="body" style="height: 340px;overflow-y: auto;margin: 20px 0;padding: 0 40px;">
        <tree
          v-for="model in this.gUtils.jsonMenuFormat(this.getMenuData())"
          :tree-model="model"
          rad-name="name"
          @check="treeCheckradio"
        ></tree>
      </div>
      <div slot="footer">
        <g-button @click="confirmMove" type="2">确认</g-button>
        <g-button @click="moveShow = false" type="3">取消</g-button>
      </div>
    </diglog>
    <!--移动-->
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
      menuIconShow: false,
      icons: [
        {
          name: 'icon-zuzhi'
        },
        {
          name: 'icon-jiaoseguanli-copy'
        },
        {
          name: 'icon-leixing'
        },
        {
          name: 'icon-kefu'
        },
        {
          name: 'icon-jichumokuai'
        },
        {
          name: 'icon-neirong'
        },
        {
          name: 'icon-weibiaoti5'
        },
        {
          name: 'icon-wodequanyi'
        },
        {
          name: 'icon-caidan2'
        }
      ]
    };
  },
  computed: {
    // 数据过滤
    filteredData() {
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
            if (key == 'crTime') {
              return (
                gUtils
                  .changeToDate(String(row[key]))
                  .toLowerCase()
                  .indexOf(filterKey) > -1
              );
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
    },
    changeIconToImg(value, key) {
      if (key == 'icon') {
        return '';
      }
      return value;
    }
  },
  methods: {
    ...mapGetters({
      getMenuData: 'getMenuData',
      getMenuFixObj: 'getMenuFixObj',
      getSubMenuData: 'getSubMenuData',
      getMenuSelectObj: 'getMenuSelectObj'
    }),
    ...mapActions({
      del: 'treeMenuDataDEL',
      sort: 'treeMenuDataSORT',
      move: 'treeMenuDataMOVE',
      edit: 'treeMenuDataEDIT',
      setMenuSelectObj: 'setMenuSelectObj',
      setMenuCheckRadObj: 'setMenuCheckRadObj'
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
      } else {
        // 实现全选
        _this.checkboxModel = [];
        _this.data.forEach((item) => {
          _this.checkboxModel.push(item.id);
        });
      }
    },
    showDiglog(obj, type, data, index) {
      switch (type) {
        case 'del':
          this.$refs[type + obj.id][0].show = true;
          break;
        case 'move':
          this.moveShow = true;
          break;
        case 'edit':
          this.$refs[type + obj.id][0].show = true;
          break;
        case 'sort':
          this.$refs[type + obj.id][0].show = true;
          break;
      }
      // //console.log(obj.id);
      this.setMenuSelectObj(obj);
    },
    closeDiglog(obj, type) {
      this.$refs[type + obj.id][0].show = false;
    },
    confirmDel(obj) {
      // this.del(obj);
      //
      const getMenuData = this.getMenuData();
      let getMenuFixObj = this.getMenuFixObj();
      const getSubMenuData = this.getSubMenuData();
      const sJson = {
        orders: [
          {
            property: 'sort',
            desc: false
          }
        ]
      };
      const params = {
        id: obj.id,
        criteria: JSON.stringify(sJson)
      };
      this.$http({
        method: 'POST',
        url: `${this.devUrl}/menu/delete`,
        params
      }).then(
        function (data) {
          const result = data.data;
          if (result.isSuccess) {
            for (var i = 0; i < getMenuData.length; i++) {
              var cur = getMenuData[i];
              if (cur.id == params.id) {
                getMenuFixObj = getMenuData[i];
                getMenuData.splice(i, 1);
                i--;
              }
              if (cur.parentId == params.id) {
                getMenuData.splice(i, 1);
                i--;
              }
            }

            for (var i = 0; i < getSubMenuData.entities.length; i++) {
              var cur = getSubMenuData.entities[i];
              if (cur.id == params.id) {
                getSubMenuData.entities.splice(i, 1);
                i--;
              }
            }
            // alert("删除菜单成功!");
            // 替换原生alert
            $('body').append(this.gUtils.myAlert('删除菜单成功!', 'pop'));
            $('.pop').click(() => {
              $('.maskpop').remove();
            });
            this.$refs[`del${obj.id}`][0].show = false;
            this.requestMenu.requestTreeMenu();
            this.requestMenu.requestMenuTable(params);
          }
        },
        function (error) {
          $('body').append(this.gUtils.myAlert(error.data.resultMsg, 'pop'));
          $('.pop').click(() => {
            $('.maskpop').remove();
          });
        }
      );
    },
    confirmMove() {
      this.move();
      this.moveShow = false;
    },
    confirmSort(obj) {
      // this.sort(obj);
      //
      const getMenuData = this.getMenuData();
      const getSubMenuData = this.getSubMenuData();
      let params = {
        sort: obj.newSort
      };
      params = Object.assign(obj, params);
      this.$http({
        method: 'POST',
        url: `${this.devUrl}/menu/update`,
        params
      }).then(
        function (data) {
          const result = data.data;
          if (result.isSuccess) {
            const arr = getSubMenuData.entities;
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].id == params.id) {
                arr[i].sort = params.sort;
              }
            }
            this.gUtils.sortArr(arr, 'sort');

            this.requestMenu.requestTreeMenu();
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

      this.$refs[`sort${obj.id}`][0].show = false;
    },
    confirmEdit(obj) {
      // this.edit(obj);
      //

      this.$validator.validateAll('form-2').then((success) => {
        if (!success) {
          // //console.log("校验失败")
        } else {
          const getMenuData = this.getMenuData();
          const getSubMenuData = this.getSubMenuData();
          const params = obj;
          this.$http({
            method: 'POST',
            url: `${this.devUrl}/menu/update`,
            params
          }).then(
            function (data) {
              const result = data.data;
              if (result.isSuccess) {
                // alert("菜单修改成功!");
                // 替换原生alert
                $('body').append(this.gUtils.myAlert('菜单修改成功!', 'pop'));
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
    treeCheckradio(obj) {
      this.setMenuCheckRadObj(obj);
    },
    selectIcon() {
      this.menuIconShow = true;
    },
    addIcon(obj, name) {
      obj.icon = name;
      this.menuIconShow = false;
    },
    leaveIcon() {
      this.menuIconShow = false;
    }
  },
  watch: {
    // 深度 watcher
    checkboxModel: {
      handler(val, oldVal) {
        if (this.checkboxModel.length === this.data.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
        // console.log(this.checkboxModel);
      },
      deep: true
    }
  },
  mounted() {
    // //console.log(this.data);
  }
};
</script>
