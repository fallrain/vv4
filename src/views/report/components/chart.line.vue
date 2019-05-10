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
        legend: {
          data: this.data.leg,
          y: 25
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.data.date
        },
        yAxis: [
          {
            type: 'value',
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
          },
          {
            max: this.data.maxY,
            type: 'value',
            splitLine: {
              lineStyle: {
                color: ['#c5e3f9']
              }
            }
          }
        ],
        series: this.data.data
      };

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
