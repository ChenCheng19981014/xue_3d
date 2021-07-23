<template>
<div class="box-wight" :style="{ width: width+'px' }">
  <div class="bw-title" v-if="title">
    <div class="left-title">{{title}}</div>
    <slot name="right"></slot>
  </div>
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'ModalWiget',
  props: {
    title: String,
    width: {
      type: String,
      default: '1380'
    }
  },
}
</script>

<style lang="less" scoped>
@baseColor: rgba(255, 255, 255, 0.5);

.box-wight {
  width: 100%;
  height: 100%;
  padding: 0 50px 50px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;

  .bw-title {
    position: relative;
    height: 120px;
    line-height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid @baseColor;

    .left-title {
      position: relative;
      border-left: 1px sold @baseColor;
      padding-left: 36px;
      font-size: 60px;
      color: #FFF;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 8px;
        height: 48px;
        transform: translateY(-50%);
        background-color: rgba(255, 255, 255, 0.5);
      }
    }

    &::after {
      content: "";
      position: absolute;
      right: 0;
      width: 120px;
      height: 3px;
      bottom: 0;
      background-color: #fff;
    }

    &::before {
      content: "";
      position: absolute;
      left: -14px;
      width: 12px;
      height: 12px;
      bottom: -7px;
      border: 1px solid @baseColor;
    }
  }
}
</style>
