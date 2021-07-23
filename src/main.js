// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import http from "@/libs/http";
import config from "./config";
import FitLayout from "./components/fit-layout/fit-layout";

import store from "./store/index";
import constant from "./const/index.js";

import socket from "./libs/socket";
import eventBus from "./libs/event-bus";
import ChartBase from "./components/chart-base";
import echarts from "echarts";
import scroll from "vue-seamless-scroll";

// import './registerServiceWorker'

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.use(scroll);
Vue.use(constant); //常量
// process.env.MOCK && require('@/mock')//mock

Vue.prototype.$eventBus = eventBus;
Vue.prototype.$publicConfig = config;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = true;

Vue.use(http);
Vue.component("ChartBase", ChartBase);
Vue.component("FitLayout", FitLayout);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
