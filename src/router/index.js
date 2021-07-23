import Vue from "vue";
import Router from "vue-router";
import model1 from "../views/model1/model1";

import home from "../views/home";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/", //地球页面
      name: "home",
      component: home
    },
    {
      path: "/model1", //地球页面
      name: "model1",
      component: model1
    }
  ]
});

// 跳转当前路由时，阻止报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
