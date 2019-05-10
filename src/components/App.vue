<template>
  <div>
    <router-view></router-view>
    <eg-loading :diaplay="this.getLoading"></eg-loading>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '../vuex/index.js';

export default {
  store,
  data() {
    return {
      // isTig: true
    };
  },
  computed: {
    ...mapGetters({
      getLoading: 'getLoading'
    })
  }
  // mounted() {
  //   //主题切换
  //   var $this = this;
  //   document.onkeydown = function (e) {
  //     if (e.keyCode == 220 && e.ctrlKey) {
  //       $this.isTig = !$this.isTig
  //     }
  //   }
  // },
  // updated() {
  //   //主题切换
  //   var $this = this;
  //   document.onkeydown = function (e) {
  //     if (e.keyCode == 220 && e.ctrlKey) {
  //       $this.isTig = !$this.isTig
  //     }
  //   }
  // }
};
</script>
