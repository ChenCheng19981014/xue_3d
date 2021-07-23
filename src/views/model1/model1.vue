<template>
  <div class="model1">
    <!--模型容器-->
    <div class="container" ref="modelDiv">
      <div>
        <button
          @click="_ => player.eventBus.$emit('resetAboutXuelangStatus', true)"
        >
          重置雪浪状态
        </button>
        <button @click="_ => player.eventBus.$emit('surroundArchitecture')">
          建筑漫游
        </button>
        <button @click="_ => player.eventBus.$emit('stopSurroundArchitecture')">
          关闭建筑动画
        </button>

        <button id="focus" @click="_ => player.eventBus.$emit('fucousXuelang')">
          单击雪浪建筑
        </button>
        <button @click="_ => player.eventBus.$emit('dblClickXuelang')">
          双击雪浪建筑
        </button>
        <button
          id="f1"
          @click="_ => player.eventBus.$emit('webChangeFloor', 'f1')"
        >
          一楼
        </button>
        <button
          id="f2"
          @click="_ => player.eventBus.$emit('webChangeFloor', 'f2')"
        >
          二楼
        </button>
        <button
          id="f3"
          @click="_ => player.eventBus.$emit('webChangeFloor', 'f3')"
        >
          三楼
        </button>

        <button id="monitor" @click="_ => player.eventBus.$emit('initMonitor')">
          切换显示监控
        </button>
        <button id="c1" @click="player.eventBus.$emit('webFucousCamera', 0)">
          摄像机1
        </button>
        <button id="c2" @click="player.eventBus.$emit('webFucousCamera', 1)">
          摄像机 2
        </button>
        <button id="c3" @click="player.eventBus.$emit('webFucousCamera', 2)">
          摄像机 3
        </button>
        <button id="c4" @click="player.eventBus.$emit('webFucousCamera', 3)">
          摄像机 4
        </button>
        <button id="c5" @click="player.eventBus.$emit('webFucousCamera', 4)">
          摄像机 5
        </button>
        <button
          id="c5"
          @click="player.eventBus.$emit('firstPersonSurround', 0.0005)"
        >
          第一人称环绕动画
        </button>
        <button
          id="c5"
          @click="player.eventBus.$emit('firstPersonSurround', 0.0005, true)"
        >
          关闭第一人称环绕动画
        </button>

        <!-- <button
          @click="
            _ =>
              player.eventBus.$emit(
                'changeOneFloorStatus',
                (this.stopRodStatus = !this.stopRodStatus)
              )
          "
        >
          切换一层状态
        </button> -->
        <!-- <button
          @click="
            _ =>
              player.eventBus.$emit(
                'aboutStopRod',
                (this.stopRodStatus = !this.stopRodStatus)
              )
          "
        >
          测试抬杆
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
import initScene from "../../three/app";
export default {
  name: "model1",
  data() {
    return {
      stopRodStatus: false
    };
  },
  mounted() {
    this.loadScene();
  },
  methods: {
    loadScene() {
      initScene(
        "./static/three3dApp/model1/app.json",
        this.$refs.modelDiv
      ).then(player => {
        this.player = player;
        player.initChange();
        player.change.initTheScene();
      });
    }
  },
  beforeDestroy() {}
};
</script>

<style scoped lang="less">
.model1 {
  position: relative;
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    div {
      position: absolute;
      z-index: 10000;
    }
  }
}
</style>
