<template>
  <div class="card-one">
    <div class="card-content">
      <slot></slot>
    </div>
    <i class="card-icon" :style="{borderColor:`${theme} transparent transparent ${theme}`}"></i>
    <div class="card-border" :style="{borderColor:theme,...borderStyle}">
      <i class="left-i" :style="{borderColor:`${theme} transparent transparent ${theme}`}"></i>
      <i class="right-i" :style="{borderColor:`transparent ${theme} ${theme} transparent `}"></i>
      <div class="card-border-icon" :style="{backgroundColor:theme,...bgStyle}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "card",
    props:{
      theme:{type:String,default:'rgba(217, 240, 255, 0.8)'},
      borderStyle:{type:Object,default: ()=>({})},
      bgStyle:{type:Object,default:()=>({})}
    }
  }
</script>

<style lang="less" scoped>
  .card-one{
    position: relative;
    top:0;
    left: 0;
    font-size: 0;
    .card-icon{
      display: block;
      width: 0;
      height: 0;
      border: 11px solid;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .card-content{
      position: relative;
      top: 0;
      left: 0;
      z-index: 2;
    }
    .card-border{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid;
      box-sizing: border-box;
      padding:0 37px 10px 10px;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-end;
      align-items: stretch;
      z-index: 1;
      @size:34px;
      clip-path: polygon(
              @size 0,
              100% 0,
              100% calc(100% - @size),
              calc(100% - @size) 100%,
              0 100%,
              0 @size
      );
      &-icon{
        height: 5px;
      }
      .left-i{
        border: @size/2+1 solid;
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        left: 0;

      }
      .right-i{
        display: block;
        width: 0;
        height: 0;
        border: @size/2+1 solid;
        position: absolute;
        right: 0;
        bottom: 0;

      }
    }
  }
</style>

