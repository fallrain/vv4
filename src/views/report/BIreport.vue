<template>
  <div>
    <iframe :src="openurl" width="100%" height="800"></iframe>
  </div>
</template>

<script>
export default {
  name: 'BIreport',
  data() {
    return {
      openurl: ''
    };
  },
  methods: {
    getUserToken() {
      const _this = this;
      this.requestReport.getUserToken().then((data) => {
        if (data.isSuccess) {
          _this.openurl = `https://tbvp.haier.net/bi/bi/bi/?proc=1&action=viewer&hback=true&db=!7528!!6237!!7ba1!!7406!!4e2d!!5fc3!!8fd0!!8425!!62a5!!8868!!2f!!5151!!5457!!62a5!!8868!.db&isAir=false&browserType=chrome&sysFlag=vipcent&token=${
            data.data}`;
          // window.open('https://www.baidu.com/')
        } else {
          _this.$message.warning(data.msg);
        }
      });
    }
  },
  mounted(e) {
    this.getUserToken();
  }
};
</script>

<style scoped></style>
