<template>
    <div class="circle-bar" :style="{width:`${outSize}px`,height:`${outSize}px`}">
        <chart-base
                :delay="delay"
                class="chart-bg"
                :options="chartOptions[1]"
        />
        <chart-base
                :delay="delay"
                class="chart-content"
                :options="chartOptions[0]"
        />
        <div class="chart-legend" :style="{left:`${outSize / 2 + 20}px`,top:`${border-5}px`}">
            <div class="legend-item" v-for="item in legend" :key="item.name" :style="{height:`${border+5}px`,marginBottom:`${border*2-5}px`,borderColor:item.color}">
                <span class="legend-name" :style="{lineHeight:`${border}px`,}">{{item.name}}</span>
                <span class="legend-value" :style="{lineHeight:`${border}px`,color:item.color}">{{item.value}}</span>
            </div>
        </div>
        <div class="chart-icon iconfont" :class="icon" :style="{width:`${iconSize}px`,height:`${iconSize}px`,top:`${(outSize-iconSize)/2}px`,left:`${(outSize-iconSize)/2}px`,lineHeight:`${iconSize-2}px`}">{{content}}<slot></slot></div>
    </div>
</template>

<script>
	import chartBase from '@/components/chart-base/chart-base';
	export default {
		name: "circle-bar",
		components: {
			chartBase,
		},
		props: {
			delay:Number,
			value: {
				type: Array, default: () => ([])
			},
			color: {
				type: Array, default: () => (['#00AAFF', '#00FFFF', '#ffffff'])
			},
			outSize: {type: Number, default: 400},
            contentSize:{type:Number},
			border:{type: Number, default: 20},
			icon: {type: String},
			content:{type: String}
		},
		computed: {
			legend(){
				return this.value.map((item,index)=>({...item,color:this.color[index]}))
            },
            iconSize(){
				return this.contentSize||this.outSize-this.border*this.value.length*6-40;
            },
			chartOptions() {
				let max = 0, series = [],colors=[];
				const border=this.border;
				const innerSize=this.outSize-border*this.value.length*6;
				this.value.forEach((item,index) => {
					if (item.value > max) {
						max = item.value
					}
					colors.push(this.color[index]);
					series.push({
						type: 'bar',
						data: [item.value],
						coordinateSystem: 'polar',
						roundCap: true,
						name: item.name,
						barWidth: border,
						barGap: '200%',
					})
				});
				series.reverse();
				let options = {
					color: colors.reverse(),
					tooltip: {
						show:true,
						trigger: 'item',
						textStyle: {
							fontSize: 48,
						},
						padding: 20,
						formatter :({seriesName,value,color}) => {
							return `<span style="display:inline-block;margin-right:20px;width:36px;height:36px;background-color:${color}"></span>${seriesName}: ${value}`

						}
					},
					angleAxis: {
						max: max * 4 / 3,
						min: 0,
						show: false,
						startAngle: 90,
						clockwise: false,
						splitLine: {
							show: false
						},
					},
					radiusAxis: {
						type: 'category',
						show: false,
					},
					polar: {
						radius: [innerSize/2, this.outSize / 2],
						center: ['50%', '50%']
					},
					legend: {
						show: false,
					},
					series: series,
				}
				let bgOptions = {
					color: new Array(this.value.length).fill('rgba(255,255,255,0.25)'),
					angleAxis: {
						max: max * 4 / 3,
						min: 0,
						show: false,
						startAngle: 90,
						clockwise: false,
						splitLine: {
							show: false
						},
					},
					radiusAxis: {
						type: 'category',
						show: false,
					},
					polar: {
						radius: [innerSize / 2, this.outSize / 2],
						center: ['50%', '50%']
					},
					legend: {
						show: false,
					},
					series: new Array(this.value.length).fill({
						type: 'bar',
						data: [max],
						coordinateSystem: 'polar',
						roundCap: true,
						barWidth: border,
						barGap: '200%',

					}),
				}
				return [options, bgOptions]
			}
		}
	}
</script>

<style lang="less" scoped>
    .circle-bar {
        position: relative;
        top: 0;
        left: 0;
        font-size: 0;
        .chart-content, .chart-bg {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
        .chart-content{
            z-index:2
        }
        .chart-bg{
            z-index:1
        }
        .chart-legend{
            position: absolute;
            top:0;
            font-size: 0;
            .legend-item{
                border-left: 5px solid;
                font-size: 0;
                line-height: 0;
                vertical-align: bottom;
                padding-left: 10px;
                white-space: nowrap;
                .legend-name{
                    font-size: 30px;
                    font-family:
PingFang-SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    vertical-align: text-bottom;
                }
                .legend-value{
                    font-size: 48px;
                    font-family: PangMenZhengDao;
                    font-weight: 500;
                    margin-left: 10px;
                    vertical-align: text-bottom;
                }
            }
            z-index: 4;
        }
        .chart-icon {
            position: absolute;
            border: 1px solid rgba(255,255,255,0.5);
            background: linear-gradient(0deg, rgba(136, 136, 136,0.25) 0%, rgba(4, 8, 10, 0.25) 41%);
            border-radius: 50%;
            color: #FFFFFF;
            font-size: 36px;
            font-family:
PingFang-SC;
            font-weight: 500;
            text-align: center;
            &::before{
                font-size: 59px;
            }
            z-index: 3;
        }
    }
</style>
