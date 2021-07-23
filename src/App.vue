<template>
  <div id="app">
    <router-view></router-view>
    <el-button class="back-home" @click="goback">返回首页</el-button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    goback() {
      this.$router.push("/");
    }
  },
  mounted() {},
  components: {}
};
</script>

<style lang="less">
@import "./style/index";
@import "../static/font/font.css";

#app {
  overflow: hidden;
  box-sizing: border-box;
  z-index: 30;
  position: relative;
  height: 100%;

  .back-home {
    position: absolute;
    top: 30px;
    right: 30px;
  }
}
</style>
