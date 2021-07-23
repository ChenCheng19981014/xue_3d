import {getCommonDataList} from "../../api/api";

/**
 * 华星-销售产量
 */
export default {
  namespaced: true,
  state: {
    productTypeData: [],//产品类型统计
    customerSatisfactionData:[],//客户满意度
    customerSales:[],//客户销售分布统计
    mainSaleComposition:[],//主要销售组成变化
  },
  getters: {
    productTypeData: state => state.productTypeData,
    customerSatisfactionData: state => state.customerSatisfactionData,
    customerSales: state => state.customerSales,
    mainSaleComposition: state => state.mainSaleComposition,
  },
  mutations: {
    setProductTypeData: (state, data) => {
      state.productTypeData = data
    },
    setCustomerSatisfactionData: (state, data) => {
      state.customerSatisfactionData = data
    },
    setCustomerSales: (state, data) => {
      state.customerSales = data
    },
    setMainSaleComposition: (state, data) => {
      state.mainSaleComposition = data
    },
  },
  actions: {
    async getHttpProductTypeData({commit}, params) {
      const res = await getCommonDataList(params)
      console.log('[getHttpProductTypeData] response:', res)
      if (res.code === 200) {
        commit('setProductTypeData', res.data)
      }
    },
    async getHttpCustomerSatisfactionData({commit}, groupId) {
      const params = {
        groupId
      }
      const res = await getCommonDataList(params)
      console.log('[getHttpCustomerSatisfactionData] response:', res)
      if (res.code === 200) {
        commit('setCustomerSatisfactionData', res.data)
      }
    },
    async getHttpCustomerSales({commit}, params) {
      const res = await getCommonDataList(params)
      console.log('[getHttpCustomerSales] response:', res)
      if (res.code === 200) {
        commit('setCustomerSales', res.data)
      }
    },
    async getHttpMainSaleComposition({commit}, params) {
      const res = await getCommonDataList(params)
      console.log('[getHttpMainSaleComposition] response:', res)
      if (res.code === 200) {
        commit('setMainSaleComposition', res.data)
      }
    },
  },
}
