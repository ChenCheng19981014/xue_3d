<template>
    <div class="circle-gauge-two" :class="theme.type" @dblclick="$emit('dblclick')">
        <div class="circle-gauge-two-chart">
            <el-progress class="circle-gauge-chart" type="dashboard" :percentage="percent" :stroke-linecap="'round'" :width="chartWidth" :stroke-width="12"
                         :show-text="false"/>
            <div class="circle-gauge-two-in" :style="{...inSideStyle,width:chartWidth+'px',height:chartWidth+'px'}">
                <div class="in-content">
                    <gradient-text class="content-value" :content="showValue?`${value}`:`${percent}%`" :theme="theme"
                                   :font-size="valueFontSize" :line-height="valueLineHeight"/>
                    <br/>
                    <gradient-text class="content-unit" v-if="unit" :content="unit" :theme="theme"
                                   :font-size="unitFontSize" :line-height="unitLineHeight"/>
                </div>
                <div class="in-chart" :style="{transform:`rotate(${-140+(percent*2.8)}deg)`}">
                    <gradient-icon class="in-icon" icon="icon-geological-pulldown" :theme="theme" :size="20*chartWidth/391"/>
                    <br/>
                    <gradient-text class="in-value" :content="`${percent}%`" :font-size="36*chartWidth/391" :line-height="62*chartWidth/391" v-if="iconText" :theme="theme"/>
                </div>
            </div>
        </div>
        <div class="circle-gauge-two-name" :style="nameStyle" v-if="name">{{name}}</div>
    </div>
</template>
<script>
	import gradientText from '@/components/common-gradient/common-gradient-text';
	import gradientIcon from '@/components/common-gradient/common-gradient-icon';

	export default {
		name: 'circle-gauge-two',
		components: {
			gradientText,
			gradientIcon
		},
		data() {
			return {}
		},
		props: {
			chartWidth:{type:Number,default:391},
			iconText: {type: Boolean},
			name: {type: String},
			showValue: {type: Boolean},
			value: {type: Number, default: 0},
			valueFontSize: {type: Number, default: 72},
			valueLineHeight: {type: Number, default: 108},
			total: {type: Number, default: 100},
			unit: {type: String},
			unitFontSize: {type: Number, default: 48},
			unitLineHeight: {type: Number, default:84},
			dangerPercent: {type: Number, default: 50},
			safePercent: {type: Number, default: 100},
			color: {type: Array},
			inSideStyle: {type: Object, default: () => ({})},
			nameStyle: {type: Object, default: () => ({})}
		},
		computed: {
			percent() {
				const data=this.total==0?0:this.value / this.total
				return (data>1?1:Number(data.toFixed(2))) * 100
			},
			theme() {
				if (this.color) {
					return {type: 'circle-gauge-two', from: this.color[0], to: this.color[1]}
				}
				if (!(this.percent < this.safePercent)) {
					return {type: 'circle-gauge-two-safe', from: '#00de97', to: '#34ff80'}
				} else if (this.percent < this.dangerPercent) {
					return {type: 'circle-gauge-two-danger', from: '#FF4545', to: '#FF5028'}
				} else {
					return {type: 'circle-gauge-two-normal', from: '#A7DAEB', to: '#D8EEF7'}
				}
			}
		}
	}
</script>
<style lang="less" scoped>
    .circle-gauge-two {
        position: relative;
        left: 0;
        top: 0;
        text-align: center;

        .circle-gauge-chart {
            display: inline-block;
            /deep/ svg > path:nth-child(2) {
                stroke: url(#xs-white);
            }

            /deep/ svg > path:nth-child(1) {
                stroke-linecap: round;
                stroke: rgba(255, 255, 255, 0.3);
            }
        }
        .circle-gauge-two-in{
            position: absolute;
            left: 50%;
            top:0;
            transform: translateX(-50%);
            background:url(../../../static/images/gauge/circle-white.png) center no-repeat;
            background-size: 80% auto;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            font-size: 0;
            line-height: 0;
            .in-content{
                text-align: center;
                font-size: 0;
                line-height: 0;
                .content-value{
                    font-family: PangMenZhengDao;
                    font-weight: 400;
                }
            }
            .in-chart{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                padding-top: 23px;
                box-sizing: border-box;
                text-align: center;
                border-radius: 50%;
                transition: all 0.6s;
                .in-value{
                    font-family: PingFang-SC;
                    font-weight: 500;
                }
            }
        }
        .circle-gauge-two-name{
            font-size: 48px;
            line-height: 50px;
            font-family: PingFang-SC;
            font-weight: bold;
            color: #FFFFFF;
            text-align: center;
            margin-top: -50px;
        }
        &.circle-gauge-two-safe {
            .circle-gauge-two-in{
                background-image:url(../../../static/images/gauge/circle-green.png);
            }
            .circle-gauge-chart {
                /deep/ svg > path:nth-child(2) {
                    stroke: url(#xs-green);
                }
                /deep/ svg > path:nth-child(1) {
                    stroke-linecap: round;
                    stroke: rgba(136, 255, 142, 0.3);
                }
            }

        }

        &.circle-gauge-two-danger {
            .circle-gauge-two-in{
                background-image:url(../../../static/images/gauge/circle-red.png);
            }
            .circle-gauge-chart {
                /deep/ svg > path:nth-child(2) {
                    stroke: url(#xs-red);
                }
                /deep/ svg > path:nth-child(1) {
                    stroke-linecap: round;
                    stroke: rgba(255, 126, 151, 0.3)
                }
            }

        }
    }
</style>
