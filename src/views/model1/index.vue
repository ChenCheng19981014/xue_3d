<template>
  <div id="three">
    <button @click="_ => player.eventBus.$emit('resetXuelangStatus')">
      重置雪浪状态
    </button>
    <button @click="_ => player.eventBus.$emit('surroundArchitecture')">
      建筑漫游
    </button>
    <button @click="_ => player.eventBus.$emit('testing')">
      抬杆
    </button>
  </div>
</template>
<script>
import initScene from "../../utils/three/app";

export default {
  data() {
    return {
      player: ""
    };
  },
  mounted() {
    this.loadScene();
  },
  methods: {
    loadScene() {
      const sceneDom = document.querySelector("#three");
      initScene("./static/three3dApp/model1/app.json", sceneDom).then(
        player => {
          console.log(player, "player");
          player.change.initTheScene();
          this.player = player;
          console.log(this.player, "player");
        }
      );
    }
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  align-items: center;
  justify-content: center;
}
#three {
  background: #f5f5f5;
  width: 80% !important;
  height: 80% !important;
  position: relative;
  > button:nth-child(1) {
    position: absolute;
    z-index: 1000;
  }
  > button:nth-child(2) {
    position: absolute;
    margin-left: 100px;
    z-index: 1000;
  }
  > button:nth-child(3) {
    position: absolute;
    margin-left: 100px;
    z-index: 1000;
  }
}
</style>
