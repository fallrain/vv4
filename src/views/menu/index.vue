<template>
  <div>
    <div class="g-juris-left">
      <div class="tree-search-warp">
        <search placeholder="请输入菜单名称" name="query" :isbtn-show="searchbtnShow" @keyup="downSearch"></search>
        <span class="downSearchBox" v-show="searchDownShow"
          ><ul>
            <li @click="downSearchAdd(v)" v-for="v in this.getMenuData()" v-if="v.shown">{{ v.name }}</li>
          </ul></span
        >
      </div>
      <tree
        :ref="'menuTree'"
        v-for="model in this.gUtils.jsonMenuFormat(this.getMenuData())"
        :tree-model="model"
        @clickfn="treeCallBack"
      ></tree>
    </div>
    <div class="g-juris-right">
      <!--菜单-->
      <transition name="component-fade" mode="out-in">
        <div class="group">
          <div class="toolbar">
            <g-button @click="newdigShow = true" type="1">新建菜单</g-button>
            <g-button
              @click="(adSearchShow = !adSearchShow), (isSearchShow = !isSearchShow)"
              type="2"
              style="float:right;min-width:50px;height:30px;margin-left:5px;"
              >高级</g-button
            >
            <search
              v-show="isSearchShow"
              :Fn="this.requestMenu.requestMenuTable"
              :pm="searchMenuMgr.pm"
              :pid="this.getMenuSelectObj()"
              :isbtn-show="searchbtnShow"
              placeholder="请输入菜单名称"
              name="query"
              my-style="padding-right:22px"
            ></search>
          </div>
          <div class="advanced-search" v-show="adSearchShow">
            <div class="warp">
              <div class="status">
                <el-input v-model="searchInfo['name'].val" placeholder="菜单名称"></el-input>
              </div>
              <div class="status">
                <el-input v-model="searchInfo['desc'].val" placeholder="描述"></el-input>
              </div>
              <div class="status">
                <el-input v-model="searchInfo['url'].val" placeholder="链接"></el-input>
              </div>
              <div class="timeDate">
                <el-date-picker
                  :editable="false"
                  v-model="searchInfo['crTime_S'].val"
                  type="datetime"
                  placeholder="选择创建开始日期"
                  align="right"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </div>

              <div class="timeDate">
                <el-date-picker
                  :editable="false"
                  v-model="searchInfo['crTime_E'].val"
                  type="datetime"
                  placeholder="选择创建结束日期"
                  align="right"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </div>
            </div>
            <g-button @click="adSeachFn(searchInfo)" type="2" style="float:right">搜索</g-button>
          </div>
          <!--右侧菜单列表 start-->
          <menu-table
            :data="getSubMenuData()"
            :columns="groupColumns"
            :filter-key="queryQuery"
            :filter-type="filterType"
            empty-info="没有相关菜单"
            :ckshow="ckshow"
          >
          </menu-table>
          <!--右侧菜单列表 end-->
          <!--新建菜单 start-->
          <diglog v-show="newdigShow" @close="newdigShow = false" @commit="confirmDel()" my-style="width:450px;">
            <h2 slot="header">新建菜单</h2>
            <div slot="body" class="digbox">
              <form data-vv-scope="form-1">
                <div class="col">
                  <span>菜单名称：</span>
                  <input
                    v-validate
                    data-vv-rules="required"
                    name="菜单名称"
                    type="text"
                    placeholder="请输入菜单名称"
                    class="g-input"
                    autocomplete="off"
                    style="width:260px;"
                    v-model="newGroupValue.name"
                  /><b class="star">*</b>
                  <p v-show="errors.has('菜单名称')" class="error">{{ errors.first('菜单名称') }}</p>
                </div>
                <div class="col">
                  <span>描述：</span>
                  <input
                    type="text"
                    placeholder="请输入描述"
                    class="g-input"
                    autocomplete="off"
                    style="width:260px;"
                    v-model="newGroupValue.desc"
                  />
                </div>
                <div class="col">
                  <span>链接：</span>
                  <input
                    type="text"
                    placeholder="请输入链接"
                    class="g-input"
                    autocomplete="off"
                    style="width:260px;"
                    v-model="newGroupValue.url"
                  />
                </div>
                <div class="col">
                  <span>图标：</span>
                  <input
                    readonly="readonly"
                    type="text"
                    placeholder="请选择图标"
                    class="g-input"
                    autocomplete="off"
                    style="width:260px;"
                    v-model="newGroupValue.icon"
                    @click="selectIcon()"
                  />
                  <div class="menu-icon-poplayer" v-show="menuIconShow" @mouseleave="leaveIcon()">
                    <b @click="addIcon(i.name)" v-for="i in icons" class="iconfont" :class="i.name"></b>
                  </div>
                </div>
                <div class="col">
                  <span>顺序值：</span>
                  <input
                    v-validate
                    data-vv-rules="numeric"
                    name="顺序值"
                    type="text"
                    placeholder="请输入顺序值"
                    class="g-input"
                    autocomplete="off"
                    style="width:260px;"
                    v-model="newGroupValue.sort"
                  />
                  <p v-show="errors.has('顺序值')" class="error">{{ errors.first('顺序值') }}</p>
                </div>
              </form>
            </div>
            <div slot="footer">
              <g-button @click="saveNewGroup(newGroupValue)" type="2">保存</g-button>
              <g-button @click="newdigShow = false" type="3">取消</g-button>
            </div>
          </diglog>
          <!--新建菜单 end-->
        </div>
      </transition>
      <!--菜单-->
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import tree from './components/menu.tree.vue';
import menuTable from './components/menu.table.vue';
import mTree from './components/move.tree.vue';
import gButton from '../../components/common/comm.button.vue';
import search from '../../components/common/comm.search.vue';
import diglog from '../../components/common/comm.dialog.vue';


