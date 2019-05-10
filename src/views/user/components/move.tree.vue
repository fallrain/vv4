<template>
  <div class="g-tree">
    <span style="height:39px" :style="mgl"
      ><i
        v-show="isFolder"
        @click="toggle()"
        class="iconfont"
        :class="{ 'icon-menu-block-right': !isSelect, 'icon-menu-block-right-copy': isSelect }"
      ></i
      ><a :class="{ mgl18: !isFolder }"
        ><input type="radio" :name="radName" :checked="checked" @click="check(treeModel)" />{{ treeModel.name }}</a
      ></span
    >
    <div v-show="isOpen" v-if="isFolder" class="mgl5">
      <item
        v-for="model in treeModel.children"
        :tree-model="model"
        rad-name="name"
        :checked="checked"
        @check="treeCheckradio"
      >
      </item>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'item',
  props: {
    treeModel: Object,
    radName: String,
    checked: String
  },
  data() {
    return {
      isOpen: true,
      isSelect: true,
      mgl: `padding-left:${this.treeModel.level}${1 * 2}px`
    };
  },
  computed: {
    isFolder() {
      return this.treeModel.children && this.treeModel.children.length;
    }
  },
  methods: {
    ...mapActions({
      add: 'treeDataADD',
      setCheckRadObj: 'setCheckRadObj'
    }),
    ...mapGetters({
      //      fixObj: "getFixObj"
    }),
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
          this.isSelect = true;
        } else {
          this.isSelect = false;
        }
      }
    },
    check(model) {
      this.$emit('check', model);
    },
    treeCheckradio(obj) {
      this.setCheckRadObj(obj);
    }
  }
};
</script>
