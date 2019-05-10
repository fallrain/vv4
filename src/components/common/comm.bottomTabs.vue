<template>
  <div class="g-bottomtabs">
    <div class="g-bottomtabs-view">
      <div v-if="showNum==(index+1)" v-for="(name,index) in btabname">
        {{name.name}}
        <slot id="ii1"></slot>
      </div>
      <div class="g-bottomtabs-tabs">
        <span @click="change(index+1)" v-for="(name,index) in btabname">{{name.name}} {{index+1}}</span>
      </div>
      <!--<div class="border" style="height: 100px;">

        <component :is="currentView" keep-alive></component>
      </div>
      <ul>
        <li><a href="javascript:void(0);" @click="toggleTabs(tab01Text);">{{tab01Text}}</a></li>
        <li><a href="javascript:void(0);" @click="toggleTabs(tab02Text);">{{tab02Text}}</a></li>
        <li><a href="javascript:void(0);" @click="toggleTabs(tab03Text);">{{tab03Text}}</a></li>
      </ul>-->
    </div>
</template>
<script>
// import tab01 from '../../views/home/tabs.1'
// import tab02 from '../../views/home/tabs.2'
// import tab03 from '../../views/home/tabs.3'
export default {
  data() {
    return {
      // tab01Text: "tab01", //导航栏文本1
      // tab02Text: "tab02", //导航栏文本2
      // tab03Text: "tab03", //导航栏文本3
      // currentView: 'tab01', //默认选中的导航栏,
      showNum: 1
    };
  },
  // render: function (createElement) {
  //   // <div><slot></slot></div>
  //   return createElement('div', this.$slots.default)
  // },
  components: {
    // tab01: tab01,
    // tab02: tab02,
    // tab03: tab03,
  },
  props: ['btabname'],
  methods: {
    change(index) {
      if (this.showNum != index) {
        this.showNum = index;
      }
    },
    toggleTabs(tabText) {
      this.currentView = tabText;
    }
  }
};

</script>
