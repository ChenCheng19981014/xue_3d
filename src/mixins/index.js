// 圆环options基本设置

export const echartOptionsConfiguration = {
  methods: {
    getAnnulusOptions(data) {
      let  {
        title = '', // 标题
          value = 0, // 值
          colorIndex = 0, // 对应的color下标
          colors = [
            ['#35E5C8', '#1D73E0'],
            ['#FFD71D', '#FF450C']
          ]
      } = data
      let index = colorIndex > 1 || colorIndex < 0 ? 1 : colorIndex
      return {
        title: {
          text: '{a|' + value + '}{c| kw}',
          x: 'center',
          top: '32%',
          subtext: title,
          subtextStyle: {
            color: '#9BBFEA',
            fontSize: 36,
            padding: 0,
            fontFamily: "SourceHanSansCN-Regular"
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 86,
                color: '#fff',
                fontWeight: 700
              },
              c: {
                fontSize: 32,
                color: '#fff',
              }
            }
          }
        },
        grid: {
          left: 1,
          top: 1,
          right: 1,
          bottom: 1
        },
        toolbox: {
          show: false
        },
        angleAxis: {
          max: 100,
          show: false,
          startAngle:270
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,

          },
          axisTick: {
            show: false
          },
        },
        polar: {
          center: ['50%', '50%'],
          radius: ['95%', '85%'],
        },
        series: [{
          type: 'bar',
          data: [value],
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(168, 188, 216, 0.13)',
            borderColor: 'rgba(168, 188, 216, 0.13)',
          },
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth: 30,
          silent: false,
          itemStyle: {
            normal: {
              opacity: 1,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: colors[index][0]
              }, {
                offset: 1,
                color: colors[index][1]
              }]),
              borderWidth: 0
            }
          },
        }]
      }
    }
  },
}
