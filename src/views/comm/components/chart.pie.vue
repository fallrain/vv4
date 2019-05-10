<template>
  <div :style="'width:' + width + ';height:' + height"></div>
</template>
<script>
export default {
  props: ['width', 'height', 'type', 'data', 'select', 'color'],
  watch: {
    data() {
      // 注册柱状图
      const pie = echarts.init(this.$el);
      const col = this.color;

      let pieOption = {};
      if (col == 1 || col == undefined) {
        pieOption = {
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}'
            // formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: '55%',
              center: ['50%', '40%'],
              data: this.data.data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          color: ['rgb(228,22,95)', 'rgb(197,211,48)', 'rgb(245,88,61)']
        };
      } else {
        pieOption = {
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}'
            // formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: '55%',
              center: ['50%', '40%'],
              data: this.data.data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          color: ['rgb(187,61,73)', 'rgb(22,137,228)', 'rgb(252,183,44)']
        };
      }

      pie.setOption(pieOption);
      pie.resize();

      // 饼图点击回调方法
      if (this.select) {
        var self = this;
        pie.on('click', (series) => {
          if (series.componentType === 'markArea') {
            series.dataIndex = $.inArray(series.data.coord[1][0], self.data.date);
            self.select(series);
          } else if (series.componentType === 'series') {
            self.select(series);
          }
        });
      }

      if (this.options) {
        self.select(pie);
      }
    }
  }
};
</script>
