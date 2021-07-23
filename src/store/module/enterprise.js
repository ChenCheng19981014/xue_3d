import {
	getEnterpriseLeft1,
	getEnterpriseLeft2Month,
	getEnterpriseLeft2Year,
	getEnterpriseRight2Month,
	getEnterpriseRight2Year,
	getEnterpriseRight3,
	getEnterpriseRight31,
	getEnterpriseTop
} from '@/api/api-xs'

const handleType = (num) => {
	if (num < 0.6) {
		return 'red'
	} else if (num > 0.8) {
		return 'green'
	} else {
		return 'yellow'
	}
}
export default {
	namespaced: true,
	state: {
		top: {
			loading: false,
			data: [],
		},
		left1: {
			loading: false,
			people: 0,
			active: 0,
			tabData: [
				{name: '年龄', value: 0, key: 'age'},
				{name: '学历', value: 1, key: 'degree'},
				{name: '职称', value: 2, key: 'title'},
			],
			chartData: []
		},
		left2: {
			loading: false,
			topChartData: {},
			bottomChartData: {},
			xAxis: [],
			active: 0,
			tabData: [
				{name: '每月', value: 0, key: '月'},
				{name: '每年', value: 1, key: ''},
			],
		},
		right2: {
			loading: false,
			chartData: {
				sale: [],
				production: [],
				storage: []
			},
			xAxis: [],
			active: 0,
			tabData: [
				{name: '每月', value: 0, key: '月'},
				{name: '每年', value: 1, key: ''},
			],
		},
		right3: {
			loading: false,
			chartDataLeft: [],
			chartDataRight: [],
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
		showHealth({commit}) {
			commit('xsgroup/setCurrentNav', '健康度', {root: true})

		},
		async topGetData({commit}) {
			commit('LOADING_CHANGE_STATUS', {name: 'top', loading: true})
			const data = await getEnterpriseTop();
			const dataBack = data[0]
			const dataTop = [
				{
					label: '企业健康度',
					value: dataBack.companyHealth * 100 + "%",//'95%',
					icon: 'icon-qiye',
					type: handleType(dataBack.companyHealth)
				},
				{
					label: '质量健康度',
					value: dataBack.qualityHealth * 100 + "%",//'95%',
					icon: 'icon-zhiliang',
					type: handleType(dataBack.qualityHealth)
				},
				{
					label: '制造健康度',
					value: dataBack.manufactureHealth * 100 + "%",//'95%',
					icon: 'icon-zhizao',
					type: handleType(dataBack.manufactureHealth)
				},
				{
					label: '财务指数',
					value: dataBack.financialIndex * 100 + "%",//'95%',
					icon: 'icon-caiwu2',
				},
				{
					label: '员工人数',
					value: dataBack.staffAmount + "",//'1500',
					icon: 'icon-renshi',
				},
				{
					label: '客户数',
					value: dataBack.customerAmount + "",//'266',
					icon: 'icon-icon1',
				},
			];

			commit('DATA_CHANGE', {name: 'top', data: {data: dataTop}});
			commit('DATA_CHANGE', {name: 'left1', data: {people: dataBack.staffAmount}})
		},
		async left1GetData({commit, state}, index) {
			const active = index === undefined ? state.left1.active : index;
			commit('LOADING_CHANGE_STATUS', {name: 'left1', loading: true});
			let url = 2000008;
			if (active == 1) {
				url = 2000009
			} else if (active == 2) {
				url = 2000010
			}
			const chartData = await getEnterpriseLeft1(url) || [];
			commit('DATA_CHANGE', {name: 'left1', data: {chartData, active}})
		},
		async left2GetData({commit, state}, index) {
			commit('LOADING_CHANGE_STATUS', {name: 'left2', loading: true})
			const active = index === undefined ? state.left2.active : index;
			const data = active ? await getEnterpriseLeft2Year() : await getEnterpriseLeft2Month();
			let xAxis = [], bottomChartData = {}, topChartData = {}, total = 0;
			data.forEach(item => {
				let targetIndex, x;
				if (active) {
					targetIndex = item.year - 1900;
					x = `${item.year}`;
				} else {
					targetIndex = (item.year - 1900) * 12 + item.month;
					x = `${item.year}年\r\n${item.month}`;
				}
				const {type, amount = 0} = item;
				xAxis[targetIndex] = x;
				if (!bottomChartData[type]) {
					bottomChartData[type] = []
				}
				bottomChartData[type][targetIndex] = amount || 0;
				if (topChartData[type] === undefined) {
					topChartData[type] = 0
				}
				topChartData[type] += amount
				total += amount
			})
			xAxis = xAxis.filter(item => typeof item === 'string').map(item => item + state.left2.tabData[active].key);
			Object.keys(bottomChartData).forEach(item => {
				bottomChartData[item] = bottomChartData[item].filter(val => typeof val === 'number')
			})
			topChartData = Object.keys(topChartData).map(item => ({
				name: item,
				value: Math.round(topChartData[item] * 10 * 10 * 10 * 10 / total) / 100
			}))
			commit('DATA_CHANGE', {name: 'left2', data: {active, xAxis, bottomChartData, topChartData}})
		},
		async right2GetData({commit, state}, index) {
			commit('LOADING_CHANGE_STATUS', {name: 'right2', loading: true})
			const active = index === undefined ? state.right2.active : index;
			const data = active ? await getEnterpriseRight2Year() : await getEnterpriseRight2Month();
			let xAxis = [], chartData = {
				sale: [],
				production: [],
				storage: []
			};
			data.forEach(item => {
				const x = item[active ? 'year' : 'month'];
				const prefix = active ? -1900 : 0;
				const {sale, production, storage} = item;
				xAxis[prefix + x] = x;
				chartData['sale'][prefix + x] = sale || 0;
				chartData['production'][prefix + x] = production || 0;
				chartData['storage'][prefix + x] = storage || 0;
			})
			xAxis = xAxis.filter(item => typeof item === 'number').map(item => item + state.right2.tabData[active].key);
			Object.keys(chartData).forEach(item => {
				chartData[item] = chartData[item].filter(val => typeof val === 'number')
			});
			commit('DATA_CHANGE', {name: 'right2', data: {active, xAxis, chartData}})
		},
		async right3GetData({commit}) {
			commit('LOADING_CHANGE_STATUS', {name: 'right3', loading: true})
			const data = await getEnterpriseRight3();
			const data2 = await getEnterpriseRight31();
			let left, right;
			for (let i = 0; i < data.length; i++) {
				if (data[i].type === '机械油品') {
					right = [
						{
							name: '机械油品总库存',
							value: Math.round(data[i].storage)
						},
						{
							name: '机械油品消耗量',
							value: Math.round(data[i].usage)
						},
					]
					break;
				}
			}
			for (let i = 0; i < data2.length; i++) {
				if (data2[i].type === '钢材') {

					left = [
						{
							name: '钢材总库存',
							value: Math.round(data2[i].storage)
						},
						{
							name: '钢材消耗量',
							value: Math.round(data2[i].usage)
						},
					]
					break;
				}
			}
			commit('DATA_CHANGE', {name: 'right3', data: {chartDataLeft: left, chartDataRight: right}})
		}
	},
	getters: {
		left1ChartOptions(state) {
			const {chartData, active, tabData} = state.left1;
			const nameKey = tabData[active].key;
			const data = chartData;
			return {
				tooltip: {
					show: true,
					trigger: 'item',
					textStyle: {
						fontSize: 48,
					},
					padding: 20,
					confine: true,
					position: pos => {
						return {
							bottom: pos[1],
							right: pos[0]
						};
					},
					formatter: '{a} <br/>{b}: {c} ({d}%)'
				},
				center: ["50%", "50%"],
				legend: {
					show: false
				},
				series: [{
					name: '人员情况',
					type: "pie",
					selectedOffset: 5,
					label: {
						show: true,
						formatter: "{a|{b}}\n{per|{d}%}",
						align: 'left',
						rich: {
							a: {
								padding: [0, 0, 0, 20],
								width: 136,
								align: 'left',
								color: "#fff",
								fontSize: 31,
								fontFamily: 'SourceHanSansCN-Regular'
							},
							per: {
								padding: [0, 0, 0, 20],
								width: 136,
								align: 'left',
								fontSize: 57,
								fontFamily: "PangMenZhengDao"
							}
						},
						alignTo: "edge",
						margin: 80,
						distanceToLabelLine: 90,
					},
					labelLine: {show: true, length: 20, lineStyle: {color: "#fff", width: 2}},
					clockwise: false,
					radius: [240, 260],
					data: data.map(item => ({name: item[nameKey], value: item.ratio, selected: true}))
				}],
				color: ["#1BBDFF", "#00FFFF", "#578FFE", "#FFFFFF"]
			}
		},
		left2TopChartOptions(state) {
			const {topChartData} = state.left2
			return {
				tooltip: {
					show: false,
					trigger: 'item',
					textStyle: {
						fontSize: 48,
					},
					padding: 20,
					position: pos => {
						return {
							top: pos[1],
							left: pos[0]
						};
					},
					formatter: '{a} <br/>{b}: {c} ({d}%)'
				},
				color: ['#1BA6FF', '#1BD4FF', '#578FFE', '#FFFFFF', '#7f77ff', '#34ffc9'],
				series: [
					{
						name: '产品类型',
						type: 'pie',
						radius: [150, 200],
						center: ['50%', '50%'],
						roseType: 'area',
						clockwise: false,
						data: topChartData,
						label: {
							show: false
						},
						emphasis: {
							label: {
								show: true,
								formatter: "{a|{b}}\n{per|{d}%}",
								// align:'left',
								rich: {
									a: {
										padding: [0, 0, 0, 5],
										align: 'left',
										color: "#fff",
										fontSize: 38,
										fontFamily: 'SourceHanSansCN-Regular'
									},
									per: {
										padding: [0, 0, 0, 5],
										align: 'left',
										fontSize: 48,
										fontFamily: "PangMenZhengDao"
									}
								},

							},
							labelLine: {show: true, lineStyle: {color: "#fff", width: 2}},
						}
					}
				],
			}
		},
		left2BottomChartOptions(state, getters, rootState, rootGetters) {
			const {bottomChartData, xAxis} = state.left2;
			const defaultOption = {
				color: ['#1B91FF', '#00FFFF', '#5EA4FF', '#ffffff', '#7f77ff', '#34ffc9'],
				grid: {
					left: 189,
					right: 115,
					bottom: 110,
					top: 130,
				},
				legend: {
					top: 0,
					left: 139,
					right: 466,
					width: 840,
					itemGap: 44,
					itemWidth: 24,
					itemHeight: 24,
					textStyle: {
						fontSize: 40,
						fontFamily: 'SourceHanSansCN-Regular',
						lineHeight: 40
						// padding: [0, 0, 0, 39],
					},
					data: Object.keys(bottomChartData),

				},
				xAxis: {
					axisLabel: {
						margin: 22,
						fontSize: 40,
						fontFamily: 'SourceHanSansCN-Regular',
					},
					data: xAxis,
				},
				yAxis: {
					axisLabel: {
						margin: 20,
						fontSize: 40,
						fontFamily: 'SourceHanSansCN-Regular',
						fontWeight: 500,
						interval: 95,

						// formatter: '{value} %',
					}
				},
				series: Object.keys(bottomChartData).map(item => ({
					name: item,
					type: 'bar',
					stack: '总量',
					data: bottomChartData[item]
				}))
			}
			return rootGetters['xsgroup/chartXYOptions'](defaultOption)
		},
		right2ChartOptions(state, getters, rootState, rootGetters) {
			const {chartData, xAxis} = state.right2;
			const defaultPositin = {
				color: ['#1B91FF', '#00FFFF', '#ffffff'],
				grid: {
					left: 189,
					right: 115,
					bottom: 110,
					top: 92,
				},
				legend: {
					top: 0,
					right: 124,
					itemGap: 64,
					itemWidth: 24,
					itemHeight: 24,
					textStyle: {
						fontSize: 40,
						// font-family: "SourceHanSansCN-Regular";
						fontFamily: 'SourceHanSansCN-Regular',
						fontWeight: 500,
						padding: [0, 0, 0, 39],
					},
					data: ['销量', '产量', '存量'],

				},
				xAxis: {
					axisLabel: {
						margin: 22,
						fontSize: 40,
						fontFamily: 'PingFang-SC',
						fontWeight: 500,
					},
					data: xAxis,
				},
				yAxis: {
					axisLabel: {
						margin: 20,
						fontSize: 40,
						fontFamily: 'PingFang-SC',
						fontWeight: 500,
						interval: 95,

						formatter: '{value}',
					}
				},
				series: [
					{
						name: '销量',
						type: 'bar',
						data: chartData.sale,
					},
					{
						name: '产量',
						type: 'bar',
						data: chartData.production,
					},
					{
						name: '存量',
						type: 'bar',
						data: chartData.storage,
					}
				]
			}
			return rootGetters['xsgroup/chartXYOptions'](defaultPositin)
		},
	},
}
