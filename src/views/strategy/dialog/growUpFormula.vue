<template>
  <div>
    <span>成长值</span>
    <span>=</span>
    <span v-for="(item, index) in strategy" v-if="item.status == 1">
      <span v-if="index > 0" style="margin-right:5px;">+</span>{{ item.strategyName }} *
      <el-input
        v-model="item.scale"
        style="width:60px;display:inline-block;margin:0 5px 10px;"
        :maxlength="10"
        @keyup.native="scaleChange(item.scale, index)"
      ></el-input>
    </span>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ['growUpStrategy', 'changeScale', 'random'],
  data() {
    return {
      strategy: []
    };
  },
  mounted() {
    this.strategy = JSON.parse(JSON.stringify(this.growUpStrategy));
  },
  methods: {
    scaleChange(data, i) {
      // console.log(data)
      data += '';
      // data = data.replace(/[^\d.]/g,'')
      data = data.replace(/\D/g, '');
      // data = data.replace(/^d*(?:.d{0,2})?$/,'$1$2.$3')

      this.strategy[i].scale = data;
      //      if(data == ''){
      //        this.$message({
      //          type: 'info',
      //          message: '逻辑值不得为空'
      //        });
      //        return
      //      }

      const scaleArr = {
        growUpIds: [],
        scales: []
      };

      for (var i = 0; i < this.strategy.length; i++) {
        scaleArr.growUpIds.push(this.strategy[i].id);
        scaleArr.scales.push(this.strategy[i].scale);
      }

      this.changeScale(scaleArr);
    }
  },
  watch: {
    random(curVal) {
      this.strategy = JSON.parse(JSON.stringify(this.growUpStrategy));
    }
  }
};
</script>
