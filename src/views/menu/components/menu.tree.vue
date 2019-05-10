<template>
  <div class="g-tree">
    <span
      :class="{ isselect: isSelect, allHover: allHover, treeOne: treeOne, treeTwo: treeTwo, treeThree: treeThree }"
      :style="mgl"
      ><i
        @click="toggle()"
        class="iconfont"
        :class="{ 'icon-menu-block-right-copy': isOpen, 'icon-menu-block-right': !isOpen }"
        v-show="isFolder"
      ></i
      ><a @click="clickfn" :class="{ mgl18: !isFolder, readonly: !treeModel.hasAuth }">{{ treeModel.name }}</a></span
    >
    <div v-show="isOpen" v-if="isFolder" :style="">
      <item v-for="model in treeModel.children" :tree-model="model" @clickfn="treeCallBack"> </item>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'item',
  props: {
    treeModel: Object
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
    ...mapActions({
      add: 'treeMenuDataADD'
    }),
    ...mapGetters({
      fixObj: 'getMenuFixObj'
    }),
    toggle() {
      // this.$emit("toggle", this);
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
        // if (this.isOpen) {
        //   this.isSelect = true;
        // } else {
        //   this.isSelect = false;
        // }
      }
    },
    clickfn() {
      this.$emit('clickfn', this);
    },
    treeCallBack(obj) {
      if (obj.treeModel.hasAuth) {
        this.add(obj);

        let thisObj = {};
        let thisTreeRoot = {};
        const arr = [];

        function getRoot(data) {
          if (data.treeModel) {
            for (let i = 0; i < data.treeModel.level; i++) {
              thisObj = data;
              thisTreeRoot = data.$parent;
              if (data.treeModel == undefined) {
                break;
              } else {
                getRoot(data.$parent);
              }
            }
          }
        }
        getRoot(obj);
        thisTreeRoot.isSelect = false;
        arr.push(thisTreeRoot);

        function getJsonArr(data) {
          for (const i in data) {
            data[i].isSelect = false;
            if (data[i].$children.length <= 0) {
              continue;
            } else {
              getJsonArr(data[i].$children);
            }
          }
        }
        getJsonArr(arr);
        obj.isSelect = true;
      }
    }
  },
  // 刷新菜单树的显示样式
  updated() {
    if (this.treeModel.id == this.fixObj().parentId) {
      if (this.$children.length <= 0) {
        this.isSelect = false;
        this.isOpen = false;
      }
    }
  }
};
</script>
