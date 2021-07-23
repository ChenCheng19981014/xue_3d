<template>
  <div class="home">
    <el-button @click="goto('/model1')">213综采工作面</el-button>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    goto(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped lang="less">
.home {
  display: flex;
  button {
    width: 100px;
    margin-left: 30px;
    margin-top: 20px;
  }
}
</style>
