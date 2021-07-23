<template>
  <div class="com_base"
       :style="{width:width+'px',height:height+'px',left:left+'px',
       top:top+'px',right:right+'px'}">
    <div class="title-div" v-show="title!==''">
      <div class="vertical-line"></div>
      <div class="title">{{title}}</div>
      <div class="right-icon" v-if="showIcon"></div>
      <div  class="rightText">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="split-line"></div>
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
      showIcon:{type:Boolean,default:true}
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/varient";

  .com_base {
    position: absolute;
    .title-div {
      width: 100%;
      height: 57px;
      position: absolute;
      top: 0;
      margin-bottom: 18px;

      display: flex;
      align-items: center;

      .vertical-line {
        width: 8px;
        height: 50px;
        background: rgba(255, 255, 255, 1);
        margin-right: 30px;
      }
      .title {
        font-size: @font-size-60;
        font-family: @font-family;
        font-weight: @font-weight-medium;
        color: @color-white;
        line-height: 57px;
      }
      .right-icon{
        position: absolute;
        top: 3px;
        right: 13px;
        width: 113px;
        height: 50px;
        background: url("../../../static/images/common/title-right-icon.png") no-repeat 0 0;

      }
      .rightText{
        position: absolute;
        top: 3px;
        right: 13px;      
        height: 50px;
      }
    }

    .split-line {
      position: absolute;
      top: 73px;
      left: 0;
      width: 1151px;
      height: 1px;
      border: 1px solid #FFFFFF;
      opacity: 0.5;
    }
  }
</style>

