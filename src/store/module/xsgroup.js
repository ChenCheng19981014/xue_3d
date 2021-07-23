const mergeOptions = (defaultOptions, options) => {
	Object.keys(options).forEach(key => {
		if (Object.prototype.toString.call(options[key]) === '[object Object]' && Object.prototype.toString.call(defaultOptions[key]) === '[object Object]') {
			mergeOptions(defaultOptions[key], options[key])
		} else {
			defaultOptions[key] = options[key]
		}
	})
};
const hexToRGBA = (color, opacity) => {
	let sColor = color.toLowerCase();
	const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	if (sColor && reg.test(sColor)) {
		if (sColor.length === 4) {
			let sColorNew = "#";
			for (let i = 1; i < 4; i++) {
				sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
			}
			sColor = sColorNew;
		}
		let sColorChange = [];
		for (let i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
		}
		return "rgba(" + sColorChange.join(",") + "," + opacity + ")";
	}
	return sColor;
}
export default {
	namespaced: true,
	state: {
		currentNav: "企业",
		activeInfo:'',
		navs: [
			{name: '企业', animation: 'enterprise', url: '/xs?currentNav=企业'},
			{name: '销售', animation: 'sale', url: '/xs?currentNav=销售'},
			{name: '生产', animation: 'product', url: '/xs?currentNav=生产'},
			{name: '仓库', animation: 'store', url: '/xs?currentNav=仓库'},
		],
		barTheme: {
			barWidth: 39,
			label: {
				show: false,
				position: 'top',
				distance: 10,
				color: '#ffffff',
				fontSize: 36,
				lineHeight: 47,
				fontFamily:'PingFang-SC',
				fontWeight: 500
			},
			itemStyle: {
				normal:{}
			}
		},
		barIcon: {
			type:'bar',
			name:'icon-bar',
			barMinHeight: 8,
			label: {
				show: false
			},
			itemStyle: {
				normal:{
					opacity:0
				}
			}
		},
		lineTheme: {
			showSymbol: true,//是否默认展示圆点
			symbol: 'circle',
			symbolSize: 24,
			itemStyle: {
				normal: {
					areaStyle: {
						type: 'default',
					},
					borderWidth: 26,
					lineStyle: {  //线的颜色
						width: 8
					},
				},
			},
			markPoint: {
				data: []
			},
		},
		linePointTheme: {
			symbol: 'circle',
			symbolSize: 20,
			itemStyle: {
				normal: {
					borderWidth: 26,
				}
			},
			label: {
				show: true,
				position: 'top'
			},
			symbolOffset: [0, 0]
		},
		lineLabel: {
			normal: {
				show: true,
				position: 'top',
				color: '#ffffff',
				fontSize: 36
			}
		},
		defaultXYChartOptions: {
			color: ['#1faae5', '#ffffff'],
			dataZoom:[{type:'inside'}],
			textStyle: {
				color: 'white',
				fontSize: 48,
			},
			grid: {
				left: 248,
				right: 69,
				bottom: 140,
				top: 200,
				containLabel: false,
			},
			tooltip: {
				trigger: 'axis',
				textStyle: {
					fontSize: 48,
				},
				padding: 20,
				axisPointer: {
					type: 'none'
				},
				extraCssText:'z-index: 99'
			},
			legend: {
				data: [],
				top: 65,
				right: 76,
				itemGap: 110,
				itemWidth: 36,
				itemHeight: 36,
				textStyle: {
					color: 'white',
					fontSize: 48,
					fontFamily: 'PingFang-SC',
					fontWeight: 500,
					padding: [0, 0, 0, 39],
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: true,
				axisLabel: {
					margin: 35,
					fontSize: 48,
					fontFamily: 'PingFang-SC',
					fontWeight: 500,
				},
				axisLine: {
					lineStyle: {
						color: ['rgba(151, 221, 255, 0.3)'],
						width: 3
					}
				},
			},
			yAxis: {
				type: 'value',
				axisLine: {
					show: false
				},
				axisLabel: {
					margin: 31,
					fontSize: 48,
					interval: 156,
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: ['rgba(151, 221, 255, 0.3)'],
						width: 3
					}
				},
				nameGap: 80,
				nameTextStyle: {
					normal: {
						fontSize: 48,
						fontFamily: 'PingFang-SC',
						fontWeight: 500,
					}
				}
			},
		},
	},
	getters: {
		currentNav: state => state.currentNav,
		navs: state => state.navs,
		chartXYOptions: (state) => ({vertical,longX, ...options}) => {
			const defaultOptions = JSON.parse(JSON.stringify(state.defaultXYChartOptions));
			defaultOptions.tooltip.formatter = (params) => {
				let result = ''
				params.forEach((item, index) => {
					if(index===0){
						result+=item.axisValue
					}
					let dotHtml = `<span style="display:inline-block;margin-right:20px;width:36px;height:36px;background-color:${item.color}"></span>`
					result += /^#/.test(item.seriesId)?'':`</br>${dotHtml}${item.seriesName}: ${item.data}`
				})
				return result
			}
			if (options && options.legend && options.legend.data) {
				options.legend.data = options.legend.data.map(item => {
					if (typeof item === 'string') {
						return {
							name: item,
							icon: 'rect'
						}
					} else if (item && !item.icon) {
						item.icon = 'rect'
					}
				})
			}
			mergeOptions(defaultOptions, options || {});

			if (defaultOptions.series) {
				let series = [];
				defaultOptions.series.forEach((item, index) => {
					const {theme = 0, showLabel, minPoint, maxPoint, noArea, type, ...other} = item;
					if (type === 'bar') {
						const themeStyle = JSON.parse(JSON.stringify(state.barTheme));
						const barIcon = JSON.parse(JSON.stringify(state.barIcon));
						barIcon.barWidth = item.barWidth;
						barIcon.itemStyle.normal.color = defaultOptions.color[index];
						let stack = item.stack || item.name;
						barIcon.stack = stack;
						const data = new Array(item.data.length);
						barIcon.data = data.fill(0);
						barIcon.name=item.name;
						barIcon.id='#'+item.name;
						if (theme === 1) {
							themeStyle.itemStyle.normal.opacity=0.5;
							barIcon.itemStyle.normal.color=defaultOptions.color[index];
							barIcon.itemStyle.normal.opacity=1
						}
						if (showLabel) {
							themeStyle.label.show=true
							if(theme===1){
								themeStyle.itemStyle.normal.color=hexToRGBA(defaultOptions.color[index],0.5);
								themeStyle.itemStyle.normal.opacity=1;
							}
						}
						series.push({
							type,
							...themeStyle,
							...other,
							stack
						},barIcon);
						return
					} else if (type === 'line') {
						const themeStyle = JSON.parse(JSON.stringify(state.lineTheme));
						const color = defaultOptions.color[index];
						themeStyle.itemStyle.normal.borderColor = hexToRGBA(color, 0.4);
						themeStyle.itemStyle.normal.color = color;
						themeStyle.itemStyle.normal.lineStyle.color = color;
						if (noArea) {
							delete themeStyle.itemStyle.normal.areaStyle
						} else {
							themeStyle.itemStyle.normal.areaStyle.color = {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0, color: hexToRGBA(color, 0.6)
								}, {
									offset: 1, color: hexToRGBA(color, 0)
								}],
								global: false // 缺省为 false
							}
						}
						if (maxPoint || minPoint) {
							themeStyle.symbolSize = 0;
							themeStyle.itemStyle.normal.borderWidth = 0;
							const pointTheme = JSON.parse(JSON.stringify(state.linePointTheme));
							pointTheme.itemStyle.normal.borderColor = hexToRGBA(color, 0.4);
							if (maxPoint) {
								themeStyle.markPoint.data.push({
									...pointTheme,
									type: 'max',
								})
							}
							if (minPoint) {
								themeStyle.markPoint.data.push({
									...pointTheme,
									type: 'min',
								})
							}
						} else {
							delete themeStyle.markPoint;
							if (showLabel) {
								themeStyle.label = JSON.parse(JSON.stringify(state.lineLabel))
							}
						}

						series.push({
							type,
							...themeStyle,
							...other
						})
						return;
					}
					series.push(item)
				})
				defaultOptions.series = series
			}
			if(longX){
				defaultOptions.xAxis.axisLabel.interval= 0;
				defaultOptions.xAxis.axisLabel.rotate= 30;
				defaultOptions.grid.bottom=typeof defaultOptions.grid.bottom==='number'&&defaultOptions.grid.bottom<210?210:defaultOptions.grid.bottom
			}
			if (vertical) {
				const {xAxis, yAxis} = defaultOptions;
				defaultOptions.xAxis = yAxis;
				defaultOptions.yAxis = xAxis;
			}
			return defaultOptions
		}
	},
	mutations: {
		setCurrentNav: (state, data) => {
			state.activeInfo='';
			state.currentNav = data
		},
		setActiveInfo(state,data){
			state.activeInfo=data
		}
	},
	actions: {},

}
