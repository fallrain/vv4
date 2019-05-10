<template>
  <iframe :src="openTab.url" width="100%" height="100%" frameborder="0"></iframe>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      openTab: 'getOpenTab'
    })
  },
  created() {
    // //console.log(this.openTab.url)
  }
};
</script>
