<template>
    <div class="chart-base" ref="chart_base"></div>
</template>

<script>
	import ec from 'echarts';
	// import ec_gl from 'echarts-gl';
	import $ from 'jquery';

	export default {
		name: "chart-base",
		data() {
			return {
				//组件调用的时候，如果需要使用echarts实例方法可以使用ref来获取组件对象
				//具体方式如：this.$refs.xxxx.instance
				instance: null,
				isWaiting: false,
				tooltipCurrentIndex: -1
			}
		},
		props: {
			options: {
				type: Object,
				default() {
					return {}
				}
			},
			loading: Boolean,
			changeClear: {
				type: Boolean,
				default: true
			},
			delay: Number,
			active: {
				type: Boolean,
				default: true
			},
			tooltipType: {
				type: Object, default: () => ({
					type: '',
					eventName: ''
				})
			},
			zoomLength: {type: Number, default: 7},
            loadingStyle:{type:Object,default:()=>({
		            text: 'loading',
		            color: 'rgb(27, 166, 255)',
		            textColor: '#FFFFFF',
		            maskColor: 'rgba(0, 0, 0, 0.5)',
		            // 字体大小。从 `v4.8.0` 开始支持。
		            fontSize: 35,
		            // 是否显示旋转动画（spinner）。从 `v4.8.0` 开始支持。
		            showSpinner: true,
		            // 旋转动画（spinner）的半径。从 `v4.8.0` 开始支持。
		            spinnerRadius: 30,
		            // 旋转动画（spinner）的线宽。从 `v4.8.0` 开始支持。
		            lineWidth: 8
                })},
			devicePixelRatio:{type:Number,default:1}
		},
		methods: {
			initChart() {
				$(window).on('resize', this.resizeChart)
				if (this.$refs.chart_base) {
					// console.log('.............:', this.options)
					this.instance = ec.init(this.$refs.chart_base, {
						theme: 'macarons',
						// textStyle: {
						// 	fontSize: 38,
						// },
						...this.options || {}
					},{devicePixelRatio:this.devicePixelRatio});

					if (this.loading) {
						this.instance.showLoading(this.loadingStyle)
					}
				}
			},
			resizeChart() {
				// console.log("sl-main-size-change")
				if (!this.active) {
					return
				}
				this.$nextTick(() => {
					setTimeout(() => {
						if (this.instance) {
							// console.log("sl-main-size-change resize")
							this.instance.resize();
						}
					}, 2000)
				})
			},
			refreshChart() {

				// if(!this.active){
				//   return
				// }

				if (this.isWaiting) {
					return
				}
				if (this.instance) {
					if (this.changeClear) {
						this.instance.clear()
					}
					this.instance.setOption(this.options);
				}
				// console.log('refreshChart')
				// console.log(this.options)

			},
			changeTooltip() {
				this.$nextTick(() => {
					if (this.instance) {
						let dataLen = this.tooltipType.type === 'data' ? this.options.series[0] && this.options.series[0].data && this.options.series[0].data.length : this.options.series.length;
						if (!dataLen) {
							dataLen = 1
						}
						this.tooltipCurrentIndex = (this.tooltipCurrentIndex + 1) % dataLen;
					}
				})
			},
			autoTooltip() {
				if (this.tooltipType.type) {
					this.$eventBus.$on(this.tooltipType.eventName || 'chart-tooltip', this.changeTooltip)
				}
			}
		},
		mounted() {
			this.initChart();
			this.isWaiting = true;
			setTimeout(() => {
				this.isWaiting = false;
				this.refreshChart()
			}, this.delay)
			this.autoTooltip()
		},
		watch: {
			tooltipCurrentIndex(v, oldV) {
				if (this.instance) {
					const total = this.options.series[0] && this.options.series[0].data && this.options.series[0].data.length
					if (this.zoomLength < total && total > 1) {
						const step = 100 / total;
						const start = v + 1 - this.zoomLength;
						this.instance.dispatchAction({
							type: 'dataZoom',
							start: step * (start < 0 ? 0 : start),
							end: step * (v < this.zoomLength ? this.zoomLength : v + 1),

						})
					}
					this.zoomTimer=setTimeout(()=>{
						this.instance.dispatchAction({
							type: 'downplay',
							seriesIndex: this.tooltipType.type === 'series' ? oldV : 0,
							dataIndex: this.tooltipType.type === 'data' ? oldV : 0
						});
						this.instance.dispatchAction({
							type: 'highlight',
							seriesIndex: this.tooltipType.type === 'series' ? v : 0,
							dataIndex: this.tooltipType.type === 'data' ? v : 0
						});
						this.instance.dispatchAction({
							type: 'showTip',
							seriesIndex: this.tooltipType.type === 'series' ? v : 0,
							dataIndex: this.tooltipType.type === 'data' ? v : 0
						});
						clearTimeout(this.zoomTimer)
						this.zoomTimer=null
                    },500)
				}
			},
			active(v) {
				if (v) {
					this.resizeChart()
				}
			},
			loading(v) {
				if (v) {
					this.instance && this.instance.showLoading(this.loadingStyle)
				} else {
					this.instance && this.instance.hideLoading()
				}
			},
			options() {
				this.refreshChart()
			},

		},
		beforeDestroy() {
			if (this.tooltipTimer) {
				this.$eventBus.$off(this.tooltipType.eventName, this.changeTooltip);
				this.tooltipTimer = false
			}
			if(this.zoomTimer){
				clearTimeout(this.zoomTimer)
				this.zoomTimer=null
			}
			$(window).off('resize', this.resizeChart)
			this.instance && this.instance.clear()
			this.instance && this.instance.dispose()
			this.instance = null;
		},
		echarts: ec
	}
</script>

<style scoped>
    .chart-base {
    }
</style>
