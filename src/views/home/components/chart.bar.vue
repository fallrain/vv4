<template>
  <div :style="'width:' + width + ';height:' + height"></div>
</template>
<script>
export default {
  props: ['width', 'height', 'type', 'data', 'select', 'options'],
  watch: {
    data() {
      // 注册曲线图
      const line = echarts.init(this.$el);
      let lineOption = {};

      lineOption = {
        color: [
          '#78d4ff',
          '#9ebeed',
          '#b6ed9e',
          '#ffb675',
          '#ffc560',
          '#70dd7d',
          '#81c8f1',
          '#f3565d',
          '#6782d1',
          '#ced0f4',
          '#fe9e6d',
          '#65e2dd',
          '#beea93',
          'f57ec0'
        ],
        legend: {
          data: ['权益收益人数', '已领取权益数']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '权益收益人数',
            type: 'bar',
            barGap: 0,
            data: [320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 320, 332]
          },
          {
            name: '已领取权益数',
            type: 'bar',
            data: [220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 220, 182]
          }
        ]
      };

      line.setOption(lineOption);
      line.resize();
    }
  }
};
</script>
