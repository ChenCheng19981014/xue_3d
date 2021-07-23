/**
 * 华星公共页
 */
import {getSaleNumM, getConNum, getPlanData, getEnergy, getProdPlan, getOneAcceptance} from "./../../api/api-hx";
import {getCommonDataList} from "./../../api/api"
const handleType=(num)=>{
  if(num<0.6){
    return 'red'
  }else if(num>0.8){
    return 'green'
  }else{
    return 'yellow'
  }
}
export default {
  namespaced: true,
  state: {
    currentNav: "销售产量",
    navs: [
      {name: '销售产量', url: '/hx?currentNav=销售产量'},
      {name: '生产监控', url: '/hx?currentNav=生产监控'},
      {name: '消耗总览', url: '/hx?currentNav=消耗总览'},
      {name: '数据分析', url: '/hx?currentNav=数据分析'},
    ],
    topData: [
      {
        label: '销售健康度',
        value: '0',
        icon: 'icon-qiye',
        type: 'green'
      },
      {
        label: '质量健康度',
        value: '0',
        icon: 'icon-zhiliang',
      },
      {
        label: '制造健康度',
        value: '0',
        icon: 'icon-zhizao',
        type: 'red'
      },
      {
        label: '客户数',
        value: '0',
        icon: 'icon-two-people',
      },
      {
        label: '当月能耗',
        value: '0',
        icon: 'icon-nenghao',
        unit: 'kw'
      },
      {
        label: '设备空置率',
        value: '0',
        icon: 'icon-shebei1',
      },
    ],
    // saleNumMList: {},
    // conNumMList: {},
    planDataList: {},
    // energyList: {},//能耗统计
    // prodPlanList: {},//生产计划完成率
    // oneAcceptance: {},
    customerSatisfaction: 0,
    videoIndex: 0,//当前播放监控的下标
    videoDialogShow:false,//当前视频弹窗是否显示
  },
  getters: {
    currentNav: state => state.currentNav,
    navs: state => state.navs,
    // saleNumMList: state => state.saleNumMList,
    // conNumMList: state => state.conNumMList,
    planDataList: state => state.planDataList,
    topData: state => state.topData,
    customerSatisfaction: state => state.customerSatisfaction,
    videoIndex: state => state.videoIndex,
    videoDialogShow: state => state.videoDialogShow,
    // energyList: state => state.energyList,
    // prodPlanList: state => state.prodPlanList,
    // oneAcceptance: state => state.oneAcceptance,
  },
  mutations: {
    setCurrentNav: (state, data) => {
      state.currentNav = data
    },
    setVideoIndex: (state, data) => {
      state.videoIndex = data
    },
    setVideoDialogShow:(state, data) => {
      state.videoDialogShow = data
    },
    // setSaleNumMList: (state, data) => {
    //   state.saleNumMList = data
    // },
    // setConNumMList: (state, data) => {
    //   state.conNumMList = data
    // },
    setPlanDataList: (state, data) => {
      state.planDataList = data
    },
    // setEnergyList: (state, data) => {
    //   state.energyList = data
    // },
    // setProdPlan: (state, data) => {
    //   state.prodPlanList = data
    // },
    // setOneAcceptance: (state, data) => {
    //   state.oneAcceptance = data
    // },
    setTopData: (state, data) => {
      state.topData = data
    },
    setCustomerSatisfaction: (state, data) => {
      state.customerSatisfaction = data
    },
  },
  actions: {
/*    async getDatalist({commit}) {
      const res = await getSaleNumM()
      console.log('-------------------')
      console.log('[getSaleNumM] response:', res)
      if (res.code === 200) {
        commit('setSaleNumMList', res.data)
      }
    },
    async getConDatalist({commit}) {
      const res = await getConNum()
      console.log('-------------------')
      console.log('[getConNum] response:', res)
      if (res.code === 200) {
        commit('setConNumMList', res.data)
      }
    },
    async getPlanDatalist({commit}) {
      const res = await getPlanData()
      console.log('-------------------')
      console.log('[getPlanData] response:', res)
      if (res.code === 200) {
        commit('setPlanDataList', res.data)
      }
    },
    async getEnergyList({commit}) {
      const res = await getEnergy()
      console.log('-------------------')
      console.log('[getEnergyList] response:', res)
      if (res.code === 200) {
        commit('setEnergyList', res.data)
      }
    },
    async getProdPlanData({commit}) {
      const res = await getProdPlan()
      console.log('-------------------')
      console.log('[getProdPlanData] response:', res)
      if (res.code === 200) {
        commit('setProdPlan', res.data)
      }
    },
    async getOneAcceptance({commit}) {
      const res = await getOneAcceptance()
      console.log('-------------------')
      console.log('[getOneAcceptance] response:', res)
      if (res.code === 200) {
        commit('setOneAcceptance', res.data)
      }
    },*/
    async getHttpGeneralView({commit, state}, params) {
      const res = await getCommonDataList(params)
      console.log('[getHttpGeneralView] response:', res)
      if (res.code === 200) {
        const {
          companyHealth, qualityHealth, manufactureHealth, customerAmount,
          saleAmount, energyConsume, deviceVacancyRate, customerSatisfaction
        } = res.data[0]||{};

        let data = state.topData;
        data[0].value = parseInt(companyHealth * 100||0).toFixed(0) + "%";
        data[0].type=handleType(companyHealth)
        data[1].value = parseInt(qualityHealth * 100||0).toFixed(0) + "%";
        data[1].type=handleType(qualityHealth)
        data[2].value = parseInt(manufactureHealth * 100||0).toFixed(0) + "%";
        data[2].type=handleType(manufactureHealth)

        data[3].value = customerAmount;
        data[4].value = energyConsume;
        data[5].value = parseInt(deviceVacancyRate * 100||0).toFixed(0) + "%";
        //客户满意度
        commit('setCustomerSatisfaction', parseInt(customerSatisfaction * 100))
        commit('setTopData', data)
      }
    }
  },

}
