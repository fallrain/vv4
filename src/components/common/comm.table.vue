<template>
  <div>
    <div style="width:100%;padding-bottom:10px">
      <div style="overflow-x:auto;">
        <!--<div style="overflow-x:auto;overflow-y:hidden">-->
        <!--<table class="g-table" :style="'min-width:'+minWidth+'px'">
          <thead>
            <tr>
              <th v-show="ischeck"><input type='checkbox' @click='checkedAll()' :checked="checked"></th>
              <th v-if="isno">序号</th>
              <th v-for="key in columns" @click="sortBy(key)" :class="{ active: sortKey == key}">
                {{ key.split("|")[1] | capitalize }}
                <span class="arrow" v-if="sort" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
              </th>
              <slot name="title"></slot>
            </tr>
          </thead>
        </table>-->
        <div :style="'min-width:' + minWidth + 'px;max-height:' + maxHeight + 'px'">
          <table class="g-table" :style="'min-width:' + minWidth + 'px'">
            <thead>
              <tr>
                <th v-show="ischeck"><input type="checkbox" @click="checkedAll()" :checked="checked" /></th>
                <th v-if="isno">序号</th>
                <th v-for="key in columns" @click="sortBy(key)" :class="{ active: sortKey == key }">
                  {{ key.split('|')[1] | capitalize }}
                  <span class="arrow" v-if="sort" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
                </th>
                <slot name="title"></slot>
              </tr>
            </thead>
            <!--<tbody>-->
            <draggable v-if="isdrap" v-model="pageData.resultList" :element="'tbody'" @update="sortCallback">
              <tr v-for="(entry, index) in filteredData" :key="!!ckfield ? entry[ckfield] : entry">
                <td v-show="ischeck">
                  <input
                    type="checkbox"
                    name="checkboxinput"
                    v-model="checkboxModel"
                    :value="!!ckfield ? entry[ckfield] : entry"
                  />
                </td>
                <td v-if="isno">{{ index + 1 }}</td>
                <td v-for="key in columns">
                  {{ entry[key.split('|')[0]] }}
                  <!--{{entry[key.split('|')[0]] | changeDateForamt(key.split('|')[0]) }}-->
                </td>
                <slot :name="index + 1"></slot>
              </tr>
            </draggable>

            <tbody v-else v-model="pageData.resultList" :element="'tbody'" @update="sortCallback">
              <tr v-for="(entry, index) in filteredData" :key="!!ckfield ? entry[ckfield] : entry">
                <td v-show="ischeck">
                  <input
                    type="checkbox"
                    name="checkboxinput"
                    v-model="checkboxModel"
                    :value="!!ckfield ? entry[ckfield] : entry"
                  />
                </td>
                <td v-if="isno">{{ index + 1 }}</td>
                <td v-for="key in columns">
                  {{ entry[key.split('|')[0]] }}
                  <!--{{entry[key.split('|')[0]] | changeDateForamt(key.split('|')[0]) }}-->
                </td>
                <slot :name="index + 1"></slot>
              </tr>
            </tbody>
            <tr v-if="!filteredData || filteredData.length === 0" style="height:100px">
              <td :colspan="isno ? allcols : allcols - 1">{{ emptyInfo }}</td>
            </tr>
            <!--</tbody>-->
          </table>
        </div>
      </div>
    </div>
    <div style="margin-top:10px;" class="fr">
      <eg-pager
        :fn="this.pageFn"
        :pagesize="this.pageData.pageSize || 10"
        :model="this.pageData"
        :pm="this.pageParams || {}"
      ></eg-pager>
    </div>
  </div>
</template>
<script>
export default {
  name: 'eg-table',
  props: {
    data: [Array, Object],
    columns: Array,
    filterKey: String,
    sort: Boolean,
    sortType: String,
    sortFn: Function,
    emptyInfo: String,
    ischeck: Boolean,
    pageData: [Array, Object],
    pageFn: Function,
    pagesize: Number,
    pageParams: Object,
    checkFn: Function,
    allcols: Number,
    jurlist: [Object, String],
    filterFn: Function,
    minWidth: {
      type: Number,
      default: 1280
    },
    maxHeight: {
      type: Number,
      default: 530
    },
    isno: {
      type: Boolean,
      default: true
    },
    ckfield: String,
    isdrap: {
      type: Boolean,
      default: false
    }
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
      checked: false
    };
  },
  computed: {
    // 数据过滤
    filteredData() {
      const { sortKey } = this;
      const filterKey = this.filterKey && this.filterKey.toLowerCase();
      const { sort } = this;
      const order = this.sortOrders[sortKey] || 1;
      let data = this.data || [];
      const { filterFn } = this;
      // this.gUtils.sortArr(data, "sort");
      if (sort) {
        // 内部排序
        if (sortKey) {
          data = data.slice().sort((a, b) => {
            a = a[sortKey.split('|')[0]];
            b = b[sortKey.split('|')[0]];
            return (a === b ? 0 : a > b ? 1 : -1) * order;
          });
        }
      }

      if (filterFn) {
        filterFn(data);
      }
      return data;
    }
  },
  filters: {
    // 参数过滤器
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    // changeDateForamt: function (value, key) {
    //   if (key == "crTime") {
    //     return this.gUtils.changeToDate(value);
    //   } else {
    //     return value
    //   }
    // },
    // filterField:function (value, key) {
    //   if (key == "type") {
    //     return value == 0 ? value = "产线" :value = "版块"
    //   } else {
    //     return value
    //   }
    // },
  },
  methods: {
    sortBy(key) {
      if (this.sortType == 'static' || !this.sortType) {
        this.sortKey = key;
        this.sortOrders[key] = this.sortOrders[key] * -1;
      } else {
        this.sortOrders[key] = this.sortOrders[key] * -1;
        this.sortFn(key, this.sortOrders[key]);
      }
    },
    checkedAll() {
      const _this = this;
      if (this.checked) {
        // 实现反选
        _this.checkboxModel = [];
        _this.checkFn ? _this.checkFn(_this.checkboxModel) : null;
      } else {
        // 实现全选
        _this.checkboxModel = [];
        if (_this.data) {
          _this.data.forEach((item) => {
            // 当引用这个table组件，但是没有定义ckfield时，传整个对象（item）给input
            if (_this.ckfield) {
              _this.checkboxModel.push(item[_this.ckfield]);
            } else {
              _this.checkboxModel.push(item);
            }
            _this.checkFn ? _this.checkFn(_this.checkboxModel) : null;
          });
        }
      }
    },
    clear() {
      this.checkboxModel = [];
      this.checkFn ? this.checkFn(this.checkboxModel) : null;
    },
    sortCallback(evt) {
      // console.log(evt)
      // console.log('拖动前的索引fromId :' + evt.oldIndex)
      // console.log('拖动后的索引toId :' + evt.newIndex)
      // console.log('方向type :' + evt.oldIndex > evt.newIndex ? "上移0" : "下移1");
      this.$emit('drag', evt);
    }
  },
  watch: {
    // 深度 watcher
    checkboxModel: {
      handler(val, oldVal) {
        if (this.checkboxModel.length == 0) {
          this.checked = false;
          this.checkFn ? this.checkFn(this.checkboxModel) : null;
          return;
        }
        if (this.checkboxModel.length === this.data.length) {
          this.checked = true;
          this.checkFn ? this.checkFn(this.checkboxModel) : null;
        } else {
          this.checked = false;
          this.checkFn ? this.checkFn(this.checkboxModel) : null;
        }

        console.log(this.checkboxModel);
      },
      deep: true
    }
  },
  updated() {
    // //console.log(this.pageData);
  }
};
</script>
