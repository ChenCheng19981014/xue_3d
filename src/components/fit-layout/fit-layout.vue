<template>
  <div class="fit-layout" :style="appStyle">
    <slot></slot>
  </div>
</template>

<script>
  const DesignSize = {
    width: 7680,
    height: 3240
  }

  const getViewScale = () => {
    return {
      x: window.innerWidth / DesignSize.width,
      // y: document.documentElement.getBoundingClientRect().width / DesignSize.width,
      y:window.innerHeight / DesignSize.height,
    }
  }
  export default {
    name: "fit-layout",
    computed: {
      appStyle() {
        return {
          width: this.onlyscale?'':`${this.viewSize.width}px`,
          // height: `${this.viewSize.height}px`,
          transform: `scale(${this.viewScale.x},${this.viewScale.y})`,
          '-webkit-transform': `scale(${this.viewScale.x},${this.viewScale.y})`,
          '-moz-transform': `scale(${this.viewScale.x},${this.viewScale.y})`,
        };
      }
    },
    props:{
      onlyscale:Boolean
    },
    data() {
      return {
        viewSize: {
          width: DesignSize.width,
          height: DesignSize.height
        },
        viewScale: getViewScale()
      };
    },
    methods: {
      resetWindow() {
        this.viewScale = getViewScale()
        this.$store.commit('VIEW_SCALE', this.viewScale)
      }
    },
    mounted() {
      this.resetWindow();
      window.onresize = this.resetWindow;
      this.$store.commit('VIEW_SCALE', this.viewScale)
    }
  }
</script>

<style scoped>
  .fit-layout {
    transform-origin: left top;
  }
</style>