export default {
  data() {
    return {
      queryQuery: '',
      userQuery: '',
      groupColumns: ['name|菜单名称', 'desc|描述', 'url|链接', 'icon|图标', 'crTime|创建时间', 'sort|排序'],
      newdigShow: false,
      filterType: true,
      ckshow: false,
      newGroupValue: {
        name: '',
        desc: '',
        url: '',
        icon: '',
        sort: ''
      },
      searchbtnShow: false,
      searchMenuMgr: {
        pm: {
          criterions: [
            {
              property: 'name',
              dataType: 'String',
              expression: ''
            }
          ],
          orders: [
            {
              property: 'sort',
              desc: false
            }
          ]
        }
      },
      searchDownShow: false,
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
      ],
      adSearchShow: false,
      isSearchShow: true,
      searchInfo: {
        crTime_S: {
          type: 'Date',
          val: ''
        },
        crTime_E: {
          type: 'Date',
          val: ''
        },
        name: {
          type: 'String',
          val: ''
        },
        trueName: {
          type: 'String',
          val: ''
        },
        desc: {
          type: 'String',
          val: ''
        },
        url: {
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
      }
    };
  },
  components: {
    tree,
    menuTable,
    mTree,
    gButton,
    search,
    diglog
  },
  methods: {
    ...mapActions({
      add: 'treeMenuDataADD', // 展示某个菜单的子菜单
      setMenuData: 'setMenuData',
      newMenu: 'newMenu'
    }),
    ...mapGetters({
      getMenuData: 'getMenuData',
      getSubMenuData: 'getSubMenuData',
      getMenuSelectObj: 'getMenuSelectObj',
      getTreeType: 'getTreeType'
    }),
    treeCallBack(obj) {
      this.add(obj);
      if (obj.treeModel.id == 0) {
      }
    },

    saveNewGroup(obj) {
      const getMenuSelectObj = this.getMenuSelectObj();
      const pObj = getMenuSelectObj.treeModel;
      const params = {
        level: pObj ? pObj.level + 1 : 1,
        name: obj.name, //*
        parentId: pObj ? pObj.id : 0, //*
        sort: obj.sort,
        desc: obj.desc,
        url: obj.url,
        icon: obj.icon
      };

      this.$validator.validateAll('form-1').then((success) => {
        if (!success) {
          // //console.log("校验失败")
        } else {
          this.$http({
            method: 'POST',
            url: `${this.devUrl}/menu/save`,
            params
          }).then(
            function (data) {
              const result = data.data;
              if (result.isSuccess) {
                const params = {
                  parentId: getMenuSelectObj.treeModel.id,
                  pageNo: 1,
                  pageSize: 10,
                  criteria: ''
                };
                this.requestMenu.requestTreeMenu();
                this.requestMenu.requestMenuTable(params);
                // alert("新建菜单成功!");
                // 替换原生alert
                $('body').append(this.gUtils.myAlert('新建菜单成功!', 'pop'));
                $('.pop').click(() => {
                  $('.maskpop').remove();
                });
                this.newdigShow = false;
                this.newGroupValue = {
                  name: '',
                  desc: '',
                  remark: '',
                  icon: '',
                  sort: ''
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
        }
      });
    },
    downSearch(val) {
      const $this = this;
      const arr = [];
      this.getMenuData().filter((param) => {
        if (param.name.indexOf(val) < 0) {
          param.shown = false;
        } else if (val != '') {
          param.shown = true;
          arr.push('1');
        }
      });
      if (arr.length > 0) {
        this.searchDownShow = true;
      } else {
        this.searchDownShow = false;
      }
    },
    downSearchAdd(val) {
      if (val.hasAuth) {
        const o = {
          treeModel: val
        };
        this.add(o);
        this.searchDownShow = false;

        // 搜索选中
        const obj = this.$refs.menuTree;

        function getJsonArr(data) {
          for (const i in data) {
            data[i].isSelect = false;
            if (data[i].treeModel.id == val.id) {
              data[i].isSelect = true;
            }
            if (data[i].$children.length <= 0) {
              continue;
            } else {
              getJsonArr(data[i].$children);
            }
          }
        }
        getJsonArr(obj);
      } else {
        $('body').append(this.gUtils.myAlert('无此栏目权限', 'pop'));
        $('.pop').click(() => {
          $('.maskpop').remove();
        });
        this.searchDownShow = false;
      }
    },
    selectIcon() {
      this.menuIconShow = true;
    },
    addIcon(name) {
      this.newGroupValue.icon = name;
      this.menuIconShow = false;
    },
    leaveIcon() {
      this.menuIconShow = false;
    },
    adSeachFn(pm) {
      // 高级搜索
      this.gUtils.adSearchCommFn(
        pm,
        this.requestMenu.requestMenuTable,
        {
          key: 'sort',
          desc: false
        },
        {
          parentId: this.getMenuSelectObj().treeModel.id
        }
      );
    }
  },
  created() {
    // 将初始json加载到vue
    this.$http({
      method: 'POST',
      url: `${this.devUrl}/menu/queryVisibleMenus`
    }).then(
      function (data) {
        const result = data.data;
        if (result.isSuccess) {
          this.setMenuData(result.data);
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  }
};
</script>
