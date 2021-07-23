<<template>
<div class="circle-warp">
  <div class="circle-warp-inner" :style="{color: color, transform:`rotate(${deg})`}">
    <div class="arrows" :class="startPosition" :style="{'--color': color}"></div>
  </div>

  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'CircleWarp',
  props: {
    //弧度大小
    percentage: {
      type: Number,
      default: 0
    },
    //起始位置： top, left, bottom, right 
    startPosition: {
      type: String,
      default: 'Top'
    },
    // 外层箭头颜色
    color: {
      type: String,
      default: 'linear-gradient(39deg, #1D73E0 0%, #35E5C8 100%)'
    }
  },
  computed: {
    deg() {
      return this.percentage / 100 * 360+180 + 'deg'
    }
  },
  watch: {
    percentage(newVal, oldVal) {

    }
  },
}
</script>

<style lang="less" scoped>
.circle-warp {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;

  .circle-warp-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    transform: rotate(180deg);
    translate: all 0.5s ease;

    ::after {
      content: '▼';
      font-size: 24px;
      position: absolute;
      left: 50%;
      top: -22px;
      transform: translateX(-50%);
      background: var(--color);
      -webkit-background-clip: text;
      color: transparent;
    }
  }
}
</style>
