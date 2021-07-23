import {
  getSalesOrderPie, getProd
} from "./../../api/api-hx";

export default {
  namespaced: true,
  state: {
    orderDetailFlag: false,//show order detail
    currentStep: 1,
    // salesOrderPieList:[],
    // prodList:{},
    selectOrderItem:{},//实时订单列表选中的的订单数据
  },
  getters: {
    orderDetailFlag: state => state.orderDetailFlag,
    currentStep: state => state.currentStep,
    selectOrderItem: state => state.selectOrderItem,
    // salesOrderPieList: state => state.salesOrderPieList,
    // prodList: state => state.prodList,
  },
  mutations: {
    setOrderDetailFlag: (state, data) => {
      state.orderDetailFlag = data
    },
    setCurrentStep: (state, data) => {
      state.currentStep = data
    },
    setSelectOrderItem: (state, data) => {
      state.selectOrderItem = data
    },
    // setSalesOrderPieList: (state, data) => {
    //   state.salesOrderPieList = data
    // },
    // setProdList: (state, data) => {
    //   state.prodList = data
    // },
  },
  actions: {
    /**
     * 销售订单统计/产品类型
     * @param commit
     * @param groupId
     * @returns {Promise<void>}
     */
    // async getHttpSalesOrderPie({commit}, type) {
    //   const params = {
    //     type
    //   }
    //   const res = await getSalesOrderPie(params)
    //   console.log('[getHttpSalesOrderPie] response:', res)
    //   if (res.code === 200 && res.data) {
    //     commit('setSalesOrderPieList', res.data)
    //   }
    // },

    // 产品不良率趋势
    // async getProdDatalist({commit}) {
    //   const res = await getProd()
    //   console.log('[getProd] response:', res)
    //   if (res.code === 200 && res.data) {
    //     commit('setProdList', res.data)
    //   }
    // },
  },
}
