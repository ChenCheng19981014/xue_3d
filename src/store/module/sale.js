import {
	getSaleLeft1,
	getSaleRight3,
	getSaleLeft3,
	getSaleLeft4,
	getSaleMiddle,
	getSaleRight1,
	getSaleRight2
} from '@/api/api-xs'

export default {
	namespaced: true,
	state: {
		showDescription: false, // 展示无人指标体系具体说明
		left1: {
			loading: false,
			data: []
		},
		left2: {
			data: []
		},
		left3: {
			loading: false,
			data: []
		},
		left4: {
			loading: false,
			data: []
		},
		middle: {
			loading: false,
			topChartData: {
				// '大客户': 0,
				'重点客户': 0,
				'一般客户': 0,
				'新客户': 0
			},
			xAxis: [],
			bottomChartData: {
				// '大客户': [],
				'重点客户': [],
				'一般客户': [],
				'新客户': []
			}
		},
		right1: {
			loading: false,
			chartData: []
		},
		right2: {
			loading: false,
			chartData: []
		},
		right3: {
			loading: false,
			chartData: [],
		},
	},
	mutations: {
		SET_SHOW_DESCRIPTION(state, payload) {
			state.showDescription = payload
		},
		LOADING_CHANGE_STATUS(state, {name, loading}) {
			state[name].loading = loading
		},
		DATA_CHANGE(state, {name, data}) {
			state[name] = {
				...state[name],
				...data,
				loading: false
			}
		}
	},
	actions: {
		async left1GetData({commit}) {
			commit('LOADING_CHANGE_STATUS', {name: 'left1', loading: true})
			const dataBackAll = await getSaleLeft1();
			const dataBack = dataBackAll[0]
			const data = [
				{
					icon: 'icon-caiwu2',
					unit: '万',
					value: dataBack.saleAmount + "",//'2000',
					label: '本月销售额',
					trend: ''
				}, {
					icon: 'icon-tongbi',
					unit: '',
					value: dataBack.saleGrowthOnYear * 100 + "%",//'35%',
					label: '同比增长',
					trend: dataBack.saleGrowthOnYear<0?'down':'up'
				}, {
					icon: 'icon-huanbi',
					unit: '',
					value: dataBack.saleGrowthOnMonth * 100 + "%",//'35%',
					label: '环比增长',
					trend:  dataBack.saleGrowthOnMonth<0?'down':'up'
				}, {
					icon: 'icon-yueduwanchengshuai',
					unit: '',
					value: dataBack.saleProgress * 100 + "%",//'85.2%',
					label: '销售完成率',
					trend: ''
				},
			]
			const data2 = [
				{
					icon: 'icon-caiwu2',
					unit: '万',
					value: dataBack.paybackAmount + "",//'2000',
					label: '本月回款',
					trend: ''
				}, {
					icon: 'icon-tongbi',
					unit: '',
					value: dataBack.paybackGrowthOnYear * 100 + "%",//'35%',
					label: '同比增长',
					trend: dataBack.paybackGrowthOnYear<0?'down':'up'
				}, {
					icon: 'icon-huanbi',
					unit: '',
					value: dataBack.paybackGrowthOnMonth * 100 + "%",
					label: '环比增长',
					trend: dataBack.paybackGrowthOnMonth<0?'down':'up'
				}, {
					icon: 'icon-yueduwanchengshuai',
					unit: '',
					value: dataBack.paybackProgress * 100 + "%",//'85.2%',
					label: '回款完成率',
					trend: ''
				},
			]
			commit('DATA_CHANGE', {name: 'left2', data: {data: data2}})
			commit('DATA_CHANGE', {name: 'left1', data: {data}})
		},
		async left3GetData({commit}) {
			commit('LOADING_CHANGE_STATUS', {name: 'left3', loading: true})
			const data = await getSaleLeft3();
			commit('DATA_CHANGE', {name: 'left3', data: {data}})
		},
		async left4GetData({commit}) {
			commit('LOADING_CHANGE_STATUS', {name: 'left4', loading: true})
			const data = await getSaleLeft4();
			commit('DATA_CHANGE', {name: 'left4', data: {data}})
		},
		async middleGetData({commit}) {
			commit('LOADING_CHANGE_STATUS', {name: 'middle', loading: true})
			const data = await getSaleMiddle();
			let bottom = {
					// '大客户': [],
					'重点客户': [],
					'一般客户': [],
					'新客户': []
				},
				top = {
					// '大客户': 0,
					'重点客户': 0,
					'一般客户': 0,
					'新客户': 0
				};

			const xAxis = data.map(item => {
				const {
					largeCustomerRate = 0,
					importCustomerRate = 0,
					normalCustomerRate = 0,
					newCustomerRate = 0
				} = item;
				// bottom['大客户'].push(largeCustomerRate);
				// top['大客户'] += largeCustomerRate;
				bottom['重点客户'].push(importCustomerRate);
				top['重点客户'] += importCustomerRate;
				bottom['一般客户'].push(normalCustomerRate);
				top['一般客户'] += normalCustomerRate;
				bottom['新客户'].push(newCustomerRate);
				top['新客户'] += newCustomerRate;
				return item.name
			})
			commit('DATA_CHANGE', {
				name: 'middle', data: {
					xAxis,
					topChartData: top,
					bottomChartData: bottom,
				}
			})
		},
		async right1GetData({commit}) {
			commit('LOADING_CHANGE_STATUS', {name: 'right1', loading: true})
			const data = await getSaleRight1();
			commit('DATA_CHANGE', {name: 'right1', data: {chartData: data}})
		},
		async right2GetData({commit}) {
			commit('LOADING_CHANGE_STATUS', {name: 'right2', loading: true})
			const data = await getSaleRight2();
			commit('DATA_CHANGE', {name: 'right2', data: {chartData: data}})
		},
		async right3GetData({commit}) {
			commit('LOADING_CHANGE_STATUS', {name: 'right3', loading: true})
			const data = await getSaleRight3();
			const chartData = data.map(item => ({name: item.name, value: item.saleAmount}))
			commit('DATA_CHANGE', {name: 'right3', data: {chartData}})
		},
	},
	getters: {
		middleTopChartOptions(state) {
			const {topChartData: data} = state.middle;
			const color = ["#1BBDFF", "#1bffa1", "#fffa7c", "#FFFFFF"];
			const markStyle = {
				emphasis: {
					label: {
						show: true,
						formatter: "{a|{b}}\n{per|{d}%}",
						rich: {
							a: {
								// padding: [0, 0, 0, 40],
								// width: 180,
								align: 'left',
								color: "#fff",
								fontSize: 43,
								lineHeight: 51,
								fontFamily: 'PingFang-SC-Medium'
							},
							per: {
								// padding: [0, 0, 0, 40],
								// width: 180,
								align: 'left',
								fontSize: 72,
								fontFamily: "PangMenZhengDao"
							}
						},
						// alignTo: "labelLine",
						// margin: 240,
						// distanceToLabelLine: 0,
					},
					labelLine: {
						show: true,
						silent: true,
						lineStyle: {color: "#fff", width: 2},
						length: 63,
						length2: 200
					},
				}
			}
			return {
				tooltip: {
					show: false,
					trigger: 'item',
					textStyle: {
						fontSize: 48,
					},
					padding: 20,
					confine: true,
					formatter: '{a} <br/>{b}: {c} ({d}%)'
				},
				legend: {
					show: true,
					top: 147,
					left: 240,
					right: 240,
					width: 1120,
					itemGap: 100,
					itemWidth: 30,
					itemHeight: 30,
					textStyle: {
						color: 'white',
						fontSize: 36,
						fontFamily: 'SourceHanSansCN-Regular',
						fontWeight: 500,
						padding: [0, 0, 0, 30],
					},
					data: Object.keys(data)
				},
				series: [{
					name: '新老客户贡献率',
					type: "pie",
					selectedOffset: 5,
					center: [800, 673],
					label: {
						show: false,
					},
					labelLine: {show: false, length: 30, length2: 150, lineStyle: {color: "#fff", width: 2}},
					clockwise: false,
					radius: [294, 314],
					data: Object.keys(data).map(item => {
						return {name: item, value: data[item], selected: true, ...markStyle}
					})
				}],
				color
			}
		},
		middleBottomChartOptions(state, getters, rootState, rootGetters) {
			const {xAxis, bottomChartData: data} = state.middle;
			const defaultOption = {
				vertical: true,
				color: ["#1BBDFF", "#1bffa1", "#fffa7c", "#FFFFFF"],
				dataZoom: [
					{
						id: 'dataZoomX',
						type: 'inside',
						yAxisIndex: [0],
						filterMode: 'filter'
					},
				],
				grid: {
					right: 114,
					top: 0,
					left: 300,
				},
				legend: {
					show: false,
					data: Object.keys(data),

				},
				xAxis: {
					data: xAxis,
				},
				series: Object.keys(data).map(item => ({
					name: item,
					data: data[item],
					type: 'bar',
					stack: '总量',
					theme: 1
				}))
			}
			return rootGetters['xsgroup/chartXYOptions'](defaultOption)
		},
		right1ChartOptions(state, getters, rootState, rootGetters) {
			const {chartData} = state.right1
			const defaultOption = {
				// color:['#ffffff'],
				longX: true,
				legend: {
					show: false,
					data: ['各公司销售额完成情况'],

				},
				xAxis: {
					data: chartData.map(item => item.name),
				},
				yAxis: {
					name: '万元',
				},
				series: [
					{
						name: '各公司销售额完成情况',
						type: 'bar',
						data: chartData.map(item => item.sale || 0),
						theme: 1,
						showLabel: true
					}
				]
			}
			return rootGetters['xsgroup/chartXYOptions'](defaultOption)
		},
		right2ChartOptions(state, getters, rootState, rootGetters) {
			const {chartData} = state.right2
			const defaultOptions = {
				longX: true,
				color: ['#ffffff'],
				legend: {
					show: false,
					data: ['各公司销售额完成情况'],

				},
				xAxis: {
					data: chartData.map(item => item.name),
				},
				yAxis: {
					name: '万元',
				},
				series: [
					{
						name: '各公司销售额完成情况',
						type: 'bar',
						data: chartData.map(item => item.sale || 0),
						theme: 1,
						showLabel: true
					}
				]
			}
			return rootGetters['xsgroup/chartXYOptions'](defaultOptions)
		},
		right3LeftChartOptions(state, getters, rootState, rootGetters) {

			const {chartData} = state.right3
			const defaultOptions = {
				longX: true,
				legend: {
					show: false,
					data: ['各公司销售占比'],

				},
				xAxis: {
					data: chartData.map(item => item.name),
				},
				yAxis: {
					name: '万元',
				},
				series: [
					{
						name: '各公司销售占比',
						type: 'bar',
						data: chartData.map(item => item.value || 0),
						theme: 1,
						showLabel: true
					}
				]
			}
			return rootGetters['xsgroup/chartXYOptions'](defaultOptions)
		},
		right3RightChartOptions(state) {
			const {chartData} = state.right3
			const color = [
				['rgba(27, 166, 255, 1)', 'rgba(0, 255, 255, 1)', 'rgba(53, 138, 249, 1)', 'rgba(255, 255, 255, 1)', 'rgba(148, 192, 249, 1)', 'rgba(87, 143, 254, 1)'],
				['rgba(22, 69, 138, 0.5)', 'rgba(19, 174, 179, 0.5)', 'rgba(67, 103, 179, 0.5)', 'rgba(169, 172, 177, 0.5)', 'rgba(99, 129, 171, 0.5)', 'rgba(64, 110, 174, 0.5)'],

			];
			// const markStyle={
			// 		emphasis: {
			// 			label: {
			// 				show: true
			// 			},
			// 			labelLine: {
			// 				show: true
			// 			},
			// 		},
			// 		labelLine: {
			// 			show: true,
			// 			silent: true,
			// 			lineStyle: {
			// 				color: 'rgba(255, 255, 255, 1)',
			// 				width: 2,
			// 			},
			// 			length: 63,
			// 			length2: 200
			// 		},
			// 		label: {
			// 			show: true,
			// 			formatter: '{a|{b}}\n\n\n{per|{d}%}',
			// 			rich: {
			// 				a: {
			// 					color: '#FFF',
			// 					lineHeight: 22,
			// 					fontSize: 43,
			// 					fontFamily:'PingFang-SC-Medium'
			// 				},
			// 				per: {
			// 					color: '#fff',
			// 					padding: [2, 4],
			// 					fontSize: 72,
			// 					fontFamily:'PangMenZhengDao'
			// 				}
			// 			}
			// 		}};
			const markStyle = {
				emphasis: {
					labelLine: {
						show: true,
						silent: true,
						lineStyle: {
							color: 'rgba(255, 255, 255, 1)',
							width: 2,
						},
						length: 63,
						length2: 200
					},
					label: {
						show: true,
						formatter: '{a|{b}}\n\n\n{per|{d}%}',
						rich: {
							a: {
								color: '#FFF',
								lineHeight: 22,
								fontSize: 43,
								fontFamily: 'PingFang-SC-Medium'
							},
							per: {
								color: '#fff',
								padding: [2, 4],
								fontSize: 72,
								fontFamily: 'PangMenZhengDao'
							}
						}
					}
				},
			};
			const seriesOption = {
				name: '访问来源',
				type: 'pie',
				roseType: 'radius',
				hoverOffset: 0,
				label: {
					show: false
				},
				labelLine: {
					show: false
				}
			};
			const defaultOption = {
				tooltip: {
					// show: true,
					show: false,
					trigger: 'item',
					textStyle: {
						fontSize: 48,
					},
					padding: 20,
					formatter: '{a} <br/>{b}: {c} ({d}%)'
				}
			};
			// let min,max;
			// state.right3.rightChartData.forEach(item=>{
			// 	if(max===undefined||item.value>max.value){
			// 		max=item
			// 	}
			// 	if(min===undefined||item.value<min.value){
			// 		min=item
			// 	}
			// })
			let series = new Array(2).fill(1);
			series = series.map((item, index) => {
				return {
					...seriesOption,
					radius: ['33%', 50 + 5 * (1 - index) + '%'],
					zlevel: 1 + index,
					data: chartData.map((i, ind) => {
						let result = {
							...i, itemStyle: {
								color: color[index][ind]
							}
						};
						if (!index) {
							// if(i.name===max.name||i.name===min.name){
							// 	result={...result,...markStyle}
							// }
							result = {...result, ...markStyle}
						}
						return result
					})
				}
			})
			return {...defaultOption, series}
		}
	},
}
