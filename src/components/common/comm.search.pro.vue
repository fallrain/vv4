<template>
  <div class="search">
    <div class="search-input">
      <input
        type="text"
        autocomplete="off"
        class="g-input"
        :placeholder="placeholder"
        v-model="searchModel"
        :style="myStyle"
        @keyup.enter="keyup(searchModel)"
      />
      <i class="iconfont icon-1"></i>
    </div>
    <eg-button v-show="isbtnShow" type="1" my-style="min-width:30px;height:30px" @click="keyup(searchModel)"
      >搜索</eg-button
    >
  </div>
</template>
<script>
export default {
  name: 'eg-searchbox',
  data() {
    return {
      searchModel: ''
    };
  },
  props: {
    placeholder: String,
    myStyle: String,
    isbtnShow: Boolean
  },
  methods: {
    keyup(v) {
      this.$emit('keyup', v);
    }
  }
};
</script>
