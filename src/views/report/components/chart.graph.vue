<template>
  <div :style="'width:' + width + ';height:' + height"></div>
</template>
<script>
export default {
  props: ['width', 'height', 'type', 'data', 'select', 'options'],
  watch: {
    data() {
      // 注册柱状图
      const line = echarts.init(this.$el);
      let lineOption = {};

      (lineOption = {
        legend: {
          data: this.data.leg, // ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
          y: 25
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        xAxis: [
          {
            type: 'category',
            data: this.data.date
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: this.data.data
      }),
      line.setOption(lineOption);
      line.resize();

      // 饼图点击回调方法
      if (this.select) {
        var self = this;
        line.on('click', (series) => {
          if (series.componentType === 'markArea') {
            series.dataIndex = $.inArray(series.data.coord[1][0], self.data.date);
            self.select(series);
          } else if (series.componentType === 'series') {
            self.select(series);
          }
        });
      }

      if (this.options) {
        self.select(line);
      }
    }
  }
};
</script>
