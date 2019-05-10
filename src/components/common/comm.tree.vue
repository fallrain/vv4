<template>
  <div class="g-tree">
    <span
      :class="{ isselect: isSelect, allHover: allHover, treeOne: treeOne, treeTwo: treeTwo, treeThree: treeThree }"
      :style="mgl"
    >
      <i
        @click="toggle()"
        class="iconfont"
        :class="{ 'icon-menu-block-right-copy': isOpen, 'icon-menu-block-right': !isOpen }"
        v-show="isFolder"
      ></i
      ><a @click="clickfn" :class="{ mgl18: !isFolder }">{{ treeModel.name }}</a></span
    >
    <div v-show="isOpen" v-if="isFolder">
      <eg-tree v-for="model in treeModel.children" :tree-model="model" @clickfn="treeCallBack" :fn="fn"> </eg-tree>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'eg-tree',
  props: {
    treeModel: Object,
    fn: Function
  },
  data() {
    return {
      isOpen: false,
      isSelect: false,
      allHover: true,
      treeOne: this.treeModel.level == 0,
      treeTwo: this.treeModel.level == 1,
      treeThree: this.treeModel.level > 1,
      mgl: `padding-left:${this.treeModel.level}${1 * 6}px`
    };
  },
  computed: {
    isFolder() {
      return this.treeModel.children && this.treeModel.children.length;
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    clickfn() {
      this.$emit('clickfn', this);
    },
    treeCallBack(obj) {
      this.fn(obj);
    }
  }
};
</script>
