<template>
  <div style="width:150px;height:150px;"></div>
</template>
<script>
export default {
  props: ['data'],
  mounted() {
    const guage = echarts.init(this.$el);

    const guageOption = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          data: [
            {
              value: this.data * 100,
              name: ''
            }
          ],
          pointer: {
            length: '80%',
            width: 2,
            color: 'auto'
          },
          axisLine: {
            // 坐标轴线
            show: true, // 默认显示，属性show控制显示与否
            lineStyle: {
              // 属性lineStyle控制线条样式
              width: 10,
              color: [[this.data, '#62bef2'], [1, '#25516a']]
            }
          },
          axisTick: {
            // 坐标轴小标记
            show: true, // 属性show控制显示与否，默认不显示
            length: 10, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: '#f9f9f9',
              width: 3,
              type: 'solid'
            }
          },
          splitLine: {
            // 分隔线
            show: true, // 默认显示，属性show控制显示与否
            length: 10, // 属性length控制线长
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              color: '#f9f9f9',
              width: 3,
              type: 'solid'
            }
          },
          axisLabel: {
            // 坐标轴文本标签，详见axis.axisLabel
            show: true,
            formatter(v) {
              return '';
            }
          },
          detail: {
            formatter: '{value}%',
            textStyle: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              color: 'auto',
              fontSize: 14
            }
          }
        }
      ]
    };

    guage.setOption(guageOption);
  }
};
</script>
