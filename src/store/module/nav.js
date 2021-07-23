/*
 * @Description: 
 * @Author: tujiangjun
 * @Date: 2020-10-29 09:57:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-29 16:16:41
 */
export default {
  namespaced:true,
  state: {
    activeNav:'首页'
  },
  mutations: {
    ACTIVE_NAV(state, nav) {
      state.activeNav = nav
    },
  },
  actions:{
    activeNav({ commit }, nav) {
      commit('ACTIVE_NAV', nav)
    },
  }
}

