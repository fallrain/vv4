<template>
  <div class="loading" v-show="diaplay">
    <div class="box">
      <div class="icon fl"></div>
      <div><slot>加载中...</slot></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'eg-loading',
  props: ['diaplay']
};
</script>
