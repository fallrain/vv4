<template>
  <div :style="'width:' + width + ';height:' + height"></div>
</template>
<script>
export default {
  props: ['width', 'height', 'type', 'data', 'select', 'options', 'isArea'],
  watch: {
    data() {
      // 注册曲线图
      const line = echarts.init(this.$el);
      let lineOption = {};

      lineOption = {
        legend: {
          data: ['注册用户数', '会员数']
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.data.date
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '注册用户数',
            min: parseInt(Math.min.apply({}, this.data.data[0].data) * 0.96),
            max: parseInt(Math.min.apply({}, this.data.data[1].data) * 0.3),
            axisLabel: {
              formatter: '{value}'
            },
            axisPointer: {
              snap: true
            },
            splitLine: {
              lineStyle: {
                color: ['#c5e3f9']
              }
            }
          },
          {
            type: 'value',
            name: '会员数',
            min: parseInt(Math.min.apply({}, this.data.data[1].data) * 0.97),
            max: parseInt(Math.max.apply({}, this.data.data[1].data) * 1.005),
            axisLabel: {
              formatter: '{value}'
            },
            axisPointer: {
              snap: true
            },
            splitLine: {
              lineStyle: {
                color: ['#e8e7e7']
              }
            }
          }
        ],
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
        series: this.data.data
      };

      line.setOption(lineOption);
      line.resize();
    }
  }
};
</script>
