import { getBuildingChildren } from "../../api/api-hx";
export default {
  namespaced: true,
  state: {
    buildingChildren: {
      name:""
    },
   
    
  },
  getters: {
  
    buildingChildren: state => state.buildingChildren,
  },
  mutations: {
    setBuildingChildren: (state, data) => {
      state.buildingChildren = data
    },
  
  },
  actions: {
    async getBuildingChildData({ commit }) {
      const res =  await getBuildingChildren()
      console.log('-------------------')
      console.log('[getBuildingChildren] response:', res)
      if (res.code === 200) {
        commit('setBuildingChildren', res.data)
      }
    },
   

    
  },

}
