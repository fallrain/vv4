<template>
  <div class="g-select" @mouseleave="ml()">
    <span
      class="g-select_tit"
      @click="open()"
      @mouseenter="mouseenter()"
      @mouseleave="mouseleave()"
      :value="initItem.value"
      >{{ initItem.label
      }}<i class="iconfont" :class="{ 'icon-menu-block-right-copy': !show, 'icon-menu-block-up-copy': show }"></i
      ><b
        v-if="isclear"
        v-show="clearShow"
        @click="clear()"
        class="iconfont"
        :class="{ 'icon-icon-32': !!this.initItem.value.toString() }"
      ></b
    ></span>
    <div class="list" v-show="show" :style="'height:' + (listHeight || 'auto') + 'px'">
      <span class="g-select_l" @click="select(item)" v-for="item in model" :value="item[value]">{{ item[label] }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'eg-select',
  props: {
    model: [Object, Array],
    value: String,
    label: String,
    init: [Object],
    field: String,
    placeholder: {
      type: String,
      default: '请选择'
    },
    listHeight: [String, Number],
    isclear: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      clearShow: false
    };
  },
  computed: {
    initItem() {
      const obj = {
        label: this.placeholder,
        value: ''
      };
      if (this.init) {
        for (const i in this.model) {
          if (this.model[i][this.value] == this.init[this.field]) {
            obj.label = this.model[i][this.label];
            obj.value = this.model[i][this.value];
          }
        }
      }
      return obj;
    }
  },
  methods: {
    open() {
      this.show = !this.show;
    },
    select(i) {
      if (this.init) {
        this.init[this.field] = i[this.value];
      }
      this.initItem.value = i[this.value];
      this.initItem.label = i[this.label];
      this.show = false;
      this.change();
    },
    ml() {
      this.show = false;
    },
    change() {
      this.$emit('change', this.initItem);
    },
    clear() {
      this.initItem.value = '';
      this.change();
      this.initItem.label = this.placeholder;
      this.$emit('clear');
    },
    mouseenter() {
      this.clearShow = true;
    },
    mouseleave() {
      this.clearShow = false;
    }
  }
};
</script>
