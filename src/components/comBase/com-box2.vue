<template>
  <div class="com-box2" :style="{width:width+'px',height:height+'px',left:left+'px',top:top+'px',right:right+'px'}">
    <div class="title-div" v-show="title!==''">{{title}}</div>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      width: {type: Number, default: 0},
      height: {type: Number, default: 0},
      left: {type: Number, default: 0},
      top: {type: Number, default: 0},
      title: {type: String, default: ""},
      right: {type: Number, default: 0},
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/varient";

  .com-box2 {
    position: absolute;
    width: 1760px;
    height: 1996px;
    background-image: url("../../../static/images/common/com-box2-bj.png");
    background-size: 100% 100%;

    .title-div {
      position: absolute;
      top: 59px;

      width: 100%;
      text-align: center;

      font-size: @font-size-72;
      font-family: @font-family;
      font-weight: @font-weight-bold;
      color: @color-white;
      line-height: 83px;
    }
  }
</style>

