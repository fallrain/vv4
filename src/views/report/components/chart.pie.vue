<template>
  <div style="width:350px;height:280px;"></div>
</template>
<script>
export default {
  props: ['data', 'select'],
  mounted() {
    drawChart(this.$el, this.data, this.select);
  },
  watch: {
    data() {
      drawChart(this.$el, this.data, this.select);
    }
  }
};

function drawChart(ele, data, select) {
  // 注册饼图
  const pie = echarts.init(ele);
  // 指定图表的配置项和数据
  const pieOption = {
    series: [
      {
        name: '应用信息',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        color: [
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
        data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  pie.setOption(pieOption);

  // 饼图点击回调方法
  if (select) {
    pie.on('click', (series) => {
      select(series);
    });
  }
}
</script>
