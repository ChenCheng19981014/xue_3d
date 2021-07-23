/*
 * @Description:
 * @Author: tujiangjun
 * @Date: 2020-10-29 09:57:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-29 16:21:16
 */
import Vue from 'vue'
import vuex from 'vuex'
import introduce from './module/introduce'
import enterprise from './module/enterprise'
import product from './module/product'
import nav from './module/nav'
import sale from './module/sale'
import store from './module/store'
import salesNum from './module/salesNum'
import hxFactory from "./module/hxFactory";
import xsgroup from "./module/xsgroup";
import prodMonitor from "./module/prodMonitor";
import buildings from "./module/buildings";
import health from './module/health';

Vue.use(vuex);


export default new vuex.Store({
	state:{
	  viewScale:{x:1,y:1},
  },
  mutations:{
	  VIEW_SCALE(state, payload) {
      state.viewScale = payload
    }
  },
  getters:{
	  getViewScale: state => state.viewScale,
    activeNav: state => nav.state.activeNav,
  },
  actions:{},
  modules:{introduce,enterprise,product,sale,store,nav,salesNum,hxFactory,xsgroup,prodMonitor,buildings,health}

})
