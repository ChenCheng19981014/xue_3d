import {getStoreLeft1,getStoreMiddle1,getStoreMiddle2,getStoreMiddle3} from "@/api/api-xs";

export default {
  namespaced:true,
  state: {
    left1:{
      loading:false,
      data:[]
    },
    left2:{
      data:[]
    },
    left5:{
      data:[]
    },
    middle1:{
      loading: false,
      chartData:[],
    },
    middle2:{
      loading: false,
      chartData:[],
    },
    middle3:{
      loading: false,
      chartData:[],
    },
    rawMaterialsShow:false,//原料仓库视频弹窗是否显示
    rawMaterialIndex:0,//原料仓库视频弹窗视频下标
    productShow:false,//成品仓库视频弹窗是否显示
    productIndex:0,//成品仓库视频弹窗视频下标
    productingShow:false,//成品仓库视频弹窗是否显示
    productingIndex:0,//成品仓库视频弹窗视频下标
  },
  mutations: {
    setRawMaterialsShow(state,data){
      state.rawMaterialsShow=data
    },
    setRawMaterialIndex(state,data){
      state.rawMaterialIndex=data
    },
    setProductShow(state,data){
      state.productShow=data
    },
    setProductIndex(state,data){
      state.productIndex=data
    },
    setProductingShow(state,data){
      state.productingShow=data
    },
    setProductingIndex(state,data){
      state.productingIndex=data
    },
    LOADING_CHANGE_STATUS(state,{name,loading}){
      state[name].loading=loading
    },
    DATA_CHANGE(state,{name,data}){
      state[name]={
        ...state[name],
        ...data,
        loading:false
      }
    },
  },
  actions:{
    async left1GetData({commit}) {
      commit('LOADING_CHANGE_STATUS', {name: 'left1', loading: true})
      const [data]= await getStoreLeft1();
      const data1=[
        {
          icon: 'icon-caiwu2',
          unit: '万元',
          value: data.materialStorageValue,//'82000',
          label: '原料库存总值',
          trend: 'up'
        },
        {
          icon: 'icon-tongbi',
          unit: '吨',
          value: data.materialStorageWeight,//'25000',
          label: '原料库存总量',
          trend: 'up'
        },
        {
          icon: 'icon-gongnengdingyi',
          unit: '',
          value: (data.materialChainRatio*100).toFixed(0)+'%',//'3000',
          label: '环比增长',
          trend: 'up'
        }
      ]
      const data2=[
        {
          icon: 'icon-caiwu2',
          unit: '万元',
          value: data.finishedProductStorageValue,//'82000',
          label: '成品库存总值',
          trend: 'up'
        },
        {
          icon: 'icon-tongbi',
          unit: '吨',
          value: data.finishedProductStorageWeight,//'25000',
          label: '成品库存总量',
          trend: 'up'
        },
        {
          icon: 'icon-gongnengdingyi',
          unit: '',
          value: (data.finishedProductChainRatio*100).toFixed(0)+'%',//'3000',
          label: '环比增长',
          trend: 'up'
        }
      ];
      const data3=[
        {
          icon: 'icon-caiwu2',
          unit: '万元',
          value: data.producingProductStorageValue,//'82000',
          label: '在制品库存总值',
          trend: 'up'
        },
        {
          icon: 'icon-tongbi',
          unit: '吨',
          value: data.producingProductStorageWeight,//'25000',
          label: '在制品库存总量',
          trend: 'up'
        },
        {
          icon: 'icon-gongnengdingyi',
          unit: '',
          value: (data.producingProductChainRatio*100).toFixed(0)+'%',//'3000',
          label: '环比增长',
          trend: 'up'
        }
      ];
      commit('DATA_CHANGE', {name: 'left2', data: {data:data2}});
      commit('DATA_CHANGE', {name: 'left1', data: {data:data1}});
      commit('DATA_CHANGE', {name: 'left5', data: {data:data3}});
    },
    async middle1GetData({commit}) {
      commit('LOADING_CHANGE_STATUS', {name: 'middle1', loading: true})
      const data = await getStoreMiddle1();
      commit('DATA_CHANGE', {name: 'middle1', data: {chartData: data}})
    },
    async middle2GetData({commit}) {
      commit('LOADING_CHANGE_STATUS', {name: 'middle2', loading: true})
      const data = await getStoreMiddle2();
      commit('DATA_CHANGE', {name: 'middle2', data: {chartData: data}})
    },
    async middle3GetData({commit}) {
      commit('LOADING_CHANGE_STATUS', {name: 'middle3', loading: true})
      const data = await getStoreMiddle3();
      commit('DATA_CHANGE', {name: 'middle3', data: {chartData: data}})
    },
  },
  getters: {
    rawMaterialsShow: state => state.rawMaterialsShow,
    rawMaterialIndex: state => state.rawMaterialIndex,
    productShow: state => state.productShow,
    productIndex: state => state.productIndex,
    middle1ChartOptions(state, getters, rootState, rootGetters){
      const {chartData} = state.middle1
      const defaultOptions={
        legend: {
          show:false,
          data: ['原料库存'],

        },
        xAxis: {
          data: chartData.map(item=>item.name),
        },
        yAxis:{
          name: '万元',
        },
        series: [
            {
              type: 'bar',
              data: chartData.map(item=>item.storage||0),
              name:'原料库存',
              showLabel:true,
              theme:1,
            }
            ]
      }
      return rootGetters['xsgroup/chartXYOptions'](defaultOptions)
    },
    middle2ChartOptions(state, getters, rootState, rootGetters){
      const {chartData} = state.middle2
      const defaultOptions={
        color:['#50E3EB'],
        legend: {
          show:false,
          data: ['成品库存'],

        },
        xAxis: {
          data: chartData.map(item=>item.name),
        },
        yAxis:{
          name: '万元',
        },
        series: [
          {
            type: 'bar',
            name:'成品库存',
            data: chartData.map(item=>item.storage||0),
            showLabel:true,
            theme:1,
          }
        ]
      }
      return rootGetters['xsgroup/chartXYOptions'](defaultOptions)
    },
    middle3ChartOptions(state, getters, rootState, rootGetters){
      const {chartData} = state.middle3
      const defaultOptions={
        color:['#ffffff'],
        legend: {
          show:false,
          data: ['在制品库存'],

        },
        xAxis: {
          data: chartData.map(item=>item.name),
        },
        yAxis:{
          name: '万元',
        },
        series: [
          {
            type: 'bar',
            name:'在制品库存',
            data: chartData.map(item=>item.storage||0),
            showLabel:true,
            theme:1,
          }
        ]
      }
      return rootGetters['xsgroup/chartXYOptions'](defaultOptions)
    },
  },
}
