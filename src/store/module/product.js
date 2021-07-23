import {
	getProductLeft1,
	getProductLeft3,
	getProductLeft31,
	getProductLeft4,
	getProductRight1,
	getProductRight11,
	getProductRight2,
	getProductRight21,
} from '@/api/api-xs'

export default {
	namespaced: true,
	state: {
		left1: {
			loading:false,
			product: 0,
			task: 0
		},
		left2: {
			day: 0,
			month: 0
		},
		left3: {
			loading: false,
			active:0,
			tabData:[
				{name:'月度',value:0,legends:['本月','上期']},
				{name:'年度',value:1,legends:['今年','去年']},
			],
			xAxis: [],
			chartData: {
				thisMonth: [],
				lastMonth: [],
			}
		},
		left4: {
			loading: false,
			xAxis: [],
			active:0,
			tabData:[
				{name:'月度',value:0,legends:['本月','同期']},
				{name:'年度',value:1,legends:['今年','去年']},
			],
			chartData: {
				thisMonth: [],
				lastMonth: [],
			}
		},
		right1: {
			loading: false,
			xAxis: [],
			active:0,
			tabData:[
				{name:'本月',value:0},
				{name:'本年',value:1},
			],
			chartData: {
				capacity: [],
				used: [],
				lineThree: []
			},
		},
		right2: {
			loading: false,
			xAxis: [],
			active:0,
			tabData:[
				{name:'本月',value:0},
				{name:'本年',value:1},
			],
			chartData: {
				goal: [],
				finished: []
			}
		}
	},
	mutations: {
		LOADING_CHANGE_STATUS(state, {name, loading}) {
			state[name].loading = loading
		},
		DATA_CHANGE(state, {name, data}) {
			state[name] = {
				...state[name],
				...data,
				loading: false
			}
		},
	},
	actions: {

		async left1GetData({commit}) {
			commit('LOADING_CHANGE_STATUS', {name: 'left1', loading: true})
			const [data] = await getProductLeft1()||[{}];
			const product=data.finishedMonth;//2000;
			const task=data.goalMonth;//500;
			const day=data.finishedRateYear*100;
			const month=data.finishedRateMonth*100;
			commit('DATA_CHANGE', {name: 'left2', data: {day, month}})
			commit('DATA_CHANGE', {name: 'left1', data: {product,task}})
		},
		async left3GetData({commit,state},index) {
			commit('LOADING_CHANGE_STATUS', {name: 'left3', loading: true})
			const active=index===undefined?state.left3.active:index;
			const data = active?await getProductLeft31():await getProductLeft3();
			let chartData = {
				thisMonth: [],
				lastMonth: [],
			};
			const xAxis = data.map(item => {
				const {name, thisMonth = 0, lastMonth = 0,thisYear=0,lastYear=0} = item;
				const thisData=active?thisYear:thisMonth;
				const lastData=active?lastYear:lastMonth;
				chartData.thisMonth.push(thisData);
				chartData.lastMonth.push(lastData);
				return name
			})
			commit('DATA_CHANGE', {name: 'left3', data: {active,xAxis, chartData}})
		},
		async left4GetData({commit,state},index) {
			commit('LOADING_CHANGE_STATUS', {name: 'left4', loading: true})
			const active=index===undefined?state.left3.active:index;
			const data = await getProductLeft4();
			let chartData = {
				thisMonth: [],
				lastMonth: [],
			};
			const xAxis = data.map(item => {
				const {name, thisMonth = 0, lastMonth = 0} = item;
				chartData.thisMonth.push(thisMonth);
				chartData.lastMonth.push(lastMonth);
				return name
			})
			commit('DATA_CHANGE', {name: 'left4', data: {active,xAxis, chartData}})
		},
		async right1GetData({commit,state},index) {
			commit('LOADING_CHANGE_STATUS', {name: 'right1', loading: true})
			const active=index===undefined?state.right1.active:index;
			const data = await getProductRight1();
			active
			let chartData = {
				capacity: [],
				used: [],
				lineThree: []
			};
			const xAxis = data.map(item => {
				const {name,yearRatio,monthRatio} = item;
				chartData.lineThree.push(((active?yearRatio:monthRatio) * 100).toFixed(2));
				return name
			})
			commit('DATA_CHANGE', {name: 'right1', data: {active,xAxis, chartData}})
		},
		async right2GetData({commit,state},index) {
			commit('LOADING_CHANGE_STATUS', {name: 'right2', loading: true})
			const active=index===undefined?state.right1.active:index;
			const data = active?await getProductRight21():await getProductRight2();
			let chartData = {
				goal: [],
				finished: []
			};
			const xAxis = data.map(item => {
				const {name, goal, finished} = item;
				chartData.goal.push(goal * 10*10);
				chartData.finished.push(finished * 10*10);
				return name
			});
			commit('DATA_CHANGE', {name: 'right2', data: {active,xAxis, chartData}})
		}
	},
	getters: {
		left3ChartOptions(state, getters, rootState, rootGetters) {
			const {chartData, xAxis,active,tabData} = state.left3;
			const legends=tabData[active].legends;
			const defaultOptions = {
				color: [ '#ffffff','#1faae5'],
				legend: {
						data: legends
					},

				tooltip: {
					formatter: (params) => {
						let result = ''
						params.forEach((item, index) => {
							if (index === 0) {
								result += item.axisValue
							}
							if (index < 3) {
								let dotHtml = `<span style="display:inline-block;margin-right:20px;width:36px;height:36px;background-color:${item.color}"></span>`
								result += /^#/.test(item.seriesId) ? '' : `</br>${dotHtml}${item.seriesName}: ${item.data}`
							} else {
								let dotHtml = `<img src="${whiteIcon}" style="display:inline-block;margin-right:20px;width:36px;height:36px;"/>`
								result += /^#/.test(item.seriesId) ? '' : `</br>${dotHtml}${item.seriesName}: ${item.data}%`
							}
						})
						return result
					}
				},
				// grid: {
				// 	left: 253,
				// 	right: 253,
				// 	top: 230,
				// 	bottom: 138,
				// },
				xAxis: {
					data: xAxis,
				},
				yAxis:{
						name: '金额(万元)',
					},
				series: [
					{
						name: legends[1],
						type: 'bar',
						data: chartData.lastMonth,
					},
					{
						name: legends[0],
						type: 'bar',
						data: chartData.thisMonth,
					}
				]
			}
			return rootGetters['xsgroup/chartXYOptions'](defaultOptions)
		},
		left4ChartOptions(state, getters, rootState, rootGetters) {
			const {chartData, xAxis,active,tabData} = state.left4;
			const legends=tabData[active].legends;
			const defaultOptions = {
				color: [ '#ffffff','#1faae5'],
				legend: {
						data: legends
					},
				tooltip: {
					formatter: (params) => {
						let result = ''
						params.forEach((item, index) => {
							if (index === 0) {
								result += item.axisValue
							}
							if (index < 3) {
								let dotHtml = `<span style="display:inline-block;margin-right:20px;width:36px;height:36px;background-color:${item.color}"></span>`
								result += /^#/.test(item.seriesId) ? '' : `</br>${dotHtml}${item.seriesName}: ${item.data}`
							} else {
								let dotHtml = `<img src="${whiteIcon}" style="display:inline-block;margin-right:20px;width:36px;height:36px;"/>`
								result += /^#/.test(item.seriesId) ? '' : `</br>${dotHtml}${item.seriesName}: ${item.data}%`
							}
						})
						return result
					}
				},
				grid: {
					left: 253,
					right: 253,
					top: 230,
					bottom: 138,
				},
				xAxis: {
					data: xAxis,
				},
				yAxis: {
						name: '金额(万元)',
					},
				series: [
					{
						name: legends[1],
						type: 'bar',
						data: chartData.lastMonth,
						theme: 1
					},
					{
						name: legends[0],
						type: 'bar',
						data: chartData.thisMonth,
						theme: 1,
					}
				]
			}
			return rootGetters['xsgroup/chartXYOptions'](defaultOptions)
		},
		right1ChartOptions(state, getters, rootState, rootGetters) {
			const {chartData, xAxis} = state.right1;
			const defaultOptions = {
				color: [ '#ffffff','#1faae5', '#ffffff'],
				// legend: [
				// 	{
				// 		top: 121,
				// 		right: 750,
				// 		itemGap: 89,
				// 		textStyle: {
				// 			color: 'white',
				// 			fontSize: 48,
				// 			fontFamily: "微软雅黑",
				// 			padding: [0, 0, 0, 39],
				// 		},
				// 		itemWidth: 36,
				// 		itemHeight: 36,
				// 		data: [{
				// 			name: "总产能",
				// 			icon: "rect"
				// 		}, {
				// 			name: "实际产能",
				// 			icon: "rect"
				// 		}]
				// 	},
				// 	{
				// 		top: 121,
				// 		right: 370,
				// 		textStyle: {
				// 			color: 'white',
				// 			fontSize: 48,
				// 			fontFamily: "微软雅黑",
				// 			padding: [0, 0, 0, 39],
				// 		},
				// 		itemWidth: 100,
				// 		itemHeight: 50,
				// 		data: [{
				// 			name: "利用率",
				// 			icon: 'image://' + whiteIcon
				// 		}]
				// 	}],
				tooltip: {
					formatter: (params) => {
						let result = ''
						params.forEach((item, index) => {
							if (index === 0) {
								result += item.axisValue
							}
							if (index < 3) {
								let dotHtml = `<span style="display:inline-block;margin-right:20px;width:36px;height:36px;background-color:${item.color}"></span>`
								result += /^#/.test(item.seriesId) ? '' : `</br>${dotHtml}${item.seriesName}: ${item.data}`
							} else {
								let dotHtml = `<img src="${whiteIcon}" style="display:inline-block;margin-right:20px;width:36px;height:36px;"/>`
								result += /^#/.test(item.seriesId) ? '' : `</br>${dotHtml}${item.seriesName}: ${item.data}%`
							}
						})
						return result
					}
				},
				grid: {
					left: 253,
					right: 253,
					top: 230,
					bottom: 138,
				},
				xAxis: {
					data: xAxis,
				},
				yAxis: {

						// name: '利用率',
						max:100,
						type: 'value',
						// max: chartData.lineThree.reduce((pre, item) => item > pre ? item : pre, 0),
						axisLine: {
							show: false
						},
						axisLabel: {
							margin: 31,
							fontSize: 48,
							interval: 156,
							formatter: '{value} %',
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
						},

					},
				series: [
					{
						name: '利用率',
						type: 'line',
						data: chartData.lineThree,
						// noArea: true
					}
				]
			}
			return rootGetters['xsgroup/chartXYOptions'](defaultOptions)
		},
		right2ChartOptions(state, getters, rootState, rootGetters) {
			const {chartData, xAxis} = state.right2;
			const defaultOptions = {
				// legend: {
				// 	data: [/*'目标完成',*/ '实际完成'],
				// },
				xAxis: {
					data: xAxis
				},
				yAxis: {
					axisLabel: {
						formatter: '{value} %',
					},
					//max:100
				},
				series: [
					// {
					// 	name: '目标完成',
					// 	type: 'line',
					// 	data: chartData.goal,
					// 	maxPoint: true
					// },
					{
						name: '实际完成',
						type: 'line',
						data: chartData.finished,
						minPoint: true,
					}
				]
			};
			return rootGetters['xsgroup/chartXYOptions'](defaultOptions)
		},
	},
}
