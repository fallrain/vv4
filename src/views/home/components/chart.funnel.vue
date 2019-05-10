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
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        legend: {
          data: ['粉丝', '普通', '银牌', '金牌']
        },
        calculable: true,
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            left: '10%',
            top: 60,
            // x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
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
            gap: 2,
            label: {
              normal: {
                show: true
                // position: 'inside'
              },
              emphasis: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            labelLine: {
              normal: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#fff',
                borderWidth: 1
              }
            },
            data: this.data.data
            //            [
            //                {value: 100, name: '粉丝'},
            //                {value: 60, name: '普通'},
            //                {value: 40, name: '银牌'},
            //                {value: 20, name: '金牌'},
            //            ]
          }
        ]
      };

      line.setOption(lineOption);
      line.resize();
    }
  }
};
</script>
